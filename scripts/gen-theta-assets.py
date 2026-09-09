#!/usr/bin/env python3
"""Generate every pixelated-theta asset from the one source geometry.

The mark is the original theta vector quantised onto a square pixel grid, so
the shape stays identical to the brand mark while reading as pixel art. Run
after changing the geometry below:

    python3 scripts/gen-theta-assets.py

Writes: src/components/thetaPath.ts, src/app/favicon.ico,
public/projects/favicon.ico, public/icons/*.png, public/og/cover.jpg
"""
import math, pathlib
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent

# ── Source geometry (the original theta, verbatim) ───────────────────────────
OUTER = [(0,-140),(70,-140),(115,-85),(118,-5),(121,75),(78,138),(5,142),
         (-70,145),(-118,88),(-120,5),(-122,-78),(-75,-138),(-2,-141)]
INNER = [(-4,-120),(-62,-116),(-100,-65),(-98,5),(-96,72),(-58,122),(4,122),
         (64,122),(100,70),(100,0),(100,-70),(60,-120),(0,-120)]
WAVE  = [(-138,18),(-100,-22),(-55,-28),(-15,-6),(25,16),(75,14),(142,-22)]
ROT   = -6.0

# Ring weight. Scaling the inner contour outwards thins the ring; 1.075/10 is
# the display weight, 1.0/14 the original. Small icons need the heavier one to
# stay legible, so each size is hinted (see SIZES).
THIN, HEAVY = (1.075, 10), (1.0, 14)

INK, GOLD = (13, 13, 13), (201, 168, 76)

# ── Rasterise ────────────────────────────────────────────────────────────────
def _bez(p0, p1, p2, p3, n=40):
    for i in range(n + 1):
        t = i / n; u = 1 - t
        yield (u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
               u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1])

def _flatten(pts, close=True):
    out = [pts[0]]; cur = pts[0]; i = 1
    while i + 2 <= len(pts) - 1:
        out.extend(list(_bez(cur, pts[i], pts[i+1], pts[i+2]))[1:])
        cur = pts[i+2]; i += 3
    if close:
        out.append(pts[0])
    return out

def _rot(pts, deg):
    a = math.radians(deg); c, s = math.cos(a), math.sin(a)
    return [(x*c - y*s, x*s + y*c) for x, y in pts]

def bits(grid, weight=THIN, ss=16, pad=0.06, thr=0.42, part="all"):
    """Quantise the theta onto a grid x grid boolean pixel map.

    part="ring" or "wave" quantises just that half of the mark, so the two can
    be emitted as separate paths and themed independently. Both are measured
    against the whole mark's bounding box, so the halves stay registered.
    """
    inner_scale, wave_w = weight
    outer = _rot(_flatten(OUTER), ROT)
    inner = _rot(_flatten([(x*inner_scale, y*inner_scale) for x, y in INNER]), ROT)
    wave  = _rot(_flatten(WAVE, close=False), ROT)

    pts = outer + inner + wave; r = wave_w / 2
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    x0, x1, y0, y1 = min(xs) - r, max(xs) + r, min(ys) - r, max(ys) + r
    span = max(x1 - x0, y1 - y0) / (1 - 2 * pad)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2

    N = grid * ss; sc = N / span
    T = lambda p: ((p[0] - cx) * sc + N/2, (p[1] - cy) * sc + N/2)

    im = Image.new("L", (N, N), 0); d = ImageDraw.Draw(im)
    if part in ("all", "ring"):
        d.polygon([T(p) for p in outer], fill=255)
        d.polygon([T(p) for p in inner], fill=0)      # ring hole
    if part in ("all", "wave"):
        wp = [T(p) for p in wave]
        d.line(wp, fill=255, width=max(1, round(wave_w * sc)), joint="curve")
        rr = wave_w * sc / 2                           # round caps
        for p in (wp[0], wp[-1]):
            d.ellipse([p[0]-rr, p[1]-rr, p[0]+rr, p[1]+rr], fill=255)

    px = im.resize((grid, grid), Image.BOX).load()     # box filter = coverage
    b = [[px[x, y] / 255 >= thr for x in range(grid)] for y in range(grid)]

    # Drop pixels with no orthogonal neighbour. At small grid sizes the curve
    # occasionally throws off a single detached dot that reads as dirt.
    return [[b[y][x] and any(b[y+dy][x+dx] for dx, dy in ((1,0),(-1,0),(0,1),(0,-1))
                             if 0 <= x+dx < grid and 0 <= y+dy < grid)
             for x in range(grid)] for y in range(grid)]

# ── Emit ─────────────────────────────────────────────────────────────────────
def to_path(bits):
    """Merge the pixel map into as few axis-aligned rects as possible."""
    g = len(bits); grid = [row[:] for row in bits]; rects = []
    for y in range(g):
        x = 0
        while x < g:
            if not grid[y][x]:
                x += 1; continue
            w = 0
            while x + w < g and grid[y][x + w]:
                w += 1
            h = 1                                      # grow down while the run matches
            while y + h < g and all(grid[y+h][x:x+w]) and \
                  (x == 0 or not grid[y+h][x-1]) and (x+w == g or not grid[y+h][x+w]):
                h += 1
            for yy in range(y, y + h):
                grid[yy][x:x+w] = [False] * w
            rects.append((x, y, w, h)); x += w
    return "".join(f"M{x} {y}h{w}v{h}h-{w}z" for x, y, w, h in rects)

def render(bits, cell=1, fg=GOLD, bg=None):
    g = len(bits)
    im = Image.new("RGBA", (g*cell, g*cell), (*bg, 255) if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    for y in range(g):
        for x in range(g):
            if bits[y][x]:
                d.rectangle([x*cell, y*cell, x*cell+cell-1, y*cell+cell-1], fill=(*fg, 255))
    return im

def write(path, data):
    p = ROOT / path; p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(data) if isinstance(data, str) else data.save(p, quality=88)
    print("  ", path)

def mark(grid, weight=THIN):
    """The whole mark, as the union of the two halves the SVG ships.

    Composing it this way (rather than quantising ring and wave together) keeps
    every raster asset pixel-identical to what the page renders.
    """
    r, w = bits(grid, weight, part="ring"), bits(grid, weight, part="wave")
    return [[r[y][x] or w[y][x] for x in range(grid)] for y in range(grid)]

# Each icon size renders on its own native grid so it is crisp rather than a
# resampled 48. 16px is too small for the thin ring, so it is hinted heavier.
SIZES = {16: HEAVY, 32: THIN, 48: THIN}

def main():
    print("theta assets →")
    b48 = mark(48)

    # Ring and wave ship as separate paths so a theme can recolour the wave
    # on its own, the way the old vector's .theta-wave stroke allowed.
    write("src/components/thetaPath.ts",
          "// Generated by scripts/gen-theta-assets.py. Do not edit by hand.\n"
          f'export const THETA_RING =\n  "{to_path(bits(48, part="ring"))}";\n'
          f'export const THETA_WAVE =\n  "{to_path(bits(48, part="wave"))}";\n'
          "export const THETA_GRID = 48;\n\n"
          "// Coarser cut for the small UI mark. A 48 grid drawn at ~24px puts\n"
          "// two logo pixels in one device pixel and reads as a blurry ring.\n"
          f'export const THETA_SMALL =\n  "{to_path(mark(24))}";\n'
          "export const THETA_SMALL_GRID = 24;\n")

    # favicon.ico: src/app is the Next.js convention, public/projects is the
    # path layout.tsx points at; both must carry the same mark.
    icons = [render(mark(s, w), fg=(235, 220, 190)) for s, w in SIZES.items()]
    for dest in ("src/app/favicon.ico", "public/projects/favicon.ico"):
        # append_images embeds each render as its own entry; without it Pillow
        # would resample one bitmap and smear the pixel grid at 16 and 32.
        icons[-1].save(ROOT / dest, sizes=[(s, s) for s in SIZES],
                       append_images=icons[:-1])
        print("  ", dest)

    # iOS home screen + PWA. Cell sizes keep every pixel a whole number wide.
    for name, size, cell in (("apple-icon.png", 180, 3), ("icon-192.png", 192, 4),
                             ("icon-512.png", 512, 10)):
        art = render(b48, cell=cell)
        canvas = Image.new("RGBA", (size, size), (*INK, 255))
        canvas.alpha_composite(art, ((size - art.width)//2, (size - art.height)//2))
        write(f"public/icons/{name}", canvas)

    write("public/og/cover.jpg", og_cover(b48))

def og_cover(b48, size=(1280, 720)):
    """Link-preview image: the mark lit on the wall texture in scripts/."""
    w, h = size
    bg = Image.open(ROOT / "scripts/og-texture.jpg").convert("RGB").resize(size, Image.LANCZOS)
    bg = ImageEnhance.Brightness(bg).enhance(0.42)      # texture, not a light source

    glow = Image.new("L", size, 0)
    ImageDraw.Draw(glow).ellipse([w*0.36, h*0.15, w*0.64, h*0.85], fill=90)
    bg = Image.composite(Image.new("RGB", size, (150, 120, 66)), bg,
                         glow.filter(ImageFilter.GaussianBlur(110)))

    art = render(b48, cell=9, fg=(214, 176, 96))
    bg = bg.convert("RGBA")
    bg.alpha_composite(art, ((w - art.width)//2, (h - art.height)//2))
    return bg.convert("RGB")

if __name__ == "__main__":
    main()

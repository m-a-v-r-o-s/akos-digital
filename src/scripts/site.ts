/**
 * Everything interactive that every page shares. Each part looks for its own
 * markup and does nothing when it is absent, so one bundle serves all pages.
 * Motion is spring-based (src/lib/spring.js), interruptible, and skipped
 * under prefers-reduced-motion. Gestures always have a button or key twin.
 */
import { springTo, rubberband, project, velocityTracker, prefersReducedMotion } from "../lib/spring.js";
import { accents, DEFAULT_ACCENT } from "../lib/accents.ts";

const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = prefersReducedMotion();
const $ = <T extends Element>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];

/* ── Menu: round button + full-height dialog ── */
const menu = $<HTMLDialogElement>("[data-menu]");
const menuBtn = $<HTMLButtonElement>(".menu-btn");
if (menu) {
  $$("[data-menu-open]").forEach((b) => b.addEventListener("click", () => menu.showModal()));
  $$("[data-menu-close]").forEach((b) => b.addEventListener("click", () => menu.close()));
  // A click on the backdrop lands on the dialog element itself.
  menu.addEventListener("click", (e) => { if (e.target === menu) menu.close(); });
  menu.addEventListener("click", (e) => { if ((e.target as Element).closest("nav a")) menu.close(); });
}
const header = $("[data-header]");
if (header && menuBtn) {
  new IntersectionObserver(([e]) => menuBtn.classList.toggle("shown", !e.isIntersecting)).observe(header);
}

/* ── Accent: drifts through the curated set, calmly and never in the same order twice ──
   Each change is a 5s cross-fade (the CSS transition on --accent); the next colour is
   picked at random from those that are neither the current nor the previous one, and
   held for a random 7 to 14 seconds. Reduced motion keeps the brand's marigold. */
if (!reduced) {
  const root = document.documentElement;
  let now = DEFAULT_ACCENT, before = DEFAULT_ACCENT, timer = 0;
  const next = () => {
    const pool = accents.filter((a) => a.key !== now && a.key !== before);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    before = now;
    now = pick.key;
    root.style.setProperty("--accent", `rgb(${pick.rgb})`);
    schedule();
  };
  const schedule = () => { timer = window.setTimeout(next, 5000 + 7000 + Math.random() * 7000); };
  // Background tabs don't drift; the walk picks up where it left off.
  document.addEventListener("visibilitychange", () => {
    clearTimeout(timer);
    if (!document.hidden) schedule();
  });
  timer = window.setTimeout(next, 4000 + Math.random() * 4000);
}

/* ── Magnetic round buttons (fine pointers only) ── */
if (finePointer && !reduced) {
  for (const el of $$<HTMLElement>("[data-magnet]")) {
    const sx = { x: 0, v: 0 }, sy = { x: 0, v: 0 };
    let stopX: (() => void) | undefined, stopY: (() => void) | undefined;
    const set = () => { el.style.setProperty("--mx", `${sx.x}px`); el.style.setProperty("--my", `${sy.x}px`); };
    const to = (x: number, y: number) => {
      stopX?.(); stopY?.();
      stopX = springTo(sx, x, { duration: 0.45, bounce: 0.3, onUpdate: set });
      stopY = springTo(sy, y, { duration: 0.45, bounce: 0.3, onUpdate: set });
    };
    const zone = el.parentElement ?? el;
    zone.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const reach = r.width * 0.9;
      if (Math.hypot(dx, dy) > reach) return to(0, 0);
      to(dx * 0.35, dy * 0.35);
    });
    zone.addEventListener("pointerleave", () => to(0, 0));
  }
}

/* ── Work rows: a preview card that follows the cursor and slides between projects ── */
const rows = $<HTMLElement>("[data-rows]");
const preview = $<HTMLElement>("[data-preview]");
if (rows && preview && finePointer) {
  const px = { x: 0, v: 0 }, py = { x: 0, v: 0 };
  let stops: (() => void)[] = [], placed = false;
  const strip = $<HTMLElement>(".strip", preview)!;
  const set = () => { preview.style.setProperty("--px", `${px.x}px`); preview.style.setProperty("--py", `${py.x}px`); };
  rows.addEventListener("pointermove", (e) => {
    if (!placed) { px.x = e.clientX; py.x = e.clientY; set(); placed = true; }
    stops.forEach((s) => s());
    stops = reduced
      ? (px.x = e.clientX, py.x = e.clientY, set(), [])
      : [springTo(px, e.clientX, { duration: 0.6, onUpdate: set }), springTo(py, e.clientY, { duration: 0.6, onUpdate: set })];
  });
  for (const row of $$<HTMLElement>("[data-i]", rows)) {
    row.addEventListener("pointerenter", () => {
      strip.style.transform = `translateY(${-100 * Number(row.dataset.i)}%)`;
      preview.style.setProperty("--ps", "1");
    });
  }
  rows.addEventListener("pointerleave", () => { preview.style.setProperty("--ps", "0"); placed = false; });
}

/* ── The θ: tilts toward the pointer; a finger (or mouse) can spin it and let go ── */
const theta = $<HTMLElement>("[data-theta]");
if (theta && !reduced) {
  const rig = $<HTMLElement>(".theta-rig", theta)!;
  const rx = { x: 0, v: 0 }, ry = { x: 0, v: 0 };
  let sx: (() => void) | undefined, sy: (() => void) | undefined;
  const render = () => { rig.style.setProperty("--tx", `${rx.x}deg`); rig.style.setProperty("--ty", `${ry.x}deg`); };
  const tiltTo = (x: number, y: number, bounce = 0) => {
    sx?.(); sy?.();
    sx = springTo(rx, x, { duration: 0.8, bounce, onUpdate: render });
    sy = springTo(ry, y, { duration: 0.8, bounce, onUpdate: render });
  };
  const hero = theta.closest("section") ?? document.body;
  if (finePointer) {
    hero.addEventListener("pointermove", (e) => {
      if (dragging) return;
      const r = theta.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / innerWidth, ny = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      tiltTo(-ny * 24, nx * 36);
    });
    hero.addEventListener("pointerleave", () => tiltTo(0, 0));
  }
  // Drag to spin: tracks 1:1, rubber-bands past ±70°, springs home with the release velocity.
  let dragging = false, startX = 0, startY = 0, baseX = 0, baseY = 0;
  const vtx = velocityTracker(), vty = velocityTracker();
  theta.style.touchAction = "pan-y";
  theta.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    dragging = true; sx?.(); sy?.();
    theta.setPointerCapture(e.pointerId);
    startX = e.clientX; startY = e.clientY; baseX = rx.x; baseY = ry.x;
    vtx.reset(); vty.reset();
  });
  theta.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const lim = 70, size = theta.clientWidth;
    let y = baseY + ((e.clientX - startX) / size) * 180;
    let x = baseX - ((e.clientY - startY) / size) * 120;
    if (Math.abs(y) > lim) y = Math.sign(y) * (lim + rubberband(Math.abs(y) - lim, 180));
    if (Math.abs(x) > lim) x = Math.sign(x) * (lim + rubberband(Math.abs(x) - lim, 180));
    rx.x = x; ry.x = y; vtx.add(x); vty.add(y); render();
  });
  const release = () => {
    if (!dragging) return;
    dragging = false;
    rx.v = vtx.get(); ry.v = vty.get();
    // Let the throw carry it a little before the spring brings it home.
    const fx = Math.max(-60, Math.min(60, rx.x + project(rx.v) * 0.15));
    const fy = Math.max(-60, Math.min(60, ry.x + project(ry.v) * 0.15));
    sx = springTo(rx, fx, { duration: 0.35, onUpdate: render, onDone: () => tiltTo(0, 0, 0.3) });
    sy = springTo(ry, fy, { duration: 0.35, onUpdate: render });
  };
  theta.addEventListener("pointerup", release);
  theta.addEventListener("pointercancel", release);
}

/* ── Name marquee runs the way the page scrolls ── */
const marquee = $<HTMLElement>(".marquee");
if (marquee && !reduced) {
  let lastY = scrollY;
  addEventListener("scroll", () => {
    const dir = scrollY > lastY ? "fwd" : "back";
    if (Math.abs(scrollY - lastY) > 2 && marquee.dataset.dir !== dir) marquee.dataset.dir = dir;
    lastY = scrollY;
  }, { passive: true });
}

/* ── Local time in Athens ── */
const clock = $<HTMLElement>("[data-clock]");
if (clock) {
  const fmt = new Intl.DateTimeFormat(document.documentElement.lang === "el" ? "el-GR" : "en-GB", {
    timeZone: "Europe/Athens", hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });
  const tick = () => { clock.textContent = `Athens, ${fmt.format(new Date())}`; };
  tick();
  setInterval(tick, 30_000);
}

/* ── Video lightbox: <dialog>, Esc and the close button, plus swipe down to dismiss ── */
for (const opener of $$<HTMLButtonElement>("[data-lightbox-open]")) {
  const box = document.getElementById(opener.dataset.lightboxOpen!) as HTMLDialogElement | null;
  if (!box) continue;
  const sheet = $<HTMLElement>(".sheet", box)!;
  const video = $<HTMLVideoElement>("video", box);
  const state = { x: 0, v: 0 };
  let stop: (() => void) | undefined, startY = 0, base = 0, down = false;
  const vt = velocityTracker();
  const render = (y: number) => {
    sheet.style.transform = `translate3d(0, ${y}px, 0)`;
    box.style.setProperty("--bd", String(0.85 * Math.max(0, 1 - Math.abs(y) / (innerHeight * 0.6))));
  };
  opener.addEventListener("click", () => {
    stop?.(); state.x = 0; state.v = 0; render(0);
    box.showModal();
    video?.play().catch(() => {});
  });
  $$("[data-lightbox-close]", box).forEach((b) => b.addEventListener("click", () => box.close()));
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
  box.addEventListener("close", () => video?.pause());
  sheet.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 || (e.target as Element).closest("button")) return;
    down = true; stop?.(); startY = e.clientY; base = state.x; vt.reset(); vt.add(state.x);
  });
  sheet.addEventListener("pointermove", (e) => {
    if (!down) return;
    let y = base + e.clientY - startY;
    if (Math.abs(y) < 10 && !sheet.hasPointerCapture(e.pointerId)) return; // hysteresis
    sheet.setPointerCapture(e.pointerId);
    if (y < 0) y = -rubberband(-y, innerHeight);
    state.x = y; vt.add(y); render(y);
  });
  const up = () => {
    if (!down) return;
    down = false;
    const v = vt.get(), landing = state.x + project(v);
    if (landing > innerHeight * 0.25) {
      if (reduced) return box.close();
      state.v = v;
      stop = springTo(state, innerHeight, { duration: 0.35, onUpdate: render, onDone: () => box.close() });
    } else {
      state.v = v;
      stop = reduced ? (render((state.x = 0)), undefined) : springTo(state, 0, { bounce: 0.15, onUpdate: render });
    }
  };
  sheet.addEventListener("pointerup", up);
  sheet.addEventListener("pointercancel", up);
}

/* ── Muted clips play only while on screen, and never under reduced motion (the poster shows instead) ── */
const loops = $$<HTMLVideoElement>("video[data-inview]");
if (loops.length && !reduced) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      // A one-shot clip plays the first time it is seen, then rests on its last frame.
      if (v.hasAttribute("data-once")) {
        if (e.isIntersecting && !v.dataset.played) { v.dataset.played = "1"; v.play().catch(() => {}); }
        continue;
      }
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }
  }, { rootMargin: "200px 0px" });
  loops.forEach((v) => io.observe(v));
}

/* ── First-party page counter: no cookie, nothing stored on the device ── */
if (!navigator.webdriver) {
  const body = JSON.stringify({ p: location.pathname, r: document.referrer });
  try { navigator.sendBeacon("/api/hit", body); } catch { /* ignore */ }
}

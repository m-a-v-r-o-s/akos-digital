"use client";

/*
 * Vendored and trimmed from rdev/liquid-glass-react v1.1.1 (MIT License,
 * Copyright (c) Max Rovensky). https://github.com/rdev/liquid-glass-react
 *
 * Not installed as a dependency: the upstream package reads
 * `navigator.userAgent` in its render body (no "use client"), which throws
 * "navigator is not defined" during `next build`. Vendored here instead,
 * with the Firefox check moved into an effect.
 *
 * Trimmed vs upstream: shader mode, the polar/prominent displacement maps,
 * the overLight divs, and the onClick hover-glow layers are dropped, none
 * of this codebase's call sites use them. Layout is rewritten to sit in
 * normal document flow (upstream pins itself at position:absolute;
 * top/left:50% for a floating badge over a background image), and size
 * tracking uses a ResizeObserver instead of mount + window-resize only.
 */

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

// The upstream "standard" mode displacement map (a JPEG encoding an x/y
// offset field), trimmed from utils.ts: polarDisplacementMap and
// prominentDisplacementMap are dropped, unused since "shader"/"polar"/
// "prominent" modes never get used here.
const displacementMap =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/2wCEAAQDAwMDAwQDAwQGBAMEBgcFBAQFBwgHBwcHBwgLCAkJCQkICwsMDAwMDAsNDQ4ODQ0SEhISEhQUFBQUFBQUFBQBBQUFCAgIEAsLEBQODg4UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/CABEIAQABAAMBEQACEQEDEQH/xAAxAAEBAQEBAQAAAAAAAAAAAAADAgQIAQYBAQEBAQEBAQAAAAAAAAAAAAMCBAEACAf/2gAMAwEAAhADEAAAAPjPor6kOgOiKhKgKhKgOhKhOhKxKgKhOgKhKhKgKxOhKhOgKhKhKgKwKhKgKgKwG841nns9J/nn2KVCdCdCVAVCVCVAdCVCdiVAVidCVAVCVAdiVCVCdAVCVCVAVCVAVAViVZxsBrPPY6R/NvsY6E6ErEqAqE6ErAqE6E7E7ErA0ErArAqAqEuiVAXRLol0S6J0JUBWBUI0BXnG88djpH81+xjoToSoSoCoTsSoYQTsTsTQSsCsCsCsCsCoC6A0JeAuiXSLwn0SoioCoCoBsBrPFH0j+a/Yx0J0JUJUJ2BUMIR2MIRoBoJIBXnJAK840BUA0BdAegXhLpF4S8R+IuiVgVANAV546fSH5r9jHRHQFQlYxYnZQgnYwhQokgEgEmckzjecazlYD3OPQHoD0S8JcI/EXiPxF0SoSvONBFF0j+a/YxdI7EqA6KLGEKEKEGFI0AlA0AUzimYbzjecazjWce5w6BdEeCXhPhFwz8R+MuiVgVAdF0j+a/Yp0RUJ0MWUIUWUIUKUIJqBoArnJM4pmBMw3nCsw1mCs4+AegPBLxHwi4Z8KPGXSPojYH0ukfzX7FOiKhiyiylDiylDhBNRNQJAJcwpnBMopmC84XlCswdzj3OPQHwlwS8R8M+HHDPxl0ioDoukfzT7GOhOyiimzmzhDlShBNBNBJc4rmFMwJlBMwXlC82esoVmHucOgXgHxH4j4Zyccg/GfiOiKh6R/NPsY6GLOKObOUObOUI0KEAlEkzimYFygmUEyheXPeULzZ6yhWce5x8BeEuGfCj0HyI5EdM/EdD0h+a/Yx0U0cUflxNnNnCHCCdgSiSZgTMK5c6ZQvLnTLnvJnvKFZgrMHc5dAeiXijhn445E8g/RHTPpdI/mn2KdlFR5RzcTUTZxZwglYGgCmcEzAuUEyZ0y57yZ0yZ7yheUKzh3OPc5dEvEfij0RyI9E+iPGfT6T/NPsQ6OKiKmajy4ijmyOyKwNAFM4JlBMudMmdMue8mdMme8me8wVmGsw0A9A+kfjjxx6J9EememfT6W/MvsMqOamKiamKmKOKM7ErErAUzAmYLyZ0y50yZ0yZkyZ7yBeULzBeYazl0T6R9KPRPYj0T2J9B9Ppj8x+wjo4qY7M9iKmKg6MrIrErALzBeYEyZ0y50yZkyZ7x50yheXPeUbzjWcqA6I+lHYnsT6J7E9iOx0z+YfYBUc1MdmexHZjsHRlRBRDYBecEzZ7yAmXNeTOmTOmPOmXOmULyjeYbzlYnQxRx057E9mexPYij6a/L/r86OOzPpjsR6Y7B9MqIaILDPYZ7zZ0y57y50yZ0x5kyAmXPeUEyjeYUznQnYnRTUTUT2JqJ7EUfTn5d9fFRx2Z9EdmPTHjLsF0h6I2OegzXmzJmzplz3lzJjzpkBMudMoplBM5JnOwOyiimzmomomonsHRdO/l318VFHYj0x6I9McgumXiHpDQ56DPebMmbNebMmXMmQEy50yguQEzCmYkA7GLGEKaObibiaOKOKPp38s+vCsj7EeiPTHIP0Hwx6ReMKDP0M95895syZ815cy5c6ZQTKCZRXMKZiQDQYQYsps5uJs5qIsjounvyz68KyLpx4z9Mcg+GXoLxl4g6IUGes+a8+e82ZM2dMuZMoJmBcwrlJM5IBoMKMoUWc2c3E0cWRUXT/wCV/XQ2R0RdiPQfDPkFwy9BeIOiHQz0Ges+e82dM2ZM2dMwLmBcwpmJc5qBoMIUIUoU2c2cWZ0R0PT/AOV/XQ2RUJdM+wfDL0Hwy5A+EfEHQz0AUGe8+dM2e82dcwJnFcwrnJc5IEKUIMIUoUWc2cWRUJ0PT/5V9dFYjZFRF0z8ZeM+QPDLxD4Q6OfoBQhefPeYEz50ziucUzCoEuclCEKFGUKEKLOLI7E6EqHqD8o+uhsRsisSoi6ZeM+QPiHhj0R8IUIdALALzgmcEzimcVAlzioGomgyhQgwhRZHZFQHQlQ9Qfk/10NiVkNiNiVGXiPxj4x8Q9IfCFCPRCwC84oA3nFQFM5KBKJIMKEIUWRoUUJWJUJ0BUPUH5L9dDZFYigjYjZHRF0x8Q9IvEHRHojQjQhecUAUAkEkziomgGgkoxZGgxZFQFQlYnQHRdPfj/10KCSCKESCNiVkViPSLpD0h6I0Q0I0A2IoBWBIJIBKBIJoJIJ2R2J0JWBUJ0JUB0XTv479dFZDYiglYigkhEgjZFQjRFQjRFQjQigFYigHYigmgEgmglYlYnQlQlYlQHQlQnQ9P/kf1yVkNiNCNkNiVENiNiViNEViNkVCVgKCViViViSCViSCVgdCViVCViVCdgVCVCdD1D+U/XBWQ2I0I2Q2JUQ2I0JWQ0I2JUQ2JUI2JUI2J0JWJWJWA2R0BWJ0I2JUJ2BUJUJ0P//EABkQAQEBAQEBAAAAAAAAAAAAAAECABEDEP/aAAgBAQABAgB1atWrVq1atWrVq1atWrVq1atWrVq1atWrVq+OrVq1atWrVq1atWrVq1atWrVq1atWrVq1atXxVppppppdWrVq1atWrVq1NNNNNNNNNNNPVWmmmmms6tWrVq1atWpppppppppppppp6q0000uc51atWrVq1ammmmmmmmmmmmmt1Vpppc5znVq1atWrVqaaaaaaaaaaaaaeqtNLnOc51atWrVq1ammmmmmmmmmmmmnqrS5znOc6tWrVq16222mmmmmmlVppp6tKuc5znOrVq1a9TbbbbTTTTTSq000qtLnOc5zq1atWrW0222200000qqqtKqrnOc5zq1atTbbbbbbbbTTTSqqqqqq5znOc6tTTTbbbbbbbbTTTSqqqqrlVznOctNNNtttttttttNNNNKqqqrqznKqrTTTTbbbbbbbbbTTTSqqqqrqznOc5aaaabbbbbbbbbaaaaVVVVVdWc5znVq1NNttttttttttNNKqqqqudWc5znVq16tbbbbbbbbbbTTSqqqq5XVnOc6tWrVrb1tttttttttNNKqqqqrWrK5VWmmm2230bbbbbbaaaXOc5zlVa1KuVVppptttt9G22222mmlzlVznK6tWVVWmmmm2222222222mlznOc5znLWppVVWmmm22222229bTWrOc5znOcq1qaaVpWmm222222229erVqznOc5znKtatStK0rTbTTbbbberXr1as5znOc5aVpppppWlabaabbbb1ta9WrVnOc5znU0rTTTTTTTTTbTTbbbTWvVq1as5znOdTTStNNNNNNNNNtNNtttN6tWvVq1ZznOrU00rTTTTTTTTTTTTTbTWvVq1atWrOc6tTTTStNNNNNNNNNNtNNtNa9WrVq1Z1Z1NNNNNK1q1NNNNNNNNNNNtNatWrVq1atWrU00000rWrVq1atWrVq1alaaa1atWrVq1NNNammmmla1atWrVq1aterVq16tWrVnVqa1NK1qaaaVX/xAAWEAADAAAAAAAAAAAAAAAAAAAhgJD/2gAIAQEAAz8AaExf/8QAGhEBAQEBAQEBAAAAAAAAAAAAAQISEQADEP/aAAgBAgEBAgDx48ePHjx48ePHjx48ePHjx48ePHjx48ePHj86IiIiIiInjx48ePHjx48IiIiIj0oooooooooRERER73ve60UUUUUUVrWiiiiiihERERER73ve97ooooorRWiiiiihKERERER73ve973RRRRWtFFFFFFCIiIiIiPe973ve60UUVrRRRRRRQiIlCIiI973ve973pRRWiiiiiiiiiiiiiiihEe973ve973RRWtFFFFFFFFFFFFFFFFFFa13ve973WitaKKKKKKKKKKKKKKKKKK1rWtd1rutFa1oooooooooooosssooorWta1rWta1rRRRRRRRRRRZZZZZZZZZWta1rWta1rRRRRRRRRZZZZZZZZZZZZe9a1rWta1rWitaKLLLLLLLLLLLLLLLLL3rWta1rWtFbLLLLLLLLLLLLLLLLLLLL3vWta1rWita1ssssssss+hZZZZZZZZe961rWta0Vre97LLLLLLLLLLLPoWWWWWXrWta1oorWta3ssss+hZZZZ9Cyyyyyyyyiita1orWta1ve9llllllllllllllllFFa0VorWta1ve9llllllllllllllllllFFFaK1rWta1rWiyyyyyyyyyyyyiiiiiiitFFa1rWta1oosoosssssoooosoooorRRRWta1rWta0UUUUUWUUUUUUUUUUUVoooorWta1rWtaKKKKKKmiiiiiiiiiiiiiiitd73ve61oSiiipoqaKKKKKKKKKK0UUUVrve973vREREZoSihEooooorRRRRWtd73ve9EREREREoSiiiiitFllllla73ve9ERERERESiiiiiitH0PoWWWWVrXe96IiIiMoiJRRRRRRWjwlFFllllFFd6IiIiIlCUUUUUUUUUePHjx48ePCIiIiIiIiUUUUUUUUUUUePHjx48ePHjx48ePHjx48IiUUUUUUJRRRX//xAAWEQADAAAAAAAAAAAAAAAAAAABYJD/2gAIAQIBAz8AtEV7/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAECEP/aAAgBAwEBAgCtNNNNNNNNNNNNNNNNNNNNNNNNNNNNNcrTTTTTTTTTTTTTTTTTTTTTTTTTTTTTXKrTTTTTTTU000000000000000000001FVpppppqampqaaaaaaaaaaaaaaaaaaaa5Vaaaaampqampqammmmmmmmmmmlaaaaaaiq0001NTU1NTU1NTTTTTTTTTTSqqtNNNcqtNNSyzU1LNTU1NTTTTTTTTTSqqq001ytNLLLLNTU1NTU1NTbbbTTTTTSqqq001ytNLLLLLNTU1NTU3NttttNNNNNKqq001KrSyyyyyzU1NTU3Nzc02220000qqqqrSqqyyyyyzU1NTU3Nzc3NttttNNNKqqqqqqssssss1NTU3Nzc3NzbbbbTTTSqqqqqqrLLLLLNTU1Nzc3Nzc22220000qqqqqqqqssss1NTU3Nzc3NzbbbbbTTSqqqqqqqqqqzU1NTc3Nzc3Nzbc22000qqqqqqqqqqqtTU3Nzc3Nzc3NtzbTTSqqqqrKqqqqqtNNzc23Nzc3Nzc3NTU1KqqqrKqqqqqtNNNNttzc3Nzc3NzU1NLLLLLKqqqqqqqq0022223Nzc3NzU1NSyyyyyyqqqqqqqrTTbbbbc3Nzc3NTU1LLLLLLKsqqqqqqrTTTTbbbc3Nzc1NTUsssssssqqqqqqrTTTTTbbbTc3NTU1NTUsssssqqqqqqqq0000222023NTU1NTUsssssqqqqqqqq000000003NTU1NTU1LLLLLNKrTSqqqqtNNNNNNtNNTU1NSzUssss00qq0qqqqrTTTTTTTTTU1NTUs1LLLNNNKrTTTSqqq00000000001NTU1LNTU0000qtNNNKqqqtNNNNNNNNTU1NTUs1NNNNNKss1NNNK00qtK0000001NNTU0s000000qq000001NKrStNNNNK1NNNNStNNNNNKqtNNNNNNNK0000000rU0000rTTTTTSq00000rTTTTTTTTTTTTTTTTStNNNNKr/xAAUEQEAAAAAAAAAAAAAAAAAAACg/9oACAEDAQM/AAAf/9k=";

const ACTIVATION_ZONE = 200;

function GlassFilter({
  id,
  displacementScale,
  aberrationIntensity,
  width,
  height,
}: {
  id: string;
  displacementScale: number;
  aberrationIntensity: number;
  width: number;
  height: number;
}) {
  return (
    <svg style={{ position: "absolute", width, height }} aria-hidden="true">
      <defs>
        <filter id={id} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
          <feImage
            id={`${id}-feimage`}
            x="0"
            y="0"
            width="100%"
            height="100%"
            result="DISPLACEMENT_MAP"
            href={displacementMap}
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Edge mask, derived from the displacement map itself */}
          <feColorMatrix
            in="DISPLACEMENT_MAP"
            type="matrix"
            values="0.3 0.3 0.3 0 0
                   0.3 0.3 0.3 0 0
                   0.3 0.3 0.3 0 0
                   0 0 0 1 0"
            result="EDGE_INTENSITY"
          />
          <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
            <feFuncA type="discrete" tableValues={`0 ${aberrationIntensity * 0.05} 1`} />
          </feComponentTransfer>

          <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

          {/* Chromatic aberration: each channel displaced by a slightly
              different scale, then screen-blended back together */}
          <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale={-displacementScale} xChannelSelector="R" yChannelSelector="B" result="RED_DISPLACED" />
          <feColorMatrix in="RED_DISPLACED" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="RED_CHANNEL" />

          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={-displacementScale - aberrationIntensity * 0.05}
            xChannelSelector="R"
            yChannelSelector="B"
            result="GREEN_DISPLACED"
          />
          <feColorMatrix in="GREEN_DISPLACED" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="GREEN_CHANNEL" />

          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={-displacementScale - aberrationIntensity * 0.1}
            xChannelSelector="R"
            yChannelSelector="B"
            result="BLUE_DISPLACED"
          />
          <feColorMatrix in="BLUE_DISPLACED" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="BLUE_CHANNEL" />

          <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
          <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />
          <feGaussianBlur in="RGB_COMBINED" stdDeviation={Math.max(0.1, 0.5 - aberrationIntensity * 0.1)} result="ABERRATED_BLURRED" />
          <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION" />

          <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

          <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Space inside the glass ring, around the children. Default hugs them exactly. */
  padding?: string;
  cornerRadius?: number;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  /**
   * How far the glass leans toward the cursor within a 200px activation
   * zone. 0 (default) skips mouse tracking entirely: no listener, no
   * per-pointer-move re-render. Only spend this on an element worth a
   * mousemove listener; see LIQUID_GLASS_PLAN.md §3.3.
   */
  elasticity?: number;
  /**
   * Fades the blur/displacement/rim layers in or out (default true, always
   * on) without touching `children`'s own visibility. For a glass surface
   * that should only appear conditionally, e.g. once the page has scrolled
   * past a threshold, over content that must stay visible either way.
   */
  active?: boolean;
}

export default function LiquidGlass({
  children,
  className = "",
  style,
  padding = "0",
  cornerRadius = 999,
  displacementScale = 70,
  blurAmount = 0.625,
  saturation = 140,
  aberrationIntensity = 2,
  elasticity = 0,
  active = true,
}: LiquidGlassProps) {
  const filterId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFirefox, setIsFirefox] = useState(false);
  const [glassSize, setGlassSize] = useState({ width: 0, height: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [stretch, setStretch] = useState({ x: 1, y: 1 });

  // Firefox doesn't render the SVG displacement filter. Checked client-side
  // only, defaulting to "filter on", so SSR and first paint always match.
  useEffect(() => {
    setIsFirefox(navigator.userAgent.toLowerCase().includes("firefox"));
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setGlassSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (elasticity === 0) return;
    const handleMouseMove = (e: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const deltaX = e.clientX - (rect.left + rect.width / 2);
      const deltaY = e.clientY - (rect.top + rect.height / 2);

      setMouseOffset({ x: (deltaX / rect.width) * 100, y: (deltaY / rect.height) * 100 });

      const edgeDistance = Math.hypot(
        Math.max(0, Math.abs(deltaX) - rect.width / 2),
        Math.max(0, Math.abs(deltaY) - rect.height / 2),
      );
      if (edgeDistance > ACTIVATION_ZONE) {
        setTranslate({ x: 0, y: 0 });
        setStretch({ x: 1, y: 1 });
        return;
      }

      const fadeIn = 1 - edgeDistance / ACTIVATION_ZONE;
      setTranslate({ x: deltaX * elasticity * 0.1 * fadeIn, y: deltaY * elasticity * 0.1 * fadeIn });

      const centerDistance = Math.hypot(deltaX, deltaY);
      if (centerDistance === 0) {
        setStretch({ x: 1, y: 1 });
        return;
      }
      const normX = Math.abs(deltaX) / centerDistance;
      const normY = Math.abs(deltaY) / centerDistance;
      const intensity = Math.min(centerDistance / 300, 1) * elasticity * fadeIn;
      setStretch({
        x: Math.max(0.8, 1 + normX * intensity * 0.3 - normY * intensity * 0.15),
        y: Math.max(0.8, 1 + normY * intensity * 0.3 - normX * intensity * 0.15),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [elasticity]);

  const transform = `translate(${translate.x}px, ${translate.y}px) scaleX(${stretch.x}) scaleY(${stretch.y})`;

  // Position and any caller transition default rather than get clobbered:
  // a plain spread-then-override would let a later hardcoded key win over
  // whatever the caller passed for that same key.
  const wrapperStyle: CSSProperties = {
    ...style,
    position: style?.position ?? "relative",
    transform,
    transition: [style?.transition, "transform 0.2s ease-out"].filter(Boolean).join(", "),
  };

  return (
    <div ref={wrapperRef} className={`liquid-glass ${className}`} style={wrapperStyle}>
      <GlassFilter
        id={filterId}
        displacementScale={displacementScale}
        aberrationIntensity={aberrationIntensity}
        width={glassSize.width}
        height={glassSize.height}
      />

      <div
        className="liquid-glass-surface"
        style={{
          position: "relative",
          borderRadius: cornerRadius,
          padding,
          overflow: "hidden",
          boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.25)",
        }}
      >
        <span
          aria-hidden="true"
          className="liquid-glass-backdrop"
          style={{
            position: "absolute",
            inset: 0,
            opacity: active ? 1 : 0,
            filter: isFirefox ? undefined : `url(#${filterId})`,
            backdropFilter: `blur(${4 + blurAmount * 32}px) saturate(${saturation}%)`,
            WebkitBackdropFilter: `blur(${4 + blurAmount * 32}px) saturate(${saturation}%)`,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>

      {/* Specular rim, reacts to mouseOffset only where elasticity > 0 wired it up */}
      <span
        aria-hidden="true"
        className="liquid-glass-rim"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: cornerRadius,
          pointerEvents: "none",
          mixBlendMode: "screen",
          opacity: active ? 0.2 : 0,
          padding: "1.5px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          boxShadow:
            "0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)",
          background: `linear-gradient(${135 + mouseOffset.x * 1.2}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${
            0.12 + Math.abs(mouseOffset.x) * 0.008
          }) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%, rgba(255,255,255,${
            0.4 + Math.abs(mouseOffset.x) * 0.012
          }) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%, rgba(255,255,255,0) 100%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="liquid-glass-rim"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: cornerRadius,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          opacity: active ? 1 : 0,
          padding: "1.5px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          boxShadow:
            "0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)",
          background: `linear-gradient(${135 + mouseOffset.x * 1.2}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${
            0.32 + Math.abs(mouseOffset.x) * 0.008
          }) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%, rgba(255,255,255,${
            0.6 + Math.abs(mouseOffset.x) * 0.012
          }) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%, rgba(255,255,255,0) 100%)`,
        }}
      />
    </div>
  );
}

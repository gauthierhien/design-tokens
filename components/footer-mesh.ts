import {
  ShaderFitOptions,
  ShaderMount,
  meshGradientFragmentShader,
  type PaperShaderElement,
} from "@paper-design/shaders";

type Rgba = [number, number, number, number];

const SPEED = 0.45;
const FADE_MS = 1100;
const DESKTOP = "(min-width: 768px)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const STATE_KEY = "__footerMesh";

const BLACK: Rgba = [0, 0, 0, 1];
const WHITE: Rgba = [1, 1, 1, 1];

type MeshState = {
  abort: AbortController;
  onChange: () => void;
  desktop: MediaQueryList;
  reduced: MediaQueryList;
  cancelFade: () => void;
};

function cssColor(value: string): Rgba {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return WHITE;
  ctx.fillStyle = "#000";
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255, a / 255];
}

function mixColor(a: Rgba, b: Rgba, t: number): Rgba {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
    1,
  ];
}

function restColors(): Rgba[] {
  return [
    BLACK,
    BLACK,
    mixColor(BLACK, WHITE, 0.35),
    WHITE,
    BLACK,
    mixColor(BLACK, WHITE, 0.62),
    BLACK,
  ];
}

function rainbowColors(): Rgba[] {
  const hue = (h: number) => cssColor(`oklch(0.62 0.18 ${h})`);
  return [BLACK, hue(28), BLACK, hue(125), BLACK, hue(210), hue(320)];
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function desiredSpeed() {
  if (window.matchMedia(REDUCED).matches) return 0;
  if (!window.matchMedia(DESKTOP).matches) return 0;
  return SPEED;
}

export function mountFooterMesh() {
  const host = document.querySelector<HTMLElement>(".footer-mesh");
  if (!host) return;

  const win = window as Window & { [STATE_KEY]?: MeshState };
  const prev = win[STATE_KEY];
  if (prev) {
    prev.cancelFade();
    prev.abort.abort();
    prev.desktop.removeEventListener("change", prev.onChange);
    prev.reduced.removeEventListener("change", prev.onChange);
  }

  (host as PaperShaderElement).paperShaderMount?.dispose();

  const rest = restColors();
  const rainbow = rainbowColors();
  let mount: ShaderMount;
  try {
    mount = new ShaderMount(
      host,
      meshGradientFragmentShader,
      {
        u_fit: ShaderFitOptions.cover,
        u_scale: 0.85,
        u_rotation: 0,
        u_originX: 0.5,
        u_originY: 0.5,
        u_offsetX: -0.06,
        u_offsetY: 0.04,
        u_worldWidth: 0,
        u_worldHeight: 0,
        u_colors: rest,
        u_colorsCount: rest.length,
        u_distortion: 0.62,
        u_swirl: 0.18,
        u_grainMixer: 0.42,
        u_grainOverlay: 0,
      },
      { alpha: false, antialias: false, powerPreference: "low-power" },
      desiredSpeed(),
      900,
      2,
      720 * 1000,
    );
  } catch (error) {
    host.querySelector(":scope > canvas")?.remove();
    console.warn("Mesh WebGL indisponible", error);
    return;
  }

  mount.canvasElement.setAttribute("aria-hidden", "true");

  const root = host.closest<HTMLElement>(".footer-root");
  const btn = root?.querySelector<HTMLElement>(".footer-cta-btn");
  const abort = new AbortController();

  const hovered = { current: false };
  const focused = { current: false };
  let blend = 0;
  let fadeFrame = 0;

  const paint = (t: number) => {
    mount.setUniforms({
      u_colors: rest.map((color, index) =>
        mixColor(color, rainbow[index] ?? color, t),
      ),
      u_colorsCount: rest.length,
    });
  };

  const go = (on: boolean) => {
    root?.classList.toggle("is-cta-hover", on);
    const target = on ? 1 : 0;
    cancelAnimationFrame(fadeFrame);
    if (window.matchMedia(REDUCED).matches) {
      blend = target;
      paint(blend);
      return;
    }
    const origin = blend;
    const started = performance.now();
    const step = (now: number) => {
      const raw = Math.min(1, (now - started) / FADE_MS);
      blend = origin + (target - origin) * easeInOut(raw);
      paint(blend);
      if (raw < 1) fadeFrame = requestAnimationFrame(step);
    };
    fadeFrame = requestAnimationFrame(step);
  };

  const sync = () => go(hovered.current || focused.current);

  btn?.addEventListener(
    "pointerenter",
    () => {
      hovered.current = true;
      sync();
    },
    { signal: abort.signal },
  );
  btn?.addEventListener(
    "pointerleave",
    () => {
      hovered.current = false;
      sync();
    },
    { signal: abort.signal },
  );
  btn?.addEventListener(
    "focus",
    () => {
      focused.current = btn.matches(":focus-visible");
      sync();
    },
    { signal: abort.signal },
  );
  btn?.addEventListener(
    "blur",
    () => {
      focused.current = false;
      sync();
    },
    { signal: abort.signal },
  );

  const desktop = window.matchMedia(DESKTOP);
  const reduced = window.matchMedia(REDUCED);
  const onChange = () => mount.setSpeed(desiredSpeed());
  desktop.addEventListener("change", onChange);
  reduced.addEventListener("change", onChange);
  win[STATE_KEY] = {
    abort,
    onChange,
    desktop,
    reduced,
    cancelFade: () => cancelAnimationFrame(fadeFrame),
  };
}

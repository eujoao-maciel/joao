import { createCanvasLoop } from "./canvas-loop.js";
import { getAsciiSettings } from "./config.js";

export function initAsciiWave(root = document) {
  const canvas = root.querySelector("[data-ascii]");
  if (!canvas) return;
  return createCanvasLoop(
    canvas,
    ({ context, width, height, time }) => {
      if (!width || !height) return;
      const { cellSize } = getAsciiSettings(innerWidth);
      const points = [];
      const columns = Math.max(10, Math.floor(width / cellSize / 2));
      const phase = time * 0.23;
      // A ruled ribbon twisted around a vertical axis, projected with perspective.
      for (let row = -5; row <= height / cellSize + 5; row++) {
        const v = (row * cellSize) / height;
        const angle = v * Math.PI * 2.35 - phase;
        const center = width * (0.53 + 0.12 * Math.sin(v * 7 + phase * 0.6));
        for (let column = -columns; column <= columns; column++) {
          const u = column / columns;
          const twist = angle + u * 0.47;
          const z = Math.sin(twist) * u;
          const perspective = 1 / (1 - z * 0.27);
          const x = center + Math.cos(twist) * u * width * 0.49 * perspective;
          const y = v * height + Math.sin(twist) * u * height * 0.075;
          const light = 0.22 + 0.68 * Math.pow(1 - Math.abs(u), 0.6) + z * 0.22;
          points.push({ x, y, z, light, u, row, column });
        }
      }
      points.sort((a, b) => a.z - b.z);
      context.font = `${Math.max(6, cellSize * 0.64)}px monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      for (const p of points) {
        const edgeFade = Math.min(1, p.y / 30, (height - p.y) / 30);
        context.fillStyle = `rgba(240,240,240,${Math.max(0, Math.min(0.85, p.light * edgeFade))})`;
        const character = p.light > 0.82 ? "+" : p.light > 0.58 ? ":" : ".";
        context.fillText(character, p.x, p.y);
      }
    },
    { visibilityTarget: canvas.closest(".hero") },
  );
}

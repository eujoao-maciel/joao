/** Ciclo compartilhado. draw recebe tempo em segundos, dimensões CSS e modo estático.
 * A fita ASCII é desenhada pelo renderizador ascii-wave.js.
 */
export function createCanvasLoop(
  canvas,
  draw,
  { visibilityTarget = canvas } = {},
) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  let frame = 0;
  let lastTime = null;
  let elapsed = 0;
  let width = 0;
  let height = 0;
  const render = () => {
    context.clearRect(0, 0, width, height);
    draw({
      context,
      width,
      height,
      time: reducedMotion.matches ? 0 : elapsed,
      static: reducedMotion.matches,
    });
  };
  const tick = (now) => {
    if (lastTime !== null) elapsed += Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    render();
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    lastTime = null;
    if (!visible || document.hidden) return;
    if (reducedMotion.matches) render();
    else frame = requestAnimationFrame(tick);
  };
  const resize = new ResizeObserver(() => {
    ({ width, height } = canvas.getBoundingClientRect());
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    sync();
  });
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  resize.observe(canvas);
  observer.observe(visibilityTarget);
  document.addEventListener("visibilitychange", sync);
  reducedMotion.addEventListener("change", sync);
  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
    reducedMotion.removeEventListener("change", sync);
  };
}

export function initCarousels(root = document) {
  root.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const progress = carousel.querySelector('[data-carousel-progress]');
    if (!track || !previous || !next) return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const maximum = track.scrollWidth - track.clientWidth;
      previous.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= maximum - 1;
      if (progress) {
        progress.style.setProperty('--carousel-progress', maximum > 0
          ? Math.max(0, Math.min(1, track.scrollLeft / maximum)) : 0);
        progress.parentElement.hidden = maximum <= 1;
      }
    };
    const scrollTo = (left) => track.scrollTo({
      left,
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
    const move = (direction) => {
      const card = track.firstElementChild;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
      scrollTo(track.scrollLeft + direction * step);
    };
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('keydown', (event) => {
      // Não capturar teclas de eventuais controles dentro dos cards.
      if (event.target !== track) return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') scrollTo(0);
      else if (event.key === 'End') scrollTo(track.scrollWidth);
      else move(event.key === 'ArrowLeft' ? -1 : 1);
    });
    track.addEventListener('scroll', update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(track);
    [...track.children].forEach((card) => resize.observe(card));
    update();
  });
}

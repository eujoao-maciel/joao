import { initNavigation } from "./components/navigation.js";
import { initCarousels } from "./components/carousel.js";
import { initAsciiWave } from "./animations/ascii-wave.js";

initNavigation();
initCarousels();
initAsciiWave();

// Os destinos serão ativados quando as próximas seções forem implementadas.
document.querySelectorAll("[data-future-section]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (document.querySelector(link.getAttribute("href"))) return;
    event.preventDefault();
    const notice = document.querySelector("[data-section-notice]");
    if (notice) notice.textContent = "Esta seção estará disponível em breve.";
  });
});

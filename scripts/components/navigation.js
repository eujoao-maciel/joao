// Contrato: botão imediatamente antes do painel, com aria-controls e aria-expanded.
export function initNavigation(root = document) {
  root.querySelectorAll("[data-menu-toggle]").forEach((toggle) => {
    const panel = document.getElementById(toggle.getAttribute("aria-controls"));
    if (!panel) return;
    const close = () => toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => {
      toggle.setAttribute(
        "aria-expanded",
        String(toggle.getAttribute("aria-expanded") !== "true"),
      );
    });
    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });
    toggle.parentElement.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        close();
        toggle.focus();
      }
    });
  });
}

// Valores em pixels CSS. Consultar no renderizador para acompanhar redimensionamentos.
export function getAsciiSettings(width) {
  return {
    cellSize: width <= 640 ? 14 : 9,
    fontFamily: 'monospace',
    characters: ' .:-=+*#%@',
  };
}

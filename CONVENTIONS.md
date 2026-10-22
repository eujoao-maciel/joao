# Padrões de implementação

Base derivada dos oito mockups desktop/mobile e do AGENTS.md. Esta etapa configura a fundação; a página, a fonte bitmap final e o renderizador da fita ainda serão implementados.

## Estilos

`styles/main.css` é o único ponto de entrada. A ordem das camadas é tokens → base → layout → components → utilities. Alterar cores, fontes, espaçamentos e tempos em `tokens.css`; evitar repetir valores nos componentes. Usar classes no padrão bloco (`project-card`), elemento (`project-card__body`) e variante (`button--primary`). Estados interativos usam atributos nativos como `disabled` e `aria-expanded`. JavaScript seleciona atributos `data-*`, nunca classes de aparência.

O breakpoint compartilhado é 40rem. Hero mantém texto à esquerda e canvas à direita em todas as telas. Projetos passam de três colunas para uma; contatos também. Serviços mantêm trilho horizontal. Imagens dos projetos usam altura automática e escala de cinza, sem recorte. Textura é estática, discreta e não recebe eventos. Fontes finais devem ser locais em `assets/fonts`, com `font-display: swap`; a família bitmap está reservada e usa fallback até o arquivo aprovado estar disponível.

## Componentes

Reutilizar HTML semântico e classes; não criar um sistema de renderização de HTML em JavaScript. Conteúdo principal fica no `index.html`; `pages/` fica reservado para futuras páginas. Assets reais vão em `assets/images/`.

- Botões: `.button` e opcionalmente `.button--primary`. Navegação usa `<a>`; ações usam `<button type="button">`.
- Projetos: `<article class="project-card">`, imagem com `.project-card__image`, conteúdo `.project-card__body`, stack `.project-card__stack` entre descrição e link. Preencher `alt` com descrição útil da captura real.
- Serviços: região identificada com `data-carousel`, controles com `data-carousel-prev` e `data-carousel-next`, ambos com nome acessível e `aria-controls` apontando para o ID do trilho. Trilho `.services__track[data-carousel-track]` com `tabindex="0"`, `role="region"` e nome acessível; cada card usa `.service-card`. Setas complementam a rolagem nativa por toque e teclado.
- Menu: contêiner `.site-nav`; botão `.site-nav__toggle[data-menu-toggle]` com nome acessível, `aria-expanded="false"` e `aria-controls` apontando para o painel imediatamente seguinte `.site-nav__links`. Links reais por âncora. Escape fecha e devolve foco ao botão; selecionar link fecha o menu.
- Contatos: contêiner `.contact-links` e links `.contact-link`, preenchidos apenas com URLs e e-mail confirmados.

Módulos em `scripts/components/` exportam inicializadores chamados uma única vez por `main.js`. Ausência do componente no documento é permitida. Não registrar listeners dentro de loops de animação.

## Animações

Transições de interface usam tokens de duração e easing, limitadas a cor e fundo nesta base. Respeitar `prefers-reduced-motion` no CSS e JavaScript.

Canvas decorativo usa `aria-hidden="true"`, sem foco e sem eventos de ponteiro, dentro de `.hero__art`. O renderizador ASCII deverá importar `createCanvasLoop` e `getAsciiSettings`; chamar o ciclo com `visibilityTarget` apontando para a hero. `draw` recebe contexto, largura/altura em pixels CSS, tempo em segundos e indicador `static`. Usar `cellSize` maior no celular para reduzir densidade. O ciclo controla resolução, requestAnimationFrame, pausa fora da hero, aba oculta e quadro estático com movimento reduzido. A função retornada limpa observers e listeners quando necessário. Não criar um segundo ciclo para a mesma arte.

## Validação

Ao implementar as seções: conferir mockups em desktop e celular, console, navegação por teclado, foco, preferência de movimento reduzido e ausência de rolagem horizontal da página. Só o trilho de serviços deve rolar lateralmente. Validar em preview antes de qualquer publicação solicitada.

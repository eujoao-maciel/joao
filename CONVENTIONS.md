# Padrões de implementação

Base derivada dos oito mockups desktop/mobile e do AGENTS.md. A hero está implementada em pages/hero.html, com renderizador ASCII em scripts/animations/ascii-wave.js. O nome é texto HTML em Oxanium, a família compartilhada por todos os títulos. A seção de projetos usa cards estáticos na mesma página. Serviços usam uma faixa horizontal com controles; contatos ainda serão implementados.

## Estilos

`styles/main.css` é o único ponto de entrada. A ordem das camadas é tokens → base → layout → components → utilities. Alterar cores, fontes, espaçamentos e tempos em `tokens.css`; evitar repetir valores nos componentes. Usar classes no padrão bloco (`project-card`), elemento (`project-card__body`) e variante (`button--primary`). Estados interativos usam atributos nativos como `disabled` e `aria-expanded`. JavaScript seleciona atributos `data-*`, nunca classes de aparência.

O breakpoint compartilhado é 40rem. Hero mantém texto à esquerda e canvas à direita em todas as telas. Projetos passam de três colunas para uma; contatos também. Serviços mantêm trilho horizontal. Imagens dos projetos usam altura automática e escala de cinza, sem recorte. Textura é estática, discreta e não recebe eventos. Títulos usam `--font-title: Oxanium`, com pesos 700 e 800. A fonte é carregada pelo Google Fonts no head de `pages/hero.html`, com `display=swap` e fallback sans-serif. Textos de corpo continuam monoespaçados. Novas páginas com títulos devem incluir o mesmo carregamento da fonte.

## Componentes

Reutilizar HTML semântico e classes; não criar um sistema de renderização de HTML em JavaScript. O `index.html` é o ponto de entrada e encaminha para a página completa `pages/hero.html`. O HTML é estático e não depende de fetch ou JavaScript para aparecer. Para executar os módulos ES, usar `npm run dev` e abrir http://localhost:4173; não abrir pelo protocolo file://. O servidor é exclusivo para desenvolvimento; a publicação continua estática na Vercel. Assets reais vão em `assets/images/`.

- Botões: `.button` e opcionalmente `.button--primary`. Navegação usa `<a>`; ações usam `<button type="button">`.
- Projetos: `<article class="project-card">`, imagem com `.project-card__image`, conteúdo `.project-card__body`, stack `.project-card__stack` entre descrição e link. Preencher `alt` com descrição útil da captura real.
- Serviços: região identificada com `data-carousel`, controles com `data-carousel-prev` e `data-carousel-next`, ambos com nome acessível e `aria-controls` apontando para o ID do trilho. Trilho `.services__track[data-carousel-track]` com `tabindex="0"`, `role="region"` e nome acessível; cada card usa `.service-card`. Setas complementam a rolagem nativa por toque e teclado.
- Menu: contêiner `.site-nav`; botão `.site-nav__toggle[data-menu-toggle]` com nome acessível, `aria-expanded="false"` e `aria-controls` apontando para o painel imediatamente seguinte `.site-nav__links`. Links reais por âncora. Escape fecha e devolve foco ao botão; selecionar link fecha o menu.
- Contatos: contêiner `.contact-links` e links `.contact-link`, preenchidos apenas com URLs e e-mail confirmados.

Módulos em `scripts/components/` exportam inicializadores chamados uma única vez por `main.js`. Ausência do componente no documento é permitida. Não registrar listeners dentro de loops de animação.

## Animações

Transições de interface usam tokens de duração e easing, aplicadas a cor, fundo e ao deslocamento discreto da seta nos links de projeto. Respeitar `prefers-reduced-motion` no CSS e JavaScript.

Canvas decorativo usa `aria-hidden="true"`, sem foco e sem eventos de ponteiro, dentro de `.hero__art`. O renderizador ASCII deverá importar `createCanvasLoop` e `getAsciiSettings`; chamar o ciclo com `visibilityTarget` apontando para a hero. `draw` recebe contexto, largura/altura em pixels CSS, tempo em segundos e indicador `static`. Usar `cellSize` maior no celular para reduzir densidade. O ciclo controla resolução, requestAnimationFrame, pausa fora da hero, aba oculta e quadro estático com movimento reduzido. A função retornada limpa observers e listeners quando necessário. Não criar um segundo ciclo para a mesma arte.

## Validação

Ao implementar as seções: conferir mockups em desktop e celular, console, navegação por teclado, foco, preferência de movimento reduzido e ausência de rolagem horizontal da página. Só o trilho de serviços deve rolar lateralmente. Validar em preview antes de qualquer publicação solicitada.

## Adicionar ou atualizar projetos

Em `pages/hero.html`, dentro de `.projects-grid`, copiar um `<article class="project-card">` completo. Não criar novas regras CSS para cada projeto: o grid aceita qualquer quantidade e abre novas linhas automaticamente. Usar um ID único no `h3` e repetir o valor em `aria-labelledby` do article. Preencher nome, descrição curta e tecnologias; a stack fica entre descrição e link.

Os cards atuais usam as capturas WebP em `assets/images/`. Para adicionar outra captura real, inserir um `<img class="project-card__image" src="../assets/images/arquivo.webp" alt="Descrição da captura real" loading="lazy" decoding="async" width="LARGURA_REAL" height="ALTURA_REAL">` dentro de `.project-card__media`. Usar dimensões reais numéricas: a imagem mantém sua proporção e recebe escala de cinza automaticamente. Não manter aria-hidden ao inserir a imagem.

Enquanto as URLs não forem confirmadas, “Ver projeto” é texto indisponível, sem href fictício e sem entrar na ordem de foco. Quando houver URL real, substituir o span externo por `<a class="project-card__link" href="URL_REAL" aria-label="Ver projeto NOME">Ver projeto <span aria-hidden="true">↗</span></a>`. Remover o texto oculto de indisponibilidade. Nenhum JavaScript é necessário para adicionar cards.

Destinos atuais confirmados pelo usuário: HeroTuner em `https://hero-tuner-client.vercel.app/`, CurriculoGen em `https://curriculo-client.vercel.app/` e AskFlow no repositório `https://github.com/eujoao-maciel/askFlow`. Todos reutilizam `.project-card__link`, incluindo os efeitos de hover e foco e o suporte a movimento reduzido.

## Serviços

A seção `#servicos` fica em `pages/hero.html`; os estilos estão em `styles/components/services.css`. Cada `.service-card` contém título, descrição curta, número decorativo e uma ilustração SVG. As ilustrações compartilham o sprite `assets/images/services/illustrations.svg`; não são capturas de projetos. Para adicionar um serviço, copiar um article, ajustar o ID/aria-labelledby, texto, número e símbolo SVG. Os tamanhos são compartilhados e o carrossel aceita mais cards automaticamente.

O módulo `scripts/components/carousel.js` avança pela largura de um card mais o espaçamento. As setas ficam indisponíveis nos extremos; o indicador inferior acompanha a posição. O trilho possui foco próprio, aceita toque, trackpad, setas do teclado, Home e End. O indicador é apenas visual; os controles e o teclado fazem a navegação acessível. Respeitar movimento reduzido desativando rolagem suave. A rolagem horizontal fica contida no trilho, inclusive no celular.

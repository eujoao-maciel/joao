# AGENTS.md — Portfólio de João Maciel

## Stack

- HTML semântico, CSS puro e JavaScript em módulos.
- Canvas 2D para a animação ASCII.
- Site estático na Vercel, sem build obrigatório.
- Manter a implementação simples, sem frameworks, backend ou banco de dados.

## Visual

- Seguir os mockups aprovados, sem redesenhar o layout.
- Usar apenas preto, branco e tons de cinza.
- Títulos em Oxanium; textos em fonte monoespaçada legível.
- Bordas finas, textura discreta e espaçamento consistente.
- Manter textos e botões nítidos, com contraste suficiente.

## Layout

- Uma página com apresentação, projetos, serviços e contatos; navegação por âncoras.
- Hero: nome, cargo, descrição e botões à esquerda; arte ASCII à direita, inclusive no celular. Ajustar tamanhos e quebras sem sobrepor texto e arte.
- Projetos: captura real, nome, descrição curta, stack discreta entre a descrição e o link. Três cards em linha no desktop e uma coluna no celular.
- Usar imagens originais dos projetos em escala de cinza, preservando suas proporções.
- Serviços: seção compacta com cards de nome, descrição e imagem, em faixa horizontal rolável com setas para os dois lados. Manter esse comportamento no celular.
- Contatos: GitHub, LinkedIn e e-mail em linha no desktop e empilhados no celular.
- Menu mobile com botão de abrir/fechar e links acessíveis.

## Animação ASCII

- Reproduzir a fita/onda de caracteres da referência, com movimento contínuo suave.
- Usar requestAnimationFrame e reduzir a densidade de caracteres no celular.
- Pausar fora da hero e com a aba oculta.
- Respeitar prefers-reduced-motion com uma versão estática.
- A animação deve ser decorativa e não interferir nos textos, botões ou navegação.

## Qualidade e publicação

- Organizar estilos, scripts e assets de forma simples e clara.
- Usar links e dados reais; não inventar contatos ou interfaces dos projetos.
- Garantir teclado, foco visível, textos alternativos e leitura em diferentes tamanhos de tela.
- Otimizar imagens e evitar rolagem horizontal da página; apenas a faixa de serviços deve rolar lateralmente.
- Conferir desktop e celular no navegador, comparando com os mockups e verificando o console.
- Preservar a configuração do site publicado e validar em preview antes de atualizar a produção.
- Publicar somente quando solicitado pelo usuário.

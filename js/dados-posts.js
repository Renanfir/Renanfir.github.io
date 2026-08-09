/* ==========================================================================
   DADOS DO BLOG
   Cada post e um arquivo HTML em /posts. Aqui ficam so a configuracao geral e
   a lista de posts usada pela pagina inicial.

   PARA ADICIONAR UM POST:
   1. Copie posts/_modelo.html para posts/meu-slug.html
   2. Adicione uma linha no inicio do array POSTS abaixo
   3. Use "secao" para escolher em qual aba o post aparece (veja SECOES)
   ========================================================================== */

window.CONFIGURACAO_BLOG = {
  nome: "Graxa Veia",
  avatar: "imagens/avatar.svg",

  navegacao: [
    { rotulo: "Home", href: "index.html" }
  ],

  links: [
    { rotulo: "GitHub", href: "https://github.com/Renanfir" },
    { rotulo: "LinkedIn", href: "https://www.linkedin.com/in/renan-fiamoncini-rother/" }
  ]
};

window.POSTS = [
  {
    slug: "what-is-a-fidc",
    titulo: "What is a FIDC: terms, structure, PDD, subordination and life cycle",
    data: "2026-08-02",
    secao: "FIDC"
  },
  {
    slug: "explore-it",
    titulo:
      "Explore It!: Reduce Risk and Increase Confidence with Exploratory Testing",
    data: "2026-08-01",
    secao: "Books"
  },
  {
    slug: "a-mind-for-numbers",
    titulo: "A Mind for Numbers",
    data: "2026-07-26",
    secao: "Books"
  }
];

/* Abas do filtro exibido acima do conteudo da pagina inicial.
   O "id" liga a aba ao elemento com data-secao correspondente no index.html e
   ao campo "secao" dos posts. A primeira aba e a que abre por padrao. Para
   criar uma nova aba, adicione um item aqui e um bloco
   <div data-secao="<id>"> no index.html. */
window.SECOES = [
  { id: "FIDC", rotulo: "FIDC" },
  { id: "Books", rotulo: "Books" }
];

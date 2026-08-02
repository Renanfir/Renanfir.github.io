/* ==========================================================================
   COMPONENTES REUTILIZAVEIS
   Web Components nativos, sem framework e sem build.

     <blog-barra-lateral>    avatar + links de navegacao e contato
     <blog-lista-posts>      lista numerada com titulo e data; o atributo
                             secao="<id>" filtra os posts daquela aba
     <blog-filtro>           abas que alternam os blocos com data-secao
     <blog-post-cabecalho>   titulo e data do post, lidos do data-slug do body
   ========================================================================== */

(function () {
  "use strict";

  const Util = {
    /** Prefixo de caminho: paginas em /posts usam data-raiz="../". */
    raiz() {
      return document.body.dataset.raiz || "";
    },

    configuracao() {
      return window.CONFIGURACAO_BLOG || {};
    },

    /** Sem secao, devolve todos os posts. Com secao, so os daquela aba. */
    posts(secao) {
      return (window.POSTS || [])
        .filter((post) => !secao || post.secao === secao)
        .sort((a, b) => (a.data < b.data ? 1 : -1));
    },

    buscarPost(slug) {
      return (window.POSTS || []).find((post) => post.slug === slug) || null;
    },

    escapar(texto) {
      return String(texto == null ? "" : texto).replace(
        /[&<>"']/g,
        (caractere) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          })[caractere]
      );
    }
  };

  window.BlogUtil = Util;

  /* ---------------------------------------------------------------- */
  class BarraLateral extends HTMLElement {
    connectedCallback() {
      const configuracao = Util.configuracao();
      const raiz = Util.raiz();

      const montarLinks = (itens) =>
        (itens || [])
          .map((item) => {
            const externo = /^(https?:|mailto:)/.test(item.href);
            const href = externo ? item.href : raiz + item.href;
            const alvo = externo ? ' target="_blank" rel="noopener"' : "";
            return `<li><a href="${href}"${alvo}>${Util.escapar(item.rotulo)}</a></li>`;
          })
          .join("");

      const avatar = configuracao.avatar
        ? `<img class="barra-lateral__avatar" src="${raiz + configuracao.avatar}" alt="${Util.escapar(configuracao.nome)}">`
        : "";

      this.innerHTML = `
        <aside class="barra-lateral painel">
          ${avatar}
          <ul class="barra-lateral__lista">${montarLinks(configuracao.navegacao)}</ul>
          <hr>
          <ul class="barra-lateral__lista">${montarLinks(configuracao.links)}</ul>
        </aside>`;
    }
  }

  /* ---------------------------------------------------------------- */
  class ListaPosts extends HTMLElement {
    connectedCallback() {
      const posts = Util.posts(this.getAttribute("secao"));

      if (!posts.length) {
        this.innerHTML = `<p class="texto-suave">No posts published yet.</p>`;
        return;
      }

      const itens = posts
        .map(
          (post) => `
          <li>
            <a href="${Util.raiz()}posts/${post.slug}.html">${Util.escapar(post.titulo)}</a>
            | <time datetime="${Util.escapar(post.data)}">${Util.escapar(post.data)}</time>
          </li>`
        )
        .join("");

      this.innerHTML = `<ol class="lista-posts">${itens}</ol>`;
    }
  }

  /* ---------------------------------------------------------------- */
  class Filtro extends HTMLElement {
    connectedCallback() {
      const secoes = window.SECOES || [];
      if (!secoes.length) return;

      this.innerHTML = `
        <nav class="filtro">
          ${secoes
            .map(
              (secao, indice) =>
                `<button type="button" class="filtro__item${
                  indice === 0 ? " esta-ativo" : ""
                }" data-alvo="${Util.escapar(secao.id)}">${Util.escapar(
                  secao.rotulo
                )}</button>`
            )
            .join("")}
        </nav>`;

      const botoes = Array.from(this.querySelectorAll(".filtro__item"));
      const paineis = Array.from(document.querySelectorAll("[data-secao]"));

      const ativar = (id) => {
        botoes.forEach((botao) =>
          botao.classList.toggle("esta-ativo", botao.dataset.alvo === id)
        );
        paineis.forEach((painel) => {
          painel.hidden = painel.dataset.secao !== id;
        });
      };

      botoes.forEach((botao) =>
        botao.addEventListener("click", () => ativar(botao.dataset.alvo))
      );

      ativar(secoes[0].id);
    }
  }

  /* ---------------------------------------------------------------- */
  class PostCabecalho extends HTMLElement {
    connectedCallback() {
      const slug = document.body.dataset.slug;
      const post = Util.buscarPost(slug);

      if (!post) {
        console.warn(`[blog] Post "${slug}" nao esta em js/dados-posts.js.`);
        return;
      }

      const configuracao = Util.configuracao();
      document.title = `${post.titulo} | ${configuracao.nome}`;

      this.innerHTML = `
        <h1>${Util.escapar(post.titulo)}</h1>
        <p class="post__meta">
          <time datetime="${Util.escapar(post.data)}">${Util.escapar(post.data)}</time>
        </p>`;
    }
  }

  const componentes = {
    "blog-barra-lateral": BarraLateral,
    "blog-lista-posts": ListaPosts,
    "blog-filtro": Filtro,
    "blog-post-cabecalho": PostCabecalho
  };

  Object.entries(componentes).forEach(([nome, classe]) => {
    if (!customElements.get(nome)) customElements.define(nome, classe);
  });
})();

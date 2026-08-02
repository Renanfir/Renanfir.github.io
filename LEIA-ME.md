# Blog - estrutura base

HTML, CSS e JS puros. Sem build, sem dependencia. Abra `index.html` no navegador.

## Estrutura

```
blog/
├── index.html              apresentacao + lista de posts
├── css/estilos.css         todos os estilos (~200 linhas)
├── js/
│   ├── dados-posts.js      configuracao do blog + lista de posts
│   └── componentes.js      3 componentes reutilizaveis
├── posts/
│   ├── _modelo.html        template para copiar
│   └── <slug>.html         um arquivo por post
└── imagens/avatar.svg      troque pela sua foto
```

## Criar um post

1. Copie `posts/_modelo.html` para `posts/meu-slug.html`.
2. No `<body>`, troque `data-slug="SUBSTITUA-PELO-SLUG"` por `data-slug="meu-slug"`.
3. Adicione no inicio do array `window.POSTS` em `js/dados-posts.js`:

```js
{ slug: "meu-slug", titulo: "Titulo do post", data: "2026-08-02", secao: "FIDC" }
```

4. Escreva o texto dentro do `<article class="painel">`.

Titulo, data e `<title>` da aba sao preenchidos pelos metadados.

## Abas (secoes)

A pagina inicial mostra os posts separados por aba. As abas ficam em
`window.SECOES` (`js/dados-posts.js`) e o campo `secao` de cada post diz em qual
delas ele aparece. Para criar uma aba nova:

1. Adicione `{ id: "MinhaAba", rotulo: "Minha Aba" }` em `window.SECOES`.
2. Adicione no `index.html` o bloco correspondente:

```html
<div data-secao="MinhaAba" hidden>
  <blog-lista-posts secao="MinhaAba"></blog-lista-posts>
</div>
```

## Componentes

| Componente | O que faz |
|---|---|
| `<blog-barra-lateral>` | avatar + links de navegacao e contato |
| `<blog-lista-posts>` | lista numerada com titulo e data; `secao="<id>"` filtra a aba |
| `<blog-filtro>` | abas que alternam os blocos com `data-secao` |
| `<blog-post-cabecalho>` | titulo e data do post, lidos do `data-slug` |

## Personalizacao

- **Cores, fontes, larguras**: bloco `:root` em `css/estilos.css`.
- **Nome, avatar e links da lateral**: `window.CONFIGURACAO_BLOG` em `js/dados-posts.js`.
- **Caixa escura**: classe `.painel`, use em qualquer bloco novo.

## Observacoes

- Paginas dentro de `posts/` precisam de `data-raiz="../"` no `<body>`.
- Funciona abrindo o arquivo direto (`file://`), sem servidor.
- O link "RSS Feed" da barra lateral aponta para `feed.xml`, que ainda nao existe: crie ou remova a entrada em `CONFIGURACAO_BLOG.navegacao`.

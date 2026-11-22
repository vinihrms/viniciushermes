# Guia de Conteúdo — Vinícius Hermes

Este guia explica passo a passo como adicionar novas **postagens**, **livros/resenhas**, **projetos**, **fotografias da galeria** e como editar exatamente o que aparece na **página inicial (`/`)**.

> **Modelos prontos no repositório**: a pasta [`modelos/`](./modelos) contém arquivos prontos para copiar e colar (`post.exemplo.md`, `projeto.exemplo.md`, `livro.exemplo.md` e `galeria.exemplo.json`).
>
> **Nota sobre imagens**: fotos de postagens, projetos e galeria são exibidas exatamente como você as editar; capas de livros recebem automaticamente o filtro editorial preto e branco. Formatos suportados: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` e `.svg`.

---

## 1. Como editar o que aparece na Capa (`/` e `/en`)

Abra o arquivo **`src/data/home.ts`**. Nele você monta a página inicial faixa por faixa:

- `layout: 'horizontal-2'` → **2 blocos horizontais** lado a lado.
- `layout: 'vertical-3'` → **3 blocos verticais** lado a lado.
- `layout: 'hero'` → **1 bloco largo** de largura total.

```ts
export const homeSections: HomeSectionConfig[] = [
  {
    id: 'destaques',
    layout: 'horizontal-2',
    labelKey: 'featured',   // opcional: 'featured' | 'readings' | 'projects' | 'gallery' | 'notes'
    moreSection: 'projects', // opcional: link "Ver tudo →"
    items: [
      { collection: 'projects', slug: 'compilador-minilang' },
      { collection: 'posts', slug: 'arquitetura-e-silencio' },
    ],
  },
  {
    id: 'leituras',
    layout: 'vertical-3',
    labelKey: 'readings',
    moreSection: 'books',
    items: [
      { collection: 'books', slug: 'o-estrangeiro' },
      { collection: 'books', slug: 'sicp' },
      { collection: 'books', slug: 'cidades-invisiveis' },
    ],
  },
];
```

- O `slug` é o nome do arquivo `.md` **sem extensão** (ou o `id` no caso da galeria).
- Para **reordenar** blocos ou faixas, basta mover as linhas em `homeSections`.
- O mesmo `src/data/home.ts` controla `/` (PT-BR) e `/en` (Inglês) automaticamente.

---

## 2. Como adicionar uma Postagem (`/posts`)

1. Salve a imagem de capa editada em `src/assets/posts/` (ex.: `meu-post.jpg`).
2. Crie um arquivo Markdown em `src/content/posts/pt-br/meu-post.md`:

```markdown
---
title: "Título da Postagem"
date: 2026-11-21
category: "Ciência da Computação"
excerpt: "Resumo curto exibido abaixo do bloco."
cover: "../../../assets/posts/meu-post.jpg"
coverAlt: "Descrição breve da imagem"
orientation: "horizontal"
tags: ["algoritmos", "notas"]
---

Escreva o conteúdo da postagem aqui em Markdown.
```

3. *(Opcional — versão em Inglês)*: crie `src/content/posts/en/meu-post.md` com o **mesmo nome de arquivo** (`meu-post.md`) traduzido. Se você ainda não traduzir, o site faz *fallback* automático para a versão em PT-BR com um aviso discreto.

---

## 3. Como adicionar um Livro / Resenha (`/livros`)

1. Salve a capa vertical (`2:3`) em `src/assets/books/` (ex.: `dom-casmurro.jpg`).
2. Crie `src/content/books/pt-br/dom-casmurro.md` (e opcionalmente `src/content/books/en/dom-casmurro.md`):

```markdown
---
title: "Dom Casmurro"
author: "Machado de Assis"
yearRead: 2026
status: "lido"        # "lido" ou "lendo"
rating: "5 / 5"       # opcional
excerpt: "Uma linha sobre o livro."
cover: "../../../assets/books/dom-casmurro.jpg"
coverAlt: "Capa de Dom Casmurro"
quote: "Citação marcante opcional exibida no topo da resenha."
---

Sua resenha e anotações de leitura aqui...
```

---

## 4. Como adicionar um Projeto de CC (`/projetos`)

1. Salve a imagem horizontal (`3:2`) em `src/assets/projects/` (ex.: `meu-projeto.png`).
2. Crie `src/content/projects/pt-br/meu-projeto.md` (e opcionalmente `en/meu-projeto.md`):

```markdown
---
title: "Nome do Projeto"
date: 2026-11-21
year: 2026
category: "Sistemas"
excerpt: "Descrição curta do problema que o projeto resolve."
stack: ["Rust", "TypeScript", "SQLite"]
repoUrl: "https://github.com/seu-usuario/seu-repo"
demoUrl: "https://exemplo.com" # opcional
cover: "../../../assets/projects/meu-projeto.png"
coverAlt: "Preview do projeto"
orientation: "horizontal"
---

Contexto, arquitetura, decisões técnicas e resultados...
```

---

## 5. Como adicionar Fotos na Galeria (`/galeria`)

1. Coloque a foto já editada em `src/assets/gallery/` (ex.: `rua-04.jpg`).
2. Adicione um objeto no array em **`src/content/gallery/items.json`**:

```json
{
  "id": "rua-04",
  "image": "../../assets/gallery/rua-04.jpg",
  "orientation": "vertical",
  "titlePt": "Título em Português",
  "titleEn": "Title in English",
  "locationPt": "Porto Alegre",
  "locationEn": "Porto Alegre",
  "date": "2026",
  "camera": "35mm"
}
```

- Fotos consecutivas com `"orientation": "horizontal"` formam automaticamente uma faixa de **2 colunas**.
- Fotos consecutivas com `"orientation": "vertical"` formam automaticamente uma faixa de **3 colunas**.
- Para destacar uma foto da galeria na Capa (`/`), use `{ collection: 'gallery', slug: 'rua-04' }` em `src/data/home.ts`.

---

## 6. Como editar a página Sobre (`/sobre`) e Links de Contato

- **Links (GitHub, LinkedIn, E-mail)**: edite `src/data/site.ts`.
- **Textos da página Sobre (PT-BR e EN)**: edite a chave `about` dentro de `src/i18n/ui.ts`.
- **Imagens da página Sobre**: substitua os arquivos em `src/assets/about/` (ou atualize os imports no topo de `src/components/AboutMaison.astro`).

---

## 7. Comandos úteis

- Iniciar servidor local em background: `npx astro dev --background`
- Checar status / logs / parar servidor: `npx astro dev status`, `npx astro dev logs`, `npx astro dev stop`
- Gerar build de produção: `npm run build`

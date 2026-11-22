---
# MODELO DE POSTAGEM (Blog)
# Copie este arquivo para:
#   src/content/posts/pt-br/nome-do-post.md
#   src/content/posts/en/nome-do-post.md (opcional, para versão em inglês)
#
# Salve a imagem de capa em: src/assets/posts/sua-imagem.jpg
# (o caminho abaixo assume que o arquivo final estará em src/content/posts/pt-br/)

title: "Título da Postagem"
date: 2026-11-21
category: "Ciência da Computação"
excerpt: "Resumo curto de uma ou duas linhas exibido abaixo do bloco na listagem."
cover: "../../../assets/posts/sua-imagem.jpg"
coverAlt: "Descrição acessível da imagem de capa"
orientation: "horizontal" # "horizontal" ou "vertical"
tags: ["algoritmos", "sistemas", "notas"]
draft: false # mude para true se quiser ocultar do site enquanto escreve
---

Parágrafo de abertura da sua postagem. Você pode usar **negrito**, *itálico* e [links](https://exemplo.com).

## Subtítulo de seção

Desenvolva o argumento ou anotação técnica aqui.

```ts
// Blocos de código são estilizados automaticamente em preto e branco
function exemplo(n: number): number {
	return n * 2;
}
```

> Citações em destaque seguem a tipografia serifada editorial.

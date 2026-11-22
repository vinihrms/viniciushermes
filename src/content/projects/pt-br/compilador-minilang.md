---
title: "Compilador MiniLang & Máquina Virtual"
date: 2026-11-05
year: 2026
category: "Compiladores"
excerpt: "Compilador educacional com analisador léxico, parser descendente recursivo, verificação de tipos e VM baseada em pilha."
stack: ["Rust", "Compilers", "Bytecode VM", "CLI"]
repoUrl: "https://github.com/viniciushermes"
cover: "../../../assets/projects/compilador-minilang.svg"
coverAlt: "Diagrama monocromático do pipeline do compilador: Lexer, Parser, AST e Bytecode"
orientation: "horizontal"
---

Projeto desenvolvido para aprofundar os fundamentos de construção de compiladores vistos na graduação em Ciência da Computação.

## Pipeline implementado

1. **Análise Léxica**: tokenização com rastreamento de linha e coluna para diagnósticos precisos.
2. **Análise Sintática**: parser descendente recursivo + *Pratt parsing* para expressões com precedência.
3. **Verificação Semântica**: inferência básica de tipos e resolução de escopos léxicos.
4. **Geração de Bytecode & VM**: conjunto compacto de instruções executado em uma máquina virtual baseada em pilha.

```text
source.ml -> Lexer -> Parser (AST) -> Type Checker -> Bytecode -> Stack VM
```

## Principais aprendizados

Separar claramente a representação da AST da geração de instruções facilitou escrever testes unitários determinísticos para cada etapa do pipeline e implementar mensagens de erro legíveis.

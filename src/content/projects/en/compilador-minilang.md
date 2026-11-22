---
title: "MiniLang Compiler & Stack Virtual Machine"
date: 2026-11-05
year: 2026
category: "Compilers"
excerpt: "Educational compiler featuring a lexer, recursive-descent parser, static type checker, and stack-based bytecode VM."
stack: ["Rust", "Compilers", "Bytecode VM", "CLI"]
repoUrl: "https://github.com/viniciushermes"
cover: "../../../assets/projects/compilador-minilang.svg"
coverAlt: "Monochrome compiler pipeline diagram: Lexer, Parser, AST, and Bytecode"
orientation: "horizontal"
---

A project built to explore compiler construction fundamentals from my Computer Science coursework in depth.

## Implemented pipeline

1. **Lexical Analysis**: tokenizer tracking line and column spans for clear diagnostics.
2. **Parsing**: recursive-descent parser paired with *Pratt parsing* for operator precedence.
3. **Semantic Analysis**: basic type checking and lexical scope resolution.
4. **Bytecode & VM**: compact instruction set executed by a lightweight stack virtual machine.

```text
source.ml -> Lexer -> Parser (AST) -> Type Checker -> Bytecode -> Stack VM
```

## Key takeaways

Keeping the AST representation strictly decoupled from code emission made deterministic unit testing straightforward for every stage and enabled crisp error reporting.

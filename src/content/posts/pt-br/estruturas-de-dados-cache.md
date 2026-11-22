---
title: "Localidade de Cache em Estruturas de Dados do Dia a Dia"
date: 2026-10-28
category: "Ciência da Computação"
excerpt: "Como a hierarquia de memória L1/L2/L3 transforma a teoria assintótica na prática de sistemas modernos."
cover: "../../../assets/posts/estruturas-de-dados-cache.svg"
coverAlt: "Diagrama minimalista em alto contraste ilustrando linhas de cache de memória"
orientation: "horizontal"
tags: ["sistemas", "estruturas-de-dados", "performance"]
---

A notação assintótica (`Big-O`) é indispensável para comparar o crescimento de algoritmos, mas raramente conta a história completa quando o hardware entra em cena.

Em processadores modernos, buscar um dado na memória principal (RAM) pode custar centenas de ciclos, enquanto um acerto na cache `L1` acontece em poucos ciclos.

## Vetor contíguo vs. Lista encadeada

Mesmo quando duas estruturas compartilham complexidade `O(n)` para percurso, um array contíguo aproveita o *hardware prefetcher* e carrega múltiplos elementos em uma única linha de cache de 64 bytes.

```c
// Acesso sequencial amigável à cache (row-major)
long sum_matrix(const int *m, size_t rows, size_t cols) {
    long total = 0;
    for (size_t r = 0; r < rows; r++) {
        for (size_t c = 0; c < cols; c++) {
            total += m[r * cols + c];
        }
    }
    return total;
}
```

## O que observar ao projetar estruturas

- Prefira armazenamento contíguo (*arrays*, *arenas*, *flat hash maps*) sempre que o padrão de acesso for iterativo.
- Meça *cache misses* antes de otimizar microdetalhes sintáticos.
- Mantenha dados frequentemente lidos juntos no mesmo bloco de memória (*Structure of Arrays* quando fizer sentido).

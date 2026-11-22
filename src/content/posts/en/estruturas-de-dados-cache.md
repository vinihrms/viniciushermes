---
title: "Cache Locality in Everyday Data Structures"
date: 2026-10-28
category: "Computer Science"
excerpt: "How the L1/L2/L3 memory hierarchy reshapes asymptotic analysis on modern hardware."
cover: "../../../assets/posts/estruturas-de-dados-cache.svg"
coverAlt: "High-contrast minimalist diagram illustrating CPU memory cache lines"
orientation: "horizontal"
tags: ["systems", "data-structures", "performance"]
---

Asymptotic notation (`Big-O`) is essential for comparing algorithmic growth, yet it rarely tells the full story once real hardware enters the equation.

On modern CPUs, fetching a word from main memory (RAM) can cost hundreds of cycles, whereas an `L1` cache hit resolves in just a handful.

## Contiguous arrays vs. Linked lists

Even when two structures share `O(n)` traversal complexity, a contiguous array cooperates with the hardware prefetcher and pulls multiple neighboring elements into a single 64-byte cache line.

```c
// Cache-friendly sequential traversal (row-major)
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

## Practical guidelines

- Favor contiguous layouts (*arrays*, *arenas*, *flat hash maps*) whenever iteration dominates.
- Profile cache misses before chasing syntactic micro-optimizations.
- Keep hot fields packed together in memory (*Structure of Arrays* where appropriate).

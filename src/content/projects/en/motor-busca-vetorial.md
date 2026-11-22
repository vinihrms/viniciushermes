---
title: "In-Memory Vector Search Engine"
date: 2026-09-18
year: 2026
category: "Algorithms"
excerpt: "Experimental approximate nearest-neighbor (ANN) index implemented with hierarchical navigable small-world graphs."
stack: ["C++", "Algorithms", "HNSW", "Benchmarks"]
repoUrl: "https://github.com/viniciushermes"
cover: "../../../assets/projects/motor-busca-vetorial.svg"
coverAlt: "Minimalist graph illustrating nearest-neighbor search in vector space"
orientation: "horizontal"
---

An engineering experiment built to study the trade-offs between latency, memory footprint, and recall in high-dimensional search.

## Architecture

- Cosine and Euclidean distance kernels over memory-aligned float buffers.
- Incremental multi-layer insertion for a Hierarchical Navigable Small-World (*HNSW*) graph.
- Benchmark harness comparing exact linear scans against approximate search on 100k vectors.

## Observed results

With conservative connectivity settings (`M = 16`, `efSearch = 64`), the index reached over 96% *recall@10* while cutting query latency dramatically compared to brute-force search.

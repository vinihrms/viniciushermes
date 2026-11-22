---
title: "Motor de Busca Vetorial em Memória"
date: 2026-09-18
year: 2026
category: "Algoritmos"
excerpt: "Implementação experimental de busca aproximada por vizinhos mais próximos (ANN) usando grafos navegáveis hierárquicos."
stack: ["C++", "Algorithms", "HNSW", "Benchmarks"]
repoUrl: "https://github.com/viniciushermes"
cover: "../../../assets/projects/motor-busca-vetorial.svg"
coverAlt: "Gráfico minimalista ilustrando busca de vizinhos próximos em espaço vetorial"
orientation: "horizontal"
---

Experimento de engenharia voltado a compreender o equilíbrio entre latência, consumo de memória e *recall* em buscas de alta dimensionalidade.

## Arquitetura

- Cálculo de distância cosseno e euclidiana com vetores alinhados em memória.
- Construção incremental de camadas em grafo navegável hierárquico (*HNSW*).
- Suíte de benchmark comparando busca exata (*brute-force*) contra busca aproximada em conjuntos de 100 mil vetores.

## Resultados observados

Com parâmetros conservadores de conectividade (`M = 16`, `efSearch = 64`), o índice atingiu mais de 96% de *recall@10* com redução expressiva de tempo de consulta em comparação à varredura linear.

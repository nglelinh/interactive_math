# Research notes (2022–2026)

This file is a **hub**, not a rewrite of the course. The repo is a static HTML/JS demo collection. These notes add recent CS / data-science / math-visualization papers and **link them to existing demos**.

- Per-topic notes live in [`notes/`](notes/README.md).
- Demos stay as they are. Do not treat these notes as a request to regenerate videos or replace working pages.
- Citations were checked against arXiv, publisher pages, NIST, or IACR ePrint (accessed 2026-09).

## How to use this

1. Open a demo from [`index.html`](index.html).
2. Follow the matching topic file in `notes/`.
3. Read the short “why this matters for the demo” blurb, then the paper if you want the real statement.

## Topic map

| Course section | Notes | Representative demos |
| --- | --- | --- |
| Linear algebra | [notes/linear-algebra.md](notes/linear-algebra.md) | SVD, eigenvalues, Strassen, tensors |
| Calculus | [notes/calculus.md](notes/calculus.md) | gradients, Taylor, continuity |
| Real analysis | [notes/real-analysis.md](notes/real-analysis.md) | continuity vs differentiability |
| Complex analysis | [notes/complex-analysis.md](notes/complex-analysis.md) | conformal maps, complex audio |
| Fourier analysis | [notes/fourier-analysis.md](notes/fourier-analysis.md) | FFT, spectral subtraction |
| Linear programming | [notes/linear-programming.md](notes/linear-programming.md) | simplex, duality |
| Convex analysis | [notes/convex-analysis.md](notes/convex-analysis.md) | convex sets, KKT, conjugates |
| Optimization | [notes/optimization.md](notes/optimization.md) | GD, Newton, proximal, SGD |
| Machine learning | [notes/machine-learning.md](notes/machine-learning.md) | regression, EM, neural nets |
| Graph theory | [notes/graph-theory.md](notes/graph-theory.md) | traversal, GNN, social nets |
| Algorithms & DS | [notes/algorithms-datastructures.md](notes/algorithms-datastructures.md) | arrays, Bloom filters, sort |
| Cryptography | [notes/cryptography.md](notes/cryptography.md) | RSA, ECC, hashes, QKD |
| Blockchain | [notes/blockchain.md](notes/blockchain.md) | consensus, DeFi, ZK |
| Mechanics | [notes/mechanics.md](notes/mechanics.md) | Newton, Hamiltonian, celestial |

## Inventory (what is in the repo)

Static lesson pages, grouped by folder. Hub/index pages are included when they exist.

- `linear-algebra/` — vectors, matrices, Cannon, Strassen, linear/nonlinear maps, eigenpairs, SVD, tensors
- `calculus/` — 1D/multi-D derivatives, gradients, continuity, vector fields, Taylor, level curves, multivariable convex functions
- `real-analysis/` — sets/reals, continuity vs differentiability
- `complex-analysis/` — arithmetic, analytic functions, conformal maps, contours, Laurent series, Riemann surfaces, audio
- `fourier-analysis/` — transform lesson, square/saw/triangle series, FFT, spectral subtraction
- `linear-programming/` — LP geometry, simplex, duality
- `convex-analysis/` — sets, constraints, conjugates, projector demo
- `optimization/` — GD, Newton, quasi-Newton, subgradient, proximal, SGD, KKT, least squares, Nelder–Mead, loss landscapes
- `machine-learning/` — linear/lasso regression, EM, neural-net cartoon, foundations
- `graph-theory/` — fundamentals, traversal, shortest paths, social nets, GNNs, network flow
- `algorithms-datastructures/` — arrays, lists, stacks/queues, bubble sort, Bloom filter, drunken bishop
- `cryptography/` — number theory, RSA, ECC, DH, AES, hashes, signatures, quantum, steganography
- `blockchain/` — chain basics, consensus/contracts, DeFi, ZK, NFT economics
- `mechanics/` — Newtonian, kinematics, Hamiltonian, rigid body, celestial, continuum (some index cards point at pages that are not in the tree)

## Cross-cutting visualization note

The demos are browser-first (sliders, Canvas/WebGL, MathJax). That matches the last few years of *explorable* math more than it matches a Jekyll textbook: keep the interaction, and use these notes as the “what changed in the research literature” layer. No Remotion rebuild is required for that.

## Scope

Each topic file lists **2–4** results from roughly 2022–2026. Older classics (Strassen 1969, FFT, simplex, …) already appear inside the demos themselves; they are not repeated here unless a new paper changes how you should *read* the demo.

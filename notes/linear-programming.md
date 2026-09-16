# Linear programming — research notes

Demos stay in [`../linear-programming/`](../linear-programming/).

## Demo inventory

- [linear_programming_mathematical_foundation.html](../linear-programming/linear_programming_mathematical_foundation.html)
- [linear_programming_illustration.html](../linear-programming/linear_programming_illustration.html)
- [linear_programming_demo.html](../linear-programming/linear_programming_demo.html)
- [simplex_illustration.html](../linear-programming/simplex_illustration.html)
- [simplex_algorithm_demo.html](../linear-programming/simplex_algorithm_demo.html)
- [simplex_optimization_demo.html](../linear-programming/simplex_optimization_demo.html)
- [duality_illustration.html](../linear-programming/duality_illustration.html)
- [duality_linear_programming.html](../linear-programming/duality_linear_programming.html)
- [general_duality_illustration.html](../linear-programming/general_duality_illustration.html)

## Recent advances

### 1. First-order methods that actually solve LP

**Citation.** David Applegate, Mateo Díaz, Oliver Hinder, Haihao Lu, Miles Lubin, Brendan O’Donoghue, and Warren Schudy. “Practical Large-Scale Linear Programming using Primal-Dual Hybrid Gradient.” *NeurIPS*, 2021. [NeurIPS proceedings](https://proceedings.neurips.cc/paper/2021/hash/a8fbbd3b11424ce032ba813493d95ad7-Abstract.html)

**Idea.** PDLP applies Chambolle–Pock PDHG to the LP saddle point, plus presolve, diagonal preconditioning, adaptive steps, and restarts. The primitive is a matrix–vector product, so the method scales past the memory envelope of a normal-equation interior-point factorization.

**Why this matters for the demo.** [simplex_algorithm_demo.html](../linear-programming/simplex_algorithm_demo.html) and [simplex_illustration.html](../linear-programming/simplex_illustration.html) walk a vertex path on a 2-D polyhedron. PDLP almost never sits on a vertex until the end: it is a first-order *interior-ish* trajectory. After you watch simplex hop corners, this paper is why Google OR-Tools also ships a PDHG solver for “too big to factor” LPs.

### 2. Infeasibility certificates from the same iteration

**Citation.** David Applegate, Mateo Díaz, Haihao Lu, and Miles Lubin. “Infeasibility Detection with Primal-Dual Hybrid Gradient for Large-Scale Linear Programming.” *SIAM Journal on Optimization* 34(1):459–484, 2024. [DOI:10.1137/22M1510467](https://doi.org/10.1137/22M1510467) · [arXiv:2102.04592](https://arxiv.org/abs/2102.04592)

**Idea.** If the LP is infeasible or unbounded, PDHG iterates diverge along a ray whose direction is an approximate Farkas certificate. Normalized iterates converge at \(O(1/k)\).

**Why this matters for the demo.** [duality_illustration.html](../linear-programming/duality_illustration.html) and [duality_linear_programming.html](../linear-programming/duality_linear_programming.html) already draw primal/dual pairs and empty feasible regions. The SIOPT paper is how a first-order solver *detects* those empty regions without a Phase-I simplex basis. When the demo shows an infeasible polygon, this is the 2024 algorithm that returns the separating ray.

### 3. Billion-nonzero LPs on one machine

**Citation.** David Applegate, Mateo Díaz, Oliver Hinder, Haihao Lu, Miles Lubin, Brendan O’Donoghue, and Warren Schudy. “PDLP: A Practical First-Order Method for Large-Scale Linear Programming.” arXiv:2501.07018, 2025. [arXiv](https://arxiv.org/abs/2501.07018)

**Idea.** The C++ OR-Tools implementation, with feasibility polishing, solves several LPs with \(10^8\)–\(10^9\) nonzeros to a 1% gap in days, on instances where a barrier method exhausts RAM.

**Why this matters for the demo.** [linear_programming_demo.html](../linear-programming/linear_programming_demo.html) is a pedagogical 2-D feasible region. The 2025 write-up is the same mathematics (primal–dual gap, feasibility) at a scale the browser cannot draw. Use the demo for geometry; use the paper for “why simplex and barrier are no longer the only industrial answers.”

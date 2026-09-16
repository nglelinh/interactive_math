# Convex analysis — research notes

Demos stay in [`../convex-analysis/`](../convex-analysis/) plus the KKT / multivariable pages linked from the hub.

## Demo inventory

- [convex_sets_illustration.html](../convex-analysis/convex_sets_illustration.html)
- [convex_optimization_illustration.html](../convex-analysis/convex_optimization_illustration.html)
- [convex_demo.html](../convex-analysis/convex_demo.html) / [convex_demo_projector.html](../convex-analysis/convex_demo_projector.html)
- [convex_constraints_feasible_regions.html](../convex-analysis/convex_constraints_feasible_regions.html)
- [convex_conjugates_duality.html](../convex-analysis/convex_conjugates_duality.html)
- [convex_functions_multivariable.html](../calculus/convex_functions_multivariable.html)
- [lagrangian_kkt_conditions.html](../optimization/lagrangian_kkt_conditions.html)

## Recent advances

### 1. Learning to solve (and differentiate) convex problems

**Citation.** Brandon Amos. “Tutorial on Amortized Optimization.” *Foundations and Trends in Machine Learning* 16(3):255–403, 2023. [arXiv:2202.00665](https://arxiv.org/abs/2202.00665)

**Idea.** Instead of calling a solver from scratch every time, train a network that *amortizes* the mapping from instance data to a minimizer, and — when the inner problem is convex — backprop through KKT / implicit differentiation.

**Why this matters for the demo.** [convex_optimization_illustration.html](../convex-analysis/convex_optimization_illustration.html) and [lagrangian_kkt_conditions.html](../optimization/lagrangian_kkt_conditions.html) show a single instance: draw a convex \(f\), maybe add constraints, watch a method walk downhill. Amortized optimization is that picture *in a loop*: the KKT map becomes a layer. After you understand why a convex problem has a clean dual, this tutorial is why people put `cvxpylayers`-style blocks inside a larger net.

### 2. Parameter-free steps from convex theory

**Citation.** Maor Ivgi, Oliver Hinder, and Yair Carmon. “DoG is SGD’s Best Friend: A Parameter-Free Dynamic Step Size Schedule.” *ICML*, 2023. [arXiv:2302.12022](https://arxiv.org/abs/2302.12022)

**Idea.** Distance-over-Gradients (DoG) sets a step size from the observed distance from the start and a gradient-norm accumulator — a practical descendant of coin-betting / parameter-free convex online learning.

**Why this matters for the demo.** [convex_demo.html](../convex-analysis/convex_demo.html) and [convex_sets_illustration.html](../convex-analysis/convex_sets_illustration.html) let you pick a step by hand. DoG is what “no learning-rate search” looks like when the objective is (close to) convex: the same first-order information the demo already plots, aggregated into a schedule. Pair with the optimization notes for the deep-learning follow-up (Schedule-Free).

### 3. First-order LP as a convex saddle point

**Citation.** David Applegate, Mateo Díaz, Haihao Lu, and Miles Lubin. “Infeasibility Detection with Primal-Dual Hybrid Gradient for Large-Scale Linear Programming.” *SIAM Journal on Optimization* 34(1):459–484, 2024. [DOI:10.1137/22M1510467](https://doi.org/10.1137/22M1510467)

**Idea.** LP is a convex–concave saddle. PDHG’s ergodic averages and rays are convex-analysis objects (nonexpansive operators, Fenchel certificates), not simplex tableaux.

**Why this matters for the demo.** [convex_conjugates_duality.html](../convex-analysis/convex_conjugates_duality.html) and [convex_constraints_feasible_regions.html](../convex-analysis/convex_constraints_feasible_regions.html) introduce conjugates and feasible sets. PDLP is those objects at scale: the dual certificate the demo draws by hand is what normalized PDHG iterates converge to when the primal set is empty.

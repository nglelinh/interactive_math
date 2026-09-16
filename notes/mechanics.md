# Mechanics — research notes

Demos stay in [`../mechanics/`](../mechanics/). Start from [index.html](../mechanics/index.html) when present.

## Demo inventory

- [newtonian_mechanics.html](../mechanics/newtonian_mechanics.html)
- [kinematics_dynamics.html](../mechanics/kinematics_dynamics.html)
- [hamiltonian_mechanics.html](../mechanics/hamiltonian_mechanics.html)
- [rigid_body_mechanics.html](../mechanics/rigid_body_mechanics.html)
- [celestial_mechanics.html](../mechanics/celestial_mechanics.html)
- [continuum_mechanics.html](../mechanics/continuum_mechanics.html)

The hub also links `lagrangian_mechanics.html` and `nonlinear_dynamics.html`; those files are not in the tree as of this note. The papers below attach to the pages that *do* exist.

## Recent advances

### 1. PINNs, surveyed after the first wave

**Citation.** Salvatore Cuomo, Vincenzo Schiano Di Cola, Fabio Giampaolo, Gianluigi Rozza, Maziar Raissi, and Francesco Piccialli. “Scientific Machine Learning Through Physics-Informed Neural Networks: Where we are and What’s Next.” *Journal of Scientific Computing* 92:88, 2022. [arXiv:2201.05624](https://arxiv.org/abs/2201.05624)

**Idea.** A review of physics-informed neural nets: residual losses that encode PDEs/ODEs, failure modes (spectral bias, unbalanced residuals), and open problems. The 2019 Raissi recipe is now a field with standard caveats.

**Why this matters for the demo.** [newtonian_mechanics.html](../mechanics/newtonian_mechanics.html) and [kinematics_dynamics.html](../mechanics/kinematics_dynamics.html) integrate \(F=ma\) in the browser. A PINN tries to satisfy the *same* residual without a classical time stepper. After you watch a particle step with Euler, the survey is why “just put the ODE in the loss” is not automatically better — and when it is useful.

### 2. Learned message-passing integrators

**Citation.** Johannes Brandstetter, Daniel Worrall, and Max Welling. “Message Passing Neural PDE Solvers.” *ICLR*, 2022. [arXiv:2202.03376](https://arxiv.org/abs/2202.03376)

**Idea.** Train a GNN as a time-stepper for PDEs: pushforward residuals, temporal bundling, and stability tricks so the learned solver does not blow up over long rollouts.

**Why this matters for the demo.** [continuum_mechanics.html](../mechanics/continuum_mechanics.html) and [rigid_body_mechanics.html](../mechanics/rigid_body_mechanics.html) are continuum / rigid pictures with local interactions. The ICLR paper is those local interactions as a graph: each node is a cell or particle, each edge is a stencil. The demo shows the physics; the paper shows a 2022 learned discretization of the same locality.

### 3. Fourier operators for global dynamics (FourCastNet)

**Citation.** Jaideep Pathak et al. “FourCastNet: A Global Data-driven High-resolution Weather Model using Adaptive Fourier Neural Operators.” arXiv:2202.11214, 2022. [arXiv](https://arxiv.org/abs/2202.11214)

**Idea.** Adaptive FNOs learn the evolution operator of the atmosphere in Fourier space, producing medium-range global forecasts far faster than a conventional dynamical core.

**Why this matters for the demo.** [celestial_mechanics.html](../mechanics/celestial_mechanics.html) is \(N\)-body gravity — a tiny Hamiltonian system you can draw. FourCastNet is the opposite scale: a continuum fluid on a sphere, still “mechanics,” but the integrator is a learned Fourier multiplier. After the orbital demo, this is the 2022 data-driven analogue of “step the field forward.”

### 4. Mesh GNNs for operational weather (GraphCast)

**Citation.** Remi Lam et al. “Learning skillful medium-range global weather forecasting.” *Science* 382(6677):1416–1421, 2023. [DOI:10.1126/science.adi2336](https://doi.org/10.1126/science.adi2336)

**Idea.** Encode the globe on a multi-resolution icosahedral mesh, process with a GNN, decode to a 0.25° grid. Beats a leading operational deterministic model on most evaluated targets.

**Why this matters for the demo.** [hamiltonian_mechanics.html](../mechanics/hamiltonian_mechanics.html) emphasizes structure (energy, symplectic form). GraphCast does not claim a symplectic integrator; it claims *skill*. The useful contrast for students: the Hamiltonian demo is “respect the structure, get conservation”; GraphCast is “learn the operator on a mesh, get forecast scores.” Both are mechanics. They optimize different invariants.

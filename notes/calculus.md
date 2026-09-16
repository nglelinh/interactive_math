# Calculus — research notes

Demos stay in [`../calculus/`](../calculus/).

## Demo inventory

- [gradient_illustration.html](../calculus/gradient_illustration.html)
- [differentiation.html](../calculus/differentiation.html)
- [differentiation_multidimension.html](../calculus/differentiation_multidimension.html)
- [continuity_uniform_continuity_demo.html](../calculus/continuity_uniform_continuity_demo.html)
- [vector_calculus_fields.html](../calculus/vector_calculus_fields.html)
- [taylor_series.html](../calculus/taylor_series.html)
- [level_curves.html](../calculus/level_curves.html)
- [convex_functions_multivariable.html](../calculus/convex_functions_multivariable.html) (also listed under convex analysis)

## Recent advances

### 1. Differentiable programming as a subject

**Citation.** Mathieu Blondel and Vincent Roulet. “The Elements of Differentiable Programming.” arXiv:2403.14606, 2024 (draft v3, 2025). [arXiv](https://arxiv.org/abs/2403.14606)

**Idea.** Automatic differentiation is not only “backprop on an MLP.” The monograph treats programs with control flow and data structures as objects you design *to be* differentiated, with matching optimization and probabilistic views.

**Why this matters for the demo.** [differentiation.html](../calculus/differentiation.html), [differentiation_multidimension.html](../calculus/differentiation_multidimension.html), and [gradient_illustration.html](../calculus/gradient_illustration.html) compute derivatives of closed-form maps. The book is the next sentence: those same chain-rule pictures are how JAX/PyTorch turn a training step into a program. After you drag a slider on \(\nabla f\), the monograph is the vocabulary for “what if \(f\) is a Python function.”

### 2. Forward and reverse mode are the same linearization

**Citation.** Alexey Radul, Adam Paszke, Roy Frostig, Matthew J. Johnson, and Dougal Maclaurin. “You Only Linearize Once: Tangents Transpose to Gradients.” *Proceedings of the ACM on Programming Languages* (POPL), 2023. [arXiv:2204.10923](https://arxiv.org/abs/2204.10923)

**Idea.** One linearization of a program produces tangent (JVP) maps; reverse-mode VJP is the adjoint of that linear map. You do not need two independent AD implementations.

**Why this matters for the demo.** [vector_calculus_fields.html](../calculus/vector_calculus_fields.html) already draws vector fields and suggests Jacobian intuition. The POPL paper is the compiler version of that picture: a Jacobian-vector product is a directional derivative in the field; a vector-Jacobian product is the adjoint field used in backprop. Keep the demo; use the paper when a student asks “is reverse mode a different derivative?”

### 3. Taylor expansions still run modern samplers

**Citation.** Cheng Lu, Yuhao Zhou, Fan Bao, Jianfei Chen, Chongxuan Li, and Jun Zhu. “DPM-Solver: A Fast ODE Solver for Diffusion Probabilistic Model Sampling in Around 10 Steps.” *NeurIPS*, 2022. [arXiv:2206.00927](https://arxiv.org/abs/2206.00927)

**Idea.** The reverse diffusion process is an ODE. A tailored Taylor expansion of that ODE yields high-order solvers that need ~10 function evaluations instead of hundreds of ancestral steps.

**Why this matters for the demo.** [taylor_series.html](../calculus/taylor_series.html) is the classical remainder story. DPM-Solver is a 2022 reason that story is not museum calculus: generative models sample by integrating an ODE whose local expansion is exactly a Taylor polynomial in time. After you watch partial sums of \(\sin x\), this paper is “partial sums of the diffusion vector field.”

### 4. Lipschitz calculus for neural functions

**Citation.** Hsueh-Ti Derek Liu, Francis Williams, Alec Jacobson, Sanja Fidler, and Or Litany. “Learning Smooth Neural Functions via Lipschitz Regularization.” *SIGGRAPH*, 2022. [arXiv:2202.08345](https://arxiv.org/abs/2202.08345)

**Idea.** Softplus-based Lipschitz regularization yields neural implicit surfaces that stay smooth under latent interpolation, instead of wrinkling when the network is too free.

**Why this matters for the demo.** [continuity_uniform_continuity_demo.html](../calculus/continuity_uniform_continuity_demo.html) and [level_curves.html](../calculus/level_curves.html) are the textbook \(\varepsilon\)-\(\delta\) and \(f=\text{const}\) pictures. The SIGGRAPH paper is those pictures in a learned implicit function: uniform Lipschitz control is what keeps a level set from tearing when you move in latent space.

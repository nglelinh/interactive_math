# Real analysis — research notes

Demos stay in [`../real-analysis/`](../real-analysis/).

## Demo inventory

- [set_theory_real_analysis.html](../real-analysis/set_theory_real_analysis.html) — sets, \(\mathbb{R}\), basic structure
- [continuity_differentiability.html](../real-analysis/continuity_differentiability.html) — continuous vs differentiable examples

Related calculus pages: [continuity_uniform_continuity_demo.html](../calculus/continuity_uniform_continuity_demo.html), [level_curves.html](../calculus/level_curves.html).

## Recent advances

### 1. Lipschitz regularity as a training constraint

**Citation.** Hsueh-Ti Derek Liu, Francis Williams, Alec Jacobson, Sanja Fidler, and Or Litany. “Learning Smooth Neural Functions via Lipschitz Regularization.” *SIGGRAPH*, 2022. [arXiv:2202.08345](https://arxiv.org/abs/2202.08345)

**Idea.** A network can represent a continuous function and still be visually non-smooth. Penalizing a Lipschitz constant produces interpolations that respect a uniform modulus of continuity.

**Why this matters for the demo.** [continuity_differentiability.html](../real-analysis/continuity_differentiability.html) is the classical “continuous nowhere differentiable / differentiable with discontinuous derivative” zoo. The 2022 paper is the same distinction in learned geometry: continuity of the network is cheap; a *useful* modulus of continuity is an optimization constraint. After the Weierstrass-style examples, this is why graphics people still talk about Lipschitz constants.

### 2. Approximation theory for deep nets, collected

**Citation.** Julius Berner, Philipp Grohs, Gitta Kutyniok, and Philipp Petersen. “The Modern Mathematics of Deep Learning.” In *Mathematical Aspects of Deep Learning*, Cambridge University Press, 2022. [arXiv:2105.04026](https://arxiv.org/abs/2105.04026)

**Idea.** A survey of approximation, expressivity, and generalization results that treats deep networks as objects in functional analysis, not only as software.

**Why this matters for the demo.** [set_theory_real_analysis.html](../real-analysis/set_theory_real_analysis.html) is the language (functions on \(\mathbb{R}^d\), norms, function classes) that the survey uses. The demo is the undergraduate substrate; the chapter is the 2022 map of which function-space theorems actually constrain neural nets.

### 3. Interpolation can be “benign”

**Citation.** Alexander Tsigler and Peter L. Bartlett. “Benign overfitting in ridge regression.” *Journal of Machine Learning Research* 24, 2023. [arXiv:2009.14286](https://arxiv.org/abs/2009.14286)

**Idea.** In a random-design linear model, ridge (including the min-norm interpolator at \(\lambda=0\)) can generalize even after interpolating noise, once the covariance spectrum decays the right way.

**Why this matters for the demo.** Classical real analysis says a highly oscillatory interpolant is a bad approximation (Runge, overfitting). The JMLR paper is the high-dimensional exception that data science actually uses: interpolation is not automatically pathological when the ambient dimension and the spectrum cooperate. Read the continuity demo as 1-D caution; read Tsigler–Bartlett as the regime where “fit the training set exactly” can still be consistent.

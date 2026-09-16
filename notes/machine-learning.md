# Machine learning — research notes

Demos stay in [`../machine-learning/`](../machine-learning/). Several hub cards for nets / lasso live under the optimization section of [`../index.html`](../index.html).

## Demo inventory

- [machine_learning_mathematical_foundation.html](../machine-learning/machine_learning_mathematical_foundation.html)
- [linear_regression_demo.html](../machine-learning/linear_regression_demo.html)
- [lasso_regression_demo.html](../machine-learning/lasso_regression_demo.html)
- [em_algorithm_demo.html](../machine-learning/em_algorithm_demo.html)
- [neural_network_illustration.html](../machine-learning/neural_network_illustration.html)

## Recent advances

### 1. Grokking: generalization long after interpolation

**Citation.** Alethea Power, Yuri Burda, Harri Edwards, Igor Babuschkin, and Vedant Misra. “Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets.” arXiv:2201.02177, 2022. [arXiv](https://arxiv.org/abs/2201.02177)

**Idea.** On small modular-arithmetic tasks, training accuracy hits 100% while test accuracy stays at chance — then, after many more steps, test accuracy suddenly jumps. Generalization is delayed, not absent.

**Why this matters for the demo.** [neural_network_illustration.html](../machine-learning/neural_network_illustration.html) and [machine_learning_mathematical_foundation.html](../machine-learning/machine_learning_mathematical_foundation.html) suggest a smooth “fit then generalize” cartoon. Grokking is the 2022 counter-cartoon: interpolation first, structure later. Use the demo to see a forward pass; use the paper when a student equates “zero training loss” with “the model is done.”

### 2. Width transfer via tensor programs (\(\mu\)P)

**Citation.** Greg Yang, Edward J. Hu, Igor Babuschkin, Szymon Sidor, Xiaodong Liu, David Farhi, Nick Ryder, Jakub Pachocki, Weizhu Chen, and Jianfeng Gao. “Tensor Programs V: Tuning Large Neural Networks via Zero-Shot Hyperparameter Transfer.” *ICLR*, 2022. [arXiv:2203.03466](https://arxiv.org/abs/2203.03466)

**Idea.** If every layer is scaled in the maximal-update regime, a learning rate found on a small model remains optimal on a wide one.

**Why this matters for the demo.** [neural_network_illustration.html](../machine-learning/neural_network_illustration.html) lets you change widths as a drawing. \(\mu\)P says that change is not free: the same width slider rescales activations, gradients, and the legal learning rate. The illustration is the architecture; the ICLR paper is the missing scaling rule.

### 3. Selective state spaces (Mamba)

**Citation.** Albert Gu and Tri Dao. “Mamba: Linear-Time Sequence Modeling with Selective State Spaces.” arXiv:2312.00752, 2023. [arXiv](https://arxiv.org/abs/2312.00752)

**Idea.** Structured state-space models become competitive with attention once the SSM parameters depend on the current token (selection) and the recurrence is implemented with a hardware-aware scan. Inference is linear in length.

**Why this matters for the demo.** The neural-net page is an MLP / tiny feed-forward picture. Mamba is a 2023–2024 reason the “stack affine + nonlinearity” story is incomplete for sequences: the hidden *state* is a linear dynamical system whose coefficients are input-dependent. After the illustration, this is the architecture that reopened the RNN vs Transformer argument.

### 4. Ridge interpolation can generalize

**Citation.** Alexander Tsigler and Peter L. Bartlett. “Benign overfitting in ridge regression.” *Journal of Machine Learning Research* 24, 2023. [arXiv:2009.14286](https://arxiv.org/abs/2009.14286)

**Idea.** Precise risk formulas for ridge (and the interpolating limit) in a random-design Gaussian model, in terms of the covariance spectrum.

**Why this matters for the demo.** [linear_regression_demo.html](../machine-learning/linear_regression_demo.html) and [lasso_regression_demo.html](../machine-learning/lasso_regression_demo.html) are low-D \(\ell_2/\ell_1\) pictures: add a penalty, shrink coefficients. Benign overfitting is the high-D surprise those sliders cannot show — an interpolating linear model is not automatically a bad predictor. Lasso’s sparsity story and ridge’s spectral story are different 2020s punchlines built on the same demo.

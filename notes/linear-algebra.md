# Linear algebra — research notes

Demos stay in [`../linear-algebra/`](../linear-algebra/). These notes only add recent context.

## Demo inventory

- [vector_illustration.html](../linear-algebra/vector_illustration.html) — vectors as data
- [matrix_illustration.html](../linear-algebra/matrix_illustration.html) — matrix arithmetic
- [cannon_algorithm_illustration.html](../linear-algebra/cannon_algorithm_illustration.html) — Cannon’s parallel product
- [strassen_algorithm_illustration.html](../linear-algebra/strassen_algorithm_illustration.html) — Strassen recursion
- [matrix_transformations.html](../linear-algebra/matrix_transformations.html) — linear maps
- [nonlinear_transformations.html](../linear-algebra/nonlinear_transformations.html) — nonlinear maps
- [eigenvalues_eigenvectors.html](../linear-algebra/eigenvalues_eigenvectors.html) — eigenpairs
- [svd_visualization.html](../linear-algebra/svd_visualization.html) — SVD
- [tensors_comprehensive.html](../linear-algebra/tensors_comprehensive.html) — tensors

## Recent advances

### 1. A new bound on the matrix-multiplication exponent

**Citation.** Ran Duan, Hongxun Wu, and Renfei Zhou. “Faster Matrix Multiplication via Asymmetric Hashing.” *64th IEEE Symposium on Foundations of Computer Science (FOCS)*, 2023, pp. 2129–2138. [arXiv:2210.10173](https://arxiv.org/abs/2210.10173) · [DOI:10.1109/FOCS57990.2023.00130](https://doi.org/10.1109/FOCS57990.2023.00130)

**Idea.** The Coppersmith–Winograd “laser method” loses a *combination* term when you look at higher tensor powers. Asymmetric hashing recovers some of that loss and gives \(\omega < 2.371866\), past a previous 2.3725-style barrier on the same method.

**Why this matters for the demo.** [strassen_algorithm_illustration.html](../linear-algebra/strassen_algorithm_illustration.html) shows the *practical* recursive algorithm students still implement (\(\approx n^{2.807}\)). The FOCS result is the opposite end of the same story: theoretically \(\omega\) keeps dropping, but the constructions are galactic. Use the demo to see why seven multiplies beat eight; use the paper to see why “faster than Strassen” in theory is not the same as faster in JavaScript.

### 2. Still-faster \(\omega\) by pushing the same idea

**Citation.** Josh Alman, Ran Duan, Virginia Vassilevska Williams, Yinzhan Xu, Zixuan Xu, and Renfei Zhou. “More Asymmetry Yields Faster Matrix Multiplication.” arXiv:2404.16349, 2024 (SODA 2025). [arXiv](https://arxiv.org/abs/2404.16349)

**Idea.** The same asymmetric-hashing line, pushed further, again lowers the best published bound on \(\omega\).

**Why this matters for the demo.** Pair this with [cannon_algorithm_illustration.html](../linear-algebra/cannon_algorithm_illustration.html) and [matrix_illustration.html](../linear-algebra/matrix_illustration.html). Cannon is about *communication* on a mesh; Strassen and \(\omega\) are about *algebraic* complexity. The demos make the distinction visual: tiling vs. recursive block multiplication vs. an existence proof that some bilinear algorithm is faster.

### 3. Randomized Nyström as a preconditioner

**Citation.** Zachary Frangella, Joel A. Tropp, and Madeleine Udell. “Randomized Nyström Preconditioning.” *SIAM Journal on Matrix Analysis and Applications* 44(2):718–752, 2023. [arXiv:2110.02820](https://arxiv.org/abs/2110.02820) · [DOI:10.1137/21M1466244](https://doi.org/10.1137/21M1466244)

**Idea.** A randomized Nyström sketch of a regularized SPD matrix becomes a PCG preconditioner whose condition number is \(O(1)\) once the sketch rank matches the *effective* dimension.

**Why this matters for the demo.** [svd_visualization.html](../linear-algebra/svd_visualization.html) and [eigenvalues_eigenvectors.html](../linear-algebra/eigenvalues_eigenvectors.html) show exact spectral factorizations on tiny matrices. Modern data problems keep the same objects (eigenvalues, low-rank factors) but estimate them from sketches. Read the demo as “what the spectrum *is*”; read Nyström-PCG as “how you use an approximate spectrum to solve \(Ax=b\) at data scale.”

### 4. Tensors as a parameterization, not just a 3-way array

**Citation.** Greg Yang, Edward J. Hu, Igor Babuschkin, Szymon Sidor, Xiaodong Liu, David Farhi, Nick Ryder, Jakub Pachocki, Weizhu Chen, and Jianfeng Gao. “Tensor Programs V: Tuning Large Neural Networks via Zero-Shot Hyperparameter Transfer.” *ICLR*, 2022. [arXiv:2203.03466](https://arxiv.org/abs/2203.03466)

**Idea.** Maximal Update Parametrization (\(\mu\)P) treats widths and learning rates as a tensor program so that hyperparameters chosen on a small model transfer to a wide one.

**Why this matters for the demo.** [tensors_comprehensive.html](../linear-algebra/tensors_comprehensive.html) introduces index notation and contractions. \(\mu\)P is what those contractions become in a modern network: every layer width is a tensor axis, and the *scaling* of those axes is a theorem, not a heuristic. The demo is the algebra; the paper is why that algebra showed up in LLM training recipes.

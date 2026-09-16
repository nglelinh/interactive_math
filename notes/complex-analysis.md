# Complex analysis — research notes

Demos stay in [`../complex-analysis/`](../complex-analysis/). Start from [index.html](../complex-analysis/index.html).

## Demo inventory

- [complex_numbers_fundamentals.html](../complex-analysis/complex_numbers_fundamentals.html)
- [complex_numbers_audio_fundamentals.html](../complex-analysis/complex_numbers_audio_fundamentals.html)
- [complex_numbers_audio_advanced.html](../complex-analysis/complex_numbers_audio_advanced.html)
- [analytic_functions.html](../complex-analysis/analytic_functions.html)
- [complex_functions_visualization.html](../complex-analysis/complex_functions_visualization.html)
- [conformal_mappings.html](../complex-analysis/conformal_mappings.html)
- [contour_integration.html](../complex-analysis/contour_integration.html)
- [complex_integration_applications.html](../complex-analysis/complex_integration_applications.html)
- [power_series_laurent.html](../complex-analysis/power_series_laurent.html)
- [riemann_surfaces.html](../complex-analysis/riemann_surfaces.html)

## Recent advances

### 1. Clifford / geometric-algebra layers (complex numbers as the \(d=2\) case)

**Citation.** Johannes Brandstetter, Rianne van den Berg, Max Welling, and Jayesh K. Gupta. “Clifford Neural Layers for PDE Modeling.” *ICLR*, 2023. [arXiv:2209.04934](https://arxiv.org/abs/2209.04934)

**Idea.** Replace real linear layers with layers that multiply in a Clifford algebra so that vector and bivector (area, flux) structure is not flattened. The complex numbers \(\mathbb{C}\) are the 2-D Clifford algebra \(\mathrm{Cl}_{0,1}\) or \(\mathrm{Cl}_{2,0}\) depending on signature.

**Why this matters for the demo.** [complex_numbers_fundamentals.html](../complex-analysis/complex_numbers_fundamentals.html) and [analytic_functions.html](../complex-analysis/analytic_functions.html) treat \(i\) as a rotation. Clifford layers are the 2023 engineering version of that sentence: keep the algebra that rotates and wedges, instead of splitting into unrelated real channels. After you rotate a vector by \(e^{i\theta}\) in the demo, this paper is “do that in 3-D PDEs.”

### 2. Message-passing PDE solvers that respect geometry

**Citation.** Johannes Brandstetter, Daniel Worrall, and Max Welling. “Message Passing Neural PDE Solvers.” *ICLR*, 2022. [arXiv:2202.03376](https://arxiv.org/abs/2202.03376)

**Idea.** A GNN can step a PDE in time if you give it the right local stencil and train it to stay stable; the paper is about learned integrators, not about \(\mathbb{C}\) per se, but the design pattern is “don’t throw away the algebraic structure of the field.”

**Why this matters for the demo.** [conformal_mappings.html](../complex-analysis/conformal_mappings.html) and [complex_functions_visualization.html](../complex-analysis/complex_functions_visualization.html) show how a holomorphic map distorts grids while preserving angles. Learned PDE solvers fail in the same way a bad conformal picture fails: they ignore local geometric constraints. The demo is the clean holomorphic case; the ICLR paper is the discrete, trained analogue.

### 3. Neural audio codecs still live on complex spectra

**Citation.** Alexandre Défossez, Jade Copet, Gabriel Synnaeve, and Yossi Adi. “High Fidelity Neural Audio Compression.” *Transactions on Machine Learning Research*, 2023. [arXiv:2210.13438](https://arxiv.org/abs/2210.13438)

**Idea.** EnCodec is a real-time residual-vector-quantized audio codec. The front end is still a time-frequency analysis; phases and complex STFT bins remain the practical coordinates for “sound as a complex signal.”

**Why this matters for the demo.** [complex_numbers_audio_fundamentals.html](../complex-analysis/complex_numbers_audio_fundamentals.html) and [complex_numbers_audio_advanced.html](../complex-analysis/complex_numbers_audio_advanced.html) are the course’s reason for teaching \(\mathbb{C}\) to CS students. EnCodec is a 2023 production system that still depends on that identification: a waveform is a real sequence, but the useful local description is a complex spectrum. The demo teaches the identification; the paper is a current system that consumes it.

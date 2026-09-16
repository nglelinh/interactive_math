# Fourier analysis — research notes

Demos stay in [`../fourier-analysis/`](../fourier-analysis/).

## Demo inventory

- [fourier_transform_lesson.html](../fourier-analysis/fourier_transform_lesson.html)
- [fourier_mathematical_foundation.html](../fourier-analysis/fourier_mathematical_foundation.html)
- [fourier.html](../fourier-analysis/fourier.html) / [fourier_enhanced.html](../fourier-analysis/fourier_enhanced.html)
- [fourier_square_wave.html](../fourier-analysis/fourier_square_wave.html)
- [fourier_sawtooth.html](../fourier-analysis/fourier_sawtooth.html)
- [fourier_triagle.html](../fourier-analysis/fourier_triagle.html) (filename spelling is historical)
- [fast_fourier_transform.html](../fourier-analysis/fast_fourier_transform.html)
- [noise_cancellation_spectral_subtraction.html](../fourier-analysis/noise_cancellation_spectral_subtraction.html)

## Recent advances

### 1. Long convolution via FFT as an attention replacement

**Citation.** Michael Poli, Stefano Massaroli, Eric Nguyen, Daniel Y. Fu, Tri Dao, Stephen Baccus, Yoshua Bengio, Stefano Ermon, and Christopher Ré. “Hyena Hierarchy: Towards Larger Convolutional Language Models.” *ICML*, 2023. [arXiv:2302.10866](https://arxiv.org/abs/2302.10866)

**Idea.** Hyena interleaves implicitly parameterized long convolutions (evaluated with FFT) and data-controlled gates. That gives subquadratic sequence mixing and, at long context, large wall-clock wins over attention.

**Why this matters for the demo.** [fast_fourier_transform.html](../fourier-analysis/fast_fourier_transform.html) is the \(O(n\log n)\) engine. Hyena is why that engine reappeared in foundation-model papers: a long FIR filter is a diagonal multiply in Fourier space. After you watch the Cooley–Tukey butterfly, this paper is “the butterfly is the mixer of a language model.”

### 2. Fourier neural operators at weather scale

**Citation.** Jaideep Pathak, Shashank Subramanian, Peter Harrington, Sanjeev Raja, Ashesh Chattopadhyay, Morteza Mardani, Thorsten Kurth, David Hall, Zongyi Li, Kamyar Azizzadenesheli, Pedram Hassanzadeh, Karthik Kashinath, and Animashree Anandkumar. “FourCastNet: A Global Data-driven High-resolution Weather Model using Adaptive Fourier Neural Operators.” arXiv:2202.11214, 2022. [arXiv](https://arxiv.org/abs/2202.11214)

**Idea.** Adaptive Fourier Neural Operators learn maps between function spaces by multiplying in frequency; FourCastNet uses that to produce global, high-resolution medium-range weather forecasts orders of magnitude faster than a conventional GCM step.

**Why this matters for the demo.** [fourier_transform_lesson.html](../fourier-analysis/fourier_transform_lesson.html) and [fourier_mathematical_foundation.html](../fourier-analysis/fourier_mathematical_foundation.html) treat \(\mathcal{F}\) as an analysis tool. FourCastNet treats \(\mathcal{F}\) as a *learnable layer*. The demo’s square/saw/triangle pages ([fourier_square_wave.html](../fourier-analysis/fourier_square_wave.html), [fourier_sawtooth.html](../fourier-analysis/fourier_sawtooth.html), [fourier_triagle.html](../fourier-analysis/fourier_triagle.html)) are the finite-harmonic preview of “keep a few modes, predict the field.”

### 3. Neural codecs vs. classical spectral subtraction

**Citation.** Alexandre Défossez, Jade Copet, Gabriel Synnaeve, and Yossi Adi. “High Fidelity Neural Audio Compression.” *TMLR*, 2023. [arXiv:2210.13438](https://arxiv.org/abs/2210.13438)

**Idea.** A convolutional encoder–quantizer–decoder compresses audio in real time with residual vector quantization. It is the current default *learned* alternative to hand-designed STFT pipelines.

**Why this matters for the demo.** [noise_cancellation_spectral_subtraction.html](../fourier-analysis/noise_cancellation_spectral_subtraction.html) is the classical “estimate a noise floor, subtract in magnitude, reconstruct phase” story. EnCodec is what production systems moved toward after that story: still spectral, but the bin-wise rule is learned and quantized. Use the demo to see why naive subtraction musical-noises; use the paper to see the 2023 replacement stack.

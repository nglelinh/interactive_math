# Optimization — research notes

Demos stay in [`../optimization/`](../optimization/). Neural-net / lasso pages that the hub lists here are annotated in [machine-learning.md](machine-learning.md).

## Demo inventory

- [gradient_descent_illustration.html](../optimization/gradient_descent_illustration.html) / [gradient_descent_demo.html](../optimization/gradient_descent_demo.html)
- [newton_method_illustration.html](../optimization/newton_method_illustration.html) / [newtons_method_demo.html](../optimization/newtons_method_demo.html)
- [quasi_newton_illustration.html](../optimization/quasi_newton_illustration.html) / [quasi_newton_demo.html](../optimization/quasi_newton_demo.html)
- [subgradient_illustration.html](../optimization/subgradient_illustration.html) / [subgradient_demo.html](../optimization/subgradient_demo.html)
- [proximal_gradient_illustration.html](../optimization/proximal_gradient_illustration.html) / [proximal_gradient_demo.html](../optimization/proximal_gradient_demo.html) / [proximal_operator_demo.html](../optimization/proximal_operator_demo.html)
- [stochastic_gradient_illustration.html](../optimization/stochastic_gradient_illustration.html) / [stochastic_gradient_demo.html](../optimization/stochastic_gradient_demo.html)
- [kkt_conditions_demo.html](../optimization/kkt_conditions_demo.html) / [lagrangian_kkt_conditions.html](../optimization/lagrangian_kkt_conditions.html)
- [least_squares_problems.html](../optimization/least_squares_problems.html)
- [Nelder-Mead.html](../optimization/Nelder-Mead.html)
- [loss_function_landscapes.html](../optimization/loss_function_landscapes.html)
- [parallel_computing_illustration.html](../optimization/parallel_computing_illustration.html)

## Recent advances

### 1. Adaptive methods also sit at an “edge of stability”

**Citation.** Jeremy M. Cohen, Behrooz Ghorbani, Shankar Krishnan, Naman Agarwal, Sourabh Medapati, Michal Badura, Daniel Suo, David Cardoze, Zachary Nado, George E. Dahl, and Justin Gilmer. “Adaptive Gradient Methods at the Edge of Stability.” arXiv:2207.14484, 2022. [arXiv](https://arxiv.org/abs/2207.14484)

**Idea.** Full-batch Adam’s *preconditioned* Hessian sharpness equilibrates at a stability threshold (\(\approx 38/\eta\) when \(\beta_1=0.9\)). Unlike vanilla GD at the edge of stability, Adam can keep walking into sharper regions by adapting the preconditioner.

**Why this matters for the demo.** [gradient_descent_demo.html](../optimization/gradient_descent_demo.html) and [loss_function_landscapes.html](../optimization/loss_function_landscapes.html) show monotone-looking bowls and a 2-D loss surface. Edge-of-stability says a realistic neural loss is *not* that bowl: with a constant step you oscillate along the sharpest curvature. After you pick \(\eta\) on the smooth demo, this paper is why training curves wiggle even when the code is correct.

### 2. Schedule-free first-order methods

**Citation.** Aaron Defazio, Xingyu (Alice) Yang, Harsh Mehta, Konstantin Mishchenko, Ahmed Khaled, and Ashok Cutkosky. “The Road Less Scheduled.” *NeurIPS*, 2024. [arXiv:2405.15682](https://arxiv.org/abs/2405.15682) · [NeurIPS page](https://proceedings.neurips.cc/paper_files/paper/2024/hash/136b9a13861308c8948cd308ccd02658-Abstract-Conference.html)

**Idea.** Iterate averaging and learning-rate schedules are two views of the same theory. Schedule-Free SGD/AdamW remove the need to know the horizon \(T\) and still match cosine decay. It won the 2024 AlgoPerf self-tuning track.

**Why this matters for the demo.** [stochastic_gradient_demo.html](../optimization/stochastic_gradient_demo.html) exposes a constant (or hand-tuned) step. The NeurIPS paper is the 2024 answer to “what step should I type into this slider if I do not know how long I will train?” — keep the slider for pedagogy; know that production recipes increasingly refuse to set \(T\).

### 3. Discovered first-order methods (Lion)

**Citation.** Xiangning Chen, Chen Liang, Da Huang, Esteban Real, Kaiyuan Wang, Yao Liu, Hieu Pham, Xuanyi Dong, Thang Luong, Cho-Jui Hsieh, Yifeng Lu, and Quoc V. Le. “Symbolic Discovery of Optimization Algorithms.” *ICML*, 2023. [arXiv:2302.06675](https://arxiv.org/abs/2302.06675)

**Idea.** A search over symbolic update programs finds Lion: sign-based momentum with decoupled weight decay. It trains large models with a smaller memory footprint than Adam.

**Why this matters for the demo.** [gradient_descent_illustration.html](../optimization/gradient_descent_illustration.html) is \(x \leftarrow x - \eta\nabla f\). Lion is still first-order, but the update is \(\mathrm{sign}(\text{momentum})\). The demo is the algebra of a gradient step; the ICML paper is evidence that the *form* of that step is still being redesigned, not only the learning rate.

### 4. A practical second-order cousin of Newton / quasi-Newton

**Citation.** Hong Liu, Zhiyuan Li, David Hall, Percy Liang, and Tengyu Ma. “Sophia: A Scalable Stochastic Second-order Optimizer for Language Model Pre-training.” arXiv:2305.14342, 2023. [arXiv](https://arxiv.org/abs/2305.14342)

**Idea.** Sophia estimates a diagonal Hessian (via a Hutchinson-style or clipped estimator) and preconditions the gradient, with a clip to survive nonconvexity. It is closer in spirit to a damped Newton / quasi-Newton step than to Adam.

**Why this matters for the demo.** [newtons_method_demo.html](../optimization/newtons_method_demo.html) and [quasi_newton_demo.html](../optimization/quasi_newton_demo.html) are the exact and BFGS stories on a 1-D/low-D \(f\). Sophia is what “use curvature” looks like when \(f\) is an LLM loss and you cannot store a BFGS matrix. After you watch Newton overshoot a flat region, the clip in Sophia is the 2023 fix.

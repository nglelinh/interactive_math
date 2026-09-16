# Algorithms & data structures — research notes

Demos stay in [`../algorithms-datastructures/`](../algorithms-datastructures/). Start from [index.html](../algorithms-datastructures/index.html).

## Demo inventory

- [arrays_and_dynamic_arrays.html](../algorithms-datastructures/arrays_and_dynamic_arrays.html)
- [linked_lists.html](../algorithms-datastructures/linked_lists.html)
- [stacks_and_queues.html](../algorithms-datastructures/stacks_and_queues.html)
- [bubble_sort_visualization.html](../algorithms-datastructures/bubble_sort_visualization.html)
- [bloom_filter.html](../algorithms-datastructures/bloom_filter.html)
- [drunken_bishop.html](../algorithms-datastructures/drunken_bishop.html)

## Recent advances

### 1. Binary fuse filters replace Bloom in the static case

**Citation.** Thomas Mueller Graf and Daniel Lemire. “Binary Fuse Filters: Fast and Smaller Than Xor Filters.” *ACM Journal of Experimental Algorithmics* 27, Article 1.5, 2022. [arXiv:2201.01174](https://arxiv.org/abs/2201.01174) · [DOI:10.1145/3510449](https://doi.org/10.1145/3510449)

**Idea.** A static approximate-membership structure, built by spatially coupled XOR hashing (“burning fuse” peeling). About 13% (3-wise) or 8% (4-wise) above the information-theoretic fingerprint bound, with faster construction than xor filters.

**Why this matters for the demo.** [bloom_filter.html](../algorithms-datastructures/bloom_filter.html) is the 1970 Bloom picture: \(k\) independent bits, tunable false-positive rate, cheap updates. Binary fuse filters are the 2022 default when the set is *static* (a URL denylist, a frozen dictionary): same membership API, much closer to the bit lower bound. After you set \(k\) and \(m\) in the demo, this paper is “what if we are allowed to rebuild.”

### 2. Algorithms that take a predictor as an extra input

**Citation.** Michael Mitzenmacher and Sergei Vassilvitskii. “Algorithms with Predictions.” *Communications of the ACM* 65(7):33–35, 2022. [DOI:10.1145/3528087](https://doi.org/10.1145/3528087) · [CACM](https://cacm.acm.org/opinion/algorithms-with-predictions/)

**Idea.** Online and sketching algorithms can accept a (possibly wrong) machine-learned hint — a predicted next request, a predicted item frequency — and offer graceful degradation: near-optimal when the hint is good, worst-case competitive when it is not.

**Why this matters for the demo.** [arrays_and_dynamic_arrays.html](../algorithms-datastructures/arrays_and_dynamic_arrays.html), [stacks_and_queues.html](../algorithms-datastructures/stacks_and_queues.html), and [bubble_sort_visualization.html](../algorithms-datastructures/bubble_sort_visualization.html) are worst-case or textbook-average stories. The CACM piece is the 2022 research program that sits on top of those structures: a learned prefetch for an array, a learned admission rule for a cache/queue, a learned pivot. The demo still teaches the bare algorithm; the article is why “algorithms + ML” became its own SODA/NeurIPS topic.

### 3. IO-aware exact algorithms (FlashAttention)

**Citation.** Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, and Christopher Ré. “FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness.” *NeurIPS*, 2022. [arXiv:2205.14135](https://arxiv.org/abs/2205.14135)

**Idea.** Exact softmax attention is rewritten as a tiled streaming algorithm that never materializes the \(N\times N\) matrix. The win is SRAM vs HBM traffic, not a new complexity class.

**Why this matters for the demo.** [arrays_and_dynamic_arrays.html](../algorithms-datastructures/arrays_and_dynamic_arrays.html) is about contiguous layout and resizing. FlashAttention is that lesson on a GPU: the data structure *is* the memory hierarchy. After you watch an array double its capacity, this paper is “tiling a theoretically \(O(N^2)\)-space object so it fits in cache.”

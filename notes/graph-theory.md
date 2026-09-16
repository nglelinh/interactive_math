# Graph theory — research notes

Demos stay in [`../graph-theory/`](../graph-theory/). Start from [index.html](../graph-theory/index.html).

## Demo inventory

- [graph_fundamentals.html](../graph-theory/graph_fundamentals.html)
- [graph_traversal.html](../graph-theory/graph_traversal.html)
- [shortest_path.html](../graph-theory/shortest_path.html)
- [social_network_analysis.html](../graph-theory/social_network_analysis.html)
- [graph_neural_networks.html](../graph-theory/graph_neural_networks.html)
- [network_flow.html](../graph-theory/network_flow.html)

## Recent advances

### 1. Over-squashing is a curvature problem

**Citation.** Jake Topping, Francesco Di Giovanni, Benjamin Paul Chamberlain, Xiaowen Dong, and Michael M. Bronstein. “Understanding over-squashing and bottlenecks on graphs via curvature.” *ICLR*, 2022 (oral). [arXiv:2111.14522](https://arxiv.org/abs/2111.14522)

**Idea.** Message passing compresses exponentially many \(k\)-hop signals through bottleneck edges. Those edges are exactly the ones with negative Balanced Forman curvature. A discrete Ricci-flow rewiring adds shortcuts where curvature is bad.

**Why this matters for the demo.** [graph_traversal.html](../graph-theory/graph_traversal.html) and [graph_fundamentals.html](../graph-theory/graph_fundamentals.html) show BFS/DFS walking a small graph. Over-squashing is what happens when that walk is *learned*: the same narrow bridge that BFS crosses once becomes a gradient bottleneck. After you highlight a bridge in the demo, this paper is why GNN depth is not “just more hops.”

### 2. A modular graph-transformer recipe (GraphGPS)

**Citation.** Ladislav Rampášek, Mikhail Galkin, Vijay Prakash Dwivedi, Anh Tuan Luu, Guy Wolf, and Dominique Beaini. “Recipe for a General, Powerful, Scalable Graph Transformer.” *NeurIPS*, 2022. [arXiv:2205.12454](https://arxiv.org/abs/2205.12454)

**Idea.** GraphGPS splits the model into a local MPNN, a global attention (or linear) block, and a positional/structural encoding. The combination, not any single gadget, is what matches specialized GNN and graph-transformer numbers.

**Why this matters for the demo.** [graph_neural_networks.html](../graph-theory/graph_neural_networks.html) is a local message-passing cartoon. GraphGPS is the 2022 design pattern that says “local MPNN is necessary but not sufficient”: you also need a global channel, which is exactly what over-squashing forbids. Read the demo as the local block; read the paper as the missing global block.

### 3. GNNs that forecast the planet

**Citation.** Remi Lam, Alvaro Sanchez-Gonzalez, Matthew Willson, Peter Wirnsberger, Meire Fortunato, Ferran Alet, Suman Ravuri, Timo Ewalds, Zach Eaton-Rosen, Weihua Hu, Alexander Merose, Stephan Hoyer, George Holland, Oriol Vinyals, Jacklynn Stott, Alexander Pritzel, Shakir Mohamed, and Peter Battaglia. “Learning skillful medium-range global weather forecasting.” *Science* 382(6677):1416–1421, 2023. [DOI:10.1126/science.adi2336](https://doi.org/10.1126/science.adi2336)

**Idea.** GraphCast encodes a latitude–longitude grid onto a multi-scale icosahedral mesh, runs a GNN, and decodes 10-day global forecasts at 0.25°. It beat ECMWF HRES on the majority of evaluated targets and runs in under a minute on a TPU.

**Why this matters for the demo.** [social_network_analysis.html](../graph-theory/social_network_analysis.html) and [shortest_path.html](../graph-theory/shortest_path.html) are the “graph = people or roads” intuition. GraphCast is the “graph = the Earth” intuition: mesh edges are spatial neighbors, message passing is a learned PDE step. The fundamentals demo still teaches vertices and edges; this paper is why those definitions showed up in a *Science* weather model.

### 4. Expressivity of subgraph GNNs

**Citation.** Fabrizio Frasca, Beatrice Bevilacqua, Michael M. Bronstein, and Haggai Maron. “Understanding and Extending Subgraph GNNs by Rethinking Their Symmetries.” *NeurIPS*, 2022. [NeurIPS PDF](https://proceedings.neurips.cc/paper_files/paper/2022/file/cb2a4cc70db72ea779abd01107782c7b-Paper-Conference.pdf)

**Idea.** Node-based subgraph GNNs are at most as expressive as 3-WL. A symmetry analysis produces a unified layer family (SUN) that implements previous subgraph models as special cases.

**Why this matters for the demo.** [graph_fundamentals.html](../graph-theory/graph_fundamentals.html) treats isomorphism informally (“same picture, different labels”). The NeurIPS paper is the 2022 complexity of that sentence for neural nets: ordinary MPNNs fail 1-WL tests; subgraph methods climb toward 3-WL and then stop. After the demo’s small isomorphic examples, this is the right “can a GNN tell these apart?” reference.

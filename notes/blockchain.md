# Blockchain — research notes

Demos stay in [`../blockchain/`](../blockchain/). Start from [index.html](../blockchain/index.html).

## Demo inventory

- [blockchain_fundamentals.html](../blockchain/blockchain_fundamentals.html)
- [smart_contracts_consensus.html](../blockchain/smart_contracts_consensus.html)
- [defi_mathematics.html](../blockchain/defi_mathematics.html)
- [zero_knowledge_proofs.html](../blockchain/zero_knowledge_proofs.html)
- [nft_token_economics.html](../blockchain/nft_token_economics.html)

## Recent advances

### 1. Folding schemes (Nova)

**Citation.** Abhiram Kothapalli, Srinath Setty, and Ioanna Tzialla. “Nova: Recursive Zero-Knowledge Arguments from Folding Schemes.” *CRYPTO*, 2022. [ePrint 2021/370](https://eprint.iacr.org/2021/370) · [DOI:10.1007/978-3-031-15985-5_13](https://doi.org/10.1007/978-3-031-15985-5_13)

**Idea.** Incrementally verifiable computation by *folding* two relaxed-R1CS instances into one, instead of wrapping a full SNARK at every step. Recursion overhead is a handful of group scalar muls; no pairing-friendly trusted setup and no FFT in the recursive circuit.

**Why this matters for the demo.** [zero_knowledge_proofs.html](../blockchain/zero_knowledge_proofs.html) is the “prove a statement without revealing the witness” cartoon. Nova is the 2022 reason recursive proofs became cheap enough for long-running computations (rollups, client-side proving). After the demo’s toy protocol, this paper is the folding picture that replaced “SNARK inside SNARK.”

### 2. Plonk without the prover FFT (HyperPlonk)

**Citation.** Binyi Chen, Benedikt Bünz, Dan Boneh, and Zhenfei Zhang. “HyperPlonk: Plonk with Linear-Time Prover and High-Degree Custom Gates.” *EUROCRYPT*, 2023. [ePrint 2022/1355](https://eprint.iacr.org/2022/1355)

**Idea.** Move Plonk from univariate polynomials (and a large FFT) to the boolean hypercube and multilinear commitments. High-degree custom gates no longer destroy prover time.

**Why this matters for the demo.** [smart_contracts_consensus.html](../blockchain/smart_contracts_consensus.html) and the ZK page treat a circuit as a constraint system. HyperPlonk is a 2023 prover-side redesign of that constraint system: same “gates + wiring” pedagogy, different polynomial basis. Use the demo for the statement; use the paper for why modern zkVMs advertise *linear* provers.

### 3. SNARKs over tiny binary fields (Binius)

**Citation.** Benjamin E. Diamond and Jim Posen. “Succinct Arguments over Towers of Binary Fields.” Cryptology ePrint 2023/1784, 2023. [ePrint](https://eprint.iacr.org/2023/1784)

**Idea.** A Brakedown-style multilinear commitment that talks natively to \(\mathbb{F}_2\)-towers, so hashes such as Keccak-256 (the Ethereum workhorse) do not pay an embedding overhead.

**Why this matters for the demo.** [blockchain_fundamentals.html](../blockchain/blockchain_fundamentals.html) hashes blocks; [zero_knowledge_proofs.html](../blockchain/zero_knowledge_proofs.html) proves statements. Binius is the 2023–2024 bridge: proving “I know a preimage / I executed this EVM hash” is cheap if the SNARK’s field *is* the hash’s field. After the Merkle-chain demo, this is why “prove Keccak” stopped being a joke.

### 4. Proof-of-stake in production (The Merge)

**Citation.** Ethereum’s consensus switched from proof-of-work to proof-of-stake on 15 September 2022 (“The Merge”). Protocol background: Vitalik Buterin et al., “Combining GHOST and Casper,” arXiv:2003.03052 (Gasper; preprint 2020, deployed 2022). [arXiv](https://arxiv.org/abs/2003.03052) · [Ethereum Merge docs](https://ethereum.org/en/roadmap/merge/)

**Idea.** Fork-choice (LMD-GHOST) plus finality (Casper FFG) replaced energy-intensive mining as Ethereum’s consensus. The mathematics of the *demo* (hash chains, incentives) stayed; the Sybil mechanism changed.

**Why this matters for the demo.** [smart_contracts_consensus.html](../blockchain/smart_contracts_consensus.html) and [nft_token_economics.html](../blockchain/nft_token_economics.html) still make sense after 2022, but “miners” is the wrong noun. After the demo’s longest-chain cartoon, The Merge is the event that turned that cartoon into committees, slots, and finality gadgets. [defi_mathematics.html](../blockchain/defi_mathematics.html) is downstream: settlement assumptions changed with the consensus change.

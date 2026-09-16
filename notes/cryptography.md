# Cryptography — research notes

Demos stay in [`../cryptography/`](../cryptography/).

## Demo inventory

- [number_theory_foundations.html](../cryptography/number_theory_foundations.html)
- [rsa_encryption_demo.html](../cryptography/rsa_encryption_demo.html)
- [elliptic_curve_crypto.html](../cryptography/elliptic_curve_crypto.html)
- [diffie_hellman.html](../cryptography/diffie_hellman.html)
- [aes_encryption.html](../cryptography/aes_encryption.html)
- [hash_functions_demo.html](../cryptography/hash_functions_demo.html)
- [digital_signatures.html](../cryptography/digital_signatures.html)
- [quantum_cryptography.html](../cryptography/quantum_cryptography.html)
- [steganography_demo.html](../cryptography/steganography_demo.html)

## Recent advances

### 1. A lattice KEM is now a US standard

**Citation.** National Institute of Standards and Technology. *FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard (ML-KEM).* August 13, 2024. [DOI:10.6028/NIST.FIPS.203](https://doi.org/10.6028/NIST.FIPS.203) · [CSRC](https://csrc.nist.gov/pubs/fips/203/final)

**Idea.** ML-KEM (from CRYSTALS-Kyber) is a module-LWE key-encapsulation mechanism with parameter sets 512/768/1024. It is the approved post-quantum replacement for the key-agreement story the demos tell with RSA and Diffie–Hellman.

**Why this matters for the demo.** [rsa_encryption_demo.html](../cryptography/rsa_encryption_demo.html) and [diffie_hellman.html](../cryptography/diffie_hellman.html) are the integer / discrete-log pictures that Shor’s algorithm breaks. FIPS 203 is the 2024 document that says what to use instead. Keep the demos — they still teach modular arithmetic — and treat ML-KEM as the “what production TLS is migrating to” pointer. [quantum_cryptography.html](../cryptography/quantum_cryptography.html) is the threat model this standard answers (for public-key encryption), not QKD itself.

### 2. Lattice signatures, standardized in parallel

**Citation.** National Institute of Standards and Technology. *FIPS 204: Module-Lattice-Based Digital Signature Standard (ML-DSA).* August 13, 2024. [DOI:10.6028/NIST.FIPS.204](https://doi.org/10.6028/NIST.FIPS.204) · [NIST announcement](https://www.nist.gov/news-events/news/2024/08/announcing-approval-three-federal-information-processing-standards-fips)

**Idea.** ML-DSA (from CRYSTALS-Dilithium) is the module-lattice signature scheme approved alongside ML-KEM.

**Why this matters for the demo.** [digital_signatures.html](../cryptography/digital_signatures.html) and [elliptic_curve_crypto.html](../cryptography/elliptic_curve_crypto.html) show ECDSA-style “hash then sign on a curve.” FIPS 204 is the drop-in *category* of replacement: still a signature, different hard problem (module-LWE / SIS, not ECDLP). After you watch a toy RSA/ECC signature in the browser, this is the 2024 name of the algorithm that is supposed to survive a cryptographically relevant quantum computer.

### 3. Hash-based signatures as a conservative backup

**Citation.** National Institute of Standards and Technology. *FIPS 205: Stateless Hash-Based Digital Signature Standard (SLH-DSA).* August 13, 2024. [DOI:10.6028/NIST.FIPS.205](https://doi.org/10.6028/NIST.FIPS.205)

**Idea.** SLH-DSA (from SPHINCS+) signs using only a secure hash. Keys and signatures are larger; the assumption is minimal.

**Why this matters for the demo.** [hash_functions_demo.html](../cryptography/hash_functions_demo.html) is collision resistance and the Merkle-Damgård / sponge picture. FIPS 205 is why that picture is again a *public-key* primitive: if you trust only the hash, you can still sign. The demo teaches the compression function; the standard is the 2024 signature system built from it.

### 4. Lightweight AEAD: Ascon

**Citation.** National Institute of Standards and Technology. “NIST Selects ‘Lightweight Cryptography’ Algorithms to Protect Small Devices.” February 7, 2023 (Ascon family). [NIST news](https://www.nist.gov/news-events/news/2023/02/nist-selects-lightweight-cryptography-algorithms-protect-small-devices)

**Idea.** Ascon is a permutation-based AEAD / hash family chosen for constrained devices after a multi-year NIST lightweight competition.

**Why this matters for the demo.** [aes_encryption.html](../cryptography/aes_encryption.html) is the 128-bit-block SPN everyone still needs to understand. Ascon is the 2023 companion standard for chips that cannot afford AES-GCM comfortably. After the AES round demo, this is the current “small-device” pointer — not a replacement for AES on servers.

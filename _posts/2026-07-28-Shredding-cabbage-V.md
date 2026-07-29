---
layout: post
title: "Shredding Cabbage V: The Largest Piece in the Kakutani Model (Continued)"
date: 2026-07-28
tags:
 - Probability
---

## Problem Setting

In this post, we finish the proof for the expectation of the largest piece in the Kakutani model.  

Let's first recall the basic setting. Starting from an interval $[0,1]$ (the full piece of cabbage), 

- **K-model**: repeat the following $n$ times: pick the longest current piece and split at a uniformly random point within that piece.

#### What Was Proved in the Previous Post

Let $M_n$ denote the length of the largest piece after $n$ splits, so there are $n+1$ pieces. Let
$$
N_t=\min\{n:M_n\leq t\}
$$
be the first time when every piece has length at most $t$. An [earlier post](https://relyt871.github.io/2026/07/16/Shredding-cabbage-II.html) introduced $N_t$ and gave explicit formulas for its expectation and variance; the [previous post](https://relyt871.github.io/2026/07/19/Shredding-cabbage-IV.html) further utilized these quantities and the duality between $M_n$ and $N_t$
$$
M_n> t \Longleftrightarrow N_t> n ~,
$$

to show the following high-probability tail bound for $M_n$ (slightly adapted to be used conveniently as a black box):

**Lemma1.** there exists a constant $C>0$ such that for all sufficiently large $n$ and $L>0$ such that $\dfrac{2}{n}+Ln^{-3/2} < \dfrac{1}{2}$, 
$$
\Pr\left[\left|M_n-\frac{2}{n}\right|>Ln^{-3/2}\right]< \frac{C}{L^2} ~.
$$
In this post, we complete the remaining part of the proof: integrate over the range of $M_n$ and convert the above tail bound into a bound on $\mathbb{E}[M_n]$.

## From Tail Bounds to the Expectation of $M_n$

**Theorem.** $\mathbb E[|nM_n-2|]=O(n^{-1/2})$.

This implies $\left|\mathbb{E}[M_n]-\frac{2}{n}\right| =O(n^{-3/2})$, which means for sufficiently large $n$, $\mathbb{E}[M_n]$ is roughly equal to $\frac{2}{n}$.

**Proof.** First consider the upper side, where $nM_n>2$. The expectation of $(nM_n-2)_+$ can be calculated via an integration over $2<nM_n\leq n$:
$$
\mathbb E[(nM_n-2)_+]=\int_0^n \Pr[nM_n>2+u]\,du ~.
$$
This integration can be decomposed into three parts: 



**Part I.** When $0\leq u\leq n^{-1/2}$, since the integrand is at most $1$, the contribution of this part is at most $n^{-1/2}$.



**Part II.** When $n^{-1/2}\leq u< \dfrac{n}{2}-2$, we have $\dfrac{2+u}{n} < \dfrac{1}{2}$ and
$$
nM_n>2+u \iff M_n - \frac{2}{n} > \frac{u}{n} ~,
$$
so we can apply **Lemma1** with $L=u\sqrt n$,
$$
\Pr[nM_n > 2+u] \leq \Pr\left[\left|M_n-\frac{2}{n}\right|> (u\sqrt n) \cdot  n^{-3/2}\right]< \frac{C}{u^2 n} ~.
$$
Therefore, the contribution of this part to the integral is at most
$$
\int_{n^{-1/2}}^{n/2-2}\frac{C}{nu^2} du \leq \frac{C}{n}\int_{n^{-1/2}}^{n/2}\frac{1}{u^2}du = \frac{C}{n}\cdot \frac{1}{u}\bigg|_{n/2}^{n^{-1/2}} \leq Cn^{-1/2} = O(n^{-1/2}) ~.
$$


**Part III.** When $u\geq \dfrac{n}{2}-2$, we have
$$
\Pr[nM_n>2+u] \leq \Pr[M_n>1/2] = \Pr[N_{1/2}>n] ~.
$$
In an [earlier post](https://relyt871.github.io/2026/07/16/Shredding-cabbage-II.html) we proved that for $1/2\leq t<1$, $\Pr[N_t>n] \leq (3/4)^nt^{-1}$, therefore
$$
\Pr[nM_n>2+u] \leq 2\left(\frac{3}{4}\right)^n ~.
$$
Since the integration range is $[n/2-2,n]$ with length $O(n)$, the contribution of this part to the integral is at most $O(n)\cdot \left(\frac{3}{4}\right)^n = o(n^{-1/2})$.

Combining the three parts gives $\mathbb E[(nM_n-2)_+] = O(n^{-1/2})$. 



The lower side can be handled similarly: 
$$
\mathbb E[(2-nM_n)_+]=\int_0^2 \Pr[nM_n<2-u]\,du ~.
$$
Again, the part $0\leq u\leq n^{-1/2}$ contributes $O(n^{-1/2})$, and by Lemma1 the part $n^{-1/2}\leq u\leq 2$ contributes $O(n^{-1/2})$. Now we can conclude that
$$
\mathbb E[|nM_n-2|] = \mathbb E[(nM_n-2)_+] + \mathbb E[(2-nM_n)_+]= O(n^{-1/2}) ~.
$$

## Related Posts

[Shredding Cabbage I: The Uniform Spacing Model](https://relyt871.github.io/2026/07/15/Shredding-cabbage-I.html)

[Shredding Cabbage II: Convergence to Uniformity](https://relyt871.github.io/2026/07/16/Shredding-cabbage-II.html)

[Shredding Cabbage III: Convergence to Uniformity (Continued)](https://relyt871.github.io/2026/07/17/Shredding-Cabbage-III.html)

[Shredding Cabbage IV: The Largest Piece in the Kakutani Model](https://relyt871.github.io/2026/07/19/Shredding-cabbage-IV.html)

---
layout: post
title: "Shredding Cabbage IV: The Largest Piece in the Kakutani Model"
date: 2026-07-19
tags:
 - Probability
---

## Problem Setting

Let's first recall the basic setting. Starting from an interval $[0,1]$ (the full piece of cabbage), consider two natural models of random shredding:

- **U-model**: sample $n-1$ points independently and uniformly at random from $(0,1)$. These points divide the interval into $n$ pieces.
- **K-model**: repeat the following $n-1$ times to obtain $n$ pieces: pick the longest current piece and split at a uniformly random point within that piece.

In the [first post](https://relyt871.github.io/2026/07/15/Shredding-cabbage-I.html) in this series, we studied the expected lengths of the pieces in the U-model. In the [previous](https://relyt871.github.io/2026/07/16/Shredding-cabbage-II.html) [two](https://relyt871.github.io/2026/07/17/Shredding-Cabbage-III.html) posts we showed that despite the difference in how the splitting points are chosen, in both models, the empirical distribution induced by the splitting points converges to the uniform distribution as $n\to\infty$ almost surely.

Starting from this post, we will look at the expected lengths of the pieces in the K-model. 

## Numerical Comparison

We have [proved](https://relyt871.github.io/2026/07/15/Shredding-cabbage-I.html) that in the U-model, the expected length of the largest piece is 
$$
\frac{1}{n}\sum_{j=1}^n \frac{1}{j}=\frac{H_n}{n}=\frac{\Theta(\ln n)}{n} \tag{1} ~.
$$
The following table compares the expected length of the largest piece in both models. For the U-model, the expectations can be exactly computed using (1); for the K-model, the values are obtained by averaging over $10^6$ random trials. 

| $n$ pieces | U-model | K-model | $2/n$ |
|:----:|:---------:|:---------:|:---------:|
| 1 | 1.0000 | 1.0000 | 2.0000 |
| 2 | 0.7500 | 0.7500 | 1.0000 |
| 3 | 0.6111 | 0.5753 | 0.6667 |
| 4 | 0.5208 | 0.4555 | 0.5000 |
| 5 | 0.4567 | 0.3728 | 0.4000 |
| 10 | 0.2929  | 0.1930  | 0.2000 |
| 25 | 0.1526  | 0.0788  | 0.0800 |
| 50 | 0.0900  | 0.0397  | 0.0400 |
| 75 | 0.0654  | 0.0265  | 0.0267 |
| 100 | 0.0519 | 0.0199 | 0.0200 |

The difference between the two models is already visible for small $n$. Intuitively, in the K-model, the length of the largest piece decreases much faster, because it always splits the largest piece into two smaller pieces. Later we will show that the expectation in the K-model is roughly $2/n$, and in the table we also provide the values of $2/n$ for comparison.

When $n=3$, the exact value of the expectation in the K-model is $\log(16/9)$, and it seems that for larger $n$, there is no formula as simple as (1). So we will focus on the asymptotic value as $n\to\infty$.

## An Overview of the Proof

For convenience, we consider the largest piece after $n$ splits instead of $n-1$ splits.

Let $M_n$ denote the largest piece among the $n+1$ pieces after $n$ splits. We will prove
$$
\mathbb E[M_n]=\frac{2}{n}+O(n^{-3/2}) ~,
$$

which is equivalent to saying that the expectation of the largest piece after $n-1$ splits is roughly $\frac{2}{n}$, because $\frac{2}{n}$ and $\frac{2}{n-1}$ differ by at most $O(n^{-2})$.

The proof relies on a stopping time:

> **Definition.** for $t\in(0,1)$, let $N_t$ be the first time when all pieces have length at most $t$. Formally, $N_t=\min\{n:M_n\leq t\}.$

This notion was introduced in [van Zwet (1978)](https://www.jstor.org/stable/pdf/2242867.pdf), who also characterized the **expectation and variance** of $N_t$:

- $\mathbb{E}[N_t] = \dfrac{2}{t}-1$, for $0<t<1$. A proof for this result can be found in a [previous post](https://relyt871.github.io/2026/07/16/Shredding-cabbage-II.html).
- $\operatorname{Var}(N_t) = \dfrac{c}{t}$, for $0<t<\dfrac{1}{2}$, where $c$ is a small constant.

[Pyke and van Zwet (2004)](https://www.jstor.org/stable/3481564) exploit the relation $M_n> t \Longleftrightarrow N_t> n$ and prove the following tail bound.

**Lemma.** For every $\varepsilon>0$, there exist constants $L>0$ and $n_\varepsilon$ such that, for all $n\geq n_\varepsilon$, 
$$
\Pr\left[\left|M_n-\frac{2}{n}\right|>Ln^{-3/2}\right]<\varepsilon ~.
$$
This post will focus on presenting the proof for this lemma. It shows that $M_n$ is concentrated within an $O(n^{-3/2})$ distance from $\frac{2}{n}$. The next post will extend it to bounds on the expectation of $M_n$ with a few more steps.

## Proof of the Tail Bound

For the stopping time $N_t=\min\{n:M_n\leq t\}$, we have the following equivalence:
$$
M_n>t \Longleftrightarrow N_t>n ~. \tag{2}
$$
This is because both have the same meaning that the largest piece after $n$ splits is larger than $t$.

Next we use (2) and the expectation and variance of $N_t$ to bound the probability that $M_n>t$.

Fix $n$ and some $0<t<1/2$ such that $\mathbb{E}[N_t]=\frac{2}{t}-1 < n$. By [Chebyshev's inequality](https://en.wikipedia.org/wiki/Chebyshev's_inequality),
$$
\begin{aligned}
\Pr[M_n>t] = &~ \Pr[N_t>n]\\
\leq &~ \Pr\bigg[|N_t-\mathbb E[N_t]|\geq n-\mathbb E[N_t]\bigg]\\
\leq &~ \frac{\operatorname{Var}(N_t)}{(n-\mathbb E[N_t])^2}= \frac{c}{t(n-\frac{2}{t}+1)^2} ~. 
\end{aligned}
\tag{3}
$$
Now assume $n$ is sufficiently large and substitute
$$
t=\frac{2}{n}+Ln^{-3/2}
$$
into (3), where $L$ is some large constant to be determined later. We have
$$
n-\frac{2}{t}+1 = n-\frac{2}{\frac2n+Ln^{-3/2}}+1 = n\left(1-\frac{1}{1+\frac{L}{2}n^{-1/2}}\right)+1 = \Theta(L\sqrt n) ~,
$$
therefore
$$
\Pr\left[M_n > \frac{2}{n}+Ln^{-3/2}\right] \leq \frac{c}{\left(\frac{2}{n}+Ln^{-3/2}\right)\cdot \Theta(L^2 n)} = O\left(\frac{1}{L^2}\right) ~.
$$

This proves the upper tail. The lower tail can be handled similarly, and the bound is
$$
\Pr\left[M_n<\frac{2}{n}-Ln^{-3/2}\right] \leq O\left(\frac{1}{L^2}\right)
$$
 Combining the two tails, we conclude that for any $\epsilon>0$, if we choose $L=\Theta(1/\sqrt\epsilon)$, then
$$
\Pr\left[\left|M_n-\frac{2}{n}\right|>Ln^{-3/2}\right] \leq \epsilon ~.
$$

## References

- [van Zwet, W. R. (1978). “A Proof of Kakutani's Conjecture on Random Subdivision of Longest Intervals.” *The Annals of Probability*, 6(1), 133–137.](https://www.jstor.org/stable/pdf/2242867.pdf)
- [Pyke, R., and van Zwet, W. R. (2004). “Weak Convergence Results for the Kakutani Interval Splitting Procedure.” *The Annals of Probability*, 32(1A), 380–423.](https://www.jstor.org/stable/3481564)

## Related Posts

[Shredding Cabbage I: The Uniform Spacing Model](https://relyt871.github.io/2026/07/15/Shredding-cabbage-I.html)

[Shredding Cabbage II: Convergence to Uniformity](https://relyt871.github.io/2026/07/16/Shredding-cabbage-II.html)

[Shredding Cabbage III: Convergence to Uniformity (Continued)](https://relyt871.github.io/2026/07/17/Shredding-Cabbage-III.html)

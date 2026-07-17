---
layout: post
title: "Shredding Cabbage III: Convergence to Uniformity (Continued)"
date: 2026-07-17
tags:
 - Probability
---

## Problem Setting

In the [previous post](https://relyt871.github.io/2026/07/16/Shredding-cabbage-II.html) in this series, I examined the convergence to uniformity in the U-model and the K(akutani)-model. In this post, let me finish the proof for the K-model.

Let's first recall the basic setting of the K-model of shredding cabbage. Start from an interval $[0,1]$ (the full piece of cabbage), 

- **K-model**: repeat the following $n-1$ times to obtain $n$ pieces: pick the longest current piece and split at a uniformly random point within that piece.

#### The Notion of Convergence

Let $P_n$ denote the set of the first $n$ splitting points. Consider the **empirical distribution** with respect to $P_n$. Its [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) (CDF) is defined as
$$
F_n(x)=\frac{1}{n}\left|\{p\in P_n:p\leq x\}\right|,\qquad 0< x<1 ~.
$$
We say that the splitting points converge to the uniform distribution if with probability $1$,
$$
\lim_{n\to\infty}\sup_{0<x<1}|F_n(x)-x|= 0 ~.
$$
That is, the CDF of the empirical distribution [uniformly converges](https://en.wikipedia.org/wiki/Uniform_convergence) to the CDF of  $U(0,1)$ almost surely.

#### What Was Proved In The Previous Post

In the previous post, we defined a stopping time for the K-model: 

> For $t\in(0,1)$, let $N_t$ be the first time when all pieces have length at most $t$; for $t\geq 1$, define $N_t=0$ for completeness.

We showed that $N_t$ can be characterized in a recursive fashion: conditioned on the first splitting point being at $x\in(0,1)$, $N_t$ is identically distributed as $1+N_{t/x}+N_{t/(1-x)}$. Using this property, we were able to obtain the expectation and variance of $N_t$ when $t$ is small: 

- $\mu(t) = \mathbb{E}[N_t] = \dfrac{2}{t}-1$, for $0<t<1$.
- $v(t) = \operatorname{Var}(N_t) = \dfrac{c}{t}$, for $0<t<\dfrac{1}{2}$, where $c$ is a small constant.

## Proof for the K-Model (Continued)

Now we proceed to the remaining part of the proof in [van Zwet (1978)](https://www.jstor.org/stable/pdf/2242867.pdf).

#### Convergence of the Stopping Times

For $m=2,3,\ldots$, define $M_m = N_{m^{-2}}$, then we have
$$
\mathbb{E}[M_m] = 2m^2 - 1, \qquad \operatorname{Var}(M_m) = cm^2 ~.
$$
Then by [Chebyshev's inequality](https://en.wikipedia.org/wiki/Chebyshev's_inequality),
$$
\Pr\left[|M_m-\mathbb{E}[M_m]| \geq m^{5/3}\right] \leq \frac{\operatorname{Var}(M_m)}{m^{10/3}}\\
\implies \Pr\left[|M_m-(2m^2-1)| \geq m^{5/3}\right] \leq cm^{-4/3} ~.
$$
The reason why we set $M_m=N_{m^{-2}}$ instead of $M_m=N_{m^{-1}}$ is that now we have
$$
\sum_{m\geq 2}\Pr\left[|M_m-(2m^2-1)| \geq m^{5/3}\right] \leq c\sum_{m\geq 2}m^{-4/3} <\infty ~,
$$
so by the [Borel–Cantelli lemma](https://en.wikipedia.org/wiki/Borel–Cantelli_lemma), with probability $1$, the event $|M_m-(2m^2-1)| \geq m^{5/3}$ can only occur for finitely many values of $m$. Equivalently, for all sufficiently large $m$, 
$$
|M_m-(2m^2-1)| < m^{5/3},\qquad \text{almost surely (a.s.)}
$$
This implies
$$
\lim_{m\to\infty}\frac{M_m}{2m^2} = 1, \qquad\text{a.s.} \tag{1}
$$

$$
\lim_{m\to\infty}\frac{M_{m+1}}{M_m}=1, \qquad\text{a.s.} \tag{2}
$$

#### Convergence of the Empirical Distribution at Stopping Times

With slight abuse of notation, let $N_t(x)$ denote the number of splitting points in $(0,x]$ at $N_t$, for $x\in(0,1)$.

First suppose $0<t<x$. By definition, there is at least one splitting point in $[x-t,x]$. Let $\xi$ be the first (not leftmost) point selected in the process. Since $x-\xi \leq t$, if we delete all points in $(\xi,x]$, the process of generating the remaining points is identically distributed as starting from $[0,x]$ and run the K-model until all pieces have length $\leq t$. Therefore, the number of remaining points is identically distributed as $N_{t/x}$. 

This means, after subtracting a nonnegative amount from $N_t(x)$, the remaining value is identically distributed as $N_{t/x}$. Similarly, when $0<t<1-x$, after subtracting a nonnegative amount from $N_t-N_t(x)$, the remaining value is identically distributed as $N_{t/(1-x)}$. Therefore, there exists copies of $N_{t/x}$ and $N_{t/(1-x)}$ such that
$$
N_{t/x}\leq N_t(x) \leq N_t-N_{t/(1-x)}, \qquad\text{a.s.}
$$
Taking $t=m^{-2}$, we get
$$
N_{m^{-2}/x}\leq M_m(x) \leq M_m-N_{m^{-2}/(1-x)} , \qquad\text{a.s.}
\tag{3}
$$
Similar arguments as the previous section gives
$$
\lim_{m\to\infty}\frac{N_{m^{-2}/x}}{2m^2} = x, \qquad\text{a.s.} \tag{4}
$$

$$
\lim_{m\to\infty}\frac{N_{m^{-2}/(1-x)}}{2m^2} = 1-x, \qquad\text{a.s.} \tag{5}
$$

From (3), taking $m\to\infty$ and plugging in (1)(4)(5), the [squeeze theorem](https://en.wikipedia.org/wiki/Squeeze_theorem) gives
$$
\lim_{m\to\infty}\frac{M_m(x)}{2m^2} = x, \qquad\text{a.s.} \tag{6}
$$
By definition, $M_m(x) = M_m\cdot F_{M_m}(x)$, therefore combining (1)(6) gives
$$
\lim_{m\to\infty}F_{M_m}(x) = x, \qquad\text{a.s.} \tag{7}
$$
This gives pointwise convergence for all stopping times $M_m,m\geq 2$.

#### From Stopping Times to All Times

Finally, for all $M_m\leq n\leq M_{m+1}$, among the $nF_n(x)$ splitting points in $(0,x]$ at time $n$, $M_mF_{M_m}(x)$ of them are from the first $M_m$ steps, and the remaining number of points is between $0$ and $n-M_m$, so
$$
\frac{M_m F_{M_m}(x)}{n} \leq F_n(x) \leq \frac{M_m F_{M_m}(x)}{n} + \frac{n-M_m}{n} ~.
$$
Subtract $x$ from all three expressions and rearrange terms,
$$
\frac{M_m}{n}(F_{M_m}(x)-x) - \frac{n-M_m}{n}(x)\leq F_n(x)-x \leq \frac{M_m}{n}(F_{M_m}(x)-x) + \frac{n-M_m}{n}(1-x) ~,
$$
therefore
$$
\begin{aligned}
|F_n(x)-x| \leq &~ \frac{M_m}{n}|F_{M_m}(x)-x| + \frac{n-M_m}{n}\max\{x,1-x\}\\
\leq &~ |F_{M_m}(x)-x| + 1-\frac{M_m}{M_{m+1}} ~.
\end{aligned}
$$
Taking limit $n\to\infty$ (which also means $m\to\infty$) and applying (2)(7) gives
$$
\lim_{n\to\infty}|F_n(x)-x| = 0, \qquad\text{a.s.} 
$$
Finally, by a standard argument (see, e.g., the proof of the [Glivenko–Cantelli theorem](https://en.wikipedia.org/wiki/Glivenko–Cantelli_theorem)), we can strengthen this pointwise convergence to uniform convergence.

## References

[van Zwet, W. R. (1978). “A Proof of Kakutani's Conjecture on Random Subdivision of Longest Intervals.” *The Annals of Probability*, 6(1), 133–137.](https://www.jstor.org/stable/pdf/2242867.pdf)

## Related Posts

[Shredding Cabbage I: The Uniform Spacing Model](https://relyt871.github.io/2026/07/15/Shredding-cabbage-I.html)

[Shredding Cabbage II: Convergence to Uniformity](https://relyt871.github.io/2026/07/16/Shredding-cabbage-II.html)
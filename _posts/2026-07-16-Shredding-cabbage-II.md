---
layout: post
title: "Shredding Cabbage II: Convergence to Uniformity"
date: 2026-07-16
tags:
 - Probability
---

## Problem Setting

Let's first recall the basic setting of shredding cabbage. Start from an interval $[0,1]$ (the full piece of cabbage), consider two natural models of random shredding:

- **U-model**: sample $n-1$ points independently and uniformly at random from $(0,1)$. These points divide the interval into $n$ pieces.
- **K-model**: repeat the following $n-1$ times to obtain $n$ pieces: pick the longest current piece and split at a uniformly random point within that piece.

In the [previous post](https://relyt871.github.io/2026/07/15/Shredding-cabbage-I.html) in this series, we studied the expected lengths of the pieces in the U-model. In this post, we take a temporary detour and look at a different question:

> (informally) After many random splits, are the **splitting points** themselves **uniformly distributed** in $(0,1)$?

The U-model clearly has uniformly sampled splitting points by definition. 

The K-model is much less obvious: the way the next splitting point is chosen is not completely uniform, and each step highly depends on previous steps. Surprisingly, the final answer is the same: in the K-model, the splitting points also become uniformly distributed in the limit.

#### The Notion of Convergence

In either model, let $P_n$ denote the set of the first $n$ splitting points. Consider the **empirical distribution** with respect to $P_n$. Its [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) (CDF) is defined as
$$
F_n(x)=\frac{1}{n}\left|\{p\in P_n:p\leq x\}\right|,\qquad 0< x<1 ~.
$$
We say that the splitting points converge to the uniform distribution if with probability $1$,
$$
\lim_{n\to\infty}\sup_{0<x<1}|F_n(x)-x|= 0 ~.
$$
That is, the CDF of the empirical distribution [uniformly converges](https://en.wikipedia.org/wiki/Uniform_convergence) to the CDF of  $U(0,1)$ almost surely.

## Proof for the U-Model

In the U-model, the splitting points are drawn independently from the uniform distribution, so it is not surprising that the empirical distribution converges to the uniform distribution. 

This actually follows from a more general result: if $X_1,X_2,\ldots,X_n$ are independently drawn from an arbitrary common distribution with CDF $F$, and the empirical distribution function is defined by $F_n(x) = \frac{1}{n}|\{i: X_i\leq x, i\in[n]\}|$, then as $n\to\infty$, $F_n$ uniformly converges to $F$ almost surely.

This is known as the [Glivenko–Cantelli theorem](https://en.wikipedia.org/wiki/Glivenko–Cantelli_theorem) (a short and clean proof can be found in the linked Wikipedia page) due to [Glivenko (1933)](https://link.springer.com/rwe/10.1007/978-3-662-69359-9_258) and [Cantelli (1933)](https://link.springer.com/rwe/10.1007/978-3-662-69359-9_258), and is sometimes referred to as *the fundamental theorem of statistics*.

## Proof for the K-Model

For the K-model, [Shizuo Kakutani](https://en.wikipedia.org/wiki/Shizuo_Kakutani) conjectured that the resulting splitting points are still uniformly distributed. This was later proved by [van Zwet (1978)](https://www.jstor.org/stable/pdf/2242867.pdf). Interested readers are referred to the end of the paper for the history of the conjecture and other concurrent proofs. Next I present the proof of van Zwet, with certain expansions on non-trivial details.

#### Overview of the Proof: A New Stopping Time

The key idea of the proof is to introduce a [stopping time](https://en.wikipedia.org/wiki/Stopping_time) that has a simpler characterization than the original stochastic process.

For $t\in(0,1)$, let $N_t$ be the first time when all pieces have length at most $t$. For $t\geq 1$, define $N_t=0$ for completeness. Intuitively, this definition kind of "softens" the original rule of always splitting the largest remaining piece: 

- every piece with length larger than $t$ will need to be further split into smaller pieces before $N_t$, and if there are multiple such pieces, the order in which they are split does not really matter; 
- every piece with length already smaller than $t$ will not be split again until $N_t$.

Another important property of the stopping time is that it has **self-similarity**. If a piece has length $x$, then the future operations inside that piece, after scaling by a factor of $1/x$, follow the same rule as the original process on $[0,1]$. Thus the number of splits before all internal pieces have length at most $t$ is given by $N_{t/x}$.

This allows us to characterize $N_t$ in a recursive fashion: conditioned on the first splitting point being at $x\in(0,1)$, the process can be viewed as a recursion on the two pieces of length $x$ and $1-x$, so $N_t$ is identically distributed as $1 + N_{t/x} + N_{t/(1-x)}$. With this we are able to characterize the **expectation and variance** of $N_t$. 

#### Boundedness of the Stopping Time

##### Warm-Up: $1/2\leq t<1$

For $1/2\leq t<1$, the stopping time has a particularly simple structure: starting from the whole piece $[0,1]$, after each step, there can be at most one remaining piece with length larger than $t$.

Let $U_1,U_2,\ldots$ be i.i.d. variables drawn from $U(0,1)$ such that at step $i$, the largest piece is split into two pieces with lengths proportional to $U_i$ and $1-U_i$. For $t\geq 1/2$, before reaching the stopping time $N_t$, in each step the largest piece shrinks to a $\max\{U_i,1-U_i\}$-fraction of its original length. Therefore, for each positive integer $k$, we have
$$
\Pr[N_t>k] = \Pr\left[\prod_{i=1}^k \max\{U_i,1-U_i\} > t\right] \leq \frac{\mathbb{E}\left[\prod_{i=1}^k \max\{U_i,1-U_i\}\right]}{t} ~,
$$
which follows from the Markov inequality. The $U_i$s are independent, and for each $i$ we have $\mathbb{E}[\max\{U_i,1-U_i\}]=3/4$, therefore
$$
\Pr[N_t>k] \leq (3/4)^k t^{-1} ~.
$$
This means $N_t$ has exponentially decaying tails, so all its moments are finite: 
$$
\mathbb{E}[N_t^m] < \infty, \qquad \text{for all }m\geq 0 ~.
\tag{1}
$$
As $t\to 1^-$, intuitively after the first split both pieces have length at most $t$ almost surely, so
$$
\lim_{t\to 1^-}\mathbb{E}[N_t] = 1 ~. 
\tag{2}
$$
The formal proof is omitted.

##### Extending to $0<t<1/2$

For $s,t\in(0,1)$, we obtain an upper bound of $N_{st}$ using $N_s$ and $N_t$.

Consider starting from the $(N_t+1)$-th step. At that point, all $N_t+1$ pieces have length at most $t$. Then each piece needs to be further subdivided until its internal pieces all have length at most $st$. The operations within different pieces are independent of each other, and their relative order does not matter.

For each piece of length $t'\in(0,t]$, after scaling its length by a factor of $\frac{1}{t'}$, its internal operations have the same structure as starting from the full piece $[0,1]$ and stopping when all pieces have length at most $\frac{st}{t'} \geq s$, so its stopping time is stochastically smaller than $N_s$.

Summing up all $N_t+1$ pieces, we conclude that $N_{st}$ is stochastically smaller than the sum of $N_t+1$ copies of $N_s$. 

Fix any constant $0<t_0<1/2$,  any real number $t\in[t_0,1)$ can be represented as $t=t_1\cdot (1/2)^r$ for some $1/2\leq t_1<1$ and nonnegative integer $r=O(\log(1/t_0))$. Therefore, starting from (1) with $t=t_1$ and repeatedly applying the above argument, we can eventually show that
$$
\sup_{t_0\leq t<1}\mathbb{E}[N_t^m] < \infty, \qquad \text{for all }m\geq 0 ~.
\tag{3}
$$

#### The Expectation and Variance of $N_t$

Let $\mu(t) = \mathbb{E}[N_t]$. By definition we have $\mu(t)=0$ for $t\geq 1$, so we focus on $0<t<1$.

As we have argued above, conditioned on the first splitting point $X_1=x$, $N_t$ is identically distributed as $1+N_{t/x}+N_{t/(1-x)}$, therefore
$$
\mathbb{E}[N_t\mid X_1=x] = 1 + \mu\left(\frac{t}{x}\right)+\mu\left(\frac{t}{1-x}\right)
$$
Integrating over $x\in(0,1)$, 
$$
\begin{aligned}
\mu(t) = &~ \int_0^1 \left\{1 + \mu\left(\frac{t}{x}\right)+\mu\left(\frac{t}{1-x}\right)\right\}dx\\
= &~ 1 + 2\int_0^1 \mu\left(\frac{t}{x}\right)dx \qquad \text{(use the symmetry between $\mu\left(\frac{t}{x}\right)$ and $\mu\left(\frac{t}{1-x}\right)$)}\\
= &~ 1 + 2\int_{\color{red}{t}}^1 \mu\left(\frac{t}{x}\right)dx \qquad \text{(when $x<t$, $t/x>1\implies \mu(t/x)=0$)}\\
= &~ 1 + 2t\int_{t}^1 \frac{\mu(y)}{y^2}dy \qquad \text{(change the variable to $y=\frac{t}{x}$)}
\end{aligned}
$$
Rewrite as
$$
\frac{\mu(t)-1}{t} = 2\int_{t}^1 \frac{\mu(y)}{y^2}dy ~,
$$
recall that by (3), for every fixed $t>0$, $\sup_{y\geq t}\mu(y)$ is finite, so we can differentiate on both sides and obtain a differential equation:
$$
\frac{\mu'(t)}{t}-\frac{\mu(t)-1}{t^2} = -\frac{2\mu(t)}{t^2} ~,\\
\text{rearranging} \implies \frac{\mu'(t)}{\mu(t)+1} = -\frac{1}{t} ~.
$$
Integrating on both sides,
$$
\log(\mu(t)+1) = -\log t + C \implies \mu(t) = \frac{C'}{t}-1 ~.
$$
Finally, using the boundary condition given by (2): $\lim_{t\to 1^-}\mathbb{E}[N_t] = 1$, we get $C'=2$, so
$$
\mu(t) = \frac{2}{t}-1, \qquad \text{for all }0<t<1 ~.
$$
**Remark**: this itself is a meaningful problem: suppose my recipe requires that cabbages are shredded into small pieces of size at most $t$, then using the K-model, I need to shred it $\frac{2}{t}-1$ times in expectation. Interestingly, if we define $N_t$ similarly for the U-model, then $\mu(t)$ no longer has such a simple and exact representation; asymptotically it is in the order of $\frac{1}{t}\log\frac{1}{t}$, see e.g., [Holst (1980)](https://www.jstor.org/stable/pdf/3212956.pdf).

Let $v(t)$ denote the variance of $N_t$. It can be computed using a similar strategy as $\mu(t)$, and the details are omitted here. The final result is: let $c=\frac{1}{2}v(\frac{1}{2})$, which is a small constant, then
$$
v(t)=\frac{c}{t}, \qquad \text{for }0<t<\frac{1}{2} ~.
$$

#### The Remaining Part

Phew! We have already done quite a lot in this post, and en route solved the exact expectation of the stopping time in the K-model. Let's take a break, and leave the remainder of the proof to the next post, where we will use the expectation and variance of the stopping time to obtain the final convergence.

## References

- [Cantelli, F. P. (1933). “Sulla determinazione empirica delle leggi di probabilità.” *Giornale dell'Istituto Italiano degli Attuari*, 4, 421–424.](https://link.springer.com/rwe/10.1007/978-3-662-69359-9_258)
- [Glivenko, V. (1933). “Sulla determinazione empirica delle leggi di probabilità.” *Giornale dell'Istituto Italiano degli Attuari*, 4, 92–99.](https://link.springer.com/rwe/10.1007/978-3-662-69359-9_258)
- [van Zwet, W. R. (1978). “A Proof of Kakutani's Conjecture on Random Subdivision of Longest Intervals.” *The Annals of Probability*, 6(1), 133–137.](https://www.jstor.org/stable/pdf/2242867.pdf)
- [Holst, L. (1980). “On the Lengths of the Pieces of a Stick Broken at Random.” *Journal of Applied Probability*, 17(3), 623–634.](https://www.jstor.org/stable/pdf/3212956.pdf)

## Related Posts

[Shredding Cabbage I: The Uniform Spacing Model](https://relyt871.github.io/2026/07/15/Shredding-cabbage-I.html)

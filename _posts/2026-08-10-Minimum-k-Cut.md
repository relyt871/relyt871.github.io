---
layout: post
title: "Minimum $k$-Cut: Random Contraction Beyond Global Min-Cut"
date: 2026-08-10
tags:
 - Graphs
 - Algorithms
---

[Minimum cut](https://en.wikipedia.org/wiki/Minimum_cut) is one of the fundamental problems in graph algorithms. Given an undirected graph, the goal is to remove a set of edges with minimum cardinality (or minimum total weight, if the graph is weighted), so that the remaining graph becomes disconnected. 

We have two closely related versions of the problem:

- global min-cut: simply need to remove some edges so that the remaining graph has (at least) two connected components.
- $s$-$t$ min-cut: two vertices $s,t$ are given as input, then $s$ and $t$ must belong to different components in the remaining graph.

Both problems can be solved in polynomial time. The $s$-$t$ min-cut problem can be solved by computing a maximum flow (due to the [Max-flow min-cut theorem](https://en.wikipedia.org/wiki/Max-flow_min-cut_theorem)). Global min-cut can be solved by enumerating all pairs of $(s,t)$ and computing the $s$-$t$ min-cut, and one of them must be a global min-cut; there also exist many better algorithms that avoid enumerating all $s$ and $t$.

## Minimum $k$-Cut, and Why It Is Intriguing

It is natural to generalize min-cut: remove edges to partition the graph into multiple connected components.

- **global minimum $k$-cut**: remove a minimum-weight set of edges so that the remaining graph has (at least) $k$ connected components. 
- **$k$-terminal cut**: given $k$ terminals $t_1,\ldots,t_k$, the goal is to remove a minimum-weight set of edges so that no two terminals belong to the same connected component.

Global min-cut and $s$-$t$ min-cut correspond to $k=2$. 

Intriguingly, for $k\geq 3$, the computational complexity of the two problems diverge:

- global minimum $k$-cut can be computed in $n^{O(k)}$ time, which means polynomial time for any constant $k$.
- for all $k\geq 3$, $k$-terminal cut is NP-hard.

#### Milestone results

The following table lists a selection of milestone results for the global minimum $k$-cut problem. It does not exhaustively enumerate all results in the literature; in particular, better algorithms for simple unweighted graphs are omitted.

|              Runtime               | Det/Rand |                  Reference link                  |
| :--------------------------------: | :--------: | :----------: |
|          $O(n^{O(k^2)})$           |    D     |   [GH94](https://doi.org/10.1287/moor.19.1.24)   |
|      $O(n^{2(k-1)}\log^2 n)$       |    R     |  [KS96](https://doi.org/10.1145/234533.234534)   |
|     $\widetilde{O}(mn^{2k-2})$     |    D     | [Tho08](https://doi.org/10.1145/1374376.1374402) |
| $O(k^{O(k)}n^{(2\omega/3+o(1))k})$ |    D     | [GLL18](https://doi.org/10.1109/FOCS.2018.00020) |
|       $n^k(\log n)^{O(k^2)}$       |    R     |    [GHLL22](https://doi.org/10.1145/3478018)     |

In this post, we focus on the famous Random (Recursive) Contraction algorithm in [KS96](https://doi.org/10.1145/234533.234534). The version for min-cut ($k=2$) is widely taught in almost every course about randomized algorithms. We first briefly recap the $k=2$ version, then present how it is naturally extended to larger $k$.

## The Random (Recursive) Contraction Algorithm for Min-Cut

#### The Random Contraction Algorithm

Let us first recall the algorithm for $k=2$. For convenience, we describe the algorithm for unweighted multi-graphs. 

The core operation of the algorithm is **contraction**: for graph $G$ and an edge $(u,v)$, let $G/(u,v)$ denote the graph obtained by contracting $(u,v)$:

- merge $u$ and $v$ into a single "metavertex" $w$;
- for all edges $(u,v')$ in $G$ with $v'\neq v$, replace it by an edge $(w,v')$;
- for all edges $(u',v)$ in $G$ with $u'\neq u$, replace it by an edge $(u',w)$;
- for all edges $(u,v)$ in $G$, simply remove them.

The **Random Contraction algorithm**: 

- Starting from the input graph $G$, repeatedly choose an edge from the remaining graph uniformly at random, and contract it. 
- Terminate when only two metavertices remain.

Suppose the set of vertices $S$ are contracted into one metavertex, and the remaining set of vertices $T$ are contracted into the other metavertex, then $(S,T)$ defines a cut in $G$: all edges $\{(u,v): u\in S,v\in T\}$ belong to the cut.

#### Analysis

After each contraction, the number of vertices decreases by one, so there are exactly $n-2$ contractions. For any cut represented by $(S,T)$, if it were to become the output of the algorithm, then every contraction must not contract an edge between $S$ and $T$. 

The intuition behind the analysis is that in any graph, a minimum cut only contains a very small fraction of edges of the whole graph. Then since in each step we contract a uniformly random edge, an edge from a specific minimum cut is contracted with a very small probability.

**Theorem.** A particular minimum cut is returned by the algorithm with probability at least $\frac{2}{n(n-1)} = \Omega(n^{-2})$.

> **Proof.**  Fix an arbitrary minimum cut $C$ that contains $c$ edges. Suppose at some point the contracted graph $G'$ has $r$ remaining vertices, and no edge in $C$ has been contracted so far. Every cut in $G'$ corresponds to a cut in the original graph, so the minimum cut value of $G'$ is still $c$. 
>
> This means every vertex in $G'$ has degree at least $c$ (otherwise the minimum cut will have value $<c$) and thus $G'$ has at least $rc/2$ edges. Therefore, the next step does not contract an edge in $C$ with probability at least
> $$
> 1-\frac{c}{rc/2}=1-\frac{2}{r} ~.
> $$
>
> So the probability that no edge in $C$ is contracted is at least
>
> $$
> \prod_{r=3}^{n}\left(1-\frac{2}{r}\right) = \frac{n-2}{n}\cdot \frac{n-3}{n-1}\cdots \frac{2}{4}\cdot \frac{1}{3} = \frac{2}{n(n-1)} ~.
> $$
>
> $\square$

The algorithm takes $O(n^2)$ time (implementation details are omitted) and returns a minimum cut with probability $\Omega(n^{-2})$. Repeating it $O(n^2\log n)$ times ensures that with high probability the smallest cut over all outputs is the minimum cut. This gives a runtime of $\tilde O(n^4)$.

For weighted graph with arbitrary positive edge weights, we can adapt the algorithm so that in each step, the contracted edge is chosen with probability proportional to the edge weights. A similar analysis gives the same runtime and correctness guarantee.

#### Speed up: Recursive Contraction

To speed up the random contraction algorithm, we notice that at the beginning, the probability of not contracting an edge in a minimum cut is very close to $1$. Indeed, after contracting the graph until it has $n/\sqrt 2+1$ remaining vertices, the probability of not contracting any edge in a minimum cut is roughly $1/2$. If this happens, the resulting graph $G'$ can be viewed as a partial progress. 

If the subsequent contractions fail and we restart the random contraction from scratch, this partial progress is lost. To make better use of the partial progress, we can apply two independent copies of the random contraction algorithm on $G'$.

A recursive application of this idea gives the following algorithm: 

> **Recursive-Contraction**($G, n$):  ($n$ is the number of vertices in $G$)
>
> - if $n\leq 6$, compute the minimum cut of $G$ by brute force and return.
> - otherwise, independently run the following process twice, and return the smaller cut returned by the two independent runs.
>   - starting from $G$, run $n-\lceil n/\sqrt 2+1\rceil$ steps of random contraction to obtain $G'$.
>   - call Recursive-Contraction($G', \lceil n/\sqrt 2+1\rceil $)

The running time satisfies the following recurrence

$$
T(n)=2\left(n^2+T\left(\left\lceil\frac{n}{\sqrt{2}}+1\right\rceil\right)\right) ~,
$$

which solves to $T(n)=O(n^2\log n)$.

A single recursive call of Recursive-Contraction($G,n$) finds a particular minimum cut with probability $\Omega(1/\log n)$. At a high level, this is because at each recursive level we have two chances instead of one. The recursion has depth roughly $2\log n$ and essentially simulates $\Theta(n^2)$ runs of the Random Contraction algorithm in one run. Although the simulated runs have shared randomness at the beginning, the success probability at those initial stages is relatively high.

Repeating the recursive algorithm $O(\log^2 n)$ times is enough to find a minimum cut with high probability, thus the final runtime is $O(n^2\log^3 n)$.

## Extension from $2$-Cut to $k$-Cut

Now let us move to the global minimum $k$-cut problem. The Random Contraction algorithm can be extended directly: terminate when $k$ metavertices (instead of $2$ remain). We also have the analogous statement that for any $k$-cut, it becomes the output if and only if the algorithm does not contract any edge in the $k$-cut.

It remains to generalize the analysis. The key is to again argue that a minimum $k$-cut only contains a small fraction of edges. For $k=2$, we have essentially shown that, in a graph with $n$ vertices and $m$ edges, the minimum cut contains at most $\frac{2m}{n}$ edges. The following lemma generalizes this argument to $k\geq 3$.

**Lemma.** In a graph with $n$ vertices and $m$ edges, the number of edges in a minimum $k$-cut is at most
$$
\left[1-\left(1-\frac{k-1}{n}\right)\left(1-\frac{k-1}{n-1}\right)\right]m ~.
$$

Note that when $k=2$ this exactly gives $\frac{2m}{n}$.

> **Proof.**  We use the probabilistic method. 
>
> We construct the following randomized process to generate a $k$-cut: choose $k-1$ vertices uniformly at random, and output the $k$-cut defined by the following $k$ parts:
>
> - each of the chosen $k-1$ vertices form a singleton part
> - all remaining $n-k+1$ vertices form the $k$-th part.
>
> An edge belongs to such a $k$-cut if at least one of its endpoints belongs to the $k-1$ chosen vertices. This happens with probability 
> $$
> 1-\left(1-\frac{k-1}{n}\right)\left(1-\frac{k-1}{n-1}\right) ~.
> $$
> Therefore, by linearity of expectation, the expected size of the $k$-cut generated in this way is
> $$
> \left[1-\left(1-\frac{k-1}{n}\right)\left(1-\frac{k-1}{n-1}\right)\right]m ~.
> $$
> The size of the minimum cut cannot exceed this value.
>
> $\square$

Therefore, for any minimum $k$-cut, the probability that no edge in the $k$-cut is contracted after $n-k$ contractions is at least

$$
\begin{aligned}
&~ \prod_{r=k+1}^n \left(1-\frac{k-1}{r}\right)\left(1-\frac{k-1}{r-1}\right)\\
= &~ \prod_{r=k+1}^n \frac{r-k+1}{r} \prod_{r=k+1}^n \frac{r-k}{r-1} \\
= &~ \frac{k}{\binom{n}{k-1}\cdot \binom{n-1}{k-1}} = \Omega(n^{-2(k-1)}) ~.
\end{aligned}
$$

So the minimum $k$-cut can be found with high probability if we repeat the Random Contraction algorithm $n^{2(k-1)}\log n$ times. The runtime is $\tilde O(n^{2k})$. Applying a similar recursive contraction trick improves the runtime to $\tilde O(n^{2(k-1)})$.

## References

- [GH94] [Goldschmidt, O., and Hochbaum, D. S. (1994). *A Polynomial Algorithm for the $k$-cut Problem for Fixed $k$*.](https://doi.org/10.1287/moor.19.1.24)
- [KS96] [Karger, D. R., and Stein, C. (1996). *A New Approach to the Minimum Cut Problem*.](https://doi.org/10.1145/234533.234534)
- [Tho08] [Thorup, M. (2008). *Minimum $k$-Way Cuts via Deterministic Greedy Tree Packing*.](https://doi.org/10.1145/1374376.1374402)
- [GLL18] [Gupta, A., Lee, E., and Li, J. (2018). *Faster Exact and Approximate Algorithms for $k$-Cut*.](https://doi.org/10.1109/FOCS.2018.00020)
- [GHLL22] [Gupta, A., Harris, D. G., Lee, E., and Li, J. (2022). *Optimal Bounds for the $k$-Cut Problem*.](https://doi.org/10.1145/3478018)

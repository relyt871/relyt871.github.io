---
layout: post
title: "Geography Games on Undirected Graphs"
date: 2026-07-11
tags: 
 - Graphs
 - Games
---

## The Problem and Its History

#### Problem Setting

I came up with this problem when I was serving as a problem setter for an ICPC contest three years ago.

> Consider the following two-player game on an undirected graph. A token is initially placed at a vertex. Then the two players take turns moving the token along an incident edge. After a player moves the token along an edge, the edge is **permanently** deleted. The player who has no legal move (ends up at an isolated vertex) loses.
>
> We are interested in determining the winner using a polynomial-time algorithm, assuming both players play optimally.

At that time I was unable to solve the problem. Recently I picked it up again and found that it has been well-studied in the algorithmic combinatorial game theory literature.

The game is called "geography", and has four variants, depending on whether the graph is directed or undirected, and what is deleted during the game: 

- In **Vertex Geography**, after the token moves away from vertex $u$, $u$ and its incident edges are permanently deleted. Equivalently, every vertex can be visited at most once.
- In **Edge Geography**, which is the one I came up with, after the token moves from $u$ to $v$, the edge $(u,v)$ is deleted; a vertex may be visited more than once.

Formally, given a graph $G$ and initial token position $s$, we say that $(G,s)$ is in **N-position** if the Next (i.e., the first) player wins. Otherwise it is in **P-position** (the Previous, or second player wins).

#### An Overview of Results

A  [seminal work](https://doi.org/10.1016/0022-0000(78)90045-4) of Thomas Jerome Schaefer showed that the two directed versions are PSPACE-complete, even on bipartite graphs. This is strong evidence that there is no efficient polynomial-time algorithm. In particular, a polynomial-time algorithm for them would imply polynomial-time algorithms for all NP-complete problems.

In this blog post, I would like to share the results from paper [*Undirected Edge Geography*](https://doi.org/10.1016/0304-3975(93)90026-P), which studies the complexity of the two undirected variants. 

- Undirected Vertex Geography can be solved in polynomial time on general graphs.
- Undirected Edge Geography is PSPACE-complete on general graphs, which can be proved via a reduction from the directed version. (omitted in this blog post)
- Surprisingly, Undirected Edge Geography can be solved in polynomial time on bipartite graphs.

## Undirected Vertex Geography

In Undirected Vertex Geography, the winning player depends on [maximum matchings](https://en.wikipedia.org/wiki/Matching_(graph_theory)) of $G$. We say that a matching $M$ **saturates** a vertex if the vertex is matched in $M$. For a vertex $v$ that is saturated by $M$, let $M(v)$ denote the vertex matched with $v$.

**Theorem.** $(G,s)$ is in N-position if and only if every maximum matching of $G$ saturates $s$.

> **Proof.** First, suppose that there is a maximum matching $M$ that does not cover $s$. The winning strategy for the second player is: if the token is at $v$, then move to $M(v)$.
>
> We show that this strategy is always feasible: suppose at some point the first player moves to a vertex $v^*$ that is not saturated by $M$, then the sequence of moves so far forms a path from $s$ to $v^*$: 
> $$
> s - v_1 - M(v_1) - v_2 - M(v_2) - \cdots - v_k - M(v_k) - v^*
> $$
> where each $(v_i,M(v_i))$ is matched in $M$. However, such a path is an augmenting path wrt. $M$ and yields a matching larger than $M$: replace the $(v_i,M(v_i))$s with $(s,v_1), (M(v_1),v_2),\ldots,(M(v_{k-1}),v_k), (M(v_k),v^*)$. This contradicts the assumption that $M$ is a maximum matching.
>
> Second, suppose every maximum matching saturates $s$. Fix such a matching $M$, the winning strategy for the first player is, again: if the token is at $v$, then move to $M(v)$.
>
> We show that this strategy is always feasible: suppose at some point the second player moves to a vertex $v^*$ that is not saturated by $M$, then there exists a path from $s$ to $v^*$:
> $$
> s-M(s) - v_1 - M(v_1) - \cdots - v_k - M(v_k) - v^*
> $$
> This is an alternating path wrt. $M$ and implies a matching as large as $M$ that does not saturate $s$, which contradicts the assumption that every maximum matching saturates $s$.
>
> $\square$

This immediately gives a polynomial-time algorithm. Compute the maximum matching size of $G$ and $G-s$, if they are equal, then not all maximum matching of $G$ saturates $s$, and $(G,s)$ is in P-position; otherwise $(G,s)$ is in N-position.

## Undirected Edge Geography on Bipartite Graphs

Now let's return to the Edge version, which is PSPACE-complete on general graphs, and I will present an algorithm for bipartite graphs.

#### Matrix Representation

The algorithm and its proof are based on a matrix representation of the graph.

Suppose the left and right parts of the graph $G$ are 
$$
L=\{1,2,\ldots,m\}, \qquad R=\{m+1,m+2,\ldots,m+n\}
$$
and wlog. suppose $s=1\in L$. That is, the first player moves the token from left to right, and the second player moves the token from right to left.

Let $A$ be the $m\times n$ adjacency matrix, where $A_{i,j}=1$ if and only if $(i,m+j)$ is an edge in $G$. We regard all entries and all matrix operations as **taking place over $\mathbb{F}_2$**, that is, $0+0=1+1=0$ and $0+1=1+0=1$.

**Theorem.** $(G,s)$ is in N-position if and only if the first row is linearly independent of the remaining rows.

Given such a characterization, we can determine the winner and also compute the winning moves using [Gaussian elimination](https://en.wikipedia.org/wiki/Gaussian_elimination).

#### The P-Positions

Let $r_i$ denote the $i$-th row of the matrix. If $r_1$ is **not** linearly independent of the remaining rows, then there exists a subset $S\subseteq L$ such that $1\in S$ and
$$
\sum_{i\in S}r_i = 0 ~.
$$
This means, for each column, the number of $1$s in the rows corresponding to $S$ is even. Mapping this back to the graph language, it means for each vertex $u\in R$, the number of neighbors in $S$ is even.

In this case, the winning strategy of the second player is: every time the first player moves from a vertex $v\in S$ to vertex $u\in R$, the second player should move from $u$ to another vertex $v'\in S$.

- This strategy is always feasible for the second player: for every vertex $u\in R$, the number of neighbors in $S$ is even, and every time the token is moved from $S$ to $u$ then back to $S$, the number of neighbors in $S$ decreases by $2$. Thus, whenever the second player moves, there is always at least one neighbor in $S$.
- The second player never moves to a vertex in $L\setminus S$, which essentially ensures that the game is restricted to the subgraph induced by $S\cup R$. Since for each vertex $u\in R$, the number of neighbors in $S$ is even, the number of edges in this subgraph is even. Therefore, either all edges in the subgraph are deleted, then the first player cannot move any more and loses, or the first player loses before that.

#### The N-Positions

Now suppose $r_1$ is linearly independent of the remaining rows. We show that the first player can always make one move to a vertex $m+k \in R$ that leaves the second player in a P-position, which means the first player wins.

Let $c_j$ denote the $j$-th column of $A$, then the above condition can be characterized as follows: after setting $A_{1,k}$ to $0$, $c_k$ is linearly dependent on the remaining columns.

Let $e_1 = (1,\underbrace{0,\ldots,0}_{m-1})^\top$, we append $e_1$ as a new column to $A$ and obtain matrix $A^*$.

Since $r_1$ is already linearly independent of the remaining rows, $A^*$ has the same row-rank as $A$. Since the row-rank and column-rank of a matrix are equal, $A^*$ also has the same column rank as $A$. This implies $e_1$ is linearly dependent on the columns in $A$. That is, there exists $T\subseteq[n]$ such that $e_1 = \sum_{j\in T}c_j$. 

Now choose an arbitrary $k\in T$ such that $A_{1,k}=1$. Such a $k$ must exist because the first entry of $e_1$ is $1$. Then we have
$$
c_k+e_1 = \sum_{j\in T\setminus \{k\}} c_j ~.
$$
The left hand side is exactly $c_k$ with $A_{1,k}$ switched to $0$, and the equality shows that it is indeed linearly dependent on the remaining columns.

#### Reflection

The most clever step of the proof is to augment $A$ with $e_1$, then apply the equivalence of row-rank and column-rank. This tool from matrix theory is a huge simplification: I tried to obtain a self-contained proof without using the matrix representation, but was unable to obtain a shorter and more elegant proof than the original proof in the paper.

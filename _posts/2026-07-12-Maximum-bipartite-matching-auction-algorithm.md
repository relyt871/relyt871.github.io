---
layout: post
title: "Maximum Bipartite Matching via An Auction Algorithm"
date: 2026-07-12
tags:
 - Graphs
 - Algorithms
 - Economics
---

In the Maximum Bipartite Matching (MBM), given a bipartite graph with $n$ vertices and $m$ edges, the goal is to find a matching of maximum cardinality. For convenience, we assume $n=O(m)$ and there are no isolated vertices.

MBM can be solved in $O(n^3)$ time using the [Hungarian algorithm](https://en.wikipedia.org/wiki/Hungarian_algorithm) or the classical $O(m\sqrt n)$ algorithm of [Hopcroft and Karp (1973)](https://doi.org/10.1137/0202019). These are the two most commonly taught algorithms in undergraduate or graduate algorithms courses.

It turns out that there is **another** way to reach the runtime of $O(m\sqrt n)$ via an auction algorithm. 

> We can interpret one side of the graph as unit-demand bidders, the other side as items, and the edges indicate whether a bidder prefers an item. A bidder is satisfied if they receive a preferred item. Then MBM corresponds to maximizing economic efficiency, i.e., the number of satisfied bidders.

From this interpretation, one can imagine an auction that gradually increases the prices for the items and lets the bidders repeatedly compete for their cheapest available items. Interestingly, an approximately maximum matching can quickly arise through the auction process.

This viewpoint has a long history. Auction algorithms for assignment problems date back to the work of [Bertsekas (1981)](https://doi.org/10.1007/BF01584237) and [Demange, Gale, and Sotomayor (1986)](https://doi.org/10.1086/261411). This blog post follows the proof of [Nisan (2019)](https://arxiv.org/abs/1906.04213).

## The Ascending-Price Auction

#### The Auction

Fix a parameter $\epsilon>0$ such that $1/\epsilon$ is a positive integer. We will later choose $\epsilon \approx 1/\sqrt n$.

The auction proceeds as follows:

- Initially no item is allocated, and each item $u$ has price $p_u=0$.

- Repeat until every bidder either gets an item or leaves the auction:

  1. pick an arbitrary bidder $v$ who is not allocated an item and has not left the auction yet.

  2. among the preferred items of $v$, choose the item $u$ with the **minimum** price (break ties arbitrarily).

  3. if $p_u=1$, then $v$ **leaves** the auction permanently.

  4. if $p_u<1$, suppose $u$ is currently allocated to bidder $v'$ (if any), then

     (1) take $u$ back from $v'$ (so $v'$ now becomes not allocated).

     (2) allocate $u$ to $v$, and increase $p_u$ by $\epsilon$.

#### Some Intuitions

- During the auction, an item is (temporarily) allocated to the bidder who submits the highest bid for that item, and the price is equal to that bid.
- Suppose each bidder has value $1$ towards each preferred item, then when a bidder is not allocated and finds a preferred item with price less than $1$, they are incentivized to bid a slightly higher value and get that item.
- Step 4 can be viewed as bidder $v$ submitting a new bid of value $p_u+\epsilon$ and winning item $u$ from its original owner.
- In Step 3, if $p_u=1$, then all preferred items of $v$ have price $1$. This means bidder $v$ cannot hope to win a preferred item unless they submit a bid larger than $1$, which gives negative utility. Therefore $v$ leaves the auction.
- Every successful bid (Step 4) raises the price of one item by $\epsilon$, and the price of each item can be increased at most $1/\epsilon$ times before reaching $1$. 

#### Analysis

We can show that when the auction terminates, the allocation gives an $(1-\epsilon)$-approximate maximum matching. We can prove this from a purely **economic perspective**, **without** using any augmenting-path-based argument.

Let $M$ denote the matching induced by the final allocation. When the auction terminates, we have the following two properties:

- (1) If a bidder $v$ is **unmatched**, then every preferred item has price $1$.

  > This follows from Step 3.

- (2) If a bidder $v$ is **matched** to an item $u$, then every preferred item $w$ satisfies $p_w\geq p_u-\epsilon$. 

  > Consider the last round where $u$ is allocated to $v$. Step 2 guarantees that $p_u\leq p_w$, so $p_w\geq p_u-\epsilon$ after Step 4 is executed. Afterwards, $p_w$ can only increase, while $u$ remains allocated to $v$ and $p_u$ no longer increases.

For any matching $N$, define the utility of a bidder $v$ by

$$
\operatorname{util}(v,N)=\begin{cases}1-p_u, & \text{if $v$ is matched to $u$ in $N$} ~,\\0, & \text{if }v\text{ is unmatched in }N ~.\end{cases}
$$

Fix an arbitrary **maximum** matching $M^*$, 

- if $v$ is unmatched in $M^*$, then
  $$
  \operatorname{util}(v,M^*) = 0 \leq \operatorname{util}(v,M) ~.
  $$

- if $v$ is unmatched in $M$, then by Property (1), 
  $$
  \operatorname{util}(v,M^*) = 0 =  \operatorname{util}(v,M) ~.
  $$

- if $v$ is matched to $u$ in $M$, and is matched to $w$ in $M^*$, then by Property (2), 
  $$
  \operatorname{util}(v,M^*) = \max\{0, 1-p_w\} \leq 1-p_u+\epsilon = \operatorname{util}(v,M)+\epsilon ~.
  $$

Therefore, summing over all bidders, 
$$
\sum_{v}\operatorname{util}(v,M^*)\leq \sum_{v}\operatorname{util}(v,M)+\varepsilon|M^*| ~.
\tag{1}
$$

Let $P=\sum_{u}p_u$ be the sum of all item prices. **Every** item with positive price is matched in $M$: an item's price becomes positive only when the item is allocated for the first time, and whenever another bidder takes it, the item remains allocated. Consequently,
$$
\sum_{v}\operatorname{util}(v,M) = \sum_{(v,u)\in M}(1-p_u) = |M|-\sum_{u}p_u = |M|-P ~.
\tag{2}
$$

For $M^*$, items with positive prices are not necessarily all matched, so

$$
\sum_{v}\operatorname{util}(v,M^*)=|M^*|-\sum_{u\text{ matched in }M^*}p_u \geq |M^*|-P ~.
\tag{3}
$$

Combining (1)(2)(3) gives

$$
|M^*|-P \leq |M|-P+\varepsilon|M^*| \implies (1-\epsilon)|M^*|\leq |M| ~.
$$

## Implementation of the Auction-Based Algorithm

Now we discuss how to efficiently implement an algorithm for MBM based on the auction.

#### Brute-Force Implementation of the Auction

Recall that the price of each item increases by $\epsilon$ every time its ownership changes, which can happen at most $1/\epsilon$ times. In each round, either the ownership of an item changes, or a bidder leaves the auction permanently. Therefore, there can be at most $O(n/\epsilon)$ rounds.

In each round, we need to

- pick a bidder $v$ who is not allocated and has not left yet. We can maintain a queue of such bidders, so this takes $O(1)$ time.
- choose the preferred item $u$ with minimum price. We can simply iterate over $v$'s preferred items, which takes $O(n)$ time.
- the remaining operations take $O(1)$ time.

Therefore, the total runtime is $O(n/\epsilon)\cdot O(n) = O(n^2/\epsilon)$.

#### Faster Implementation

On sparse graphs (where $m=o(n^2)$), we can improve the runtime to $O(m/\epsilon)$: 

- for each bidder, maintain $1+1/\epsilon$ buckets using doubly linked lists that store the preferred items with prices equal to $0,\epsilon, 2\epsilon,\ldots,1$, and maintain a pointer to the lowest-price non-empty bucket. Then finding the preferred item with minimum price takes $O(1)$ time.
- for each item, every time its price changes, we need to update the buckets for all bidders that prefer the item. Since we use doubly linked lists, this takes $O(1)$ time for each bidder. Each item changes its price at most $1/\epsilon$ times, so all updates take $O(m/\epsilon)$ time in total. 
- The pointer for each bidder moves monotonically at most $O(1/\epsilon)$ times, so $O(n/\epsilon)$ time for maintaining all pointers.

#### From Approximate to Exact Maximum Matching

The auction gives an $(1-\epsilon)$-approximate maximum matching. We then repeatedly run DFS or BFS to find augmenting paths and augment the matching. 

Since we start from an $(1-\epsilon)$-approximate matching, there are at most $O(n\epsilon)$ augmenting paths left, and each takes $O(m)$ time to find and augment. Thus the runtime of this last step is $O(mn\epsilon)$.

Therefore, the total runtime is
$$
O(m/\epsilon) + O(mn\epsilon) ~.
$$
Taking $\epsilon=\Theta(1/\sqrt n)$ gives runtime $O(m\sqrt n)$.

#### Code

The following is a C++ implementation of the algorithm, where the first part uses the simpler $O(n^2/\epsilon)$ implementation.

```c++
#include <bits/stdc++.h>
using namespace std;
const int N = 505;

int nl, nr, m, B, BB;
vector<int> g[N];
int a[N], b[N], p[N], siz, vis[N], tim;
//bidder v is allocated item a[v]
//item u is allocated to bidder b[u]

int Match(int u) {
    for (auto v : g[u]) {
        if (vis[v] != tim) {
            vis[v] = tim;
            if (b[v] == 0 || Match(b[v])) {
                a[u] = v;
                b[v] = u;
                return 1;
            }
        }
    }
    return 0;
}

void solve() {
    cin >> nl >> nr >> m; //nl and nr correspond to number of bidders and number of items
    for (int i = 1, u, v; i <= m; ++i) {
        cin >> u >> v;
        g[u].push_back(v);
    }
    B = sqrt(nr);
    BB = B;
    queue<int> q;
    for (int i = 1; i <= nl; ++i) {
        q.push(i);
    }
    while (!q.empty()) {
        int v = q.front(); //find an unallocated bidder
        q.pop();
        int mn = BB, u = 0; //find the preferred item with minimum price
        for (auto w : g[v]) {
            if (p[w] < mn) {
                mn = p[u = w];
            }
        }
        if (mn < BB) { //re-allocate the item
            if (b[u]) {
                a[b[u]] = 0;
                q.push(b[u]);
            } else {
                ++siz;
            }
            a[v] = u;
            b[u] = v;
            ++p[u]; //prices are rescaled to integers to avoid floating point issues
        }
        if (siz >= nr - B) break;
    }
    for (int i = 1; i <= nl; ++i) { //complete the matching via augmenting paths
        ++tim;
        if (!a[i]) siz += Match(i);
    }
    cout << siz;
}

int main() {
    solve();
    return 0;
}
```

## A Final Remark

The auction-based algorithm recovers the classical $O(m\sqrt n)$ running time in the sequential computation model, but does not improve it. More recently, researchers have revisited it and discovered its power in other computation models, including parallel, distributed, and streaming settings. Interested readers are referred to [Dobzinski, Nisan, and Oren (2014)](https://arxiv.org/abs/1311.4721), [Assadi, Liu, and Tarjan (2021)](https://doi.org/10.1137/1.9781611976472.18), and [Liu, Ke, and Khuller (2023)](https://doi.org/10.4230/LIPIcs.APPROX/RANDOM.2023.28) for details.



## References

- [Hopcroft, J. E., and Karp, R. M. (1973). *An $n^{5/2}$ Algorithm for Maximum Matchings in Bipartite Graphs*.](https://doi.org/10.1137/0202019)
- [Nisan, N. (2019). *The Demand Query Model for Bipartite Matching*.](https://arxiv.org/abs/1906.04213)
- [Bertsekas, D. P. (1981). *A New Algorithm for the Assignment Problem*.](https://doi.org/10.1007/BF01584237)
- [Bertsekas, D. P. (1988). *The Auction Algorithm: A Distributed Relaxation Method for the Assignment Problem*.](https://doi.org/10.1007/BF02186476)
- [Demange, G., Gale, D., and Sotomayor, M. (1986). *Multi-Item Auctions*.](https://doi.org/10.1086/261411)
- [Dobzinski, S., Nisan, N., and Oren, S. (2014). *Economic Efficiency Requires Interaction*.](https://arxiv.org/abs/1311.4721)
- [Assadi, S., Liu, S. C., and Tarjan, R. E. (2021). *An Auction Algorithm for Bipartite Matching in Streaming and Massively Parallel Computation Models*.](https://doi.org/10.1137/1.9781611976472.18)
- [Liu, Q. C., Ke, Y., and Khuller, S. (2023). *Scalable Auction Algorithms for Bipartite Maximum Matching Problems*.](https://doi.org/10.4230/LIPIcs.APPROX/RANDOM.2023.28)

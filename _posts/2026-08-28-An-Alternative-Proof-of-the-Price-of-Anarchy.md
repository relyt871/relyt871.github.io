---
layout: post
title: "COMPSCI535 $\cdot$ An Alternative Proof of the Price of Anarchy for Selfish Routing"
date: 2026-08-28
tags:
 - Economics
 - Nonstandard Proofs
---

In Lecture 1, we went over the classic proof that the **price of anarchy** for selfish routing in networks with linear latency functions is exactly $4/3$. The original proof was due to [RT02](https://theory.stanford.edu/~tim/papers/routing.pdf). In this post, we will discuss a simple and alternative proof from [CSS08](https://doi.org/10.1016/j.geb.2008.01.001).

We first recall the basic notation: 

- Each edge $e$ in the network has a linear latency function $C_e(x)=a_ex+b_e$. Assume $a_e\geq 0,b_e\geq 0$.

- For a flow $f$, let $f_P$ denote the amount of traffic that use path $P$, and $f_e=\sum_{P\ni e}f_P$ denote the total traffic that use edge $e$. Then the total cost is
  $$
  C(f)=\sum_{P}f_P\cdot \sum_{e\in P}C_e(f_e) = \sum_{e\in E}f_e\cdot C_e(f_e)=\sum_{e\in E}(a_ef_e^2+b_ef_e)
  $$
  Here we actually demonstrate two ways to calculate the total cost: either by summing over the cost of each path, or summing over the cost of each edge. This equivalence will become useful later.

## An Alternative Interpretation of the Proof in Class

The proof of [CSS08](https://doi.org/10.1016/j.geb.2008.01.001) approaches the problem from another angle, and in fact the proof in class can also be interpreted in that way.

#### An Alternative Angle

Let $\hat f$ be the flow at Nash equilibrium, and $f^*$ be the social optimum flow (in fact, the proof does not necessarily require $f^*$ to be socially optimal, it can be any valid flow).

By the definition of Nash equilibrium, there exists $\lambda$ such that 

- for any path $P$ with $\hat f_P>0$, we have $\sum_{e\in P}C_e(\hat f_e) = \lambda$;
- for any path $P$, we have $\sum_{e\in P}C_e(\hat f_e)\geq \lambda$.

Therefore, consider evaluating the total cost of $f^*$ assuming that the cost of each edge is frozen at $\hat f$:
$$
\sum_{P}f^*_P\cdot \sum_{e\in P}C_e(\hat f_e) \geq \sum_P f^*_P\cdot \lambda = \lambda = \sum_{P}\hat f_P\cdot \lambda = \sum_{P}\hat f_P\cdot \sum_{e\in P}C_e(\hat f_e) ~.
$$
Next, rewrite the left hand side as a sum over edge costs:
$$
C(\hat f) = \sum_{P}\hat f_P\cdot \sum_{e\in P}C_e(\hat f_e) \leq \sum_{P}f^*_P\cdot \sum_{e\in P}C_e(\hat f_e) = \sum_{e\in E}f^*_e\cdot C_e(\hat f_e) ~.
$$
Finally, extract $C(f^*)$ from the right hand side:
$$
\begin{aligned}
C(\hat f)\leq &~\sum_{e\in E}f_e^*\cdot C_e(\hat f_e)\\
= &~ \sum_{e\in E}f_e^*\cdot C_e(f^*_e) + \sum_{e\in E}f_e^*\cdot (C_e(\hat f_e)-C_e(f_e^*)) \\
= &~ C(f^*)+\sum_{e\in E}f_e^*\cdot (C_e(\hat f_e)-C_e(f_e^*)) ~.
\end{aligned}
\tag{1}
$$
So it remains to upper bound $\sum_{e\in E}f_e^*\cdot (C_e(\hat f_e)-C_e(f_e^*))$. We will show that it is at most $\dfrac{1}{4}C(\hat f)$, then plugging it back to (1) implies $C(\hat f)\leq \dfrac{4}{3}C(f^*)$, which implies that the PoA is at most $\dfrac{4}{3}$.

#### Proof of $\sum_{e\in E}f_e^*\cdot (C_e(\hat f_e)-C_e(f_e^*))\leq\dfrac{1}{4}C(\hat f)$.

If you are already familiar with the proof in class, you will find that it is essentially proving the same thing. **Every** line of the proof below has a counterpart in the lecture notes, they are just reorganized in a different logic flow.

First, let $H_e(x)=x\cdot C_e(x) = a_ex^2+b_e x$, which is convex and differentiable. Take the derivative at $x=\hat f_e$,
$$
H_e'(\hat f_e) = 2a_e\hat f_e + b_e ~.
$$
Therefore $H'_e(\hat f_e/2)=a_e\hat f_e+b_e = C_e(\hat f_e)$. Then by the standard consequence of convexity, we have
$$
H_e(f^*_e) \geq H_e(\hat f_e/2) + H_e'(\hat f_e/2)\cdot (f_e^*-\hat f_e/2) =  H_e(\hat f_e/2) + C_e(\hat f_e)\cdot (f_e^*-\hat f_e/2)~.
$$
Rearranging terms,
$$
f_e^*\cdot (C_e(\hat f_e)-C_e(f_e^*)) = f_e^*\cdot C_e(\hat f_e) - H_e(f^*_e) \leq \frac{\hat f_e}{2}C_e(\hat f_e) - H_e(\hat f_e/2) ~. \tag{2}
$$
Now expand the right hand side by definition,
$$
\frac{1}{2}\hat f_e\cdot C_e(\hat f_e) - H_e(\hat f_e/2) = \frac{1}{2}(a_e\hat f_e^2+b_e\hat f_e) - \left(\frac{1}{4}a_e\hat f_e^2 + \frac{1}{2}b_e\hat f_e\right) = \frac{1}{4}a_e\hat f_e^2 \leq \frac{1}{4}\hat f_e\cdot C_e(\hat f_e) ~.\tag{3}
$$
Finally, combining (2), (3) and summing over all edges,
$$
\sum_{e\in E}f_e^*\cdot (C_e(\hat f_e)-C_e(f_e^*)) \leq \frac{1}{4}\sum_{e\in E}\hat f_e\cdot C_e(\hat f_e) = \frac{1}{4}C(\hat f) ~.
$$
This completes the proof.

## A Simple Proof by Picture

If you are feeling uncomfortable with derivatives or convex functions, no worries. Next we give an alternative geometric proof of the inequality
$$
f_e^*\cdot (C_e(\hat f_e)-C_e(f_e^*))\leq\dfrac{1}{4}\hat f_e\cdot C_e(\hat f_e) ~,
$$
which can be illustrated by a single picture. This elegant idea is from [CSS08](https://doi.org/10.1016/j.geb.2008.01.001). Note that we only consider the case where $C_e(\hat f_e)-C_e(f^*_e)\geq 0$ (which also implies $\hat f_e\geq f_e^*$), otherwise the left hand side is negative and the inequality holds trivially.

![Proof by picture.](/assets/images/compsci535/poa_proof.png)

In the picture, the bold line corresponds to the latency function $C_e(x)=a_ex+b_e$. The large rectangle has width $\hat f_e$ and height $C_e(\hat f_e)$, so its area is $\hat f_e\cdot C_e(\hat f_e)$. The small shaded rectangle has width $f_e^*$ and height $C_e(\hat f_e)-C_e(f_e^*)$, so its area is $f_e^*\cdot (C_e(\hat f_e)-C_e(f_e^*))$. 

It remains to show that the small rectangle has area at most $\dfrac{1}{4}$ times that of the large rectangle. Since $b_e\geq 0$, the upper left triangle above the line $a_ex+b_e$ has area at most $\dfrac{1}{2}$ times that of the large rectangle. Next, any axis-aligned rectangle whose upper left vertex is at $(0,C_e(\hat f_e))$ and whose lower right vertex is on the line $a_ex+b_e$, has area at most $\frac{1}{2}$ times that of the triangle. This is intuitive and can be proved in various elementary ways, and is left as a simple exercise.

## Reference

- [RT02] Tim Roughgarden and Éva Tardos. [*How Bad is Selfish Routing?*](https://theory.stanford.edu/~tim/papers/routing.pdf). Journal of the ACM, 49(2):236–259, 2002. 
- [CSS08] José R. Correa, Andreas S. Schulz, and Nicolás E. Stier-Moses. [*A Geometric Approach to the Price of Anarchy in Nonatomic Congestion Games*](https://doi.org/10.1016/j.geb.2008.01.001). Games and Economic Behavior, 64(2):457–469, 2008.

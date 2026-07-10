---
layout: post
title: "When does a polygon reach the maximum size"
date: 2026-07-10
tags: 
 - Geometry
---

#### Problem Setting

I would like to start my blog with some old memories.

The problem comes from Problem G in the [2011 ACM-ICPC World Finals](https://codeforces.com/gym/101175/attachments/download/4878/2011-acmicpc-world-finals-en.pdf). 

Given $n\geq 4$ and $n$ numbers $S_1,S_2,\ldots,S_n$, which represents the lengths of the sides of an $n$-sided polygon in cyclic order (it is guaranteed that such a polygon exists and is nondegenerated).

The question is:

> Among all polygons with the prescribed side lengths, which one has the **largest** possible area?

The answer is simple and elegant.

> The largest possible area is reached if and only if all of its vertices lie on a **common circle**.

For example, if $n=4$ and all four sides have the same length, then the maximum area is reached iff the polygon is a square.

When my team was training on that problem set four years ago, it took my teammates quite some time to play with different polygons and eventually reach a correct conjecture. But how to prove it?

The most standard mathematical proof I could find is based on Bretschneider's formula. Although the conclusion becomes clear once the formula is given, the formula it self is rather complicated and its derivation is far from immediate. So at that time, what first came to my mind was a more elementary physics-based proof.



#### The Mathematical Proof

For $n=4$, suppose the side lengths are $a,b,c,d$, and there is a pair of opposite angles $\alpha,\gamma$. Let $s=\frac{a+b+c+d}{2}$, Bretschneider's formula states that its area $K$ satisfies

\[
K^2 = (s-a)(s-b)(s-c)(s-d) - abcd\cos^2\left(\frac{\alpha+\gamma}{2}\right) ~.
\]

The side lengths are fixed, so the area is maximized exactly when $\cos^2\left(\frac{\alpha+\gamma}{2}\right)=0$, which implies $\alpha+\gamma=\pi$. This holds if and only if all four vertices of the polygon lie on a common circle.

When $n>4$, we can wlog. assume that at maximum size the polygon is convex. Then consider any four consecutive vertices $A,B,C,D$. It must be that the polygon $ABCD$ also reach its maximum size, assuming the length of $AD$ is fixed to be the length when the whole polygon reaches its maximum size. Otherwise we can replace $ABCD$ with a larger polygon with the same side lengths and increase the size of the whole polygon.

Therefore, every four consecutive vertices of the polygon must lie on a common circle, hence all vertices must also lie on a circle.



#### My Physic-Based Proof

The following is the physical intuition that originally led me to a simple proof that only uses elementary physics principles and very basic trigonometric functions. 

> Imagine an ideal polygonal frame in the plane. Each side is a rigid rod of negligible weight and thickness, consecutive rods are joined by frictionless hinges, and the frame is airtight. Suppose that the air pressure inside the frame is much greater than the external pressure.

In this two-dimensional idealization, each rod experiences an outward force that

- is perpendicular to the rod,
- acts at the midpoint of the rod, and
- has magnitude proportional to the length of the rod.

Intuitively, the pressure difference tends to expand the frame and increase its enclosed area. If the pressure difference tends to infinity, the frame must reach a stable maximum-area configuration (imagine blowing up a balloon). At that state, for each rod, the pressure difference "pushes" the rod outwards, while the two neighboring rods exert force through the hinges and "drag" it backwards, and the forces and torques on every rod must balance.



We now analyze that equilibrium. The following proof is translated almost verbatim from a Chinese version of my writeup from four years ago.

Choose a rod $AB$, and let one neighboring side be $AC$. Let

- $\vec F_{AB}$ be the outward pressure force on $AB$,
- $\vec T_1$ be the force exerted by $AC$ on $AB$ at $A$,
- $\vec T_2$ be the force exerted by the other neighboring rod on $AB$ at $B$.

![Force analysis on the edge $AB$]('/assets/images/polygon-maximum-size/Figure1.png)

The force $\vec F_{AB}$ is perpendicular to $AB$ and acts at its midpoint.

Let $\theta_1$ and $\theta_2$ be the angles between $\vec T_1$ and $\vec T_2$ and the line containing $AB$.

Since the components parallel to $AB$ must balance,

\[
T_1\cos\theta_1=T_2\cos\theta_2 ~.
\tag{1}
\]

At equilibrium, $AB$ does not rotate around $B$, so the net torque must be zero:

\[
F_{AB}\cdot\frac{|AB|}{2}=T_1\cdot |AB|\sin\theta_1 ~, 
\tag{2}
\]

so $T_1\sin\theta_1=\dfrac{F_{AB}}{2}$.  Similarly, no torque around $A$, so $T_2\sin\theta_2=\dfrac{F_{AB}}{2}$. This implies $T_1\sin\theta_1 = T_2\sin\theta_2$. Together with (1), we conclude that $\theta_1=\theta_2$.



Now draw through $A$ and $B$ the lines perpendicular to $\vec T_1$ and $\vec T_2$, respectively, and let them intersect at $O$. Draw $OM\perp AB$, with $M\in AB$.

Because the two force directions make equal angles with $AB$,
\[
\angle AOM=\theta_1=\theta_2=\angle BOM ~.
\]

Therefore $AOB$ is an isosceles triangle with $OA=OB$, and hence $AM=MB=\dfrac{|AB|}{2}$.

![Propagation of the same center to the adjacent edge]('/assets/images/polygon-maximum-size/Figure2.png)

Next, draw $ON\perp AC$, with $N\in AC$. Let $\vec T_1'$ be the force exerted by $AB$ on $AC$. By action and reaction, $T_1'=T_1$.

Let $\theta_3$ be the angle made by $\vec T_1'$ with the line containing $AC$. $AC$ does not rotate around $C$, so the torque is balanced:
\[
F_{AC}\cdot\frac{|AC|}{2} = T_1'\cdot |AC|\sin\theta_3 ~.
\tag{3}
\]

Comparing (2) and (3), plugging in $T_1'=T_1$, and using the fact that $F_{AB}$ is proportional to $|AB|$, $F_{AC}$ is proportional to $|AC|$, gives

\[
\frac{\sin\theta_1}{\sin\theta_3}=\frac{F_{AB}}{F_{AC}} = \frac{|AB|}{|AC|} ~.
\tag{4}
\]

Finally, since $ON\perp AC$ and $AO\perp\vec T_1$, we have $\angle AON=\theta_3$, therefore by (4),

\[
|AN| = |AO|\sin\theta_3 = |AO|\sin\theta_1 \cdot \dfrac{|AC|}{|AB|} = |AM|\cdot \dfrac{|AC|}{|AB|} = \dfrac{|AC|}{2} ~.
\]

Thus $|AN|=|NC|$. Since $ON\perp AC$, $AOC$ is also an isosceles triangle with $OA=OC$.

Together with $OA=OB$, we obtain $OA=OB=OC$. The same argument can now be repeated from one rod to the next around the polygon, and eventually we can show that the same point $O$ is equidistant from every vertex. Therefore all vertices of the polygon lie on a common circle.

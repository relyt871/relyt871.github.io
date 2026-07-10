---
layout: default
title: Blogs
---

# Blogs

{% if site.posts.size > 0 %}

<ul>
  {% for post in site.posts %}
    <li>
      {{ post.date | date: "%Y-%m-%d" }}
      —
      <a href="{{ post.url | relative_url }}">
        {{ post.title }}
      </a>
    </li>
  {% endfor %}
</ul>

{% else %}

No blog posts yet.

{% endif %}

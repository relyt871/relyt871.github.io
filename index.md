---
layout: default
title: Blogs
---

<section class="blog-index">

  <h1>Blogs</h1>

  {% if site.posts.size > 0 %}

    <div class="post-list">

      {% for post in site.posts %}

        <article class="post-list-item">

          <h2 class="post-list-title">

            <a href="{{ post.url | relative_url }}">
              {{ post.title }}
            </a>

          </h2>


          <div class="post-list-metadata">

            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %-d, %Y" }}
            </time>


            {% if post.tags.size > 0 %}

              <span class="metadata-separator">
                ·
              </span>

              <span class="post-list-tags">

                {% for tag in post.tags %}

                  <span class="post-list-tag">
                    {{ tag }}
                  </span>

                  {% unless forloop.last %}
                    <span class="tag-separator">
                      ·
                    </span>
                  {% endunless %}

                {% endfor %}

              </span>

            {% endif %}

          </div>

        </article>

      {% endfor %}

    </div>

  {% else %}

    <p class="empty-post-list">
      No blog posts yet.
    </p>

  {% endif %}

</section>

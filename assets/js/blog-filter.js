document.addEventListener("DOMContentLoaded", () => {

  const parameters =
    new URLSearchParams(window.location.search);

  const selectedTag =
    parameters.get("tag") || "";


  const posts =
    document.querySelectorAll(".post-list-item");

  const tagLinks =
    document.querySelectorAll(".tag-filter");

  const heading =
    document.getElementById("blogs-heading");

  const noPostsMessage =
    document.getElementById("no-posts-message");


  let visiblePostCount = 0;

  let selectedTagLabel = "";


  for (const link of tagLinks) {

    const tag =
      link.dataset.tag;

    const isSelected =
      tag === selectedTag;


    link.classList.toggle(
      "selected-tag",
      isSelected
    );


    if (isSelected && tag !== "") {

      selectedTagLabel =
        link.dataset.label;

    }

  }


  for (const post of posts) {

    const postTags =
      post.dataset.tags;


    const shouldDisplay =

      selectedTag === ""

      ||

      postTags.includes(
        `|${selectedTag}|`
      );


    post.hidden =
      !shouldDisplay;


    if (shouldDisplay) {

      visiblePostCount++;

    }

  }


  if (
    heading
    &&
    selectedTagLabel !== ""
  ) {

    heading.textContent =
      `Blogs tagged “${selectedTagLabel}”`;

  }


  if (noPostsMessage) {

    noPostsMessage.hidden =
      visiblePostCount !== 0;

  }

});

document.addEventListener("DOMContentLoaded", () => {
  const links =
    document.querySelectorAll(
      "main a[href]"
    );

  for (const link of links) {
    const href =
      link.getAttribute("href");

    if (
      !href
      ||
      href.startsWith("#")
      ||
      href.startsWith("mailto:")
      ||
      href.startsWith("tel:")
      ||
      href.startsWith("javascript:")
    ) {
      continue;
    }

    let destination;

    try {
      destination =
        new URL(
          href,
          window.location.href
        );
    } catch {
      continue;
    }

    const isExternal =
      destination.origin !==
      window.location.origin;

    if (!isExternal) {
      continue;
    }

    link.target = "_blank";

    const relValues =
      new Set(
        (
          link.getAttribute("rel")
          || ""
        )
          .split(/\s+/)
          .filter(Boolean)
      );

    relValues.add("noopener");

    link.setAttribute(
      "rel",
      Array.from(relValues).join(" ")
    );
  }
});

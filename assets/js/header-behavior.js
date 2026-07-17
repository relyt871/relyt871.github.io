document.addEventListener("DOMContentLoaded", () => {

  const header =
    document.querySelector(".site-header");


  if (!header) {
    return;
  }


  /*
   * The header remains fixed on devices without
   * an ordinary mouse cursor, since such devices
   * have no reliable "move cursor to the top"
   * interaction.
   */

  const hasMousePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  const TOP_TRIGGER_HEIGHT = 24;

  const HIDE_SCROLL_THRESHOLD = 80;

  const MINIMUM_SCROLL_CHANGE = 6;

  const HIDE_DELAY = 450;


  let previousScrollY =
    window.scrollY;

  let pointerNearTop =
    false;

  let hideTimer = null;


  const updateHeaderHeight = () => {

    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`
    );

  };


  const showHeader = () => {

    clearTimeout(hideTimer);

    header.classList.remove(
      "site-header--hidden"
    );

  };


  const hideHeader = () => {

    clearTimeout(hideTimer);


    if (
      !hasMousePointer
      ||
      pointerNearTop
      ||
      window.scrollY <= HIDE_SCROLL_THRESHOLD
    ) {
      return;
    }


    header.classList.add(
      "site-header--hidden"
    );

  };


  updateHeaderHeight();


  if ("ResizeObserver" in window) {

    const resizeObserver =
      new ResizeObserver(
        updateHeaderHeight
      );


    resizeObserver.observe(header);

  } else {

    window.addEventListener(
      "resize",
      updateHeaderHeight
    );

  }


  if (!hasMousePointer) {
    return;
  }


  window.addEventListener(
    "scroll",
    () => {

      const currentScrollY =
        window.scrollY;


      /*
       * Only downward scrolling has an effect.
       * Upward scrolling deliberately does nothing.
       */

      if (
        currentScrollY >
          previousScrollY
          +
          MINIMUM_SCROLL_CHANGE
        &&
        currentScrollY >
          HIDE_SCROLL_THRESHOLD
      ) {
        hideHeader();
      }


      previousScrollY =
        currentScrollY;

    },
    {
      passive: true
    }
  );


  document.addEventListener(
    "mousemove",
    (event) => {

      pointerNearTop =
        event.clientY <=
        TOP_TRIGGER_HEIGHT;


      if (pointerNearTop) {

        showHeader();

        return;

      }


      clearTimeout(hideTimer);


      if (
        !header.classList.contains(
          "site-header--hidden"
        )
        &&
        window.scrollY >
          HIDE_SCROLL_THRESHOLD
      ) {

        hideTimer =
          window.setTimeout(
            hideHeader,
            HIDE_DELAY
          );

      }

    },
    {
      passive: true
    }
  );

});

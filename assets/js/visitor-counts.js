document.addEventListener("DOMContentLoaded", () => {

  const siteCode =
    document.body.dataset.goatcounterCode;


  if (!siteCode) {
    return;
  }


  const counters =
    document.querySelectorAll(
      "[data-visit-path]"
    );


  for (const counter of counters) {

    const path =
      counter.dataset.visitPath;


    const endpoint =

      `https://${siteCode}.goatcounter.com`

      +

      `/counter/${encodeURIComponent(path)}.json`;


    fetch(endpoint)

      .then((response) => {

        if (response.status === 404) {

          return {
            count: "0"
          };

        }


        if (!response.ok) {

          throw new Error(
            "Unable to retrieve visitor count."
          );

        }


        return response.json();

      })

      .then((data) => {

        counter.textContent =
          data.count;

      })

      .catch(() => {

        counter.textContent =
          "—";

      });

  }

});

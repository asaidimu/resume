(function (window) {
    "use strict";
    let App = window.App || {};

    class ScrollSpy {
        constructor(indicators, targets) {
            this.indicators = indicators;
            this.targets = targets;
            this.initIndicators();
            this.offsets = this.getOffsets();
        }

        initIndicators() {
            this.indicators.forEach((indicator) => {
                const link = indicator.getElementsByTagName("a")[0];

                link.addEventListener("click", (e) => {
                    e.preventDefault();
                });

                indicator.addEventListener("click", (event) => {
                    event.preventDefault();
                    const href = link.getAttribute("href");
                    document.querySelector(href).scrollIntoView({
                        behavior: "smooth",
                    });
                });
            });
        }

        getOffsets() {
            let offsets = {};
            this.targets.forEach((target) => {
                offsets[target.getAttribute("id")] = target.offsetTop;
            });

            return offsets;
        }

        onScroll() {
            var scrollPosition =
                document.documentElement.scrollTop || document.body.scrollTop;
            scrollPosition += 64;

            for (let id in this.offsets) {
                if (this.offsets[id] < scrollPosition) {
                    this.indicators.forEach((indicator) => {
                        indicator.classList.remove("active");
                    });
                    document
                        .querySelector("[data-link-section='" + id + "']")
                        .classList.add("active");
                }
            }
        }
    }
    App.ScrollSpy = ScrollSpy;
    window.App = App;
})(window);

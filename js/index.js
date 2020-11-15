(function (window) {
    "use strict";
    window.addEventListener("load", (event) => {
        let list_items = document.getElementsByClassName("nav-list-item");

        Array.from(list_items).forEach((item) => {
            const link = item.getElementsByTagName("a")[0];

            link.addEventListener("click", (e) => {
                e.preventDefault();
            });

            item.addEventListener("click", (event) => {
                event.preventDefault();
                const href = link.getAttribute("href");
                document.querySelector(href).scrollIntoView({
                    behavior: "smooth",
                });
            });
        });

        let sections = document.getElementsByTagName("section");
        let offsets = {};
        Array.from(sections).forEach((section) => {
            offsets[section.getAttribute("id")] = section.offsetTop;
        });

        let links = Array.from(list_items);

        window.onscroll = () => {
            var scrollPosition =
                document.documentElement.scrollTop || document.body.scrollTop;
            scrollPosition += 64;
            for (let id in offsets) {
                if (offsets[id] < scrollPosition) {
                    console.log(offsets[id]);
                    links.forEach((link) => {
                        link.classList.remove("active");
                    });
                    document
                        .querySelector("[data-link-section='" + id + "']")
                        .classList.add("active");
                }
            }
        };
    });
})(window);

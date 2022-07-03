export const ScrollElementState = ({ elements = [] }) => {
    const destroy = () => {
        window.removeEventListener("scroll", computed);
    };

    const computedElements = () => {
        elements = elements.map((element) => {
            element.el = document.body.querySelectorAll(element.watch);
            return element;
        });
    };

    const computed = () => {
        const wTop = Math.floor(window.pageYOffset);
        const wHeight = document.documentElement.clientHeight;

        for (const element of elements) {
            for (const el of element.el) {
                const elTop = el.offsetTop;
                const elHeight = el.offsetHeight;

                const state = {
                    active: false,
                    procent: 0,
                };

                if (wTop + wHeight > elTop) {
                    state.active = true;
                    let procent = 0;

                    if (elTop === 0) {
                        if (elHeight > wHeight) {
                            procent = (wTop * 100) / (elHeight - wHeight);
                        } else {
                            procent = (wTop * 100) / elHeight;
                        }

                    } else {
                        procent = ((wTop + wHeight - elTop) * 100) / elHeight;
                    }

                    state.procent = procent >= 100 ? 100 : procent;
                }

                if (wTop > elTop + elHeight) {
                    state.active = false;
                    state.procent = 0;
                }

                element.state({ el, ...state });
            }
        }
    };

    window.addEventListener("scroll", computed);
    computedElements();
    computed();

    return {
        destroy,
    };
};

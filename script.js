import { ScrollElementState } from "./ScrollElementState.js";

const elements = [
    {
        watch: "[data-main]",
        state({ el, active, procent }) {
            if (active) {
                const circle = document.body.querySelector(".circle");
                circle.style.animationDelay = `-${procent * 60}s`;
            }
        },
    },
    {
        watch: "[data-el]",
        state({ el, active, procent }) {
            if (active) {
                if (!el.classList.contains("active")) {
                    el.classList.add("active");
                }
            } else {
                if (el.classList.contains("active")) {
                    el.classList.remove("active");
                }
            }
        },
    },
    {
        watch: "[data-el-2]",
        state({ el, active, procent }) {
            if (active) {
                el.style.transform = `translateX(${-100 + procent}%)`;
            }
        },
    },
];

const elementState = ScrollElementState({ elements });

console.log(elementState);

// =========================
// WINDOWS KIDS PAINT
// =========================

const paintObserver =
    new MutationObserver(
        mutations => {

            mutations.forEach(
                mutation => {

                    mutation.addedNodes.forEach(
                        node => {

                            if (
                                !node.classList ||
                                !node.classList.contains(
                                    "window"
                                )
                            ) {
                                return;
                            }

                            if (
                                node.dataset.app ===
                                "paint"
                            ) {
                                initPaint(node);
                            }
                        }
                    );
                });
        }
    );

paintObserver.observe(
    document.getElementById(
        "windows-container"
    ),
    {
        childList: true
    }
);

// =========================
// INIT PAINT
// =========================

function initPaint(windowEl) {

    const canvas =
        windowEl.querySelector(
            "#paint-canvas"
        );

    const clearBtn =
        windowEl.querySelector(
            "#clear-canvas"
        );

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    let drawing = false;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    // Nền trắng

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // =====================
    // HELPERS
    // =====================

    function getPos(event) {

        const rect =
            canvas.getBoundingClientRect();

        return {

            x:
                event.clientX -
                rect.left,

            y:
                event.clientY -
                rect.top
        };
    }

    // =====================
    // DRAW
    // =====================

    canvas.addEventListener(
        "mousedown",
        event => {

            drawing = true;

            const pos =
                getPos(event);

            ctx.beginPath();

            ctx.moveTo(
                pos.x,
                pos.y
            );
        }
    );

    canvas.addEventListener(
        "mousemove",
        event => {

            if (!drawing)
                return;

            const pos =
                getPos(event);

            ctx.lineTo(
                pos.x,
                pos.y
            );

            ctx.stroke();
        }
    );

    canvas.addEventListener(
        "mouseup",
        () => {

            drawing = false;
        }
    );

    canvas.addEventListener(
        "mouseleave",
        () => {

            drawing = false;
        }
    );

    // =====================
    // TOUCH SUPPORT
    // =====================

    canvas.addEventListener(
        "touchstart",
        event => {

            event.preventDefault();

            drawing = true;

            const touch =
                event.touches[0];

            const rect =
                canvas.getBoundingClientRect();

            ctx.beginPath();

            ctx.moveTo(
                touch.clientX -
                    rect.left,
                touch.clientY -
                    rect.top
            );
        }
    );

    canvas.addEventListener(
        "touchmove",
        event => {

            event.preventDefault();

            if (!drawing)
                return;

            const touch =
                event.touches[0];

            const rect =
                canvas.getBoundingClientRect();

            ctx.lineTo(
                touch.clientX -
                    rect.left,
                touch.clientY -
                    rect.top
            );

            ctx.stroke();
        }
    );

    canvas.addEventListener(
        "touchend",
        () => {

            drawing = false;
        }
    );

    // =====================
    // CLEAR
    // =====================

    if (clearBtn) {

        clearBtn.addEventListener(
            "click",
            () => {

                ctx.fillStyle =
                    "#ffffff";

                ctx.fillRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
            }
        );
    }

    console.log(
        "🎨 Paint Ready"
    );
}
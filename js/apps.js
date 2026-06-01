// =========================
// WINDOWS KIDS APPS
// =========================

// Chạy mỗi khi mở cửa sổ mới
document.addEventListener("click", handleDynamicApps);

function handleDynamicApps(event) {

    // =====================
    // CALCULATOR
    // =====================

    const calcButton =
        event.target.closest(
            ".calculator-grid button"
        );

    if (calcButton) {

        const windowEl =
            calcButton.closest(".window");

        const display =
            windowEl.querySelector(
                "#calc-display"
            );

        const value =
            calcButton.textContent.trim();

        if (value === "C") {

            display.value = "";

            return;
        }

        if (value === "=") {

            try {

                display.value =
                    Function(
                        `"use strict"; return (${display.value})`
                    )();

            } catch {

                display.value = "Error";
            }

            return;
        }

        display.value += value;
    }

    // =====================
    // GUESS NUMBER GAME
    // =====================

    const guessBtn =
        event.target.closest(
            "#guess-game-btn"
        );

    if (guessBtn) {

        const windowEl =
            guessBtn.closest(".window");

        const gameArea =
            windowEl.querySelector(
                "#game-area"
            );

        const secret =
            Math.floor(
                Math.random() * 100
            ) + 1;

        gameArea.innerHTML = `
            <h3>🎲 Guess Number</h3>

            <p>
                Đoán số từ 1 đến 100
            </p>

            <input
                type="number"
                class="game-input"
                min="1"
                max="100">

            <button
                class="game-button">
                Đoán
            </button>

            <div
                class="game-message">
            </div>
        `;

        const input =
            gameArea.querySelector(
                ".game-input"
            );

        const button =
            gameArea.querySelector(
                ".game-button"
            );

        const message =
            gameArea.querySelector(
                ".game-message"
            );

        button.addEventListener(
            "click",
            () => {

                const value =
                    Number(
                        input.value
                    );

                if (!value) {

                    message.textContent =
                        "🤔 Nhập số đi!";
                    return;
                }

                if (value === secret) {

                    message.textContent =
                        "🎉 Chính xác!";
                }

                else if (
                    value < secret
                ) {

                    message.textContent =
                        "📈 Cao hơn!";
                }

                else {

                    message.textContent =
                        "📉 Thấp hơn!";
                }
            }
        );
    }
}

// =========================
// APP INIT
// =========================

// Theo dõi khi app mở

const observer =
    new MutationObserver(
        mutations => {

            mutations.forEach(
                mutation => {

                    mutation
                        .addedNodes
                        .forEach(node => {

                            if (
                                !node.classList ||
                                !node.classList.contains(
                                    "window"
                                )
                            ) {
                                return;
                            }

                            initWindowApps(
                                node
                            );
                        });
                });
        }
    );

observer.observe(
    document.getElementById(
        "windows-container"
    ),
    {
        childList: true
    }
);

// =========================
// INIT APPS
// =========================

function initWindowApps(
    windowEl
) {

    const app =
        windowEl.dataset.app;

    switch (app) {

        case "calculator":
            initCalculator(
                windowEl
            );
            break;

        case "browser":
            initBrowser(
                windowEl
            );
            break;

        case "explorer":
            initExplorer(
                windowEl
            );
            break;

        case "games":
            initGames(
                windowEl
            );
            break;
    }
}

// =========================
// CALCULATOR
// =========================

function initCalculator(
    windowEl
) {

    const display =
        windowEl.querySelector(
            "#calc-display"
        );

    if (!display) return;

    display.value = "";
}

// =========================
// GAMES
// =========================

function initGames(
    windowEl
) {

    const area =
        windowEl.querySelector(
            "#game-area"
        );

    if (!area) return;

    area.innerHTML = `
        <p>
            Nhấn nút bên trên để
            bắt đầu trò chơi.
        </p>
    `;
}

// =========================
// EXPLORER
// =========================

function initExplorer(
    windowEl
) {

    const files =
        windowEl.querySelectorAll(
            "li"
        );

    files.forEach(file => {

        file.addEventListener(
            "dblclick",
            () => {

                alert(
                    `📂 Mở ${file.textContent}`
                );
            }
        );
    });
}

// =========================
// BROWSER
// =========================

function initBrowser(
    windowEl
) {

    const links =
        windowEl.querySelectorAll(
            "a"
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "Opening:",
                    link.href
                );
            }
        );
    });
}
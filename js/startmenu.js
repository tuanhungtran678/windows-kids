// =========================
// WINDOWS KIDS START MENU
// =========================

const startButton =
    document.getElementById(
        "start-button"
    );

const startMenu =
    document.getElementById(
        "start-menu"
    );

// =========================
// TOGGLE START MENU
// =========================

function toggleStartMenu() {

    startMenu.classList.toggle(
        "hidden"
    );
}

startButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        toggleStartMenu();
    }
);

// =========================
// CLOSE WHEN CLICK OUTSIDE
// =========================

document.addEventListener(
    "click",
    event => {

        const clickedInsideMenu =
            startMenu.contains(
                event.target
            );

        const clickedStartButton =
            startButton.contains(
                event.target
            );

        if (
            !clickedInsideMenu &&
            !clickedStartButton
        ) {
            startMenu.classList.add(
                "hidden"
            );
        }
    }
);

// =========================
// OPEN APP FROM MENU
// =========================

const startApps =
    document.querySelectorAll(
        ".start-app"
    );

startApps.forEach(app => {

    app.addEventListener(
        "click",
        () => {

            const appName =
                app.dataset.app;

            if (
                typeof createWindow ===
                "function"
            ) {
                createWindow(appName);
            }

            startMenu.classList.add(
                "hidden"
            );
        }
    );
});

// =========================
// ESC KEY CLOSE MENU
// =========================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {
            startMenu.classList.add(
                "hidden"
            );
        }
    }
);

// =========================
// OPTIONAL: OPEN MENU WITH
// WINDOWS KEY (BROWSER LIMIT)
// =========================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key === " "
        ) {

            event.preventDefault();

            toggleStartMenu();
        }
    }
);
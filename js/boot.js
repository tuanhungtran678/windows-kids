// =========================
// WINDOWS KIDS BOOT
// =========================

const bootScreen =
    document.getElementById(
        "boot-screen"
    );

const dots =
    document.querySelector(
        ".boot-dots"
    );

let count = 0;

const loadingAnimation =
    setInterval(() => {

        count++;

        dots.textContent =
            ".".repeat(
                count % 4
            );

    }, 350);

// Fake boot time

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            clearInterval(
                loadingAnimation
            );

            bootScreen.classList.add(
                "hidden"
            );

            setTimeout(() => {

                bootScreen.remove();

            }, 1000);

        }, 2500);
    }
);
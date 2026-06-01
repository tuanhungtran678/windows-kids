// =========================
// WINDOWS KIDS DESKTOP
// =========================

// Desktop icons

const desktopIcons =
    document.querySelectorAll(
        ".desktop-icon"
    );

// =========================
// OPEN APP FROM DESKTOP
// =========================

desktopIcons.forEach(icon => {

    icon.addEventListener(
        "dblclick",
        () => {

            const appName =
                icon.dataset.app;

            if (
                typeof createWindow ===
                "function"
            ) {
                createWindow(appName);
            }
        }
    );

    // Mobile / single click fallback

    icon.addEventListener(
        "click",
        () => {

            icon.classList.add(
                "selected"
            );

            setTimeout(() => {

                icon.classList.remove(
                    "selected"
                );

            }, 250);
        }
    );
});

// =========================
// TASKBAR CLOCK
// =========================

const clock =
    document.getElementById(
        "clock"
    );

function updateClock() {

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}`;
}

updateClock();

setInterval(
    updateClock,
    1000
);

// =========================
// DESKTOP CLICK
// =========================

const desktop =
    document.getElementById(
        "desktop"
    );

desktop.addEventListener(
    "click",
    event => {

        // Nếu click nền desktop
        if (
            event.target === desktop
        ) {

            document
                .querySelectorAll(
                    ".window"
                )
                .forEach(win => {

                    win.classList.remove(
                        "active"
                    );
                });
        }
    }
);

// =========================
// GREETING
// =========================

console.log(
    "%c🌈 Windows Kids Started!",
    `
    color:white;
    background:#8b5cf6;
    padding:8px;
    border-radius:6px;
    font-size:14px;
    `
);

// =========================
// RANDOM FUN FACT
// =========================

const funFacts = [

    "🦖 Khủng long từng sống trên Trái Đất hơn 160 triệu năm.",

    "🐙 Bạch tuộc có 3 trái tim.",

    "🌈 Cầu vồng thực ra là một vòng tròn hoàn chỉnh.",

    "🐧 Chim cánh cụt không biết bay nhưng bơi rất giỏi.",

    "🚀 Ánh sáng từ Mặt Trời mất khoảng 8 phút để tới Trái Đất."
];

console.log(
    funFacts[
        Math.floor(
            Math.random() *
            funFacts.length
        )
    ]
);

document.addEventListener(
    "contextmenu",
    event => {

        event.preventDefault();
    }
);
// =========================
// WINDOWS KIDS WINDOW MANAGER
// =========================

const windowsContainer =
    document.getElementById("windows-container");

const taskbarApps =
    document.getElementById("taskbar-apps");

let highestZ = 100;

// =========================
// OPEN WINDOW
// =========================

function createWindow(appName) {

    const template =
        document.getElementById(
            `${appName}-template`
        );

    if (!template) {
        console.error(
            `Template not found: ${appName}`
        );
        return;
    }

    const clone =
        template.content
            .firstElementChild
            .cloneNode(true);

    clone.dataset.app = appName;

    clone.style.left =
        `${100 + Math.random() * 120}px`;

    clone.style.top =
        `${70 + Math.random() * 80}px`;

    clone.style.zIndex =
        ++highestZ;

    windowsContainer.appendChild(clone);

    focusWindow(clone);

    makeDraggable(clone);

    attachCloseButton(clone);
    attachMinimizeButton(clone);
    attachMaximizeButton(clone);

    createTaskbarButton(
        appName,
        clone
    );

    return clone;
}

// =========================
// FOCUS WINDOW
// =========================

function focusWindow(windowEl) {

    document
        .querySelectorAll(".window")
        .forEach(win => {
            win.classList.remove("active");
        });

    windowEl.classList.add("active");

    windowEl.style.zIndex =
        ++highestZ;
}

// =========================
// DRAG WINDOW
// =========================

function makeDraggable(windowEl) {

    const titleBar =
        windowEl.querySelector(
            ".title-bar"
        );

    let dragging = false;

    let startX = 0;
    let startY = 0;

    let startLeft = 0;
    let startTop = 0;

    titleBar.addEventListener(
        "mousedown",
        e => {

            dragging = true;

            focusWindow(windowEl);

            startX = e.clientX;
            startY = e.clientY;

            startLeft =
                windowEl.offsetLeft;

            startTop =
                windowEl.offsetTop;

            document.body.style.cursor =
                "move";
        }
    );

    document.addEventListener(
        "mousemove",
        e => {

            if (!dragging) return;

            const dx =
                e.clientX - startX;

            const dy =
                e.clientY - startY;

            windowEl.style.left =
                `${startLeft + dx}px`;

            windowEl.style.top =
                `${startTop + dy}px`;
        }
    );

    document.addEventListener(
        "mouseup",
        () => {

            dragging = false;

            document.body.style.cursor =
                "default";
        }
    );

    windowEl.addEventListener(
        "mousedown",
        () => focusWindow(windowEl)
    );
}

// =========================
// CLOSE WINDOW
// =========================

function attachCloseButton(windowEl) {

    const closeBtn =
        windowEl.querySelector(
            ".close-btn"
        );

    closeBtn.addEventListener(
        "click",
        () => {

            windowEl.classList.add(
                "closing"
            );

            setTimeout(() => {

                removeTaskbarButton(
                    windowEl
                );

                windowEl.remove();

            }, 150);
        }
    );
}

// =========================
// TASKBAR BUTTONS
// =========================

function createTaskbarButton(
    appName,
    windowEl
) {

    const button =
        document.createElement(
            "div"
        );

    button.className =
        "taskbar-app active";

    button.textContent =
        getAppTitle(appName);

    button.dataset.windowId =
        Date.now().toString();

    windowEl.dataset.windowId =
        button.dataset.windowId;

button.addEventListener(
    "click",
    () => {

        if (!windowEl.isConnected)
            return;

        if (
            windowEl.classList.contains(
                "minimized"
            )
        ) {

            windowEl.classList.remove(
                "minimized"
            );

            button.classList.remove(
                "minimized"
            );
        }

        focusWindow(windowEl);
    }
);

    taskbarApps.appendChild(button);
}

function removeTaskbarButton(
    windowEl
) {

    const id =
        windowEl.dataset.windowId;

    document
        .querySelectorAll(
            ".taskbar-app"
        )
        .forEach(btn => {

            if (
                btn.dataset.windowId === id
            ) {
                btn.remove();
            }
        });
}

// =========================
// APP TITLES
// =========================

function getAppTitle(appName) {

    const names = {

    paint:
        "🎨 Paint",

    calculator:
        "🧮 Calculator",

    games:
        "🎮 Games",

    browser:
        "🌐 Browser",

    explorer:
        "📁 Explorer",

    recyclebin:
        "🗑 Recycle Bin"
    };
}

// =========================
// GLOBAL ACCESS
// =========================

window.createWindow =
    createWindow;

window.focusWindow =
    focusWindow;

// =========================
// MINIMIZE
// =========================

function attachMinimizeButton(
    windowEl
) {

    const button =
        windowEl.querySelector(
            ".minimize-btn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {

            windowEl.classList.add(
                "minimized"
            );

            const id =
                windowEl.dataset.windowId;

            document
                .querySelectorAll(
                    ".taskbar-app"
                )
                .forEach(btn => {

                    if (
                        btn.dataset.windowId === id
                    ) {

                        btn.classList.add(
                            "minimized"
                        );
                    }
                });
        }
    );
}

// =========================
// MAXIMIZE
// =========================

function attachMaximizeButton(
    windowEl
) {

    const button =
        windowEl.querySelector(
            ".maximize-btn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {

            windowEl.classList.toggle(
                "maximized"
            );
        }
    );
}
const menu =
    document.getElementById(
        "context-menu"
    );

// =========================
// OPEN MENU
// =========================

document.addEventListener(
    "contextmenu",
    event => {

        event.preventDefault();

        menu.classList.remove(
            "hidden"
        );

        menu.style.left =
            event.clientX + "px";

        menu.style.top =
            event.clientY + "px";
    }
);

// =========================
// CLOSE MENU
// =========================

document.addEventListener(
    "click",
    () => {

        menu.classList.add(
            "hidden"
        );
    }
);

// =========================
// ACTIONS
// =========================

menu.addEventListener(
    "click",
    event => {

        const action =
            event.target.dataset.action;

        switch (
            action
        ) {

            case "refresh":

                location.reload();

                break;

case "new-folder":

    createFolder(
        "Desktop",
        "New Folder " +
        Date.now()
    );

    renderDesktopFiles();

    break;

            case "wallpaper":

                cycleWallpaper();

                break;
        }
    }
);

// =========================
// WALLPAPERS
// =========================

const wallpapers = [

    "linear-gradient(135deg,#60a5fa,#8b5cf6)",

    "linear-gradient(135deg,#22c55e,#3b82f6)",

    "linear-gradient(135deg,#f97316,#ec4899)"
];

let wallpaperIndex = 0;

function cycleWallpaper() {

    wallpaperIndex++;

    wallpaperIndex %=
        wallpapers.length;

    document
        .getElementById(
            "desktop"
        )
        .style.background =
        wallpapers[
            wallpaperIndex
        ];
}
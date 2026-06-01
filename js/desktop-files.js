function renderDesktopFiles() {

    const desktop =
        document.getElementById(
            "desktop"
        );

    document
        .querySelectorAll(
            ".generated-icon"
        )
        .forEach(
            icon =>
                icon.remove()
        );

    const files =
        getFolder(
            "Desktop"
        );

    files.forEach(
        item => {

            if (
                item.type !==
                "folder"
            ) return;

            const icon =
                document.createElement(
                    "div"
                );

            icon.className =
                "desktop-icon generated-icon";

            icon.innerHTML =
                `
                <div class="icon">
                    📁
                </div>

                <span>
                    ${item.name}
                </span>
                `;

            desktop.appendChild(
                icon
            );
        }
    );
}
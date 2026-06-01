let currentFolder = "Desktop";

function renderExplorer() {

    const list =
        document.getElementById(
            "explorer-list"
        );

    const path =
        document.getElementById(
            "explorer-path"
        );

    if (!list || !path) return;

    path.textContent =
        currentFolder;

    list.innerHTML = "";

    const files =
        getFolder(
            currentFolder
        );

    files.forEach(item => {

        const li =
            document.createElement(
                "li"
            );

        if (
            item.type === "folder"
        ) {

            li.innerHTML =
                `📁 ${item.name}`;

            li.addEventListener(
                "dblclick",
                () => {

                    currentFolder =
                        item.name;

                    renderExplorer();
                }
            );
        }
        else {

            li.innerHTML =
                `📄 ${item.name}`;
        }

        list.appendChild(li);
    });
}

function explorerBack() {

    if (
        currentFolder !==
        "Desktop"
    ) {

        currentFolder =
            "Desktop";

        renderExplorer();
    }
}
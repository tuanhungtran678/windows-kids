class FileSystem {

    constructor() {

        const saved =
            localStorage.getItem(
                "windowskids_fs"
            );

        if (saved) {

            this.data =
                JSON.parse(saved);

        } else {

            this.data = {

                Desktop: {

                    type: "folder",

                    children: {

                        Games: {
                            type: "folder",
                            children: {}
                        },

                        Pictures: {
                            type: "folder",
                            children: {}
                        },

                        "Homework.doc": {
                            type: "file"
                        },

                        "Music.mp3": {
                            type: "file"
                        }
                    }
                },

                RecycleBin: {

                    type: "folder",

                    children: {}
                }
            };

            this.save();
        }
    }

    save() {

        localStorage.setItem(
            "windowskids_fs",
            JSON.stringify(
                this.data
            )
        );
    }

    getFolder(path) {

        let current =
            this.data;

        for (const part of path) {

            current =
                current[part];

            if (
                current &&
                current.children
            ) {

                current =
                    current.children;
            }
        }

        return current;
    }

    createFolder(
        path,
        folderName
    ) {

        const folder =
            this.getFolder(path);

        folder[folderName] = {

            type: "folder",

            children: {}
        };

        this.save();
    }

    deleteItem(
        path,
        itemName
    ) {

        const folder =
            this.getFolder(path);

        const item =
            folder[itemName];

        if (!item) return;

        this.data
            .RecycleBin
            .children[itemName] =
                item;

        delete folder[itemName];

        this.save();
    }

    restoreItem(
        itemName
    ) {

        const item =
            this.data
                .RecycleBin
                .children[itemName];

        if (!item) return;

        this.data
            .Desktop
            .children[itemName] =
                item;

        delete this.data
            .RecycleBin
            .children[itemName];

        this.save();
    }
}

window.FileSystem =
    new FileSystem();
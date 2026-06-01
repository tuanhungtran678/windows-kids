const FileSystem = {

    Desktop: [

        {
            name: "Paint",
            type: "app"
        },

        {
            name: "Calculator",
            type: "app"
        },

        {
            name: "Games",
            type: "app"
        },

        {
            name: "Pictures",
            type: "folder"
        },

        {
            name: "Documents",
            type: "folder"
        }
    ],

    Pictures: [

        {
            name: "Rainbow.png",
            type: "file"
        },

        {
            name: "Dinosaur.jpg",
            type: "file"
        }
    ],

    Documents: [

        {
            name: "Homework.txt",
            type: "file"
        },

        {
            name: "Story.doc",
            type: "file"
        }
    ],

    RecycleBin: []
};

// =========================
// HELPERS
// =========================

function getFolder(
    folderName
) {

    return (
        FileSystem[
            folderName
        ] || []
    );
}

function createFile(
    folder,
    file
) {

    if (
        !FileSystem[folder]
    ) {

        FileSystem[folder] = [];
    }

    FileSystem[folder]
        .push(file);
}

function deleteFile(
    folder,
    fileName
) {

    if (
        !FileSystem[folder]
    ) return;

    const index =
        FileSystem[folder]
            .findIndex(
                file =>
                    file.name ===
                    fileName
            );

    if (
        index === -1
    ) return;

    const removed =
        FileSystem[
            folder
        ].splice(
            index,
            1
        )[0];

    FileSystem
        .RecycleBin
        .push(removed);
}

// =========================
// DEBUG
// =========================

window.FileSystem =
    FileSystem;

window.getFolder =
    getFolder;

window.createFile =
    createFile;

window.deleteFile =
    deleteFile;

    function createFolder(
    parent,
    folderName
) {

    if (
        !FileSystem[parent]
    ) return;

    FileSystem[parent].push({

        name:
            folderName,

        type:
            "folder"
    });

    FileSystem[
        folderName
    ] = [];
}

window.createFolder =
    createFolder;
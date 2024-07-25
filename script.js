const addButton = document.querySelector(".add");
const notesContainer = document.querySelector(".notes-container");
const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

const updateLocalStorage = () => {
    const notesText = document.querySelectorAll("textarea");
    const notes = [];
    notesText.forEach((note) => notes.push(note.value));
    localStorage.setItem("notes", JSON.stringify(notes));
};

const autoResize = (textArea) => {
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
};

const addNewNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}">${marked(text)}</div>
        <textarea class="${text ? "hidden" : ""}">${text}</textarea>`;

    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    autoResize(textArea);

    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the note from toggling fullscreen mode
        note.remove();
        updateLocalStorage();
    });

    editButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the note from toggling fullscreen mode
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
        textArea.focus(); // Focus on the textarea when editing
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        autoResize(textArea);
        updateLocalStorage();
    });

    // Ensure clicking the textarea doesn't toggle fullscreen
    textArea.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    note.addEventListener("click", () => {
        note.classList.toggle("fullscreen");
    });

    notesContainer.appendChild(note);
};

addButton.addEventListener("click", () => addNewNote());

if (savedNotes.length > 0) {
    savedNotes.forEach((note) => addNewNote(note));
}

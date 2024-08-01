const form = document.querySelector("form");
const textarea = document.querySelector("textarea");
const notesContainer = document.querySelector(".notes-container");
const importInput = document.querySelector("#import");

// Store our notes
const notes = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputNote = textarea.value; // Four
  console.log(inputNote);

  //Store new note in array
  notes.push(inputNote); // Initally notes = ["Three"] it becomes notes = ["three", "four"]

  // Render the note-card with new note
  renderNote(inputNote);

  // Store all notes in localStorage
  // Initially notes - ["three", "four"]
  localStorage.setItem("notes", JSON.stringify(notes));
  //  notes - ["three", "four"]

  // Clear text area
  textarea.value = "";
});

function renderNote(note) {
  const div = document.createElement("div");
  div.classList.add("note-card");

  const p = document.createElement("p");
  p.innerText = note;

  const btn = document.createElement("button");
  btn.innerText = "Delete";

  div.appendChild(p);
  div.appendChild(btn);

  notesContainer.appendChild(div);
}

function fetchNotesFromLocalStorage() {
  // Fetch the notes
  let fetchedNotes = localStorage.getItem("notes");

  // Convert to an array
  const notesArray = JSON.parse(fetchedNotes); // ["three"]

  // Check that notes is not empty
  if (notesArray === null) {
    return;
  }

  // Update notes array
  notes.push(...notesArray); // notes = ["three"]

  // Render the notes
  notesArray.map(renderNote);
}

document.addEventListener("DOMContentLoaded", fetchNotesFromLocalStorage);

function importNotes(e) {
  // Upload file
  const file = e.target.files[0];
  // Read file
  const reader = new FileReader();
  reader.readAsText(file);

  // reader.onload , reader.onerror -
  reader.onload = () => {
    console.log(reader.result);
    // Check that notes is not empty
    if (reader.result === "") {
      return;
    }

    let uploadedNotes = JSON.parse(reader.result);

    // Update our notes array
    notes.push(...uploadedNotes);

    // Update localstorage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Render uploaded notes
    uploadedNotes.map(renderNote);
  };
}

importInput.addEventListener("change", importNotes);

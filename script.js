const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addnewnote(note));
}

addBtn.addEventListener("click", () => addnewnote());

function addnewnote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

  const editbtn = note.querySelector(".edit");
  const deletebtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  textarea.value = text;
  main.innerHTML = marked.parse(text);

  deletebtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  editbtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notestext = document.querySelectorAll("textarea");
  const notes = [];
  notestext.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}

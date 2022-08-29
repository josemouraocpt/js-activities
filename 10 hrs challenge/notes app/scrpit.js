const addBtn = document.querySelector("#add");

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => {
        addNewNote(note);
    });
};

addBtn.addEventListener("click", () =>{
    addNewNote();
});

function addNewNote(text = " "){
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="main ${text ? '': "hidden"}"></div>
        <textarea class="${text ? "hidden": ""}"></textarea>
    `;


    const editBtn = note.querySelector(".edit");
    const delBtn = note.querySelector(".delete");

    
    const main = note.querySelector(".main");
    const textarea = note.querySelector('textarea');
    

    textarea.value = text;
    main.innerHTML = marked.parse(text);


    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    });

    delBtn.addEventListener("click", () =>{
        note.remove();

        updateLS();
    });
    
    textarea.addEventListener("input", (e) => {
        const {value} = e.target;

        main.innerHTML = marked.parse(value);

        updateLS();
    });


    document.body.appendChild(note);
};


function updateLS(){
    const allNotes = document.querySelectorAll("textarea");
    const notes = [];
    allNotes.forEach(note => {
        notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
};

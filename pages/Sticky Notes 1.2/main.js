const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

   note.innerHTML = `
    <div class="tools">
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <textarea maxlength="100"class="textarea">${text}</textarea>
    `;

    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('.textarea');

    textArea.value = text;
    //main.innerHTML = text;

    deleteBtn.addEventListener('click', () => {
        note.remove();

        updateLS();
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        
        textArea.innerHTML = value;
        
        updateLS();
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = [];

    notesText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
}
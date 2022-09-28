//Variables
const form = document.querySelector('#formulario');
const listNotes = document.querySelector('#lista-tweets');
let notes = [];



//Event Listeners
eventListeners();
function eventListeners() {
    //When the user add a new note
    form.addEventListener('submit', addNotes);

    //When the document is ready
    document.addEventListener('DOMContentLoaded', () => {
        notes = JSON.parse( localStorage.getItem('notes')) || [];

        console.log(notes);

        createHTML();
    })
}




//Functions
function addNotes(e) {
    e.preventDefault();

    //Text area
    const note = document.querySelector('#tweet').value;
    
    if(note === '') {
        showError('Una nota por puede estar vacia');

        return; //Se evita que se ejecuten más lineas de código
    }

    const noteObj = {
        id: Date.now(),
        note
    }

    //Add Notes
    notes = [...notes, noteObj];
    
    //Create HTML from notes
    createHTML();

    //Reset form
    form.reset();
}


//Show error message
function showError(error) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');


    //Insert to the content
    const content = document.querySelector('#contenido');
    content.appendChild(errorMessage);

    //Delete alert after 3 seconds
    setTimeout( () => {
        errorMessage.remove();
    }, 3000);
}


//Show notes list
function createHTML() {

    cleanHTML();

    if(notes.length > 0) {
        notes.forEach( note => {
            //Add a delete button
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('borrar-tweet');
            btnDelete.innerText = 'X';

            //Add the function to delete
            btnDelete.onclick = () => {
                deleteNote(note.id);
            }

            //Create html
            const li = document.createElement('li');


            //Add text
            li.innerText = note.note;

            //Add a button
            li.appendChild(btnDelete);

            //Insert to the HTML
            listNotes.appendChild(li);
        });
    }

    syncStorage();
}

//Add current notes to local storage
function syncStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//Delete note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id)

    createHTML();
}

//Clean HTML 
function cleanHTML() {
    while ( listNotes.firstChild) {
        listNotes.removeChild(listNotes.firstChild);
    }
}
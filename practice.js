let myLibrary = [];

function book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

book.prototype.changeRead = function() {
    this.read = !this.read;
}

let goodBook = new book("The Hobbit", "J.R.R. Tolkien", 295, false);
let otherBook1 = new book("Another book","J", 45, true)
let otherBook2 = new book("Third book", "E", 45, false)
myLibrary.push(goodBook);
myLibrary.push(otherBook1);
myLibrary.push(otherBook2);

let myLib = document.querySelector(".content")
function llenarLibros() {
    console.log(myLibrary);
    
    for (const libro of myLibrary){
        const titulo = document.createElement("div");
        titulo.textContent = libro.title;
        
        const autor = document.createElement("p");
        autor.textContent = libro.author;
    
        const pages = document.createElement("p");
        pages.textContent = libro.pages
    
        const leido =  document.createElement("button");
        leido.textContent = libro.read;
    
        const borrar = document.createElement("button");
        borrar.textContent = "Delete";
        borrar.setAttribute("class", "borrar");
        borrar.dataset.index = myLibrary.indexOf(libro);
    
        const carta = document.createElement("div");
        carta.setAttribute("class", "card");
        carta.appendChild(titulo);
        carta.appendChild(autor);
        carta.appendChild(pages);
        carta.appendChild(leido);
        carta.appendChild(borrar);
        
        myLib.appendChild(carta);
    }
}

llenarLibros();

function eliminarLibro(e) {
    myLibrary.splice(e.dataset.index, 1);
    console.log(e)
    myLib.removeChild(e.parentNode);
    console.log(myLibrary)
    
}

borrarBotones = document.querySelectorAll(".borrar");
console.log(borrarBotones);
borrarBotones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        
        eliminarLibro(e.target);

    });
});

let formulario = document.querySelector(".addingNewBook");
console.log(formulario.hidden);
const buttonNewBook = document.querySelector(".addBook");


function addNew() {
    if (formulario.hidden){
        formulario.hidden = false 
    }
    else {

        const newTitulo = document.querySelector(".titulo");
        const newAutor = document.querySelector(".autor");
        const newPaginas = document.querySelector(".paginas");
        let haveRead = document.querySelector("input[name='read']:checked").value;
        let newLibro = new book(newTitulo.value ,newAutor.value, newPaginas.value, haveRead);
        myLibrary.push(newLibro);
        const titulo = document.createElement("div");
        titulo.textContent = newTitulo.value;
        
        const autor = document.createElement("p");
        autor.textContent = newAutor.value;
        const pages = document.createElement("p");
        pages.textContent = newPaginas.value;
        const leido =  document.createElement("button");
        leido.textContent = haveRead;

        const borrar = document.createElement("button");
        borrar.textContent = "Delete"
        borrar.setAttribute("class", "borrar")
        borrar.dataset.index = myLibrary.indexOf(newLibro);
        borrar.addEventListener("click", (e) => {
        
            eliminarLibro(e.target);
    
        });
        
        const carta = document.createElement("div");
        carta.setAttribute("class", "card");
    
        carta.appendChild(titulo);
        carta.appendChild(autor);
        carta.appendChild(pages);
        carta.appendChild(leido);
        carta.appendChild(borrar);
        
        myLib.appendChild(carta);
        console.log(myLibrary);
        formulario.hidden = true;

    }
}

buttonNewBook.addEventListener("click", addNew);

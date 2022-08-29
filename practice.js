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
let otherBook1 = new book("Encyclopedia of Mathematics","James Stuart", 405, true)
let otherBook2 = new book("A Mathematical Introduction", "Herbert Enderton", 205, false)

myLibrary.push(goodBook);
myLibrary.push(otherBook1);
myLibrary.push(otherBook2);

let myLib = document.querySelector(".content")

function etiquetaLeido(cadena){
    if (cadena){
        return ["leido", "Read"]

    }
    else {
        return ["noleido", "Unread"]
    }
}
function llenarLibros() {
    console.log(myLibrary);
    
    for (const libro of myLibrary){
        const titulo = document.createElement("div");
        titulo.setAttribute("class", "titulo");
        titulo.textContent = libro.title;
        
        const autor = document.createElement("p");
        autor.textContent = `Autor: ${libro.author}`;
    
        const pages = document.createElement("p");
        pages.textContent = `Páginas: ${libro.pages}`;
        
        const botones = document.createElement("div");
        botones.setAttribute("class", "botones");

        const leido =  document.createElement("button");
        let clase, mensaje
        [clase, mensaje] = etiquetaLeido(libro.read);
        leido.setAttribute("id", clase);
        leido.textContent = mensaje;
        leido.dataset.index = myLibrary.indexOf(libro);
        leido.addEventListener("click", (e) =>{
            marcarLibro(e)
        });
    
        const borrar = document.createElement("button");
        borrar.textContent = "Delete";
        borrar.setAttribute("class", "borrar");
        borrar.dataset.index = myLibrary.indexOf(libro);
    
        const carta = document.createElement("div");
        carta.setAttribute("class", "card");

        carta.appendChild(titulo);
        carta.appendChild(autor);
        carta.appendChild(pages);
        botones.appendChild(leido);
        botones.appendChild(borrar);
        carta.appendChild(botones);
        
        myLib.appendChild(carta);
    }
}

llenarLibros();

function eliminarLibro(e) {
    myLibrary.splice(e.dataset.index, 1);
    console.log(e)
    myLib.removeChild(e.parentNode.parentNode);
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

function marcarLibro(e) {
    let cl, men;
    myLibrary[e.target.dataset.index].read =!myLibrary[e.target.dataset.index].read;
    [cl, men] = etiquetaLeido(myLibrary[e.target.dataset.index].read);
    e.target.setAttribute("id", cl);
    e.target.textContent = men;
}

function addNew() {
    if (formulario.hidden){
        formulario.hidden = false 
    }
    else {

        const newTitulo = document.querySelector(".newtitulo");
        const newAutor = document.querySelector(".autor");
        const newPaginas = document.querySelector(".paginas");
        let haveRead = document.querySelector("input[name='read']:checked").value;
        let newLibro = new book(newTitulo.value ,newAutor.value, newPaginas.value, haveRead);
        myLibrary.push(newLibro);

        const titulo = document.createElement("div");
        titulo.setAttribute("class", "titulo");
        titulo.textContent = newTitulo.value;
        
        const autor = document.createElement("p");
        autor.textContent = `Autor: ${newAutor.value}`;

        const pages = document.createElement("p");
        pages.textContent = `Páginas: ${newPaginas.value}`;

        const botones = document.createElement("div");
        botones.setAttribute("class", "botones");

        const leido =  document.createElement("button");
        let clase, mensaje
        [clase, mensaje] = etiquetaLeido(haveRead);
        leido.setAttribute("id", clase);
        leido.textContent = mensaje;
        leido.dataset.index = myLibrary.indexOf(newLibro);
        leido.addEventListener("click", (e) =>{
            marcarLibro(e);
          
        });
        

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
        botones.appendChild(leido);
        botones.appendChild(borrar);
        carta.appendChild(botones);

        myLib.appendChild(carta);
        console.log(myLibrary);
        formulario.hidden = true;

    }
}

buttonNewBook.addEventListener("click", addNew);

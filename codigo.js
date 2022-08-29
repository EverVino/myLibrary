class Book {
    constructor (title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    changeRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.libros = [];
        this.eLibreria = document.querySelector(".content");
    }

    addBook(book){
        this.libros.push(book);
        
        
    }

    removeBook(e){
        this.noMostrarLibros();
        this.libros.splice(e.dataset.index, 1);
        this.mostrarLibros();
    }

    noMostrarLibros() {
        while(this.eLibreria.firstChild){
            this.eLibreria.removeChild(this.eLibreria.lastChild)
           }
    }

    etiquetaLeido(cadena) {
        if (cadena){
            return ["leido", "Read"]
    
        }
        else {
            return ["noleido", "Unread"]
        }
    }

    marcarLibro(e){
        let cl;
        let men;
        this.libros[e.target.dataset.index].read =!this.libros[e.target.dataset.index].read;
        [cl, men] = this.etiquetaLeido(this.libros[e.target.dataset.index].read);
        e.target.setAttribute("id", cl);
        e.target.textContent = men;
    }
    mostrarLibros() {
               
        for (let libro of this.libros){
                        
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
            let clase;
            let mensaje;
            [clase, mensaje] = this.etiquetaLeido(libro.read);
            leido.setAttribute("id", clase);
            leido.textContent = mensaje;
            leido.dataset.index = this.libros.indexOf(libro);
            leido.addEventListener("click", (e) =>{
                this.marcarLibro(e);
            });
        
            const borrar = document.createElement("button");
            borrar.textContent = "Delete";
            borrar.setAttribute("class", "borrar");
            borrar.dataset.index = this.libros.indexOf(libro);
            borrar.addEventListener("click", (e) => { 
                this.removeBook(e.target);
            });
        
            const carta = document.createElement("div");
            carta.setAttribute("class", "card");
    
            carta.appendChild(titulo);
            carta.appendChild(autor);
            carta.appendChild(pages);
            botones.appendChild(leido);
            botones.appendChild(borrar);
            carta.appendChild(botones);
            
            this.eLibreria.appendChild(carta);
        }
    }
}

class Formulario {

    constructor(libreria){
        this.libreria = libreria;
        this.form = document.querySelector(".addingNewBook");
        
        this.botonNuevoLibro = document.querySelector(".addBook");
        this.botonNuevoLibro.addEventListener("click", () => {this.addNewBook()});
    }
    
    addNewBook() {
        
        if(this.form.hidden){
            this.form.hidden = false;
        }
        else {
            const newTitulo = document.querySelector(".newtitulo");
            const newAutor = document.querySelector(".autor");
            const newPaginas = document.querySelector(".paginas");
            let haveRead = document.querySelector("input[name='read']:checked").value;
            let newLibro = new Book(newTitulo.value ,newAutor.value, newPaginas.value, haveRead);
            this.libreria.libros.push(newLibro);

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
            [clase, mensaje] = this.libreria.etiquetaLeido(haveRead);
            leido.setAttribute("id", clase);
            leido.textContent = mensaje;
            leido.dataset.index = this.libreria.libros.indexOf(newLibro);
            leido.addEventListener("click", (e) =>{
                libreria.marcarLibro(e);
            
            });
            

            const borrar = document.createElement("button");
            borrar.textContent = "Delete"
            borrar.setAttribute("class", "borrar")
            borrar.dataset.index = this.libreria.libros.indexOf(newLibro);
            borrar.addEventListener("click", (e) => {
            
                libreria.removeBook(e.target);
        
            });
            
            const carta = document.createElement("div");
            carta.setAttribute("class", "card");
        
            carta.appendChild(titulo);
            carta.appendChild(autor);
            carta.appendChild(pages);
            botones.appendChild(leido);
            botones.appendChild(borrar);
            carta.appendChild(botones);

            libreria.eLibreria.appendChild(carta);
            this.form.hidden = true;
        }
    }   
}
// Creating some books
let b0 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
let b1 = new Book("Encyclopedia of Mathematics","James Stuart", 405, true);
let b2 = new Book("A Mathematical Introduction", "Herbert Enderton", 205, false);

let libreria = new Library();
libreria.addBook(b0);
libreria.addBook(b1);
libreria.addBook(b2);

libreria.mostrarLibros();

let eFormulario = new Formulario(libreria);


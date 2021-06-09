// TODO
// - style cards
//  - make so each one gets a unique color
//  - style fonts (size & family)
// * Add a button to each book to remove it from library
// * Add a read status switch to each book
// * Integrate local storage
// * Integrate firebase
// x Add New Book button


let myLibrary = []; // stores books

let addBookPopUpForm = document.querySelector("#overlay");

document.querySelector("#add-book-button").addEventListener("click", () => {
    addBookPopUpForm.style.display = "block";
});

document.querySelector("#quit-button").addEventListener("click", () => {
    addBookPopUpForm.style.display = "none";
});

document.querySelector("#new-book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(document.querySelector("#new-book-form"));
    addBookToLibrary(formData.get("title"),
        formData.get("author"),
        formData.get("pages"),
        formData.get("read"));
    addBookPopUpForm.style.display = "none";
    displayBooks();
});

// Book Object Constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "has been read" : "not read yet"}`

    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}


function addBookToLibrary(title, author, pagesCount, readCondition) {
    myLibrary.push(new Book(title, author, pagesCount, readCondition));
}

function displayBooks() {
    let libraryContainer = document.querySelector(".library-container");
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let card = document.createElement("div");
        card.classList.add("card");

        let title = document.createElement("h3");
        title.textContent = book.title;
        card.appendChild(title);

        let author = document.createElement("p");
        author.textContent = `by: ${book.author}`;
        card.appendChild(author);

        let pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`
        card.appendChild(pages)

        let read = document.createElement("p");
        read.textContent = (book.read) ? "Read" : "Not Read";
        card.appendChild(read);

        libraryContainer.appendChild(card);


    }
}

// temp hard core demo really
function demo() {
    addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
    addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
    addBookToLibrary("Don Quixote", "Miguel de Cervantes", 1072, false);
    addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
    displayBooks();
}

demo();
// TODO
// - style cards
//  - make so each one gets a unique color
//  - style fonts (size & family)
// * Add New Book button
// * Add a button to each book to remove it from library
// * Add a read status switch to each book
// * Integrate local storage
// * Integrate firebase


let myLibrary = []; // stores books

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
    myLibrary.forEach(book => {
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
    });
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
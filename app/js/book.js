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
// TODO
// - Code a CSS card
//  - write displayBooks()
//      - loops through array and displays each book in a table, each in card
// X Manually create some books & add them to the array

function addBookToLibrary(title, author, pagesCount, readCondition) {
    myLibrary.push(new Book(title, author, pagesCount, readCondition));
}

function displayBooks() {
    myLibrary.forEach(book => {
        console.log({ book });

    });
}


addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true)
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true)
addBookToLibrary("Don Quixote", "Miguel de Cervantes", 1072, false)
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false)
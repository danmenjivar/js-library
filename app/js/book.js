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
// - Manually create some books & add them to the array
// - Code a CSS card
//  - write displayBooks()
//      - loops through array and displays each book in a table, each in card


// Takes user input and stores new book object into an array
function addBookToLibrary() {

}

function displayBooks() {

}
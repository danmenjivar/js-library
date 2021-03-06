/* JS Virtual Library */

let myLibrary = []; // stores books

// Functions operating directly on library
function addBookToLibrary(title, author, pagesCount, readCondition) {
  myLibrary.push(new Book(title, author, pagesCount, readCondition));
  storeLibraryLocally();
}

function removeBookFromLibrary(indexToDelete) {
  //   console.log(`Before delete ${myLibrary}`);
  myLibrary.splice(indexToDelete, 1);
  //   console.log(`After delete ${myLibrary}`);
  storeLibraryLocally();
}

// Book Object Constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "has been read" : "not read yet"
    }`;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

// EventListeners for Adding Books
let addBookPopUpForm = document.querySelector("#add-overlay");

document.querySelector("#add-book-button").addEventListener("click", () => {
  addBookPopUpForm.style.display = "block";
});

document.querySelector("#quit-button").addEventListener("click", () => {
  addBookPopUpForm.style.display = "none";
});

addBookPopUpForm.addEventListener("click", (e) => {
  // check if the element that triggered this event (target) is the same
  // as the element the event listener is attached to (currentTarget)
  if (e.target === e.currentTarget) {
    addBookPopUpForm.style.display = "none";
  }
});

document.querySelector("#new-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(document.querySelector("#new-book-form"));
  addBookToLibrary(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read")
  );
  addBookPopUpForm.style.display = "none";
  displayBooks();
});

// EventListeners for Deleting Books
let removeBookPopUp = document.querySelector("#remove-overlay");

function removeBookHandler(e) {
  let cardIndex =
    e.target.parentElement.parentElement.getAttribute("data-index");
  promptDeleteWarning(cardIndex);
}

function promptDeleteWarning(indexToDelete) {
  let title = myLibrary[indexToDelete].title;
  let title_html = removeBookPopUp.querySelector(".title");
  title_html.innerHTML = `You are attempting to delete <i>${title}</i> for good.`;
  removeBookPopUp.style.display = "block"; // trigger prompt
  document.querySelector("#remove-submit-btn").addEventListener(
    "click",
    (e) => {
      removeBookFromLibrary(indexToDelete);
      displayBooks();
      removeBookPopUp.style.display = "none";
    },
    { once: true }
  );
}

document.querySelector("#remove-quit-btn").addEventListener("click", () => {
  removeBookPopUp.style.display = "none";
});

removeBookPopUp.addEventListener("click", (e) => {
  // check if the element that triggered this event (target) is the same
  // as the element the event listener is attached to (currentTarget)
  if (e.target === e.currentTarget) {
    removeBookPopUp.style.display = "none";
  }
});

// Event Listeners for changing read status
function handleReadStatus(e) {
  let cardIndex =
    e.target.parentElement.parentElement.parentElement.getAttribute(
      "data-index"
    );
  toggleReadStatus(cardIndex);
}

function toggleReadStatus(index) {
  //   console.log(`Before, read = ${myLibrary[index].read}`);
  myLibrary[index].read = !myLibrary[index].read;
  //   console.log(`After, read = ${myLibrary[index].read}`);
}

function displayBooks() {
  let libraryContainer = document.querySelector(".library-container");
  libraryContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", i);
    card.style.backgroundColor = backgroundColorPicker(i);

    let card_header = document.createElement("div");
    card_header.classList.add("header");

    let remove_icon = document.createElement("span");
    remove_icon.textContent = "close";
    remove_icon.classList.add("material-icons");

    remove_icon.addEventListener("click", (e) => removeBookHandler(e));

    card_header.appendChild(remove_icon);

    let read = document.createElement("label");
    read.classList.add("switch");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = book.read;
    read.appendChild(checkbox);
    checkbox.addEventListener("click", (e) => handleReadStatus(e));
    let slider = document.createElement("span");
    slider.classList.add("slider", "round");
    read.appendChild(slider);
    card_header.appendChild(read);

    // old read
    // let read = document.createElement("p");
    // read.classList.add("title");
    // read.textContent = (book.read) ? "Read" : "Not Read";
    // card_header.appendChild(read);

    card.appendChild(card_header);

    let title = document.createElement("h3");
    title.textContent = book.title;
    card.appendChild(title);

    let author = document.createElement("p");
    author.textContent = book.author;
    card.appendChild(author);

    let pages = document.createElement("p");
    pages.classList.add("pages");
    pages.textContent = `${book.pages} pages`;
    card.appendChild(pages);

    libraryContainer.appendChild(card);
  }
}

function backgroundColorPicker(index) {
  const colors = ["2994ab", "ab4129", "93ab29", "4129ab"];
  return `#${colors[index % 4]}`;
}

// handler for Demo Button
function demo() {
  myLibrary = []; // empty library to prevent duplicates
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
  addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
  addBookToLibrary("Don Quixote", "Miguel de Cervantes", 1072, false);
  addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
  displayBooks();
}

// Event Listener for Demo Button
document.querySelector("#demo-btn").addEventListener("click", () => demo());

// handler for clear button
function clearAll() {
  localStorage.clear();
  location.reload();
}

// Event Listener for Clear Button
document
  .querySelector("#clear-btn")
  .addEventListener("click", () => clearAll());

// Local Storage
function storeLibraryLocally() {
  let library = JSON.stringify(myLibrary);
  localStorage.setItem("myLibrary", library);
}

function populateStorage() {
  let library = JSON.parse(localStorage.getItem("myLibrary") || "[]");
  myLibrary = library;
  displayBooks();
}

window.onload = populateStorage();

const library = [];
const dialog = document.querySelector("dialog");
const openButton = document.querySelector("button#open");
const closeButton = document.querySelector("button#close");
const addButton = document.querySelector("button#add");
const titleInput = document.querySelector("input#title");
const authorInput = document.querySelector("input#author");
const progressButtons = [...document.querySelectorAll('input[type="radio"]')];

function Book(title, author, readingState) {
  this.title = title;
  this.author = author;
  this.readingState = readingState;

  this.bookIndex = function () {
    return library.indexOf(this);
  };
  this.addToLibrary = function () {
    library.push(this);
  };
  this.removeFromLibrary = function () {
    library.splice(cookingBook.bookIndex(), 1);
  };
}

function clearValue(input) {
  input.value = "";
}
function createBook() {
    const title = titleInput.value;
    const author = authorInput.value;
    const progress = progressButtons.filter((button) => {
      if (button.checked) {
        return button;
      }
    })[0].value;
    return new Book(title, author, progress)
}

openButton.addEventListener("click", () => {
  dialog.showModal();
});
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearValue(titleInput);
  clearValue(authorInput);
  dialog.close();
});

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (titleInput.value === "" || authorInput.value === "") {
    alert("Please fill all the fields.");
  } else {
    const newBook = createBook();
    newBook.addToLibrary();
}
});

// const gamerBook = new Book('gaming book', 'gamer author', 'reading');
// const cookingBook = new Book('cooking book', 'chef author', 'not started');

// gamerBook.addToLibrary();
// cookingBook.addToLibrary();
// cookingBook.removeFromLibrary();
// console.log(cookingBook.bookIndex());

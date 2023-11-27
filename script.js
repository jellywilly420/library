const library = [];
const main = document.querySelector('main');
const dialog = document.querySelector("dialog");
const openButton = document.querySelector("header button#open");
const closeButton = document.querySelector("button#close");
const addButton = document.querySelector("button#add");
const titleInput = document.querySelector("input#title");
const authorInput = document.querySelector("input#author");
const progressButtons = [...document.querySelectorAll('input[type="radio"]')];
const requiredTitle = document.querySelector('.title-container .required-title');
const requiredAuthor = document.querySelector('.author-container .required-author');

const div = document.createElement('div');
div.classList.add('card');
const h2 = document.createElement('h2');
const p = document.createElement('p');
const button = document.createElement('button');

function Book(title, author, readingProgress) {
  this.title = title;
  this.author = author;
  this.readingProgress = readingProgress;

  this.bookIndex = function () {
    return library.indexOf(this);
  };
  this.addToLibrary = function () {
    library.push(this);
    const cardNode = div.cloneNode();
    const titleNode = h2.cloneNode();
    const autherNodeP = p.cloneNode();
    const progressNode = p.cloneNode();
    const removeButton = button.cloneNode();
    const changeProgressButton = button.cloneNode();
    titleNode.innerText = this.title;
    autherNodeP.innerText = 'by ' + this.author;
    progressNode.innerText = this.readingProgress;
    progressNode.classList.add('progress-node');
    removeButton.classList.add('delete-button');
    removeButton.innerText = "remove book";
    changeProgressButton.classList.add('change-progress-button');
    changeProgressButton.innerText = "change progress";
    cardNode.setAttribute('data-title', this.title);
    cardNode.appendChild(progressNode);
    cardNode.appendChild(titleNode);
    cardNode.appendChild(autherNodeP);
    cardNode.appendChild(changeProgressButton);
    cardNode.appendChild(removeButton);
    main.appendChild(cardNode);

    removeButton.addEventListener('click',()=>{
        this.removeFromLibrary()
    })
    changeProgressButton.addEventListener('click', ()=>{
        if(this.readingProgress === 'to read') {
            this.readingProgress = 'reading';
        }
        else if(this.readingProgress === 'reading') {
            this.readingProgress = 'finished reading';
        }
        else {
            this.readingProgress = 'to read';
        }
        for (const progressNode of main.querySelectorAll('p.progress-node')) {
            if (progressNode.parentElement.getAttribute('data-title') === this.title) {
                progressNode.innerText = this.readingProgress;
            }
        }
    })
  };
  this.removeFromLibrary = function () {
    library.splice(this.bookIndex(), 1);
    for (const card of main.childNodes) {
        if (card.getAttribute('data-title') === this.title) {
            main.removeChild(card);
        }
    }
  };
}

function clearValues() {
  titleInput.value = "";
  authorInput.value = "";
  progressButtons[0].click();
}
function createBook() {
  const title = titleInput.value;
  const author = authorInput.value;
  const progress = progressButtons.filter((button) => {
    if (button.checked) {
      return button;
    }
  })[0].value;
  return new Book(title, author, progress);
}
// function getBookFromTitle(title) {
//     for (const book of library) {
//         if (book.title === title) {
//             return book;
//         }
//     }
// }
openButton.addEventListener("click", () => {
  dialog.showModal();
});
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearValues();
  requiredAuthor.classList.add('hidden');
  requiredTitle.classList.add('hidden');
  dialog.close();
});
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (authorInput.value === "" && titleInput.value === "") {
    requiredTitle.classList.remove('hidden');
    requiredAuthor.classList.remove('hidden');
  } 
  else if (titleInput.value === "") {
    requiredTitle.classList.remove('hidden');
  }
  else if (authorInput.value === "") {
    requiredAuthor.classList.remove('hidden');
  }
  else {
    let bookInLibrary = false;
    for (const book of library) {
      if (book.title === titleInput.value && book.author === authorInput.value) {
        bookInLibrary = true;
      }
    }
    if (bookInLibrary) {
      alert (`${titleInput.value} by ${authorInput.value} is already in the library.`);
      clearValues();
    }
    else {
      createBook().addToLibrary();
      clearValues();
    }
  }
});
titleInput.addEventListener('focus', ()=>{
  if (!requiredTitle.classList.contains('hidden')) {
    requiredTitle.classList.add('hidden');
  }
})
authorInput.addEventListener('focus', ()=>{
  if (!requiredAuthor.classList.contains('hidden')) {
    requiredAuthor.classList.add('hidden');
  }
})

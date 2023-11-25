const library = [];
function Book(title, author, readingState){
    this.title = title;
    this.author = author;
    this.readingState = readingState;

    this.bookIndex = function() {
        // if (library.indexOf(this) === -1) {
        //     return null;
        // }
        return library.indexOf(this);
    }
    this.addToLibrary = function() {
        library.push(this);
    }
    this.removeFromLibrary = function() {
        library.splice(cookingBook.bookIndex(), 1);
    }
};

// const gamerBook = new Book('gaming book', 'gamer author', 'reading');
// const cookingBook = new Book('cooking book', 'chef author', 'not started');

// gamerBook.addToLibrary();
// cookingBook.addToLibrary();
// cookingBook.removeFromLibrary();
// console.log(cookingBook.bookIndex());


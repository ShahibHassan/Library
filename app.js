//create an array to store book objects
const myLibrary = [];

//create a constructor for Books
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID(); // unique identifier
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//create a function addBookToLibrary()
function addBookToLibrary(title, author, pages, read) {
  //create a book from those arguments
  const book = new Book(title, author, pages, read);
  // console.log(book);
  //store book into an array
  myLibrary.push(book);
}

//create a function whic loops through array and displays each book
function displayBooks() {
  const container = document.querySelector('.container');
  myLibrary.forEach((book) => {
    console.log(book.title);
  });
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', '295', 'not read yet');
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', '281', 'not read yet');
addBookToLibrary('Pride and Prejudice', 'Jane Austen', '432', 'read');

// console.log(myLibrary);

displayBooks();

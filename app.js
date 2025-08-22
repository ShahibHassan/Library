//create an array to store book objects
const myLibrary = [];
const container = document.querySelector('.container');

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
  myLibrary.forEach((book) => {
    console.log('ID: ' + book.id + ', Book Title:' + book.title);
    //create a div class card which stores each book
    let card = document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);

    //title
    let bookTitle = document.createElement('div');
    bookTitle.classList.add('title');
    card.appendChild(bookTitle);
    bookTitle.innerHTML = book.title;

    //author
    let bookAuthor = document.createElement('div');
    bookAuthor.classList.add('author');
    card.appendChild(bookAuthor);
    bookAuthor.innerHTML = book.author;

    //pages
    let bookPages = document.createElement('div');
    bookPages.classList.add('pages');
    card.appendChild(bookPages);
    bookPages.innerHTML = book.pages;

    //read status
    let bookRead = document.createElement('div');
    bookRead.classList.add('read-status');
    card.appendChild(bookRead);
    bookRead.innerHTML = book.read;
  });
}

console.log(container);

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', '295', 'not read yet');
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', '281', 'not read yet');
addBookToLibrary('Pride and Prejudice', 'Jane Austen', '432', 'read');

// console.log(myLibrary);

displayBooks();

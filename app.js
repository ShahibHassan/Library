//create an array to store book objects
let myLibrary = [];

//DOM Elements
const container = document.querySelector('.container');
const dialog = document.getElementById('book-dialog');
const newBookBtn = document.getElementById('new-book-btn');
const closeDialogBtn = document.getElementById('close-dialog');
const form = document.getElementById('book-form');
const darkModeBtn = document.getElementById('darkmode-btn');

// Book Constructor
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor Book");
  }
  this.id = crypto.randomUUID(); // unique identifier
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; // 'Read' or 'Not Yet Read'
}

//create a function addBookToLibrary()
function addBookToLibrary(title, author, pages, read) {
  //create a book from those arguments
  const book = new Book(title, author, pages, read);
  //store book into an array
  myLibrary.push(book);
}

//create a function whic loops through array and displays each book
function displayBooks() {
  //remove any old cards, but keep the nav and the header
  container.querySelectorAll('.card').forEach((card) => card.remove());

  myLibrary.forEach((book) => {
    //create a div class card which stores each book
    let card = document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);

    //add index number as data attribute for easy removal
    card.dataset.uniqueid = book.id;

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
    bookRead.textContent = book.read;
    card.appendChild(bookRead);

    let changeStatusBtn = document.createElement('button');
    changeStatusBtn.className = 'change-book-status';
    card.appendChild(changeStatusBtn);
    changeStatusBtn.innerHTML = 'Change Status';

    let removeBookBtn = document.createElement('button');
    removeBookBtn.className = 'remove-book-btn';
    card.appendChild(removeBookBtn);
    removeBookBtn.innerHTML = 'Remove Book';
  });
}

function newBook() {
  //open dialog on newbook btn
  newBookBtn.addEventListener('click', () => {
    form.reset();
    dialog.showModal();
  });

  //cancel dialog
  closeDialogBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
  });

gi  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formTitle = document.getElementById('book-title').value;
    const formAuthorName = document.getElementById('author-name').value;
    const formBookPages = document.getElementById('book-pages').value;
    const read = form.querySelector("input[name='read-status']:checked").value;

    if (isNaN(formBookPages) || formBookPages <= 0) {
      alert('Please enter a valid number of pages greater than 0.');
      return;
    }

    addBookToLibrary(formTitle, formAuthorName, formBookPages, read);
    displayBooks();
    form.reset();
    dialog.close();
  });
}

function libraryActions() {
  container.addEventListener('click', (e) => {
    //Find card that was clicked
    const card = e.target.closest('.card');
    if (!card) return; //ignore any clicks not inside card

    const bookID = card.dataset.uniqueid; //get the books id

    //REMOVE BOOK
    if (e.target.classList.contains('remove-book-btn')) {
      //remove from array using filter
      myLibrary = myLibrary.filter((book) => book.id !== bookID);
      card.remove();

      console.log('removed book with id:', bookID);
    }

    //CHANGE READ STATUS
    if (e.target.classList.contains('change-book-status')) {
      const book = myLibrary.find((b) => b.id === bookID);
      if (book) {
        book.read = book.read === 'Read' ? 'Not Yet Read' : 'Read';
        const readDiv = card.querySelector('.read-status');
        readDiv.textContent = book.read;
        console.log(`Book "${book.title}" is now: ${book.read}`);
      }
    }
  });
}

function darkMode() {
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('darkmode-enabled');

    if (document.body.classList.contains('darkmode-enabled')) {
      darkModeBtn.textContent = 'Enable Lightmode';
    } else {
      darkModeBtn.textContent = 'Enable Darkmode';
    }
  });
}

function loadApp() {
  addBookToLibrary('The Hobbit', 'J.R.R Tolkien', '295', 'Not Yet Read');
  addBookToLibrary(
    'To Kill a Mockingbird',
    'Harper Lee',
    '281',
    'Not Yet Read'
  );
  addBookToLibrary('Pride and Prejudice', 'Jane Austen', '432', 'Read');

  displayBooks();
  newBook();
  libraryActions();
  darkMode();
}

loadApp();

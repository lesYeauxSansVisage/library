const DEFAULT_DATA = [
  {
    title: "The Brothers Karamazov",
    author: "Dostoevsky",
    pageNumber: 800,
    read: false,
  },
  {
    title: "Crime and Punishment",
    author: "Dostoevsky",
    pageNumber: 600,
    read: true,
  },
];

const library = [...DEFAULT_DATA];

function Book(
  title: string,
  author: string,
  pageNumber: string,
  read: boolean
) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.read = read;
}

Book.prototype.logInfo = function () {
  return `${this.title}, by ${this.author}. Number of Pages: ${
    this.pageNumber
  }. ${this.read ? "You have read this book." : "Not read yet."}`;
};

const addBookToLibrary = (book) => {
  library.push(book);
};

const bookForm = document.querySelector("#book-form");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = (<HTMLInputElement>document.querySelector("#name")).value;
  const author = (<HTMLInputElement>document.querySelector("#author")).value;
  const pageNumber = (<HTMLInputElement>document.querySelector("#page-number"))
    .value;
  const isRead = (<HTMLInputElement>document.querySelector("#read")).checked;
  addBookToLibrary(new Book(name, author, pageNumber, isRead));

  showBooks();
});

const showBooks = () => {
  bookList.innerHTML = "";

  library.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.innerText = `${book.title}, by ${
      book.author
    }. Number of Pages: ${book.pageNumber}. ${book.read ? "Read" : "Not read"}`;
    bookList.append(bookElement);
  });
};

const bookList = document.querySelector("#book-list");

showBooks();

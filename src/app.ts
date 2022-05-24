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

interface Book {
  title: string;
  author: string;
  pageNumber: number;
  read: boolean;
}

Book.prototype.logInfo = function () {
  return `${this.title}, by ${this.author}. Number of Pages: ${
    this.pageNumber
  }. ${this.read ? "You have read this book." : "Not read yet."}`;
};

Book.prototype.toggleRead = function () {
  this.read ? (this.read = false) : (this.read = true);
};

const library = [];

if (localStorage.getItem("library")) {
  const localBooks = JSON.parse(localStorage.getItem("library"));
  library.push(
    ...localBooks.map((book) => {
      return new Book(book.title, book.author, book.pageNumber, book.read);
    })
  );
}

const addBookToLibrary = (book: Book) => {
  library.push(book);
  updateLocalStorage();
};

const bookForm = <HTMLFormElement>document.querySelector("#book-form");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = (<HTMLInputElement>document.querySelector("#name")).value;
  const author = (<HTMLInputElement>document.querySelector("#author")).value;
  const pageNumber = (<HTMLInputElement>document.querySelector("#page-number"))
    .value;
  const isRead = (<HTMLInputElement>document.querySelector("#read")).checked;
  addBookToLibrary(new Book(name, author, pageNumber, isRead));

  showBooks();
  bookForm.classList.remove("show");
  backdrop.style.display = "none";

  bookForm.reset();
});

const showBooks = () => {
  const bookGrid = document.querySelector(".books-grid");

  bookGrid.innerHTML = "";

  library.forEach((book, index) => {
    bookGrid.innerHTML += createBookElement(book, index);
  });

  const readButtons = document.querySelectorAll(".read-button");
  readButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.parentElement.dataset.index;
      library[index].toggleRead();
      showBooks();
      updateLocalStorage();
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.parentElement.dataset.index;
      deleteBookFromLibrary(index);
      updateLocalStorage();
    });
  });
};

const addButton = document.querySelector("#add-book");

addButton.addEventListener("click", () => {
  bookForm.classList.add("show");
  backdrop.style.display = "block";
  console.log("added");
});

const backdrop = <HTMLDivElement>document.querySelector(".backdrop");

backdrop.addEventListener("click", () => {
  bookForm.classList.remove("show");
  backdrop.style.display = "none";
});

// bookTable.addEventListener("click", (e) => {
//   //deletes the book from the library
//   if (e.target.classList.contains("read-button")) {
//     const idx = e.target.parentElement.parentElement.dataset.index;
//     library.splice(idx, 1);
//     showBooks();
//   }
// });

showBooks();

function createBookElement(book: Book, index: number): string {
  return `
    <div class="book-card" data-index="${index}">
      ${book.read ? '<span class="read-badge">READ</span>' : ""}
      <div class="book-info">
        <h2 class="book-title">${book.title}</h2>
        <p class="book-author">${book.author}</p>
       <p class="book-page-number">Number of pages: ${book.pageNumber}</p>
      </div>
      <button class="read-button"><i class="fa fa-check" aria-hidden="true"></i>
      </button>
      <button class="delete-button"><i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
    `;
}

function deleteBookFromLibrary(index) {
  library.splice(index, 1);
  showBooks();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
  console.log("updated");
}

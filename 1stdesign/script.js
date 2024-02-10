let books = [];

const modal = document.querySelector(".modal-overlay");

// modal buttons
const newBookButton = document.getElementById("new-book-btn");
const closeModalButton = document.getElementById("close-modal-btn");

// form
const form = document.getElementById("new-book-form");
const closeForm = document.getElementById("close-form");

(function () {
  const inputs = document.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "checkbox") {
      inputs[i].checked = false;
    }
  }
})();

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = new Date().getTime().toString();
}

function closeModal() {
  modal.classList.remove("show-modal");
}

function openModal() {
  modal.classList.add("show-modal");
}

newBookButton.addEventListener("click", () => {
  openModal();
});

closeModalButton.addEventListener("click", () => {
  closeModal();
});

closeForm.addEventListener("click", () => {
  closeModal();
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;

  const book = new Book(title, author, pages, isRead);

  books.push(book);
  setBooksToLocalStorage(books);

  displayBook();

  form.reset();
  closeModal();
});

function displayBook() {
  const listBooks = document.querySelector(".list-books");
  listBooks.innerHTML = "";

  if (books.length > 0) {
    showEmptyState(false);
  }

  books.forEach((book, i) => {
    const cardBook = `
    <article class="card" index="${i}">
      <div class="read-status ${
        book.isRead && "show-read-status"
      }" id="read-status">
        <div class="checked">✅</div>
        <span>Read</span>
      </div>
      
      <h2 class="book-title">${book.title}</h2>
      <p class="author">${book.author}</p>

      <footer class="card-footer">
        <div class="pages-info">
          <i class="ph-bold ph-book-open-text"></i>
          <span>${book.pages} page(s)</span>
        </div>

        <button onClick="removeBook(${book.id})" data-id=${
      book.id
    } id="remove-book" class="btn secondary">
          Remove
        </button>
      </footer>
    </article>
    `;

    listBooks.insertAdjacentHTML("beforeend", cardBook);
  });
}

function removeBook(bookId) {
  books = books.filter((book) => book.id !== bookId.toString());
  setBooksToLocalStorage(books);

  if (books.length > 0) {
    displayBook();
  } else {
    showEmptyState(true);
    const listBooks = document.querySelector(".list-books");
    listBooks.innerHTML = "";
  }
}

function showEmptyState(show) {
  const emptyState = document.getElementById("empty-state");
  emptyState.style.display = show ? "flex" : "none";
}

function setBooksToLocalStorage(books) {
  localStorage.setItem("@my-books:list", JSON.stringify(books));
}

(function () {
  const listBooks = JSON.parse(localStorage.getItem("@my-books:list"));
  if (listBooks) {
    books = listBooks;
    displayBook();
  }
})();
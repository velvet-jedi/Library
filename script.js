// const myLibrary = [];
let myLibrary = [];

const modal = document.querySelector('.modal-overlay');
// modal buttons
const newBookButton = document.querySelector('.newBook-btn');
const closeModalButton = document.querySelector('.close-modal-btn');

const body = document.body;
const themeCheckbox = document.getElementById('theme');

// form
const form = document.getElementById('new-book-form');
const closeFormButton = document.getElementById('close-form-btn');

const blurElements = document.querySelectorAll('.blurry');

function closeModal() {
    modal.classList.remove("show-modal");
    blurElements.forEach(el => {
      el.classList.remove('blur');
    }); 
  }
  
  function openModal() {
    modal.classList.add("show-modal");
    blurElements.forEach(el => {
      el.classList.add('blur');
    }); 

    body.style.background = themeCheckbox.checked ? 'var(--night-background)' : 'var(--day-background)';

        themeCheckbox.addEventListener('change', () => {
          body.style.background = themeCheckbox.checked
              ? 'var(--night-background)'
              : 'var(--day-background)';
      });
    
  }

newBookButton.addEventListener("click", () => {
    openModal();
});

closeModalButton.addEventListener("click", () => {
    closeModal();
});

closeFormButton.addEventListener("click", () => {
    closeModal();
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    const isRead = document.getElementById("read").checked;
    const book = new Book(title, author, pages, isRead);

    myLibrary.push(book);
    setBooksToLocalStorage(myLibrary);
    
    displayBook();

    form.reset();
    closeModal();
});

function displayBook() {
  const listBooks = document.querySelector('.list-books');
  listBooks.innerHTML = "";

  if(myLibrary.length > 0) {
    showEmptyState(false);
  }
  // console.log(myLibrary);
  myLibrary.forEach((book, index) => {
    const cardBook = `<article class="card" index="${index}">
    <label class="Switch">Finished
    <div class="Switch-inner">
      <input type="checkbox" ${book.isRead ? 'checked' : ''} onchange="toggleRead(${index})">
      <div class="Switch-bg"></div>
      <div class="Switch-handle"></div>
    </div>
  </label>
                      <h2 class="book-title">${book.title}</h2>
                      <p class="author">${book.author}</p>
                      
                      <footer class="card-footer">
                        <div class="pages-info">
                          <i class="ph-bold ph-book-open-text"></i>
                          <span>${book.pages} page(s)</span>
                        </div>
                        
                        <button onclick="removeBook(${book.id})" class="btn" id="remove-book">Remove</button>

                      </footer>
                  <article>`;
                  listBooks.insertAdjacentHTML("beforeend", cardBook);
  });
}

function removeBook(bookId){
  myLibrary = myLibrary.filter((book) => book.id !== bookId.toString());
  setBooksToLocalStorage(myLibrary);

  if (myLibrary.length > 0) {
    displayBook();
  } else {
    showEmptyState(true);
    const listBooks = document.querySelector(".list-books");
    listBooks.innerHTML = "";
  }
}

function Book(title, author, pages, isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = new Date().getTime().toString();
}

function setBooksToLocalStorage(myLibrary) {
  localStorage.setItem("@my-books:list", JSON.stringify(myLibrary));
}


function showEmptyState(show) {
  const emptyState = document.querySelector('.emptyShelf');
  emptyState.style.display = show ? 'flex' : 'none';
}

function toggleRead(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead;
  setBooksToLocalStorage(myLibrary);
}

(function () {
  const listBooks = JSON.parse(localStorage.getItem("@my-books:list"));
  if(listBooks){
    myLibrary = listBooks;
    displayBook();
  }
})();

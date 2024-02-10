const myLibrary = [];

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
      // body.style.background='var(--day-background)';
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


form.addEventListener('submit', function (event) {
    event.preventDefault();
});



function Book(title, author, pages, isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = new Date().getTime().toString();
}

function addBookToLibrary() {
  // do stuff here
}


function showEmptyState(show) {
  const emptyState = document.querySelector('.emptyShelf');
  emptyState.style.display = show ? 'flex' : 'none';
}
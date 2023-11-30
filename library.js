const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function renderBook() {
  const libraryBook = document.querySelector("#library");
  libraryBook.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement("div");
    const cardClass = book.read ? "read" : "not-read";
    bookEl.innerHTML = `<div class="card ${cardClass}" id="card">
        <div class="author"><b>Author:</b><br />${book.author}</div>
        <div class="title"><b>Title:</b><br />"${book.title}"</div>
        <div class="pages"><b>Pages:</b><br />${book.pages}</div>    
        <button class="toggle-read ${book.read ? "read" : "not-read"}">${
      book.read ? "Read" : "Not read"
    }</button>
        <div class="remove-btn"> REMOVE </div>
      </div>`;
    libraryBook.appendChild(bookEl);

    const toggleReadButton = bookEl.querySelector(".toggle-read");
    toggleReadButton.addEventListener("click", function () {
      book.toggleReadStatus();
      renderBook();
    });

    const removeButton = bookEl.querySelector(".remove-btn");
    removeButton.addEventListener("click", function () {
      myLibrary.splice(i, 1);
      renderBook();
    });
  }
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
  renderBook();
}

const newBookBtn = document.getElementById("new-book");
const modal = document.getElementById("popUpForm");
const closeModalBtn = document.getElementById("cancel");
const modalForm = document.getElementById("form");

newBookBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

modalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(author, title, pages, read);

  modal.style.display = "none";

  const inputs = document.querySelectorAll("#title, #author, #pages, #read");
  inputs.forEach((input) => {
    input.value = "";
  });
});

let myLibrary = [];
let form = document.getElementsByClassName("form-wrap");
//track place in myLibrary, which books have already been added
let bookmark = 0;

class Book {
  constructor(author, title, pages, dateFinished, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.dateFinished = dateFinished;
    this.readStatus = readStatus;
  }
};

const initialize = (() => {
  const newBook = document.querySelector('.new-book');
  newBook.addEventListener("click", showNewBookForm);
})();

function addBooksToLib() {
  const tbody = document.getElementsByTagName("tbody")[0];
  for (let i = bookmark; i < myLibrary.length; i++) {
    const row = document.createElement("tr");
    for (const prop in myLibrary[i]) {
      let obj = myLibrary[i];
      const cell = document.createElement("td");
      const cellText = document.createTextNode(`${obj[prop]}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    //create delete button
    const delButton = document.createElement("button");
    delButton.className = "delButton";
    delButton.innerHTML = "delete book";
    delButton.id = `${i}`;
    delButton.addEventListener("click", deleteBook);
    row.appendChild(delButton);
    //create read button
    const readButton = document.createElement("button");
    readButton.innerHTML = "read book";
    readButton.className = "readButton";
    readButton.id = `r${i}`;
    readButton.addEventListener("click", readBook);
    row.appendChild(readButton);
    //name and append row
    row.className = `row${i}`;
    tbody.appendChild(row);
    bookmark += 1;
  }
}

function showNewBookForm() {
  form[0].style.display = "block";
  //create form listener
  const submitBtn = document.querySelector(".submit");
  submitBtn.addEventListener("click", handleSubmit);
}

function handleSubmit(event) {
  const bookToAdd = document.querySelectorAll("input");
  myLibrary.push(
    new Book(
      bookToAdd[0].value,
      bookToAdd[1].value,
      bookToAdd[2].value,
      bookToAdd[3].value,
      bookToAdd[4].value
    )
  );
  form[0].style.display = "none";
  addBooksToLib();
  event.preventDefault();
}

function deleteBook(event) {
  let rowNum = parseInt(event.target.id);
  //remove data from library array
  myLibrary.splice(rowNum);
  let bookForDeletion = document.querySelector(`.row${rowNum}`);
  bookForDeletion.remove();
  bookmark -= 1;
  addBooksToLib();
}

function readBook(event) {
  let rowNum = parseInt(event.target.id.slice(1));
  myLibrary[rowNum].readStatus = "read";
  document.querySelector(`.row${rowNum}>td:last-of-type`).innerHTML = "read";
}
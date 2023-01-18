let myLibrary = [];

// book constructor
function Book(author, title, pages, readStatus) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(author, title, pages, readStatus) {
  // make new book object, add obj to array myLibrary
  myLibrary.push(new Book(author, title, pages, readStatus));
}

function displayBooks() {
    const tbody = document.getElementsByTagName("tbody")[0];
    for (let i = 0; i < myLibrary.length; i++) {
        const row = document.createElement("tr");

        for (const prop in myLibrary[i]) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(`${myLibrary[i][prop]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
}

function showNewBookForm() {
    let form = document.getElementsByClassName("form-wrap");
    form[0].style.display = "block";
}

addBookToLibrary('Patrick Rothfuss', 'The Name of the Wind', '662', 'read');
addBookToLibrary('Patrick Rothfuss', 'The Wise Man\'s fear', '994', 'read');
addBookToLibrary('Patrick Rothfuss', 'The Doors of Stone', 'unknown', 'not read');
displayBooks();
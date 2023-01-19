let myLibrary = [];
let form = document.getElementsByClassName("form-wrap");
//track place in myLibrary, which books have already been added
let bookmark = 0;

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

function addBooksToLib() {
    const tbody = document.getElementsByTagName("tbody")[0];
    for (let i = bookmark; i < myLibrary.length; i++) {
        const row = document.createElement("tr");

        for (const prop in myLibrary[i]) {
            let obj = myLibrary[i] ;
                const cell = document.createElement("td");
                const cellText = document.createTextNode(`${obj[prop]}`);
                console.log(cellText);
                cell.appendChild(cellText);
                row.appendChild(cell);
        }
        //create delete button
        const delButton = document.createElement("button")
        delButton.className = 'delButton';
        delButton.id = `${i}`;
        delButton.addEventListener("click", deleteBook);
        row.appendChild(delButton);
        //create read button
        const readButton = document.createElement("button")
        readButton.className = 'readButton';
        readButton.id = `r${i}`;
        readButton.addEventListener("click", readBook)
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
    myLibrary.push(new Book(
        bookToAdd[0].value,
        bookToAdd[1].value,
        bookToAdd[2].value,
        bookToAdd[3].value
    ))
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
    let rowNum = parseInt((event.target.id).slice(1));
    console.log(myLibrary[rowNum].readStatus, myLibrary[rowNum])
    myLibrary[rowNum].readStatus = 'read';
    console.log(myLibrary[rowNum].readStatus, myLibrary[rowNum])
    document.querySelector(`.row${rowNum}>td:last-of-type`).innerHTML = 'read';
    }

addBookToLibrary('Patrick Rothfuss', 'The Name of the Wind', '662', 'read');
addBookToLibrary('Patrick Rothfuss', 'The Wise Man\'s fear', '994', 'read');
addBookToLibrary('Patrick Rothfuss', 'The Doors of Stone', 'unknown', 'not read');
addBooksToLib();
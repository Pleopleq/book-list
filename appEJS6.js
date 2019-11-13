class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const bookList = document.getElementById('book-list')
        //create a tr element
        const row = document.createElement('tr');
        //Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`
        ;
        bookList.appendChild(row)
    }

    showAlert(msg, className){
        //create a div
        const div = document.createElement('div');
        //add class name
        div.className = `alert ${className}`;
        //add text
        div.appendChild(document.createTextNode(msg));
        //insert in dom
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        //insert alert
        container.insertBefore(div, form);
        //removing the alert before 3 segs
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000)
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//LOCAL STORAGE
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function (book){
            const ui = new UI;
            //add book to UI
            ui.addBookToList(book);
        });
    }
    
    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
        if(book.isbn === isbn){
            books.splice(index,1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks);


/////////////////////////////////
document.getElementById('book-form').addEventListener('submit', function(event){
//get form values
const title     = document.querySelector('#title').value,
author    = document.querySelector('#author').value,
isbn      = document.querySelector('#isbn').value;

//creating a new book object
const book = new Book(title,author,isbn);

//creating a ui object to store the new book
const uiList = new UI();

//validate
if(title === '' || author === '' || isbn ===''){
    //error alert
    uiList.showAlert('Please fill in all fields', 'error')
} else {
//add book to list
    uiList.addBookToList(book);
//add to LS
Store.addBook(book);

//clear fields
    uiList.clearFields();
//show success
    uiList.showAlert('Book added!', 'success')
}
    event.preventDefault();
});


//event listener for delete button
document.getElementById('book-list').addEventListener('click', function(event){
    const ui = new UI();
    //delete book
    ui.deleteBook(event.target);
    //remove from local storage
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

    //show alert
    ui.showAlert('Book removed', 'success');
event.preventDefault();
});

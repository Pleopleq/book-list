//book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn   = isbn;
}
//UI constructor
function UI(){}

//add book to List
UI.prototype.addBookToList = function(book){
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
//show alert
UI.prototype.showAlert = function(msg, className){
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

//delete button
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//event listener for add book
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
    //show alert
    ui.showAlert('Book removed', 'success');
event.preventDefault();
})

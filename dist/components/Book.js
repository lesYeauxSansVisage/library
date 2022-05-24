function Book(title, author, pageNumber, read) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.read = read;
}
Book.prototype.logInfo = function () {
    return `${this.title}, by ${this.author}. Number of Pages: ${this.pageNumber}. ${this.read ? "You have read this book." : "Not read yet."}`;
};
Book.prototype.toggleRead = function () {
    this.read ? (this.read = false) : (this.read = true);
};
export default Book;

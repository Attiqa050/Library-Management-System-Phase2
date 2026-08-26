const editBookForm = document.getElementById("editBookForm");

const params = new URLSearchParams(window.location.search);

const bookId = params.get("id");

let currentBook = null;


// Load Book Data
async function loadBook() {

    try {

        const books = await getBooks();

        currentBook = books.find(function (book) {
            return String(book.id) === String(bookId);
        });

        if (!currentBook) {
            alert("Book not found!");
            window.location.href = "books.html";
            return;
        }

        document.getElementById("title").value =
            currentBook.title;

        document.getElementById("author").value =
            currentBook.author;

        document.getElementById("category").value =
            currentBook.category;

        document.getElementById("copies").value =
            currentBook.totalCopies;

    } catch (error) {

        alert("Cannot reach the server");

        console.error(error);
    }
}


// Save Updated Book
editBookForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const newTotalCopies =
        Number(document.getElementById("copies").value);

    const issuedCopies =
        currentBook.totalCopies - currentBook.availableCopies;

    if (newTotalCopies < issuedCopies) {

        alert(
            "Total copies cannot be less than currently issued copies."
        );

        return;
    }

    const newAvailableCopies =
        newTotalCopies - issuedCopies;

    try {

        await updateBook(bookId, {

            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            category: document.getElementById("category").value,

            totalCopies: newTotalCopies,
            availableCopies: newAvailableCopies
        });

        alert("Book updated successfully!");

        window.location.href = "books.html";

    } catch (error) {

        alert("Cannot reach the server");

        console.error(error);
    }

});


loadBook();
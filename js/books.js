// ===============================
// Add Book Page
// ===============================

const bookForm = document.getElementById("bookForm");

if (bookForm) {

    // Form Submit Event
    bookForm.addEventListener("submit", function (event) {

        // Stop Page Refresh
        event.preventDefault();

        // Get Input Values
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const category = document.getElementById("category").value;
        const copies = document.getElementById("copies").value;

        // Get Existing Books
        let books = JSON.parse(localStorage.getItem("books")) || [];

        // Create Book Object
        const book = {
            id: books.length + 1,
            title: title,
            author: author,
            category: category,
            totalCopies: Number(copies),
            availableCopies: Number(copies)
        };

        // Add New Book
        books.push(book);

        // Save in localStorage
        localStorage.setItem("books", JSON.stringify(books));

        // Show Saved Data
        console.log("Saved Books:", books);

        // Success Message
        const message = document.getElementById("message");

        message.innerText = "✔ Book added successfully!";
        message.style.display = "block";

        // Hide Message after 3 Seconds
        setTimeout(function () {
            message.style.display = "none";
        }, 3000);

        // Clear Form
        bookForm.reset();

    });

}

// ===============================
// Books Page
// ===============================

const tableBody = document.getElementById("bookTableBody");
const search = document.getElementById("search");

if (tableBody) {

    // Get Books from localStorage
    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Function to Display Books
    function displayBooks(bookList) {

        tableBody.innerHTML = "";

        if (bookList.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">No Books Found</td>
                </tr>
            `;

        } else {

            bookList.forEach(function (book) {

                tableBody.innerHTML += `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                        <td>${book.totalCopies}</td>
                        <td>${book.availableCopies}</td>
                    </tr>
                `;

            });

        }

    }

    // Show All Books
    displayBooks(books);

    // Search Books
    if (search) {

        search.addEventListener("keyup", function () {

            const searchValue = search.value.toLowerCase();

            const filteredBooks = books.filter(function (book) {

                return (
                    book.title.toLowerCase().includes(searchValue) ||
                    book.author.toLowerCase().includes(searchValue)
                );

            });

            displayBooks(filteredBooks);

        });

    }

}
// ===============================
// Add Book Page
// ===============================

const bookForm = document.getElementById("bookForm");

if (bookForm) {

    bookForm.addEventListener("submit", async function (event) {

        // Stop Page Refresh
        event.preventDefault();

        // Get Submit Button
        const submitButton = bookForm.querySelector('button[type="submit"]');

        // Disable Button While Request is Running
        submitButton.disabled = true;
        submitButton.innerText = "Adding...";

        // Get Input Values
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const category = document.getElementById("category").value;
        const copies = document.getElementById("copies").value;

        // Create Book Object
        const book = {
            title: title,
            author: author,
            category: category,
            totalCopies: Number(copies),
            availableCopies: Number(copies)
        };

        try {

            // Save Book through API
            const newBook = await addBook(book);

            console.log("Saved Book:", newBook);

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

        } catch (error) {

            alert("Cannot reach the server");

            console.error(error);

        } finally {

            // Enable Button Again
            submitButton.disabled = false;
            submitButton.innerText = "Add Book";
        }

    });

}


// ===============================
// Books Page
// ===============================

const tableBody = document.getElementById("bookTableBody");
const search = document.getElementById("search");

if (tableBody) {

    let books = [];

    // Function to Display Books
    function displayBooks(bookList) {

        tableBody.innerHTML = "";

        if (bookList.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">No books added yet</td>
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


    // Load Books from API
    async function loadBooks() {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">Loading...</td>
            </tr>
        `;

        try {

            books = await getBooks();

            displayBooks(books);

        } catch (error) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">Cannot reach the server</td>
                </tr>
            `;

            console.error(error);
        }

    }


    // Load All Books
    loadBooks();


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
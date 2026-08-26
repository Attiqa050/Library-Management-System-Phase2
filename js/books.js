// ===============================
// Add Book Page
// ===============================

const bookForm = document.getElementById("bookForm");

if (bookForm) {

    bookForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            bookForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.innerText = "Adding...";

        const book = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            category: document.getElementById("category").value,
            totalCopies: Number(document.getElementById("copies").value),
            availableCopies: Number(document.getElementById("copies").value)
        };

        try {

            await addBook(book);

            const message = document.getElementById("message");

            message.innerText = "✔ Book added successfully!";
            message.style.display = "block";

            setTimeout(function () {
                message.style.display = "none";
            }, 3000);

            bookForm.reset();

        } catch (error) {

            alert("Cannot reach the server");
            console.error(error);

        } finally {

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


    // Display Books
    function displayBooks(bookList) {

        tableBody.innerHTML = "";

        if (bookList.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7">No books added yet</td>
                </tr>
            `;

            return;
        }

        bookList.forEach(function (book) {

            tableBody.innerHTML += `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.totalCopies}</td>
                    <td>${book.availableCopies}</td>

                    <td>
                        <a
                            href="edit-book.html?id=${book.id}"
                            class="edit-btn">
                            Edit
                        </a>

                        <button
                            class="delete-btn"
                            onclick="removeBook('${book.id}')">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    }


    // Load Books
    async function loadBooks() {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">Loading...</td>
            </tr>
        `;

        try {

            books = await getBooks();

            displayBooks(books);

        } catch (error) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7">
                        Cannot reach the server
                    </td>
                </tr>
            `;

            console.error(error);
        }
    }


    // Delete Book
    window.removeBook = async function (bookId) {

        const confirmDelete =
            confirm("Are you sure you want to delete this book?");

        if (!confirmDelete) {
            return;
        }

        try {

            const issues = await getIssues();

            const activeIssue = issues.find(function (issue) {

                return (
                    String(issue.bookId) === String(bookId) &&
                    issue.returnDate === ""
                );
            });


            // Do not delete currently issued book
            if (activeIssue) {

                alert(
                    "Cannot delete this book because it is currently issued."
                );

                return;
            }


            await deleteBook(bookId);

            alert("Book deleted successfully!");

            await loadBooks();

        } catch (error) {

            alert("Cannot reach the server");
            console.error(error);
        }
    };


    // Load Books
    loadBooks();


    // Search Books
    if (search) {

        search.addEventListener("keyup", function () {

            const searchValue =
                search.value.toLowerCase();

            const filteredBooks =
                books.filter(function (book) {

                    return (
                        book.title
                            .toLowerCase()
                            .includes(searchValue) ||

                        book.author
                            .toLowerCase()
                            .includes(searchValue)
                    );
                });

            displayBooks(filteredBooks);
        });
    }
}
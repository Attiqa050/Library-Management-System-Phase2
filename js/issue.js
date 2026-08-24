// ===============================
// Issue Book Page
// ===============================

const bookSelect = document.getElementById("book");
const memberSelect = document.getElementById("member");
const issueDate = document.getElementById("issueDate");
const dueDate = document.getElementById("dueDate");
const issueForm = document.getElementById("issueForm");
const message = document.getElementById("message");

let books = [];
let members = [];


// Load Books
async function loadBooks() {

    bookSelect.innerHTML =
        `<option value="">Loading...</option>`;

    try {

        books = await getBooks();

        bookSelect.innerHTML =
            `<option value="">-- Select Book --</option>`;

        if (books.length === 0) {

            bookSelect.innerHTML +=
                `<option disabled>No books added yet</option>`;

            return;
        }

        books.forEach(function (book) {

            let status;

            if (book.availableCopies > 0) {
                status = book.availableCopies + " available";
            } else {
                status = "Not Available";
            }

            const option = document.createElement("option");

            option.value = book.id;

            option.textContent =
                book.title + " (" + status + ")";

            option.dataset.title = book.title;

            option.dataset.fullText =
                book.title + " (" + status + ")";

            bookSelect.appendChild(option);
        });

    } catch (error) {

        bookSelect.innerHTML =
            `<option>Cannot reach the server</option>`;

        console.error(error);
    }
}


// Show Availability When Dropdown Opens
bookSelect.addEventListener("mousedown", function () {

    for (let option of bookSelect.options) {

        if (option.dataset.fullText) {
            option.textContent = option.dataset.fullText;
        }
    }

});


// Show Only Book Name After Selection
bookSelect.addEventListener("change", function () {

    const selectedOption =
        bookSelect.options[bookSelect.selectedIndex];

    if (selectedOption.dataset.title) {

        selectedOption.textContent =
            selectedOption.dataset.title;
    }

});


// Load Members
async function loadMembers() {

    memberSelect.innerHTML =
        `<option value="">Loading...</option>`;

    try {

        members = await getMembers();

        memberSelect.innerHTML =
            `<option value="">-- Select Member --</option>`;

        if (members.length === 0) {

            memberSelect.innerHTML +=
                `<option disabled>No members added yet</option>`;

            return;
        }

        members.forEach(function (member) {

            memberSelect.innerHTML += `
                <option value="${member.id}">
                    ${member.name}
                </option>
            `;
        });

    } catch (error) {

        memberSelect.innerHTML =
            `<option>Cannot reach the server</option>`;

        console.error(error);
    }
}


// Due Date = Issue Date + 14 Days
issueDate.addEventListener("change", function () {

    if (!issueDate.value) {

        dueDate.value = "";
        return;
    }

    const date = new Date(issueDate.value);

    date.setDate(date.getDate() + 14);

    dueDate.value =
        date.toISOString().split("T")[0];
});


// Issue Book
issueForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const bookId = bookSelect.value;
    const memberId = memberSelect.value;

    if (
        !bookId ||
        !memberId ||
        !issueDate.value ||
        !dueDate.value
    ) {

        alert("Please fill all fields!");
        return;
    }


    const selectedBook = books.find(function (book) {

        return String(book.id) === String(bookId);

    });


    if (!selectedBook) {

        alert("Book not found!");
        return;
    }


    // Stop Over-Issue
    if (selectedBook.availableCopies <= 0) {

        alert("Book not available! All copies are issued.");
        return;
    }


    const submitButton =
        issueForm.querySelector('button[type="submit"]');

    // Double Click Protection
    submitButton.disabled = true;
    submitButton.innerText = "Issuing...";

    let createdIssue = null;


    try {

        const issue = {
            bookId: bookId,
            memberId: memberId,
            issueDate: issueDate.value,
            dueDate: dueDate.value,
            returnDate: "",
            fine: 0
        };


        // Call 1: Create Issue
        createdIssue = await addIssue(issue);


        // Call 2: Reduce Available Copies
        await updateBook(bookId, {

            availableCopies:
                selectedBook.availableCopies - 1

        });


        // Success Message
        message.innerText =
            "✔ Book issued successfully!";

        message.style.display = "block";


        setTimeout(function () {

            message.style.display = "none";

        }, 3000);


        // Reset Form
        issueForm.reset();
        dueDate.value = "";


        // Reload Updated Books
        await loadBooks();

    } catch (error) {

        // Rollback if first call worked
        if (createdIssue && createdIssue.id) {

            try {

                await deleteIssue(createdIssue.id);

            } catch (rollbackError) {

                console.error(rollbackError);
            }
        }

        alert("Cannot complete the issue!");

        console.error(error);

    } finally {

        submitButton.disabled = false;
        submitButton.innerText = "Issue Book";
    }

});


// Load Page Data
loadBooks();
loadMembers();

issueDate.value = "";
dueDate.value = "";
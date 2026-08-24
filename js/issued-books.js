// ===============================
// Issued Books Page
// ===============================

const issuedTableBody = document.getElementById("issuedTableBody");

let issues = [];
let books = [];
let members = [];


// Calculate Fine = Rs. 5 per late day
function calculateFine(dueDateStr, returnDateStr) {

    const dueDate = new Date(dueDateStr);
    const returnDate = new Date(returnDateStr);

    const lateDays = Math.floor(
        (returnDate - dueDate) / (1000 * 60 * 60 * 24)
    );

    return lateDays > 0 ? lateDays * 5 : 0;
}


// Load Data from API
async function loadIssuedBooks() {

    issuedTableBody.innerHTML = `
        <tr>
            <td colspan="7">Loading...</td>
        </tr>
    `;

    try {

        issues = await getIssues();
        books = await getBooks();
        members = await getMembers();

        displayIssuedBooks();

    } catch (error) {

        issuedTableBody.innerHTML = `
            <tr>
                <td colspan="7">Cannot reach the server</td>
            </tr>
        `;

        console.error(error);
    }
}


// Display Issued Books
function displayIssuedBooks() {

    issuedTableBody.innerHTML = "";

    const activeIssues = issues.filter(function (issue) {
        return issue.returnDate === "";
    });

    if (activeIssues.length === 0) {

        issuedTableBody.innerHTML = `
            <tr>
                <td colspan="7">No Issued Books Found</td>
            </tr>
        `;

        return;
    }

    const today = new Date().toISOString().split("T")[0];

    activeIssues.forEach(function (issue) {

        const book = books.find(function (book) {
            return String(book.id) === String(issue.bookId);
        });

        const member = members.find(function (member) {
            return String(member.id) === String(issue.memberId);
        });

        const fine = calculateFine(issue.dueDate, today);

        issuedTableBody.innerHTML += `
            <tr>
                <td>${issue.id}</td>
                <td>${book ? book.title : "Unknown"}</td>
                <td>${member ? member.name : "Unknown"}</td>
                <td>${issue.issueDate}</td>
                <td>${issue.dueDate}</td>
                <td>Rs. ${fine}</td>
                <td>
                    <button class="btn return-btn"
                        data-id="${issue.id}">
                        Return
                    </button>
                </td>
            </tr>
        `;
    });


    // Return Button Events
    const returnButtons =
        document.querySelectorAll(".return-btn");

    returnButtons.forEach(function (button) {

        button.addEventListener("click", function () {
            returnBook(button.dataset.id, button);
        });

    });
}


// Return Book
async function returnBook(issueId, button) {

    const issue = issues.find(function (item) {
        return String(item.id) === String(issueId);
    });

    if (!issue) {
        alert("Issue not found!");
        return;
    }

    const book = books.find(function (book) {
        return String(book.id) === String(issue.bookId);
    });

    if (!book) {
        alert("Book not found!");
        return;
    }

    const today = new Date().toISOString().split("T")[0];

    const fine = calculateFine(issue.dueDate, today);


    // Double Click Protection
    button.disabled = true;
    button.innerText = "Returning...";

    try {

        // Update Issue
        await updateIssue(issue.id, {
            returnDate: today,
            fine: fine
        });

        // Increase Available Copies
        await updateBook(book.id, {
            availableCopies: book.availableCopies + 1
        });

        alert(
            "Book Returned Successfully!\nFine = Rs. " + fine
        );

        await loadIssuedBooks();

    } catch (error) {

        alert("Cannot reach the server");

        console.error(error);

    } finally {

        // Enable Button Again
        button.disabled = false;
        button.innerText = "Return";
    }
}


// Load Page
loadIssuedBooks();
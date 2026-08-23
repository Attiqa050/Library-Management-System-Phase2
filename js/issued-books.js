// ===============================
// Issued Books Page
// ===============================

const issuedTableBody = document.getElementById("issuedTableBody");

// Get Data from localStorage
let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
let books = JSON.parse(localStorage.getItem("books")) || [];
let members = JSON.parse(localStorage.getItem("members")) || [];

// ===============================
// Calculate Fine (Sir's Rule)
// ===============================

function calculateFine(issueDateStr, returnDateStr) {
    let issueParts = issueDateStr.split("-");
    let returnParts = returnDateStr.split("-");
    
    let issueDate = new Date(issueParts[0], issueParts[1] - 1, issueParts[2]);
    let returnDate = new Date(returnParts[0], returnParts[1] - 1, returnParts[2]);
    
    let totalDays = Math.floor((returnDate - issueDate) / (1000 * 60 * 60 * 24));
    let lateDays = totalDays - 14;
    
    if (lateDays > 0) {
        return lateDays * 5;
    } else {
        return 0;
    }
}

// ===============================
// Display Issued Books
// ===============================

function displayIssuedBooks() {
    issuedTableBody.innerHTML = "";

    if (issuedBooks.length === 0) {
        issuedTableBody.innerHTML = `
            <tr>
                <td colspan="7">No Issued Books Found</td>
            </tr>
        `;
        return;
    }

    let today = new Date();
    let todayStr = today.toISOString().split("T")[0];

    issuedBooks.forEach(function (issue) {
        let book = books.find(function (b) {
            return b.id === issue.bookId;
        });

        let member = members.find(function (m) {
            return m.id === issue.memberId;
        });

        let fine = calculateFine(issue.issueDate, todayStr);

        issuedTableBody.innerHTML += `
            <tr>
                <td>${issue.issueId}</td>
                <td>${book ? book.title : "Unknown"}</td>
                <td>${member ? member.name : "Unknown"}</td>
                <td>${issue.issueDate}</td>
                <td>${issue.dueDate}</td>
                <td>Rs. ${fine}</td>
                <td>
                    <button class="btn" onclick="returnBook(${issue.issueId})">
                        Return
                    </button>
                </td>
            </tr>
        `;
    });
}

displayIssuedBooks();

// ===============================
// Return Book
// ===============================

function returnBook(issueId) {
    let issue = issuedBooks.find(function (item) {
        return item.issueId === issueId;
    });

    if (!issue) {
        alert("Issue not found!");
        return;
    }

    let today = new Date();
    let returnDateStr = today.toISOString().split("T")[0];
    issue.returnDate = returnDateStr;

    let fine = calculateFine(issue.issueDate, returnDateStr);
    issue.fine = fine;

    alert("Fine = Rs. " + fine);

    books.forEach(function (book) {
        if (book.id === issue.bookId) {
            book.availableCopies++;
        }
    });

    localStorage.setItem("books", JSON.stringify(books));

    issuedBooks = issuedBooks.filter(function (item) {
        return item.issueId !== issueId;
    });

    localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));

    displayIssuedBooks();
    alert("Book Returned Successfully!");
}
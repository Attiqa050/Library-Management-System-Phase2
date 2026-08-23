// ===============================
// Issue Book Page
// ===============================

const bookSelect = document.getElementById("book");
const memberSelect = document.getElementById("member");
const issueDate = document.getElementById("issueDate");
const dueDate = document.getElementById("dueDate");
const issueForm = document.getElementById("issueForm");
const message = document.getElementById("message");

// ===============================
// Function: Load All Books (Show all books, even if 0 copies)
// ===============================

function loadAllBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    
    // Clear dropdown
    bookSelect.innerHTML = `<option value="">-- Select Book --</option>`;
    
    if (books.length === 0) {
        bookSelect.innerHTML += `<option value="" disabled>📭 No books in library</option>`;
    } else {
        books.forEach(function (book) {
            // Show all books with their available copies
            let status = book.availableCopies > 0 ? `${book.availableCopies} available` : "❌ Not Available";
            bookSelect.innerHTML += `
                <option value="${book.id}">
                    ${book.title} (${status})
                </option>
            `;
        });
    }
}

// ===============================
// Function: Load Members
// ===============================

function loadMembers() {
    let members = JSON.parse(localStorage.getItem("members")) || [];
    
    memberSelect.innerHTML = `<option value="">-- Select Member --</option>`;
    
    if (members.length === 0) {
        memberSelect.innerHTML += `<option value="" disabled>No members registered</option>`;
    } else {
        members.forEach(function (member) {
            memberSelect.innerHTML += `
                <option value="${member.id}">
                    ${member.name}
                </option>
            `;
        });
    }
}

// ===============================
// Function: Set Due Date (14 days from issue date)
// ===============================

function updateDueDate() {
    if (issueDate.value) {
        let date = new Date(issueDate.value);
        date.setDate(date.getDate() + 14);
        dueDate.value = date.toISOString().split("T")[0];
    } else {
        dueDate.value = "";
    }
}

// ===============================
// Load Everything on Page Load
// ===============================

loadAllBooks();
loadMembers();

// ===============================
// Clear issue date on page load (user will select)
// ===============================

issueDate.value = "";
dueDate.value = "";

// ===============================
// Update Due Date When Issue Date Changes
// ===============================

issueDate.addEventListener("change", function () {
    updateDueDate();
});

// ===============================
// Form Submit - Issue Book
// ===============================

issueForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let bookId = Number(bookSelect.value);
    let memberId = Number(memberSelect.value);
    let issueDateValue = issueDate.value;
    let dueDateValue = dueDate.value;

    // ===============================
    // Check: All fields filled?
    // ===============================

    if (!bookId || !memberId || !issueDateValue || !dueDateValue) {
        alert("❌ Please fill all fields!");
        return;
    }

    // ===============================
    // Get Data from localStorage
    // ===============================

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let members = JSON.parse(localStorage.getItem("members")) || [];
    let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

    // ===============================
    // Find Selected Book
    // ===============================

    let selectedBook = books.find(book => book.id === bookId);

    if (!selectedBook) {
        alert("❌ Book not found!");
        return;
    }

    // ===============================
    // Check: Book Available?
    // ===============================

    if (selectedBook.availableCopies <= 0) {
        alert("❌ Book not available! All copies are issued.");
        loadAllBooks();
        return;
    }

    // ===============================
    // Check: Member Exists?
    // ===============================

    let selectedMember = members.find(member => member.id === memberId);

    if (!selectedMember) {
        alert("❌ Member not found!");
        return;
    }

    // ===============================
    // Create Issue Record
    // ===============================

    let issue = {
        issueId: issuedBooks.length + 1,
        bookId: bookId,
        memberId: memberId,
        issueDate: issueDateValue,
        dueDate: dueDateValue,
        returnDate: "",
        fine: 0
    };

    // ===============================
    // Save Issue
    // ===============================

    issuedBooks.push(issue);
    localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));

    // ===============================
    // Reduce Available Copies
    // ===============================

    selectedBook.availableCopies--;
    localStorage.setItem("books", JSON.stringify(books));

    // ===============================
    // Show Success Message
    // ===============================

    message.innerText = "✔ Book Issued Successfully!";
    message.style.display = "block";
    message.style.backgroundColor = "#d4edda";
    message.style.color = "#155724";
    message.style.padding = "12px";
    message.style.borderRadius = "5px";
    message.style.marginBottom = "15px";

    setTimeout(function () {
        message.style.display = "none";
    }, 3000);

    // ===============================
    // Reset Form
    // ===============================

    bookSelect.value = "";
    memberSelect.value = "";
    issueDate.value = "";
    dueDate.value = "";

    // Refresh dropdown
    loadAllBooks();

    console.log("✅ Book Issued Successfully!");
    console.log("Remaining copies:", selectedBook.availableCopies);
});
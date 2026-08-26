// ===============================
// Home Dashboard
// ===============================

async function loadDashboard() {

    try {

        // Get Data from API
        const books = await getBooks();
        const members = await getMembers();
        const issues = await getIssues();

        // Count Currently Issued Books
        const activeIssues = issues.filter(function (issue) {
            return issue.returnDate === "";
        });

        // Show Dashboard Counts
        document.getElementById("totalBooks").innerText =
            books.length;

        document.getElementById("totalMembers").innerText =
            members.length;

        document.getElementById("issuedBooks").innerText =
            activeIssues.length;

    } catch (error) {

        document.getElementById("totalBooks").innerText = "Error";
        document.getElementById("totalMembers").innerText = "Error";
        document.getElementById("issuedBooks").innerText = "Error";

        console.error(error);
    }
}


// Load Dashboard
loadDashboard();
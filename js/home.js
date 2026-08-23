
// ===============================
// Home Dashboard
// ===============================

// Get Data from localStorage
let books = JSON.parse(localStorage.getItem("books")) || [];
let members = JSON.parse(localStorage.getItem("members")) || [];
let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

// Show Total Books
document.getElementById("totalBooks").innerText = books.length;

// Show Total Members
document.getElementById("totalMembers").innerText = members.length;

// Show Issued Books
document.getElementById("issuedBooks").innerText = issuedBooks.length;
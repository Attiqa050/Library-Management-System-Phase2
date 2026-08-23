const BASE_URL = "http://localhost:3000";


// ===============================
// Books API
// ===============================

// Get All Books
async function getBooks() {

    const response = await fetch(`${BASE_URL}/books`);
    const books = await response.json();

    return books;
}


// Add New Book
async function addBook(book) {

    const response = await fetch(`${BASE_URL}/books`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(book)
    });

    const newBook = await response.json();

    return newBook;
}


// Update Book
async function updateBook(id, bookData) {

    const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(bookData)
    });

    const updatedBook = await response.json();

    return updatedBook;
}


// Delete Book
async function deleteBook(id) {

    const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "DELETE"
    });

    return response;
}

// ===============================
// Members API
// ===============================

// Get All Members
async function getMembers() {

    const response = await fetch(`${BASE_URL}/members`);
    const members = await response.json();

    return members;
}


// Add New Member
async function addMember(member) {

    const response = await fetch(`${BASE_URL}/members`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(member)
    });

    const newMember = await response.json();

    return newMember;
}


// Update Member
async function updateMember(id, memberData) {

    const response = await fetch(`${BASE_URL}/members/${id}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(memberData)
    });

    const updatedMember = await response.json();

    return updatedMember;
}


// Delete Member
async function deleteMember(id) {

    const response = await fetch(`${BASE_URL}/members/${id}`, {
        method: "DELETE"
    });

    return response;
}

// ===============================
// Issues API
// ===============================

// Get All Issues
async function getIssues() {

    const response = await fetch(`${BASE_URL}/issues`);
    const issues = await response.json();

    return issues;
}


// Add New Issue
async function addIssue(issue) {

    const response = await fetch(`${BASE_URL}/issues`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(issue)
    });

    const newIssue = await response.json();

    return newIssue;
}


// Update Issue
async function updateIssue(id, issueData) {

    const response = await fetch(`${BASE_URL}/issues/${id}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(issueData)
    });

    const updatedIssue = await response.json();

    return updatedIssue;
}


// Delete Issue
async function deleteIssue(id) {

    const response = await fetch(`${BASE_URL}/issues/${id}`, {
        method: "DELETE"
    });

    return response;
}
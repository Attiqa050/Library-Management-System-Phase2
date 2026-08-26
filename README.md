
# 📚 Library Management System

A simple Library Management System developed using **HTML, CSS, JavaScript, and JSON Server**.

The system manages books, members, book issuing, returns, and overdue fines using a REST API.

## Features

- Add, view, search, edit, and delete books
- Add, view, edit, and delete members
- Issue and return books
- Automatically manage available book copies
- Calculate overdue fines
- Prevent issuing books when no copies are available
- Prevent deleting currently issued books or members
- Loading, empty, and server error states
- Double-click protection during requests

## Technologies Used

- HTML
- CSS
- JavaScript
- JSON Server
- REST API
- VS Code Live Server

## Project Structure

- `html/` — HTML pages
- `css/` — Stylesheet
- `js/` — JavaScript files
- `js/api.js` — Shared API functions
- `db.json` — Books, members, and issues data
- `README.md` — Project documentation

All network requests are handled through the shared `js/api.js` file.  
The project does not use `localStorage` for library data.

## How to Run the Project

### 1. Open the Project

Open the complete project folder in **Visual Studio Code**.

### 2. Install JSON Server

Open the VS Code terminal and run:

```bash
npm install -g json-server
```

### 3. Start JSON Server

Make sure the terminal is opened in the project folder where `db.json` is located.

Run:

```bash
npx json-server db.json --port 3000
```

Keep this terminal running while using the project.

The API will run at:

`http://localhost:3000`

Main API endpoints:

- `http://localhost:3000/books`
- `http://localhost:3000/members`
- `http://localhost:3000/issues`

### 4. Start the Frontend

Open `home.html` from the `html` folder using **Live Server**.

Do not open the HTML files directly using the `file://` protocol. The project should be served through Live Server so the relative CSS and JavaScript paths work correctly.

Keep both **JSON Server and Live Server running** while using the application.

## Network Handling

The application uses `async/await` and `try/catch` to handle API requests.

While data is being fetched, the table shows `Loading...`.

When JSON Server is running normally, local API requests are very fast. Because of this, the `Loading...` message may disappear too quickly to notice.

If JSON Server is stopped or unavailable, the application displays `Cannot reach the server` instead of silently failing.

This can be tested by stopping JSON Server with **Ctrl + C** and refreshing the page.

If there is no data, messages such as `No books added yet`, `No members added yet`, or `No Issued Books Found` are displayed.

## Double-Click Protection

Submit buttons are temporarily disabled while a request is running. This prevents duplicate records if the user clicks the button multiple times.

Because local API requests are usually very fast, temporary button text such as `Adding...` may only appear briefly.

## Book Issue and Return

When a book is issued:

- An issue record is created through the API.
- The book's `availableCopies` decreases by 1.
- If no copies are available, another issue attempt is refused.

Books have a **14-day borrowing period**.

After the due date:

**Fine = Late Days × Rs. 5**

If the book is returned on or before the due date, the fine is **Rs. 0** and never becomes negative.

When a book is returned, its `availableCopies` increases by 1.

## Edit and Delete

Books and members can be edited and deleted.

A confirmation dialog is displayed before deletion.

- A book cannot be deleted while it is currently issued.
- A member cannot be deleted while they currently have an issued book.

## Database

The application stores data in `db.json` using three resources:

- `books`
- `members`
- `issues`

Sample book and member records are included for demonstration.

## Author

**Attiqa**
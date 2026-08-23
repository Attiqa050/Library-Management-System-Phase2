// ===============================
// Add Member Page
// ===============================

// Select Member Form
const memberForm = document.getElementById("memberForm");

if (memberForm) {

    // Form Submit Event
    memberForm.addEventListener("submit", function (event) {

        // Stop Page Refresh
        event.preventDefault();

        // Get Input Values
        const name = document.getElementById("name").value;
        const rollNo = document.getElementById("rollNo").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        // Get Existing Members
        let members = JSON.parse(localStorage.getItem("members")) || [];

        // Create Member Object
        const member = {
            id: members.length + 1,
            name: name,
            rollNo: rollNo,
            email: email,
            phone: phone
        };

        // Add New Member
        members.push(member);

        // Save in localStorage
        localStorage.setItem("members", JSON.stringify(members));

        // Show Saved Data
        console.log("Saved Members:", members);

        // Success Message
        const message = document.getElementById("message");

        message.innerText = "✔ Member added successfully!";
        message.style.display = "block";

        // Hide Message after 3 Seconds
        setTimeout(function () {
            message.style.display = "none";
        }, 3000);

        // Clear Form
        memberForm.reset();

        // Refresh Members Table
        displayMembers(members);

    });

}

// ===============================
// Members List
// ===============================

const memberTableBody = document.getElementById("memberTableBody");

// Function to Display Members
function displayMembers(memberList) {

    if (!memberTableBody) return;

    memberTableBody.innerHTML = "";

    if (memberList.length === 0) {

        memberTableBody.innerHTML = `
            <tr>
                <td colspan="5">No Members Found</td>
            </tr>
        `;

    } else {

        memberList.forEach(function (member) {

            memberTableBody.innerHTML += `
                <tr>
                    <td>${member.id}</td>
                    <td>${member.name}</td>
                    <td>${member.rollNo}</td>
                    <td>${member.email}</td>
                    <td>${member.phone}</td>
                </tr>
            `;

        });

    }

}

// Get Members from localStorage
let members = JSON.parse(localStorage.getItem("members")) || [];

// Show Members
displayMembers(members);
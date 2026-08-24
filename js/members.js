// ===============================
// Add Member Page
// ===============================

const memberForm = document.getElementById("memberForm");

if (memberForm) {

    memberForm.addEventListener("submit", async function (event) {

        // Stop Page Refresh
        event.preventDefault();

        // Get Submit Button
        const submitButton = memberForm.querySelector('button[type="submit"]');

        // Disable Button While Request is Running
        submitButton.disabled = true;
        submitButton.innerText = "Adding...";

        // Get Input Values
        const name = document.getElementById("name").value;
        const rollNo = document.getElementById("rollNo").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        // Create Member Object
        const member = {
            name: name,
            rollNo: rollNo,
            email: email,
            phone: phone
        };

        try {

            // Save Member through API
            const newMember = await addMember(member);

            console.log("Saved Member:", newMember);

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

            // Reload Members Table
            await loadMembers();

        } catch (error) {

            alert("Cannot reach the server");
            console.error(error);

        } finally {

            // Enable Button Again
            submitButton.disabled = false;
            submitButton.innerText = "Add Member";
        }

    });

}


// ===============================
// Members List
// ===============================

const memberTableBody = document.getElementById("memberTableBody");


// Display Members
function displayMembers(memberList) {

    if (!memberTableBody) return;

    memberTableBody.innerHTML = "";

    if (memberList.length === 0) {

        memberTableBody.innerHTML = `
            <tr>
                <td colspan="5">No members added yet</td>
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


// ===============================
// Load Members from API
// ===============================

async function loadMembers() {

    if (!memberTableBody) return;

    memberTableBody.innerHTML = `
        <tr>
            <td colspan="5">Loading...</td>
        </tr>
    `;

    try {

        const members = await getMembers();

        displayMembers(members);

    } catch (error) {

        memberTableBody.innerHTML = `
            <tr>
                <td colspan="5">Cannot reach the server</td>
            </tr>
        `;

        console.error(error);
    }

}


// Load All Members
loadMembers();
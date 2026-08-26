// ===============================
// Add Member Page
// ===============================

const memberForm = document.getElementById("memberForm");

if (memberForm) {

    memberForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            memberForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.innerText = "Adding...";

        const member = {
            name: document.getElementById("name").value,
            rollNo: document.getElementById("rollNo").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value
        };

        try {

            await addMember(member);

            const message = document.getElementById("message");

            message.innerText = "✔ Member added successfully!";
            message.style.display = "block";

            setTimeout(function () {
                message.style.display = "none";
            }, 3000);

            memberForm.reset();

            await loadMembers();

        } catch (error) {

            alert("Cannot reach the server");
            console.error(error);

        } finally {

            submitButton.disabled = false;
            submitButton.innerText = "Add Member";
        }

    });
}


// ===============================
// Members List
// ===============================

const memberTableBody =
    document.getElementById("memberTableBody");


// Display Members
function displayMembers(memberList) {

    if (!memberTableBody) return;

    memberTableBody.innerHTML = "";

    if (memberList.length === 0) {

        memberTableBody.innerHTML = `
            <tr>
                <td colspan="6">No members added yet</td>
            </tr>
        `;

        return;
    }

    memberList.forEach(function (member) {

        memberTableBody.innerHTML += `
            <tr>
                <td>${member.id}</td>
                <td>${member.name}</td>
                <td>${member.rollNo}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>

                <td>
                    <a href="edit-member.html?id=${member.id}"
                       class="edit-btn">
                        Edit
                    </a>

                    <button class="delete-btn"
                        onclick="removeMember('${member.id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });
}


// ===============================
// Load Members from API
// ===============================

async function loadMembers() {

    if (!memberTableBody) return;

    memberTableBody.innerHTML = `
        <tr>
            <td colspan="6">Loading...</td>
        </tr>
    `;

    try {

        const members = await getMembers();

        displayMembers(members);

    } catch (error) {

        memberTableBody.innerHTML = `
            <tr>
                <td colspan="6">Cannot reach the server</td>
            </tr>
        `;

        console.error(error);
    }
}


// ===============================
// Delete Member
// ===============================

window.removeMember = async function (memberId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this member?");

    if (!confirmDelete) return;

    try {

        const issues = await getIssues();

        const activeIssue = issues.find(function (issue) {

            return (
                String(issue.memberId) === String(memberId) &&
                issue.returnDate === ""
            );

        });

        if (activeIssue) {

            alert(
                "Cannot delete this member because a book is currently issued to them."
            );

            return;
        }

        await deleteMember(memberId);

        alert("Member deleted successfully!");

        await loadMembers();

    } catch (error) {

        alert("Cannot reach the server");
        console.error(error);
    }
};


// Load All Members
loadMembers();
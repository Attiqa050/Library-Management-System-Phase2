const editMemberForm =
    document.getElementById("editMemberForm");

const params =
    new URLSearchParams(window.location.search);

const memberId = params.get("id");


// Load Member Data
async function loadMember() {

    try {

        const members = await getMembers();

        const member = members.find(function (member) {

            return String(member.id) === String(memberId);

        });

        if (!member) {

            alert("Member not found!");

            window.location.href = "members.html";

            return;
        }

        document.getElementById("name").value =
            member.name;

        document.getElementById("rollNo").value =
            member.rollNo;

        document.getElementById("email").value =
            member.email;

        document.getElementById("phone").value =
            member.phone;

    } catch (error) {

        alert("Cannot reach the server");

        console.error(error);
    }
}


// Save Member
editMemberForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const member = {
            name: document.getElementById("name").value,
            rollNo: document.getElementById("rollNo").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value
        };

        try {

            await updateMember(memberId, member);

            alert("Member updated successfully!");

            window.location.href = "members.html";

        } catch (error) {

            alert("Cannot reach the server");

            console.error(error);
        }

    }
);


loadMember();
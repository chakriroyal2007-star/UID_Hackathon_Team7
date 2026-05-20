
function updateDateTime(){

    const now = new Date();

    document.getElementById("datetime").innerHTML =
        now.toLocaleDateString() + " " +
        now.toLocaleTimeString();
}

setInterval(updateDateTime,1000);


let registrations = [];
let totalCount = 0;

const registrationForm = document.getElementById("registrationForm");

if(registrationForm){

registrationForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const regNo = document.getElementById("regNo").value.trim();
    const eventName = document.getElementById("eventSelect").value;
    const participationType =
        document.getElementById("participationType").value;
    const teamName = document.getElementById("teamName").value.trim();
    const teamSize =
        document.getElementById("teamSize").value;

    const message = document.getElementById("message");

    message.innerHTML = "";
    message.className = "";


    if(name.length < 3){
        message.innerHTML = "Invalid Name";
        message.className = "error";
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)){
        message.innerHTML = "Invalid Email";
        message.className = "error";
        return;
    }

    if(mobile.length != 10 || isNaN(mobile)){
        message.innerHTML = "Invalid Mobile Number";
        message.className = "error";
        return;
    }

    if(regNo == ""){
        message.innerHTML = "Register Number Required";
        message.className = "error";
        return;
    }

    if(eventName == ""){
        message.innerHTML = "Select Event";
        message.className = "error";
        return;
    }

    if(eventName == "Hackathon"){
        message.innerHTML =
            "Registration Closed For Hackathon";
        message.className = "error";
        return;
    }

    if(participationType == "Team"){

        if(teamName == ""){
            message.innerHTML = "Enter Team Name";
            message.className = "error";
            return;
        }

        if(teamSize < 2 || teamSize > 4){
            message.innerHTML =
                "Team Size Must Be Between 2 and 4";
            message.className = "error";
            return;
        }
    }


    const duplicate = registrations.find(reg =>
        reg.regNo == regNo &&
        reg.eventName == eventName
    );

    if(duplicate){
        message.innerHTML =
            "Duplicate Registration Not Allowed";
        message.className = "error";
        return;
    }

    

    registrations.push({
        name,
        email,
        mobile,
        regNo,
        eventName
    });

    totalCount++;

    document.getElementById("count").innerHTML = totalCount;

    message.innerHTML =
        "Registration Successful!";
    message.className = "success";



    document.getElementById("participantDetails").innerHTML = `
        <h3>Participant Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Register No:</strong> ${regNo}</p>
        <p><strong>Event:</strong> ${eventName}</p>
        <p><strong>Participation:</strong> ${participationType}</p>
    `;

    registrationForm.reset();

});
}


let ratings = [];

const feedbackForm = document.getElementById("feedbackForm");

if(feedbackForm){

feedbackForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
        document.getElementById("fbName").value.trim();

    const regNo =
        document.getElementById("fbRegNo").value.trim();

    const eventName =
        document.getElementById("fbEvent").value;

    const rating =
        document.getElementById("rating").value;

    const comments =
        document.getElementById("comments").value.trim();

    const message =
        document.getElementById("feedbackMessage");

    message.innerHTML = "";
    message.className = "";

    

    if(regNo == ""){
        message.innerHTML =
            "Register Number Required";
        message.className = "error";
        return;
    }

    if(eventName == ""){
        message.innerHTML =
            "Select Event";
        message.className = "error";
        return;
    }

    if(rating == ""){
        message.innerHTML =
            "Select Rating";
        message.className = "error";
        return;
    }

    if(comments.length < 20){
        message.innerHTML =
            "Feedback Must Contain Minimum 20 Characters";
        message.className = "error";
        return;
    }

    ratings.push(Number(rating));

    let avg =
        ratings.reduce((a,b)=>a+b,0) / ratings.length;

    document.getElementById("averageRating").innerHTML =
        avg.toFixed(2);

    message.innerHTML =
        "Feedback Submitted Successfully!";
    message.className = "success";



    document.getElementById("feedbackSummary").innerHTML = `
        <h3>Feedback Summary</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Register No:</strong> ${regNo}</p>
        <p><strong>Event:</strong> ${eventName}</p>
        <p><strong>Rating:</strong> ${rating}/5</p>
        <p><strong>Comments:</strong> ${comments}</p>
    `;

    feedbackForm.reset();

});
}
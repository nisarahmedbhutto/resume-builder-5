// get elemnts
var formInputData = document.getElementById("formInput");
var displayResumeGenerateData = document.getElementById("displayResumeData");
var shareableLinkContenor = document.getElementById("shareable-link-contenor");
var shareableLink = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
// handle form submission
formInputData.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page re loaded
    // collect input values
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var education = document.getElementById("education").value;
    var skills = document.getElementById("skills").value;
    var experience = document.getElementById("experience").value;
    // save form data in local storage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        skills: skills,
        experience: experience,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // saving the data localy 
    // dynamically generate resume
    var resumeHtml = "\n    <h2><b> Shareable Resume Builder </b></h2>\n    <h3>Personal Informition</h3>\n    <p><b>Name :</b><span contenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>Phone :</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n    <p><b>Email :</b><span contenteditable=\"true\">").concat(email, "</span></p>\n\n\n    <h3>Education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n\n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n\n    <h3>Experience</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n    ");
    // display the generate resume
    displayResumeGenerateData.innerHTML = resumeHtml;
    // generate shareable username url data 
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // display the shareable link
    shareableLinkContenor.style.display = "block";
    shareableLink.href = shareableURL;
    shareableLink.textContent = shareableURL;
});
// handle pdf dwonload 
downloadPdfButton.addEventListener("click", function () {
    window.print();
});
// prefill the form username url
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var saveResumeData = localStorage.getItem(username);
        if (saveResumeData) {
            var resumedata = JSON.parse(saveResumeData);
            document.getElementById("username").value = username;
            document.getElementById("name").value = resumedata.name;
            document.getElementById("phone").value = resumedata.phone;
            document.getElementById("email").value = resumedata.email;
            document.getElementById("education").value = resumedata.education;
            document.getElementById("skills").value = resumedata.skills;
            document.getElementById("experience").value = resumedata.experience;
        }
    }
});

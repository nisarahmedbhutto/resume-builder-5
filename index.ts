
// get elemnts

const formInputData = document.getElementById("formInput") as HTMLFormElement;
const displayResumeGenerateData = document.getElementById("displayResumeData") as HTMLDivElement;
const shareableLinkContenor = document.getElementById("shareable-link-contenor") as HTMLDivElement;
const shareableLink = document.getElementById("shareable-link") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;

// handle form submission
formInputData.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // prevent page re loaded


    // collect input values
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;

    // save form data in local storage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        skills,
        experience,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // saving the data localy 


    // dynamically generate resume
    const resumeHtml = `
    <h2><b> Shareable Resume Builder </b></h2>
    <h3>Personal Informition</h3>
    <p><b>Name :</b><span contenteditable="true">${name}</span></p>
    <p><b>Phone :</b><span contenteditable="true">${phone}</span></p>
    <p><b>Email :</b><span contenteditable="true">${email}</span></p>


    <h3>Education</h3>
    <p contenteditable="true">${education}</p>

    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>

    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>
    `;

    // display the generate resume
    displayResumeGenerateData.innerHTML = resumeHtml;

    // generate shareable username url data 
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`

    // display the shareable link
    shareableLinkContenor.style.display = "block"
    shareableLink.href = shareableURL;
    shareableLink.textContent = shareableURL;

});

// handle pdf dwonload 
downloadPdfButton.addEventListener("click", () => {
    window.print();
});

// prefill the form username url
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (username) {
        const saveResumeData = localStorage.getItem(username);
        if (saveResumeData) {
            const resumedata = JSON.parse(saveResumeData);
            (document.getElementById("username") as HTMLInputElement).value = username;
            (document.getElementById("name") as HTMLInputElement).value = resumedata.name;
            (document.getElementById("phone") as HTMLInputElement).value = resumedata.phone;
            (document.getElementById("email") as HTMLInputElement).value = resumedata.email;
            (document.getElementById("education") as HTMLTextAreaElement).value = resumedata.education;
            (document.getElementById("skills") as HTMLTextAreaElement).value = resumedata.skills;
            (document.getElementById("experience") as HTMLTextAreaElement).value = resumedata.experience;
            
        }
    }
});
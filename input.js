// // Load skills from local storage on page load
// document.addEventListener('DOMContentLoaded', loadSkills);


// Object to store personal details
let personalDetails = {};

// Function to save personal details
function savePersonalDetails() {
    const name = document.getElementById('name_input').value;
    const address = document.getElementById('address_input').value;
    const phone = document.getElementById('phone_input').value;
    const email = document.getElementById('email_input').value;

    // Create the personalDetails object
    const personalDetails = {
        name,
        address,
        phone,
        email
    };

    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('resumeData')) || {};

    // Update the existing data with new personal details
    existingData.personalDetails = personalDetails;

    // Save the updated object back to local storage
    localStorage.setItem('resumeData', JSON.stringify(existingData));

    console.log("Personal details saved:", existingData);
}


// Call savePersonalDetails when inputs change
document.getElementById('name_input').addEventListener('input', savePersonalDetails);
document.getElementById('address_input').addEventListener('input', savePersonalDetails);
document.getElementById('phone_input').addEventListener('input', savePersonalDetails);
document.getElementById('email_input').addEventListener('input', savePersonalDetails);

// skillstore.js
// Function to save selected skills and job title to local storage
// Function to save selected skills and job title to local storage
function saveSkillsToLocalStorage(jobTitle) {
    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('resumeData')) || {};

    // Update the existing data with new skills and job title
    existingData.jobTitle = jobTitle;
    existingData.skills = selectedSkills;

    // Save the updated object back to local storage
    localStorage.setItem('resumeData', JSON.stringify(existingData));

    console.log("Skills and job title saved to local storage:", existingData);
}


// Function to retrieve skills and job title from local storage
function getSkillsFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('skillsData'));
    if (storedData) {
        return storedData; // Return the stored skills and job title
    }
    return null; // Return null if nothing is stored
}

// Call saveSkillsToLocalStorage when a skill is selected/deselected
function selectSkill(skill, isChecked) {
    const selectedSkillsDiv = document.getElementById('skills_dsp');

    if (isChecked) {
        // Add the selected skill to the array
        if (!selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
        }
    } else {
        // Remove the skill if unchecked
        selectedSkills = selectedSkills.filter(s => s !== skill);
    }

    // Update the preview display
    updateSkillsPreview(selectedSkillsDiv);
    
    // Save to local storage whenever skills are updated
    const jobTitle = document.getElementById('job-title').value; // Assuming there's an input for job title
    saveSkillsToLocalStorage(jobTitle);
}





// Function to save experience data
function saveExperienceData() {
    const experiences = []; // Initialize a new array to store experiences

    const experienceForms = document.querySelectorAll('.experience-details');

    experienceForms.forEach((form) => {
        const role = form.querySelector('.role_input').value.trim();
        const company = form.querySelector('.company_input').value.trim();
        const location = form.querySelector('.location_input').value.trim();
        const startDate = form.querySelector('.startdate_input').value;
        const endDate = form.querySelector('.enddate_input').value;
        const description = form.querySelector('.description_input').value.trim();

        // Only save if at least one field is filled
        if (role || company || location || startDate || description) {
            experiences.push({
                role,
                company,
                location,
                startDate,
                endDate,
                description
            });
        }
    });

    // Save experiences to local storage
    const existingData = JSON.parse(localStorage.getItem('resumeData')) || {};
    existingData.experience = experiences; // Update the existing data with new experiences
    localStorage.setItem('resumeData', JSON.stringify(existingData)); // Save back to local storage

    console.log("Experience data saved:", experiences);
}

// Function to retrieve the saved experience data
function getExperienceData() {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    return storedData ? storedData.experience : []; // Return the experience data from local storage
}

// Function to update the experience preview
function updateExperiencePreview() {
    const experiencesContainer = document.getElementById('experiences_dsp');
    experiencesContainer.innerHTML = '';

    const experiences = getExperienceData(); // Get experience data from local storage

    experiences.forEach((experience) => {
        const expDiv = document.createElement('div');
        expDiv.classList.add('experience-item');
        expDiv.innerHTML = `
            <h4>${experience.role}</h4>
            <p>${experience.company}, ${experience.location}</p>
            <p>${experience.startDate} - ${experience.endDate ? experience.endDate : 'Present'}</p>
            <p>${experience.description}</p>
        `;
        experiencesContainer.appendChild(expDiv);
    });
}

// Event listeners for input changes to save and update preview
document.querySelector('.experience-section').addEventListener('input', saveExperienceData);




// educationStorage.js
// Function to save education data
function saveEducationData() {
    const educationEntries = []; // Initialize a new array to store education entries

    const educationForms = document.querySelectorAll('.education-details');

    educationForms.forEach((form) => {
        const course = form.querySelector('.course_input').value.trim();
        const institute = form.querySelector('.institute_input').value.trim();
        const location = form.querySelector('.location_input').value.trim();
        const startDate = form.querySelector('.startdate_input').value;
        const endDate = form.querySelector('.enddate_input').value;

        // Only save if at least one field is filled
        if (course || institute || location || startDate ) {
            educationEntries.push({
                course,
                institute,
                location,
                startDate,
                endDate
                        });
        }
    });

    // Save education entries to local storage
    const existingData = JSON.parse(localStorage.getItem('resumeData')) || {};
    existingData.education = educationEntries; // Update the existing data with new education entries
    localStorage.setItem('resumeData', JSON.stringify(existingData)); // Save back to local storage

    console.log("Education data saved:", educationEntries);
}

// Function to retrieve the saved education data
function getEducationData() {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    return storedData ? storedData.education : []; // Return the education data from local storage
}

// Function to update the education preview
function updateEducationPreview() {
    const educationContainer = document.getElementById('educations_dsp');
    educationContainer.innerHTML = '';

    const educationEntries = getEducationData(); // Get education data from local storage

    educationEntries.forEach((entry) => {
        const eduDiv = document.createElement('div');
        eduDiv.classList.add('education-item');
        eduDiv.innerHTML = `
            <h4>${entry.course}</h4>
            <p>${entry.institute}, ${entry.location}</p>
            <p>${entry.startDate} - ${entry.endDate ? entry.endDate : 'Present'}</p>
        `;
        educationContainer.appendChild(eduDiv);
    });
}

// Event listeners for input changes to save and update preview
document.querySelector('.education-section').addEventListener('input', saveEducationData);



// projectStorage.js
// Function to save project data
function saveProjectData() {
    const projects = []; // Initialize a new array to store projects

    const projectForms = document.querySelectorAll('.project-details');

    projectForms.forEach((form) => {
        const title = form.querySelector('.title_input').value.trim();
        const showcase = form.querySelector('.showcase_input').value.trim();
        const description = form.querySelector('.description_input').value.trim();

        // Only save if at least one field is filled
        if (title || showcase || description) {
            projects.push({
                title,
                showcase,
                description
            });
        }
    });

    // Save projects to local storage
    const existingData = JSON.parse(localStorage.getItem('resumeData')) || {};
    existingData.projects = projects; // Update the existing data with new project entries
    localStorage.setItem('resumeData', JSON.stringify(existingData)); // Save back to local storage

    console.log("Project data saved:", projects);
}

// Function to retrieve the saved project data
function getProjectData() {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    return storedData ? storedData.projects : []; // Return the projects data from local storage
}

// Function to update the project preview
function updateProjectPreview() {
    const projectsContainer = document.getElementById('projects_dsp');
    projectsContainer.innerHTML = '';

    const projects = getProjectData(); // Get project data from local storage

    projects.forEach((project) => {
        const projDiv = document.createElement('div');
        projDiv.classList.add('project-item');
        projDiv.innerHTML = `
            <h4>${project.title}</h4>
            <p>${project.showcase}</p>
            <p>${project.description}</p>
        `;
        projectsContainer.appendChild(projDiv);
    });
}

// Event listeners for input changes to save and update preview
document.querySelector('.projects-section').addEventListener('input', saveProjectData);



// certificationStorage.js
// Function to save certification data
function saveCertificationData() {
    const certifications = []; // Initialize a new array to store certifications

    const certificationForms = document.querySelectorAll('.certification-details');

    certificationForms.forEach((form) => {
        const title = form.querySelector('.title_input').value.trim();
        const description = form.querySelector('.description_input').value.trim();

        // Only save if at least one field is filled
        if (title || description) {
            certifications.push({
                title,
                description
            });
        }
    });

    // Save certifications to local storage
    const existingData = JSON.parse(localStorage.getItem('resumeData')) || {};
    existingData.certifications = certifications; // Update the existing data with new certification entries
    localStorage.setItem('resumeData', JSON.stringify(existingData)); // Save back to local storage

    console.log("Certification data saved:", certifications);
}

// Function to retrieve the saved certification data
function getCertificationData() {
    const storedData = JSON.parse(localStorage.getItem('resumeData'));
    return storedData ? storedData.certifications : []; // Return the certifications data from local storage
}

// Function to update the certification preview
function updateCertificationPreview() {
    const certificationContainer = document.getElementById('certification_dsp');
    certificationContainer.innerHTML = '';

    const certifications = getCertificationData(); // Get certification data from local storage

    certifications.forEach((certification) => {
        const certDiv = document.createElement('div');
        certDiv.classList.add('certification-item');
        certDiv.innerHTML = `
            <h4>${certification.title}</h4>
            <p>${certification.description}</p>
        `;
        certificationContainer.appendChild(certDiv);
    });
}

// Event listeners for input changes to save and update preview
document.querySelector('.certification-section').addEventListener('input', saveCertificationData);



// imageStorage.js
// Function to save the uploaded image to localStorage after resizing
function saveImageData() {
    const imageInput = document.getElementById('image_input'); // Get the image input element

    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const image = new Image();
            image.src = e.target.result;

            // Resize the image once it's loaded
            image.onload = function () {
                const canvas = document.createElement('canvas');
                const maxWidth = 200; // Set max width (you can adjust this)
                const maxHeight = 200; // Set max height (you can adjust this)
                let width = image.width;
                let height = image.height;

                // Calculate the new dimensions while maintaining the aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.floor((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.floor((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                // Set the new dimensions on the canvas
                canvas.width = width;
                canvas.height = height;

                // Draw the resized image onto the canvas
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);

                // Convert the resized image back to a data URL
                const resizedImageData = canvas.toDataURL('image/jpeg', 0.8); // Adjust the quality (0.8 = 80%)

                // Save the resized image to localStorage
                const existingData = JSON.parse(localStorage.getItem('resumeData')) || {};
                existingData.image = resizedImageData;
                localStorage.setItem('resumeData', JSON.stringify(existingData));

                console.log("Resized image saved:", existingData);
            };
        };

        reader.readAsDataURL(file);
    } else {
        console.log("No image file selected.");
    }
}

// Add event listener to the image input to trigger the save function on change
document.getElementById('image_input').addEventListener('change', saveImageData);




const resumeData = {
    personalDetails: existingData.personalDetails,
    education: educationEntries,
    experience: experiences,
    projects: projects,
    certifications: certifications,
    skills: selectedSkills, // Add the selected skills here
    jobTitle: jobTitle, // Add the job title here
    image:existingData.image 
};

// Store the resume data in local storage
localStorage.setItem('resumeData', JSON.stringify(resumeData));

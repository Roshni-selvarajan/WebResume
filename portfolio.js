// Call loadData on page load
document.addEventListener('DOMContentLoaded', loadData);

// Function to load data from localStorage
function loadData() {
    const storedData = JSON.parse(localStorage.getItem('resumeData')); // Retrieve data from localStorage
    if (storedData) {
        // Populate personal details
        document.querySelector('.name_display').textContent = storedData.personalDetails?.name || '';
        document.querySelector('.address_display').textContent = storedData.personalDetails?.address || '';
        document.querySelector('.phone_display').textContent = storedData.personalDetails?.phone || '';
        document.querySelector('.email_display').textContent = storedData.personalDetails?.email || '';

        // Populate skills
        const skillsContainer = document.getElementById('skills_display');
        if (storedData.skills && storedData.skills.length > 0) {
            skillsContainer.innerHTML = storedData.skills
                .map(skill => `<span class="skill-item">${skill}</span>`)
                .join(' ');
        } else {
            skillsContainer.textContent = 'No skills added.';
        }

        // Populate job title
        const jobTitleContainer = document.getElementById('job_title_display');
        jobTitleContainer.textContent = storedData.jobTitle || 'No job title specified.';

        // Populate education fields
        const educationContainer = document.getElementById('education_display');
        if (storedData.education && storedData.education.length > 0) {
            storedData.education.forEach(edu => {
                const educationDiv = document.createElement('div');
                educationDiv.innerHTML = `
                    <p>Course: ${edu.course}</p>
                    <p>Institute: ${edu.institute}</p>
                    <p>Location: ${edu.location}</p>
                    <p>Start Date: ${edu.startDate}</p>
                    <p>End Date: ${edu.endDate}</p>
                    <p>Description: ${edu.description}</p>
                    <hr>
                `;
                educationContainer.appendChild(educationDiv);
            });
        }

        // Populate experience fields
        const experienceContainer = document.getElementById('experience_display');
        if (storedData.experience && storedData.experience.length > 0) {
            storedData.experience.forEach(exp => {
                const experienceDiv = document.createElement('div');
                experienceDiv.innerHTML = `
                    <p>Role: ${exp.role}</p>
                    <p>Company: ${exp.company}</p>
                    <p>Location: ${exp.location}</p>
                    <p>Start Date: ${exp.startDate}</p>
                    <p>End Date: ${exp.endDate || 'Present'}</p>
                    <p>Description: ${exp.description}</p>
                    <hr>
                `;
                experienceContainer.appendChild(experienceDiv);
            });
        }

        // Populate project fields
        const projectContainer = document.getElementById('projects_display');
        if (storedData.projects && storedData.projects.length > 0) {
            storedData.projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.innerHTML = `
                    <p>Title: ${project.title}</p>
                    <p>Showcase: ${project.showcase}</p>
                    <p>Description: ${project.description}</p>
                    <hr>
                `;
                projectContainer.appendChild(projectDiv);
            });
        }

        // Populate certification fields
        const certificationContainer = document.getElementById('certification_display');
        if (storedData.certifications && storedData.certifications.length > 0) {
            storedData.certifications.forEach(cert => {
                const certificationDiv = document.createElement('div');
                certificationDiv.innerHTML = `
                    <p>Title: ${cert.title}</p>
                    <p>Description: ${cert.description}</p>
                    <hr>
                `;
                certificationContainer.appendChild(certificationDiv);
            });
        }

        // Check if the image exists in the stored data
        if (storedData.image) {
            const resumeImage = document.getElementById('image_display'); // Replace 'image_display' with the actual ID of your image element
            resumeImage.src = storedData.image; // Set the image source to the saved image data URL
            resumeImage.style.display = 'block'; // Ensure the image is visible
            console.log("Image data found in resumeData.");
        } else {
            console.log("No image data found in resumeData.");
        }
    } else {
        console.error("No data found in localStorage for 'resumeData'.");
    }
}

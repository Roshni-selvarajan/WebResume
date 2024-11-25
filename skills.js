let skillsMap = {}; // Skills for each job title
let selectedSkills = []; // Selected skills

// Fetch skills from the JSON file
function fetchSkills() {
    return fetch('skills.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            skillsMap = data; // Save skills data
            console.log("Skills fetched:", skillsMap); // Debugging
        })
        .catch(error => console.error('Error fetching skills:', error));
}

// Show initial skills
function showSkills(title) {
    const skillsDiv = document.getElementById('skills');
    skillsDiv.innerHTML = '<h3>Select Skills</h3>'; // Reset skills display
    addCustomSkillInput(skillsDiv); // Add custom skill input first
    addSkillOptions(title, skillsDiv); // Display skills
}

// Add skill options based on the title
function addSkillOptions(title, skillsDiv) {
    if (skillsMap[title]) {
        const remainingSkills = skillsMap[title];

        // Create a container for the columns
        const columnDiv = document.createElement('div');
        columnDiv.className = 'skills-columns';

        // Create two columns
        const leftColumn = document.createElement('div');
        const rightColumn = document.createElement('div');
        leftColumn.className = 'skill-column';
        rightColumn.className = 'skill-column';

        remainingSkills.forEach((skill, index) => {
            const checkbox = createSkillCheckbox(skill);
            if (index % 2 === 0) {
                leftColumn.appendChild(checkbox);
            } else {
                rightColumn.appendChild(checkbox);
            }
        });

        columnDiv.appendChild(leftColumn);
        columnDiv.appendChild(rightColumn);
        skillsDiv.appendChild(columnDiv);
    } else {
        skillsDiv.innerHTML += '<p>No skills available for this job title.</p>';
    }
}

// Create checkbox for each skill
function createSkillCheckbox(skill) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = skill;
    checkbox.id = skill;

    const label = document.createElement('label');
    label.htmlFor = skill;
    label.textContent = skill;

    // Set checkbox state if the skill is already selected
    checkbox.checked = selectedSkills.includes(skill);
    checkbox.onclick = () => selectSkill(skill, checkbox.checked); // Handle selection

    const container = document.createElement('div');
    container.appendChild(checkbox);
    container.appendChild(label);
    return container; // Return the entire checkbox container
}

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
}

// Function to add custom skill input field
function addCustomSkillInput(skillsDiv) {
    const customSkillInput = document.createElement('input');
    customSkillInput.type = 'text';
    customSkillInput.placeholder = 'Type a custom skill...';
    customSkillInput.id = 'custom_skill_input'; // ID for the custom skill input

    // Add event listener to handle adding custom skills
    customSkillInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && customSkillInput.value.trim() !== '') {
            const skill = customSkillInput.value.trim();
            addCustomSkill(skill);
            customSkillInput.value = ''; // Clear input field after adding
        }
    });

    skillsDiv.appendChild(customSkillInput); // Add custom input to the skills section
}

// Function to add a custom skill to the preview
function addCustomSkill(skill) {
    if (!selectedSkills.includes(skill)) {
        selectedSkills.push(skill);
        const selectedSkillsDiv = document.getElementById('skills_dsp');
        updateSkillsPreview(selectedSkillsDiv);
    }
}

// Function to update the skills preview display
function updateSkillsPreview(selectedSkillsDiv) {
    selectedSkillsDiv.innerHTML = selectedSkills.map(s => `<div class="skill-item"> ${s}</div>`).join(''); // Add class for styling
}


// Fetch skills on page load
fetchSkills();

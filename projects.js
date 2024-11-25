// Array to store projects
let projects = [];

// Function to initialize the first project form
function initializeFirstProjectForm() {
    const projectContainer = document.querySelector('.projects-section');

    projectContainer.innerHTML += `
    <div class="project-details" style="width: 100%;">
        <div class="input-wrapper" style="display: flex; justify-content: space-between; gap: 20px;">
            <!-- Left column -->
            <div class="left-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="project_title_input" class="labelStyle">Title</label><br/>
                    <input type="text" placeholder="Title" class="title_input"  id="inputFields"/>
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="project_showcase_input" class="labelStyle">Showcase</label>
                    <input type="text" placeholder="Showcase" class="showcase_input" id="inputFields" />
                </div>
            </div>

            <!-- Right column -->
            <div class="right-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="project_description_input" class="labelStyle">Description</label>
                    <textarea placeholder="Description" class="description_input" id="inputFields" style="white-space: pre-wrap; min-height: 80px; resize: vertical;"></textarea>
                    <button class="generate_description" style="
                    color: white;
                    background-color: #2284E7;
                    border: none;
                    padding: 5px 10px;
                    margin-top: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;">
                    Generate Description
                </button>
                <span class="loading-text" style="display: none; color: #666;">Generating description...</span>
                </div>

            </div>
        </div>

        <button class="clear_fields" id="buttonStyle">Clear Fields</button>
        <br/><br/>
    </div>

    <button id="add_more_project" style="
        color: white;
        background-color: #2284E7;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;">
        Add New Project
    </button>
`;

    // Add event listeners for buttons
    addProjectFormListeners(projectContainer);
    
    // Add generate description listener
    const generateBtn = projectContainer.querySelector('.generate_description');
    generateBtn.addEventListener('click', () => generateProjectDescription(projectContainer));

    // Add event listener to the "Add New Project" button
    document.getElementById('add_more_project').addEventListener('click', createProjectForm);
}

// Function to create a new project form
function createProjectForm() {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-details');

    projectContainer.innerHTML = `
        <div class="input-wrapper" style="display: flex; justify-content: space-between; gap: 20px;">
<!-- Left column -->
            <div class="left-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="project_title_input" class="labelStyle">Title</label><br/>
                    <input type="text" placeholder="Title" class="title_input"  id="inputFields"/>
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="project_showcase_input" class="labelStyle">Showcase</label>
                    <input type="text" placeholder="Showcase" class="showcase_input" id="inputFields" />
                </div>
            </div>

            <!-- Right column -->
            <div class="right-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="project_description_input" class="labelStyle">Description</label>
                    <textarea placeholder="Description" class="description_input" id="inputFields"></textarea>
                    <button class="generate_description" style="
                        color: white;
                        background-color: #2284E7;
                        border: none;
                        padding: 5px 10px;
                        margin-top: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;">
                        Generate Description
                    </button>
                    <span class="loading-text" style="display: none; color: #666;">Generating description...</span>
                </div>
            </div>
        </div>

        <button class="clear_fields" id="buttonStyle">Clear Fields</button>
        <br/><br/>
        <button class="remove_project" style="
            color: white;
            background-color: #dc3545;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;">
            Remove Project
        </button>

    `;

    // Add event listeners for buttons
    addProjectFormListeners(projectContainer);

    // Add generate description listener
    const generateBtn = projectContainer.querySelector('.generate_description');
    generateBtn.addEventListener('click', () => generateProjectDescription(projectContainer));

    document.querySelector('.projects-section').appendChild(projectContainer);
}

// Function to generate project description
async function generateProjectDescription(container) {
    const title = container.querySelector('.title_input').value.trim();
    const showcase = container.querySelector('.showcase_input').value.trim();
    
    if (!title || !showcase) {
        alert('Please fill in at least the title and showcase fields.');
        return;
    }

    const loadingText = container.querySelector('.loading-text');
    const generateButton = container.querySelector('.generate_description');
    const descriptionInput = container.querySelector('.description_input');
    
    // Show loading state
    loadingText.style.display = 'inline';
    generateButton.disabled = true;

    const prompt = `Generate a powerful 2-line project description:

    Title: ${title}
    Showcase: ${showcase}
    
    Requirements:
    - Start each point with strong action verbs (e.g., Led, Developed, Implemented)
    - Second line highlights key features or achievements
    - Start each line with strong action verbs
    - Use technical terminology appropriate for the project
    - Highlight innovation and problem-solving aspects
    - Maximum 8 words per line
    - Avoid mentioning project name in description and "*, #"
    - Focus on measurable impact where possible
    - Keep tone professional and technical`;

    const apiKey = 'AIzaSyBgUvTOwLFp52IDjKl94aCYHzp2LWUOqx8'; // Replace with your actual API key

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate description');
        }

        const result = await response.json();
        const generatedText = result.candidates[0].content.parts[0].text;

        // Update the description input
        descriptionInput.value = generatedText;

        requestAnimationFrame(() => {
            updateProjectPreview();
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate description. Please try again or write manually.');
    } finally {
        // Hide loading state
        loadingText.style.display = 'none';
        generateButton.disabled = false;
    }
}

// Function to add event listeners to form elements
function addProjectFormListeners(container) {
    // Clear fields listener
    container.querySelector('.clear_fields').addEventListener('click', () => {
        clearProjectFields(container);
    });

    // Remove project listener
    const removeBtn = container.querySelector('.remove_project');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            container.remove();
            updateProjectPreview();
        });
    }

    // Input listeners for updating the preview
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', handleInputEvent);
        input.addEventListener('change', handleInputEvent);
    });
}

// Handler function for input changes
function handleInputEvent() {
   requestAnimationFrame(() => {
       updateProjectPreview();
   });
}

// Function to clear project fields
function clearProjectFields(container) {
    container.querySelectorAll('input, textarea').forEach(input => input.value = '');
    updateProjectPreview();
 }
 
 // Function to update project preview
 function updateProjectPreview() {
    const projectsContainer = document.getElementById('projects_dsp');
    projectsContainer.innerHTML = '';
 
    const projectForms = document.querySelectorAll('.project-details');
 
    projectForms.forEach((form) => {
        const title = form.querySelector('.title_input')?.value.trim() || '';
        const showcase = form.querySelector('.showcase_input')?.value.trim() || '';
        const description = form.querySelector('.description_input')?.value.trim() || '';
 
        // Only add to preview if at least one field is filled
        if (title || showcase || description) {
            const projDiv = document.createElement('div');
            projDiv.classList.add('project-item');
            projDiv.innerHTML = `
                <h4>${title}</h4>
                <p>${showcase}</p>
                <p style="white-space: pre-wrap;">${description}</p>
            `;
            projectsContainer.appendChild(projDiv);
        }
    });
 }
 
 // Initialize the first project form
 initializeFirstProjectForm();
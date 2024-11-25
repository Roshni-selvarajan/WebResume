
// Array to store experiences
let experiences = [];

function initializeFirstExperienceForm() {
    const firstExperienceContainer = document.querySelector('.experience-section');

    firstExperienceContainer.innerHTML += `
      <div class="experience-details" style="width: 100%;">
    <div class="input-wrapper" style="display: flex; justify-content: space-between; gap: 20px;">
        <!-- Left column -->
        <div class="left-column" style="display: flex; flex-direction: column; width: 48%;">
            <div style="margin-bottom: 8px;">
                <label for="role_input" class="labelStyle">Designation</label>
                <input type="text" placeholder="Designation" class="role_input" id="inputFields" />
            </div>
            <div style="margin-bottom: 0px;">
                <label for="company_input" class="labelStyle">Company/Organization</label>
                <input type="text" placeholder="Company/Organization" class="company_input" id="inputFields" />
            </div>
            <div>
                <label for="location_input" class="labelStyle">Location</label><br>
                <input type="text" placeholder="Location" class="location_input" id="inputFields" />
            </div>
        </div>

        <!-- Right column -->
        <div class="right-column" style="display: flex; flex-direction: column; width: 48%;">
            <div style="margin-bottom: 8px;">
                <label for="startdate_input" class="labelStyle">Start Date:</label>
                <input type="date" class="startdate_input" id="inputFields" />
            </div>
            <div style="margin-bottom: 8px;">
                <label for="enddate_input" class="labelStyle">End Date:</label><br>
                <input type="date" class="enddate_input" id="inputFields"/>
            </div>
            <div style="margin-bottom: 8px;">
                <label for="description_input" class="labelStyle">Description</label>
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

      <button id="add_more_experience" style="
    color: white;
    background-color: #2284E7;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;">
    Add New Experience
</button>
    `;

    // Add all event listeners for the first form
    addExperienceFormListeners(firstExperienceContainer.querySelector('.experience-details'));

    // Add event listener for add more button
    document.getElementById('add_more_experience').addEventListener('click', createExperienceForm);
}

function createExperienceForm() {
    const experienceContainer = document.createElement('div');
    experienceContainer.classList.add('experience-details');

    // Previous HTML structure remains the same
    experienceContainer.innerHTML = `
        <div class="input-wrapper" style="display: flex; justify-content: space-between; gap: 20px;">
            <!-- Left column -->
            <div class="left-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="role_input" class="labelStyle">Designation</label>
                    <input type="text" placeholder="Designation" class="role_input" id="inputFields" />
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="company_input" class="labelStyle">Company/Organization</label>
                    <input type="text" placeholder="Company/Organization" class="company_input" id="inputFields" />
                </div>
                <div>
                    <label for="location_input" class="labelStyle">Location</label><br>
                    <input type="text" placeholder="Location" class="location_input" id="inputFields" />
                </div>
            </div>

            <!-- Right column -->
            <div class="right-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="startdate_input" class="labelStyle">Start Date:</label>
                    <input type="date" class="startdate_input" id="inputFields" />
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="enddate_input" class="labelStyle">End Date:</label><br> 
                    <input type="date" class="enddate_input" id="inputFields"/>
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="description_input" class="labelStyle">Description</label>
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
        <button class="remove_experience" style="
            color: white;
            background-color: #dc3545;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;">
            Remove Experience
        </button>
    `;

    // Add the new form to the DOM first
    document.querySelector('.experience-section').appendChild(experienceContainer);

    // Then add event listeners
    addExperienceFormListeners(experienceContainer);
    
    // Update preview after adding new form
    updateExperiencePreview();
}

function addExperienceFormListeners(container) {
    // Add input and change event listeners to all input fields
    container.querySelectorAll('input, textarea').forEach(input => {
        const updateHandler = () => {
            requestAnimationFrame(() => {
                updateExperiencePreview();
                if (!input.classList.contains('description_input')) {
                    checkForAutoGenerate(input);
                }
            });
        };

        // Remove existing listeners to prevent duplicates
        input.removeEventListener('input', updateHandler);
        input.removeEventListener('change', updateHandler);

        // Add new listeners
        input.addEventListener('input', updateHandler);
        input.addEventListener('change', updateHandler);
    });

    // Add button event listeners
    const generateBtn = container.querySelector('.generate_description');
    generateBtn.addEventListener('click', () => generateExperienceDescription(container));

    const clearBtn = container.querySelector('.clear_fields');
    clearBtn.addEventListener('click', () => clearExperienceFields(container));

    const removeBtn = container.querySelector('.remove_experience');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            container.remove();
            updateExperiencePreview();
        });
    }
}

function updateExperiencePreview() {
    const experiencesContainer = document.getElementById('experiences_dsp');
    if (!experiencesContainer) return; // Guard clause for missing container

    experiencesContainer.innerHTML = '';
    
    document.querySelectorAll('.experience-details').forEach((form) => {
        const role = form.querySelector('.role_input')?.value?.trim() || '';
        const company = form.querySelector('.company_input')?.value?.trim() || '';
        const location = form.querySelector('.location_input')?.value?.trim() || '';
        const startDate = form.querySelector('.startdate_input')?.value || '';
        const endDate = form.querySelector('.enddate_input')?.value || '';
        const description = form.querySelector('.description_input')?.value?.trim() || '';

        // Only add to preview if at least one field is filled
        if (role || company || location || startDate || description) {
            const expDiv = document.createElement('div');
            expDiv.classList.add('experience-item');
            expDiv.innerHTML = `
                <h4>${role}</h4>
                <p>${company}${location ? `, ${location}` : ''}</p>
                <p>${startDate ? new Date(startDate).toLocaleDateString() : ''} - ${endDate ? new Date(endDate).toLocaleDateString() : 'Present'}</p>
                ${description ? `<p>${description}</p>` : ''}
            `;
            experiencesContainer.appendChild(expDiv);
        }
    });
}




async function generateExperienceDescription(container) {
    const role = container.querySelector('.role_input').value.trim();
    const company = container.querySelector('.company_input').value.trim();
    const location = container.querySelector('.location_input').value.trim();
    const startDate = container.querySelector('.startdate_input').value;
    const endDate = container.querySelector('.enddate_input').value;
    
    if (!role || !company) {
        alert('Please fill in at least the role and company fields.');
        return;
    }

    const loadingText = container.querySelector('.loading-text');
    const generateButton = container.querySelector('.generate_description');
    const descriptionInput = container.querySelector('.description_input');
    
    // Show loading state
    loadingText.style.display = 'inline';
    generateButton.disabled = true;

    const prompt = `Generate a professional 2 lines bullet-point description for this role perfect for a resume:

    Role: ${role}
    Company: ${company}
    Location: ${location}
    Time Period: ${startDate} to ${endDate || 'Present'}
    
    Requirements:
    - Start each point with strong action verbs (e.g., Led, Developed, Implemented)
    - Focus on key responsibilities and measurable achievements
    - Avoid mentioning company name and location in the description
    - Include both technical and soft skills relevant to the role
    - Use industry-standard terminology for this position
    - Keep points concise and impactful
    - Focus on universal responsibilities for this role without specific values
    - Write in past tense if ended, present tense if current role
    - Points contain maximum 8 words`;
    
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
            updateExperiencePreview();
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



function clearExperienceFields(container) {
    container.querySelectorAll('input, textarea').forEach(input => input.value = '');
    requestAnimationFrame(() => {
        updateExperiencePreview();
    });
}

function checkForAutoGenerate(input) {
    // First update the preview
    requestAnimationFrame(() => {
        updateExperiencePreview();
    });
    
    // Get the container of the current experience form
    const container = input.closest('.experience-details');
    
    // Check if all required fields are filled
    const role = container.querySelector('.role_input')?.value.trim() || '';
    const company = container.querySelector('.company_input')?.value.trim() || '';
    const location = container.querySelector('.location_input')?.value.trim() || '';
    const startDate = container.querySelector('.startdate_input')?.value || '';
    
    // If all main fields are filled, enable the generate button
    const generateButton = container.querySelector('.generate_description');
    if (role && company && location && startDate) {
        generateButton.disabled = false;
    } else {
        generateButton.disabled = true;
    }
}



// Initialize the first experience form
initializeFirstExperienceForm();
// Array to store certifications
let certifications = [];

// Function to initialize the first certification form
function initializeFirstCertificationForm() {
    const certificationContainer = document.querySelector('.certification-section');

    certificationContainer.innerHTML += `
    <div class="certification-details" style="width: 100%;">
        <div class="input-wrapper" style="display: flex; justify-content: space-between; gap: 20px;">
            <!-- Left column -->
            <div class="left-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="certification_title_input" class="labelStyle">Title</label><br/>
                    <input type="text" placeholder="Title" class="title_input"  id="inputFields"/>
                </div>
            </div>

            <!-- Right column -->
            <div class="right-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="certification_description_input" class="labelStyle">Description</label>
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

    <button id="add_more_certification" style="
        color: white;
        background-color: #2284E7;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;">
        Add New Certification
    </button>
`;

    // Add event listeners for buttons
    addCertificationFormListeners(certificationContainer);
    
    // Add generate description listener
    const generateBtn = certificationContainer.querySelector('.generate_description');
    generateBtn.addEventListener('click', () => generateCertificationDescription(certificationContainer));

    // Add event listener to the "Add New Certification" button
    document.getElementById('add_more_certification').addEventListener('click', createCertificationForm);
}

// Function to create a new certification form
function createCertificationForm() {
    const certificationContainer = document.createElement('div');
    certificationContainer.classList.add('certification-details');

    certificationContainer.innerHTML = `
        <div class="input-wrapper" style="display: flex; justify-content: space-between; gap: 20px;">
            <!-- Left column -->
            <div class="left-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="certification_title_input" class="labelStyle">Title</label><br/>
                    <input type="text" placeholder="Title" class="title_input"  id="inputFields"/>
                </div>
            </div>

            <!-- Right column -->
            <div class="right-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="certification_description_input" class="labelStyle">Description</label>
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
        <button class="remove_certification" style="
            color: white;
            background-color: #dc3545;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;">
            Remove Certification
        </button>
    `;

    // Add event listeners for buttons
    addCertificationFormListeners(certificationContainer);

    // Add generate description listener
    const generateBtn = certificationContainer.querySelector('.generate_description');
    generateBtn.addEventListener('click', () => generateCertificationDescription(certificationContainer));

    document.querySelector('.').appendChild(certificationContainer);
}

// Function to generate certification description
async function generateCertificationDescription(container) {
    const title = container.querySelector('.title_input').value.trim();
    
    if (!title) {
        alert('Please fill in the title field.');
        return;
    }

    const loadingText = container.querySelector('.loading-text');
    const generateButton = container.querySelector('.generate_description');
    const descriptionInput = container.querySelector('.description_input');
    
    // Show loading state
    loadingText.style.display = 'inline';
    generateButton.disabled = true;

    const prompt = `Generate a concise certification achievement point:

Title: ${title}

Requirements:
- One powerful point describing achievement, skills, and value (12 words max)
- Start with strong action verb (e.g., Mastered, Achieved, Earned)
- Use relevant technical terminology
- Focus on expertise gained or competencies mastered
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
            updateCertificationPreview();
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
function addCertificationFormListeners(container) {
    // Clear fields listener
    container.querySelector('.clear_fields').addEventListener('click', () => {
        clearCertificationFields(container);
    });

    // Remove certification listener
    const removeBtn = container.querySelector('.remove_certification');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            container.remove();
            updateCertificationPreview();
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
       updateCertificationPreview();
   });
}

// Function to clear certification fields
function clearCertificationFields(container) {
    container.querySelectorAll('input, textarea').forEach(input => input.value = '');
    updateCertificationPreview();
}

// Function to update certification preview
function updateCertificationPreview() {
    const certificationsContainer = document.getElementById('certifications_dsp');
    certificationsContainer.innerHTML = '';

    const certificationForms = document.querySelectorAll('.certification-details');

    certificationForms.forEach((form) => {
        const title = form.querySelector('.title_input')?.value.trim() || '';
        const description = form.querySelector('.description_input')?.value.trim() || '';

        // Only add to preview if at least one field is filled
        if (title || description) {
            const certDiv = document.createElement('div');
            certDiv.classList.add('certification-item');
            certDiv.innerHTML = `
                <h4>${title}</h4>
                <p style="white-space: pre-wrap;">${description}</p>
            `;
            certificationsContainer.appendChild(certDiv);
        }
    });
}

// Initialize the first certification form
initializeFirstCertificationForm();
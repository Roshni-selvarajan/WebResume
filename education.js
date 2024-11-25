// Array to store education entries
let educationEntries = [];

function initializeFirstEducationForm() {
    const firstEducationContainer = document.querySelector('.education-section');

    firstEducationContainer.innerHTML += `
    <div class="education-details" style="width: 100%;">
        <div class="input-wrapper" style="display: flex; justify-content: space-between; gap: 20px;">
            <!-- Left column -->
            <div class="left-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="course_input" class="labelStyle">Stream/Course</label><br/>
                    <input type="text" placeholder="Stream/Course" id="inputFields" class="course_input" />
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="institute_input" class="labelStyle">Institute</label><br/>
                    <input type="text" id="inputFields" placeholder="Institute" class="institute_input" />
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="education_location_input" class="labelStyle">Location</label><br/>
                    <input type="text" id="inputFields" placeholder="Location" class="location_input" />
                </div>
            </div>

            <!-- Right column -->
            <div class="right-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="education_startdate_input" class="labelStyle">Start Date:</label> <br/>
                    <input type="date" id="inputFields" class="startdate_input" />
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="education_enddate_input" class="labelStyle">End Date:</label><br/>
                    <input type="date" id="inputFields" class="enddate_input" />
                </div>
            </div>
        </div>

        <button class="clear_fields" id="buttonStyle">
            Clear Fields
        </button>
        <br/><br/>
    </div>

    <button id="add_more_education" style="
        color: white;
        background-color: #2284E7;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    ">
        Add New Education
    </button>
`;

    // Add event listeners for all inputs in the first form
    addInputListeners(firstEducationContainer);

    // Clear fields for the first section
    firstEducationContainer.querySelector('.clear_fields').addEventListener('click', () => {
        clearEducationFields(firstEducationContainer.querySelector('.education-details'));
    });

    document.getElementById('add_more_education').addEventListener('click', createEducationForm);
}

function createEducationForm() {
    const educationContainer = document.createElement('div');
    educationContainer.classList.add('education-details');

    educationContainer.innerHTML = `
        <div class="input-wrapper" style="display: flex; justify-content: space-between; gap: 20px;">
            <!-- Left column -->
            <div class="left-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="course_input" class="labelStyle">Stream/Course</label><br/>
                    <input type="text" placeholder="Stream/Course" id="inputFields" class="course_input" />
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="institute_input" class="labelStyle">Institute</label><br/>
                    <input type="text" id="inputFields" placeholder="Institute" class="institute_input" />
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="education_location_input" class="labelStyle">Location</label><br/>
                    <input type="text" id="inputFields" placeholder="Location" class="location_input" />
                </div>
            </div>

            <!-- Right column -->
            <div class="right-column" style="display: flex; flex-direction: column; width: 48%;">
                <div style="margin-bottom: 8px;">
                    <label for="education_startdate_input" class="labelStyle">Start Date:</label> <br/>
                    <input type="date" id="inputFields" class="startdate_input" />
                </div>
                <div style="margin-bottom: 8px;">
                    <label for="education_enddate_input" class="labelStyle">End Date:</label><br/>
                    <input type="date" id="inputFields" class="enddate_input" />
                </div>
                
            </div>
        </div>

        <button class="clear_fields" id="buttonStyle">
            Clear Fields
        </button>
        <br/><br/>
    <button class="remove_education" style="
        color: white;
        background-color: #2284E7;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    ">Remove</button>
    `;

    // Add event listeners for all inputs in the new form
    addInputListeners(educationContainer);

    // Add event listeners for buttons
    educationContainer.querySelector('.clear_fields').addEventListener('click', () => {
        clearEducationFields(educationContainer);
    });
    educationContainer.querySelector('.remove_education').addEventListener('click', () => {
        educationContainer.remove();
        updateEducationPreview();
    });

    document.querySelector('.education-section').appendChild(educationContainer);
}

function addInputListeners(container) {
    // Add input and change event listeners to all input fields
    container.querySelectorAll('input, textarea').forEach(input => {
        ['input', 'change'].forEach(eventType => {
            input.addEventListener(eventType, () => {
                requestAnimationFrame(() => {
                    updateEducationPreview();
                });
            });
        });
    });
}

function clearEducationFields(container) {
    container.querySelectorAll('input, textarea').forEach(input => input.value = '');
    updateEducationPreview();
}

function updateEducationPreview() {
    const educationContainer = document.getElementById('educations_dsp');
    educationContainer.innerHTML = '';

    const educationForms = document.querySelectorAll('.education-details');

    educationForms.forEach((form) => {
        const course = form.querySelector('.course_input')?.value.trim() || '';
        const institute = form.querySelector('.institute_input')?.value.trim() || '';
        const location = form.querySelector('.location_input')?.value.trim() || '';
        const startDate = form.querySelector('.startdate_input')?.value || '';
        const endDate = form.querySelector('.enddate_input')?.value || '';
        const description = form.querySelector('.description_input')?.value.trim() || '';

        // Only add to preview if at least one field is filled
        if (course || institute || location || startDate || description) {
            const eduDiv = document.createElement('div');
            eduDiv.classList.add('education-item');
            eduDiv.innerHTML = `
                <h4>${course}</h4>
                <p>${institute}${location ? ', ' + location : ''}</p>
                <p>${startDate}${endDate ? ' - ' + endDate : ' - Present'}</p>
            `;
            educationContainer.appendChild(eduDiv);
        }
    });
}

// Initialize the first education form
initializeFirstEducationForm();

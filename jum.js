let jobTitles = [];

// Fetch job titles from the text file
fetch('job_titles.txt')
    .then(response => response.text())
    .then(data => {
        jobTitles = data.split('\n').map(title => title.trim()).filter(title => title);
    });

// Select title function
function selectTitle(title) {
    document.getElementById('job-title').value = title;
    document.getElementById('suggestions').style.display = 'none';
    updatePreview(title);
    
    // Call showSkills only after fetchSkills completes
    fetchSkills().then(() => {
        showSkills(title);
    }).catch(error => {
        console.error('Error showing skills:', error);
    });
}

function updatePreview(title) {
    document.getElementById('job-role_dsp').textContent = title;
}

function showSuggestions(input) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    
    if (!input) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    const filteredTitles = jobTitles.filter(title => title.toLowerCase().includes(input.toLowerCase()));
    
    if (filteredTitles.length > 0) {
        suggestionsDiv.style.display = 'block';
        filteredTitles.forEach(title => {
            const div = document.createElement('div');
            div.textContent = title;
            div.classList.add('suggestion-item');
            div.onclick = () => selectTitle(title);
            suggestionsDiv.appendChild(div);
        });
    } else {
        suggestionsDiv.style.display = 'none';
    }
}


// Function to toggle visibility of download options
document.getElementById('shareDownloadBtn').addEventListener('click', function () {
    const downloadOptions = document.getElementById('downloadOptions');
    // Toggle visibility
    downloadOptions.style.display = downloadOptions.style.display === 'none' ? 'block' : 'none';
});

// Function to download the resume as a PDF
document.getElementById('downloadPdfBtn').addEventListener('click', function () {
    printCV(); // Assuming printCV() handles PDF generation
});

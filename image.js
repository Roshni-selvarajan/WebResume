// Function to initialize the image upload section
function initializeImageUpload() {
    const imageContainer = document.querySelector('.image-upload-section');

    // Create the image input element
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*'; // Accepts image files only
    imageInput.id = 'image_input';

    // Add an event listener to handle image upload
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const resumeImage = document.getElementById('image_dsp'); // Get the image element in the resume preview
                resumeImage.src = e.target.result; // Set the image source to the uploaded file
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });

    // Append the input to the container
    imageContainer.innerHTML = '<h3>Upload Image</h3>'; // Reset the container
    imageContainer.appendChild(imageInput);
}

// Initialize the image upload functionality
initializeImageUpload();

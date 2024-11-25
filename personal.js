// Function to update the preview with personal details
function updatePersonalDetails() {
    const name = document.getElementById('name_input').value;
    const address = document.getElementById('address_input').value;
    const phone = document.getElementById('phone_input').value;
    const email = document.getElementById('email_input').value;

    // Update the preview section with the input values
    document.getElementById('fullname_dsp').textContent = name; // Display name in preview
    document.getElementById('address_dsp').textContent = address; // Display address in preview
    document.getElementById('phoneno_dsp').textContent = phone; // Display phone in preview
    document.getElementById('email_dsp').textContent = email; // Display email in preview
}

// Add event listeners to the input fields to update preview on input
document.getElementById('name_input').addEventListener('input', updatePersonalDetails);
document.getElementById('address_input').addEventListener('input', updatePersonalDetails);
document.getElementById('phone_input').addEventListener('input', updatePersonalDetails);
document.getElementById('email_input').addEventListener('input', updatePersonalDetails);

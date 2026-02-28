// ui.ts

// This file contains the UI logic for the Figma plugin.

// Function to initialize the UI
function initUI() {
    const button = document.getElementById('myButton');
    button.onclick = () => {
        // Handle button click event
        console.log('Button clicked!');
    };
}

// Function to show a message in the UI
function showMessage(message: string) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

// Initialize UI when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    initUI();
});
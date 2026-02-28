// plugin.ts

// This is the entry point for the Figma plugin.
figma.showUI(__html__);

// Listen for messages from the UI
figma.ui.onmessage = (msg) => {
    if (msg.type === 'create-rectangle') {
        const rect = figma.createRectangle();
        rect.x = msg.x; // Position from message
        rect.y = msg.y; // Position from message
        rect.resize(msg.width, msg.height); // Size from message
        figma.currentPage.appendChild(rect);
        figma.closePlugin();
    }
};
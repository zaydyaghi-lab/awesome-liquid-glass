// ui.ts — Liquid Glass Figma Plugin UI logic

/**
 * Sends a create-component message to plugin.ts for the given preset.
 */
function sendPreset(preset: string): void {
  parent.postMessage(
    { pluginMessage: { type: 'create-component', preset } },
    '*'
  );
}

/**
 * Show a brief success toast notification in the UI.
 */
function showToast(): void {
  const toast = document.getElementById('toast') as HTMLElement;
  toast.classList.remove('show');
  void toast.offsetWidth; // force reflow to restart animation
  toast.classList.add('show');
}

// Attach click handlers to all preset cards
document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
  card.addEventListener('click', () => {
    const preset = card.getAttribute('data-preset');
    if (preset) {
      sendPreset(preset);
      showToast();
    }
  });
});

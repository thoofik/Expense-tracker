// Theme functionality based on system preference only
function setupTheme() {
  // Apply theme based on system preference
  applySystemTheme();
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', applySystemTheme);
}

// Apply theme based on system preference
function applySystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log(`System prefers dark: ${prefersDark}`);
  
  if (prefersDark) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', setupTheme); 
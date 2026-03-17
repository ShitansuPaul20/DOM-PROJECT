
function applyGlobalTheme() {
    let savedTheme = localStorage.getItem('focusTheme') || 'light';
    console.log("Applying theme:", savedTheme); 

    if (savedTheme === 'dark') {

        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark'); 
    } else {

        document.documentElement.removeAttribute('data-theme');
        document.body.removeAttribute('data-theme'); 
    }

    let themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        console.log("Icon synchronized!");
    }
}


applyGlobalTheme();

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        console.log("Page loaded from Back-Forward Cache! Forcing theme update...");
        applyGlobalTheme();
    }
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log("Tab is visible again! Forcing theme update...");
        applyGlobalTheme();
    }
});

window.addEventListener('focus', applyGlobalTheme);

window.addEventListener('storage', function(e) {
    if (e.key === 'focusTheme') {
        console.log("Theme changed in another tab! Syncing...");
        applyGlobalTheme();
    }
});

function toggleGlobalTheme() {
    let currentTheme = localStorage.getItem('focusTheme') || 'light';
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log("Button clicked! Changing theme to:", newTheme);
    localStorage.setItem('focusTheme', newTheme);
    applyGlobalTheme();
}
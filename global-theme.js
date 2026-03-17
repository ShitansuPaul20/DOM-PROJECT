// ====== global-theme.js (Theme Master) ======

function applyGlobalTheme() {
    let savedTheme = localStorage.getItem('focusTheme') || 'light';
    
    if (savedTheme === 'dark') {
        // HTML aur Body dono pe lagao taaki koi CSS miss na ho
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.body.removeAttribute('data-theme');
    }

    // Icon ko update karo (Agar Home page pe ho toh)
    let themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    }
}

// 1. Page load hote hi turant apply karo
applyGlobalTheme();

// 2. bfcache (Back Button) Bug Fix
window.addEventListener('pageshow', applyGlobalTheme);

// 3. Dusre tab mein theme badle toh yahan bhi badal jaye
window.addEventListener('storage', (e) => {
    if (e.key === 'focusTheme') applyGlobalTheme();
});

// 4. Button Click Function (Home page ke moon/sun button ke liye)
function toggleGlobalTheme() {
    let currentTheme = localStorage.getItem('focusTheme') || 'light';
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('focusTheme', newTheme);
    applyGlobalTheme();
}
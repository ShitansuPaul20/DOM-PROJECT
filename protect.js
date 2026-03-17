// ====== protect.js (Route Guard) ======
// Is code ko turant chalne do taaki page load hone se pehle user ko bahaar nikaal sake
(function() {
    const user = localStorage.getItem('focusUser');
    const currentUrl = window.location.pathname.toLowerCase();
    
    // Check karo ki user Home Page pe toh nahi hai
    const isHomePage = currentUrl.endsWith('index.htm') || currentUrl.endsWith('/');

    // Agar user Home Page pe NAHI hai, AUR wo logged in NAHI hai -> Wapas Home pe bhejo
    if (!isHomePage && !user) {
        console.log("Unauthorized Access! Redirecting to Home...");
        window.location.replace('./index.htm'); 
    }
})();
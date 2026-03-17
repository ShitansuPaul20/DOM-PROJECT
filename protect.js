// protect.js
(function() {
    let user = localStorage.getItem('focusUser');
    // Agar local storage mein user data nahi hai, toh seedha Home (index.html) pe bhej do
    if (!user) {
        window.location.replace('index.html'); 
    }
})();
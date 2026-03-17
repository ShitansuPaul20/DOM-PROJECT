// ====== auth.js (Authentication & Home Page Controller) ======

// --- MODAL (POPUP) LOGIC ---
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const profilePage = document.getElementById('profilePage');

function openModal(type) {
    if(authModal) authModal.classList.remove('hidden');
    switchForm(type);
}

function closeModal() {
    if(authModal) authModal.classList.add('hidden');
}

function switchForm(type) {
    if(loginForm) loginForm.classList.add('hidden');
    if(signupForm) signupForm.classList.add('hidden');
    if(profilePage) profilePage.classList.add('hidden');

    if (type === 'login' && loginForm) loginForm.classList.remove('hidden');
    if (type === 'signup' && signupForm) signupForm.classList.remove('hidden');
    if (type === 'profile') {
        if(profilePage) profilePage.classList.remove('hidden');
        loadProfileData();
    }
}

// Bahar click karne pe modal band karna (Sirf tab jab user logged in ho)
if(authModal) {
    authModal.addEventListener('click', (e) => {
        const user = localStorage.getItem('focusUser');
        if (e.target === authModal && user) { 
            closeModal();
        }
    });
}

// --- LOGIN / SIGNUP LOGIC ---
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('focusUser'));
    const loggedOutNav = document.getElementById('loggedOutNav');
    const loggedInNav = document.getElementById('loggedInNav');
    const closeBtns = document.querySelectorAll('.close-btn'); 

    if (user) {
        if(loggedOutNav) loggedOutNav.classList.add('hidden');
        if(loggedInNav) loggedInNav.classList.remove('hidden');
        let navAv = document.getElementById('navAvatar');
        if(navAv) navAv.innerText = user.name.charAt(0).toUpperCase();
        
        // Logged in hai toh 'X' button dikhao
        closeBtns.forEach(btn => btn.style.display = 'block');
    } else {
        if(loggedOutNav) loggedOutNav.classList.remove('hidden');
        if(loggedInNav) loggedInNav.classList.add('hidden');
        
        // Bina login 'X' button chupao
        closeBtns.forEach(btn => btn.style.display = 'none');
        
        // App khulte hi Signup form dikhao
        openModal('signup');
    }
}

function processSignup() {
    const name = document.getElementById('signName').value.trim();
    const email = document.getElementById('signEmail').value.trim();
    const pass = document.getElementById('signPass').value;

    if(!name || !email || !pass) return alert("Please fill all fields!");

    const user = { name, email, pass };
    localStorage.setItem('focusUser', JSON.stringify(user));
    updateNavbar();
    closeModal();
}

function processLogin() {
    const email = document.getElementById('logEmail').value.trim();
    const pass = document.getElementById('logPass').value;
    const savedUser = JSON.parse(localStorage.getItem('focusUser'));

    if(!savedUser) return alert("No account found. Please sign up!");
    if(savedUser.email !== email || savedUser.pass !== pass) return alert("Invalid credentials!");

    updateNavbar();
    closeModal();
}

function processLogout() {
    localStorage.removeItem('focusUser'); 
    updateNavbar();
}

// --- PROFILE DATA ---
function loadProfileData() {
    const user = JSON.parse(localStorage.getItem('focusUser'));
    if(!user) return;

    document.getElementById('profileName').innerText = user.name;
    document.getElementById('profileEmail').innerText = user.email;
    document.getElementById('profileAvatar').innerText = user.name.charAt(0).toUpperCase();

    const appData = JSON.parse(localStorage.getItem("appProgressData"));
    if(appData) {
        document.getElementById('statTasks').innerText = appData.tasks ? appData.tasks.length : 0;
        let hrs = Math.floor(appData.totalMinutes / 60);
        let mins = appData.totalMinutes % 60;
        document.getElementById('statMinutes').innerText = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
    }
}

// --- 🔥 THE ULTIMATE ROUTE PROTECTION (For Home Page Cards) ---
// Pure page pe kahin bhi click ho, yeh function check karega
document.addEventListener('click', function(e) {
    let targetLink = e.target.closest('a'); // Dekho kya click kisi <a> tag pe hua hai

    // Agar link .htm page pe le ja raha hai
    if (targetLink && targetLink.getAttribute('href') && targetLink.getAttribute('href').includes('.htm')) {
        const user = localStorage.getItem('focusUser');

        if (!user) {
            e.preventDefault(); // Click ko block karo
            console.log("Card click blocked: Please login first!");
            openModal('login'); // Login form khol do
        }
    }
});

// App shuru karo
updateNavbar();
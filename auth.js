// ====== MODAL (POPUP) LOGIC ======
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const profilePage = document.getElementById('profilePage');

function openModal(type) {
    authModal.classList.remove('hidden');
    switchForm(type);
}

function closeModal() {
    authModal.classList.add('hidden');
}

function switchForm(type) {
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    profilePage.classList.add('hidden');

    if (type === 'login') loginForm.classList.remove('hidden');
    if (type === 'signup') signupForm.classList.remove('hidden');
    if (type === 'profile') {
        profilePage.classList.remove('hidden');
        loadProfileData(); // Jab profile khule, purana data load ho jaye
    }
}

// Close modal agar user bahar black screen pe click kare
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeModal();
});



// ====== AUTHENTICATION LOGIC (LOCALSTORAGE) ======
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('focusUser'));
    const loggedOutNav = document.getElementById('loggedOutNav');
    const loggedInNav = document.getElementById('loggedInNav');

    if (user) {
        loggedOutNav.classList.add('hidden');
        loggedInNav.classList.remove('hidden');
        document.getElementById('navAvatar').innerText = user.name.charAt(0).toUpperCase();
    } else {
        loggedOutNav.classList.remove('hidden');
        loggedInNav.classList.add('hidden');
    }
}

function processSignup() {
    const name = document.getElementById('signName').value.trim();
    const email = document.getElementById('signEmail').value.trim();
    const pass = document.getElementById('signPass').value;

    if(!name || !email || !pass) return alert("Please fill all fields!");

    const user = { name, email, pass };
    localStorage.setItem('focusUser', JSON.stringify(user));
    alert("Account created successfully!");
    
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
    closeModal();
}

// ====== PROFILE DATA INTEGRATION ======
function loadProfileData() {
    const user = JSON.parse(localStorage.getItem('focusUser'));
    if(!user) return;

    document.getElementById('profileName').innerText = user.name;
    document.getElementById('profileEmail').innerText = user.email;
    document.getElementById('profileAvatar').innerText = user.name.charAt(0).toUpperCase();

    // Fetching data from your Tracker Project!
    const appData = JSON.parse(localStorage.getItem("appProgressData"));
    if(appData) {
        document.getElementById('statTasks').innerText = appData.tasks ? appData.tasks.length : 0;
        let hrs = Math.floor(appData.totalMinutes / 60);
        let mins = appData.totalMinutes % 60;
        document.getElementById('statMinutes').innerText = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
    }
}

// Initialize Navbar on page load
updateNavbar();
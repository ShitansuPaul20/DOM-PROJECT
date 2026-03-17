
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

// ====== MODAL (POPUP) CLOSING LOGIC ======
if(authModal) {
    authModal.addEventListener('click', (e) => {
        const user = localStorage.getItem('focusUser'); // Check karo user hai ya nahi
        
        // Agar user click bahar karta hai AUR wo logged in hai, tabhi close hoga
        if (e.target === authModal && user) {
            closeModal();
        } 
        // Agar logged in nahi hai, toh popup band nahi hoga (Hard Wall)
    });
}

// ====== AUTHENTICATION LOGIC ======
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('focusUser'));
    const loggedOutNav = document.getElementById('loggedOutNav');
    const loggedInNav = document.getElementById('loggedInNav');
    
    // Naya: Modal ke andar ke saare Close (X) buttons select karo
    const closeBtns = document.querySelectorAll('.close-btn'); 

    if (user) {
        if(loggedOutNav) loggedOutNav.classList.add('hidden');
        if(loggedInNav) loggedInNav.classList.remove('hidden');
        let navAv = document.getElementById('navAvatar');
        if(navAv) navAv.innerText = user.name.charAt(0).toUpperCase();
        
        // User logged in hai -> Profile popup band karne ke liye 'X' button dikhao
        closeBtns.forEach(btn => btn.style.display = 'block');
    } else {
        if(loggedOutNav) loggedOutNav.classList.remove('hidden');
        if(loggedInNav) loggedInNav.classList.add('hidden');
        
        // User logged in nahi hai -> 'X' button GAYAB kar do taaki kat na sake!
        closeBtns.forEach(btn => btn.style.display = 'none');
        
        // App khulte hi Auto-Signup form dikhao
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

// ====== PROFILE DATA INTEGRATION ======
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

// 🔥 NAYA FEATURE 2: ROUTE PROTECTION (Bina Login Click Rokna)
document.addEventListener('DOMContentLoaded', () => {
    // Saare cards aur game buttons ko select karo
    const protectedLinks = document.querySelectorAll('.contents a');
    
    protectedLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const user = JSON.parse(localStorage.getItem('focusUser'));
            
            // Agar user logged in nahi hai
            if (!user) {
                e.preventDefault(); 
                
                openModal('login'); 
            }
        });
    });
});


updateNavbar();
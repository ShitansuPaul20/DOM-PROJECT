
(function() {
    let user = localStorage.getItem('focusUser');
    

    let isHomePage = window.location.pathname.includes('index.htm') || window.location.pathname.endsWith('/');

   
    if (!user && !isHomePage) {
        window.location.replace('index.htm'); 
    }
})();
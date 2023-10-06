window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceworker.js')
            .then((registration) => {
                console.log('[AppService] ServiceWorker registration successful:', registration);
            })
            .catch((err) => {
                console.log('[AppService] ServiceWorker registration failed:', err);
            })
    }
});
window.addEventListener('beforeinstallprompt', (e) => {
    let deferredPrompt;
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    let installCard = document.querySelector('.installCard');
    installCard.style.display = 'block';

    let btnAdd = installCard.querySelector('button');
    btnAdd.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        installCard.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
    });
});

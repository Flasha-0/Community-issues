if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  document.documentElement.dataset.installable = 'true';
});

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-install]');
  if (btn && deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
  }
});

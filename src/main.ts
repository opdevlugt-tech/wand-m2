import './style.css';
import { boot } from './app';

const app = document.querySelector<HTMLElement>('#app');
if (!app) {
  throw new Error('#app not found');
}
boot(app);

// PWA: register service worker (production / https / localhost)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swUrl).catch(() => {
      /* offline install optional */
    });
  });
}

import { initWheel } from './wheel.js';
import { closeModal, initModal } from './modal.js';
import { closeReading, initReading } from './reading.js';

initWheel();
initModal();
initReading();

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;

  if (document.getElementById('reading-overlay').classList.contains('visible')) {
    closeReading();
  } else {
    closeModal();
  }
});

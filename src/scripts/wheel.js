import { openModal } from './modal.js';

export function enterWheel() {
  document.getElementById('landing').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('wheel-page').classList.add('visible');
  }, 400);
}

export function initWheel() {
  document.getElementById('enter-btn').addEventListener('click', enterWheel);

  document.querySelectorAll('.sabbat-node').forEach(node => {
    const key = node.dataset.sabbat;
    const name = node.querySelector('.node-name')?.textContent || key;
    node.setAttribute('aria-label', `Open ${name}`);

    node.addEventListener('click', () => openModal(key));
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(key);
      }
    });
  });

  document.querySelectorAll('.prose-node').forEach(node => {
    const key = node.dataset.entry;
    node.setAttribute('aria-label', `Open ${node.textContent.trim()}`);
    node.addEventListener('click', () => openModal(key));
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(key);
      }
    });
  });
}

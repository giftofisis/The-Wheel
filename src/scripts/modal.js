import { sabbats } from './data.js';
import { state } from './state.js';
import { openReading } from './reading.js';

function renderImage(data) {
  const imageArea = document.getElementById('modal-image-area');
  imageArea.innerHTML = '';

  const img = document.createElement('img');
  img.src = data.imageSrc;
  img.alt = data.name;
  img.loading = 'lazy';
  img.onerror = () => {
    imageArea.innerHTML = '<div class="modal-image-placeholder" id="modal-image-wrap"><span>Image forthcoming</span></div>';
  };

  imageArea.appendChild(img);
}

export function openModal(key) {
  const data = sabbats[key];
  if (!data) return;
  state.currentSabbat = key;

  document.querySelectorAll('.sabbat-node').forEach(node => {
    node.classList.toggle('active', node.dataset.sabbat === key);
  });

  document.getElementById('modal-name').textContent = data.name;
  document.getElementById('modal-date').textContent = data.date;
  document.getElementById('modal-description').textContent = data.description;
  document.getElementById('modal-text-label').textContent = data.textLabel;
  document.getElementById('modal-excerpt').innerHTML = data.excerpt;

  renderImage(data);
  document.getElementById('modal-overlay').classList.add('visible');
}

export function closeModal() {
  document.getElementById('modal-overlay').classList.remove('visible');
}

export function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-read-btn').addEventListener('click', openReading);
  document.getElementById('modal-overlay').addEventListener('click', event => {
    if (event.target === event.currentTarget) closeModal();
  });
}

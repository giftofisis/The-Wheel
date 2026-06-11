import { sabbats } from './data.js';
import { state } from './state.js';
import { openReading } from './reading.js';

function renderImage(data) {
  const imageArea = document.getElementById('modal-image-area');
  imageArea.innerHTML = '';

  if (!data.imageSrc) {
    imageArea.innerHTML = '<div class="modal-image-placeholder" id="modal-image-wrap"><span>No image for this piece</span></div>';
    return;
  }

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

  document.querySelectorAll('.sabbat-node, .prose-node').forEach(node => {
    node.classList.toggle('active', node.dataset.sabbat === key || node.dataset.entry === key);
  });

  document.getElementById('modal-name').textContent = data.name;
  const modalDate = document.getElementById('modal-date');
  if (data.date) {
    modalDate.textContent = data.date;
    modalDate.style.display = '';
  } else {
    modalDate.textContent = '';
    modalDate.style.display = 'none';
  }
  document.getElementById('modal-description').textContent = data.description;
  document.getElementById('modal-text-label').textContent = data.textLabel;
  document.getElementById('modal-excerpt').innerHTML = data.excerpt;

  renderImage(data);
  document.getElementById('modal-overlay').classList.add('visible');
}

export function closeModal() {
  // 1. Hide the modal overlay
  document.getElementById('modal-overlay').classList.remove('visible');

  // 2. Remove the 'active' class from all wheel nodes AND prose nodes
  document.querySelectorAll('.sabbat-node, .prose-node').forEach(node => {
    node.classList.remove('active');
  });

  // 3. Drop browser focus so the keyboard doesn't accidentally re-trigger the node
  if (document.activeElement) {
    document.activeElement.blur();
  }
}

export function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-read-btn').addEventListener('click', openReading);
  document.getElementById('modal-overlay').addEventListener('click', event => {
    if (event.target === event.currentTarget) closeModal();
  });
}

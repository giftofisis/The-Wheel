import { sabbats } from './data.js';
import { state } from './state.js';

async function loadText(data) {
  const response = await fetch(data.textSrc);
  if (!response.ok) throw new Error(`Could not load ${data.textSrc}`);
  return response.text();
}

export async function openReading() {
  const data = sabbats[state.currentSabbat];
  if (!data) return;

  document.getElementById('modal-overlay').classList.remove('visible');
  document.querySelectorAll('.sabbat-node.active, .prose-node.active').forEach(node => node.classList.remove('active'));
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

  document.getElementById('reading-eyebrow').textContent = data.eyebrow;
  document.getElementById('reading-title').textContent = data.name;
  const readingDate = document.getElementById('reading-date');
  if (data.date) {
    readingDate.textContent = data.date;
    readingDate.style.display = '';
  } else {
    readingDate.textContent = '';
    readingDate.style.display = 'none';
  }

  const img = document.getElementById('reading-image');
  if (data.imageSrc) {
    img.src = data.imageSrc;
    img.alt = data.name;
    img.style.display = 'block';
    img.onerror = () => {
      img.style.display = 'none';
    };
  } else {
    img.removeAttribute('src');
    img.alt = '';
    img.style.display = 'none';
  }

  const body = document.getElementById('reading-body');
  body.innerHTML = await loadText(data);
  document.getElementById('reading-overlay').classList.add('visible');
  document.getElementById('reading-overlay').scrollTop = 0;
}

export function closeReading() {
  document.getElementById('reading-overlay').classList.remove('visible');
}

export function initReading() {
  document.getElementById('reading-back').addEventListener('click', closeReading);
}

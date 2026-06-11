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

  document.getElementById('reading-eyebrow').textContent = data.eyebrow;
  document.getElementById('reading-title').textContent = data.name;
  document.getElementById('reading-date').textContent = data.date;

  const img = document.getElementById('reading-image');
  img.src = data.imageSrc;
  img.alt = data.name;
  img.style.display = 'block';
  img.onerror = () => {
    img.style.display = 'none';
  };

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

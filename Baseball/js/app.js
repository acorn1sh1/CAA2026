// Tiny utilities shared by all pages. No framework — fetch JSON, render.

async function loadJSON(path) {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null) continue;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return e;
}

function fmtDate(iso) {
  // iso: "2026-04-22" or "2026-04-22T18:00"
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  const opts = { weekday: 'short', month: 'short', day: 'numeric' };
  let s = d.toLocaleDateString(undefined, opts);
  if (iso.includes('T')) {
    s += ' · ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }
  return s;
}

function minutesToClock(startMin, durMin) {
  // 0 -> "0:00", 90 -> "1:30"
  const end = startMin + durMin;
  const fmt = m => {
    const h = Math.floor(m / 60);
    const r = m % 60;
    return `${h}:${r.toString().padStart(2, '0')}`;
  };
  return `${fmt(startMin)}–${fmt(end)}`;
}

function highlightNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', highlightNav);

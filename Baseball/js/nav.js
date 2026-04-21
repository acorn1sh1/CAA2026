// Mobile hamburger nav. Injects a toggle button at narrow widths.
// CSS in css/style.css controls when the button is visible vs. the full nav.
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('header.site .wrap');
    if (!wrap) return;
    const nav = wrap.querySelector('nav');
    if (!nav) return;

    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'site-nav');
    btn.innerHTML = '<span></span><span></span><span></span>';

    // Give nav an id for aria-controls
    if (!nav.id) nav.id = 'site-nav';

    wrap.appendChild(btn);

    function close() {
      nav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function toggle() {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });

    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || btn.contains(e.target)) return;
      close();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Reset state if user resizes to desktop
    const mq = window.matchMedia('(min-width: 720px)');
    mq.addEventListener ? mq.addEventListener('change', close) : mq.addListener(close);
  });
})();

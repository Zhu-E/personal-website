'use strict';
// Talks to the Endless Waves banner (art/waves.html) over postMessage, which also works when opened from file://.
// Only the homepage has the banner; the other pages share this script for the bits below it.

const frame = document.getElementById('waves');
if (frame) {
  const seedEl = document.getElementById('seed');
  const toggleBtn = document.getElementById('wave-toggle');
  const send = (action, value) => frame.contentWindow.postMessage({ type: 'waves', action, value }, '*');

  addEventListener('message', e => {
    if (e.source !== frame.contentWindow || !e.data || e.data.type !== 'waves:state') return;
    seedEl.textContent = `sea #${e.data.seed}`;
    toggleBtn.textContent = e.data.drifting ? 'Pause' : 'Play';
    toggleBtn.setAttribute('aria-pressed', String(!e.data.drifting));
  });

  document.getElementById('wave-new').addEventListener('click', () => send('new'));
  toggleBtn.addEventListener('click', () => send('toggle'));

  // the banner may have announced itself before this script ran, so ask again
  frame.addEventListener('load', () => send('hello'));
  send('hello');

  // stop drawing the sea while it is scrolled out of view
  new IntersectionObserver(([entry]) => send('visible', entry.isIntersecting)).observe(frame);
}

// arriving at projects.html#some-project opens that project's details
const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
target?.querySelector('details')?.setAttribute('open', '');

// blog.html and projects.html: a sort menu reorders the list it names by date (each item's
// <time datetime>, or its year); items with the same date keep the order they have in the page
for (const select of document.querySelectorAll('select[data-sorts]')) {
  const list = document.querySelector(select.dataset.sorts);
  if (!list) continue;
  const date = li => li.querySelector('time')?.dateTime ?? li.querySelector('.year')?.textContent ?? '';
  const newest = [...list.children].map((li, i) => [li, i])
    .sort(([a, i], [b, j]) => date(b).localeCompare(date(a)) || i - j)
    .map(([li]) => li);
  const apply = () => list.append(...(select.value === 'oldest' ? [...newest].reverse() : newest));
  select.addEventListener('change', apply);
  apply();
}

document.getElementById('year').textContent = new Date().getFullYear();

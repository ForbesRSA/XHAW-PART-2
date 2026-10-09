// Mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-btn'), list = document.querySelector('nav ul');
  if (btn) btn.addEventListener('click', () => list.classList.toggle('open'));
  document.querySelectorAll('[data-year]').forEach(e => e.textContent = new Date().getFullYear());
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'packages') initPackages();
  if (page === 'detail') initDetail();
  if (page === 'calculator') initCalculator();
  if (page === 'contact') initContact();
});

function packageCard(p) {
  return `<article class="card"><div class="icon-box">${p.icon}</div>
    <h3>${p.name}</h3><p class="muted">${p.short}</p>
    <div class="row"><span class="price">${formatRand(p.price)}</span>
    <a class="btn outline small" href="package-detail.html?id=${p.id}">View Details</a></div></article>`;
}
function initHome() {
  document.getElementById('featured').innerHTML = PACKAGES.filter(p => p.type === 'gaming').map(packageCard).join('');
  document.getElementById('tournaments').innerHTML = TOURNAMENTS.map((t, i) => `
    <div class="card tourney ${i ? 'p' : ''}"><div class="icon-box">${t.icon}</div>
    <div class="grow"><h3>${t.name}</h3><p class="muted">Date: ${t.date}</p></div>
    <a class="btn small ${i ? '' : 'purple'}" href="contact.html?event=${encodeURIComponent(t.name)}">Register</a></div>`).join('');
}
function initPackages() {
  document.getElementById('gaming').innerHTML = PACKAGES.filter(p => p.type === 'gaming').map(packageCard).join('');
  document.getElementById('individual').innerHTML = PACKAGES.filter(p => p.type === 'individual').map(p => `
    <article class="card p"><div class="icon-box">${p.icon}</div><h3>${p.name}</h3>
    <p class="muted">${p.short}</p><div class="row"><span class="price accent-p" style="color:var(--purple)">${formatRand(p.price)}</span>
    <a class="btn purple small" href="calculator.html?add=${p.id}">Quick Book</a></div></article>`).join('');
}
function initDetail() {
  const id = new URLSearchParams(location.search).get('id') || 'ultimate';
  const p = PACKAGES.find(x => x.id === id) || PACKAGES[0];
  document.title = p.name + ' | Next Level Gaming & Esports Arena';
  document.getElementById('detail').innerHTML = `
    <div class="art" aria-hidden="true">${p.icon}</div>
    <div><h1>${p.name}</h1>
    <p style="margin:.6rem 0"><span class="price" style="font-size:2rem">${formatRand(p.price)}</span>
    ${p.badge ? `<span class="badge">${p.badge}</span>` : ''} <span class="muted">excl. VAT</span></p>
    <p class="muted">${p.desc}</p><h3 class="accent" style="margin-top:1.2rem">What's Included</h3>
    <ul class="checklist">${p.includes.map(i => `<li>${i}</li>`).join('')}</ul>
    <a class="btn" href="calculator.html?add=${p.id}">Book Now</a>
    <a class="btn outline" href="packages.html">Back to Packages</a></div>`;
}
function initCalculator() {
  const state = {};
  PACKAGES.forEach(p => state[p.id] = 0);
  const add = new URLSearchParams(location.search).get('add');
  if (add && state.hasOwnProperty(add)) state[add] = 1;
  const list = document.getElementById('items');
  list.innerHTML = PACKAGES.map(p => `
    <div class="item"><input type="checkbox" id="chk-${p.id}" aria-label="Select ${p.name}">
    <div class="grow"><strong>${p.name}</strong><div class="sub">${formatRand(p.price)}</div></div>
    <div class="stepper"><button type="button" data-id="${p.id}" data-d="-1" aria-label="Decrease">-</button>
    <span class="q" id="q-${p.id}">0</span>
    <button type="button" class="plus" data-id="${p.id}" data-d="1" aria-label="Increase">+</button></div></div>`).join('');
  document.getElementById('tierRow').innerHTML = '1 booking: <b>0%</b> | 2: <b>5%</b> | 3: <b>10%</b> | 4+: <b>15%</b>';
  list.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const id = b.dataset.id; state[id] = Math.max(0, Math.min(10, state[id] + Number(b.dataset.d))); render();
  });
  list.addEventListener('change', e => {
    if (e.target.type !== 'checkbox') return;
    const id = e.target.id.replace('chk-', ''); state[id] = e.target.checked ? Math.max(1, state[id]) : 0; render();
  });
  function render() {
    PACKAGES.forEach(p => {
      document.getElementById('q-' + p.id).textContent = state[p.id];
      document.getElementById('chk-' + p.id).checked = state[p.id] > 0;
    });
    const items = PACKAGES.filter(p => state[p.id] > 0).map(p => ({ ...p, qty: state[p.id] }));
    const q = calculateQuote(items);
    document.getElementById('sCount').textContent = q.count;
    document.getElementById('sSub').textContent = formatRand(q.subtotal);
    document.getElementById('sDiscLabel').textContent = `Multi-Booking Discount (${Math.round(q.rate * 100)}%)`;
    document.getElementById('sDisc').textContent = '- ' + formatRand(q.discount);
    document.getElementById('sVat').textContent = formatRand(q.vat);
    document.getElementById('sTotal').textContent = formatRand(q.total);
    document.getElementById('quoteBox').style.display = 'none';
    return { items, q };
  }
  document.getElementById('quoteBtn').addEventListener('click', () => {
    const { items, q } = render();
    const box = document.getElementById('quoteBox');
    if (!items.length) { box.style.display = 'block'; box.textContent = 'Please select at least one package or experience to generate a quotation.'; return; }
    box.style.display = 'block';
    box.innerHTML = '<strong>Quotation</strong><br>' + items.map(i => `${i.qty} x ${i.name} - ${formatRand(i.price * i.qty)}`).join('<br>') +
      `<br>Subtotal: ${formatRand(q.subtotal)}<br>Discount: -${formatRand(q.discount)}<br>VAT (15%): ${formatRand(q.vat)}<br><strong>Total due: ${formatRand(q.total)}</strong><br><a class="accent" href="contact.html?quote=1">Send this quote to our team</a>`;
  });
  render();
}
function initContact() {
  const params = new URLSearchParams(location.search);
  const msg = document.getElementById('message');
  if (params.get('event')) msg.value = 'I would like to register for: ' + params.get('event');
  if (params.get('quote')) msg.value = 'Please send me a booking confirmation for my quotation.';
  const form = document.getElementById('contactForm');
  const set = (id, t) => document.getElementById('e-' + id).textContent = t;
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const name = form.name.value.trim(), email = form.email.value.trim(), phone = form.phone.value.trim(), m = msg.value.trim();
    set('name', name.length < 2 ? (ok = false, 'Please enter your full name.') : '');
    set('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : (ok = false, 'Please enter a valid email address.'));
    set('phone', /^\+?[0-9 ]{9,15}$/.test(phone) ? '' : (ok = false, 'Enter a valid phone number, e.g. +27 82 123 4567.'));
    set('message', m.length < 10 ? (ok = false, 'Message must be at least 10 characters.') : '');
    document.getElementById('okMsg').style.display = ok ? 'block' : 'none';
    if (ok) form.reset();
  });
}

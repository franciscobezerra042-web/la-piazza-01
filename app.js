(() => {
  const PHONE = '5588988024516';
  const GREETING = 'Olá! Acessei o site do La Piazza e gostaria de fazer um pedido.';
  const ADDRESS = 'Rua Senador Pompeu, 53, Centro, Iguatu, Ceará, Brasil';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const money = n => 'R$ ' + n.toFixed(2).replace('.', ',');
  const slug = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const waLink = text => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

  /* Logo: se o arquivo não existir, mostra o nome em texto até o arquivo ser colocado em assets/logo.png */
  $$('img.logo').forEach(img => {
    const fail = () => img.parentElement.classList.add('no-logo');
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* Links de WhatsApp, mapa, ano */
  $$('[data-wa]').forEach(a => a.href = waLink(GREETING));
  const q = encodeURIComponent(ADDRESS);
  $('#mapsLink').href = `https://www.google.com/maps/search/?api=1&query=${q}`;
  $('#routeLink').href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  $('#mapFrame').src = `https://www.google.com/maps?q=${q}&output=embed`;
  $('#year').textContent = new Date().getFullYear();

  /* Abertura */
  const intro = $('#intro');
  const closeIntro = () => { intro.classList.add('done'); document.body.style.overflow = ''; revealCheck(); };
  let seen = false;
  try { seen = sessionStorage.getItem('lp-intro') === '1'; } catch (e) {}
  if (reduced || seen) { intro.remove(); }
  else {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(closeIntro, 2600);
    $('#introSkip').addEventListener('click', () => { clearTimeout(t); closeIntro(); });
    try { sessionStorage.setItem('lp-intro', '1'); } catch (e) {}
  }

  /* Cabeçalho, menu mobile */
  const header = $('#header'), nav = $('#nav'), burger = $('#burger');
  const onScroll = () => {
    header.classList.toggle('scrolled', scrollY > 40);
    $('#waFloat').classList.toggle('show', scrollY > innerHeight * 0.6);
    if (!reduced) $$('[data-parallax]').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      el.style.transform = `translate3d(0,${(r.top - innerHeight / 2) * parseFloat(el.dataset.parallax)}px,0)`;
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const setMenu = open => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('#nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); closeBasket(); } });

  /* Link ativo no menu */
  const links = $$('#nav a');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  /* Revelar ao rolar */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  const revealCheck = () => $$('.reveal:not(.in)').forEach(el => io.observe(el));
  revealCheck();

  /* 3D sutil: prato e taça seguem o cursor (apenas desktop com mouse) */
  if (fine && !reduced) {
    const plate = $('#plate'), glass = $('#glass');
    addEventListener('mousemove', e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      plate.style.setProperty('--rx', (58 - y * 14) + 'deg');
      plate.style.setProperty('--rz', (x * 18) + 'deg');
      glass.style.setProperty('--gy', (-18 + x * 26) + 'deg');
      glass.style.setProperty('--gz', (6 - y * 8) + 'deg');
    }, { passive: true });
  }

  /* Pedido (cesta) */
  const cart = new Map(); // key -> {name, label, price, qty}
  const basket = $('#basket');
  const openBasket = () => { basket.classList.add('open'); basket.setAttribute('aria-hidden', 'false'); };
  function closeBasket() { basket.classList.remove('open'); basket.setAttribute('aria-hidden', 'true'); }
  $('#basketBtn').addEventListener('click', openBasket);
  $('#basketClose').addEventListener('click', closeBasket);
  $('#basketClear').addEventListener('click', () => { cart.clear(); renderCart(); });
  function addToCart(name, label, price, ctx) {
    const key = [ctx, name, label].join('|');
    const it = cart.get(key) || { name, label, price, ctx, qty: 0 };
    it.qty++; cart.set(key, it); renderCart();
  }
  function renderCart() {
    const list = $('#basketList'); list.innerHTML = '';
    let total = 0, count = 0;
    cart.forEach((it, key) => {
      total += it.price * it.qty; count += it.qty;
      const li = document.createElement('li');
      li.innerHTML = `<span class="nm"></span><div class="qty"><button type="button" aria-label="Diminuir">−</button><span>${it.qty}</span><button type="button" aria-label="Aumentar">+</button></div><span class="sub"></span>`;
      $('.nm', li).textContent = it.name;
      $('.sub', li).textContent = [it.label, it.ctx, money(it.price)].filter(Boolean).join(' · ');
      const [minus, plus] = $$('.qty button', li);
      minus.onclick = () => { it.qty--; if (it.qty <= 0) cart.delete(key); renderCart(); };
      plus.onclick = () => { it.qty++; renderCart(); };
      list.appendChild(li);
    });
    if (!cart.size) list.innerHTML = '<li class="empty-basket" style="display:block">Seu pedido está vazio.</li>';
    $('#basketCount').textContent = count;
    $('#basketTotal').textContent = money(total);
    $('#basketBtn').hidden = count === 0;
    const send = $('#basketSend');
    if (!count) { send.href = waLink(GREETING); if (basket.classList.contains('open')) {} }
    else {
      const lines = [...cart.values()].map(it => `• ${it.qty}x ${it.name}${it.label ? ' (' + it.label + ')' : ''}${it.ctx ? ' — ' + it.ctx : ''} — ${money(it.price * it.qty)}`);
      send.href = waLink(`${GREETING}\n\n${lines.join('\n')}\n\nTotal estimado: ${money(total)}`);
    }
  }
  renderCart();

  /* Fábrica de abas acessíveis */
  function tabs(container, entries, onSelect, initial = 0) {
    container.innerHTML = '';
    entries.forEach((en, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tab'; b.setAttribute('role', 'tab'); b.textContent = en.title;
      b.addEventListener('click', () => select(i));
      b.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') select((i + 1) % entries.length, true);
        if (e.key === 'ArrowLeft') select((i - 1 + entries.length) % entries.length, true);
      });
      container.appendChild(b);
    });
    function select(i, focus) {
      $$('.tab', container).forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
      const t = $$('.tab', container)[i];
      if (focus) t.focus();
      t.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
      onSelect(entries[i], i);
    }
    select(initial);
  }
  function swap(panel, fn) {
    if (reduced) { fn(); return; }
    panel.classList.add('swap');
    setTimeout(() => { fn(); panel.classList.remove('swap'); }, 250);
  }
  function addButton(name, label, price, ctx) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'add'; b.textContent = '+';
    b.setAttribute('aria-label', `Adicionar ${name}${label ? ' ' + label : ''} ao pedido`);
    b.addEventListener('click', () => {
      addToCart(name, label, price, ctx);
      b.classList.add('ok'); b.textContent = '✓'; setTimeout(() => { b.classList.remove('ok'); b.textContent = '+'; }, 900);
    });
    return b;
  }

  /* Cardápio */
  const menuPanel = $('#menuPanel');
  let currentCat = MENU[0], currentSec = MENU[0].sections[0];
  function renderSection(sec, cat) {
    const ul = document.createElement('ul'); ul.className = 'items';
    sec.items.forEach((it, i) => {
      const li = document.createElement('li'); li.className = 'item'; li.style.animationDelay = (i * 40) + 'ms';
      // Foto opcional: assets/pratos/<nome-do-prato>.jpg (ex.: bacon.jpg). Sem arquivo, o item fica tipográfico.
      const img = new Image(); img.alt = it.n; img.loading = 'lazy';
      img.onload = () => {
        li.classList.add('has-photo');
        const ph = document.createElement('div'); ph.className = 'photo'; ph.appendChild(img); li.prepend(ph);
      };
      img.src = `assets/pratos/${slug(sec.id + '-' + it.n)}.jpg`;
      const h = document.createElement('h3'); h.textContent = it.n; li.appendChild(h);
      const pr = document.createElement('div'); pr.className = 'prices';
      it.p.forEach(([label, price]) => {
        const row = document.createElement('div'); row.className = 'price-row';
        if (label) { const l = document.createElement('span'); l.className = 'lbl'; l.textContent = label; row.appendChild(l); }
        const p = document.createElement('span'); p.className = 'price'; p.textContent = money(price); row.appendChild(p);
        row.appendChild(addButton(it.n, label, price, sec.title));
        pr.appendChild(row);
      });
      li.appendChild(pr);
      if (it.d) { const d = document.createElement('p'); d.className = 'desc'; d.textContent = it.d; li.appendChild(d); }
      ul.appendChild(li);
    });
    menuPanel.replaceChildren(ul);
  }
  function showSubTabs(cat) {
    tabs($('#subTabs'), cat.sections, (sec) => { currentSec = sec; swap(menuPanel, () => renderSection(sec, cat)); });
  }
  tabs($('#catTabs'), MENU, (cat) => { currentCat = cat; showSubTabs(cat); });

  /* Vinhos */
  const winePanel = $('#winePanel');
  function renderWines(cat) {
    const wrap = document.createElement('div');
    cat.items.forEach(([name, price], i) => {
      const row = document.createElement('div'); row.className = 'wline'; row.style.animationDelay = (i * 35) + 'ms';
      const n = document.createElement('span'); n.className = 'wname'; n.textContent = name;
      const d = document.createElement('span'); d.className = 'dots';
      const p = document.createElement('span'); p.className = 'price'; p.textContent = money(price);
      row.append(n, d, p, addButton(name, '', price, cat.title));
      wrap.appendChild(row);
    });
    winePanel.replaceChildren(wrap);
  }
  tabs($('#wineTabs'), WINES, cat => swap(winePanel, () => renderWines(cat)));
})();

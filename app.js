(() => {
'use strict';
const E = window.EUROPA, P = window.PAESI, F = window.FISICO, X = window.CONTENUTI || {};
const per = Object.fromEntries(P.map(p => [p.id, p]));
F.forEach(f => { if (X[f.id]) Object.assign(f, X[f.id]); else console.warn('Elemento senza contenuti:', f.id); });
const fis = Object.fromEntries(F.map(f => [f.id, f]));
const MICRO = ['MLT', 'AND', 'MCO', 'SMR', 'VAT', 'LIE'];
const NS = 'http://www.w3.org/2000/svg';
const $ = id => document.getElementById(id);

const CATS = [
  { id: 'mari', nome: 'Mari e oceani', sing: 'mare', ico: '🌊', q: 'Quale mare (o oceano) è evidenziato?' },
  { id: 'fiumi', nome: 'Fiumi', sing: 'fiume', ico: '🏞️', q: 'Quale fiume è evidenziato?' },
  { id: 'monti', nome: 'Catene montuose', sing: 'catena montuosa', ico: '⛰️', q: 'Quale catena montuosa è evidenziata?' },
  { id: 'pianure', nome: 'Pianure e altopiani', sing: 'pianura o altopiano', ico: '🌾', q: 'Quale pianura (o altopiano) è evidenziata?' },
  { id: 'vette', nome: 'Vette e vulcani', sing: 'vetta o vulcano', ico: '🌋', q: 'Quale vetta o vulcano è evidenziato?' },
  { id: 'penisole', nome: 'Penisole', sing: 'penisola', ico: '🥾', q: 'Quale penisola è evidenziata?' },
  { id: 'isole', nome: 'Isole', sing: 'isola', ico: '🏝️', q: 'Quale isola è evidenziata?' },
  { id: 'laghi', nome: 'Laghi', sing: 'lago', ico: '💧', q: 'Quale lago è evidenziato?' },
];
const cat = id => CATS.find(c => c.id === id);
const dato = id => per[id] || fis[id];
const nome = id => dato(id).nome;
const nomeStato = id => (per[id] ? per[id].nome : id);

const LIVELLI = [
  { n: 1, nome: 'Facile', desc: n => modo === 'stati' ? `${n} Stati: i principali, quelli grandi e più conosciuti.` : `${n} elementi: quelli fondamentali del programma base.` },
  { n: 2, nome: 'Medio', desc: n => modo === 'stati' ? `${n} Stati: si aggiungono i Balcani, i Paesi baltici e altri Stati medio-piccoli.` : `${n} elementi: tutte le catene montuose e gli elementi più importanti.` },
  { n: 3, nome: 'Difficile', desc: n => modo === 'stati' ? `${n} Stati: tutti, compresi Malta, Kosovo e i microstati.` : `${n} elementi: anche i più piccoli, ognuno con una curiosità di attualità.` },
];
const GIOCHI = [
  { id: 'studio', ico: '📖', nome: 'Studio', desc: 'Esplora la mappa: tocca uno Stato per aprire la sua carta d\'identità.', punti: false, modo: 'stati' },
  { id: 'trova', ico: '🎯', nome: 'Trova lo Stato', desc: 'Leggi il nome e cliccalo sulla mappa.', modo: 'stati' },
  { id: 'indovina', ico: '❓', nome: 'Che Stato è?', desc: 'Uno Stato è evidenziato: scegli il nome giusto.', modo: 'stati' },
  { id: 'capitali', ico: '🏛️', nome: 'Le capitali', desc: 'Uno Stato è evidenziato: scegli la sua capitale.', modo: 'stati' },
  { id: 'ue', ico: '🇪🇺', nome: 'UE o non UE?', desc: 'Lo Stato evidenziato fa parte dell\'Unione europea?', modo: 'stati' },
  { id: 'coloraUE', ico: '🟦', nome: 'Componi l\'UE', desc: 'Seleziona sulla mappa tutti gli Stati membri dell\'Unione europea.', modo: 'stati' },
  { id: 'identita', ico: '🪪', nome: 'Carta d\'identità', desc: 'Moneta, lingua, posizione, abitanti, superficie: quanto conosci gli Stati?', modo: 'stati' },
  { id: 'studio', ico: '📖', nome: 'Studio', desc: 'Esplora la mappa fisica: tocca un elemento per leggerne il nome e una curiosità.', punti: false, modo: 'fisico' },
  { id: 'trova', ico: '🎯', nome: 'Trova sulla mappa', desc: 'Leggi il nome (di un fiume, un monte, un mare…) e cliccalo sulla mappa.', modo: 'fisico' },
  { id: 'indovina', ico: '❓', nome: 'Che cos\'è?', desc: 'Un elemento è evidenziato: scegli il nome giusto.', modo: 'fisico' },
  { id: 'legami', ico: '🔗', nome: 'Stati collegati', desc: 'Leggi il nome di un mare, un fiume, un monte… e seleziona sulla mappa gli Stati che tocca. Senza aiuti: devi ricordarlo!', modo: 'fisico' },
  { id: 'elementi', ico: '🧩', nome: 'Cosa lo tocca?', desc: 'Uno Stato è evidenziato: scegli quali elementi fisici (fiumi, monti, mari…) si trovano lì.', modo: 'fisico' },
];
const TIPI = { elementi: 'elementi collegati', stati: 'Stati collegati', moneta: 'moneta', lingua: 'lingua', area: 'posizione', abitanti: 'abitanti', superficie: 'superficie', ue: 'UE', cap: 'capitale' };

// ---------- memoria locale (impostazioni, profili, statistiche) ----------
const mem = {
  get(k, d) { try { const v = localStorage.getItem('eg_' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('eg_' + k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem('eg_' + k); } catch {} },
};
let profili = mem.get('profili', ['Io']);
let profilo = mem.get('profilo', profili[0]);
if (!profili.includes(profilo)) profilo = profili[0];
const mp = { get: (k, d) => mem.get(`p_${profilo}_${k}`, d), set: (k, v) => mem.set(`p_${profilo}_${k}`, v), del: k => mem.del(`p_${profilo}_${k}`) };
let livello = mem.get('liv', 1), quantita = mem.get('qta', 10), modo = mem.get('modo', 'stati');
let cats = mem.get('cats', CATS.map(c => c.id)).filter(c => cat(c));
if (!cats.length) cats = CATS.map(c => c.id);
let tema = mem.get('tema', null);
if (tema === null) { const tv = document.documentElement.dataset.theme; tema = tv === 'dark' ? 'scuro' : 'chiaro'; }
document.documentElement.dataset.tema = tema;

function registra(chiave, ok) {
  const st = mp.get('stat', {}), r = st[chiave] || { n: 0, e: 0, r: [] };
  r.n++; if (!ok) r.e++; r.r = [...r.r.slice(-5), ok ? 1 : 0]; r.t = Date.now(); st[chiave] = r;
  mp.set('stat', st);
}
const baseId = k => k.split('|')[0];
const etichettaChiave = k => { const [b, t] = k.split('|'); return nome(b) + (t ? ` <small>(${TIPI[t] || t})</small>` : ''); };
const gruppoChiave = k => { const b = baseId(k); if (k.endsWith('|elementi')) return 'Elementi collegati'; return per[b] ? 'Stati' : cat(fis[b].cat).nome; };

const mescola = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pool = liv => P.filter(p => p.liv <= liv);
const poolFis = (liv, cs) => F.filter(f => cs.includes(f.cat) && f.liv <= liv);
const poolModo = (m, liv, cs) => (m === 'stati' ? pool(liv) : poolFis(liv, cs));
const chiaveRec = (g, m, liv, cs) => m === 'stati' ? `rec_${g}_${liv}` : `rec_fis_${g}_${liv}_${[...cs].sort().join('-')}`;

// ---------- formati ----------
const fmt = n => n.toLocaleString('it-IT');
const fmtSup = v => (v < 10 ? v.toLocaleString('it-IT', { maximumFractionDigits: 2 }) : fmt(Math.round(v))) + ' km²';
const fmtAb = v => v >= 1e6 ? 'circa ' + (v / 1e6).toLocaleString('it-IT', { maximumFractionDigits: v >= 1e8 ? 0 : 1 }) + ' milioni' : 'circa ' + fmt(v);
const monetaBase = p => p.mon.replace(/ \(.*\)/, '');

// ---------- home ----------
function disegnaHome() {
  $('nomeProfilo').textContent = profilo;
  $('btnTema').textContent = tema === 'chiaro' ? '🌙' : '☀️';
  const M = $('modi'); M.innerHTML = '';
  [['stati', '🌍 Stati d\'Europa'], ['fisico', '⛰️ Geografia fisica']].forEach(([id, t]) => {
    const b = document.createElement('button'); b.className = 'chip tab'; b.textContent = t;
    b.setAttribute('aria-pressed', id === modo);
    b.onclick = () => { modo = id; mem.set('modo', id); disegnaHome(); };
    M.appendChild(b);
  });
  const C = $('categorie'); C.innerHTML = '';
  $('sezCat').hidden = modo !== 'fisico';
  if (modo === 'fisico') {
    CATS.forEach(c => {
      const n = poolFis(livello, [c.id]).length;
      const b = document.createElement('button'); b.className = 'chip' + (n ? '' : ' vuoto'); b.textContent = `${c.ico} ${c.nome} (${n})`;
      b.setAttribute('aria-pressed', cats.includes(c.id));
      b.onclick = () => {
        cats = cats.includes(c.id) ? cats.filter(x => x !== c.id) : [...cats, c.id];
        if (!cats.length) cats = [c.id];
        mem.set('cats', cats); disegnaHome();
      };
      C.appendChild(b);
    });
    const tutte = document.createElement('button'); tutte.className = 'chip'; tutte.textContent = 'Tutte';
    tutte.setAttribute('aria-pressed', cats.length === CATS.length);
    tutte.onclick = () => { cats = CATS.map(c => c.id); mem.set('cats', cats); disegnaHome(); };
    C.appendChild(tutte);
  }
  $('numLiv').textContent = modo === 'fisico' ? '2' : '1';
  $('numQta').textContent = modo === 'fisico' ? '3' : '2';
  $('numGioco').textContent = modo === 'fisico' ? '4' : '3';
  const L = $('livelli'); L.innerHTML = '';
  LIVELLI.forEach(l => {
    const b = document.createElement('button'); b.className = 'chip'; b.textContent = l.nome;
    b.setAttribute('aria-pressed', l.n === livello);
    b.onclick = () => { livello = l.n; mem.set('liv', livello); disegnaHome(); };
    L.appendChild(b);
  });
  const nPool = poolModo(modo, livello, cats).length;
  $('descLivello').textContent = LIVELLI[livello - 1].desc(nPool);
  const Q = $('quantita'); Q.innerHTML = '';
  [[10, '10 domande'], [20, '20 domande'], [0, 'Tutti gli elementi']].forEach(([n, t]) => {
    const b = document.createElement('button'); b.className = 'chip'; b.textContent = t;
    b.setAttribute('aria-pressed', n === quantita);
    b.onclick = () => { quantita = n; mem.set('qta', n); disegnaHome(); };
    Q.appendChild(b);
  });
  const G = $('giochi'); G.innerHTML = '';
  GIOCHI.filter(g => g.modo === modo).forEach(g => {
    const b = document.createElement('button'); b.className = 'card card-' + g.id;
    const rec = g.punti === false ? null : mp.get(chiaveRec(g.id, modo, livello, cats), null);
    const vuoto = modo === 'fisico' && g.id === 'legami' ? !poolFis(livello, cats).some(f => f.s && f.s.length)
      : modo === 'fisico' && g.id === 'elementi' ? statiConElementi(poolFis(livello, cats), pool(Math.max(2, livello)).map(p => p.id)).length === 0 : nPool === 0;
    b.innerHTML = `<span class="ico">${g.ico}</span><b>${g.nome}</b><span class="d">${g.desc}</span>` +
      (rec !== null ? `<span class="rec">Record: ${rec}%</span>` : '');
    if (vuoto) { b.disabled = true; b.classList.add('spento'); b.querySelector('.d').textContent = 'Nessun elemento con queste scelte: cambia livello o categorie.'; }
    b.onclick = () => avvia(g.id);
    G.appendChild(b);
  });
  disegnaProfili();
}
function mostra(id) { if (id !== 'gioco' && $('gioco').classList.contains('schermo-intero')) schermoIntero(false); ['home', 'gioco', 'fine', 'progressi'].forEach(s => $(s).hidden = s !== id); window.scrollTo(0, 0); }

// ---------- profili ----------
function disegnaProfili() {
  const box = $('listaProfili'); box.innerHTML = '';
  profili.forEach(n => {
    const b = document.createElement('button'); b.className = 'chip'; b.textContent = n; b.setAttribute('aria-pressed', n === profilo);
    b.onclick = () => { profilo = n; mem.set('profilo', n); $('panProfilo').hidden = true; disegnaHome(); };
    box.appendChild(b);
  });
}
$('btnProfilo').onclick = () => { $('panProfilo').hidden = !$('panProfilo').hidden; };
$('aggiungiProfilo').onclick = () => {
  const n = $('nuovoProfilo').value.trim().slice(0, 20);
  if (!n) return;
  if (!profili.includes(n)) { profili.push(n); mem.set('profili', profili); }
  profilo = n; mem.set('profilo', n); $('nuovoProfilo').value = ''; $('panProfilo').hidden = true; disegnaHome();
};
$('btnTema').onclick = () => { tema = tema === 'chiaro' ? 'scuro' : 'chiaro'; mem.set('tema', tema); document.documentElement.dataset.tema = tema; $('btnTema').textContent = tema === 'chiaro' ? '🌙' : '☀️'; };
$('btnProgressi').onclick = () => { disegnaProgressi(); mostra('progressi'); };
$('logo').onclick = () => esciMenu();

// ---------- mappa ----------
const svg = $('mappa');
let vb = { x: 0, y: 0, w: E.W, h: E.H };
const elem = {};            // Stati: id -> [path, marker?]
const elemF = {};           // geografia fisica: id -> [elementi...]
const etich = {};           // id -> <text>
let gLabel, gMarker, gFMark, gPt;
svg.setAttribute('viewBox', `0 0 ${E.W} ${E.H}`);
const crea = (tag, attr, parent, cls) => {
  const e = document.createElementNS(NS, tag);
  Object.entries(attr || {}).forEach(([k, v]) => e.setAttribute(k, v));
  if (cls) e.setAttribute('class', cls);
  if (parent) parent.appendChild(e);
  return e;
};

(function costruisciMappa() {
  crea('rect', { width: E.W, height: E.H }, svg, 'mare');
  crea('image', { href: 'dati/rilievo.webp', width: E.W, height: E.H, preserveAspectRatio: 'none' }, svg, 'rilievo');
  // ritaglio "solo mare": i mari evidenziati non devono coprire la terraferma, che nella carta fisica è trasparente
  const defs = crea('defs', {}, svg), clip = crea('clipPath', { id: 'soloMare' }, defs);
  crea('path', { 'clip-rule': 'evenodd', d: `M0 0H${E.W}V${E.H}H0Z` + Object.values(E.paesi).join('') }, clip);
  const gSea = crea('g', {}, svg, 'gsea'), gT = crea('g', {}, svg), gPen = crea('g', {}, svg), gPoly = crea('g', {}, svg), gLines = crea('g', {}, svg);
  gPt = crea('g', {}, svg); gFMark = crea('g', {}, svg); gMarker = crea('g', {}, svg); gLabel = crea('g', {}, svg);
  Object.entries(E.paesi).forEach(([id, d]) => {
    const p = crea('path', { d }, gT, 'terra'); p.dataset.id = id;
    elem[id] = [p];
  });
  MICRO.forEach(id => {
    const c = E.centri[id]; if (!c) return;
    const m = crea('circle', { cx: c[0], cy: c[1] }, gMarker, 'marker'); m.dataset.id = id;
    m.style.display = 'none'; elem[id].push(m);
  });
  P.forEach(p => {
    const c = E.centri[p.id]; if (!c) return;
    const t = crea('text', { x: c[0], y: c[1] }, gLabel, 'etichetta');
    t.dataset.id = p.id; t.textContent = p.nome; t.style.display = 'none'; etich[p.id] = t;
  });
  // geografia fisica: le linee più corte vanno sopra le più lunghe, così restano cliccabili
  const ordine = F.slice().sort((a, b) => (b.tipo === 'line' && a.tipo === 'line') ? b.d.length - a.d.length : 0);
  ordine.forEach(f => {
    const els = [], marca = e => { e.dataset.id = f.id; e.style.display = 'none'; els.push(e); return e; };
    if (f.tipo === 'poly') {
      marca(crea('path', { d: f.d }, f.cat === 'mari' ? gSea : (f.cat === 'penisole' || f.cat === 'pianure') ? gPen : gPoly, `fis poly cat-${f.cat}`));
      if (f.small) marca(crea('circle', { cx: f.c[0], cy: f.c[1] }, gFMark, 'fmark'));
    } else if (f.tipo === 'line') {
      marca(crea('path', { d: f.d }, gLines, `fis line cat-${f.cat}`));
      marca(crea('path', { d: f.d }, gLines, 'fis hitline'));
    } else {
      const tri = marca(crea('path', { d: 'M0,-9 L8,6 L-8,6 Z' }, gPt, `fis pt cat-${f.cat}`));
      tri.dataset.x = f.c[0]; tri.dataset.y = f.c[1];
      marca(crea('circle', { cx: f.c[0], cy: f.c[1] }, gFMark, 'fmark'));
    }
    elemF[f.id] = els;
    const t = crea('text', { x: f.c[0], y: f.c[1] }, gLabel, `etichetta cat-${f.cat}`);
    t.dataset.id = f.id; t.textContent = f.nome; t.style.display = 'none'; etich[f.id] = t;
  });
})();

function impostaPool(ids, modoMappa) {
  svg.dataset.modo = modoMappa || modoAttivo;
  const set = new Set(ids);
  Object.entries(elem).forEach(([id, [p, m]]) => {
    const att = set.has(id), micro = !!m;
    p.setAttribute('class', 'terra' + (att ? ' attiva' : '') + (att && micro ? ' micro' : ''));
    if (m) { m.setAttribute('class', 'marker'); m.style.display = att ? '' : 'none'; }
  });
  Object.entries(elemF).forEach(([id, els]) => els.forEach(e => {
    const att = set.has(id);
    e.classList.remove('evidenzia', 'sel', 'giusto', 'sbagliato', 'manca');
    e.classList.toggle('attivo', att); e.style.display = att ? '' : 'none';
  }));
  Object.values(etich).forEach(t => t.style.display = 'none');
}
function statoClasse(id, cls, on = true) { [...(elem[id] || []), ...(elemF[id] || [])].forEach(e => e.classList.toggle(cls, on)); }
function pulisciStati() {
  [...Object.values(elem), ...Object.values(elemF)].forEach(l => l.forEach(e => e.classList.remove('evidenzia', 'sel', 'giusto', 'sbagliato', 'manca', 'ue')));
}

// zoom e spostamento
function applicaVista() {
  vb.w = Math.min(E.W, Math.max(E.W / 14, vb.w)); vb.h = vb.w * E.H / E.W;
  vb.x = Math.min(E.W - vb.w, Math.max(0, vb.x)); vb.y = Math.min(E.H - vb.h, Math.max(0, vb.y));
  svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  const k = vb.w / E.W;
  const kk = Math.max(k, 0.12);
  gMarker.querySelectorAll('circle').forEach(c => c.setAttribute('r', 6 * kk));
  gFMark.querySelectorAll('circle').forEach(c => c.setAttribute('r', 10 * kk));
  gPt.querySelectorAll('path').forEach(t => t.setAttribute('transform', `translate(${t.dataset.x} ${t.dataset.y}) scale(${kk})`));
  const fs = 12 * k;
  Object.values(etich).forEach(t => {
    t.style.fontSize = fs + 'px'; t.style.strokeWidth = (3 * k) + 'px';
    if (t.dataset.micro) t.style.display = (etichetteOn && k < 0.4 && S && S.pool.includes(t.dataset.id)) ? '' : 'none';
  });
}
const aSvg = (cx, cy) => { const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
function zoomIn(f, cx, cy) {
  let px, py;
  if (cx === undefined) { px = vb.x + vb.w / 2; py = vb.y + vb.h / 2; } else { const q = aSvg(cx, cy); px = q.x; py = q.y; }
  const nw = Math.min(E.W, Math.max(E.W / 14, vb.w * f)), r = nw / vb.w;
  vb.x = px - (px - vb.x) * r; vb.y = py - (py - vb.y) * r; vb.w = nw; applicaVista();
}
function vistaIntera() { vb = { x: 0, y: 0, w: E.W, h: E.H }; applicaVista(); }
function vaiA(id) {
  if (!per[id]) { // elemento fisico: inquadra il suo riquadro con un po' di margine
    const b = elemF[id][0].getBBox(), cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    const w = Math.max(420, b.width * 1.6, b.height * 1.6 * E.W / E.H);
    if (w > E.W * 0.75) return vistaIntera();
    vb = { x: cx - w / 2, y: cy - w * E.H / E.W / 2, w, h: w * E.H / E.W }; return applicaVista();
  }
  const c = E.centri[id], b = elem[id][0].getBBox();
  if (!c || Math.max(b.width, b.height) > 45) return vistaIntera();
  const w = 240; vb = { x: c[0] - w / 2, y: c[1] - w * E.H / E.W / 2, w, h: w * E.H / E.W }; applicaVista();
}
$('zPiu').onclick = () => zoomIn(0.6); $('zMeno').onclick = () => zoomIn(1 / 0.6); $('zReset').onclick = vistaIntera;
// schermo intero: ingrandisce l'intera schermata di gioco (mappa, domanda e risposte); dove il browser non lo consente, riempie la finestra
let fsReale = false;
function schermoIntero(on) {
  const g = $('gioco');
  g.classList.toggle('schermo-intero', on);
  $('zFull').title = on ? 'Esci dallo schermo intero' : 'Schermo intero';
  $('zFull').setAttribute('aria-label', $('zFull').title);
  if (on) { try { if (g.requestFullscreen) g.requestFullscreen().catch(() => {}); } catch {} }
  else { try { if (document.fullscreenElement) document.exitFullscreen(); } catch {} fsReale = false; }
  window.scrollTo(0, 0);
}
$('zFull').onclick = () => schermoIntero(!$('gioco').classList.contains('schermo-intero'));
document.addEventListener('fullscreenchange', () => { if (document.fullscreenElement) fsReale = true; else if (fsReale) schermoIntero(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('gioco').classList.contains('schermo-intero')) schermoIntero(false); });
svg.addEventListener('wheel', e => { e.preventDefault(); zoomIn(e.deltaY < 0 ? 0.85 : 1 / 0.85, e.clientX, e.clientY); }, { passive: false });

const ptr = new Map(); let mosso = false, trascinato = 0, d0 = 0, w0 = 0;
const dist = () => { const [a, b] = [...ptr.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
svg.addEventListener('pointerdown', e => {
  ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (ptr.size === 1) { mosso = false; trascinato = 0; } else if (ptr.size === 2) { d0 = dist(); w0 = vb.w; mosso = true; }
});
window.addEventListener('pointermove', e => {
  const p = ptr.get(e.pointerId); if (!p) return;
  const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
  if (ptr.size === 1) {
    trascinato += Math.abs(dx) + Math.abs(dy);
    if (trascinato > 8) { mosso = true; const r = svg.getBoundingClientRect(); const s = Math.min(r.width / vb.w, r.height / vb.h); vb.x -= dx / s; vb.y -= dy / s; applicaVista(); }
  } else if (ptr.size === 2 && d0 > 0) {
    const [a, b] = [...ptr.values()], q = aSvg((a.x + b.x) / 2, (a.y + b.y) / 2);
    const nw = Math.min(E.W, Math.max(E.W / 14, w0 * d0 / dist())), r = nw / vb.w;
    vb.x = q.x - (q.x - vb.x) * r; vb.y = q.y - (q.y - vb.y) * r; vb.w = nw; applicaVista();
  }
});
['pointerup', 'pointercancel'].forEach(t => window.addEventListener(t, e => ptr.delete(e.pointerId)));

let sulClic = null;
svg.addEventListener('click', e => {
  if (mosso || !sulClic) return;
  const el = e.target.closest('[data-id]'); if (!el || !el.matches('.attiva, .marker, .attivo')) return;
  sulClic(el.dataset.id);
});

// ---------- sessione di gioco ----------
let S = null, etichetteOn = false, timer = null, modoAttivo = 'stati';

function avvia(gioco, soloIds) {
  clearInterval(timer);
  modoAttivo = modo;
  const poolIds = soloIds
    ? (modo === 'stati' ? pool(3) : poolFis(3, CATS.map(c => c.id))).map(p => p.id)
    : poolModo(modo, livello, cats).map(p => p.id);
  S = { gioco, modo, cats: cats.slice(), liv: livello, pool: poolIds, i: 0, punti: 0, errori: [], t0: Date.now(), blocca: false, tent: 0 };
  vistaIntera(); sulClic = null; etichetteOn = false;
  svg.parentElement.classList.remove('interattivo');
  mostra('gioco');
  if (gioco === 'legami') return avviaLegami(soloIds);
  if (gioco === 'elementi') return avviaElementi(soloIds);
  impostaPool(poolIds); pulisciStati();
  if (gioco === 'studio') return avviaStudio();
  if (gioco === 'coloraUE') return avviaColoraUE();
  let coda = soloIds ? mescola(soloIds) : mescola(poolIds);
  if (!soloIds && quantita) coda = coda.slice(0, quantita);
  S.coda = coda;
  timer = setInterval(aggiornaStat, 1000);
  prossima();
}
function aggiornaStat() {
  if (!S) return;
  const s = Math.floor((Date.now() - S.t0) / 1000), t = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const pt = Math.round(S.punti * 10) / 10;
  $('stat').textContent = S.coda ? `Domanda ${Math.min(S.i + 1, S.coda.length)}/${S.coda.length} · Punti ${pt} · ${t}` : (S.stat ? S.stat() + ` · ${t}` : '');
  $('barraProg').style.width = S.coda ? `${100 * Math.min(S.i, S.coda.length) / S.coda.length}%` : '0%';
}

function prossima() {
  if (S.i >= S.coda.length) return finisci();
  S.blocca = false; S.tent = 0; pulisciStati(); aggiornaStat();
  const id = S.coda[S.i], g = S.gioco;
  $('pannello').innerHTML = '';
  if (g === 'trova') {
    vistaIntera(); svg.parentElement.classList.add('interattivo');
    const cf = fis[id] && cat(fis[id].cat);
    $('domanda').innerHTML = `Clicca su: <b>${nome(id)}</b>${cf ? ` <span class="tipo">(${cf.sing})</span>` : ''}<small>Hai due tentativi.${cf && cf.id === 'mari' ? ' I mari si cliccano sull\'acqua.' : ''}</small>`;
    sulClic = cl => rispondiTrova(id, cl);
    return;
  }
  svg.parentElement.classList.remove('interattivo'); sulClic = null;
  if (g === 'identita') return domandaIdentita(id);
  statoClasse(id, 'evidenzia'); vaiA(id);
  if (g === 'indovina' && fis[id]) {
    const cf = cat(fis[id].cat), a = fis[id].c;
    const dist = x => Math.hypot(a[0] - x.c[0], a[1] - x.c[1]);
    let cand = S.pool.map(x => fis[x]).filter(x => x.id !== id && x.cat === cf.id).sort((x, y) => dist(x) - dist(y)).slice(0, 9);
    if (cand.length < 3) cand = cand.concat(mescola(S.pool.map(x => fis[x]).filter(x => x.id !== id && x.cat !== cf.id)).slice(0, 3 - cand.length));
    const opz = mescola([fis[id], ...mescola(cand).slice(0, 3)]);
    $('domanda').textContent = cf.q;
    scegli(opz.map(o => ({ testo: o.nome, ok: o.id === id })), ok => esito(id, ok, infoElemento(fis[id]), id));
  } else if (g === 'indovina' || g === 'capitali') {
    const vicini = P.filter(p => S.pool.includes(p.id) && p.id !== id).map(p => {
      const a = E.centri[id], b = E.centri[p.id]; return { p, d: Math.hypot(a[0] - b[0], a[1] - b[1]) };
    }).sort((x, y) => x.d - y.d).slice(0, 9).map(o => o.p);
    const altri = mescola(vicini).slice(0, 3), opz = mescola([per[id], ...altri]);
    const chiave = g === 'indovina' ? 'nome' : 'cap';
    $('domanda').innerHTML = g === 'indovina' ? 'Quale Stato è evidenziato?' : `<b>${nome(id)}</b>: qual è la capitale?`;
    scegli(opz.map(o => ({ testo: o[chiave], ok: o.id === id })), ok => esito(id, ok, infoPaese(per[id]), g === 'capitali' ? id + '|cap' : id));
  } else if (g === 'ue') {
    const p = per[id];
    $('domanda').innerHTML = `<b>${p.nome}</b> fa parte dell'Unione europea?`;
    scegli([{ testo: 'Sì, è nell\'UE', ok: p.ue }, { testo: 'No, è fuori dall\'UE', ok: !p.ue }], ok => esito(id, ok, infoPaese(p), id + '|ue'));
  }
}
function scegli(opzioni, fine) {
  const box = document.createElement('div'); box.className = 'risposte';
  opzioni.forEach(o => {
    const b = document.createElement('button'); b.className = 'rispo'; b.textContent = o.testo;
    b.onclick = () => {
      if (S.blocca) return; S.blocca = true;
      box.querySelectorAll('button').forEach((x, k) => { x.disabled = true; if (opzioni[k].ok) x.classList.add('giusto'); });
      if (!o.ok) b.classList.add('sbagliato');
      fine(o.ok);
    };
    box.appendChild(b);
  });
  $('pannello').appendChild(box);
}
function infoPaese(p) {
  return `<b>${p.nome}</b> · capitale ${p.cap} · ${p.ue ? 'membro dell\'UE' : 'non fa parte dell\'UE'}.`;
}
function infoElemento(p) {
  return `<b>${p.nome}</b> (${cat(p.cat).sing}).${p.info ? ' ' + p.info : ''}${p.chicca ? `<br>💡 ${p.chicca}` : ''}`;
}
function avanti() {
  const tok = S;
  const b = document.createElement('button'); b.className = 'primario'; b.textContent = 'Avanti →';
  b.onclick = () => { if (S === tok) { S.i++; prossima(); } };
  $('pannello').appendChild(b);
}
// mostra il risultato di una domanda: id = Stato/elemento evidenziato (o null), chiave = voce per le statistiche
function esito(id, ok, html, chiave) {
  if (id) { pulisciStati(); statoClasse(id, ok ? 'giusto' : 'sbagliato'); }
  if (ok) S.punti++; else S.errori.push(chiave || id);
  registra(chiave || id, ok);
  const m = document.createElement('div'); m.className = 'msg ' + (ok ? 'ok' : 'ko');
  m.innerHTML = (ok ? '✅ Giusto! ' : '❌ Non proprio. ') + html;
  $('pannello').appendChild(m);
  if (ok) { const tok = S; setTimeout(() => { if (S === tok) { S.i++; prossima(); } }, 1400); } else avanti();
  aggiornaStat();
}
function rispondiTrova(id, cl) {
  if (S.blocca) return;
  const info = () => (per[id] ? infoPaese(per[id]) : infoElemento(fis[id]));
  if (cl === id) {
    S.blocca = true;
    if (S.tent === 0) S.punti++; else if (!S.errori.includes(id)) S.errori.push(id);
    registra(id, S.tent === 0);
    statoClasse(id, 'giusto'); showMsg((S.tent === 0 ? '✅ Giusto! ' : '✅ Trovato. ') + info(), 'ok');
    const tok = S; setTimeout(() => { if (S === tok) { S.i++; prossima(); } }, 1500);
  } else {
    S.tent++; statoClasse(cl, 'sbagliato'); setTimeout(() => statoClasse(cl, 'sbagliato', false), 700);
    if (S.tent >= 2) {
      S.blocca = true; S.errori.push(id); registra(id, false); statoClasse(id, 'manca');
      showMsg(`❌ Era <b>${nome(id)}</b> (evidenziato in arancione). ${per[id] ? '' : (fis[id].info || '')}`, 'ko');
      avanti();
    } else showMsg(`Quello è ${nome(cl)}. Riprova!`);
  }
  aggiornaStat();
}
function showMsg(html, cls) { $('pannello').innerHTML = `<div class="msg ${cls || ''}">${html}</div>`; }

// ---------- carta d'identità ----------
function cartaStato(p) {
  const righe = [
    ['🏛️', 'Capitale', p.cap], ['📍', 'Posizione', p.pos], ['🧭', 'Confina con', p.conf.length ? p.conf.join(', ') : 'Nessuno Stato (isola)'],
    ['📐', 'Superficie', fmtSup(p.sup)], ['👥', 'Abitanti', fmtAb(p.ab)], ['💶', 'Moneta', p.mon],
    ['🗣️', 'Lingua', p.lin], ['⚖️', 'Governo', p.gov], ['🛂', 'Schengen', p.sch ? 'Sì' : 'No'],
  ];
  return `<div class="carta">
    <div class="carta-testa"><h3>${p.nome}</h3><span class="badge ${p.ue ? 'si' : 'no'}">${p.ue ? '🇪🇺 Membro UE · ' : ''}${p.ueTxt}</span></div>
    <dl class="carta-griglia">${righe.map(([i, l, v]) => `<div><dt>${i} ${l}</dt><dd>${v}</dd></div>`).join('')}</dl>
    ${p.nota ? `<p class="nota-carta">ℹ️ ${p.nota}</p>` : ''}
    <p class="chicca">💡 ${p.chicca}</p>
  </div>`;
}
function schedaElemento(p) {
  const stati = (p.s || []).map(nomeStato).join(', ');
  return `<div class="carta"><div class="carta-testa"><h3>${p.nome}</h3><span class="badge no">${cat(p.cat).ico} ${cat(p.cat).sing}</span></div>
    ${p.info ? `<p>${p.info}</p>` : ''}
    ${stati ? `<p class="stati-lista"><b>Stati collegati:</b> ${stati}</p>` : ''}
    ${p.chicca ? `<p class="chicca">💡 ${p.chicca}</p>` : ''}</div>`;
}

// domande sulla carta d'identità degli Stati
const AREE = ['Europa settentrionale', 'Europa occidentale', 'Europa centrale', 'Europa orientale', 'Europa meridionale', 'Balcani'];
function domandaIdentita(id) {
  const p = per[id], altri = P.filter(x => S.pool.includes(x.id) && x.id !== id);
  const tipi = ['moneta', 'lingua', 'area', 'abitanti', 'superficie'];
  const t = tipi[Math.random() * tipi.length | 0];
  const distinti = (valore, lista, n = 3) => mescola([...new Set(lista.filter(v => v !== valore))]).slice(0, n);
  if (t === 'moneta' || t === 'lingua') {
    const val = t === 'moneta' ? monetaBase(p) : p.lin;
    const tutti = P.map(x => (t === 'moneta' ? monetaBase(x) : x.lin));
    const opz = mescola([val, ...distinti(val, tutti)]);
    statoClasse(id, 'evidenzia'); vaiA(id);
    $('domanda').innerHTML = t === 'moneta' ? `<b>${p.nome}</b>: qual è la moneta?` : `<b>${p.nome}</b>: qual è la lingua ufficiale?`;
    scegli(opz.map(o => ({ testo: o, ok: o === val })), ok => esito(id, ok, `<b>${p.nome}</b>: ${t === 'moneta' ? 'moneta' : 'lingua'} ${val.toLowerCase()}.`, id + '|' + t));
  } else if (t === 'area') {
    const opz = mescola([p.area, ...mescola(AREE.filter(a => a !== p.area)).slice(0, 3)]);
    statoClasse(id, 'evidenzia'); vaiA(id);
    $('domanda').innerHTML = `<b>${p.nome}</b>: in quale area d'Europa si trova?`;
    scegli(opz.map(o => ({ testo: o, ok: o === p.area })), ok => esito(id, ok, `<b>${p.nome}</b> si trova in: ${p.area.toLowerCase()}. ${p.pos}.`, id + '|area'));
  } else { // confronto numerico
    const campo = t === 'abitanti' ? 'ab' : 'sup';
    const gruppo = [p];
    for (const c of mescola(altri)) { if (gruppo.length >= 4) break; if (gruppo.every(g => Math.max(g[campo], c[campo]) / Math.min(g[campo], c[campo]) >= 1.25)) gruppo.push(c); }
    if (gruppo.length < 3) return domandaIdentita(id); // pool troppo piccolo/omogeneo: riprova con un altro tipo
    const vinc = gruppo.reduce((a, b) => (b[campo] > a[campo] ? b : a));
    $('domanda').textContent = t === 'abitanti' ? 'Quale di questi Stati ha più abitanti?' : 'Quale di questi Stati ha la superficie più estesa?';
    const elenco = gruppo.slice().sort((a, b) => b[campo] - a[campo]).map(g => `${g.nome}: ${t === 'abitanti' ? fmtAb(g.ab) : fmtSup(g.sup)}`).join(' · ');
    scegli(mescola(gruppo).map(g => ({ testo: g.nome, ok: g === vinc })), ok => esito(null, ok, elenco, id + '|' + t));
  }
}

// ---------- studio ----------
function avviaStudio() {
  const fisico = S.modo === 'fisico';
  $('stat').textContent = ''; $('barraProg').style.width = '0%';
  $('domanda').innerHTML = `Esplora la mappa<small>Tocca ${fisico ? 'un elemento' : 'uno Stato'}. Trascina per spostarti, usa + e − (o pizzica) per ingrandire.</small>`;
  svg.parentElement.classList.add('interattivo');
  $('pannello').innerHTML = `<div class="opzioni"><label><input type="checkbox" id="optNomi" checked> Mostra i nomi</label>
    ${fisico ? '' : '<label><input type="checkbox" id="optUE" checked> Colora gli Stati dell\'UE</label>'}</div>
    <div id="scheda"><div class="carta vuota">Tocca ${fisico ? 'un elemento' : 'uno Stato'} per aprire la sua scheda.</div></div>`;
  const nomi = () => { etichetteOn = $('optNomi').checked;
    Object.entries(etich).forEach(([id, t]) => { const micro = MICRO.includes(id); t.dataset.micro = micro ? '1' : '';
      t.style.display = etichetteOn && S.pool.includes(id) && !micro ? '' : 'none'; }); applicaVista(); };
  $('optNomi').onchange = nomi; nomi();
  if (!fisico) {
    const ue = () => S.pool.forEach(id => statoClasse(id, 'ue', $('optUE').checked && per[id].ue));
    $('optUE').onchange = ue; ue();
  }
  sulClic = id => {
    S.pool.forEach(x => statoClasse(x, 'evidenzia', x === id));
    $('scheda').innerHTML = fisico ? schedaElemento(fis[id]) : cartaStato(per[id]);
  };
}

// ---------- componi l'UE ----------
function avviaColoraUE() {
  const eu = S.pool.filter(id => per[id].ue), sel = new Set();
  S.stat = () => `Selezionati ${sel.size}`;
  S.coda = null; S.t0 = Date.now(); timer = setInterval(aggiornaStat, 1000); aggiornaStat();
  $('domanda').innerHTML = `Seleziona tutti gli Stati dell'Unione europea<small>In questo livello ce ne sono ${eu.length}. Tocca di nuovo per togliere la selezione, poi premi Verifica.</small>`;
  svg.parentElement.classList.add('interattivo');
  $('pannello').innerHTML = '<button class="primario" id="verifica">Verifica</button>';
  sulClic = id => { if (S.blocca) return; sel.has(id) ? sel.delete(id) : sel.add(id); statoClasse(id, 'sel', sel.has(id)); aggiornaStat(); };
  $('verifica').onclick = () => {
    S.blocca = true; clearInterval(timer);
    let giusti = 0, sbagliati = 0; S.errori = [];
    S.pool.forEach(id => {
      const e = per[id].ue, s = sel.has(id); statoClasse(id, 'sel', false);
      if (e && s) { giusti++; statoClasse(id, 'giusto'); registra(id + '|ue', true); }
      else if (!e && s) { sbagliati++; S.errori.push(id + '|ue'); statoClasse(id, 'sbagliato'); registra(id + '|ue', false); }
      else if (e && !s) { S.errori.push(id + '|ue'); statoClasse(id, 'manca'); registra(id + '|ue', false); }
    });
    S.punti = Math.max(0, giusti - sbagliati); S.totale = eu.length;
    $('pannello').innerHTML = `<div class="msg">Verde: giusti (${giusti}) · Rosso: scelti per errore (${sbagliati}) · Arancione: UE che avevi dimenticato (${eu.length - giusti}).</div>
      <button class="primario" id="vaiFine">Vedi il risultato →</button>`;
    $('vaiFine').onclick = finisci;
  };
}

// ---------- stati collegati (elementi fisici ↔ Stati) ----------
// Lo studente legge solo il nome dell'elemento: la mappa non lo mostra (salvo che chieda aiuto, a metà punteggio).
function avviaLegami(soloIds) {
  const statiPool = pool(Math.max(2, S.liv)).map(p => p.id), set = new Set(statiPool);
  let elementi = poolFis(S.liv, S.cats).filter(f => f.s && f.s.some(x => set.has(x)));
  if (soloIds) elementi = F.filter(f => soloIds.includes(f.id) && f.s && f.s.some(x => set.has(x)));
  let coda = mescola(elementi.map(f => f.id));
  if (!soloIds && quantita) coda = coda.slice(0, quantita);
  S.coda = coda; S.pool = statiPool;
  impostaPool(statiPool, 'misto'); pulisciStati();
  timer = setInterval(aggiornaStat, 1000);
  const prox = () => {
    if (S.i >= S.coda.length) return finisci();
    S.blocca = false; pulisciStati(); aggiornaStat(); vistaIntera();
    Object.values(elemF).forEach(l => l.forEach(e => { e.style.display = 'none'; }));
    const id = S.coda[S.i], f = fis[id], ok = f.s.filter(x => set.has(x)), tol = (f.t || []), sel = new Set();
    let aiuto = false;
    const mostraElemento = () => { elemF[id].forEach(e => { e.style.display = ''; }); statoClasse(id, 'evidenzia'); };
    svg.parentElement.classList.add('interattivo');
    $('domanda').innerHTML = `${f.q || `Quali Stati tocca: ${f.nome}?`}<small>${cat(f.cat).ico} ${cat(f.cat).sing}: <b>${f.nome}</b> — seleziona gli Stati sulla mappa, poi premi Verifica.${S.liv === 1 ? ` Gli Stati giusti sono ${ok.length}.` : ''}</small>`;
    $('pannello').innerHTML = '<div class="azioni-riga"><button class="primario" id="verifica">Verifica</button><button class="secondario" id="aiuto">💡 Mostrami l\'elemento (mezzo punto)</button></div>';
    sulClic = sid => { if (S.blocca || !set.has(sid)) return; sel.has(sid) ? sel.delete(sid) : sel.add(sid); statoClasse(sid, 'sel', sel.has(sid)); };
    $('aiuto').onclick = () => { aiuto = true; mostraElemento(); $('aiuto').disabled = true; };
    $('verifica').onclick = () => {
      if (S.blocca) return; S.blocca = true;
      const giusti = ok.filter(x => sel.has(x)), mancanti = ok.filter(x => !sel.has(x)), sbagliati = [...sel].filter(x => !ok.includes(x) && !tol.includes(x));
      mostraElemento();
      [...sel].forEach(x => { statoClasse(x, 'sel', false); statoClasse(x, ok.includes(x) || tol.includes(x) ? 'giusto' : 'sbagliato'); });
      mancanti.forEach(x => statoClasse(x, 'manca'));
      const frazione = Math.max(0, (giusti.length - sbagliati.length) / ok.length) * (aiuto ? 0.5 : 1), perfetto = !mancanti.length && !sbagliati.length && !aiuto;
      S.punti += frazione; registra(id + '|stati', perfetto); if (!perfetto) S.errori.push(id + '|stati');
      const nomi = a => a.map(nomeStato).join(', ');
      const m = document.createElement('div'); m.className = 'msg ' + (perfetto ? 'ok' : 'ko');
      m.innerHTML = (perfetto ? '✅ Perfetto! ' : `Ne hai trovati ${giusti.length} su ${ok.length}${aiuto ? ' (con aiuto: mezzo punto)' : ''}. `) + `Stati corretti: <b>${nomi(ok)}</b>.` +
        (sbagliati.length ? `<br>❌ Da togliere: ${nomi(sbagliati)}.` : '') + (mancanti.length ? `<br>🟧 Ti mancava: ${nomi(mancanti)}.` : '') +
        (f.chicca ? `<br>💡 ${f.chicca}` : (f.info ? `<br>${f.info}` : ''));
      $('pannello').innerHTML = ''; $('pannello').appendChild(m);
      const tok = S; const b = document.createElement('button'); b.className = 'primario'; b.textContent = 'Avanti →';
      b.onclick = () => { if (S === tok) { S.i++; prox(); } }; $('pannello').appendChild(b);
      aggiornaStat();
    };
  };
  prox();
}

// ---------- cosa lo tocca? (Stato → elementi fisici) ----------
function statiConElementi(elementi, statiIds) {
  const m = {};
  elementi.forEach(f => (f.s || []).forEach(x => { (m[x] = m[x] || []).push(f); }));
  return statiIds.filter(id => (m[id] || []).length >= 2);
}
function avviaElementi(soloIds) {
  const statiPool = pool(Math.max(2, S.liv)).map(p => p.id), set = new Set(statiPool);
  const elementi = poolFis(S.liv, S.cats);
  const rel = {};
  elementi.forEach(f => (f.s || []).forEach(x => { (rel[x] = rel[x] || []).push(f); }));
  let stati = statiConElementi(elementi, statiPool);
  if (soloIds) stati = stati.filter(x => soloIds.includes(x));
  let coda = mescola(stati);
  if (!soloIds && quantita) coda = coda.slice(0, quantita);
  S.coda = coda; S.pool = statiPool;
  impostaPool(statiPool, 'misto'); pulisciStati();
  timer = setInterval(aggiornaStat, 1000);
  const prox = () => {
    if (S.i >= S.coda.length) return finisci();
    S.blocca = false; pulisciStati(); aggiornaStat();
    Object.values(elemF).forEach(l => l.forEach(e => { e.style.display = 'none'; }));
    const id = S.coda[S.i], tutti = rel[id];
    const giuste = mescola(tutti).slice(0, Math.min(tutti.length, 2 + (Math.random() * 2 | 0)));
    const estranei = mescola(elementi.filter(f => !(f.s || []).includes(id) && !(f.t || []).includes(id)));
    const nDistr = Math.max(3, 7 - giuste.length);
    const opzioni = mescola([...giuste, ...estranei.slice(0, nDistr)]);
    const scelte = new Set();
    statoClasse(id, 'evidenzia'); vaiA(id);
    svg.parentElement.classList.remove('interattivo'); sulClic = null;
    $('domanda').innerHTML = `Quali di questi elementi si trovano nello Stato evidenziato?<small>Stato: <b>${nome(id)}</b>. Seleziona quelli che pensi giusti (possono essere più di uno), poi premi Verifica.</small>`;
    const box = document.createElement('div'); box.className = 'risposte';
    opzioni.forEach(o => {
      const b = document.createElement('button'); b.className = 'rispo'; b.setAttribute('aria-pressed', 'false');
      b.innerHTML = `${cat(o.cat).ico} ${o.nome}`;
      b.onclick = () => { if (S.blocca) return; scelte.has(o.id) ? scelte.delete(o.id) : scelte.add(o.id); b.setAttribute('aria-pressed', scelte.has(o.id)); };
      b.dataset.id = o.id; box.appendChild(b);
    });
    $('pannello').innerHTML = ''; $('pannello').appendChild(box);
    const v = document.createElement('button'); v.className = 'primario'; v.textContent = 'Verifica'; $('pannello').appendChild(v);
    v.onclick = () => {
      if (S.blocca) return; S.blocca = true; v.remove();
      const gIds = giuste.map(g => g.id), hit = gIds.filter(x => scelte.has(x)), manc = gIds.filter(x => !scelte.has(x)), err = [...scelte].filter(x => !gIds.includes(x));
      box.querySelectorAll('button').forEach(b => {
        b.disabled = true; const oid = b.dataset.id;
        if (gIds.includes(oid)) b.classList.add(scelte.has(oid) ? 'giusto' : 'manca'); else if (scelte.has(oid)) b.classList.add('sbagliato');
      });
      giuste.forEach(g => elemF[g.id].forEach(e => { e.style.display = ''; }));
      const frazione = Math.max(0, (hit.length - err.length) / gIds.length), perfetto = !manc.length && !err.length;
      S.punti += frazione; registra(id + '|elementi', perfetto); if (!perfetto) S.errori.push(id + '|elementi');
      const nomi = a => a.map(x => fis[x].nome).join(', '), altri = tutti.map(t => t.id).filter(x => !gIds.includes(x));
      const m = document.createElement('div'); m.className = 'msg ' + (perfetto ? 'ok' : 'ko');
      m.innerHTML = (perfetto ? '✅ Perfetto! ' : `Ne hai trovati ${hit.length} su ${gIds.length}. `) + `Elementi giusti: <b>${nomi(gIds)}</b>.` +
        (err.length ? `<br>❌ Non si trovano lì: ${nomi(err)}.` : '') +
        (altri.length ? `<br>Nello stesso Stato troviamo anche: ${nomi(altri)}.` : '');
      $('pannello').appendChild(m);
      const tok = S; const b = document.createElement('button'); b.className = 'primario'; b.textContent = 'Avanti →';
      b.onclick = () => { if (S === tok) { S.i++; prox(); } }; $('pannello').appendChild(b);
      aggiornaStat();
    };
  };
  prox();
}

// ---------- fine partita ----------
function finisci() {
  clearInterval(timer);
  const g = GIOCHI.find(x => x.id === S.gioco && x.modo === S.modo), tot = S.totale || S.coda.length;
  const pt = Math.round(S.punti * 10) / 10;
  const perc = Math.round(100 * S.punti / tot), sec = Math.floor((Date.now() - S.t0) / 1000);
  const chiave = chiaveRec(S.gioco, S.modo, S.liv, S.cats), rec = mp.get(chiave, null);
  const nuovoRec = rec === null || perc > rec; if (nuovoRec) mp.set(chiave, perc);
  const sess = mp.get('sess', []);
  sess.push({ t: Date.now(), g: S.gioco, m: S.modo, l: S.liv, c: S.modo === 'fisico' ? S.cats : [], p: perc, n: tot, s: sec });
  mp.set('sess', sess.slice(-300));
  const msg = perc === 100 ? 'Perfetto! 🌟' : perc >= 80 ? 'Ottimo lavoro! 👏' : perc >= 60 ? 'Bene, ancora un po\' di ripasso.' : 'Continua ad allenarti: ce la farai!';
  const stelle = perc >= 90 ? 3 : perc >= 70 ? 2 : perc >= 40 ? 1 : 0;
  const err = [...new Set(S.errori)];
  const lista = err.length ? `<div class="lista"><b>Da ripassare:</b><ul>${err.map(k => `<li>${etichettaChiave(k)}</li>`).join('')}</ul></div>` : '';
  const base = [...new Set(err.map(baseId))];
  $('fine').innerHTML = `<div class="card-fine"><h1>${g.ico} ${g.nome}</h1><p class="nota">Livello ${LIVELLI[S.liv - 1].nome} · tempo ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}</p>
    <div class="stelle">${'★'.repeat(stelle)}${'☆'.repeat(3 - stelle)}</div>
    <div class="voto">${pt}/${tot}</div><p><b>${perc}%</b> — ${msg}${nuovoRec && rec !== null ? ' Nuovo record! 🏆' : ''}</p>${lista}
    <div class="azioni"><button class="primario" id="ancora">Rigioca</button>
    ${base.length && S.gioco !== 'coloraUE' ? '<button class="secondario" id="ripassa">Ripassa solo gli errori</button>' : ''}
    <button class="secondario" id="vaiProg">📈 I miei progressi</button>
    <button class="secondario" id="menu">Menu</button></div></div>`;
  mostra('fine');
  const giocoRipasso = S.gioco, modoRipasso = S.modo;
  $('ancora').onclick = () => avvia(S.gioco);
  if ($('ripassa')) $('ripassa').onclick = () => { modo = modoRipasso; avvia(giocoRipasso === 'identita' ? 'indovina' : giocoRipasso, base); };
  $('vaiProg').onclick = () => { disegnaProgressi(); mostra('progressi'); };
  $('menu').onclick = esciMenu;
}
function esciMenu() { if ($('gioco').classList.contains('schermo-intero')) schermoIntero(false); clearInterval(timer); S = null; disegnaHome(); mostra('home'); }
$('esci').onclick = esciMenu;

// ---------- i miei progressi ----------
function disegnaProgressi() {
  const st = mp.get('stat', {}), sess = mp.get('sess', []);
  const box = $('progressi');
  const nSess = sess.length, ultime = sess.slice(-5), prime = sess.slice(0, 5);
  const media = a => a.length ? Math.round(a.reduce((s, x) => s + x.p, 0) / a.length) : null;
  const mU = media(ultime), mP = media(prime);
  const trend = nSess >= 6 && mU !== null ? mU - mP : null;
  const tempoTot = Math.round(sess.reduce((s, x) => s + x.s, 0) / 60);
  const ultime20 = sess.slice(-20);
  const barre = ultime20.map(x => {
    const w = 100 / Math.max(ultime20.length, 1), h = Math.max(x.p, 3);
    const gioco = (GIOCHI.find(g => g.id === x.g && g.modo === x.m) || {}).nome || x.g;
    const dt = new Date(x.t).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
    return `<div class="barra-col" style="width:${w}%" title="${dt} · ${gioco} · ${x.p}%"><div class="barra-v ${x.p >= 80 ? 'alto' : x.p >= 60 ? 'medio' : 'basso'}" style="height:${h}%"></div></div>`;
  }).join('');
  const righe = Object.entries(st).filter(([, r]) => r.e > 0).sort((a, b) => b[1].e - a[1].e || (b[1].e / b[1].n) - (a[1].e / a[1].n)).slice(0, 12);
  const puntini = r => r.r.map(x => `<i class="${x ? 'p-ok' : 'p-ko'}"></i>`).join('');
  const tabErr = righe.length ? `<table class="tab-err"><thead><tr><th>Elemento</th><th>Errori</th><th>Ultime risposte</th></tr></thead><tbody>${righe.map(([k, r]) =>
    `<tr><td>${etichettaChiave(k)}<br><span class="grp">${gruppoChiave(k)}</span></td><td>${r.e} su ${r.n}</td><td><span class="puntini">${puntini(r)}</span></td></tr>`).join('')}</tbody></table>` : '<p class="nota">Nessun errore registrato: continua così! 🎉</p>';
  const gruppi = {};
  Object.entries(st).forEach(([k, r]) => { const g = gruppoChiave(k); (gruppi[g] = gruppi[g] || { n: 0, e: 0 }); gruppi[g].n += r.n; gruppi[g].e += r.e; });
  const gruppiHtml = Object.entries(gruppi).sort((a, b) => b[1].n - a[1].n).map(([g, r]) => {
    const pc = Math.round(100 * (r.n - r.e) / r.n);
    return `<div class="gruppo"><span>${g}</span><div class="gr-barra"><div class="${pc >= 80 ? 'alto' : pc >= 60 ? 'medio' : 'basso'}" style="width:${pc}%"></div></div><b>${pc}%</b><small>${r.n} risposte</small></div>`;
  }).join('') || '<p class="nota">Ancora nessun dato.</p>';
  const dachi = [...new Set(righe.map(([k]) => baseId(k)))];
  const daStati = dachi.filter(i => per[i]), daFis = dachi.filter(i => fis[i]);
  box.innerHTML = `<div class="barra"><button class="btn-testo" id="progIndietro">← Menu</button><span class="stat">Profilo: <b>${profilo}</b></span></div>
    <h1>📈 I miei progressi</h1>
    <div class="riepilogo">
      <div class="num"><b>${nSess}</b><span>partite giocate</span></div>
      <div class="num"><b>${mU === null ? '–' : mU + '%'}</b><span>media ultime 5</span></div>
      <div class="num"><b>${trend === null ? '–' : (trend > 0 ? '+' : '') + trend}</b><span>${trend === null ? 'miglioramento (servono 6 partite)' : 'punti rispetto alle prime 5'}</span></div>
      <div class="num"><b>${tempoTot}</b><span>minuti di studio</span></div>
    </div>
    <h2>Risultati delle ultime partite</h2>
    ${ultime20.length ? `<div class="grafico">${barre}</div><p class="nota">Ogni barra è una partita (verde ≥ 80%, giallo ≥ 60%, rosa sotto).</p>` : '<p class="nota">Gioca qualche partita per vedere il grafico.</p>'}
    <h2>Dove vai meglio e dove peggio</h2>${gruppiHtml}
    <h2>Errori ricorrenti</h2>${tabErr}
    <div class="azioni">
      ${daStati.length ? '<button class="primario" id="allenaStati">🎯 Allena gli Stati sbagliati</button>' : ''}
      ${daFis.length ? '<button class="primario" id="allenaFis">🎯 Allena gli elementi fisici sbagliati</button>' : ''}
    </div>
    <h2>Gestione dati</h2>
    <p class="nota">I progressi sono salvati su questo dispositivo, nel profilo «${profilo}». Se cancelli i dati del browser si perdono.</p>
    <div class="azioni"><button class="secondario" id="copiaCsv">📋 Copia il riepilogo</button><button class="secondario" id="azzera">🗑️ Azzera i progressi di ${profilo}</button></div>
    <p class="nota" id="esitoCopia"></p><textarea id="areaCsv" class="area-csv" rows="6" readonly hidden aria-label="Riepilogo da copiare"></textarea>`;
  $('progIndietro').onclick = esciMenu;
  if ($('allenaStati')) $('allenaStati').onclick = () => { modo = 'stati'; mem.set('modo', modo); avvia('trova', daStati.slice(0, 10)); };
  if ($('allenaFis')) $('allenaFis').onclick = () => { modo = 'fisico'; mem.set('modo', modo); avvia('trova', daFis.slice(0, 10)); };
  $('copiaCsv').onclick = () => {
    const rows = [['elemento', 'tipo', 'gruppo', 'risposte', 'errori']];
    Object.entries(st).forEach(([k, r]) => rows.push([nome(baseId(k)), TIPI[k.split('|')[1]] || 'nome', gruppoChiave(k), r.n, r.e]));
    rows.push([], ['data', 'gioco', 'modo', 'livello', 'percentuale', 'domande', 'secondi']);
    sess.forEach(x => rows.push([new Date(x.t).toISOString().slice(0, 16).replace('T', ' '), x.g, x.m, x.l, x.p, x.n, x.s]));
    const csv = rows.map(r => r.join('\t')).join('\n');
    const mostraTesto = () => { $('areaCsv').hidden = false; $('areaCsv').value = csv; $('areaCsv').focus(); $('areaCsv').select(); $('esitoCopia').textContent = 'Seleziona il testo e copialo (Ctrl+C o Cmd+C).'; };
    try { navigator.clipboard.writeText(csv).then(() => { $('esitoCopia').textContent = 'Riepilogo copiato! Incollalo in un foglio di calcolo o in un messaggio.'; }, mostraTesto); } catch { mostraTesto(); }
  };
  let conferma = null;
  $('azzera').onclick = () => {
    if (conferma === null) {
      $('azzera').textContent = `Sicuro? Clicca di nuovo per cancellare i dati di ${profilo}`;
      conferma = setTimeout(() => { conferma = null; $('azzera').textContent = `🗑️ Azzera i progressi di ${profilo}`; }, 5000);
      return;
    }
    clearTimeout(conferma); mp.del('stat'); mp.del('sess');
    Object.keys(localStorage).filter(k => k.startsWith(`eg_p_${profilo}_rec_`)).forEach(k => localStorage.removeItem(k));
    disegnaProgressi();
  };
}

disegnaHome();
})();

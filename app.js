(() => {
'use strict';
// Dati della sezione attiva (Europa o Mondo): vengono impostati da impostaSezione()
let E, P, F, X, per, fis, MICRO = [], SZ;
const NS = 'http://www.w3.org/2000/svg';
const $ = id => document.getElementById(id);

const CATS = [
  { id: 'mari', nome: 'Mari e oceani', sing: 'mare', ico: '🌊', q: 'Quale mare (o oceano) è evidenziato?' },
  { id: 'stretti', nome: 'Stretti e canali', sing: 'stretto o canale', ico: '↔️', q: 'Quale stretto (o canale) è evidenziato?' },
  { id: 'fiumi', nome: 'Fiumi', sing: 'fiume', ico: '🏞️', q: 'Quale fiume è evidenziato?' },
  { id: 'monti', nome: 'Catene montuose', sing: 'catena montuosa', ico: '⛰️', q: 'Quale catena montuosa è evidenziata?' },
  { id: 'pianure', nome: 'Pianure e altopiani', sing: 'pianura o altopiano', ico: '🌾', q: 'Quale pianura (o altopiano) è evidenziata?' },
  { id: 'vette', nome: 'Vette e vulcani', sing: 'vetta o vulcano', ico: '🌋', q: 'Quale vetta o vulcano è evidenziato?' },
  { id: 'penisole', nome: 'Penisole', sing: 'penisola', ico: '🥾', q: 'Quale penisola è evidenziata?' },
  { id: 'isole', nome: 'Isole', sing: 'isola', ico: '🏝️', q: 'Quale isola è evidenziata?' },
  { id: 'laghi', nome: 'Laghi', sing: 'lago', ico: '💧', q: 'Quale lago è evidenziato?' },
  { id: 'deserti', nome: 'Deserti', sing: 'deserto', ico: '🏜️', q: 'Quale deserto è evidenziato?' },
];
const cat = id => CATS.find(c => c.id === id);
const dato = id => per[id] || fis[id];
const nome = id => dato(id).nome;
const nomeStato = id => (per[id] ? per[id].nome : id);

const LIVELLI = [
  { n: 1, nome: 'Facile', desc: n => modo === 'fisico' ? `${n} elementi: quelli fondamentali del programma base.` : SZ.id === 'mondo' ? `${n} Stati: i più grandi e conosciuti di ogni continente.` : `${n} Stati: i principali, quelli grandi e più conosciuti.` },
  { n: 2, nome: 'Medio', desc: n => modo === 'fisico' ? `${n} elementi: tutte le catene montuose e gli elementi più importanti.` : SZ.id === 'mondo' ? `${n} Stati: si aggiungono molti Stati di media grandezza.` : `${n} Stati: si aggiungono i Balcani, i Paesi baltici e altri Stati medio-piccoli.` },
  { n: 3, nome: 'Difficile', desc: n => modo === 'fisico' ? `${n} elementi: anche i più piccoli, ognuno con una curiosità di attualità.` : SZ.id === 'mondo' ? `${n} Stati: tutti, compresi gli Stati insulari e i più piccoli.` : `${n} Stati: tutti, compresi Malta, Kosovo e i microstati.` },
];
const TUTTE = ['europa', 'mondo'];
const GIOCHI = [
  { id: 'studio', ico: '📖', nome: 'Studio', desc: 'Esplora la mappa: tocca uno Stato per aprire la sua carta d\'identità.', punti: false, modo: 'stati', sez: TUTTE },
  { id: 'trova', ico: '🎯', nome: 'Trova lo Stato', desc: 'Leggi il nome e cliccalo sulla mappa.', modo: 'stati', sez: TUTTE },
  { id: 'indovina', ico: '❓', nome: 'Che Stato è?', desc: 'Uno Stato è evidenziato: scegli il nome giusto.', modo: 'stati', sez: TUTTE },
  { id: 'capitali', ico: '🏛️', nome: 'Le capitali', desc: 'Uno Stato è evidenziato: scegli la sua capitale.', modo: 'stati', sez: TUTTE },
  { id: 'continente', ico: '🧭', nome: 'In che continente?', desc: 'Uno Stato è evidenziato: scegli il continente in cui si trova.', modo: 'stati', sez: ['mondo'] },
  { id: 'coloraCont', ico: '🟩', nome: 'Componi il continente', desc: 'Seleziona sulla mappa tutti gli Stati di un continente.', modo: 'stati', sez: ['mondo'] },
  { id: 'ue', ico: '🇪🇺', nome: 'UE o non UE?', desc: 'Lo Stato evidenziato fa parte dell\'Unione europea?', modo: 'stati', sez: ['europa'] },
  { id: 'coloraUE', ico: '🟦', nome: 'Componi l\'UE', desc: 'Seleziona sulla mappa tutti gli Stati membri dell\'Unione europea.', modo: 'stati', sez: ['europa'] },
  { id: 'risiko', ico: '⚔️', nome: 'Costruisci il tuo Stato', desc: 'Un Risiko con un obiettivo diverso: conquistare non basta, devi creare territorio, popolo e governo.', punti: false, modo: 'stati', sez: ['europa'] },
  { id: 'identita', ico: '🪪', nome: 'Carta d\'identità', desc: 'Moneta, lingua, posizione, abitanti, superficie: quanto conosci gli Stati?', modo: 'stati', sez: TUTTE },
  { id: 'studio', ico: '📖', nome: 'Studio', desc: 'Esplora la mappa fisica: tocca un elemento per leggerne il nome e una curiosità.', punti: false, modo: 'fisico', sez: TUTTE },
  { id: 'trova', ico: '🎯', nome: 'Trova sulla mappa', desc: 'Leggi il nome (di un fiume, un monte, un mare…) e cliccalo sulla mappa.', modo: 'fisico', sez: TUTTE },
  { id: 'indovina', ico: '❓', nome: 'Che cos\'è?', desc: 'Un elemento è evidenziato: scegli il nome giusto.', modo: 'fisico', sez: TUTTE },
  { id: 'legami', ico: '🔗', nome: 'Stati collegati', desc: 'Leggi il nome di un mare, un fiume, un monte… e seleziona sulla mappa gli Stati che tocca. Senza aiuti: devi ricordarlo!', modo: 'fisico', sez: TUTTE },
  { id: 'elementi', ico: '🧩', nome: 'Cosa lo tocca?', desc: 'Uno Stato è evidenziato: scegli quali elementi fisici (fiumi, monti, mari…) si trovano lì.', modo: 'fisico', sez: TUTTE },
];
const TIPI = { cont: 'continente', elementi: 'elementi collegati', stati: 'Stati collegati', moneta: 'moneta', lingua: 'lingua', area: 'posizione', abitanti: 'abitanti', superficie: 'superficie', ue: 'UE', cap: 'capitale' };

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
let sezione = mem.get('sez', 'europa');
let cats = [];
// categorie fisiche presenti nella sezione attiva (es. i deserti ci sono solo nel Mondo); la scelta è salvata per sezione
const catsSez = () => CATS.filter(c => F.some(f => f.cat === c.id));
const salvaCats = () => mem.set('cats' + SZ.suf, cats);
let tema = mem.get('tema', null);
if (tema === null) { const tv = document.documentElement.dataset.theme; tema = tv === 'dark' ? 'scuro' : 'chiaro'; }
document.documentElement.dataset.tema = tema;

// Ogni sezione ha le sue statistiche, le sue partite e i suoi record (Europa mantiene le chiavi di sempre)
const kStat = () => 'stat' + SZ.suf, kSess = () => 'sess' + SZ.suf;
function registra(chiave, ok) {
  const st = mp.get(kStat(), {}), r = st[chiave] || { n: 0, e: 0, r: [] };
  r.n++; if (!ok) r.e++; r.r = [...r.r.slice(-5), ok ? 1 : 0]; r.t = Date.now(); st[chiave] = r;
  mp.set(kStat(), st);
}
const baseId = k => k.split('|')[0];
const etichettaChiave = k => { const [b, t] = k.split('|'); return nome(b) + (t ? ` <small>(${TIPI[t] || t})</small>` : ''); };
const gruppoChiave = k => { const b = baseId(k); if (k.endsWith('|elementi')) return 'Elementi collegati'; return per[b] ? 'Stati' : cat(fis[b].cat).nome; };

const CLS_CONT = [0, 1, 2, 3, 4, 5, 6].map(i => 'cont-' + i);
const mescola = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pool = liv => P.filter(p => p.liv <= liv);
const poolFis = (liv, cs) => F.filter(f => cs.includes(f.cat) && f.liv <= liv);
const poolModo = (m, liv, cs) => (m === 'stati' ? pool(liv) : poolFis(liv, cs));
const chiaveRec = (g, m, liv, cs) => m === 'stati' ? `${SZ.rec}${g}_${liv}` : `${SZ.rec}fis_${g}_${liv}_${[...cs].sort().join('-')}`;

// ---------- sezioni: Europa (seconda media) e Mondo (terza media) ----------
const SEZIONI = {
  europa: {
    id: 'europa', nome: 'Europa', suf: '', rec: 'rec_', zmax: 14, mk: [6, 0.12], etAdatt: false,
    titolo: 'Impara l\'Europa giocando',
    testo: 'Questo è un sito didattico per <b>studiare e imparare</b> la geografia dell\'Europa: gli <b>elementi fisici</b> (monti, pianure, mari, stretti, fiumi, isole, penisole e laghi), gli <b>Stati</b> e le <b>informazioni di base</b> su ciascuno, come capitale, moneta, lingua e appartenenza all\'Unione europea.',
    moduli: [['stati', '🌍 Stati d\'Europa'], ['fisico', '⛰️ Geografia fisica']],
    rilievo: 'dati/rilievo.webp', minW: 420, mappa: 'Mappa dell\'Europa', vistaIntera: 'Vista intera dell\'Europa (torna alla mappa completa)',
    aree: ['Europa settentrionale', 'Europa occidentale', 'Europa centrale', 'Europa orientale', 'Europa meridionale', 'Balcani'],
    areaDom: nome => `<b>${nome}</b>: in quale area d'Europa si trova?`,
    piede: 'Confini, fiumi e carta fisica: Natural Earth (dominio pubblico). Quote del terreno: Terrain Tiles su AWS Open Data (da SRTM, ETOPO1 e altre fonti pubbliche). Dati arrotondati e aggiornati al 2026: per le verifiche fa fede il libro di testo.',
  },
  mondo: {
    id: 'mondo', nome: 'Mondo', suf: '_m', rec: 'recm_', zmax: 40, mk: [7, 0.05], etAdatt: true,
    titolo: 'Impara il mondo giocando',
    testo: 'Questo è un sito didattico per <b>studiare e imparare</b> la geografia del mondo: i <b>continenti</b>, gli <b>Stati</b> di ogni parte della Terra e le <b>informazioni di base</b> su ciascuno, come capitale, moneta, lingua e abitanti., oltre alla <b>geografia fisica</b> (oceani, mari, catene montuose, fiumi, deserti, isole, penisole e laghi).',
    moduli: [['stati', '🌍 Stati del mondo'], ['fisico', '⛰️ Geografia fisica']],
    rilievo: 'dati/rilievo-mondo.webp', minW: 150, mappa: 'Mappa del mondo', vistaIntera: 'Vista intera del mondo (torna alla mappa completa)',
    aree: [],
    areaDom: nome => `<b>${nome}</b>: in quale continente si trova?`,
    piede: 'Confini: Natural Earth (dominio pubblico). Dati arrotondati e aggiornati al 2025: per le verifiche fa fede il libro di testo. Alcuni confini e alcuni Stati (come Taiwan, Palestina e Kosovo) sono oggetto di dispute internazionali.',
  },
};
const caricati = {};
const carica = src => caricati[src] || (caricati[src] = new Promise((ok, ko) => {
  const t = document.createElement('script'); t.src = src; t.onload = ok; t.onerror = () => { delete caricati[src]; ko(new Error('Impossibile caricare ' + src)); };
  document.head.appendChild(t);
}));
// Stati ambigui tra due continenti: non penalizzano nelle domande sul continente
const ALT = { RUS: ['Europa', 'Asia'], TUR: ['Asia', 'Europa'], CYP: ['Asia', 'Europa'], KAZ: ['Asia', 'Europa'], ARM: ['Asia', 'Europa'], AZE: ['Asia', 'Europa'], GEO: ['Asia', 'Europa'], MEX: ['America centrale', 'America settentrionale'] };
let sezPronta = null;
async function impostaSezione(id) {
  const z = SEZIONI[id] || SEZIONI.europa;
  if (z.id === 'mondo') { await carica('dati/mondo.js'); await carica('mondo-paesi.js'); await carica('dati/mondo-fisico.js'); }
  SZ = z; sezione = z.id; mem.set('sez', z.id);
  if (z.id === 'europa') {
    E = window.EUROPA; P = window.PAESI; F = window.FISICO; X = window.CONTENUTI || {};
    if (!F.fatto) { F.forEach(f => { if (X[f.id]) Object.assign(f, X[f.id]); else console.warn('Elemento senza contenuti:', f.id); }); F.fatto = true; }
    MICRO = ['MLT', 'AND', 'MCO', 'SMR', 'VAT', 'LIE'];
  } else {
    E = window.MONDO; P = window.PAESI_MONDO; F = window.FISICO_MONDO; X = {};
    const idP = new Set(P.map(p => p.id)); MICRO = E.micro.filter(id => idP.has(id));
    P.forEach(p => { p.area = p.cont; p.alt = p.amb ? (ALT[p.id] || [p.cont]) : null; });
    const nomi = Object.fromEntries(P.map(p => [p.id, p.nome]));
    P.forEach(p => { if (!p.confFatto) { p.conf = (E.conf[p.id] || []).filter(x => nomi[x] && x !== p.id).map(x => nomi[x]); p.confFatto = true; } });
    SZ.aree = window.CONTINENTI;
  }
  per = Object.fromEntries(P.map(p => [p.id, p])); fis = Object.fromEntries(F.map(f => [f.id, f]));
  if (!SZ.moduli.some(([m, , off]) => m === modo && !off)) { modo = 'stati'; mem.set('modo', modo); }
  cats = mem.get('cats' + SZ.suf, catsSez().map(c => c.id)).filter(c => catsSez().some(x => x.id === c));
  if (!cats.length) cats = catsSez().map(c => c.id);
  document.title = 'Geografia in gioco · ' + z.nome;
  $('gioco').classList.toggle('sez-mondo', z.id === 'mondo');
  costruisciMappa();
}

// ---------- formati ----------
const fmt = n => n.toLocaleString('it-IT');
const fmtSup = v => (v < 10 ? v.toLocaleString('it-IT', { maximumFractionDigits: 2 }) : fmt(Math.round(v))) + ' km²';
const fmtAb = v => v >= 1e6 ? 'circa ' + (v / 1e6).toLocaleString('it-IT', { maximumFractionDigits: v >= 1e8 ? 0 : 1 }) + ' milioni' : 'circa ' + fmt(v);
const monetaBase = p => p.mon.replace(/ \(.*\)/, '');

// ---------- home ----------
function disegnaHome() {
  $('nomeProfilo').textContent = profilo;
  $('btnTema').textContent = tema === 'chiaro' ? '🌙' : '☀️';
  const SC = $('sezioni'); SC.innerHTML = '';
  [['europa', '🇪🇺', 'Europa', 'Seconda media'], ['mondo', '🌍', 'Mondo', 'Terza media']].forEach(([id, ico, t, sub]) => {
    const b = document.createElement('button'); b.className = 'sez-btn'; b.innerHTML = `<span class="sez-ico">${ico}</span><b>${t}</b><small>${sub}</small>`;
    b.setAttribute('aria-pressed', id === SZ.id);
    b.onclick = () => { if (id !== SZ.id) cambiaSezione(id); };
    SC.appendChild(b);
  });
  $('heroTitolo').textContent = SZ.titolo; $('heroTesto').innerHTML = SZ.testo; $('piede').textContent = SZ.piede;
  const M = $('modi'); M.innerHTML = '';
  SZ.moduli.forEach(([id, t, off]) => {
    const b = document.createElement('button'); b.className = 'chip tab'; b.textContent = t;
    b.setAttribute('aria-pressed', id === modo);
    if (off) { b.disabled = true; b.classList.add('vuoto'); }
    b.onclick = () => { modo = id; mem.set('modo', id); disegnaHome(); };
    M.appendChild(b);
  });
  const C = $('categorie'); C.innerHTML = '';
  $('sezCat').hidden = modo !== 'fisico';
  if (modo === 'fisico') {
    catsSez().forEach(c => {
      const n = poolFis(livello, [c.id]).length;
      const b = document.createElement('button'); b.className = 'chip' + (n ? '' : ' vuoto'); b.textContent = `${c.ico} ${c.nome} (${n})`;
      b.setAttribute('aria-pressed', cats.includes(c.id));
      b.onclick = () => {
        cats = cats.includes(c.id) ? cats.filter(x => x !== c.id) : [...cats, c.id];
        if (!cats.length) cats = [c.id];
        salvaCats(); disegnaHome();
      };
      C.appendChild(b);
    });
    const tutte = document.createElement('button'); tutte.className = 'chip'; tutte.textContent = 'Tutte';
    tutte.setAttribute('aria-pressed', cats.length === catsSez().length);
    tutte.onclick = () => { cats = catsSez().map(c => c.id); salvaCats(); disegnaHome(); };
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
  GIOCHI.filter(g => g.modo === modo && g.sez.includes(SZ.id)).forEach(g => {
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
async function cambiaSezione(id) {
  $('sezioni').classList.add('carico');
  try { await impostaSezione(id); } catch (e) { $('sezioni').classList.remove('carico'); alert('Non riesco a caricare questa sezione. Controlla la connessione e riprova.'); return; }
  $('sezioni').classList.remove('carico'); disegnaHome(); window.scrollTo(0, 0);
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
let vb = { x: 0, y: 0, w: 1000, h: 800 };
const elem = {};            // Stati: id -> [path, marker?]
const elemF = {};           // geografia fisica: id -> [elementi...]
const etich = {};           // id -> <text>
let gLabel, gMarker, gFMark, gPt, gArmate;
const crea = (tag, attr, parent, cls) => {
  const e = document.createElementNS(NS, tag);
  Object.entries(attr || {}).forEach(([k, v]) => e.setAttribute(k, v));
  if (cls) e.setAttribute('class', cls);
  if (parent) parent.appendChild(e);
  return e;
};

function costruisciMappa() {
  svg.replaceChildren();
  [elem, elemF, etich].forEach(o => Object.keys(o).forEach(k => delete o[k]));
  gArmate = null; vb = { x: 0, y: 0, w: E.W, h: E.H };
  svg.setAttribute('viewBox', `0 0 ${E.W} ${E.H}`); svg.setAttribute('aria-label', SZ.mappa);
  svg.parentElement.style.setProperty('--rapporto', E.W / E.H);
  $('zReset').title = SZ.vistaIntera; $('zReset').setAttribute('aria-label', SZ.vistaIntera);
  crea('rect', { width: E.W, height: E.H }, svg, 'mare');
  if (F.length) {
    crea('image', { href: SZ.rilievo, width: E.W, height: E.H, preserveAspectRatio: 'none' }, svg, 'rilievo');
    // ritaglio "solo mare": i mari evidenziati non devono coprire la terraferma, che nella carta fisica è trasparente
    const defs = crea('defs', {}, svg), clip = crea('clipPath', { id: 'soloMare' }, defs);
    crea('path', { 'clip-rule': 'evenodd', d: `M0 0H${E.W}V${E.H}H0Z` + Object.values(E.paesi).join('') }, clip);
  }
  const gSea = crea('g', {}, svg, 'gsea'), gT = crea('g', {}, svg), gPen = crea('g', {}, svg), gPoly = crea('g', {}, svg), gLines = crea('g', {}, svg);
  gPt = crea('g', {}, svg); gFMark = crea('g', {}, svg); gMarker = crea('g', {}, svg); gLabel = crea('g', {}, svg);
  Object.entries(E.paesi).forEach(([id, d]) => {
    const p = crea('path', { d }, gT, 'terra'); p.dataset.id = id;
    elem[id] = [p];
  });
  MICRO.forEach(id => {
    const c = E.centri[id]; if (!c) return;
    if (!elem[id]) { const p = crea('path', { d: '' }, gT, 'terra'); p.dataset.id = id; elem[id] = [p]; }
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
      marca(crea('path', { d: f.d }, (f.cat === 'mari' || f.cat === 'stretti') ? gSea : (f.cat === 'penisole' || f.cat === 'pianure' || f.cat === 'deserti' || f.cat === 'monti') ? gPen : gPoly, `fis poly cat-${f.cat}`));
      if (f.small) marca(crea('circle', { cx: f.c[0], cy: f.c[1] }, gFMark, 'fmark' + (f.cat === 'laghi' ? ' fmark-lago' : '')));
    } else if (f.tipo === 'line') {
      marca(crea('path', { d: f.d }, gLines, `fis line cat-${f.cat}`));
      marca(crea('path', { d: f.d }, gLines, 'fis hitline'));
      if (f.cat === 'stretti') marca(crea('circle', { cx: f.c[0], cy: f.c[1] }, gFMark, 'fmark'));
    } else {
      const tri = marca(crea('path', { d: 'M0,-9 L8,6 L-8,6 Z' }, gPt, `fis pt cat-${f.cat}`));
      tri.dataset.x = f.c[0]; tri.dataset.y = f.c[1];
      marca(crea('circle', { cx: f.c[0], cy: f.c[1] }, gFMark, 'fmark'));
    }
    elemF[f.id] = els;
    const t = crea('text', { x: f.c[0], y: f.c[1] }, gLabel, `etichetta cat-${f.cat}`);
    t.dataset.id = f.id; t.textContent = f.nome; t.style.display = 'none'; etich[f.id] = t;
  });
}

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
  [...Object.values(elem), ...Object.values(elemF)].forEach(l => l.forEach(e => e.classList.remove('evidenzia', 'sel', 'giusto', 'sbagliato', 'manca', 'ue', ...CLS_CONT)));
}

// zoom e spostamento
function applicaVista() {
  vb.w = Math.min(E.W, Math.max(E.W / SZ.zmax, vb.w)); vb.h = vb.w * E.H / E.W;
  vb.x = Math.min(E.W - vb.w, Math.max(0, vb.x)); vb.y = Math.min(E.H - vb.h, Math.max(0, vb.y));
  svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  const k = vb.w / E.W;
  const kk = Math.max(k, SZ.mk[1]);
  gMarker.querySelectorAll('circle').forEach(c => c.setAttribute('r', SZ.mk[0] * kk));
  gFMark.querySelectorAll('circle').forEach(c => c.setAttribute('r', 10 * kk));
  gPt.querySelectorAll('path').forEach(t => t.setAttribute('transform', `translate(${t.dataset.x} ${t.dataset.y}) scale(${kk})`));
  if (gArmate) gArmate.querySelectorAll('g').forEach(g => g.setAttribute('transform', `translate(${g.dataset.x} ${g.dataset.y}) scale(${Math.max(k, 0.25)})`));
  const fs = 12 * k;
  if (SZ.etAdatt) return aggiornaEtichetteMondo(k, fs);
  Object.entries(etich).forEach(([id, t]) => {
    t.style.fontSize = fs + 'px'; t.style.strokeWidth = (3 * k) + 'px';
    if (t.dataset.micro) t.style.display = (etichetteOn && k < 0.4 && S && S.pool.includes(t.dataset.id)) ? '' : 'none';
  });
}
// Mondo: un nome compare se c'è posto per leggerlo e non copre un nome più importante (gli elementi più importanti hanno la precedenza)
function aggiornaEtichetteMondo(k, fs) {
  const candidate = [];
  Object.entries(etich).forEach(([id, t]) => {
    t.style.fontSize = fs + 'px'; t.style.strokeWidth = (3 * k) + 'px';
    if (!etichetteOn || !S || !S.pool.includes(id)) { t.style.display = 'none'; return; }
    if (!t.dataset.bw) { const e = (elem[id] || elemF[id])[0], b = e.getBBox(); t.dataset.bw = e.classList.contains('pt') ? 25 : Math.max(b.width, b.height * 1.6); }
    const stato = !!per[id], largo = t.textContent.length * 0.56 * fs;
    if (stato && t.dataset.micro) { if (k >= 0.12) { t.style.display = 'none'; return; } }
    else if (stato && largo > t.dataset.bw * 1.25) { t.style.display = 'none'; return; }
    candidate.push([id, t, stato ? 0 : fis[id].liv, +t.dataset.bw, largo]);
  });
  candidate.sort((a, b) => a[2] - b[2] || b[3] - a[3]);
  const occupato = [], h = fs * 1.15;
  candidate.forEach(([id, t, , , largo]) => {
    const x = +t.getAttribute('x'), y = +t.getAttribute('y'), r = [x - largo / 2, y - h / 2, x + largo / 2, y + h / 2];
    const libero = !occupato.some(o => r[0] < o[2] && r[2] > o[0] && r[1] < o[3] && r[3] > o[1]);
    t.style.display = libero ? '' : 'none';
    if (libero) occupato.push(r);
  });
}
const aSvg = (cx, cy) => { const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
function zoomIn(f, cx, cy) {
  let px, py;
  if (cx === undefined) { px = vb.x + vb.w / 2; py = vb.y + vb.h / 2; } else { const q = aSvg(cx, cy); px = q.x; py = q.y; }
  const nw = Math.min(E.W, Math.max(E.W / SZ.zmax, vb.w * f)), r = nw / vb.w;
  vb.x = px - (px - vb.x) * r; vb.y = py - (py - vb.y) * r; vb.w = nw; applicaVista();
}
function vistaIntera() { vb = { x: 0, y: 0, w: E.W, h: E.H }; applicaVista(); }
function vaiA(id) {
  if (!per[id]) { // elemento fisico: inquadra il suo riquadro con un po' di margine
    const b = elemF[id][0].getBBox(), cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    const w = Math.max(SZ.minW, b.width * 1.6, b.height * 1.6 * E.W / E.H);
    if (w > E.W * 0.75) return vistaIntera();
    vb = { x: cx - w / 2, y: cy - w * E.H / E.W / 2, w, h: w * E.H / E.W }; return applicaVista();
  }
  const c = E.centri[id], b = elem[id][0].getBBox();
  if (SZ.id === 'mondo') { // inquadra lo Stato con un po' di margine; i più grandi si vedono sulla mappa intera
    const lato = Math.max(b.width, b.height * E.W / E.H), w = Math.max(90, lato * 3.4);
    if (!c || w > E.W * 0.55) return vistaIntera();
    const cx = lato < 8 ? c[0] : b.x + b.width / 2, cy = lato < 8 ? c[1] : b.y + b.height / 2;
    vb = { x: cx - w / 2, y: cy - w * E.H / E.W / 2, w, h: w * E.H / E.W }; return applicaVista();
  }
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
    if (trascinato > 16) { mosso = true; const r = svg.getBoundingClientRect(); const s = Math.min(r.width / vb.w, r.height / vb.h); vb.x -= dx / s; vb.y -= dy / s; applicaVista(); }
  } else if (ptr.size === 2 && d0 > 0) {
    const [a, b] = [...ptr.values()], q = aSvg((a.x + b.x) / 2, (a.y + b.y) / 2);
    const nw = Math.min(E.W, Math.max(E.W / SZ.zmax, w0 * d0 / dist())), r = nw / vb.w;
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
    ? (modo === 'stati' ? pool(3) : poolFis(3, catsSez().map(c => c.id))).map(p => p.id)
    : poolModo(modo, livello, cats).map(p => p.id);
  S = { gioco, modo, cats: cats.slice(), liv: livello, pool: poolIds, i: 0, punti: 0, errori: [], t0: Date.now(), blocca: false, tent: 0 };
  vistaIntera(); sulClic = null; etichetteOn = false;
  svg.parentElement.classList.remove('interattivo');
  mostra('gioco');
  if (gioco === 'risiko') return avviaRisiko();
  if (gioco === 'legami') return avviaLegami(soloIds);
  if (gioco === 'elementi') return avviaElementi(soloIds);
  impostaPool(poolIds); pulisciStati();
  if (gioco === 'studio') return avviaStudio();
  if (gioco === 'coloraUE') return avviaColoraUE();
  if (gioco === 'coloraCont') return avviaColoraCont();
  let coda = soloIds ? mescola(soloIds) : mescola(poolIds);
  if (gioco === 'continente') coda = coda.filter(id => !per[id].amb);   // gli Stati a cavallo tra due continenti non si chiedono
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
    $('domanda').innerHTML = `Clicca su: <b>${nome(id)}</b>${cf ? ` <span class="tipo">(${cf.sing})</span>` : ''}<small>Hai due tentativi.${cf && cf.id === 'mari' ? ' I mari si cliccano sull\'acqua.' : cf && cf.id === 'stretti' ? ' Gli stretti sono piccoli: puoi ingrandire la mappa.' : ''}</small>`;
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
  } else if (g === 'continente') {
    const p = per[id];
    $('domanda').innerHTML = `<b>${p.nome}</b>: in quale continente si trova?`;
    $('pannello').innerHTML = '';
    scegli(SZ.aree.map(c => ({ testo: c, ok: c === p.cont })), ok => esito(id, ok, infoPaese(p) + (p.nota ? ` ${p.nota}` : ''), id + '|cont'));
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
  if (SZ.id === 'mondo') return `<b>${p.nome}</b> · capitale ${p.cap} · ${p.cont}.`;
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
  if (SZ.id === 'mondo') {
    const r = [['🏛️', 'Capitale', p.cap], ['🌍', 'Continente', p.cont], ['📍', 'Posizione', p.pos], ['🧭', 'Confina con', p.conf.length ? p.conf.join(', ') : 'Nessuno Stato (isola)'],
      ['📐', 'Superficie', fmtSup(p.sup)], ['👥', 'Abitanti', fmtAb(p.ab)], ['💶', 'Moneta', p.mon], ['🗣️', 'Lingua', p.lin], ['⚖️', 'Governo', p.gov]];
    return `<div class="carta">
    <div class="carta-testa"><h3>${p.nome}</h3><span class="badge no">${p.cont}</span></div>
    <dl class="carta-griglia">${r.map(([i, l, v]) => `<div><dt>${i} ${l}</dt><dd>${v}</dd></div>`).join('')}</dl>
    ${p.nota ? `<p class="nota-carta">ℹ️ ${p.nota}</p>` : ''}
    <p class="chicca">💡 ${p.chicca}</p>
  </div>`;
  }
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
function domandaIdentita(id) {
  const p = per[id], altri = P.filter(x => S.pool.includes(x.id) && x.id !== id);
  const tipi = ['moneta', 'lingua', 'area', 'abitanti', 'superficie'].filter(x => !(x === 'area' && p.amb));
  const t = tipi[Math.random() * tipi.length | 0];
  const distinti = (valore, lista, n = 3) => mescola([...new Set(lista.filter(v => v !== valore))]).slice(0, n);
  if (t === 'moneta' || t === 'lingua') {
    const val = t === 'moneta' ? monetaBase(p) : p.lin;
    const tutti = P.map(x => (t === 'moneta' ? monetaBase(x) : x.lin));
    // per le lingue si scartano le risposte che contengono la stessa lingua (es. «Inglese» e «Inglese e francese»)
    const lingue = v => v.toLowerCase().split(/,| e /).map(x => x.trim());
    const diverse = t === 'moneta' ? tutti : tutti.filter(v => !lingue(v).some(l => lingue(val).includes(l)));
    const opz = mescola([val, ...distinti(val, diverse)]);
    statoClasse(id, 'evidenzia'); vaiA(id);
    $('domanda').innerHTML = t === 'moneta' ? `<b>${p.nome}</b>: qual è la moneta?` : `<b>${p.nome}</b>: qual è la lingua ufficiale?`;
    scegli(opz.map(o => ({ testo: o, ok: o === val })), ok => esito(id, ok, `<b>${p.nome}</b>: ${t === 'moneta' ? 'moneta' : 'lingua'} ${val.toLowerCase()}.`, id + '|' + t));
  } else if (t === 'area') {
    const opz = mescola([p.area, ...mescola(SZ.aree.filter(a => a !== p.area)).slice(0, 3)]);
    statoClasse(id, 'evidenzia'); vaiA(id);
    $('domanda').innerHTML = SZ.areaDom(p.nome);
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
    ${fisico ? '' : SZ.id === 'mondo' ? '<label><input type="checkbox" id="optCont" checked> Colora per continente</label>' : '<label><input type="checkbox" id="optUE" checked> Colora gli Stati dell\'UE</label>'}</div>
    ${SZ.id === 'mondo' ? '<div class="legenda" id="legenda"></div>' : ''}
    <div id="scheda"><div class="carta vuota">Tocca ${fisico ? 'un elemento' : 'uno Stato'} per aprire la sua scheda.</div></div>`;
  const nomi = () => { etichetteOn = $('optNomi').checked;
    if (SZ.etAdatt) { Object.entries(etich).forEach(([id, t]) => { t.dataset.micro = MICRO.includes(id) ? '1' : ''; }); return applicaVista(); }
    Object.entries(etich).forEach(([id, t]) => { const micro = MICRO.includes(id); t.dataset.micro = micro ? '1' : '';
      t.style.display = etichetteOn && S.pool.includes(id) && !micro ? '' : 'none'; }); applicaVista(); };
  $('optNomi').onchange = nomi; nomi();
  if (!fisico && SZ.id === 'mondo') {
    const col = () => {
      const on = $('optCont').checked;
      S.pool.forEach(id => SZ.aree.forEach((c, i) => statoClasse(id, 'cont-' + i, on && per[id].cont === c)));
      $('legenda').innerHTML = on ? SZ.aree.map((c, i) => `<span><i class="cont-${i}"></i>${c}</span>`).join('') : '';
    };
    $('optCont').onchange = col; col();
  } else if (!fisico) {
    const ue = () => S.pool.forEach(id => statoClasse(id, 'ue', $('optUE').checked && per[id].ue));
    $('optUE').onchange = ue; ue();
  }
  sulClic = id => {
    S.pool.forEach(x => statoClasse(x, 'evidenzia', x === id));
    $('scheda').innerHTML = fisico ? schedaElemento(fis[id]) : cartaStato(per[id]);
  };
}

// ---------- componi l'UE / componi il continente ----------
// membri: Stati da selezionare; tolleranti: Stati ambigui che non danno né punti né penalità; chiave: voce per le statistiche
function giocoSelezione({ membri, tollerati, titolo, sotto, chiave }) {
  const sel = new Set();
  S.stat = () => `Selezionati ${sel.size}`;
  S.coda = null; S.t0 = Date.now(); timer = setInterval(aggiornaStat, 1000); aggiornaStat();
  $('domanda').innerHTML = `${titolo}<small>${sotto}</small>`;
  svg.parentElement.classList.add('interattivo');
  $('pannello').innerHTML = '<button class="primario" id="verifica">Verifica</button>';
  sulClic = id => { if (S.blocca) return; sel.has(id) ? sel.delete(id) : sel.add(id); statoClasse(id, 'sel', sel.has(id)); aggiornaStat(); };
  $('verifica').onclick = () => {
    S.blocca = true; clearInterval(timer);
    let giusti = 0, sbagliati = 0, dimenticati = 0; S.errori = [];
    S.pool.forEach(id => {
      const e = membri.has(id), s = sel.has(id); statoClasse(id, 'sel', false);
      if (tollerati.has(id)) { if (s) statoClasse(id, 'giusto'); return; }
      if (e && s) { giusti++; statoClasse(id, 'giusto'); registra(id + chiave, true); }
      else if (!e && s) { sbagliati++; S.errori.push(id + chiave); statoClasse(id, 'sbagliato'); registra(id + chiave, false); }
      else if (e && !s) { dimenticati++; S.errori.push(id + chiave); statoClasse(id, 'manca'); registra(id + chiave, false); }
    });
    S.punti = Math.max(0, giusti - sbagliati); S.totale = membri.size;
    $('pannello').innerHTML = `<div class="msg">Verde: giusti (${giusti}) · Rosso: scelti per errore (${sbagliati}) · Arancione: ${SZ.id === 'mondo' ? 'Stati del continente' : 'UE'} che avevi dimenticato (${dimenticati}).${tollerati.size ? ' Gli Stati a cavallo tra due continenti non cambiano il punteggio.' : ''}</div>
      <button class="primario" id="vaiFine">Vedi il risultato →</button>`;
    $('vaiFine').onclick = finisci;
  };
}
function avviaColoraUE() {
  const eu = S.pool.filter(id => per[id].ue);
  giocoSelezione({ membri: new Set(eu), tollerati: new Set(), titolo: 'Seleziona tutti gli Stati dell\'Unione europea',
    sotto: `In questo livello ce ne sono ${eu.length}. Tocca di nuovo per togliere la selezione, poi premi Verifica.`, chiave: '|ue' });
}
function avviaColoraCont() {
  const certi = c => S.pool.filter(id => per[id].cont === c && !per[id].amb);
  const possibili = SZ.aree.filter(c => certi(c).length >= 4);
  const cont = possibili[Math.random() * possibili.length | 0], membri = certi(cont);
  S.cont = cont;
  giocoSelezione({ membri: new Set(membri), tollerati: new Set(S.pool.filter(id => per[id].amb && per[id].alt.includes(cont))),
    titolo: `Seleziona tutti gli Stati di questo continente: <b>${cont}</b>`,
    sotto: `In questo livello ce ne sono ${membri.length}. Tocca di nuovo per togliere la selezione, poi premi Verifica.`, chiave: '|cont' });
}


// ---------- Costruisci il tuo Stato (Risiko didattico) ----------
// Idea: per essere uno Stato servono territorio, popolo e governo (+ riconoscimento).
// Conquistare è solo un pezzo: se prendi più territorio di quanto riesci a governare, si stacca.
const RK = {
  turni: 15, pa: 3,
  popolo: [
    ['cittadinanza', 'Cittadinanza', 'Si decide chi fa parte del popolo: diritti e doveri uguali per tutti.'],
    ['lingua', 'Lingua e scuola comune', 'Una lingua ufficiale e scuole per tutti permettono di capirsi e sentirsi comunità.'],
    ['simboli', 'Storia e simboli', 'Bandiera, inno e feste nazionali: ci si riconosce in una storia condivisa.'],
    ['anagrafe', 'Censimento e anagrafe', 'Sapere chi vive stabilmente sul territorio: lo Stato ha una popolazione permanente.'],
  ],
  governo: [
    ['costituzione', 'Costituzione', 'Le regole fondamentali: chi decide e quali sono i diritti.'],
    ['parlamento', 'Parlamento e leggi', 'Chi fa le leggi valide su tutto il territorio. Serve la Costituzione.'],
    ['tribunali', 'Tribunali', 'Chi giudica le controversie e fa rispettare le leggi. Serve la Costituzione.'],
    ['esercito', 'Esercito e polizia', 'Solo lo Stato può usare la forza legittima. Ogni turno +2 armate in più nella capitale.'],
    ['tasse', 'Tasse e moneta', 'Con le tasse lo Stato finanzia i servizi. Ogni turno hai 1 punto azione in più.'],
  ],
  req: { parlamento: 'costituzione', tribunali: 'costituzione' },
};
function avviaRisiko() {
  const lista = pool(Math.max(2, livello)).filter(p => !MICRO.includes(p.id));
  const ids = new Set(lista.map(p => p.id)), idPerNome = Object.fromEntries(P.map(p => [p.nome, p.id]));
  const adj = {}; lista.forEach(p => { adj[p.id] = p.conf.map(n => idPerNome[n]).filter(x => x && ids.has(x)); });
  lista.forEach(p => adj[p.id].forEach(q => { if (!adj[q].includes(p.id)) adj[q].push(p.id); }));
  const giocabili = lista.filter(p => adj[p.id].length).map(p => p.id);   // fuori le isole senza confini di terra
  const arm = {};
  giocabili.forEach(id => { const p = per[id]; arm[id] = Math.min(5, 2 + (p.ab > 2e7 ? 2 : p.ab > 8e6 ? 1 : 0) + (p.sup > 3e5 ? 1 : 0)); });
  impostaPool(giocabili); pulisciStati();
  Object.keys(etich).forEach(id => { etich[id].style.display = giocabili.includes(id) ? '' : 'none'; });
  if (gArmate) gArmate.remove();
  gArmate = crea('g', {}, svg); gArmate.setAttribute('pointer-events', 'none');
  const badge = {};
  giocabili.forEach(id => {
    const c = E.centri[id]; const g = crea('g', {}, gArmate, 'armate'); g.dataset.x = c[0]; g.dataset.y = c[1];
    crea('circle', { cx: 0, cy: -15, r: 9 }, g, 'armate-c'); const t = crea('text', { x: 0, y: -11.5 }, g, 'armate-t'); badge[id] = t;
  });
  const R = { giocabili, adj, arm, mio: new Set(), cap: null, sel: null, t: 1, pa: RK.pa, fatto: new Set(), confini: false, msg: '', log: [], fine: false };
  S.stat = () => R.cap ? `Turno ${R.t}/${RK.turni} · Punti azione ${R.pa}` : 'Scegli da dove partire';
  S.coda = null; S.blocca = false; svg.parentElement.classList.add('interattivo'); sulClic = null;
  const nome_ = id => per[id].nome;
  const compMax = () => {   // numero di territori collegati tra loro (il blocco più grande)
    const vis = new Set(); let max = 0;
    R.mio.forEach(s => { if (vis.has(s)) return; let n = 0; const st = [s]; vis.add(s);
      while (st.length) { const x = st.pop(); n++; adj[x].forEach(y => { if (R.mio.has(y) && !vis.has(y)) { vis.add(y); st.push(y); } }); }
      max = Math.max(max, n); });
    return max;
  };
  const nPop = () => RK.popolo.filter(x => R.fatto.has(x[0])).length, nGov = () => RK.governo.filter(x => R.fatto.has(x[0])).length;
  const governabili = () => 2 + nPop() + nGov();
  const disegna = () => {
    giocabili.forEach(id => {
      statoClasse(id, 'mio', R.mio.has(id)); statoClasse(id, 'capitale', id === R.cap); statoClasse(id, 'scelto', id === R.sel);
      statoClasse(id, 'bersaglio', !!R.sel && !R.mio.has(id) && adj[R.sel].includes(id));
      badge[id].textContent = arm[id];
      badge[id].parentNode.classList.toggle('mia', R.mio.has(id));
    });
    aggiornaStat(); $('barraProg').style.width = `${100 * (R.t - 1) / RK.turni}%`;
    if (!R.cap) return;
    const barra = (ico, tit, n, tot, sub) => `<div class="pilastro ${n >= tot ? 'ok' : ''}"><b>${ico} ${tit}</b><div class="pil-b"><i style="width:${100 * n / tot}%"></i></div><small>${sub}</small></div>`;
    const terr = compMax();
    const instab = R.mio.size > governabili();
    const btn = (key, tit, desc) => {
      const fatto = R.fatto.has(key), manca = RK.req[key] && !R.fatto.has(RK.req[key]);
      return `<button class="az ${fatto ? 'fatto' : ''}" data-k="${key}" ${fatto || manca || R.pa < 1 ? 'disabled' : ''}><b>${fatto ? '✅' : '▫️'} ${tit}</b><small>${manca ? 'Prima serve: ' + RK.governo.find(x => x[0] === RK.req[key])[1] : desc}</small></button>`;
    };
    const pronto = R.confini && nPop() === RK.popolo.length && nGov() === RK.governo.length;
    $('pannello').innerHTML = `
      <div class="pilastri">
        ${barra('🗺️', 'Territorio', Math.min(terr, 5), 5, R.confini ? 'Confini fissati ✅' : `${terr}/5 territori collegati`)}
        ${barra('👥', 'Popolo', nPop(), RK.popolo.length, `${nPop()}/${RK.popolo.length} elementi`)}
        ${barra('🏛️', 'Governo', nGov(), RK.governo.length, `${nGov()}/${RK.governo.length} istituzioni`)}
      </div>
      <p class="rk-stab ${instab ? 'ko' : ''}">Territori posseduti: <b>${R.mio.size}</b> · Quanti riesci a governare: <b>${governabili()}</b> ${instab ? '⚠️ Troppi! A fine turno uno si stacca.' : ''}</p>
      <div class="msg ${R.msg.cls || ''}">${R.msg.t || ''}</div>
      <p class="rk-tit">⚔️ Mappa: tocca un tuo territorio (blu) e poi uno confinante (arancione) per attaccare. Ogni clic è un lancio di dadi.</p>
      <div class="azioni-riga">
        <button class="secondario" id="rkRinforza" ${R.sel && R.pa >= 1 ? '' : 'disabled'}>➕ Rinforza (+3 armate, 1 PA)</button>
        <button class="secondario" id="rkConfini" ${terr >= 5 && !R.confini && R.pa >= 1 ? '' : 'disabled'}>📍 Fissa i confini (1 PA)</button>
      </div>
      <p class="rk-tit">👥 Popolo</p><div class="az-griglia">${RK.popolo.map(x => btn(...x)).join('')}</div>
      <p class="rk-tit">🏛️ Governo</p><div class="az-griglia">${RK.governo.map(x => btn(...x)).join('')}</div>
      <div class="azioni-riga">
        <button class="primario" id="rkRico" ${pronto && R.pa >= 1 ? '' : 'disabled'}>🌍 Chiedi il riconoscimento (1 PA)</button>
        <button class="secondario" id="rkFine">Fine turno →</button>
      </div>`;
    $('pannello').querySelectorAll('.az').forEach(b => b.onclick = () => { R.pa--; R.fatto.add(b.dataset.k); const x = [...RK.popolo, ...RK.governo].find(y => y[0] === b.dataset.k); msg(`<b>${x[1]}.</b> ${x[2]}`, 'ok'); });
    $('rkRinforza').onclick = () => { R.pa--; arm[R.sel] += 3; msg(`+3 armate in ${nome_(R.sel)}.`); };
    $('rkConfini').onclick = () => { R.pa--; R.confini = true; msg('<b>Confini fissati.</b> Un territorio ha confini definiti: dentro vale il tuo governo, fuori quello degli altri.', 'ok'); };
    $('rkRico').onclick = () => { R.pa--; vittoria(); };
    $('rkFine').onclick = fineTurno;
  };
  const msg = (t, cls) => { R.msg = { t, cls }; disegna(); };
  const dado = () => 1 + (Math.random() * 6 | 0);
  const attacca = (da, a) => {
    const na = Math.min(3, arm[da] - 1), nd = Math.min(2, arm[a]);
    const A = Array.from({ length: na }, dado).sort((x, y) => y - x), D = Array.from({ length: nd }, dado).sort((x, y) => y - x);
    let pa = 0, pd = 0; for (let i = 0; i < Math.min(na, nd); i++) { if (A[i] > D[i]) pd++; else pa++; }
    arm[da] -= pa; arm[a] -= pd;
    let t = `🎲 ${nome_(da)} ${A.join(' ')} contro ${nome_(a)} ${D.join(' ')}: `;
    if (arm[a] <= 0) {
      const mv = Math.max(na, Math.min(3, arm[da] - 1)); arm[da] -= mv; arm[a] = mv; R.mio.add(a);
      t += `<b>conquistato ${nome_(a)}!</b> ${R.mio.size > governabili() ? 'Attenzione: ora hai più territori di quelli che riesci a governare.' : ''}`;
      return msg(t, 'ok');
    }
    msg(t + `perdi ${pa}, loro perdono ${pd}.`);
  };
  sulClic = id => {
    if (R.fine) return;
    if (!R.cap) {
      R.cap = id; R.mio.add(id); arm[id] = 4; R.sel = id;
      $('domanda').innerHTML = `Costruisci il tuo Stato<small>Tre pilastri: <b>territorio</b>, <b>popolo</b>, <b>governo</b>. Poi gli altri Stati devono riconoscerti. Hai ${RK.turni} turni.</small>`;
      return msg(`Sei partito da <b>${nome_(id)}</b>: è la tua capitale e non si staccherà mai. Per cominciare puoi attaccare un vicino, ma ricorda che conquistare non basta per essere uno Stato.`);
    }
    if (R.mio.has(id)) { R.sel = id; return msg(`Selezionato: ${nome_(id)} (${arm[id]} armate).`); }
    if (!R.sel) return msg('Prima tocca un tuo territorio blu.', 'ko');
    if (!adj[R.sel].includes(id)) return msg(`${nome_(id)} non confina con ${nome_(R.sel)}: si attacca solo dai confini.`, 'ko');
    if (arm[R.sel] < 2) return msg('Servono almeno 2 armate per attaccare: rinforza!', 'ko');
    attacca(R.sel, id);
  };
  const fineTurno = () => {
    let t = '';
    arm[R.cap] += 1 + (R.fatto.has('esercito') ? 2 : 0);
    if (R.mio.size > governabili()) {
      const c = [...R.mio].filter(x => x !== R.cap).sort((a, b) => arm[a] - arm[b])[0];
      if (c) { R.mio.delete(c); arm[c] = 2; if (R.sel === c) R.sel = R.cap; t = `<b>${nome_(c)} si è staccato!</b> Avevi più territorio di quanto riuscissi a governare: senza popolo che si riconosce in te e senza istituzioni, la forza non basta a tenerlo.`; }
    }
    if (R.confini && compMax() < 5) { R.confini = false; t += ' I confini non sono più validi: il territorio è cambiato.'; }
    R.t++;
    if (R.t > RK.turni) return sconfitta();
    R.pa = RK.pa + (R.fatto.has('tasse') ? 1 : 0);
    msg(t || `Turno ${R.t}.`, t ? 'ko' : '');
  };
  const fineSchermata = (vinto, titolo, corpo) => {
    R.fine = true; clearInterval(timer);
    const rec = mp.get('rec_risiko', null), turni = R.t;
    if (vinto && (rec === null || turni < rec)) mp.set('rec_risiko', turni);
    $('fine').innerHTML = `<div class="card-fine"><h1>${vinto ? '🏆' : '🌫️'} ${titolo}</h1>${corpo}
      <div class="lista"><b>Che cos'è uno Stato?</b><ul>
        <li>🗺️ <b>Territorio</b> con confini definiti</li><li>👥 <b>Popolo</b>: una popolazione stabile che si riconosce in una comunità</li>
        <li>🏛️ <b>Governo</b> sovrano, con leggi, tribunali e forza legittima</li><li>🌍 <b>Riconoscimento</b>: la capacità di avere relazioni con gli altri Stati</li></ul>
        <small>Sono i criteri della Convenzione di Montevideo (1933), usati ancora oggi nel diritto internazionale.</small></div>
      <div class="azioni"><button class="primario" id="ancora">Rigioca</button><button class="secondario" id="menu">Menu</button></div></div>`;
    mostra('fine'); $('ancora').onclick = () => avvia('risiko'); $('menu').onclick = esciMenu;
  };
  const vittoria = () => fineSchermata(true, 'Sei uno Stato!', `<p>In <b>${R.t}</b> turni hai riunito territorio (${R.mio.size} territori), popolo e governo, e ti hanno riconosciuto. ${R.mio.size < 6 ? 'Nota: ti sono bastati pochi territori. Grande non vuol dire più Stato: lo dimostrano Lussemburgo, Malta o San Marino.' : ''}</p>`);
  const sconfitta = () => {
    const m = []; if (!R.confini) m.push('confini non fissati'); if (nPop() < 4) m.push('popolo incompleto'); if (nGov() < 5) m.push('governo incompleto');
    fineSchermata(false, 'Tempo scaduto', `<p>Non sei riuscito a diventare uno Stato: ${m.join(', ') || 'manca il riconoscimento'}. Uno Stato non nasce solo con la forza: servono tutti gli elementi insieme.</p>`);
  };
  $('domanda').innerHTML = 'Costruisci il tuo Stato<small>Tocca un territorio per iniziare da lì: sarà la tua capitale.</small>';
  $('pannello').innerHTML = '<div class="msg">Ogni territorio ha un numero di armate (la difesa). I più grandi e popolosi sono più difficili da conquistare.</div>';
  aggiornaStat(); $('barraProg').style.width = '0%'; applicaVista();
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
  const sess = mp.get(kSess(), []);
  sess.push({ t: Date.now(), g: S.gioco, m: S.modo, l: S.liv, c: S.modo === 'fisico' ? S.cats : [], p: perc, n: tot, s: sec });
  mp.set(kSess(), sess.slice(-300));
  const msg = perc === 100 ? 'Perfetto! 🌟' : perc >= 80 ? 'Ottimo lavoro! 👏' : perc >= 60 ? 'Bene, ancora un po\' di ripasso.' : 'Continua ad allenarti: ce la farai!';
  const stelle = perc >= 90 ? 3 : perc >= 70 ? 2 : perc >= 40 ? 1 : 0;
  const err = [...new Set(S.errori)];
  const lista = err.length ? `<div class="lista"><b>Da ripassare:</b><ul>${err.map(k => `<li>${etichettaChiave(k)}</li>`).join('')}</ul></div>` : '';
  const base = [...new Set(err.map(baseId))];
  $('fine').innerHTML = `<div class="card-fine"><h1>${g.ico} ${g.nome}</h1><p class="nota">${SZ.nome} · Livello ${LIVELLI[S.liv - 1].nome} · tempo ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}</p>
    <div class="stelle">${'★'.repeat(stelle)}${'☆'.repeat(3 - stelle)}</div>
    <div class="voto">${pt}/${tot}</div><p><b>${perc}%</b> — ${msg}${nuovoRec && rec !== null ? ' Nuovo record! 🏆' : ''}</p>${lista}
    <div class="azioni"><button class="primario" id="ancora">Rigioca</button>
    ${base.length && !['coloraUE', 'coloraCont'].includes(S.gioco) ? '<button class="secondario" id="ripassa">Ripassa solo gli errori</button>' : ''}
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
  const st = mp.get(kStat(), {}), sess = mp.get(kSess(), []);
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
    <h1>📈 I miei progressi · ${SZ.nome}</h1>
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
    <p class="nota">I progressi sono salvati su questo dispositivo, nel profilo «${profilo}». Se cancelli i dati del browser si perdono. Qui vedi solo la sezione ${SZ.nome}.</p>
    <div class="azioni"><button class="secondario" id="copiaCsv">📋 Copia il riepilogo</button><button class="secondario" id="azzera">🗑️ Azzera i progressi di ${profilo} (${SZ.nome})</button></div>
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
      conferma = setTimeout(() => { conferma = null; $('azzera').textContent = `🗑️ Azzera i progressi di ${profilo} (${SZ.nome})`; }, 5000);
      return;
    }
    clearTimeout(conferma); mp.del(kStat()); mp.del(kSess());
    Object.keys(localStorage).filter(k => k.startsWith(`eg_p_${profilo}_${SZ.rec}`)).forEach(k => localStorage.removeItem(k));
    disegnaProgressi();
  };
}

// avvio: si carica l'ultima sezione usata (Mondo solo se i suoi dati sono disponibili)
impostaSezione(sezione).catch(() => impostaSezione('europa')).then(() => disegnaHome());
})();

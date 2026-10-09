// Suoni di gioco sintetizzati con la Web Audio API (nessun file audio).
// Volume basso, attivi solo dopo il primo gesto dell'utente (richiesto dai browser).
(function () {
  let ctx = null, serie = 0;
  const VOL = 0.14;
  const attivi = () => { try { return localStorage.getItem('eg_suoni') !== '0'; } catch (e) { return true; } };
  const audio = () => {
    if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; ctx = new AC(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };
  // una nota: frequenza, inizio (s), durata (s), forma d'onda, volume relativo
  const nota = (c, f, t0, d, tipo = 'sine', v = 1) => {
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = tipo; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(VOL * v, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + d + 0.02);
  };
  // glissando: da f1 a f2 in d secondi
  const scivola = (c, f1, f2, t0, d, tipo = 'sine', v = 1) => {
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = tipo; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(VOL * v, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + d + 0.02);
  };
  // soffio di vento: rumore filtrato che sale e scende
  const vento = (c, t0, d, v = 1) => {
    const n = Math.floor(c.sampleRate * d), buf = c.createBuffer(1, n, c.sampleRate), x = buf.getChannelData(0);
    for (let i = 0; i < n; i++) x[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), t = c.currentTime + t0;
    src.buffer = buf; f.type = 'bandpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(1100, t + d * 0.5); f.frequency.exponentialRampToValueAtTime(500, t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(VOL * 1.6 * v, t + d * 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    src.connect(f); f.connect(g); g.connect(c.destination); src.start(t);
  };
  const hz = n => 440 * Math.pow(2, n / 12); // n = semitoni da La4
  // suoni per categoria, quando si tocca un elemento sulla mappa (studio)
  const CAT = {
    mari(c) { scivola(c, 700, 260, 0, 0.28); scivola(c, 520, 200, 0.12, 0.3, 'sine', 0.7); },
    stretti(c) { scivola(c, 900, 500, 0, 0.12); scivola(c, 500, 900, 0.1, 0.14, 'sine', 0.8); },
    fiumi(c) { scivola(c, 800, 420, 0, 0.1); scivola(c, 950, 500, 0.09, 0.1, 'sine', 0.8); scivola(c, 760, 380, 0.18, 0.12, 'sine', 0.7); },
    laghi(c) { scivola(c, 1100, 520, 0, 0.18); nota(c, 1560, 0.1, 0.2, 'sine', 0.35); },
    monti(c) { nota(c, 98, 0, 0.45, 'triangle', 1.4); nota(c, 147, 0.02, 0.4, 'sine', 0.7); },
    vette(c) { nota(c, 196, 0, 0.3, 'triangle', 1.1); nota(c, 294, 0.1, 0.34, 'triangle', 0.9); nota(c, 392, 0.2, 0.4, 'sine', 0.8); },
    pianure(c) { nota(c, hz(-9), 0, 0.5, 'sine', 0.9); nota(c, hz(-5), 0.05, 0.5, 'sine', 0.7); nota(c, hz(-2), 0.1, 0.5, 'sine', 0.6); },
    penisole(c) { nota(c, hz(0), 0, 0.2, 'triangle', 0.9); nota(c, hz(4), 0.12, 0.3, 'triangle', 0.8); },
    isole(c) { nota(c, hz(7), 0, 0.22, 'sine', 0.9); nota(c, hz(12), 0.1, 0.22, 'sine', 0.8); nota(c, hz(16), 0.2, 0.3, 'sine', 0.7); },
    deserti(c) { vento(c, 0, 0.7); },
  };
  const SUONI = {
    ok(c) { const s = Math.min(serie - 1, 6) * 2; nota(c, hz(3 + s), 0, 0.16); nota(c, hz(10 + s), 0.09, 0.28, 'sine', 0.9); },
    trovato(c) { nota(c, hz(3), 0, 0.14, 'triangle'); nota(c, hz(7), 0.08, 0.22, 'triangle', 0.8); },
    ritenta(c) { nota(c, hz(-2), 0, 0.2, 'triangle', 0.9); },
    ko(c) { nota(c, hz(-5), 0, 0.22, 'triangle'); nota(c, hz(-10), 0.13, 0.34, 'triangle', 0.9); },
    fine(c, perc) {
      if (perc >= 80) [0, 4, 7, 12].forEach((n, i) => nota(c, hz(3 + n), i * 0.11, i === 3 ? 0.55 : 0.18, 'triangle', i === 3 ? 1.1 : 0.9));
      else [0, 4, 7].forEach((n, i) => nota(c, hz(-2 + n), i * 0.14, i === 2 ? 0.45 : 0.2, 'sine', 0.8));
    },
    cat(c, id) { (CAT[id] || SUONI.tic)(c); },
    tic(c) { nota(c, hz(12), 0, 0.06, 'sine', 0.6); },
  };
  window.suoniAttivi = attivi;
  window.suonoImposta = on => { try { localStorage.setItem('eg_suoni', on ? '1' : '0'); } catch (e) {} if (on) window.suono('tic'); };
  window.suonoSerie = () => { serie = 0; };
  window.suono = (nome, arg) => {
    if (nome === 'ok') serie++; else if (nome === 'ko' || nome === 'ritenta') serie = 0;
    if (!attivi() || !SUONI[nome]) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches && nome === 'tic') return;
    try { const c = audio(); if (c) SUONI[nome](c, arg); } catch (e) {}
  };
})();

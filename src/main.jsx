import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const EXERCISE = {
  id: 'first-groove', title: 'First Groove', bpm: 92, bars: 2,
  description: 'Kick sur les temps 1 et 3 — garde le groove, laisse respirer le reste.',
  targets: [{ beat: 0, pad: 0 }, { beat: 2, pad: 0 }, { beat: 4, pad: 0 }, { beat: 6, pad: 0 }]
};
const pads = ['KICK', 'SNARE', 'CHH', 'OHH', 'PERC 1', 'PERC 2', 'SAMPLE', 'FX'];
const midiPadMap = { 36: 0, 38: 1, 42: 2, 46: 3, 39: 4, 45: 5, 48: 6, 49: 7 };

function App() {
  const [midi, setMidi] = useState('Non connecté'); const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(0); const [events, setEvents] = useState([]); const [score, setScore] = useState({ perfect: 0, good: 0, miss: 0 });
  const startRef = useRef(0); const timerRef = useRef(); const audioRef = useRef();

  useEffect(() => () => clearInterval(timerRef.current), []);
  async function connectMidi() {
    if (!navigator.requestMIDIAccess) return setMidi('Navigateur incompatible — Chrome conseillé');
    const access = await navigator.requestMIDIAccess(); const inputs = [...access.inputs.values()];
    if (!inputs.length) return setMidi('KO II introuvable — branche-le en USB');
    inputs.forEach(input => { input.onmidimessage = onMidi; }); setMidi(inputs.map(i => i.name || 'Entrée MIDI').join(' + '));
  }
  function onMidi({ data, timeStamp }) { if ((data[0] & 0xf0) !== 0x90 || data[2] === 0) return; const pad = midiPadMap[data[1]] ?? (data[1] % 8); registerHit(pad, timeStamp || performance.now(), data[2]); }
  function registerHit(pad, timestamp = performance.now(), velocity = 100) {
    const nowBeat = running ? (timestamp - startRef.current) / (60000 / EXERCISE.bpm) : beat;
    const nearest = EXERCISE.targets.filter(t => t.pad === pad).map(t => Math.abs(t.beat - nowBeat)).sort((a,b) => a-b)[0];
    const ms = nearest == null ? 999 : nearest * 60000 / EXERCISE.bpm; const grade = ms <= 20 ? 'PERFECT' : ms <= 50 ? 'GOOD' : 'MISS';
    setEvents(e => [{ pad, velocity, grade, id: crypto.randomUUID() }, ...e].slice(0, 6)); setScore(s => ({ ...s, [grade.toLowerCase()]: s[grade.toLowerCase()] + 1 }));
  }
  function toggle() { if (running) { clearInterval(timerRef.current); setRunning(false); return; } startRef.current = performance.now(); setBeat(0); setEvents([]); setScore({ perfect: 0, good: 0, miss: 0 }); setRunning(true); timerRef.current = setInterval(() => setBeat(b => (b + .05) % (EXERCISE.bars * 4)), 30); }
  return <main><header><div><span className="eyebrow">EP–133 K.O. II / TRAINING SYSTEM</span><h1>PAD<span>HERO</span></h1><p>{EXERCISE.description}</p></div><button className="connect" onClick={connectMidi}>◎ {midi}</button></header>
    <section className="hud"><div><small>EXERCICE</small><strong>{EXERCISE.title}</strong></div><div><small>BPM</small><strong>{EXERCISE.bpm}</strong></div><div><small>PERFECT</small><strong className="green">{score.perfect}</strong></div><div><small>GOOD</small><strong className="yellow">{score.good}</strong></div><div><small>MISS</small><strong className="red">{score.miss}</strong></div><button onClick={toggle} className="start">{running ? 'STOP' : 'START SESSION'}</button></section>
    <section className="play"><div className="lane">{[0,1,2,3,4,5,6,7].map(i => <div className={`hit ${i === Math.floor(beat) % 8 ? 'active' : ''}`} key={i}><span>{i % 4 + 1}</span>{i % 2 === 0 && <b>●</b>}</div>)}</div><div className="target">HIT ZONE</div><div className="legend">{events.map(e => <span key={e.id} className={e.grade.toLowerCase()}>{pads[e.pad]} · {e.grade}</span>)}</div></section>
    <section className="pads">{pads.map((p,i) => <button key={p} onClick={() => registerHit(i)} className={i === 0 ? 'kick' : ''}><b>{String(i+1).padStart(2,'0')}</b>{p}<em>{i === 0 ? 'MIDI 36' : `PAD ${i+1}`}</em></button>)}</section>
    <footer><span>WEB MIDI READY</span><span>LOCAL TIMING ENGINE</span><span>EXERCISES / JSON</span></footer></main>;
}
createRoot(document.getElementById('root')).render(<App />);

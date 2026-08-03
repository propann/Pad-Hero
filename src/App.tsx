import { useCallback, useEffect, useRef, useState } from 'react';
import { useWebMidi, type MidiHit } from './core/midi/useWebMidi';
import { AudioEngine } from './core/audio/AudioEngine';
import { emptyScore, scoreHit } from './core/engine/scoring';
import type { Exercise, Grade, Score } from './core/engine/types';
import './style.css';
import exercise from '../public/exercises/first-groove.json';

const pads = ['KICK','SNARE','CHH','OHH','PERC 1','PERC 2','SAMPLE','FX','PAD 9','PAD 10','PAD 11','PAD 12'];
const audio = new AudioEngine();
export default function App() {
  const [running,setRunning]=useState(false), [songTime,setSongTime]=useState(0), [score,setScore]=useState<Score>(emptyScore()), [last,setLast]=useState<{grade:Grade,deltaMs:number}|null>(null);
  const targets = useRef((exercise as Exercise).targets.map((t,i)=>({...t,id:`target-${i}`}))); const frame=useRef<number | undefined>(undefined);
  const onHit = useCallback((hit: MidiHit) => { if (!running) return; const result=scoreHit(exercise as Exercise,hit,(audio.time*1000)/(60000/(exercise.bpm)),targets.current,score); setScore(result.score); setLast({grade:result.grade,deltaMs:result.deltaMs}); },[running,score]);
  const midi=useWebMidi(onHit);
  useEffect(()=>{ if(!running)return; const tick=()=>{setSongTime(audio.time);frame.current=requestAnimationFrame(tick)};frame.current=requestAnimationFrame(tick);return()=>{if(frame.current!==undefined) cancelAnimationFrame(frame.current)}},[running]);
  const toggle=async()=>{ if(running){audio.stop();setRunning(false);return} targets.current=(exercise as Exercise).targets.map((t,i)=>({...t,id:`target-${i}`}));setScore(emptyScore());setLast(null);await audio.start();setRunning(true); };
  const virtualHit=(pad:number)=>onHit({pad,velocity:100,timestamp:performance.now()});
  return <main><header><div><span className="eyebrow">EP–133 K.O. II / TRAINING SYSTEM</span><h1>PAD<span>HERO</span></h1><p>{exercise.description}</p></div><button className="connect" onClick={midi.connect}>◎ {midi.status}</button></header><section className="hud"><div><small>EXERCICE</small><strong>{exercise.title}</strong></div><div><small>BPM</small><strong>{exercise.bpm}</strong></div><div><small>PERFECT</small><strong className="green">{score.perfect}</strong></div><div><small>GOOD</small><strong className="yellow">{score.good}</strong></div><div><small>MISS</small><strong className="red">{score.miss}</strong></div><button onClick={toggle} className="start">{running?'STOP':'START SESSION'}</button></section><section className="play"><div className="lane">{Array.from({length:8},(_,i)=><div className={`hit ${i===Math.floor(songTime*exercise.bpm/60)%8?'active':''}`} key={i}><span>{i%4+1}</span><b>●</b></div>)}</div><div className="target">HIT ZONE {last&&<strong className={last.grade.toLowerCase()}>{last.grade} {Number.isFinite(last.deltaMs)?`${last.deltaMs>0?'+':''}${last.deltaMs.toFixed(0)} ms`:''}</strong>}</div></section><section className="pads">{pads.map((p,i)=><button key={p} onClick={()=>virtualHit(i)} className={i===0?'kick':''}><b>{String(i+1).padStart(2,'0')}</b>{p}<em>MIDI {Object.entries({36:0,38:1,42:2,46:3,39:4,45:5,48:6,49:7}).find(([,v])=>v===i)?.[0]||`PAD ${i+1}`}</em></button>)}</section><footer><span>WEB MIDI READY</span><span>TONE.JS CLOCK {running?'RUNNING':'IDLE'}</span><span>EXERCISES / JSON</span></footer></main>;
}

import { useCallback, useEffect, useState } from 'react';
export interface MidiHit { pad: number; velocity: number; timestamp: number; }
export const KO2_MIDI_MAP: Record<number, number> = { 36: 0, 38: 1, 42: 2, 46: 3, 39: 4, 45: 5, 48: 6, 49: 7, 51: 8, 53: 9, 56: 10, 57: 11 };
export function useWebMidi(onPadHit: (hit: MidiHit) => void) {
  const [status, setStatus] = useState('Non connecté');
  const connect = useCallback(async () => {
    if (!navigator.requestMIDIAccess) { setStatus('WebMIDI indisponible — Chrome conseillé'); return; }
    try {
      const access = await navigator.requestMIDIAccess();
      const inputs = [...access.inputs.values()];
      if (!inputs.length) { setStatus('KO II introuvable — branche-le en USB'); return; }
      const handler = (event: MIDIMessageEvent) => { const d = event.data; if (!d || (d[0] & 0xf0) !== 0x90 || d[2] === 0) return; onPadHit({ pad: KO2_MIDI_MAP[d[1]] ?? d[1] % 12, velocity: d[2], timestamp: event.timeStamp || performance.now() }); };
      inputs.forEach(input => { input.onmidimessage = handler; });
      setStatus(inputs.map(i => i.name || 'Entrée MIDI').join(' + '));
    } catch { setStatus('Autorisation MIDI refusée'); }
  }, [onPadHit]);
  useEffect(() => () => {}, []);
  return { status, connect };
}

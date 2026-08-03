import * as Tone from 'tone';
export class AudioEngine {
  get time() { return Tone.Transport.seconds; }
  get running() { return Tone.Transport.state === 'started'; }
  async start() { await Tone.start(); Tone.Transport.start(); }
  stop() { Tone.Transport.stop(); Tone.Transport.seconds = 0; }
  async loadBackingTrack(url: string) { await Tone.loaded(); return new Tone.Player(url).toDestination(); }
}

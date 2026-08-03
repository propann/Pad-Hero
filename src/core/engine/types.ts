export type Grade = 'PERFECT' | 'GOOD' | 'MISS';
export interface Target { id: string; beat: number; pad: number; hit?: boolean; }
export interface Grading { perfectMs: number; goodMs: number; }
export interface Exercise { id: string; title: string; bpm: number; bars: number; description: string; backingTrack?: string | null; targets: Target[]; grading: Grading; }
export interface PadHit { pad: number; velocity: number; timestamp: number; }
export interface Score { perfect: number; good: number; miss: number; combo: number; maxCombo: number; }

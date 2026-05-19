type SoundType = 'shuffle' | 'flip' | 'reveal' | 'ambient';

let audioCtx: AudioContext | null = null;
let ambientSource: AudioBufferSourceNode | null = null;
let ambientGain: GainNode | null = null;
let muted = false;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function createOscillatorNote(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  startTime = 0,
  volume = 0.15
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}

function playNoise(ctx: AudioContext, duration: number, volume = 0.05) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 2000;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + duration);
}

export function playSound(type: SoundType) {
  if (muted) return;
  const ctx = getCtx();

  switch (type) {
    case 'shuffle': {
      for (let i = 0; i < 5; i++) {
        playNoise(ctx, 0.08, 0.04);
        setTimeout(() => playNoise(ctx, 0.06, 0.03), i * 80);
      }
      createOscillatorNote(ctx, 220, 0.3, 'triangle', 0, 0.06);
      createOscillatorNote(ctx, 330, 0.2, 'triangle', 0.15, 0.04);
      break;
    }
    case 'flip': {
      createOscillatorNote(ctx, 523, 0.15, 'sine', 0, 0.12);
      createOscillatorNote(ctx, 659, 0.12, 'sine', 0.08, 0.1);
      createOscillatorNote(ctx, 784, 0.2, 'sine', 0.14, 0.08);
      break;
    }
    case 'reveal': {
      const notes = [392, 494, 587, 784];
      notes.forEach((freq, i) => {
        createOscillatorNote(ctx, freq, 0.4, 'sine', i * 0.12, 0.1);
      });
      break;
    }
    case 'ambient':
      startAmbient();
      break;
  }
}

function startAmbient() {
  if (ambientSource) return;
  const ctx = getCtx();

  const duration = 4;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      data[i] =
        Math.sin(2 * Math.PI * 60 * t) * 0.02 +
        Math.sin(2 * Math.PI * 90 * t) * 0.015 +
        Math.sin(2 * Math.PI * 120 * t + ch) * 0.01 +
        (Math.random() * 2 - 1) * 0.003;
    }
  }

  ambientSource = ctx.createBufferSource();
  ambientSource.buffer = buffer;
  ambientSource.loop = true;

  ambientGain = ctx.createGain();
  ambientGain.gain.value = 0.3;

  ambientSource.connect(ambientGain);
  ambientGain.connect(ctx.destination);
  ambientSource.start();
}

export function stopAmbient() {
  if (ambientSource) {
    ambientSource.stop();
    ambientSource.disconnect();
    ambientSource = null;
  }
  if (ambientGain) {
    ambientGain.disconnect();
    ambientGain = null;
  }
}

export function setMuted(value: boolean) {
  muted = value;
  if (value) {
    stopAmbient();
  }
}

export function isMuted(): boolean {
  return muted;
}

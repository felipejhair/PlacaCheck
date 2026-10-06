/**
 * Baby Phone Sound Engine
 * Synthesizes keypad tones, phone ringing, and iconic "Animal Crossing" (Animalese) voices
 * using Web Audio API. Zero external audio files required!
 */

class BabySoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentSpeechStop: (() => void) | null = null;

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopSpeech();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play musical keypad tone (cute xylophone / marimba synth)
   */
  public playKeyTone(key: string) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // Note frequency map (Major pentatonic / cheerful scale)
      const noteMap: Record<string, number> = {
        "1": 261.63, // C4
        "2": 293.66, // D4
        "3": 329.63, // E4
        "4": 349.23, // F4
        "5": 392.00, // G4
        "6": 440.00, // A4
        "7": 493.88, // B4
        "8": 523.25, // C5
        "9": 587.33, // D5
        "0": 659.25, // E5
        "*": 698.46, // F5
        "#": 783.99, // G5
      };

      const freq = noteMap[key] || 440;

      // Primary tone (warm triangle)
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Bright harmonic overtone
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Gain Envelope
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.36);
      osc2.stop(now + 0.22);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Play telephone ringing sound ("Riiing... riiing!")
   */
  public playRinging(durationSeconds: number = 2.0): Promise<void> {
    if (this.isMuted) return new Promise((res) => setTimeout(res, durationSeconds * 1000));

    return new Promise((resolve) => {
      try {
        const ctx = this.getAudioContext();
        const now = ctx.currentTime;

        const makeRingBurst = (startTime: number, len: number) => {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          // Standard cheerful cartoon ring frequencies
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(480, startTime);
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(520, startTime);

          // Fast tremolo modulation
          const tremolo = ctx.createOscillator();
          const tremoloGain = ctx.createGain();
          tremolo.frequency.setValueAtTime(20, startTime);
          tremoloGain.gain.setValueAtTime(0.1, startTime);
          tremolo.connect(tremoloGain.gain);

          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
          gain.gain.setValueAtTime(0.2, startTime + len - 0.05);
          gain.gain.linearRampToValueAtTime(0, startTime + len);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(startTime);
          osc2.start(startTime);
          osc1.stop(startTime + len);
          osc2.stop(startTime + len);
        };

        // Ring 1
        makeRingBurst(now + 0.1, 0.8);
        // Ring 2
        makeRingBurst(now + 1.2, 0.7);

        setTimeout(() => {
          resolve();
        }, durationSeconds * 1000);
      } catch {
        setTimeout(resolve, durationSeconds * 1000);
      }
    });
  }

  /**
   * Play call connected sound (cheerful pick-up chirp)
   */
  public playConnectChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.06;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.26);
      });
    } catch {}
  }

  /**
   * Play hang up tone
   */
  public playHangup() {
    this.stopSpeech();
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      [659.25, 523.25, 392.0].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.08;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.16);
      });
    } catch {}
  }

  /**
   * Play playful giggle/bubble pop sound for screen touches
   */
  public playPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const startFreq = 400 + Math.random() * 300;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.09);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }

  /**
   * Play happy giggle chime when baby taps the animal
   */
  public playGiggle() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.05;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.22, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.19);
      });
    } catch {}
  }

  /**
   * Stop current speech synthesis
   */
  public stopSpeech() {
    if (this.currentSpeechStop) {
      this.currentSpeechStop();
      this.currentSpeechStop = null;
    }
  }

  /**
   * True Animal Crossing (Animalese) Voice Synthesizer!
   * Maps phonemes/letters to rapid pitch-modulated chirps with resonant bandpass formant filters.
   */
  public playAnimalese(
    text: string,
    options: {
      pitchMultiplier?: number; // e.g. 0.8 (deep lion/bear) to 1.6 (high kitten/bird)
      speedMultiplier?: number; // letter duration in ms
      vibrato?: number;
      timbre?: "sawtooth" | "triangle" | "square";
    } = {},
    callbacks?: {
      onChar?: (char: string, index: number, isSpeaking: boolean) => void;
      onComplete?: () => void;
    }
  ) {
    this.stopSpeech();

    let isStopped = false;
    let timeoutId: NodeJS.Timeout | null = null;

    this.currentSpeechStop = () => {
      isStopped = true;
      if (timeoutId) clearTimeout(timeoutId);
      callbacks?.onChar?.("", text.length, false);
    };

    if (this.isMuted) {
      // Still animate text if muted
      let i = 0;
      const step = () => {
        if (isStopped || i >= text.length) {
          callbacks?.onComplete?.();
          return;
        }
        callbacks?.onChar?.(text[i], i, true);
        i++;
        timeoutId = setTimeout(step, 45);
      };
      step();
      return;
    }

    try {
      const ctx = this.getAudioContext();
      const pitch = options.pitchMultiplier || 1.1;
      const timbre = options.timbre || "triangle";
      const letterDuration = options.speedMultiplier || 68; // ms per syllable

      // Phonetic vowel formants (Hz)
      const vowelFreqs: Record<string, number> = {
        a: 420 * pitch,
        á: 420 * pitch,
        e: 360 * pitch,
        é: 360 * pitch,
        i: 300 * pitch,
        í: 300 * pitch,
        o: 480 * pitch,
        ó: 480 * pitch,
        u: 340 * pitch,
        ú: 340 * pitch,
      };

      let charIndex = 0;

      const speakNextChar = () => {
        if (isStopped) return;

        if (charIndex >= text.length) {
          callbacks?.onChar?.("", charIndex, false);
          callbacks?.onComplete?.();
          this.currentSpeechStop = null;
          return;
        }

        const char = text[charIndex];
        const lower = char.toLowerCase();

        // Inform caller of current char and mouth open
        const isLetter = /[a-záéíóúñ]/i.test(char);
        callbacks?.onChar?.(char, charIndex, isLetter);

        if (char === " " || char === "," || char === "." || char === "!" || char === "¿" || char === "¡" || char === "?") {
          // Pause on punctuation
          const pause = char === " " ? 40 : 130;
          charIndex++;
          timeoutId = setTimeout(speakNextChar, pause);
          return;
        }

        // Synthesize chirp
        const now = ctx.currentTime;
        const baseFreq = vowelFreqs[lower] || ((lower.charCodeAt(0) * 4.5) % 250 + 260) * pitch;

        // Slight micro-pitch modulation like Animal Crossing
        const pitchJitter = (Math.random() - 0.5) * 35;
        const finalFreq = Math.max(120, Math.min(1800, baseFreq + pitchJitter));

        const osc = ctx.createOscillator();
        osc.type = timbre;
        osc.frequency.setValueAtTime(finalFreq, now);
        // Slight frequency scoop (signature Animal Crossing inflection)
        osc.frequency.exponentialRampToValueAtTime(finalFreq * (1 + (Math.random() * 0.15 - 0.05)), now + 0.05);

        // Resonant formant bandpass filter (simulates mouth cavity)
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(finalFreq * 1.6, now);
        filter.Q.setValueAtTime(3.5, now);

        // Fast snappy envelope
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.24, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.065);

        charIndex++;
        timeoutId = setTimeout(speakNextChar, letterDuration);
      };

      speakNextChar();
    } catch {
      callbacks?.onComplete?.();
    }
  }
}

export const babySoundEngine = new BabySoundEngine();

/**
 * AudioManager.js — Generates and manages audio using Web Audio API
 * No external files needed - all sounds are synthesized
 */
class AudioManager {
    constructor() {
        this.ctx = null;
        this.musicVolume = 0.6;
        this.sfxVolume = 0.8;
        this.initialized = false;
        this.currentMusic = null;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not available');
        }
    }

    setMusicVolume(v) {
        this.musicVolume = v;
    }

    setSfxVolume(v) {
        this.sfxVolume = v;
    }

    /**
     * Play a synthesized sound effect
     */
    playSfx(type) {
        if (!this.initialized) this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        switch (type) {
            case 'click':
                this._playTone(800, 0.05, 'sine', this.sfxVolume * 0.3);
                break;
            case 'clue':
                this._playTone(523, 0.15, 'sine', this.sfxVolume * 0.4);
                setTimeout(() => this._playTone(659, 0.15, 'sine', this.sfxVolume * 0.4), 100);
                setTimeout(() => this._playTone(784, 0.2, 'sine', this.sfxVolume * 0.4), 200);
                break;
            case 'dialogue':
                this._playTone(300 + Math.random() * 200, 0.03, 'square', this.sfxVolume * 0.1);
                break;
            case 'reveal':
                this._playTone(440, 0.3, 'sine', this.sfxVolume * 0.3);
                setTimeout(() => this._playTone(880, 0.4, 'sine', this.sfxVolume * 0.3), 200);
                break;
            case 'error':
                this._playTone(200, 0.2, 'sawtooth', this.sfxVolume * 0.3);
                setTimeout(() => this._playTone(150, 0.3, 'sawtooth', this.sfxVolume * 0.3), 150);
                break;
            case 'success':
                [523, 659, 784, 1047].forEach((f, i) => {
                    setTimeout(() => this._playTone(f, 0.2, 'sine', this.sfxVolume * 0.3), i * 120);
                });
                break;
            case 'suspense':
                this._playTone(130, 0.8, 'sine', this.sfxVolume * 0.2);
                this._playTone(138, 0.8, 'sine', this.sfxVolume * 0.2);
                break;
            case 'page':
                this._playNoise(0.08, this.sfxVolume * 0.15);
                break;
        }
    }

    _playTone(freq, duration, type = 'sine', volume = 0.3) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    _playNoise(duration, volume) {
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
        }
        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();
        source.buffer = buffer;
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start();
    }

    /**
     * Start ambient background music (procedurally generated)
     */
    startAmbientMusic() {
        if (!this.initialized) this.init();
        if (!this.ctx || this.currentMusic) return;

        // Create a dark ambient pad
        const drone = this.ctx.createOscillator();
        const drone2 = this.ctx.createOscillator();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        const masterGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        drone.type = 'sine';
        drone.frequency.setValueAtTime(65, this.ctx.currentTime); // Low C
        drone2.type = 'sine';
        drone2.frequency.setValueAtTime(97.5, this.ctx.currentTime); // G below

        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(8, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, this.ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(drone.frequency);
        drone.connect(filter);
        drone2.connect(filter);
        filter.connect(masterGain);
        masterGain.gain.setValueAtTime(this.musicVolume * 0.08, this.ctx.currentTime);
        masterGain.connect(this.ctx.destination);

        drone.start();
        drone2.start();
        lfo.start();

        this.currentMusic = { drone, drone2, lfo, masterGain };
    }

    stopMusic() {
        if (this.currentMusic) {
            const { drone, drone2, lfo, masterGain } = this.currentMusic;
            const now = this.ctx.currentTime;
            masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1);
            setTimeout(() => {
                try { drone.stop(); drone2.stop(); lfo.stop(); } catch (e) {}
            }, 1100);
            this.currentMusic = null;
        }
    }
}

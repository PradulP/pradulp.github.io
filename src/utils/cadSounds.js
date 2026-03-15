
/**
 * Simple Web Audio API synthesizer for technical UI sounds.
 * No external files needed.
 */
class CadSoundSystem {
    constructor() {
        this.ctx = null;
        this.muted = typeof localStorage !== 'undefined' && localStorage.getItem('cad_muted') === 'true';
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('cad_muted', this.muted);
        // Dispatch event so any listener (Navbar, CadUIController) can update UI
        window.dispatchEvent(new CustomEvent('cadMuteChange', { detail: this.muted }));
        if (!this.muted) {
            // Play a confirmation blip when unmuting
            this.playBlip();
        }
        return this.muted;
    }

    isMuted() {
        return this.muted;
    }

    // A subtle mechanical click
    playClick() {
        // Audio disabled
        return;
    }

    // A digital high-tech blip
    playBlip() {
        // Audio disabled
        return;
    }

    // A blueprint paper shuffle sound (noise based)
    playSwoosh() {
        // Audio disabled
        return;
    }
}

export const cadSounds = new CadSoundSystem();

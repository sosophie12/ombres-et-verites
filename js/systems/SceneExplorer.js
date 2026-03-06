/**
 * SceneExplorer.js — Manages interactive hotspots in scenes
 */
class SceneExplorer extends Utils.EventEmitter {
    constructor(stateManager, dialogueSystem, sceneRenderer, audioManager) {
        super();
        this.state = stateManager;
        this.dialogue = dialogueSystem;
        this.renderer = sceneRenderer;
        this.audio = audioManager;
        this.hotspotsLayer = Utils.$('hotspots-layer');
        this.currentHotspots = [];
    }

    /**
     * Load a location and render its scene + hotspots
     */
    loadLocation(locationId) {
        const caseData = window.CASE_DATA;
        if (!caseData) return;

        const location = caseData.locations.find(l => l.id === locationId);
        if (!location) return;

        this.state.set('currentLocation', locationId);

        // Update top bar
        Utils.$('location-name').textContent = location.name;

        // Render scene
        this.renderer.renderScene(location.scene || locationId);

        // Load hotspots
        this._loadHotspots(location);

        this.emit('locationChanged', locationId);
    }

    _loadHotspots(location) {
        this.hotspotsLayer.innerHTML = '';
        this.hotspotsLayer.style.pointerEvents = 'auto';
        this.currentHotspots = [];

        if (!location.hotspots) return;

        location.hotspots.forEach(hs => {
            // Check if hotspot should be visible
            if (hs.condition && !this._checkCondition(hs.condition)) return;
            // Check if already found (for one-time clues)
            if (hs.oneTime && hs.clueId && this.state.hasClue(hs.clueId)) {
                // Show as already examined
                this._createHotspot(hs, true);
            } else {
                this._createHotspot(hs, false);
            }
        });
    }

    _createHotspot(hs, examined) {
        const el = Utils.createElement('div', `hotspot ${hs.type === 'person' ? 'hotspot-person' : ''} ${!examined ? 'hotspot-glow' : ''}`);

        el.style.left = hs.x + '%';
        el.style.top = hs.y + '%';
        el.style.width = hs.width + '%';
        el.style.height = hs.height + '%';

        if (examined) {
            el.style.opacity = '0.4';
        }

        const label = Utils.createElement('span', 'hotspot-label', hs.label || 'Examiner');
        el.appendChild(label);

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            this.audio.playSfx('click');
            this._onHotspotClick(hs);
        });

        // Touch support — prevent double-fire on mobile
        el.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.audio.playSfx('click');
            this._onHotspotClick(hs);
        }, { passive: false });

        this.hotspotsLayer.appendChild(el);
        this.currentHotspots.push({ data: hs, element: el });
    }

    _onHotspotClick(hs) {
        // If hotspot triggers a dialogue
        if (hs.dialogue) {
            this.dialogue.start(hs.dialogue, () => {
                this._afterInteraction(hs);
            });
            return;
        }

        // If hotspot gives a clue directly
        if (hs.clueId) {
            this.state.addClue(hs.clueId);
        }

        // If hotspot reveals a suspect
        if (hs.suspectId) {
            this.state.addSuspect(hs.suspectId);
        }

        // If hotspot unlocks a location
        if (hs.unlockLocation) {
            this.state.unlockLocation(hs.unlockLocation);
        }

        // If hotspot sets a flag
        if (hs.flag) {
            this.state.setFlag(hs.flag);
        }

        // If it has a simple examine text, show it as dialogue
        if (hs.examineText) {
            this.dialogue.start({
                nodes: [{
                    speaker: 'Vous',
                    portrait: '🕵️',
                    text: hs.examineText,
                    action: hs.clueId ? { addClue: hs.clueId } : null
                }]
            }, () => {
                this._afterInteraction(hs);
            });
            return;
        }

        this._afterInteraction(hs);
    }

    _afterInteraction(hs) {
        // Refresh hotspots to reflect state changes
        const location = window.CASE_DATA.locations.find(l => l.id === this.state.get('currentLocation'));
        if (location) {
            this._loadHotspots(location);
        }
    }

    _checkCondition(cond) {
        if (cond.hasClue) return this.state.hasClue(cond.hasClue);
        if (cond.hasFlag) return this.state.hasFlag(cond.hasFlag);
        if (cond.notFlag) return !this.state.hasFlag(cond.notFlag);
        if (cond.hasSuspect) return this.state.hasSuspect(cond.hasSuspect);
        return true;
    }

    /**
     * Refresh current scene
     */
    refresh() {
        const locId = this.state.get('currentLocation');
        if (locId) this.loadLocation(locId);
    }
}

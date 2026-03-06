/**
 * MapView.js — Location map for navigating between scenes
 */
class MapView {
    constructor(stateManager, sceneExplorer, audioManager) {
        this.state = stateManager;
        this.explorer = sceneExplorer;
        this.audio = audioManager;
        this.screen = Utils.$('map-screen');
        this.grid = Utils.$('locations-grid');
    }

    open() {
        this.screen.classList.add('active');
        this._render();
    }

    close() {
        this.screen.classList.remove('active');
    }

    _render() {
        this.grid.innerHTML = '';
        const caseData = window.CASE_DATA;
        if (!caseData) return;

        const currentLoc = this.state.get('currentLocation');

        caseData.locations.forEach(loc => {
            const unlocked = loc.unlocked || this.state.isLocationUnlocked(loc.id);
            const isCurrent = loc.id === currentLoc;

            const card = Utils.createElement('div', `location-card ${!unlocked ? 'locked' : ''} ${isCurrent ? 'current' : ''}`);
            card.innerHTML = `
                <span class="location-icon">${loc.icon}</span>
                <h4>${unlocked ? loc.name : '???'}</h4>
                <p>${unlocked ? loc.description : 'Lieu verrouillé'}</p>
                ${isCurrent ? '<p style="color:var(--accent);margin-top:4px;font-size:0.75rem;">📍 Vous êtes ici</p>' : ''}
            `;

            if (unlocked && !isCurrent) {
                card.addEventListener('click', () => {
                    this.audio.playSfx('click');
                    this.explorer.loadLocation(loc.id);
                    this.close();
                    this.state.addJournalEntry(`Déplacement vers : ${loc.name}`);
                });
            }

            this.grid.appendChild(card);
        });
    }
}

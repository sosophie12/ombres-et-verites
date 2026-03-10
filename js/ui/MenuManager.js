/**
 * MenuManager.js — Handles menu navigation and screen transitions
 */
class MenuManager {
    constructor(audioManager) {
        this.audio = audioManager;
        this.screens = {};
        this.currentScreen = 'main-menu';

        // Cache all screens
        document.querySelectorAll('.screen').forEach(el => {
            this.screens[el.id] = el;
        });

        this._setupMenuEvents();
    }

    _setupMenuEvents() {
        // Main menu
        Utils.$('btn-how-to').addEventListener('click', () => this.showScreen('howto-screen'));
        Utils.$('btn-settings').addEventListener('click', () => this.showScreen('settings-screen'));

        // Back buttons
        Utils.$('btn-back-howto').addEventListener('click', () => this.showScreen('main-menu'));
        Utils.$('btn-back-settings').addEventListener('click', () => this.showScreen('main-menu'));

        // Pause
        Utils.$('btn-resume').addEventListener('click', () => this.closeOverlay('pause-screen'));
        Utils.$('btn-quit-menu').addEventListener('click', () => {
            this.closeOverlay('pause-screen');
            this.showScreen('main-menu');
            Utils.hide('hud');
        });

        // Overlay closes
        Utils.$('btn-close-notebook').addEventListener('click', () => this.closeOverlay('notebook-screen'));
        Utils.$('btn-close-board').addEventListener('click', () => this.closeOverlay('board-screen'));
        Utils.$('btn-close-map').addEventListener('click', () => this.closeOverlay('map-screen'));
        Utils.$('btn-cancel-accusation').addEventListener('click', () => this.closeOverlay('accusation-screen'));

        // Add click sound to all buttons
        document.querySelectorAll('.btn, .icon-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.audio.playSfx('click');
            });
        });
    }

    showScreen(screenId) {
        // Hide ALL screens (including overlays)
        Object.values(this.screens).forEach(el => {
            el.classList.remove('active');
            el.classList.remove('fade-in');
        });

        // Show target
        const target = this.screens[screenId];
        if (target) {
            target.classList.add('active');
            target.classList.add('fade-in');
            this.currentScreen = screenId;
        }
    }

    showOverlay(screenId) {
        const target = this.screens[screenId];
        if (target) {
            target.classList.add('active');
            target.classList.add('fade-in');
        }
    }

    closeOverlay(screenId) {
        const target = this.screens[screenId];
        if (target) {
            target.classList.remove('active');
            target.classList.remove('fade-in');
        }
    }

    isOverlayOpen() {
        return ['notebook-screen', 'board-screen', 'map-screen', 'accusation-screen', 'pause-screen']
            .some(id => this.screens[id] && this.screens[id].classList.contains('active'));
    }
}

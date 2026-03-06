/**
 * SaveManager.js — Handles save/load using localStorage
 */
class SaveManager {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.SAVE_KEY = 'ombres_verites_save';
        this.SETTINGS_KEY = 'ombres_verites_settings';
    }

    hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    }

    save() {
        const data = this.stateManager.serialize();
        localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
        return true;
    }

    load() {
        const raw = localStorage.getItem(this.SAVE_KEY);
        if (!raw) return false;
        try {
            const data = JSON.parse(raw);
            this.stateManager.deserialize(data);
            return true;
        } catch (e) {
            console.error('Failed to load save:', e);
            return false;
        }
    }

    deleteSave() {
        localStorage.removeItem(this.SAVE_KEY);
    }

    saveSettings(settings) {
        localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    }

    loadSettings() {
        const raw = localStorage.getItem(this.SETTINGS_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }
}

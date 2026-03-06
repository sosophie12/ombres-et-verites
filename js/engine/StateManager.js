/**
 * StateManager.js — Manages global game state for the investigation
 */
class StateManager extends Utils.EventEmitter {
    constructor() {
        super();
        this.reset();
    }

    reset() {
        this.state = {
            currentScreen: 'main-menu',
            currentCase: null,
            currentLocation: null,
            cluesFound: [],          // Array of clue IDs
            suspectsRevealed: [],     // Array of suspect IDs
            dialogueFlags: {},       // Tracks dialogue choices & branches
            journalEntries: [],      // { time, text }
            boardConnections: [],    // { from, to }
            boardPositions: {},      // { clueId: {x, y} }
            locationsUnlocked: [],   // Array of location IDs
            accusation: null,        // { suspectId, clueIds }
            gamePhase: 'intro',      // intro, investigation, accusation, ending
            startTime: null,
            elapsedTime: 0,
            score: 0,
        };
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        this.state[key] = value;
        this.emit('stateChange', key, value);
    }

    hasClue(id) {
        return this.state.cluesFound.includes(id);
    }

    addClue(id) {
        if (!this.hasClue(id)) {
            this.state.cluesFound.push(id);
            this.emit('clueFound', id);
            return true;
        }
        return false;
    }

    hasSuspect(id) {
        return this.state.suspectsRevealed.includes(id);
    }

    addSuspect(id) {
        if (!this.hasSuspect(id)) {
            this.state.suspectsRevealed.push(id);
            this.emit('suspectRevealed', id);
            return true;
        }
        return false;
    }

    hasFlag(flag) {
        return !!this.state.dialogueFlags[flag];
    }

    setFlag(flag, value = true) {
        this.state.dialogueFlags[flag] = value;
        this.emit('flagSet', flag, value);
    }

    addJournalEntry(text) {
        const time = Utils.formatTime(this.state.elapsedTime);
        this.state.journalEntries.push({ time, text });
        this.emit('journalUpdate', { time, text });
    }

    isLocationUnlocked(locId) {
        return this.state.locationsUnlocked.includes(locId);
    }

    unlockLocation(locId) {
        if (!this.isLocationUnlocked(locId)) {
            this.state.locationsUnlocked.push(locId);
            this.emit('locationUnlocked', locId);
            return true;
        }
        return false;
    }

    addScore(points) {
        this.state.score += points;
        this.emit('scoreChange', this.state.score);
    }

    /**
     * Serialize state for saving
     */
    serialize() {
        return Utils.deepClone(this.state);
    }

    /**
     * Load from serialized state
     */
    deserialize(data) {
        this.state = Utils.deepClone(data);
        this.emit('stateLoaded');
    }
}

/**
 * ClueSystem.js — Manages clues, evidence, and notification display
 */
class ClueSystem extends Utils.EventEmitter {
    constructor(stateManager, audioManager) {
        super();
        this.state = stateManager;
        this.audio = audioManager;
        this.notifEl = Utils.$('notification');
        this.notifText = Utils.$('notif-text');
        this.notifIcon = Utils.$('notif-icon');
        this.notifTimeout = null;

        // Listen for clue events
        this.state.on('clueFound', (clueId) => this._onClueFound(clueId));
        this.state.on('suspectRevealed', (suspectId) => this._onSuspectRevealed(suspectId));
        this.state.on('locationUnlocked', (locId) => this._onLocationUnlocked(locId));
    }

    _onClueFound(clueId) {
        const caseData = window.CASE_DATA;
        if (!caseData) return;
        const clue = caseData.clues.find(c => c.id === clueId);
        if (clue) {
            this.audio.playSfx('clue');
            this._showNotification('🔍', `Indice trouvé : ${clue.name}`);
            this.state.addScore(50);
            this.state.addJournalEntry(`Indice découvert : "${clue.name}" — ${clue.description}`);
        }
    }

    _onSuspectRevealed(suspectId) {
        const caseData = window.CASE_DATA;
        if (!caseData) return;
        const suspect = caseData.suspects.find(s => s.id === suspectId);
        if (suspect) {
            this.audio.playSfx('reveal');
            this._showNotification('🗣️', `Nouveau suspect : ${suspect.name}`);
            this.state.addScore(30);
            this.state.addJournalEntry(`Nouveau suspect identifié : ${suspect.name} — ${suspect.role}`);
        }
    }

    _onLocationUnlocked(locId) {
        const caseData = window.CASE_DATA;
        if (!caseData) return;
        const loc = caseData.locations.find(l => l.id === locId);
        if (loc) {
            this.audio.playSfx('reveal');
            this._showNotification('🗺️', `Nouveau lieu : ${loc.name}`);
            this.state.addJournalEntry(`Nouveau lieu accessible : ${loc.name}`);
        }
    }

    _showNotification(icon, text) {
        clearTimeout(this.notifTimeout);
        this.notifIcon.textContent = icon;
        this.notifText.textContent = text;
        this.notifEl.classList.remove('hidden');
        this.notifEl.classList.add('fade-in');

        this.notifTimeout = setTimeout(() => {
            this.notifEl.classList.add('hidden');
        }, 3500);
    }

    /**
     * Get all found clues with their full data
     */
    getFoundClues() {
        const caseData = window.CASE_DATA;
        if (!caseData) return [];
        return this.state.get('cluesFound')
            .map(id => caseData.clues.find(c => c.id === id))
            .filter(Boolean);
    }

    /**
     * Get all revealed suspects with their full data
     */
    getRevealedSuspects() {
        const caseData = window.CASE_DATA;
        if (!caseData) return [];
        return this.state.get('suspectsRevealed')
            .map(id => caseData.suspects.find(s => s.id === id))
            .filter(Boolean);
    }

    /**
     * Check accusation against the correct answer
     */
    checkAccusation(suspectId, selectedClueIds) {
        const caseData = window.CASE_DATA;
        if (!caseData) return { correct: false };

        const isCorrectSuspect = suspectId === caseData.solution.culprit;

        // Check if key evidence was selected
        const keyEvidence = caseData.solution.keyEvidence || [];
        const matchedEvidence = keyEvidence.filter(e => selectedClueIds.includes(e));
        const evidenceScore = keyEvidence.length > 0 ? matchedEvidence.length / keyEvidence.length : 0;

        return {
            correct: isCorrectSuspect,
            evidenceScore,
            matchedEvidence,
            totalKeyEvidence: keyEvidence.length
        };
    }
}

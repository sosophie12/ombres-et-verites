/**
 * Notebook.js — Manages the detective's notebook UI (clues, suspects, journal)
 */
class Notebook {
    constructor(stateManager, clueSystem, audioManager) {
        this.state = stateManager;
        this.clueSystem = clueSystem;
        this.audio = audioManager;

        this.screen = Utils.$('notebook-screen');
        this.tabs = Utils.$qa('.nb-tab');
        this.pages = {
            clues: Utils.$('nb-page-clues'),
            suspects: Utils.$('nb-page-suspects'),
            journal: Utils.$('nb-page-journal')
        };

        this._setupTabs();

        // Auto-update when state changes  
        this.state.on('clueFound', () => this._renderClues());
        this.state.on('suspectRevealed', () => this._renderSuspects());
        this.state.on('journalUpdate', () => this._renderJournal());
    }

    _setupTabs() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.audio.playSfx('page');

                // Update active tab
                this.tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show page
                Object.values(this.pages).forEach(p => p.style.display = 'none');
                if (this.pages[tabName]) {
                    this.pages[tabName].style.display = '';
                }
            });
        });
    }

    open() {
        this.screen.classList.add('active');
        this.refresh();
    }

    close() {
        this.screen.classList.remove('active');
    }

    refresh() {
        this._renderClues();
        this._renderSuspects();
        this._renderJournal();
    }

    _renderClues() {
        const container = Utils.$('clues-list');
        const clues = this.clueSystem.getFoundClues();

        if (clues.length === 0) {
            container.innerHTML = '<p style="color:#999;font-style:italic;padding:20px;">Aucun indice découvert pour le moment. Explorez les lieux et interrogez les suspects.</p>';
            return;
        }

        container.innerHTML = '';
        clues.forEach(clue => {
            const card = Utils.createElement('div', 'clue-card');
            const categoryIcons = {
                physical: '🔍',
                document: '📄',
                testimony: '🗣️',
                forensic: '🔬'
            };
            card.innerHTML = `
                <h4>${categoryIcons[clue.category] || '📎'} ${clue.name}</h4>
                <p>${clue.description}</p>
                <div class="clue-location">📍 ${this._getLocationName(clue.location)}</div>
            `;
            container.appendChild(card);
        });
    }

    _renderSuspects() {
        const container = Utils.$('suspects-list');
        const suspects = this.clueSystem.getRevealedSuspects();

        if (suspects.length === 0) {
            container.innerHTML = '<p style="color:#999;font-style:italic;padding:20px;">Aucun suspect identifié. Parlez aux personnes présentes dans le manoir.</p>';
            return;
        }

        container.innerHTML = '';
        suspects.forEach(suspect => {
            const card = Utils.createElement('div', 'suspect-card');
            card.innerHTML = `
                <div class="suspect-avatar">${suspect.emoji}</div>
                <div class="suspect-info">
                    <h4>${suspect.name}</h4>
                    <span class="suspect-role">${suspect.role}</span>
                    <p>${suspect.description}</p>
                    <p style="margin-top:6px;color:#888;"><strong>Alibi :</strong> ${suspect.alibi}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    _renderJournal() {
        const container = Utils.$('journal-list');
        const entries = this.state.get('journalEntries') || [];

        if (entries.length === 0) {
            container.innerHTML = '<p style="color:#999;font-style:italic;padding:20px;">Le journal est vide. Vos observations seront notées ici au fil de l\'enquête.</p>';
            return;
        }

        container.innerHTML = '';
        // Show newest first
        [...entries].reverse().forEach(entry => {
            const el = Utils.createElement('div', 'journal-entry');
            el.innerHTML = `
                <div class="journal-time">⏱ ${entry.time}</div>
                <div>${entry.text}</div>
            `;
            container.appendChild(el);
        });
    }

    _getLocationName(locId) {
        const caseData = window.CASE_DATA;
        if (!caseData) return locId;
        const loc = caseData.locations.find(l => l.id === locId);
        return loc ? loc.name : locId;
    }
}

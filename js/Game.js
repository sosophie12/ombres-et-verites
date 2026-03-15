/**
 * Game.js — Main game controller that wires all systems together
 * "Ombres & Vérités" — Jeu d'Enquête — Multi-Case Edition
 */

// ===== CASES REGISTRY =====
window.ALL_CASES = [];

class Game {
    constructor() {
        // Core systems
        this.audio = new AudioManager();
        this.state = new StateManager();
        this.saveManager = new SaveManager(this.state);

        // Scene rendering
        this.sceneCanvas = Utils.$('scene-canvas');
        this.renderer = new SceneRenderer(this.sceneCanvas);

        // Game systems
        this.dialogue = new DialogueSystem(this.state, this.audio);
        this.clueSystem = new ClueSystem(this.state, this.audio);
        this.explorer = new SceneExplorer(this.state, this.dialogue, this.renderer, this.audio);
        this.board = new DeductionBoard(this.state, this.clueSystem);

        // UI
        this.menuManager = new MenuManager(this.audio);
        this.notebook = new Notebook(this.state, this.clueSystem, this.audio);
        this.mapView = new MapView(this.state, this.explorer, this.audio);

        // Timer
        this.gameTimer = null;
        this.gameStartTime = 0;

        // Current case data reference
        this.currentCaseData = null;

        // Register all cases
        this._registerCases();

        this._init();
    }

    _init() {
        this._setupMainMenu();
        this._setupGameButtons();
        this._setupAccusation();
        this._setupKeyboard();
        this._setupResize();
        this._loadSettings();
        this._setupMobile();

        // Check for existing save
        if (this.saveManager.hasSave()) {
            Utils.$('btn-continue').style.display = '';
        }

        console.log('🔍 Ombres & Vérités — Jeu d\'Enquête chargé');
    }

    // ===== CASES REGISTRY =====
    _registerCases() {
        const cases = [
            { data: window.CASE_DATA, emoji: '🏚️', level: 1 },
            { data: window.CASE_DATA_2, emoji: '🎭', level: 2 },
            { data: window.CASE_DATA_3, emoji: '🗼', level: 3 },
            { data: window.CASE_DATA_4, emoji: '🏛️', level: 4 },
            { data: window.CASE_DATA_5, emoji: '🚂', level: 5 },
            { data: window.CASE_DATA_6, emoji: '🏨', level: 6 },
            { data: window.CASE_DATA_7, emoji: '⚓', level: 7 },
            { data: window.CASE_DATA_8, emoji: '🎭', level: 8 },
            { data: window.CASE_DATA_9, emoji: '🎶', level: 9 }
        ];
        
        cases.forEach((c, idx) => {
            if (c.data) {
                const completed = this._isCaseCompleted(c.data.id);
                // A case is unlocked if it's the first one, or the previous case is completed
                const previousCompleted = idx === 0 || this._isCaseCompleted(cases[idx - 1]?.data?.id);
                window.ALL_CASES.push({
                    ...c,
                    completed,
                    locked: !previousCompleted
                });
            }
        });
    }

    _getCompletedCount() {
        return window.ALL_CASES.filter(c => c.completed).length;
    }

    _getNextCase() {
        return window.ALL_CASES.find(c => !c.completed && !c.locked);
    }

    _isCaseCompleted(caseId) {
        try {
            const key = `ombres_verites_completed_${caseId}`;
            return localStorage.getItem(key) === 'true';
        } catch { return false; }
    }

    _markCaseCompleted(caseId) {
        try {
            const key = `ombres_verites_completed_${caseId}`;
            localStorage.setItem(key, 'true');
        } catch {}
    }

    // ===== MAIN MENU =====
    _setupMainMenu() {
        Utils.$('btn-new-game').addEventListener('click', () => this._showCaseSelection());
        Utils.$('btn-continue').addEventListener('click', () => this._continueGame());
        Utils.$('btn-back-cases').addEventListener('click', () => this.menuManager.showScreen('main-menu'));
    }

    _showCaseSelection() {
        const grid = Utils.$('cases-grid');
        grid.innerHTML = '';

        // Update progression bar
        const completedCount = this._getCompletedCount();
        const totalCases = window.ALL_CASES.length;
        const progressBar = Utils.$('level-progress-fill');
        const progressText = Utils.$('level-progress-text');
        if (progressBar) {
            progressBar.style.width = `${(completedCount / totalCases) * 100}%`;
        }
        if (progressText) {
            progressText.textContent = `${completedCount} / ${totalCases} enquête${completedCount > 1 ? 's' : ''} résolue${completedCount > 1 ? 's' : ''}`;
        }

        // Refresh lock status
        window.ALL_CASES.forEach((entry, idx) => {
            entry.completed = this._isCaseCompleted(entry.data.id);
            const prevCompleted = idx === 0 || this._isCaseCompleted(window.ALL_CASES[idx - 1]?.data?.id);
            entry.locked = !prevCompleted;
        });

        window.ALL_CASES.forEach((entry, idx) => {
            const c = entry.data;
            
            const card = Utils.createElement('div', 'case-card');
            if (entry.locked) card.classList.add('locked');
            if (entry.completed) card.classList.add('completed-card');
            
            let badgeHTML = '';
            if (entry.completed) {
                badgeHTML = '<span class="case-badge completed">✓ Résolu</span>';
            } else if (entry.locked) {
                badgeHTML = '<span class="case-badge locked-badge">🔒 Verrouillé</span>';
            } else {
                badgeHTML = '<span class="case-badge new">À résoudre</span>';
            }

            const levelLabel = `Niveau ${entry.level}`;

            card.innerHTML = `
                <div class="case-level-number">${levelLabel}</div>
                <span class="case-emoji">${entry.locked ? '🔒' : entry.emoji}</span>
                ${badgeHTML}
                <h3>${entry.locked ? '???' : c.title}</h3>
                <p class="case-subtitle">${entry.locked ? 'Résolvez l\'enquête précédente pour débloquer' : c.subtitle}</p>
                <span class="case-difficulty">${c.difficulty || '⭐'}</span>
            `;

            if (!entry.locked) {
                card.addEventListener('click', () => {
                    this.audio.playSfx('click');
                    this._startCase(c);
                });
            }

            grid.appendChild(card);
        });

        this.menuManager.showScreen('case-select-screen');
    }

    _startCase(caseData) {
        this.currentCaseData = caseData;
        window.CASE_DATA = caseData;

        this.state.reset();
        this.state.set('caseId', caseData.id);
        this.audio.init();
        this.audio.startAmbientMusic();

        // Start timer
        this.gameStartTime = Date.now();
        this.state.set('startTime', this.gameStartTime);
        this._startTimer();

        // Show game screen
        this.menuManager.showScreen('game-screen');
        Utils.$('case-title').textContent = caseData.title;

        // Clear renderer state from previous case before resize
        this.renderer.clear();

        // Resize canvas
        this._resizeCanvas();

        // Load initial location from case data
        const firstLocation = caseData.locations[0];
        const firstScene = firstLocation.scene || firstLocation.id;
        this.renderer.renderScene(firstScene);
        this.state.set('currentLocation', firstLocation.id);
        Utils.$('location-name').textContent = firstLocation.name;

        // Unlock initial location
        this.state.unlockLocation(firstLocation.id);

        // Start intro dialogue after brief delay
        setTimeout(() => {
            this.state.addJournalEntry(`Début de l'enquête — ${caseData.subtitle}.`);
            this.dialogue.start(caseData.introDialogue, () => {
                this.state.set('gamePhase', 'investigation');
                this.explorer.loadLocation(firstLocation.id);
            });
        }, 500);
    }

    _continueGame() {
        if (this.saveManager.load()) {
            // Restore correct case data
            const savedCaseId = this.state.get('caseId');
            if (savedCaseId) {
                const caseEntry = window.ALL_CASES.find(e => e.data.id === savedCaseId);
                if (caseEntry) {
                    this.currentCaseData = caseEntry.data;
                    window.CASE_DATA = caseEntry.data;
                }
            }

            this.audio.init();
            this.audio.startAmbientMusic();

            this.menuManager.showScreen('game-screen');
            Utils.$('case-title').textContent = this.currentCaseData.title;

            // Clear renderer state before resize
            this.renderer.clear();
            this._resizeCanvas();

            // Resume timer
            this.gameStartTime = Date.now() - (this.state.get('elapsedTime') * 1000);
            this._startTimer();

            // Load current location
            const loc = this.state.get('currentLocation') || 'mansion_entrance';
            this.explorer.loadLocation(loc);
        }
    }

    // ===== GAME BUTTONS =====
    _setupGameButtons() {
        // Top bar buttons
        Utils.$('btn-notebook').addEventListener('click', () => {
            this.notebook.open();
            this.audio.playSfx('page');
        });

        Utils.$('btn-board').addEventListener('click', () => {
            this.board.open();
        });

        Utils.$('btn-map').addEventListener('click', () => {
            this.mapView.open();
        });

        Utils.$('btn-pause').addEventListener('click', () => {
            this.menuManager.showOverlay('pause-screen');
        });

        // Pause buttons
        Utils.$('btn-save').addEventListener('click', () => {
            this._saveGame();
            this.menuManager.closeOverlay('pause-screen');
        });

        // Ending screen
        Utils.$('btn-replay').addEventListener('click', () => {
            this.menuManager.showScreen('main-menu');
            this._stopTimer();
            this.audio.stopMusic();
        });

        Utils.$('btn-ending-menu').addEventListener('click', () => {
            this.menuManager.showScreen('main-menu');
            this._stopTimer();
            this.audio.stopMusic();
        });
    }

    // ===== ACCUSATION =====
    _setupAccusation() {
        Utils.$('btn-submit-accusation').addEventListener('click', () => {
            this._submitAccusation();
        });
    }

    openAccusation() {
        const screen = Utils.$('accusation-screen');
        const suspectsContainer = Utils.$('accuse-suspects');
        const cluesContainer = Utils.$('accuse-clues-list');
        const submitBtn = Utils.$('btn-submit-accusation');

        this.selectedAccuseSuspect = null;
        this.selectedAccuseClues = [];
        submitBtn.disabled = true;

        // Populate suspects
        suspectsContainer.innerHTML = '';
        const suspects = this.clueSystem.getRevealedSuspects();
        suspects.forEach(s => {
            const btn = Utils.createElement('div', 'accuse-suspect-btn');
            btn.dataset.suspectId = s.id;
            btn.innerHTML = `<span class="suspect-emoji">${s.emoji}</span>${s.name}`;
            btn.addEventListener('click', () => {
                Utils.$qa('.accuse-suspect-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedAccuseSuspect = s.id;
                this._updateAccuseButton();
                this.audio.playSfx('click');
            });
            suspectsContainer.appendChild(btn);
        });

        // Populate clues
        cluesContainer.innerHTML = '';
        const clues = this.clueSystem.getFoundClues();
        clues.forEach(c => {
            const tag = Utils.createElement('div', 'accuse-clue-tag', c.name);
            tag.dataset.clueId = c.id;
            tag.addEventListener('click', () => {
                tag.classList.toggle('selected');
                if (tag.classList.contains('selected')) {
                    this.selectedAccuseClues.push(c.id);
                } else {
                    this.selectedAccuseClues = this.selectedAccuseClues.filter(id => id !== c.id);
                }
                this._updateAccuseButton();
                this.audio.playSfx('click');
            });
            cluesContainer.appendChild(tag);
        });

        this.menuManager.showOverlay('accusation-screen');
    }

    _updateAccuseButton() {
        const btn = Utils.$('btn-submit-accusation');
        btn.disabled = !this.selectedAccuseSuspect || this.selectedAccuseClues.length === 0;
    }

    _submitAccusation() {
        if (!this.selectedAccuseSuspect || this.selectedAccuseClues.length === 0) return;

        this.menuManager.closeOverlay('accusation-screen');

        const result = this.clueSystem.checkAccusation(this.selectedAccuseSuspect, this.selectedAccuseClues);
        this._stopTimer();

        const endings = this.currentCaseData.solution.endings;
        let ending;

        if (result.correct && result.evidenceScore >= 0.6) {
            ending = endings.perfect;
            this.state.addScore(500);
            this.audio.playSfx('success');
        } else if (result.correct) {
            ending = endings.good;
            this.state.addScore(200);
            this.audio.playSfx('success');
        } else {
            ending = endings.wrong;
            this.audio.playSfx('error');
        }

        this.state.set('gamePhase', 'ending');

        // Show ending
        setTimeout(() => {
            this._showEnding(ending, result);
        }, 500);
    }

    _showEnding(ending, result) {
        const titleEl = Utils.$('ending-title');
        const textEl = Utils.$('ending-text');
        const statsEl = Utils.$('ending-stats');

        titleEl.textContent = ending.title;
        titleEl.className = result.correct ? 'victory' : 'defeat';
        textEl.textContent = ending.text;

        const elapsed = this.state.get('elapsedTime');
        const cluesFound = this.state.get('cluesFound').length;
        const totalClues = this.currentCaseData.clues.length;
        const score = this.state.get('score');

        statsEl.innerHTML = `
            <div class="stat-item">
                <span class="stat-value">${score}</span>
                <span class="stat-label">Score</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${cluesFound}/${totalClues}</span>
                <span class="stat-label">Indices</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${Utils.formatTime(elapsed)}</span>
                <span class="stat-label">Temps</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${Math.round(result.evidenceScore * 100)}%</span>
                <span class="stat-label">Preuves clés</span>
            </div>
        `;

        this.menuManager.showScreen('ending-screen');

        // Mark case completed if won
        if (result.correct) {
            this._markCaseCompleted(this.currentCaseData.id);
            // Refresh lock status for all cases
            window.ALL_CASES.forEach((entry, idx) => {
                entry.completed = this._isCaseCompleted(entry.data.id);
                const prevCompleted = idx === 0 || this._isCaseCompleted(window.ALL_CASES[idx - 1]?.data?.id);
                entry.locked = !prevCompleted;
            });
            // Show next level button if there's a next case
            const nextCase = this._getNextCase();
            const btnNext = Utils.$('btn-next-level');
            if (btnNext) {
                if (nextCase) {
                    btnNext.style.display = '';
                    btnNext.textContent = `Niveau suivant : ${nextCase.data.title}`;
                    btnNext.onclick = () => {
                        this._startCase(nextCase.data);
                    };
                } else {
                    // All cases completed
                    btnNext.style.display = '';
                    btnNext.textContent = '🏆 Toutes les enquêtes résolues !';
                    btnNext.disabled = true;
                }
            }
        } else {
            const btnNext = Utils.$('btn-next-level');
            if (btnNext) btnNext.style.display = 'none';
        }

        // Delete save after ending
        this.saveManager.deleteSave();
    }

    // ===== SAVE/LOAD =====
    _saveGame() {
        this.state.set('elapsedTime', (Date.now() - this.gameStartTime) / 1000);
        this.saveManager.save();
        this.audio.playSfx('success');

        // Show brief notification
        const notif = Utils.$('notification');
        Utils.$('notif-icon').textContent = '💾';
        Utils.$('notif-text').textContent = 'Partie sauvegardée !';
        notif.classList.remove('hidden');
        setTimeout(() => notif.classList.add('hidden'), 2000);
    }

    // ===== TIMER =====
    _startTimer() {
        this._stopTimer();
        this.gameTimer = setInterval(() => {
            const elapsed = (Date.now() - this.gameStartTime) / 1000;
            this.state.state.elapsedTime = elapsed;
        }, 1000);
    }

    _stopTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    // ===== KEYBOARD =====
    _setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (this.menuManager.currentScreen !== 'game-screen') return;

            switch (e.key) {
                case 'Escape':
                case 'p':
                case 'P':
                    if (this.menuManager.isOverlayOpen()) {
                        // Close all overlays
                        ['notebook-screen', 'board-screen', 'map-screen', 'accusation-screen', 'pause-screen']
                            .forEach(id => this.menuManager.closeOverlay(id));
                    } else {
                        this.menuManager.showOverlay('pause-screen');
                    }
                    break;
                case 'n':
                case 'N':
                    if (!this.menuManager.isOverlayOpen()) {
                        this.notebook.open();
                    }
                    break;
                case 'm':
                case 'M':
                    if (!this.menuManager.isOverlayOpen()) {
                        this.mapView.open();
                    }
                    break;
                case 'b':
                case 'B':
                    if (!this.menuManager.isOverlayOpen()) {
                        this.board.open();
                    }
                    break;
            }
        });
    }

    // ===== SETTINGS =====
    _loadSettings() {
        const settings = this.saveManager.loadSettings();
        if (settings) {
            if (settings.musicVolume !== undefined) {
                Utils.$('music-vol').value = settings.musicVolume * 100;
                this.audio.setMusicVolume(settings.musicVolume);
            }
            if (settings.sfxVolume !== undefined) {
                Utils.$('sfx-vol').value = settings.sfxVolume * 100;
                this.audio.setSfxVolume(settings.sfxVolume);
            }
            if (settings.textSpeed) {
                Utils.$('text-speed').value = settings.textSpeed;
                this.dialogue.setTextSpeed(settings.textSpeed);
            }
        }

        // Settings change listeners
        Utils.$('music-vol').addEventListener('input', (e) => {
            const vol = e.target.value / 100;
            this.audio.setMusicVolume(vol);
            this._saveSettings();
        });

        Utils.$('sfx-vol').addEventListener('input', (e) => {
            const vol = e.target.value / 100;
            this.audio.setSfxVolume(vol);
            this._saveSettings();
        });

        Utils.$('text-speed').addEventListener('change', (e) => {
            this.dialogue.setTextSpeed(e.target.value);
            this._saveSettings();
        });
    }

    _saveSettings() {
        this.saveManager.saveSettings({
            musicVolume: Utils.$('music-vol').value / 100,
            sfxVolume: Utils.$('sfx-vol').value / 100,
            textSpeed: Utils.$('text-speed').value
        });
    }

    // ===== RESIZE =====
    _setupResize() {
        window.addEventListener('resize', () => this._resizeCanvas());
        // Also handle orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this._resizeCanvas(), 100);
        });
    }

    _resizeCanvas() {
        this.renderer.resize();
    }

    // ===== MOBILE SUPPORT =====
    _setupMobile() {
        // Prevent pull-to-refresh and bounce scrolling on game container
        const container = Utils.$('game-container');
        container.addEventListener('touchmove', (e) => {
            // Allow scrolling in scrollable panels (notebook, accusation, case select, etc.)
            const isScrollable = e.target.closest('.notebook-page, .ending-text, .accusation-panel, .map-container, .case-select-content');
            if (!isScrollable) {
                e.preventDefault();
            }
        }, { passive: false });

        // Prevent double-tap zoom on game area
        let lastTap = 0;
        container.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTap < 300) {
                e.preventDefault();
            }
            lastTap = now;
        }, { passive: false });

        // Fix iOS 100vh issue — use visualViewport for best accuracy
        const setVH = () => {
            const height = window.visualViewport
                ? window.visualViewport.height
                : window.innerHeight;
            const vh = height * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            document.getElementById('game-container').style.height = `${height}px`;
        };
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => setTimeout(setVH, 150));
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', setVH);
        }

        // Prevent context menu on long press
        container.addEventListener('contextmenu', (e) => e.preventDefault());
    }
}

// ===== LAUNCH =====
window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});

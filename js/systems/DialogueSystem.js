/**
 * DialogueSystem.js — Handles typewriter text, dialogue trees, and character conversations
 */
class DialogueSystem extends Utils.EventEmitter {
    constructor(stateManager, audioManager) {
        super();
        this.state = stateManager;
        this.audio = audioManager;

        // DOM refs
        this.box = Utils.$('dialogue-box');
        this.portrait = Utils.$('dialogue-portrait');
        this.speaker = Utils.$('dialogue-speaker');
        this.textEl = Utils.$('dialogue-text');
        this.choicesEl = Utils.$('dialogue-choices');
        this.continueEl = Utils.$('dialogue-continue');

        // State
        this.currentDialogue = null;
        this.currentNodeIndex = 0;
        this.isTyping = false;
        this.typeTimeout = null;
        this.fullText = '';
        this.charIndex = 0;
        this.textSpeed = 30; // ms per character
        this.onComplete = null;

        this._setupEvents();
    }

    _setupEvents() {
        this.continueEl.addEventListener('click', () => this._advance());
        this.box.addEventListener('click', (e) => {
            if (e.target.classList.contains('dialogue-choice')) return;
            if (this.isTyping) {
                this._skipTyping();
            }
        });
    }

    setTextSpeed(speed) {
        switch (speed) {
            case 'fast': this.textSpeed = 15; break;
            case 'slow': this.textSpeed = 50; break;
            default: this.textSpeed = 30;
        }
    }

    /**
     * Start a dialogue sequence
     * @param {Object} dialogue - { nodes: [ { speaker, portrait, text, choices?, action?, condition? } ] }
     * @param {Function} onComplete - callback when dialogue ends
     */
    start(dialogue, onComplete = null) {
        this.currentDialogue = dialogue;
        this.currentNodeIndex = 0;
        this.onComplete = onComplete;
        this.box.style.display = 'flex';
        this.box.classList.add('fade-in');
        this._showNode(0);
    }

    _showNode(index) {
        const nodes = this.currentDialogue.nodes;

        // Skip nodes with unmet conditions
        while (index < nodes.length && nodes[index].condition && !this._checkCondition(nodes[index].condition)) {
            index++;
        }

        if (index >= nodes.length) {
            this._endDialogue();
            return;
        }

        this.currentNodeIndex = index;
        const node = nodes[index];

        // Set portrait and speaker
        this.portrait.textContent = node.portrait || '👤';
        this.speaker.textContent = node.speaker || '???';

        // Clear choices
        this.choicesEl.innerHTML = '';
        this.choicesEl.style.display = 'none';

        // Execute any action attached to the node
        if (node.action) {
            this._executeAction(node.action);
        }

        // Start typewriter effect
        if (node.text) {
            this.continueEl.style.display = 'block';
            this._startTyping(node.text);
        }

        // If there are choices, they'll show after typing finishes
        if (node.choices && node.choices.length > 0) {
            this.continueEl.style.display = 'none';
        }
    }

    _startTyping(text) {
        this.fullText = text;
        this.charIndex = 0;
        this.isTyping = true;
        this.textEl.textContent = '';
        this._typeNext();
    }

    _typeNext() {
        if (this.charIndex < this.fullText.length) {
            this.textEl.textContent += this.fullText[this.charIndex];
            this.charIndex++;

            // Play subtle typing sound occasionally
            if (this.charIndex % 3 === 0) {
                this.audio.playSfx('dialogue');
            }

            this.typeTimeout = setTimeout(() => this._typeNext(), this.textSpeed);
        } else {
            this.isTyping = false;
            this._onTypingComplete();
        }
    }

    _skipTyping() {
        clearTimeout(this.typeTimeout);
        this.textEl.textContent = this.fullText;
        this.isTyping = false;
        this._onTypingComplete();
    }

    _onTypingComplete() {
        const node = this.currentDialogue.nodes[this.currentNodeIndex];
        if (node.choices && node.choices.length > 0) {
            this._showChoices(node.choices);
        }
    }

    _showChoices(choices) {
        this.choicesEl.innerHTML = '';
        this.choicesEl.style.display = 'flex';
        this.continueEl.style.display = 'none';

        choices.forEach((choice, i) => {
            // Check if choice has a condition
            if (choice.condition && !this._checkCondition(choice.condition)) {
                return; // Skip this choice
            }

            const btn = Utils.createElement('button', 'dialogue-choice', choice.text);
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.audio.playSfx('click');
                this._handleChoice(choice);
            });
            this.choicesEl.appendChild(btn);
        });
    }

    _handleChoice(choice) {
        // Execute choice action
        if (choice.action) {
            this._executeAction(choice.action);
        }

        // Set flag if specified
        if (choice.flag) {
            this.state.setFlag(choice.flag);
        }

        // Go to specified node or next
        if (choice.goto !== undefined) {
            if (choice.goto === 'end') {
                this._endDialogue();
            } else {
                this._showNode(choice.goto);
            }
        } else {
            this._advance();
        }
    }

    _advance() {
        if (this.isTyping) {
            this._skipTyping();
            return;
        }
        this._showNode(this.currentNodeIndex + 1);
    }

    _endDialogue() {
        this.box.style.display = 'none';
        this.currentDialogue = null;
        if (this.onComplete) {
            this.onComplete();
        }
        this.emit('dialogueEnd');
    }

    _checkCondition(cond) {
        if (typeof cond === 'function') return cond(this.state);

        if (cond.hasClue) return this.state.hasClue(cond.hasClue);
        if (cond.hasFlag) return this.state.hasFlag(cond.hasFlag);
        if (cond.notFlag) return !this.state.hasFlag(cond.notFlag);
        if (cond.hasSuspect) return this.state.hasSuspect(cond.hasSuspect);
        return true;
    }

    _executeAction(action) {
        if (typeof action === 'function') {
            action(this.state, this);
            return;
        }

        if (action.addClue) {
            if (this.state.addClue(action.addClue)) {
                this.emit('clueFound', action.addClue);
            }
        }
        if (action.addSuspect) {
            this.state.addSuspect(action.addSuspect);
        }
        if (action.unlockLocation) {
            this.state.unlockLocation(action.unlockLocation);
        }
        if (action.setFlag) {
            this.state.setFlag(action.setFlag);
        }
        if (action.journal) {
            this.state.addJournalEntry(action.journal);
        }
        if (action.addScore) {
            this.state.addScore(action.addScore);
        }
    }

    isActive() {
        return this.currentDialogue !== null;
    }

    close() {
        clearTimeout(this.typeTimeout);
        this.box.style.display = 'none';
        this.currentDialogue = null;
        this.isTyping = false;
    }
}

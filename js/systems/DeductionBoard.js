/**
 * DeductionBoard.js — Interactive evidence board where players connect clues
 */
class DeductionBoard {
    constructor(stateManager, clueSystem) {
        this.state = stateManager;
        this.clueSystem = clueSystem;

        this.boardScreen = Utils.$('board-screen');
        this.boardArea = Utils.$('board-area');
        this.boardCanvas = Utils.$('board-canvas');
        this.boardItems = Utils.$('board-items');
        this.ctx = this.boardCanvas.getContext('2d');

        this.connecting = false;
        this.connectFrom = null;
        this.dragging = null;
        this.dragOffset = { x: 0, y: 0 };

        this._setupEvents();
    }

    _setupEvents() {
        Utils.$('btn-connect').addEventListener('click', () => this._toggleConnectMode());
        Utils.$('btn-clear-board').addEventListener('click', () => this._clearConnections());
        Utils.$('btn-accuse').addEventListener('click', () => this._openAccusation());

        // Mouse events
        this.boardArea.addEventListener('mousedown', (e) => this._onMouseDown(e));
        this.boardArea.addEventListener('mousemove', (e) => this._onMouseMove(e));
        this.boardArea.addEventListener('mouseup', (e) => this._onMouseUp(e));

        // Touch events for mobile
        this.boardArea.addEventListener('touchstart', (e) => this._onTouchStart(e), { passive: false });
        this.boardArea.addEventListener('touchmove', (e) => this._onTouchMove(e), { passive: false });
        this.boardArea.addEventListener('touchend', (e) => this._onTouchEnd(e));
    }

    open() {
        this.boardScreen.classList.add('active');
        this._resize();
        this._populateBoard();
        this._drawConnections();
    }

    close() {
        this.boardScreen.classList.remove('active');
    }

    _resize() {
        const rect = this.boardArea.getBoundingClientRect();
        this.boardCanvas.width = rect.width;
        this.boardCanvas.height = rect.height;
    }

    _populateBoard() {
        this.boardItems.innerHTML = '';
        const clues = this.clueSystem.getFoundClues();
        const suspects = this.clueSystem.getRevealedSuspects();
        const positions = this.state.get('boardPositions') || {};

        // Add suspect cards
        suspects.forEach((suspect, i) => {
            const mobile = this._isMobile();
            const pos = positions[suspect.id] || {
                x: mobile ? 10 + (i % 2) * 120 : 50 + (i % 3) * 180,
                y: mobile ? 10 + Math.floor(i / 2) * 90 : 30 + Math.floor(i / 3) * 130
            };
            this._createBoardCard(suspect.id, suspect.emoji, suspect.name, suspect.role, 'suspect-type', pos);
            if (!positions[suspect.id]) {
                positions[suspect.id] = pos;
            }
        });

        // Add clue cards
        clues.forEach((clue, i) => {
            const mobile = this._isMobile();
            const pos = positions[clue.id] || {
                x: mobile ? 10 + (i % 3) * 105 : 80 + (i % 4) * 160,
                y: mobile ? 180 + Math.floor(i / 3) * 85 : 200 + Math.floor(i / 4) * 120
            };
            this._createBoardCard(clue.id, '📎', clue.name, clue.shortDesc || clue.description.substring(0, 40), 'clue-type', pos);
            if (!positions[clue.id]) {
                positions[clue.id] = pos;
            }
        });

        this.state.set('boardPositions', positions);
    }

    _createBoardCard(id, emoji, title, subtitle, type, pos) {
        const card = Utils.createElement('div', `board-card ${type}`);
        card.dataset.id = id;
        card.style.left = pos.x + 'px';
        card.style.top = pos.y + 'px';
        card.style.setProperty('--rotation', (Math.random() * 6 - 3) + 'deg');
        card.innerHTML = `
            <div style="font-size:1.3rem;margin-bottom:4px;">${emoji}</div>
            <h5>${title}</h5>
            <p>${subtitle}</p>
        `;
        this.boardItems.appendChild(card);
    }

    _onMouseDown(e) {
        const card = e.target.closest('.board-card');
        if (!card) return;

        if (this.connecting) {
            this._handleConnect(card);
            return;
        }

        // Start drag
        this.dragging = card;
        const rect = card.getBoundingClientRect();
        const areaRect = this.boardArea.getBoundingClientRect();
        this.dragOffset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        card.style.zIndex = 100;
        card.style.cursor = 'grabbing';
    }

    _onMouseMove(e) {
        if (!this.dragging) return;
        const areaRect = this.boardArea.getBoundingClientRect();
        const x = e.clientX - areaRect.left - this.dragOffset.x;
        const y = e.clientY - areaRect.top - this.dragOffset.y;
        this.dragging.style.left = Math.max(0, x) + 'px';
        this.dragging.style.top = Math.max(0, y) + 'px';

        // Update position in state
        const positions = this.state.get('boardPositions') || {};
        positions[this.dragging.dataset.id] = { x: Math.max(0, x), y: Math.max(0, y) };
        this.state.set('boardPositions', positions);

        this._drawConnections();
    }

    _onMouseUp(e) {
        if (this.dragging) {
            this.dragging.style.zIndex = '';
            this.dragging.style.cursor = 'grab';
            this.dragging = null;
        }
    }

    // ===== TOUCH HANDLERS =====
    _onTouchStart(e) {
        const touch = e.touches[0];
        const card = document.elementFromPoint(touch.clientX, touch.clientY);
        const boardCard = card ? card.closest('.board-card') : null;
        if (!boardCard) return;

        e.preventDefault(); // Prevent scrolling while dragging

        if (this.connecting) {
            this._handleConnect(boardCard);
            return;
        }

        // Start drag
        this.dragging = boardCard;
        const rect = boardCard.getBoundingClientRect();
        this.dragOffset = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
        boardCard.style.zIndex = 100;
    }

    _onTouchMove(e) {
        if (!this.dragging) return;
        e.preventDefault(); // Prevent scrolling

        const touch = e.touches[0];
        const areaRect = this.boardArea.getBoundingClientRect();
        const x = touch.clientX - areaRect.left - this.dragOffset.x;
        const y = touch.clientY - areaRect.top - this.dragOffset.y;
        this.dragging.style.left = Math.max(0, x) + 'px';
        this.dragging.style.top = Math.max(0, y) + 'px';

        // Update position in state
        const positions = this.state.get('boardPositions') || {};
        positions[this.dragging.dataset.id] = { x: Math.max(0, x), y: Math.max(0, y) };
        this.state.set('boardPositions', positions);

        this._drawConnections();
    }

    _onTouchEnd(e) {
        if (this.dragging) {
            this.dragging.style.zIndex = '';
            this.dragging = null;
        }
    }

    _isMobile() {
        return window.innerWidth <= 480;
    }

    _toggleConnectMode() {
        this.connecting = !this.connecting;
        this.connectFrom = null;
        const btn = Utils.$('btn-connect');
        btn.textContent = this.connecting ? '✓ Mode Lien' : 'Relier';
        btn.style.background = this.connecting ? 'rgba(233,69,96,0.3)' : '';

        // Remove all highlights
        Utils.$qa('.board-card', this.boardItems).forEach(c => c.classList.remove('selected'));
    }

    _handleConnect(card) {
        if (!this.connectFrom) {
            this.connectFrom = card;
            card.classList.add('selected');
        } else {
            if (this.connectFrom === card) {
                card.classList.remove('selected');
                this.connectFrom = null;
                return;
            }

            const fromId = this.connectFrom.dataset.id;
            const toId = card.dataset.id;

            // Check if connection already exists
            const connections = this.state.get('boardConnections') || [];
            const exists = connections.some(c =>
                (c.from === fromId && c.to === toId) ||
                (c.from === toId && c.to === fromId)
            );

            if (!exists) {
                connections.push({ from: fromId, to: toId });
                this.state.set('boardConnections', connections);
            }

            this.connectFrom.classList.remove('selected');
            card.classList.remove('selected');
            this.connectFrom = null;
            this._drawConnections();
        }
    }

    _drawConnections() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.boardCanvas.width, this.boardCanvas.height);

        const connections = this.state.get('boardConnections') || [];

        connections.forEach(conn => {
            const fromEl = this.boardItems.querySelector(`[data-id="${conn.from}"]`);
            const toEl = this.boardItems.querySelector(`[data-id="${conn.to}"]`);
            if (!fromEl || !toEl) return;

            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();
            const areaRect = this.boardArea.getBoundingClientRect();

            const x1 = fromRect.left + fromRect.width / 2 - areaRect.left;
            const y1 = fromRect.top + fromRect.height / 2 - areaRect.top;
            const x2 = toRect.left + toRect.width / 2 - areaRect.left;
            const y2 = toRect.top + toRect.height / 2 - areaRect.top;

            // Draw red string connection
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = '#e94560';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw small pins
            ctx.fillStyle = '#e94560';
            ctx.beginPath();
            ctx.arc(x1, y1, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x2, y2, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    _clearConnections() {
        this.state.set('boardConnections', []);
        this._drawConnections();
    }

    _openAccusation() {
        this.close();
        // Emit event for Game.js to handle
        if (window.game) {
            window.game.openAccusation();
        }
    }
}

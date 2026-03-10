/**
 * SceneRenderer.js — Renders scene backgrounds on canvas
 * Loads pre-generated images with procedural fallback
 */
class SceneRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animFrame = null;
        this.currentScene = null;
        this._imageCache = {};
        this._retryTimer = null;
        this._preloadAll();
    }

    /** Pre-load all scene images into cache */
    _preloadAll() {
        const scenes = [
            'mansion_entrance','living_room','study','kitchen','garden','bedroom','office',
            'theatre_entrance','theatre_stage','backstage','theatre_office',
            'island_dock','lighthouse','lighthouse_top','keeper_house','boathouse',
            'museum_entrance','museum_gallery','museum_security','museum_office','museum_workshop'
        ];
        this._loadedCount = 0;
        this._totalScenes = scenes.length;
        scenes.forEach(id => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                this._imageCache[id] = img;
                this._loadedCount++;
                console.log(`[SceneRenderer] ✅ ${id} loaded (${this._loadedCount}/${this._totalScenes})`);
                // Redraw if this scene is currently showing
                if (this.currentScene === id) this.renderScene(id);
            };
            img.onerror = (e) => {
                console.warn(`[SceneRenderer] ❌ Failed to load: ${id}`, e);
                this._loadedCount++;
            };
            // Add cache-busting for fresh load
            img.src = `./images/scenes/${id}.jpg?v=4`;
        });
    }

    /** Clear canvas and reset current scene (call before switching cases) */
    clear() {
        if (this._retryTimer) {
            clearTimeout(this._retryTimer);
            this._retryTimer = null;
        }
        this.currentScene = null;
        const { ctx, canvas } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    resize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        if (this.currentScene) {
            this.renderScene(this.currentScene);
        }
    }

    /**
     * Render scene — image if available, procedural fallback otherwise
     */
    renderScene(sceneId) {
        this.currentScene = sceneId;
        const { ctx, canvas } = this;
        let w = canvas.width;
        let h = canvas.height;

        // If canvas has no size, force resize first
        if (w === 0 || h === 0) {
            this.resize();
            w = canvas.width;
            h = canvas.height;
            if (w === 0 || h === 0) {
                // Container not visible yet — retry shortly, but only if still the current scene
                if (this._retryTimer) clearTimeout(this._retryTimer);
                this._retryTimer = setTimeout(() => {
                    this._retryTimer = null;
                    if (this.currentScene === sceneId) {
                        this.renderScene(sceneId);
                    }
                }, 100);
                return;
            }
        }

        ctx.clearRect(0, 0, w, h);

        // Try image first
        const img = this._imageCache[sceneId];
        if (img && img.complete && img.naturalWidth > 0) {
            this._drawImage(img, w, h);
        } else {
            console.log(`[SceneRenderer] Image not ready for "${sceneId}", using procedural fallback`);
            // Procedural fallback
            switch (sceneId) {
                case 'office': this._drawOffice(w, h); break;
                case 'mansion_entrance': this._drawMansionEntrance(w, h); break;
                case 'living_room': this._drawLivingRoom(w, h); break;
                case 'study': this._drawStudy(w, h); break;
                case 'garden': this._drawGarden(w, h); break;
                case 'kitchen': this._drawKitchen(w, h); break;
                case 'bedroom': this._drawBedroom(w, h); break;
                default: this._drawDefaultRoom(w, h); break;
            }
        }

        // Vignette overlay
        this._drawVignette(w, h);
    }

    /** Draw image covering the canvas (cover fit) */
    _drawImage(img, w, h) {
        const ctx = this.ctx;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(w / iw, h / ih);
        const sw = iw * scale;
        const sh = ih * scale;
        const sx = (w - sw) / 2;
        const sy = (h - sh) / 2;
        ctx.drawImage(img, sx, sy, sw, sh);
    }

    // ===== SCENE DRAWING METHODS =====

    _drawOffice(w, h) {
        const ctx = this.ctx;
        // Background wall
        ctx.fillStyle = '#2a2a3e';
        ctx.fillRect(0, 0, w, h);

        // Wall panels
        ctx.fillStyle = '#252538';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(w * 0.05 + i * w * 0.24, h * 0.05, w * 0.2, h * 0.55);
        }

        // Floor
        const floorY = h * 0.65;
        ctx.fillStyle = '#1a1a28';
        ctx.fillRect(0, floorY, w, h - floorY);

        // Floor perspective lines
        ctx.strokeStyle = '#222235';
        ctx.lineWidth = 1;
        for (let i = 0; i < 15; i++) {
            ctx.beginPath();
            ctx.moveTo(w * 0.5, floorY);
            ctx.lineTo(i * w / 14, h);
            ctx.stroke();
        }

        // Desk
        ctx.fillStyle = '#3d2b1f';
        ctx.fillRect(w * 0.25, floorY - h * 0.08, w * 0.5, h * 0.08);
        ctx.fillStyle = '#2d1f15';
        ctx.fillRect(w * 0.28, floorY, w * 0.06, h * 0.15);
        ctx.fillRect(w * 0.66, floorY, w * 0.06, h * 0.15);

        // Lamp on desk
        ctx.fillStyle = '#d4a843';
        ctx.beginPath();
        ctx.arc(w * 0.65, floorY - h * 0.12, 12, 0, Math.PI * 2);
        ctx.fill();
        // Lamp glow
        const glow = ctx.createRadialGradient(w * 0.65, floorY - h * 0.12, 5, w * 0.65, floorY - h * 0.12, 100);
        glow.addColorStop(0, 'rgba(212, 168, 67, 0.15)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(w * 0.4, floorY - h * 0.3, w * 0.5, h * 0.4);

        // Papers on desk
        ctx.fillStyle = '#e8e0d0';
        ctx.save();
        ctx.translate(w * 0.42, floorY - h * 0.06);
        ctx.rotate(-0.1);
        ctx.fillRect(0, 0, 40, 50);
        ctx.restore();
        ctx.save();
        ctx.translate(w * 0.48, floorY - h * 0.05);
        ctx.rotate(0.05);
        ctx.fillRect(0, 0, 35, 45);
        ctx.restore();

        // Window
        ctx.fillStyle = '#0a0a1e';
        ctx.fillRect(w * 0.4, h * 0.08, w * 0.2, h * 0.35);
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 3;
        ctx.strokeRect(w * 0.4, h * 0.08, w * 0.2, h * 0.35);
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.08);
        ctx.lineTo(w * 0.5, h * 0.43);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w * 0.4, h * 0.25);
        ctx.lineTo(w * 0.6, h * 0.25);
        ctx.stroke();

        // Moon through window
        ctx.fillStyle = '#ddd';
        ctx.beginPath();
        ctx.arc(w * 0.52, h * 0.18, 15, 0, Math.PI * 2);
        ctx.fill();

        // Bookshelf on right
        ctx.fillStyle = '#3d2b1f';
        ctx.fillRect(w * 0.78, h * 0.1, w * 0.18, h * 0.55);
        for (let r = 0; r < 4; r++) {
            ctx.fillStyle = '#2d1f15';
            ctx.fillRect(w * 0.78, h * 0.1 + r * h * 0.14, w * 0.18, 3);
            // Books
            for (let b = 0; b < 6; b++) {
                const colors = ['#8b0000', '#1a3a5c', '#2d5a27', '#4a3b6b', '#6b4a2d', '#333'];
                ctx.fillStyle = colors[b % colors.length];
                const bx = w * 0.79 + b * w * 0.028;
                const bh = h * 0.08 + Math.random() * h * 0.03;
                ctx.fillRect(bx, h * 0.1 + r * h * 0.14 + (h * 0.13 - bh), w * 0.022, bh);
            }
        }
    }

    _drawMansionEntrance(w, h) {
        const ctx = this.ctx;
        // Night sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
        skyGrad.addColorStop(0, '#05050f');
        skyGrad.addColorStop(1, '#0f0f25');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h * 0.5);

        // Stars
        for (let i = 0; i < 40; i++) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.2})`;
            ctx.fillRect(Math.random() * w, Math.random() * h * 0.4, 1.5, 1.5);
        }

        // Moon
        ctx.fillStyle = '#e8e0c0';
        ctx.beginPath();
        ctx.arc(w * 0.8, h * 0.12, 30, 0, Math.PI * 2);
        ctx.fill();
        const moonGlow = ctx.createRadialGradient(w * 0.8, h * 0.12, 20, w * 0.8, h * 0.12, 150);
        moonGlow.addColorStop(0, 'rgba(232, 224, 192, 0.1)');
        moonGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = moonGlow;
        ctx.fillRect(w * 0.5, 0, w * 0.5, h * 0.4);

        // Ground
        ctx.fillStyle = '#1a1a15';
        ctx.fillRect(0, h * 0.5, w, h * 0.5);

        // Path
        ctx.fillStyle = '#2a2a22';
        ctx.beginPath();
        ctx.moveTo(w * 0.35, h);
        ctx.lineTo(w * 0.65, h);
        ctx.lineTo(w * 0.55, h * 0.55);
        ctx.lineTo(w * 0.45, h * 0.55);
        ctx.closePath();
        ctx.fill();

        // Mansion
        ctx.fillStyle = '#1a1520';
        ctx.fillRect(w * 0.2, h * 0.15, w * 0.6, h * 0.38);
        // Roof
        ctx.fillStyle = '#12101a';
        ctx.beginPath();
        ctx.moveTo(w * 0.15, h * 0.15);
        ctx.lineTo(w * 0.5, h * 0.02);
        ctx.lineTo(w * 0.85, h * 0.15);
        ctx.closePath();
        ctx.fill();

        // Windows (some lit)
        const windowPositions = [
            [0.28, 0.2, true], [0.42, 0.2, false], [0.58, 0.2, true], [0.72, 0.2, false],
            [0.28, 0.35, false], [0.42, 0.35, true], [0.58, 0.35, false], [0.72, 0.35, false],
        ];
        for (const [x, y, lit] of windowPositions) {
            ctx.fillStyle = lit ? '#3a3520' : '#0a0a12';
            ctx.fillRect(w * x, h * y, w * 0.08, h * 0.1);
            if (lit) {
                const wGlow = ctx.createRadialGradient(w * x + w * 0.04, h * y + h * 0.05, 5,
                    w * x + w * 0.04, h * y + h * 0.05, 60);
                wGlow.addColorStop(0, 'rgba(212, 168, 67, 0.08)');
                wGlow.addColorStop(1, 'transparent');
                ctx.fillStyle = wGlow;
                ctx.fillRect(w * x - 30, h * y - 30, w * 0.08 + 60, h * 0.1 + 60);
            }
        }

        // Door
        ctx.fillStyle = '#2d1f15';
        ctx.fillRect(w * 0.45, h * 0.32, w * 0.1, h * 0.21);
        ctx.fillStyle = '#d4a843';
        ctx.beginPath();
        ctx.arc(w * 0.53, h * 0.42, 3, 0, Math.PI * 2);
        ctx.fill();

        // Trees
        this._drawTree(ctx, w * 0.08, h * 0.3, w, h);
        this._drawTree(ctx, w * 0.9, h * 0.28, w, h);
    }

    _drawTree(ctx, x, y, w, h) {
        ctx.fillStyle = '#0a0a08';
        ctx.fillRect(x - 8, y, 16, h - y);
        ctx.beginPath();
        ctx.arc(x, y - 10, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x - 20, y + 10, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 20, y + 5, 35, 0, Math.PI * 2);
        ctx.fill();
    }

    _drawLivingRoom(w, h) {
        const ctx = this.ctx;
        // Walls
        ctx.fillStyle = '#2a2535';
        ctx.fillRect(0, 0, w, h);

        // Wallpaper pattern
        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        for (let x = 0; x < w; x += 40) {
            for (let y = 0; y < h * 0.65; y += 40) {
                ctx.fillRect(x + 15, y + 15, 10, 10);
            }
        }

        // Floor
        const floorY = h * 0.65;
        ctx.fillStyle = '#1e1a15';
        ctx.fillRect(0, floorY, w, h - floorY);

        // Carpet
        ctx.fillStyle = '#3a1520';
        ctx.fillRect(w * 0.15, floorY + 10, w * 0.7, h * 0.2);
        ctx.strokeStyle = '#4a2530';
        ctx.lineWidth = 2;
        ctx.strokeRect(w * 0.17, floorY + 15, w * 0.66, h * 0.18);

        // Fireplace
        ctx.fillStyle = '#333';
        ctx.fillRect(w * 0.35, h * 0.2, w * 0.3, h * 0.45);
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(w * 0.38, h * 0.3, w * 0.24, h * 0.35);
        // Fire glow
        const fireGlow = ctx.createRadialGradient(w * 0.5, h * 0.55, 10, w * 0.5, h * 0.55, 120);
        fireGlow.addColorStop(0, 'rgba(255, 120, 30, 0.12)');
        fireGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = fireGlow;
        ctx.fillRect(w * 0.2, h * 0.3, w * 0.6, h * 0.5);
        // Fire
        ctx.fillStyle = '#cc4400';
        ctx.beginPath();
        ctx.moveTo(w * 0.44, h * 0.6);
        ctx.quadraticCurveTo(w * 0.47, h * 0.45, w * 0.5, h * 0.5);
        ctx.quadraticCurveTo(w * 0.53, h * 0.42, w * 0.56, h * 0.6);
        ctx.fill();

        // Mantelpiece
        ctx.fillStyle = '#3d2b1f';
        ctx.fillRect(w * 0.32, h * 0.18, w * 0.36, h * 0.04);

        // Sofa
        ctx.fillStyle = '#2a1a1a';
        ctx.fillRect(w * 0.05, floorY - h * 0.15, w * 0.25, h * 0.15);
        ctx.fillStyle = '#351f1f';
        ctx.fillRect(w * 0.05, floorY - h * 0.2, w * 0.25, h * 0.06);

        // Painting
        ctx.fillStyle = '#4a3b2b';
        ctx.fillRect(w * 0.75, h * 0.15, w * 0.15, h * 0.2);
        ctx.fillStyle = '#2a4a3a';
        ctx.fillRect(w * 0.76, h * 0.165, w * 0.13, h * 0.17);
    }

    _drawStudy(w, h) {
        const ctx = this.ctx;
        // Dark wood study
        ctx.fillStyle = '#1e1812';
        ctx.fillRect(0, 0, w, h);

        // Wood paneling
        ctx.fillStyle = '#241c14';
        for (let i = 0; i < 6; i++) {
            ctx.fillRect(i * w / 6 + 5, h * 0.03, w / 6 - 10, h * 0.6);
        }

        // Floor
        ctx.fillStyle = '#15120d';
        ctx.fillRect(0, h * 0.65, w, h * 0.35);

        // Large desk
        ctx.fillStyle = '#2d1f12';
        ctx.fillRect(w * 0.2, h * 0.5, w * 0.6, h * 0.1);
        ctx.fillRect(w * 0.22, h * 0.6, w * 0.08, h * 0.15);
        ctx.fillRect(w * 0.7, h * 0.6, w * 0.08, h * 0.15);

        // Safe on wall
        ctx.fillStyle = '#444';
        ctx.fillRect(w * 0.08, h * 0.25, w * 0.1, h * 0.15);
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.strokeRect(w * 0.08, h * 0.25, w * 0.1, h * 0.15);
        ctx.fillStyle = '#666';
        ctx.beginPath();
        ctx.arc(w * 0.13, h * 0.325, 8, 0, Math.PI * 2);
        ctx.fill();

        // Globe
        ctx.fillStyle = '#1a3a5c';
        ctx.beginPath();
        ctx.arc(w * 0.82, h * 0.45, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#2a4a6c';
        ctx.stroke();
        ctx.fillStyle = '#2d1f12';
        ctx.fillRect(w * 0.81, h * 0.47, 8, h * 0.13);

        // Scattered papers on desk
        for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.translate(w * 0.35 + i * 35, h * 0.47);
            ctx.rotate((Math.random() - 0.5) * 0.3);
            ctx.fillStyle = '#e8e0d0';
            ctx.fillRect(0, 0, 30, 40);
            ctx.restore();
        }

        // Ink bottle
        ctx.fillStyle = '#1a1a3a';
        ctx.fillRect(w * 0.58, h * 0.46, 12, 16);
    }

    _drawGarden(w, h) {
        const ctx = this.ctx;
        // Night sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.45);
        skyGrad.addColorStop(0, '#080815');
        skyGrad.addColorStop(1, '#151530');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h * 0.45);

        // Stars
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.4 + 0.1})`;
            ctx.fillRect(Math.random() * w, Math.random() * h * 0.35, 1, 1);
        }

        // Grass
        const grassGrad = ctx.createLinearGradient(0, h * 0.4, 0, h);
        grassGrad.addColorStop(0, '#0a1a0a');
        grassGrad.addColorStop(1, '#050f05');
        ctx.fillStyle = grassGrad;
        ctx.fillRect(0, h * 0.4, w, h * 0.6);

        // Path
        ctx.fillStyle = '#1a1815';
        ctx.beginPath();
        ctx.moveTo(w * 0.4, h);
        ctx.quadraticCurveTo(w * 0.35, h * 0.7, w * 0.5, h * 0.5);
        ctx.quadraticCurveTo(w * 0.65, h * 0.65, w * 0.6, h);
        ctx.fill();

        // Hedges
        ctx.fillStyle = '#0a200a';
        ctx.fillRect(w * 0.05, h * 0.45, w * 0.25, h * 0.12);
        ctx.fillRect(w * 0.7, h * 0.45, w * 0.25, h * 0.12);

        // Fountain
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.55, 50, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#444';
        ctx.fillRect(w * 0.49, h * 0.42, 8, h * 0.1);

        // Bench
        ctx.fillStyle = '#2d1f15';
        ctx.fillRect(w * 0.15, h * 0.68, w * 0.12, h * 0.03);
        ctx.fillRect(w * 0.16, h * 0.71, 6, h * 0.05);
        ctx.fillRect(w * 0.24, h * 0.71, 6, h * 0.05);

        // Mansion silhouette in background
        ctx.fillStyle = '#0a0a12';
        ctx.fillRect(w * 0.25, h * 0.15, w * 0.5, h * 0.28);
        ctx.beginPath();
        ctx.moveTo(w * 0.2, h * 0.15);
        ctx.lineTo(w * 0.5, h * 0.05);
        ctx.lineTo(w * 0.8, h * 0.15);
        ctx.fill();
    }

    _drawKitchen(w, h) {
        const ctx = this.ctx;
        // Walls
        ctx.fillStyle = '#22222f';
        ctx.fillRect(0, 0, w, h);

        // Tile backsplash
        ctx.fillStyle = '#282838';
        for (let x = 0; x < w; x += 25) {
            for (let y = h * 0.1; y < h * 0.45; y += 25) {
                ctx.fillRect(x + 1, y + 1, 23, 23);
            }
        }

        // Floor
        ctx.fillStyle = '#1a1a20';
        ctx.fillRect(0, h * 0.65, w, h * 0.35);
        // Tile floor
        for (let x = 0; x < w; x += 50) {
            for (let y = h * 0.65; y < h; y += 50) {
                ctx.fillStyle = (Math.floor(x / 50) + Math.floor(y / 50)) % 2 === 0 ? '#1e1e25' : '#18181f';
                ctx.fillRect(x, y, 50, 50);
            }
        }

        // Counter
        ctx.fillStyle = '#333';
        ctx.fillRect(w * 0.05, h * 0.45, w * 0.4, h * 0.08);
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(w * 0.05, h * 0.53, w * 0.4, h * 0.12);

        // Stove
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(w * 0.55, h * 0.35, w * 0.2, h * 0.3);
        ctx.fillStyle = '#333';
        ctx.fillRect(w * 0.55, h * 0.35, w * 0.2, h * 0.06);
        // Burners
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                ctx.strokeStyle = '#444';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(w * 0.6 + i * w * 0.08, h * 0.38 + j * 15, 8, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Wine bottle
        ctx.fillStyle = '#1a3a1a';
        ctx.fillRect(w * 0.15, h * 0.35, 10, 25);
        ctx.fillRect(w * 0.17, h * 0.32, 4, 8);

        // Knife block
        ctx.fillStyle = '#2d1f15';
        ctx.fillRect(w * 0.32, h * 0.36, 20, 22);
        ctx.fillStyle = '#888';
        ctx.fillRect(w * 0.335, h * 0.3, 2, 12);
        ctx.fillRect(w * 0.34, h * 0.32, 2, 10);
    }

    _drawBedroom(w, h) {
        const ctx = this.ctx;
        // Walls
        ctx.fillStyle = '#22202e';
        ctx.fillRect(0, 0, w, h);

        // Floor
        ctx.fillStyle = '#18161e';
        ctx.fillRect(0, h * 0.65, w, h * 0.35);

        // Bed
        ctx.fillStyle = '#3a2020';
        ctx.fillRect(w * 0.1, h * 0.4, w * 0.45, h * 0.25);
        ctx.fillStyle = '#e8e0d0';
        ctx.fillRect(w * 0.12, h * 0.42, w * 0.41, h * 0.21);
        // Pillow
        ctx.fillStyle = '#d8d0c0';
        ctx.fillRect(w * 0.13, h * 0.43, w * 0.12, h * 0.08);
        // Headboard
        ctx.fillStyle = '#2d1515';
        ctx.fillRect(w * 0.1, h * 0.3, w * 0.45, h * 0.1);

        // Nightstand
        ctx.fillStyle = '#2d1f15';
        ctx.fillRect(w * 0.58, h * 0.48, w * 0.08, h * 0.17);

        // Lamp
        ctx.fillStyle = '#d4a843';
        ctx.beginPath();
        ctx.moveTo(w * 0.6, h * 0.42);
        ctx.lineTo(w * 0.64, h * 0.42);
        ctx.lineTo(w * 0.63, h * 0.48);
        ctx.lineTo(w * 0.61, h * 0.48);
        ctx.closePath();
        ctx.fill();
        const lampGlow = ctx.createRadialGradient(w * 0.62, h * 0.45, 5, w * 0.62, h * 0.45, 80);
        lampGlow.addColorStop(0, 'rgba(212, 168, 67, 0.1)');
        lampGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = lampGlow;
        ctx.fillRect(w * 0.45, h * 0.3, w * 0.35, h * 0.35);

        // Wardrobe
        ctx.fillStyle = '#251c12';
        ctx.fillRect(w * 0.75, h * 0.15, w * 0.18, h * 0.5);
        ctx.strokeStyle = '#1a1208';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.84, h * 0.15);
        ctx.lineTo(w * 0.84, h * 0.65);
        ctx.stroke();

        // Window with curtains
        ctx.fillStyle = '#0a0a1e';
        ctx.fillRect(w * 0.3, h * 0.05, w * 0.15, h * 0.22);
        // Curtains
        ctx.fillStyle = '#3a1525';
        ctx.fillRect(w * 0.27, h * 0.03, w * 0.06, h * 0.27);
        ctx.fillRect(w * 0.42, h * 0.03, w * 0.06, h * 0.27);
    }

    _drawDefaultRoom(w, h) {
        const ctx = this.ctx;
        ctx.fillStyle = '#1e1e2e';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#161622';
        ctx.fillRect(0, h * 0.65, w, h * 0.35);
    }

    _drawVignette(w, h) {
        const ctx = this.ctx;
        const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.7);
        vignette.addColorStop(0, 'transparent');
        vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, w, h);
    }
}

/**
 * Utils.js — Utility functions for the detective game
 */
const Utils = {
    /**
     * Generate a unique ID
     */
    uid() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Clamp value between min and max
     */
    clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    },

    /**
     * Random integer between min and max (inclusive)
     */
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Shuffle array in place (Fisher-Yates)
     */
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    /**
     * Deep clone an object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Wait for ms milliseconds
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Format seconds into M:SS
     */
    formatTime(totalSeconds) {
        const m = Math.floor(totalSeconds / 60);
        const s = Math.floor(totalSeconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    },

    /**
     * Get DOM element by ID (shortcut)
     */
    $(id) {
        return document.getElementById(id);
    },

    /**
     * Query selector shortcut
     */
    $q(selector, parent = document) {
        return parent.querySelector(selector);
    },

    /**
     * Query selector all shortcut
     */
    $qa(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },

    /**
     * Create a DOM element with class names and optional text
     */
    createElement(tag, classNames = '', text = '') {
        const el = document.createElement(tag);
        if (classNames) el.className = classNames;
        if (text) el.textContent = text;
        return el;
    },

    /**
     * Show element
     */
    show(el) {
        if (typeof el === 'string') el = document.getElementById(el);
        if (el) el.style.display = '';
    },

    /**
     * Hide element
     */
    hide(el) {
        if (typeof el === 'string') el = document.getElementById(el);
        if (el) el.style.display = 'none';
    },

    /**
     * Lerp between two values
     */
    lerp(a, b, t) {
        return a + (b - a) * t;
    },

    /**
     * Check if point is inside rectangle
     */
    pointInRect(px, py, rx, ry, rw, rh) {
        return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
    },

    /**
     * Event emitter mixin
     */
    EventEmitter: class {
        constructor() {
            this._listeners = {};
        }

        on(event, callback) {
            if (!this._listeners[event]) this._listeners[event] = [];
            this._listeners[event].push(callback);
            return this;
        }

        off(event, callback) {
            if (!this._listeners[event]) return;
            this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
        }

        emit(event, ...args) {
            if (!this._listeners[event]) return;
            this._listeners[event].forEach(cb => cb(...args));
        }

        once(event, callback) {
            const wrapper = (...args) => {
                callback(...args);
                this.off(event, wrapper);
            };
            this.on(event, wrapper);
        }
    }
};

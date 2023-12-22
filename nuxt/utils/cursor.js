import Tempus from '@studio-freight/tempus';

export default class Cursor {
    constructor(el) {
        this.el = el;
        this.doc = document.documentElement;
        this.linksSelector = '[data-cursor]';
        this.links = this.doc.querySelectorAll(this.linksSelector);
        this.anchor = false;
        this.anchorSource = false;
        this.lastX = 0;
        this.lastY = 0;
        this.movedOnce = false;
        this.anchorFrame = 0;

        this.init();
    }

    init() {
        this.enableDefault();
        this.doc.addEventListener('mousemove', (e) => {
            this.mouseMove(e);
        });

        this.doc.addEventListener('mouseenter', (e) => {
            this.mouseEnter(e);
        }, true);
        this.doc.addEventListener('mouseleave', (e) => {
            this.mouseLeave(e);
        }, true);
        Tempus.add(this.draw.bind(this), 1);
    }

    draw() {
        let x = this.lastX;
        let y = this.lastY;

        if (this.anchor && this.anchorSource) {
            const rect = this.anchor.getBoundingClientRect();
            let ratioX = 0.5;
            let ratioY = 0.5;

            const ratioXStr = parseFloat(this.anchorSource.getAttribute('data-cursor-anchor-x'));
            const ratioYStr = parseFloat(this.anchorSource.getAttribute('data-cursor-anchor-y'));
            let anchorGlue = parseFloat(this.anchorSource.getAttribute('data-cursor-anchor-glue'));

            if (Number.isNaN(anchorGlue)) {
                anchorGlue = 3;
            }

            if (!Number.isNaN(ratioXStr)) {
                ratioX = ratioXStr;
            }

            if (!Number.isNaN(ratioYStr)) {
                ratioY = ratioYStr;
            }
            const anchorPositions = {
                x: rect.x + (rect.width * ratioX),
                y: rect.y + (rect.height * ratioY),
                glue: anchorGlue,
            };

            x = anchorPositions.x + ((x - anchorPositions.x) / anchorPositions.glue);
            y = anchorPositions.y + ((y - anchorPositions.y) / anchorPositions.glue);
        }

        this.el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
        this.el.style.willChange = 'transform';
    }

    mouseMove(e) {
        this.lastX = e.clientX ?? this.lastX;
        this.lastY = e.clientY ?? this.lastY;

        if (!this.movedOnce) {
            this.el.classList.add('transition-opacity', 'duration-1000');
            window.setTimeout(() => {
                this.el.classList.remove('opacity-0');
                window.setTimeout(() => {
                    this.el.classList.remove('transition-opacity');
                    this.el.classList.add('transition');
                }, 10);

                this.movedOnce = true;
            }, 10);
        }
    }

    mouseEnter(e) {
        if (e.target.matches(this.linksSelector)) {
            this.disableDefault();
            this.enableAnchor(e.target);
            this.enableCursorFromTarget(e.target);
            this.enableSize(e.target);
        }
    }

    mouseLeave(e) {
        if (e.target.matches(this.linksSelector)) {
            this.disableAnchor();
            this.disableCursorFromTarget(e.target);
            this.disableSize(e.target);
            this.enableDefault();
        }
    }

    enableSize(el) {
        const scaleStr = el.getAttribute('data-cursor-adjust-scale');
        const wdithStr = el.getAttribute('data-cursor-adjust-width');
        const heightStr = el.getAttribute('data-cursor-adjust-height');
        let sizeTarget = el;

        if (typeof el.getAttribute('data-cursor-adjust') === 'string') {
            sizeTarget = el.querySelector(el.getAttribute('data-cursor-adjust'));
        }

        const rect = sizeTarget.getBoundingClientRect();
        const scaleNum = scaleStr ? parseFloat(scaleStr) : 1;

        if (wdithStr) {
            this.getCursorFromTarget(el).style.width = `${rect.width * scaleNum}px`;
        }
        if (heightStr) {
            this.getCursorFromTarget(el).style.height = `${rect.height * scaleNum}px`;
        }
    }

    disableSize(el) {
        this.getCursorFromTarget(el).style.width = null;
        this.getCursorFromTarget(el).style.height = null;
    }

    enableAnchor(el) {
        if (el.getAttribute('data-cursor-anchor') === 'false') {
            return;
        }

        let anchorTarget = el;
        if (typeof el.getAttribute('data-cursor-anchor') === 'string') {
            anchorTarget = el.querySelector(el.getAttribute('data-cursor-anchor'));
        }
        this.anchorSource = el;
        this.anchor = anchorTarget;
    }

    disableAnchor() {
        this.anchor = false;
        this.anchorSource = false;
    }

    getCursor(str = 'default') {
        return this.doc.querySelector(`.cursor.cursor-${str}`);
    }

    getCursorFromTarget(el) {
        const str = el.getAttribute('data-cursor');
        return this.getCursor(str);
    }

    enableDefault() {
        this.el.classList.add('cursor-has-default');
        this.doc.querySelector('.cursor.cursor-default').classList.remove('cursor-hidden');
    }

    disableDefault() {
        this.el.classList.remove('cursor-has-default');
        this.doc.querySelector('.cursor.cursor-default').classList.add('cursor-hidden');
    }

    enableCursorFromTarget(el) {
        this.disableBrowserCursor();
        this.el.classList.add(`cursor-has-${el.getAttribute('data-cursor')}`);
        this.getCursorFromTarget(el).classList.remove('cursor-hidden');
    }

    enableCursor(str) {
        this.disableBrowserCursor();
        this.el.classList.add(`cursor-has-${str}`);
        this.getCursor(str).classList.remove('cursor-hidden');
    }

    disableCursorFromTarget(el) {
        this.enableBrowserCursor();
        this.el.classList.remove(`cursor-has-${el.getAttribute('data-cursor')}`);
        this.getCursorFromTarget(el).classList.add('cursor-hidden');
    }

    disableCursor(str) {
        this.enableBrowserCursor();
        this.el.classList.remove(`cursor-has-${str}`);
        this.getCursor(str).classList.add('cursor-hidden');
    }

    disableAllCursors() {
        const prefix = 'cursor-has-';
        const regx = new RegExp(`\\b${prefix}.*?\\b`, 'g');
        this.el.className = this.el.className.replace(regx, '');
        const allLabels = this.doc.querySelectorAll('.cursor');
        for (let i = 0; i < allLabels.length; i++) {
            allLabels[i].classList.add('cursor-hidden');
        }
    }

    disableAllSizes() {
        const allLabels = this.doc.querySelectorAll('.cursor');
        for (let i = 0; i < allLabels.length; i++) {
            allLabels[i].style.width = null;
            allLabels[i].style.height = null;
        }
    }

    checkShadowHover() {
        const target = document.elementFromPoint(this.lastX, this.lastY);
        this.disableAll();
        if (target.matches(this.linksSelector)) {
            this.disableBrowserCursor();
            this.enableAnchor(target);
            this.enableCursorFromTarget(target);
            this.enableSize(target);
        }
    }

    disableBrowserCursor() {
        this.doc.classList.add('no-cursor');
    }

    enableBrowserCursor() {
        this.doc.classList.remove('no-cursor');
    }

    disableAll() {
        this.enableBrowserCursor();
        this.disableAnchor();
        this.disableAllCursors();
        this.disableAllSizes();
    }
}

export default function isTouch() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

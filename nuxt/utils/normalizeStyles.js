// export default function normalizeStyles(element, styles, delay = 0) {
export default function normalizeStyles(element, styles) {
    let normalizedStyles = styles;
    let hasHeight = false;

    if (!Array.isArray(normalizedStyles)) {
        normalizedStyles = [styles];
    }

    for (let i = 0, il = normalizedStyles.length; i < il; ++i) {
        const fixedStyle = normalizedStyles[i];
        const styleKeys = Object.keys(fixedStyle);
        for (let j = 0, jl = styleKeys.length; j < jl; ++j) {
            const styleKey = styleKeys[j];
            // if (i === 0) {
            //     normalizedStyles[i].delay = delay;
            // }
            if (styleKey === 'height' && fixedStyle[styleKey] === 'auto') {
                normalizedStyles[i][styleKey] = window.getComputedStyle(element).height;
                hasHeight = true;
            }
        }
    }

    return { normalizedStyles, hasHeight };
}

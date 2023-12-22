const spacings = {};

// Generate all the spacings
// without skipping numbers like the default Tailwind config
// 1 = 0.25rem
let cpt = 200;
while (cpt > 0) {
    spacings[cpt] = `${cpt / 4}rem`;
    cpt -= 1;
}

// Generate spacings for /24 grids
let cpt24 = 24;
while (cpt24 > 0) {
    const key = `${cpt24}/24`;
    spacings[key] = `${((cpt24 / 24) * 100).toFixed(14)}%`;
    cpt24 -= 1;
}

// More z indexes
let cpt200 = 200;
const zIndexes = {};
while (cpt200 > -100) {
    zIndexes[cpt200] = cpt200;
    cpt200 -= 1;
}

module.exports = {
    content: [
        '/components/**/*.{vue,js,ts}',
        '/layouts/**/*.vue',
        '/pages/**/*.vue',
        '/composables/**/*.{js,ts}',
        '/plugins/**/*.{js,ts}',
        '/utils/**/*.{js,ts}',
        '/App.{js,ts,vue}',
        '/app.{js,ts,vue}',
        '/Error.{js,ts,vue}',
        '/error.{js,ts,vue}',
        '/app.config.{js,ts}',
    ],
    theme: {
        extend: {
            screens: {
                '2xl': '1778px',
                '3xl': '1921px',
            },
            fontSize: {
                xxs: ['0.65rem', { lineHeight: '1.5' }],
                xs: ['0.75rem', { lineHeight: '1.5' }],
                sm: ['0.875rem', { lineHeight: '1.5' }],
                base: ['1rem', { lineHeight: '1.5' }],
                lg: ['1.125rem', { lineHeight: '1.4' }],
                xl: ['1.25rem', { lineHeight: '1.4' }],
                '1xl': ['1.375rem', { lineHeight: '1.3' }],
                '2xl': ['1.5rem', { lineHeight: '1.3' }],
                '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
                '4xl': ['2.375rem', { lineHeight: '1.14', letterSpacing: '-0.02em' }],
                '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                '6xl': ['4.0625rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                '8xl': ['5.3125rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                '9xl': ['7.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                '10xl': ['9.0625rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
            },
            colors: {
                neutral: {
                    800: '#333333',
                },
                yellow: {
                    200: '#FFE5A3',
                },
                violet: {
                    300: '#B198C2',
                },
                teal: {
                    600: '#00A38F',
                },
                darkerblue: '#011029',
                darkblue: '#011A43',
                midblue: '#00296C',
                lightblue: '#0047BB',
                verylightblue: '#6498ED',
                gold: '#D6AF65',
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
            transitionDelay: {
                variable: 'var(--tw-transition-delay)',
            },
            transitionTimingFunction: {
                DEFAULT: 'cubic-bezier(.43,.17,.38,1)',
            },
            borderRadius: {
                '3xl': '1.875rem',
                '4xl': '2.5rem',
                '5xl': '3.75rem',
            },
            spacing: {
                ...spacings,
            },
            zIndex: {
                ...zIndexes,
            },
            boxShadow: {
                'inverted-radius-top': '0 -3.75rem 0 var(--tw-shadow-color)',
                'inverted-radius-bottom': '0 3.75rem 0 var(--tw-shadow-color)',
            }
        },
    },
    plugins: [],
};

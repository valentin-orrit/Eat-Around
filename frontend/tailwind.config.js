/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./styles/index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                eablack: '#26150d',
                eabrown: '#462517',
                eaorange: '#f9a705',
                eagreen: '#3c8236',
                eaoffwhite: '#fffcf2',
                eaogreyaccent: '#a0a0a0',
                eaogreymute: '#cccccc',
            },
            fontFamily: {
                palanquin: ['Palanquin', 'sans-serif'],
                palanquinDark: ['Palanquin Dark', 'sans-serif'],
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require('tailwindcss-animate')],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // A hint of De La Salle: deep green with a gold accent.
      colors: {
        lasalle: {
          DEFAULT: '#00693e',
          dark: '#004d2d',
          gold: '#d4a82a',
        },
        // Names the shadcn components already use (bg-primary, etc.).
        primary: { DEFAULT: '#00693e', foreground: '#ffffff' },
        secondary: { DEFAULT: '#e8f3ed', foreground: '#004d2d' },
        destructive: '#dc2626',
        background: '#ffffff',
        foreground: '#0f172a',
        muted: { DEFAULT: '#f1f5f9', foreground: '#64748b' },
        border: '#e2e8f0',
        input: '#cbd5e1',
        ring: '#00693e',
      },
    },
  },
  plugins: [],
};

# tailwind-react-integration

Minimal Vite + React app configured with Tailwind CSS for local testing.

Quick start:

```bash
cd tailwind-react-integration
npm install
npm run dev
```

Notes:

- This project uses the `@tailwindcss/vite` plugin in `vite.config.js` and also includes a `postcss.config.js` fallback. If you prefer the standard `@tailwind` directives, replace `@import "tailwindcss"` in `src/index.css` with `@tailwind base; @tailwind components; @tailwind utilities;` and keep PostCSS.

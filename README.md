# Sebastian Gonzalez · Portfolio

**Español** · [English](#english)

Mi portafolio como desarrollador Full Stack: proyectos, trayectoria, tecnologías y contacto, en español e inglés.

**En línea:** https://sebastiangonzalezportfolio.netlify.app

## Stack

Next.js 16 (exportación estática) · React 19 · TypeScript · Tailwind CSS 4 · Netlify

## Detalles

- El tablero de la portada cae colgado de sus cuerdas, se balancea y queda meciéndose (CSS, respeta `prefers-reduced-motion`).
- Español / inglés con un botón; el idioma elegido se recuerda.
- Las secciones aparecen al hacer scroll con animaciones ligadas al scroll (`animation-timeline: view()`).
- Todos los textos, proyectos y enlaces están en `src/lib/content.ts`.

## Correr en local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera el sitio estático en out/
```

---

<a id="english"></a>

## English

My Full Stack developer portfolio: projects, journey, tech stack and contact, in Spanish and English.

**Live:** https://sebastiangonzalezportfolio.netlify.app

**Stack:** Next.js 16 (static export) · React 19 · TypeScript · Tailwind CSS 4 · Netlify

- The hero board drops in on its ropes, swings and keeps swaying gently (CSS, honours `prefers-reduced-motion`).
- Spanish / English toggle; the chosen language is remembered.
- Sections rise in with scroll-driven animations (`animation-timeline: view()`).
- All texts, projects and links live in `src/lib/content.ts`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes the static site to out/
```

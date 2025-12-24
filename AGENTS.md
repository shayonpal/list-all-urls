# AGENTS.md

## Project Overview
This repository functions as a centralized landing page to list and link to various personal projects and deployments for **Shayon Pal**. It is designed to be a lightweight, fast-loading portfolio page hosted on Cloudflare Pages.

## Tech Stack
- **Core**: HTML5, Vanilla JavaScript (ES Modules), CSS3.
- **Hosting**: Cloudflare Pages.
- **Dependencies**: None. Pure browser-native code.

## Architecture
- **`index.html`**: The main entry point. Contains the skeletal structure (Header, Main Grid, Footer).
- **`script.js`**: Handle DOM manipulation, rendering logic, and search filtering. It dynamically imports data.
- **`projects.js`**: The data source. Exports a default array of project objects (`{ name, description, url, tags }`).
- **`style.css`**: Contains all styling, including responsive grid layouts and animations.

## Development Guidelines for Agents

### 1. Code Style
- **JavaScript**: Use modern ES6+ syntax. Prefer `const`/`let` over `var`. Use arrow functions where appropriate.
- **CSS**: Use CSS Custom Properties (Variables) for colors and spacing to ensure consistency. Maintain the existing responsive design (mobile-first or fluid grids).
- **HTML**: Use semantic tags (`<header>`, `<main>`, `<article>`, `<footer>`).

### 2. Modifying Data
- To add or remove projects, modify **`projects.js`**. Do not hardcode project HTML in `index.html` or `script.js`.
- Ensure strict schema adherence in `projects.js`:
  ```javascript
  {
    name: "Project Name",
    description: "Short description.",
    url: "https://example.com",
    tags: ["Tag1", "Tag2"]
  }
  ```

### 3. No Frameworks
- Do **not** introduce frameworks like React, Vue, or build tools like Webpack/Vite unless explicitly instructed by the user. The goal is to keep this project "build-free" and simple.

### 4. Deployment
- The project is deployed via Cloudflare Pages.
- Ensure `index.html` is always valid and runnable locally via a simple HTTP server (e.g., `python3 -m http.server` or `npx serve`).

## Common Tasks
- **Adding a Project**: Add a new entry to the array in `projects.js`.
- **Updating Styles**: Edit `style.css`. Check for dark/light mode compatibility if applicable.
- **Fixing Logic**: `script.js` contains the search and render logic.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a lightweight, zero-dependency portfolio landing page that lists and links to Shayon Pal's various personal projects and deployments. It's hosted on Cloudflare Pages and designed for fast loading with a clean, modern UI.

**Tech Stack**: HTML5, vanilla JavaScript (ES Modules), CSS3. No frameworks or build tools.

## Architecture

The project has a simple three-file architecture:

- **`index.html`**: Static HTML skeleton with semantic markup (header, main grid, footer). Contains no project data—purely structural.
- **`projects.js`**: The single source of truth for project data. Exports a default array where each project object has `name`, `description`, `url`, and `tags`.
- **`script.js`**: Handles all DOM manipulation, project rendering, and search filtering. Dynamically imports and filters the data from `projects.js`.
- **`style.css`**: All styling, including CSS custom properties for theming, responsive grid layouts, and hover/animation effects.

**Key Design Principles**:
- Projects are defined in one place (`projects.js`) and rendered dynamically by `script.js`.
- CSS Custom Properties (variables) ensure consistent theming across the entire site.
- Responsive design uses fluid grid layouts (`grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`).
- Search filtering is done in-memory on the client side with no external API calls.

## Common Development Tasks

### Adding or Removing Projects

Edit `projects.js` and add/remove items from the array. Strictly follow the schema:

```javascript
{
  name: "Project Name",
  description: "One-line description (keep short).",
  url: "https://example.com",
  tags: ["Tag1", "Tag2"]  // Use existing tags where possible for consistency
}
```

The rendering logic in `script.js` will automatically include the new project in the grid and make it searchable by name, description, or tags.

### Updating Styles

All styling is in `style.css`. Use CSS custom properties (defined in `:root`) for colors and spacing. This ensures consistency and makes theme changes trivial. Test responsive behavior on mobile (max-width: 600px).

### Modifying Search or Rendering Logic

The filtering logic is in the `renderProjects()` function in `script.js`. It filters projects by:
- Partial matches on `name` (case-insensitive)
- Partial matches on `description`
- Tag membership

If search behavior needs to change (e.g., fuzzy matching, different scoring), modify this function.

### Local Testing

Serve the project locally with any static HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve

# Or any other static server (e.g., Ruby, PHP)
```

Open `http://localhost:8000` and verify all projects load, search works, and the site is responsive.

## Code Style & Conventions

**JavaScript**:
- Use ES6+ syntax: `const`/`let` (never `var`), arrow functions, template literals.
- Keep functions small and focused. `renderProjects()` does DOM rendering; search filtering is inline.
- No external dependencies or polyfills.

**CSS**:
- Use CSS custom properties for all colors and key spacing values.
- Use CSS Grid for layout (`display: grid`). Flexbox for component-level layouts.
- Keep media queries at the bottom of the file or co-located with selectors they modify.
- Avoid `!important`; rely on specificity and cascading order.

**HTML**:
- Use semantic tags: `<header>`, `<main>`, `<article>`, `<footer>`.
- Avoid inline styles; all styling lives in `style.css`.
- Keep the structure minimal and let JavaScript populate dynamic content.

## Deployment

The site is deployed via **Cloudflare Pages** and is hosted at:
- **Primary**: `list.uberfolks.ca`
- **Pages domain**: `list-all-urls.pages.dev`

**Deployment Process**:

After making changes, deploy to Cloudflare Pages using wrangler:

```bash
wrangler pages deploy . --project-name=list-all-urls
```

This uploads all files to Cloudflare Pages and creates a new deployment. The `.wrangler` directory stores local Cloudflare configuration and should not be committed.

**Pre-deployment Checklist**:
1. Test locally with a static HTTP server (`python3 -m http.server` or `npx serve`)
2. Verify all projects display correctly in the grid
3. Test search functionality across different browsers/devices
4. Ensure responsive behavior on mobile (max-width: 600px)
5. Commit changes to git and push to `origin/main`
6. Run `wrangler pages deploy` from the repository root

**Important**: The entire site must work as a static HTML + JS bundle with no build step. Do not add frameworks, build tools, or external dependencies.

## Modifying the Project Data or Adding Features

**Before adding features**:
- Remember: No frameworks, no build tools. Keep it build-free.
- Any new feature must work in vanilla JavaScript without external libraries.
- If you're tempted to add a build step or framework, reconsider the requirement.

**Example**: To add a "favorite projects" feature, store favorites in `localStorage` and update `renderProjects()` to sort or highlight them. No npm packages needed.

## Resources

- **AGENTS.md**: Development guidelines for agents. Covers code style, schema adherence, and the no-frameworks principle.
- **Git History**: Recent changes documented in commit messages (e.g., "Update projects list and add AGENTS.md").

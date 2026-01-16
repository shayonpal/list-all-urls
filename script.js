import projects from './projects.js';
import mcpServers from './mcp-servers.js';

const projectsGrid = document.getElementById('projectsGrid');
const mcpGrid = document.getElementById('mcpGrid');
const searchInput = document.getElementById('searchInput');

function renderProjects(filter = '') {
    projectsGrid.innerHTML = '';
    const term = filter.toLowerCase();

    const filteredProjects = projects.filter(project => {
        return project.name.toLowerCase().includes(term) ||
            project.description.toLowerCase().includes(term) ||
            project.tags.some(tag => tag.toLowerCase().includes(term));
    });

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No projects found matching your search.</p>';
        return;
    }

    filteredProjects.forEach((project, index) => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
        card.style.opacity = '0'; // For animation

        const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="card-header">
                <h2 class="project-name">${project.name}</h2>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="card-footer">
                <div class="tags">${tagsHtml}</div>
                <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="visit-btn">Visit Site</a>
            </div>
        `;

        projectsGrid.appendChild(card);
    });
}

function renderMcpServers(filter = '') {
    mcpGrid.innerHTML = '';
    const term = filter.toLowerCase();

    const filteredServers = mcpServers.filter(server => {
        return server.name.toLowerCase().includes(term) ||
            server.description.toLowerCase().includes(term) ||
            server.tools.some(tool => tool.toLowerCase().includes(term));
    });

    if (filteredServers.length === 0) {
        mcpGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No MCP servers found matching your search.</p>';
        return;
    }

    filteredServers.forEach((server, index) => {
        const card = document.createElement('article');
        card.className = 'mcp-card';
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
        card.style.opacity = '0';

        const urlHtml = server.url
            ? `<div class="mcp-url">
                <span class="url-text">${server.url}</span>
                <button class="copy-btn" data-copy="${server.url}" title="Copy URL">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
               </div>`
            : '';

        const configJson = JSON.stringify(server.config, null, 2);

        card.innerHTML = `
            <div class="mcp-card-header">
                <h3 class="mcp-name">${server.name}</h3>
                <button class="expand-btn" aria-expanded="false" title="Expand">
                    <svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            </div>
            <p class="mcp-description">${server.description}</p>
            <div class="mcp-badges">
                <span class="transport-badge transport-${server.transport}">${server.transport.toUpperCase()}</span>
                <span class="host-badge">${server.host}</span>
            </div>
            ${urlHtml}
            <div class="mcp-details">
                <div class="mcp-tools">
                    <div class="tools-header">Tools (${server.tools.length}):</div>
                    <div class="tools-list">${server.tools.join(', ')}</div>
                </div>
                <div class="mcp-config">
                    <div class="config-header">
                        <span>Config:</span>
                        <button class="copy-btn" data-copy='${configJson}' title="Copy config">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                    <pre class="config-code">${configJson}</pre>
                </div>
            </div>
        `;

        // Toggle expand/collapse
        const expandBtn = card.querySelector('.expand-btn');
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = card.classList.toggle('expanded');
            expandBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Copy button handlers
        card.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = btn.getAttribute('data-copy');
                navigator.clipboard.writeText(text).then(() => {
                    btn.classList.add('copied');
                    setTimeout(() => btn.classList.remove('copied'), 1500);
                });
            });
        });

        mcpGrid.appendChild(card);
    });
}

// Add simple fade-in keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);

// Render both sections
function render(filter = '') {
    renderProjects(filter);
    renderMcpServers(filter);
}

// Initial render
render();

// Search event listener
searchInput.addEventListener('input', (e) => {
    render(e.target.value);
});

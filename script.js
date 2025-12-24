import projects from './projects.js';

const projectsGrid = document.getElementById('projectsGrid');
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

// Add simple fade-in keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);

// Initial render
renderProjects();

// Search event listener
searchInput.addEventListener('input', (e) => {
    renderProjects(e.target.value);
});

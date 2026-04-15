// Mini-implementazione dashboard.
class ProjectDashboard {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadProjects();
    }

    bindEvents() {
        // Cerca
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterProjects(e.target.value);
        });

        // Aggiorna
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.loadProjects();
        });
    }

    async loadProjects() {
        try {
            this.showLoading(true);
            this.hideError();
            
            const response = await fetch('/project');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.projects = await response.json();
            this.filteredProjects = [...this.projects];
            this.renderProjects();
            
        } catch (error) {
            console.error('Error loading projects:', error);
            this.showError(error.message);
        } finally {
            this.showLoading(false);
        }
    }

    filterProjects(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        // Se ricerca vuota non far nulla.
        if (term === '') {
            this.filteredProjects = [...this.projects];
        } else {
            // Altrimenti filtra su Number o Description (non ID Database).
            this.filteredProjects = this.projects.filter(project => 
                project.NUMBER.toLowerCase().includes(term) ||
                project.DESCRIPTION.toLowerCase().includes(term)
            );
        }
        
        this.renderProjects();
    }

    renderProjects() {
        const tableBody = document.getElementById('projectsTableBody');
        const emptyState = document.getElementById('emptyState');
        const projectsTable = document.getElementById('projectsTable');
        
        // Cancella il contenuto precedente.
        tableBody.innerHTML = '';
        
        if (this.filteredProjects.length === 0) {
            projectsTable.classList.add('d-none');
            emptyState.classList.remove('d-none');
            return;
        }
        
        projectsTable.classList.remove('d-none');
        emptyState.classList.add('d-none');
        
        this.filteredProjects.forEach(project => {
            const row = this.createProjectRow(project);
            tableBody.appendChild(row);
        });
        
        // Aggiungi animazione di fade-in minima
        tableBody.classList.add('fade-in');
    }

    createProjectRow(project) {
        const row = document.createElement('tr');
        row.className = 'slide-in';
        row.addEventListener('click', () => {
            window.location.href = `project-detail.html?id=${project.ID}`;
        });
        
        const creationDate = formatDate(project.CREATION_DATE);
        
        row.innerHTML = `
            <td>
                <strong>${escapeHtml(project.NUMBER || 'N/A')}</strong>
            </td>
            <td>${escapeHtml(project.DESCRIPTION || 'No description')}</td>
            <td>
                <span class="badge bg-info text-dark">
                    ${formatFloatToHours(project.EXP_HOURS)}h
                </span>
            </td>
            <td>${creationDate}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation()">
                    <i class="bi bi-eye"></i> View Details
                </button>
            </td>
        `;
        
        return row;
    }

    showLoading(show) {
        showLoadingUtil(show, 'loadingIndicator', ['projectsTable']);
    }

    showError(message) {
        showError(message, 'errorAlert', 'errorMessage', ['projectsTable', 'loadingIndicator']);
    }

    hideError() {
        hideError('errorAlert');
    }

}

// Inizializza la dashboard quando la pagina viene caricata.
document.addEventListener('DOMContentLoaded', () => {
    new ProjectDashboard();
});

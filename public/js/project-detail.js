// Implementazione pagina dettaglio progetti.
class ProjectDetail {
    constructor() {
        this.projectId = getProjectIdFromUrl();
        this.projectData = null;
        this.hoursData = null;
        this.init();
    }

    init() {
        if (!this.projectId) {
            this.showError('Errore. Nessun ID Progetto fornito.');
            return;
        }
        
        this.loadProjectDetails();
        this.loadHoursData();
        this.loadProperDerivedHours();
        this.loadContributorsData();
        this.setupContributorFilters();
    }


    // Carica dettagli progetto tramite API
    async loadProjectDetails() {
        try {
            this.showLoading(true);
            this.hideError();
            
            const response = await fetch(`/project/${this.projectId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.projectData = await response.json();
            this.renderProjectDetails();
            this.renderReports();
            this.renderHoursComparison();
            
        } catch (error) {
            console.error('Error loading project details:', error);
            this.showError(error.message);
        } finally {
            this.showLoading(false);
        }
    }

    async loadHoursData() {
        try {
            const response = await fetch(`/project/${this.projectId}/hours`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.hoursData = await response.json();
            this.renderHoursComparison();
            
        } catch (error) {
            // Eseguo log su console per errori.
            console.error('Error loading hours data:', error);
        }
    }

    async loadProperDerivedHours() {
        try {
            const response = await fetch(`/project/${this.projectId}/proper-derived`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.renderProperDerivedHours(data);
            
        } catch (error) {
            console.error('Error loading proper/derived hours data:', error);
        }
    }

    async loadContributorsData(filters = {}) {
        try {
            // Genero query per backend dai filtri.
            const queryParams = new URLSearchParams();
            
            if (filters.scope) {
                queryParams.append('scope', filters.scope);
            }
            if (filters.month) {
                queryParams.append('month', filters.month);
            }
            if (filters.startDate) {
                queryParams.append('startDate', filters.startDate);
            }
            if (filters.endDate) {
                queryParams.append('endDate', filters.endDate);
            }
            
            const queryString = queryParams.toString();
            const url = `/project/${this.projectId}/contributors${queryString ? '?' + queryString : ''}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.contributorsData = data;
            this.populateMonthFilter(data.availableMonths);
            // Contributors section will be available when completed.
            //this.renderContributors();
            //this.showContributorsSection();
            
        } catch (error) {
            console.error('Error loading contributors data:', error);
        }
    }

    setupContributorFilters() {
        const monthFilter = document.getElementById('monthFilter');
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        const projectScope = document.getElementById('projectScope');
        
        if (monthFilter) {
            monthFilter.addEventListener('change', async () => await this.filterContributors());
        }
        if (startDate) {
            startDate.addEventListener('change', async () => await this.filterContributors());
        }
        if (endDate) {
            endDate.addEventListener('change', async () => await this.filterContributors());
        }
        if (projectScope) {
            projectScope.addEventListener('change', async () => await this.filterContributors());
        }
    }

    populateMonthFilter(months) {
        const monthFilter = document.getElementById('monthFilter');
        if (!monthFilter || !months) return;
        
        monthFilter.innerHTML = '<option value="">All Months</option>';
        months.forEach(month => {
            const option = document.createElement('option');
            option.value = month.value;
            option.textContent = month.label;
            monthFilter.appendChild(option);
        });
    }

    async filterContributors() {
        const monthFilter = document.getElementById('monthFilter').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const projectScope = document.getElementById('projectScope').value;
        
        // Genero oggetto per i filtri.
        const filters = {};
        
        if (monthFilter) filters.month = monthFilter;
        if (startDate) filters.startDate = startDate;
        if (endDate) filters.endDate = endDate;
        if (projectScope) filters.scope = projectScope;
        
        // Ricarico i dati dal backend con i nuovi filtri.
        await this.loadContributorsData(filters);
    }

    formatHoursFromMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours}:${mins.toString().padStart(2, '0')}`;
    }

    renderContributors() {
        const contributors = this.contributorsData.contributors || [];
        this.renderContributorsTable(contributors);
    }

    renderContributorsTable(contributors) {
        const tableBody = document.getElementById('contributorsTableBody');
        const noContributorsState = document.getElementById('noContributorsState');
        
        tableBody.innerHTML = '';
        
        if (contributors.length === 0) {
            noContributorsState.classList.remove('d-none');
            return;
        }
        
        noContributorsState.classList.add('d-none');
        
        contributors.forEach(contributor => {
            const row = this.createContributorRow(contributor);
            tableBody.appendChild(row);
        });
    }

    // Genera le righe per la tabella dei collaboratori
    createContributorRow(contributor) {
        const row = document.createElement('tr');
        row.className = 'slide-in';
        
        row.innerHTML = `
            <td>${contributor.fullName || 'N/A'}</td>
            <td>${contributor.averageHours || '0:00'}</td>
            <td>${contributor.totalHours || '0:00'}</td>
            <td>${contributor.reportCount || 0}</td>
        `;
        
        return row;
    }

    // Mostra/Nascondi sezione collaboratori
    showContributorsSection() {
        const contributorsSection = document.getElementById('contributorsSection');
        contributorsSection.classList.remove('d-none');
        contributorsSection.classList.add('fade-in');
    }

    // Mostra ore proprie e derivate
    renderProperDerivedHours(data) {
        if (!data) return;
        
        const properHours = data.proper?.hours_sum || '0:00';
        const derivedHours = data.derived?.derived_hours || '0:00';
        
        document.getElementById('properHoursDisplay').textContent = properHours;
        document.getElementById('derivedHoursDisplay').textContent = derivedHours;
    }

    // Mostra dettagli progetto
    renderProjectDetails() {
        // Verifico dati progetto esistenti.
        if (!this.projectData || !this.projectData.projectDetails) {
            return;
        }
        const project = this.projectData.projectDetails;
        if (!project) return;

        // Aggiorno Header.
        document.getElementById('projectNumber').textContent = `Project ${project.NUMBER || 'N/A'}`;
        
        // Aggiorno dettagli progetto.
        document.getElementById('detailProjectNumber').textContent = project.NUMBER || 'N/A';
        document.getElementById('detailDescription').textContent = project.DESCRIPTION || 'No description';
        document.getElementById('detailExpectedHours').textContent = `${formatFloatToHours(project.EXP_HOURS)}h`;

        const startDate = project.EXP_DATE_START ? 
            formatDate(project.EXP_DATE_START) : 'Not set';
        const endDate = project.EXP_DATE_END ? 
            formatDate(project.EXP_DATE_END) : 'Not set';
        const creationDate = formatDate(project.CREATION_DATE);
        
        document.getElementById('detailStartDate').textContent = startDate;
        document.getElementById('detailEndDate').textContent = endDate;
        document.getElementById('detailCreationDate').textContent = creationDate;

        // Mostra la sezione una volta caricati i dati.
        document.getElementById('projectDetailsSection').classList.remove('d-none');
        document.getElementById('projectDetailsSection').classList.add('fade-in');
    }

    // Confronta ore previste con ore effettive.
    renderHoursComparison() {

        if (!this.hoursData || !this.projectData) {
            return;
        }

        const project = this.projectData.projectDetails;
        const expectedHours = formatFloatToHours(project.EXP_HOURS) || 0;
        const expectedHoursFloat = parseFloat(project.EXP_HOURS) || 0;
        const actualHours = this.hoursData.hours_sum || 0;
        const actualHoursFloat = formatHoursToFloat(this.hoursData.hours_sum) || 0;

        // Aggiorna UI
        document.getElementById('expectedHoursDisplay').textContent = `${expectedHours}h`;
        document.getElementById('actualHoursDisplay').textContent = `${actualHours}h`;

        // Calcola percentuali
        const expectedPercentage = expectedHoursFloat > 0 ? 100 : 0;
        const actualPercentage = expectedHoursFloat > 0 ? (actualHoursFloat / expectedHoursFloat) * 100 : 0;

        // Aggiorna progress bar
        updateProgressBar('expected', expectedPercentage, 'bg-info');
        updateProgressBar('actual', actualPercentage, getProgressColor(actualPercentage));

        // Aggiorna stato
        this.updateHoursStatus(expectedHours, expectedPercentage, actualHours, actualPercentage);
    }



    updateHoursStatus(expected, expectedPercentage, actual, actualPercentage) {
        const statusAlert = document.getElementById('hoursStatusAlert');
        const statusText = document.getElementById('hoursStatusText');
        
        if (expected === 0) {
            statusAlert.className = 'alert alert-secondary';
            statusText.textContent = 'Nessuna stima oraria effettuata';
        } else if (actualPercentage <= expectedPercentage * 0.8) {
            statusAlert.className = 'alert alert-success';
            statusText.textContent = `A regime: ${actual}h usate rispetto a ${expected}h attese (${actualPercentage.toFixed(1)}%)`;
        } else if (actualPercentage <= expectedPercentage) {
            statusAlert.className = 'alert alert-warning';
            statusText.textContent = `vicino al limite: ${actual}h usate rispetto a ${expected}h attese (${actualPercentage.toFixed(1)}%)`;
        } else {
            statusAlert.className = 'alert alert-danger';
            statusText.textContent = `Oltre il budget: ${actual}h usate rispetto a ${expected}h attese (${actualPercentage.toFixed(1)}%)`;
        }
    }

    renderReports() {
        if (!this.projectData || !this.projectData.projectReports) {
            return;
        }

        const reports = this.projectData.projectReports;
        const reportsTableBody = document.getElementById('reportsTableBody');
        const noReportsState = document.getElementById('noReportsState');
        const reportsSection = document.getElementById('reportsSection');

        // Pulisci contenuto esistente
        reportsTableBody.innerHTML = '';

        if (reports.length === 0) {
            reportsSection.classList.remove('d-none');
            noReportsState.classList.remove('d-none');
            return;
        }

        reportsSection.classList.remove('d-none');
        noReportsState.classList.add('d-none');

        reports.forEach(report => {
            const row = this.createReportRow(report);
            reportsTableBody.appendChild(row);
        });

        // Aggiungi animazione fade-in
        reportsSection.classList.add('fade-in');
    }

    createReportRow(report) {
        const row = document.createElement('tr');
        row.className = 'slide-in';

        row.innerHTML = `
            <td>${report.ID || 'N/A'}</td>
            <td>${formatDate(report.DATE || 'N/A')}</td>
            <td>${report.HOUR_START}</td>
            <td>${report.HOUR_END}</td>
            <td>
                <span class="badge bg-secondary">${report.DURATION}</span>
            </td>
            <td>${report.FK_PROJECT || 'N/A'}</td>
        `;

        return row;
    }

    showLoading(show) {
        showLoadingUtil(show, 'loadingIndicator', ['projectDetailsSection', 'reportsSection']);
    }

    showError(message) {
        showError(message, 'errorAlert', 'errorMessage', ['loadingIndicator', 'projectDetailsSection', 'reportsSection']);
    }

    hideError() {
        hideError('errorAlert');
    }
}

// Inizializza la pagina di dettaglio progetto quando la pagina viene caricata
document.addEventListener('DOMContentLoaded', () => {
    const projectDetail = new ProjectDetail();
    
    // Aggiungi event listener per il toggle del collapse (reports)
    const reportsCollapse = document.getElementById('reportsCollapse');
    const reportsToggleIcon = document.getElementById('reportsToggleIcon');
    
    if (reportsCollapse && reportsToggleIcon) {
        reportsCollapse.addEventListener('show.bs.collapse', () => {
            reportsToggleIcon.className = 'bi bi-chevron-up';
        });
        
        reportsCollapse.addEventListener('hide.bs.collapse', () => {
            reportsToggleIcon.className = 'bi bi-chevron-down';
        });
    }
    
    // Aggiungi event listener per il toggle del collapse (contributors)
    const contributorsCollapse = document.getElementById('contributorsCollapse');
    const contributorsToggleIcon = document.getElementById('contributorsToggleIcon');
    
    if (contributorsCollapse && contributorsToggleIcon) {
        contributorsCollapse.addEventListener('show.bs.collapse', () => {
            contributorsToggleIcon.className = 'bi bi-chevron-up';
        });
        
        contributorsCollapse.addEventListener('hide.bs.collapse', () => {
            contributorsToggleIcon.className = 'bi bi-chevron-down';
        });
    }
});

// Funzioni di utility per il Frontend.

/**
 * Formatta un numero in ore e minuti (hh:mm)
 * @param {number} floatHours - Numero in ore da formattare.
 * @returns {string} Ore e minuti formattati.
 */
function formatFloatToHours(floatHours) {
    // Converti il float in ore e minuti
    const hours = Math.floor(floatHours);
    const minutes = Math.round((floatHours - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Formatta orario in float
 * @param {string|number} hours - Valore orario da formattare.
 * @returns {string} Ore formattate in float.
 */
function formatHoursToFloat(hours) {
    // Se è una stringa, la formatta come orario
    if(typeof hours === 'string') {
        // Estraggo la prima parte prima dei due punti
        const parts = hours.split(':');
        // Ritorno un float, dato dalla prima parte in ore
        // e la seconda parte data da minuti / 60
        return (parseFloat(parts[0]) + (parseFloat(parts[1]) / 60)).toFixed(2);
    }
    // Se è un numero, lo formatta direttamente
    const hoursNum = parseFloat(hours) || 0;
    return hoursNum.toFixed(2);
}

/**
 * Formatta una data in formato DD/MM/YYYY HH:mm (CET)
 * @param {string|Date} dateString - Data da formattare.
 * @returns {string} Data formattata o 'N/A' se non valida.
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    
    // Formatta come DD/MM/YYYY HH:mm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Effettua escaping HTML per prevenire attacchi XSS
 * @param {string} text - Testo su cui fare escape.
 * @returns {string} ritorna HTML.
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Mostra indicatore di caricamento e nasconde il contenuto
 * @param {boolean} show - Mostra/Nascondi caricamento
 * @param {string} loadingId - ID dell'elemento di caricamento
 * @param {string[]} contentIds - ID degli elementi di contenuto da nascondere
 */
function showLoadingUtil(show, loadingId, contentIds = []) {
    const loadingIndicator = document.getElementById(loadingId);
    
    if (show) {
        loadingIndicator?.classList.remove('d-none');
        contentIds.forEach(id => {
            const element = document.getElementById(id);
            element?.classList.add('d-none');
        });
    } else {
        loadingIndicator?.classList.add('d-none');
    }
}

/**
 * Mostra messaggio di errore
 * @param {string} message - Messaggio di errore da mostrare
 * @param {string} errorId - ID elemento Alert legato all'errore
 * @param {string} messageId - ID elemento Message legato all'errore
 * @param {string[]} hideIds - ID degli elementi da nascondere quando c'è un errore
 */
function showError(message, errorId = 'errorAlert', messageId = 'errorMessage', hideIds = []) {
    const errorAlert = document.getElementById(errorId);
    const errorMessage = document.getElementById(messageId);
    
    if (errorMessage) {
        errorMessage.textContent = message;
    }
    errorAlert?.classList.remove('d-none');
    
    hideIds.forEach(id => {
        const element = document.getElementById(id);
        element?.classList.add('d-none');
    });
}

/**
 * Nasconde messaggi di errore
 * @param {string} errorId - ID elemento Alert legato all'errore
 */
function hideError(errorId = 'errorAlert') {
    const errorAlert = document.getElementById(errorId);
    errorAlert?.classList.add('d-none');
}

/**
 * Ottiene l'ID del progetto dagli URL parameters
 * @returns {string|null} ID del progetto dall'URL
 */
function getProjectIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Ottiene il colore della barra di progresso in base alla percentuale
 * Al momento molto basico, seguendo direttive di Bootstrap
 * bg-success se sotto 80%, bg-warning se tra 80% e 100%, bg-danger se oltre il 100%
 * @param {number} percentage - Valore percentuale
 * @returns {string} Classe di bootstrap per il colore
 */
function getProgressColor(percentage) {
    if (percentage <= 80) return 'bg-success';
    if (percentage <= 100) return 'bg-warning';
    return 'bg-danger';
}

/**
 * Aggiorna una progress bar (riutilizzata in diverse pagine)
 * @param {string} type - Tipo progress bar
 * @param {number} percentage - Percentuale da mostrare
 * @param {string} colorClass - Classe di bootstrap per il colore
 */
function updateProgressBar(type, percentage, colorClass) {
    const progressBar = document.getElementById(`${type}ProgressBar`);
    const progressText = document.getElementById(`${type}ProgressText`);
    
    if (progressBar) {
        progressBar.style.width = `${Math.min(percentage, 100)}%`;
        progressBar.className = `progress-bar ${colorClass}`;
    }
    
    if (progressText) {
        progressText.textContent = `${percentage.toFixed(1)}%`;
    }
}

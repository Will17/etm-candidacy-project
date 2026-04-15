import db from "../database/db";
import { emptyOrRows, emptyOrRow } from "../helper/helper";
import reportController from "./report";

// In questo file vengono definite tutte le funzioni utilizzate
// per interagire con il database, come specificato nei requisiti del progetto.

async function getAllProjects(): Promise<Object> {
  const query = `
    SELECT ID, NUMBER, DESCRIPTION, EXP_HOURS, CREATION_DATE FROM projects ORDER BY CREATION_DATE DESC;
  `;
  const rows = await db.query(query, []);
  return emptyOrRows(rows);
}

async function getProjectDetails(projectID: number): Promise<Object> {
  const query = `
    SELECT ID, NUMBER, DESCRIPTION, EXP_DATE_START, EXP_DATE_END, EXP_HOURS, CREATION_DATE FROM projects WHERE ID = ? LIMIT 1;
  `;
  const projectDetailsCall = await db.query(query, [projectID]);

  const projectDetails = emptyOrRow(projectDetailsCall);

  const projectReports = await reportController.getProjectReportsTree(projectID);

  return {
    projectDetails,
    projectReports
  };
}

// Aggiunta una funzione di ricerca per numero di progetto, per identificazione umana
// invece di usare l'ID proposto dal database.
async function getProjectDetailsByNumber(projectNumber: string): Promise<Object> {
  const query = `
    SELECT NUMBER, DESCRIPTION, EXP_DATE_START, EXP_DATE_END, EXP_HOURS, CREATION_DATE FROM projects WHERE NUMBER = ? LIMIT 1;
  `;
  const rows = await db.query(query, [projectNumber]);
  return emptyOrRow(rows);
}

// Funzione ricorsiva per ottenere l'albero dei progetti
// a partire da un singolo progetto (ID) come input.
async function getProjectTree(projectID: number): Promise<Object> {
  const query = `
    WITH RECURSIVE Project_Tree AS (
        # Membro principale (root)
        SELECT ID, NUMBER, DESCRIPTION, 0 as LEVEL
        FROM projects as p1
        WHERE p1.ID = ?
        
        UNION ALL
        
        # Membro figlio (dal secondo in poi ricorsivamente)
        SELECT p2.ID, p2.NUMBER, p2.DESCRIPTION, Project_Tree.LEVEL + 1
        FROM projects as p2
        INNER JOIN Project_Tree ON p2.FK_PROJECT = Project_Tree.ID
    )
    SELECT * 
    FROM Project_Tree;
  `;
  const rows = await db.query(query, [projectID]);
  return emptyOrRows(rows);
}

// Funzione per ottenere tutti i progetti principali (quelli che non hanno un progetto padre)
async function getAllMainProjects(): Promise<any[]> {
  const selectQuery = `
    SELECT 
      ID,
      NUMBER,
      DESCRIPTION
    FROM projects
    WHERE FK_PROJECT IS NULL;
  `;
  const rows = await db.query(selectQuery, []);
  return emptyOrRows(rows);
}

// Funzione ricorsiva per ottenere tutti gli ID dei progetti DERIVATI
// a partire da un singolo progetto (ID) come input.
async function getDerivedProjectIds(projectID: number): Promise<number[]> {
  const selectQuery = `
    WITH RECURSIVE Project_Tree AS (
      # Primo membro: progetto principale
      SELECT ID, NUMBER, DESCRIPTION, 0 as LEVEL
      FROM projects
      WHERE ID = ?
      
      UNION ALL
      
      # Membro figlio (dal secondo in poi ricorsivamente)
      SELECT p2.ID, p2.NUMBER, p2.DESCRIPTION, Project_Tree.LEVEL + 1
      FROM projects as p2
      INNER JOIN Project_Tree ON p2.FK_PROJECT = Project_Tree.ID
    )
    SELECT ID FROM Project_Tree WHERE ID != ?;
  `;
  const rows = await db.query(selectQuery, [projectID, projectID]);
  return emptyOrRows(rows);
}

// Funzione per trovare l'ID del progetto padre di un progetto derivato
// a partire da un singolo progetto (ID) come input.
async function findAncestorProjectID(projectID: number): Promise<number | null> {
  // 1. Ottieni tutti i progetti principali
  const mainProjects = await getAllMainProjects();
  let ancestorProjectID: number | null = null;

  // 2. Per ogni progetto principale, ottieni i suoi progetti derivati
  for (const mainProject of mainProjects) {
    const derivedProjectIds = await getDerivedProjectIds(mainProject.ID);
    
    // 3. Controlla se il progetto cercato fa parte dei derivati.
    const found = derivedProjectIds.map((obj: any)=> obj.ID).includes(projectID);
    if (found) {
      ancestorProjectID = mainProject.ID;
      break;
    }
  }

  return ancestorProjectID;
}

// Filtro contributi dati dagli utenti
// in base a mese, data di inizio, data di fine e scope (task o progetto)
interface ContributorFilters {
  month?: string;
  startDate?: string;
  endDate?: string;
  scope?: 'current' | 'single';
}

export default {
  getAllProjects,
  getProjectDetails,
  getProjectDetailsByNumber,
  getProjectTree,
  getAllMainProjects,
  getDerivedProjectIds,
  findAncestorProjectID
};
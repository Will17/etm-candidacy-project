import db from "../database/db";
import { emptyOrRows, emptyOrRow } from "../helper/helper";

/// In questo file sono definite tutte le funzioni usate per interagire
/// con il database, come specificato nei requisiti del report.

async function getProjectReportsTree(projectID: number): Promise<Object> {
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
    SELECT 
      r.ID, 
      r.DATE, 
      r.HOUR_START, 
      r.HOUR_END, 
      # Mostro la durata in formato HH:MM
      CONCAT(
        FLOOR(
          TIMESTAMPDIFF(MINUTE, r.HOUR_START, r.HOUR_END) / 60
        ),
        ':',
        LPAD(
          TIMESTAMPDIFF(MINUTE, r.HOUR_START, r.HOUR_END) % 60,
          2,
          '0'
        )
      ) as DURATION,
      r.FK_PROJECT 
    FROM reports as r 
    WHERE r.FK_PROJECT IN 
    # Acquisisco tutti gli ID dal Project_Tree creato.
    (Select ID from Project_Tree);
  `;
  const rows = await db.query(query, [projectID]);
  return emptyOrRows(rows);
}

async function calculateProjectHoursTotal(projectID: number): Promise<Object> {
  const selectQuery = `
    
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
    # Divido minuti per le ore, poi faccio modulo e concateno con ":"
    # in questo modo avrò il formato hh:mm (mm avrà sempre 2 cifre da funzione ROUND(num,2))
    SELECT CONCAT(FLOOR(SUM(minutes_sum) / 60), ':', ROUND(MOD(SUM(minutes_sum),60),2)) as hours_sum 
    FROM (
      SELECT SUM(TIMESTAMPDIFF(MINUTE, r.HOUR_START, r.HOUR_END)) as minutes_sum
      FROM reports as r 
      WHERE r.FK_PROJECT IN 
      # Acquisisco tutti gli ID dal Project_Tree creato.
      (Select ID from Project_Tree)
      GROUP BY r.FK_PROJECT
    )
    as Project_Tree_Hours_Report;
  `;
  const rows = await db.query(selectQuery, [projectID]);
  return emptyOrRow(rows);

}

async function getProperProjectHours(projectID: number): Promise<Object> {
  const selectQuery = `
    SELECT CONCAT(FLOOR(SUM(minutes_sum) / 60), ':', LPAD(MOD(SUM(minutes_sum),60),2,'0')) as hours_sum 
    FROM (
      SELECT SUM(TIMESTAMPDIFF(MINUTE, r.HOUR_START, r.HOUR_END)) as minutes_sum
      FROM reports as r 
      WHERE r.FK_PROJECT = ?
      GROUP BY r.FK_PROJECT
    )
    as Project_Hours_Report;
  `;
  const rows = await db.query(selectQuery, [projectID]);
  return emptyOrRow(rows);
}

async function getDerivedProjectHours(projectID: number): Promise<Object> {
  const selectQuery = `
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
      # Poi divido minuti in ore e concateno per
      # poterli rappresentare come hh:mm.
      SELECT CONCAT(
              FLOOR(SUM(derived_minutes) / 60),
              ':',
              LPAD(SUM(derived_minutes) % 60,2,'0')
            ) as derived_hours
      FROM 
      (
          # Seleziono tutti i report derivati diversi dal progetto principale
          # e calcolo la somma dei minuti.
          SELECT r.FK_PROJECT as ID, SUM(TIMESTAMPDIFF(MINUTE,HOUR_START, HOUR_END)) as derived_minutes FROM reports as r
          WHERE r.FK_PROJECT IN (SELECT ID FROM Project_Tree WHERE ID != ?)
          GROUP BY r.FK_PROJECT
      ) as derived_report_minutes;
  `;
  const rows = await db.query(selectQuery, [projectID, projectID]);
  return emptyOrRow(rows);

}

export default {
  getProjectReportsTree,
  calculateProjectHoursTotal,
  getProperProjectHours,
  getDerivedProjectHours
};
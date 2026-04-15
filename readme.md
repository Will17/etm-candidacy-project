Richieste del progetto:

calcolo delle ore EFFETTIVE di un albero di progetto (progetto + sottoprogetti). queste sono rilevate tramite rapportini (tabella report).

Si vuole realizzare una procedura che permetta di calcolare le tempistiche effettive per ogni albero di progetto, basandosi sul consuntivo orario delle attività svolte, aggiornando sia le ore dedicate al progetto, sia quelle dedicate ai sotto-task.

procedura
- calcolo ore totali (+ ore sotto-task)
- calcolo ore derivate (sotto-task)


Cosa è stato prodotto?

Dashboard Progetti con:
- Lista progetti
- Dettaglio progetto con:
  - Ore totali
  - Ore derivate
  - Ore previste
  - Ore effettive
  - Tabella collaboratori

Come funziona?

- Lista progetti: mostra tutti i progetti disponibili
- Dettaglio progetto: mostra le informazioni del progetto selezionato
  - Ore totali: somma delle ore di tutti i rapportini del progetto
  - Ore derivate: somma delle ore dei sotto-progetti
  - Ore previste: ore previste dal progetto
  - Ore effettive: ore effettive del progetto
  - Tabella collaboratori: lista dei collaboratori con le loro ore

Ho provato a rendere il più semplice possibile la parte di frontend utilizzando solo bootstrap e javascript vanilla basico per la visualizzazione dei dati da backend.



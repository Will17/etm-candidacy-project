import express, { NextFunction, Request, Response } from "express";
import project from "../controllers/project";
import reportController from "../controllers/report";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await project.getAllProjects();
        res.json(projects);
    } catch (err: any) {
        console.error(`Error while getting projects `, err.message);
        next(err);
    }
});

// Risposta con i dettagli del progetto.
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'Project ID is required' });
        }
        const emp = await project.getProjectDetails(parseInt(id));
        res.json(emp);
    } catch (err: any) {
        console.error(`Error while getting Records `, err.message);
        next(err);
    }
});

// Risposta con il calcolo delle ore totali del progetto.
router.get("/:id/hours", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'Project ID is required' });
        }
        const emp = await reportController.calculateProjectHoursTotal(parseInt(id));
        res.json(emp);
    } catch (err: any) {
        console.error(`Error while getting Records `, err.message);
        next(err);
    }
});

// Risposta con il calcolo delle ore totali del progetto separando i report diretti dai derivati
router.get("/:id/proper-derived", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'Project ID is required' });
        }
        const getDerivedProjectHours = await reportController.getDerivedProjectHours(parseInt(id));
        const getProperProjectHours = await reportController.getProperProjectHours(parseInt(id));
        
        res.json({ derived: getDerivedProjectHours, proper: getProperProjectHours });
    } catch (err: any) {
        console.error(`Error while getting Records `, err.message);
        next(err);
    }
});

// Risposta con il calcolo soltanto delle ore dirette del progetto.
router.get("/:id/proper", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'Project ID is required' });
        }
        const getProperProjectHours = await reportController.getProperProjectHours(parseInt(id));
        res.json(getProperProjectHours);
    } catch (err: any) {
        console.error(`Error while getting Records `, err.message);
        next(err);
    }
});

// Risposta con il calcolo soltanto delle ore derivate del progetto.
router.get("/:id/derived", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'Project ID is required' });
        }
        const getDerivedProjectHours = await reportController.getDerivedProjectHours(parseInt(id));
        res.json(getDerivedProjectHours);
    } catch (err: any) {
        console.error(`Error while getting Records `, err.message);
        next(err);
    }
});

// Extra: Risposta con i contributi dei singoli utenti con filtri
router.get("/:id/contributors", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { month, startDate, endDate, scope } = req.query;
        
        if (!id) {
            return res.status(400).json({ error: 'Project ID is required' });
        }
        
        const filters = {
            month: month as string,
            startDate: startDate as string,
            endDate: endDate as string,
            scope: scope as 'current' | 'single'
        };
        
        // TODO: Da implementare.
        res.json({"message": "Not implemented yet"});
    } catch (err: any) {
        console.error(`Error while getting contributors`, err.message);
        next(err);
    }
});

export default router;

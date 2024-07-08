import { Request, Response } from 'express';
import { createAirline, getAllAirlines, getAirlineByCode, updateAirline, deleteAirline } from '../models/airlineModel';

class AirlineController {
    async create(req: Request, res: Response): Promise<void> {
        const airline = await createAirline(req.body);
        res.status(201).json(airline);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const airlines = await getAllAirlines();
        res.status(200).json(airlines);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const airline = await getAirlineByCode(req.params.id);
        if (airline) {
            res.status(200).json(airline);
        } else {
            res.status(404).json({ message: 'Airline not found' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const airline = await updateAirline(req.params.id, req.body);
        if (airline) {
            res.status(200).json(airline);
        } else {
            res.status(404).json({ message: 'Airline not found' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const airline = await deleteAirline(req.params.id);
        if (airline) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Airline not found' });
        }
    }
}

export default new AirlineController();

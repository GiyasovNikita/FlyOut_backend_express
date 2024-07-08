import { Request, Response } from 'express';
import { createAirport, getAllAirports, getAirportByCode, updateAirport, deleteAirport } from '../models/airportModel';

class AirportController {
    async create(req: Request, res: Response): Promise<void> {
        const airport = await createAirport(req.body);
        res.status(201).json(airport);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const airports = await getAllAirports();
        res.status(200).json(airports);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const airport = await getAirportByCode(req.params.id);
        if (airport) {
            res.status(200).json(airport);
        } else {
            res.status(404).json({ message: 'Airport not found' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const airport = await updateAirport(req.params.id, req.body);
        if (airport) {
            res.status(200).json(airport);
        } else {
            res.status(404).json({ message: 'Airport not found' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const airport = await deleteAirport(req.params.id);
        if (airport) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Airport not found' });
        }
    }
}

export default new AirportController();

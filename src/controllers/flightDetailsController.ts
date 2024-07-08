import { Request, Response } from 'express';
import { createFlightDetails, getAllFlightDetails, getFlightDetailsById, updateFlightDetails, deleteFlightDetails } from '../models/flightDetailsModel';

class FlightDetailsController {
    async create(req: Request, res: Response): Promise<void> {
        const flightDetails = await createFlightDetails(req.body);
        res.status(201).json(flightDetails);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const flightDetailsList = await getAllFlightDetails();
        res.status(200).json(flightDetailsList);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const flightDetails = await getFlightDetailsById(parseInt(req.params.id, 10));
        if (flightDetails) {
            res.status(200).json(flightDetails);
        } else {
            res.status(404).json({ message: 'Flight Details not found' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const flightDetails = await updateFlightDetails(parseInt(req.params.id, 10), req.body);
        if (flightDetails) {
            res.status(200).json(flightDetails);
        } else {
            res.status(404).json({ message: 'Flight Details not found' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const flightDetails = await deleteFlightDetails(parseInt(req.params.id, 10));
        if (flightDetails) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Flight Details not found' });
        }
    }
}

export default new FlightDetailsController();

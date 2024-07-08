import { Request, Response } from 'express';
import { createFlight, getAllFlights, getFlightById, updateFlight, deleteFlight, filterFlights } from '../models/flightModel';

class FlightController {
    async create(req: Request, res: Response): Promise<void> {
        const flight = await createFlight(req.body);
        res.status(201).json(flight);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const flights = await getAllFlights();
        res.status(200).json(flights);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const flight = await getFlightById(parseInt(req.params.id, 10));
        if (flight) {
            res.status(200).json(flight);
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const flight = await updateFlight(parseInt(req.params.id, 10), req.body);
        if (flight) {
            res.status(200).json(flight);
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const flight = await deleteFlight(parseInt(req.params.id, 10));
        if (flight) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    }

    async filterFlights(req: Request, res: Response): Promise<void> {
        try {
            const { origin, destination, departureDate, returnDate } = req.query;

            if (!origin || !destination || !departureDate) {
                res.status(400).json({ message: 'Missing required query parameters: origin, destination, departureDate' });
                return;
            }

            const flights = await filterFlights(
                origin as string,
                destination as string,
                departureDate as string,
                returnDate as string | undefined
            );

            res.status(200).json(flights);
        } catch (error) {
            res.status(500).json({ message: 'Error filtering flights' });
        }
    }

}

export default new FlightController();

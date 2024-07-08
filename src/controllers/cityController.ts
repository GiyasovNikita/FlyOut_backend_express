import { Request, Response } from 'express';
import { createCity, getAllCities, getCityById, updateCity, deleteCity } from '../models/cityModel';

class CityController {
    async create(req: Request, res: Response): Promise<void> {
        const city = await createCity(req.body);
        res.status(201).json(city);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const cities = await getAllCities();
        res.status(200).json(cities);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const city = await getCityById(parseInt(req.params.id, 10));
        if (city) {
            res.status(200).json(city);
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const city = await updateCity(parseInt(req.params.id, 10), req.body);
        if (city) {
            res.status(200).json(city);
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const city = await deleteCity(parseInt(req.params.id, 10));
        if (city) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    }
}

export default new CityController();


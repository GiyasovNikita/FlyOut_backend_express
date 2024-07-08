import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import airportRoutes from './routes/airportRoutes';
import cityRoutes from './routes/cityRoutes';
import airlineRoutes from './routes/airlineRoutes';
import flightRoutes from './routes/flightRoutes';
import flightDetailsRoutes from './routes/flightDetailsRoutes';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', airportRoutes);
app.use('/api', cityRoutes);
app.use('/api', airlineRoutes);
app.use('/api', flightRoutes);
app.use('/api', flightDetailsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

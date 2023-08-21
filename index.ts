import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemDataRoutes from './routes/itemsDataRoute';
import salesTransactionRoutes from './routes/SalesTransactionRoute';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoute from './routes/AuthRoute';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongoConnectionURL = process.env.DATABASE_URL;

mongoose.connect(mongoConnectionURL as string);

const db = mongoose.connection;

db.on('error', (error: Error) => console.log(error));

db.once('connected', () => console.log('Database successfully connected'));

app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser());

app.use('/api', itemDataRoutes);

app.use('/api/transactions/sales', salesTransactionRoutes);

app.use('/auth', authRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Got the products from the server ');
});

app.listen(port, () => {
  console.log('[server]: Server is running at http://localhost:${port}');
});

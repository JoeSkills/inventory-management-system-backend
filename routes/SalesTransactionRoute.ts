import express from 'express';
import {
  addSale,
  getSales,
  totalItems,
} from '../controllers/SalesTransactionController';
import { salesTransactionPaginatedResults } from '../utils/salesTransactionPaginatedResults';
import SalesTransaction from '../models/SalesTransactionModel';

const router = express.Router();

router.post('/', addSale);

router.get('/', salesTransactionPaginatedResults(SalesTransaction), getSales);

router.get('/total-items', totalItems);

export default router;

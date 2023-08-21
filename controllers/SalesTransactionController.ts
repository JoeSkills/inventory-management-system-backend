import { RequestHandler } from 'express';
import SalesTransaction from '../models/SalesTransactionModel';

export const addSale: RequestHandler = async (req, res, next) => {
  try {
    const { user, items, totalAmount, notes, createdAt } = req.body;

    const salesTransaction = new SalesTransaction({
      user,
      items,
      totalAmount,
      notes,
      createdAt,
    });

    await salesTransaction.save();

    res.status(201).json({ message: 'Sale added successfully', success: true });

    next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message, success: false });
  }
};

export const getSales: RequestHandler = async (req, res: any, next) => {
  try {
    res.json(res.paginatedResults);
    next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const totalItems: RequestHandler = async (req, res, next) => {
  try {
    const data = await SalesTransaction.count();
    res.status(200).json({ data });
    next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

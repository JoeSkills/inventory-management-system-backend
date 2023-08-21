import { NextFunction, Request } from 'express';
import { ItemsDataGetQueryParams } from '../types';

export const salesTransactionPaginatedResults = (model: any) => {
  return async (
    req: Request<unknown, unknown, unknown, ItemsDataGetQueryParams>,
    res: any,
    next: NextFunction
  ) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = page - 1;
    const endIndex = page * limit;

    const results = { next: {}, previous: {}, data: [] };

    if (endIndex < model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.data = await model
        .find()
        .populate('user')
        .populate('items.product')
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
};

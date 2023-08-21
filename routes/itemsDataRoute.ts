import express, { Request, Response } from 'express';
import ItemsTableData from '../models/itemsTableDataModel';
import { paginatedResults } from '../utils/paginatedResults';

const router = express.Router();

router.post('/items-data', async (req: Request, res: Response) => {
  try {
    const itemsTableData = new ItemsTableData({
      itemName: req.body.itemName,
      itemId: req.body.itemId,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
      supplier: req.body.supplier,
      unitPrice: req.body.unitPrice,
      lastUpdated: req.body.lastUpdated,
      dateAdded: req.body.dateAdded,
    });
    const ItemsTableDataSave = await itemsTableData.save();
    res.status(200).json(ItemsTableDataSave);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.get(
  '/items-data',
  paginatedResults(ItemsTableData),
  async (req, res: any) => {
    try {
      res.json(res.paginatedResults);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

router.get('/items-data/total-items', async (req, res) => {
  try {
    const data = await ItemsTableData.count();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.get('/items-data/:id', async (req, res) => {
  try {
    const data = await ItemsTableData.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.patch('/items-data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await ItemsTableData.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.delete('/items-data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ItemsTableData.findByIdAndDelete(id);
    res.send(`Document with ${data?.itemName} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;

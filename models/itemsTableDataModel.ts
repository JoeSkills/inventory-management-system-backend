import mongoose from 'mongoose';

const itemsTableDataSchema = new mongoose.Schema({
  itemId: {
    required: true,
    type: mongoose.Schema.Types.Mixed,
  },
  itemName: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number,
  },
  unitPrice: {
    required: true,
    type: Number,
  },
  supplier: {
    required: true,
    type: String,
  },
  dateAdded: {
    required: true,
    type: String,
  },
  lastUpdated: {
    required: true,
    type: String,
  },
});

export default mongoose.model('ItemsTableData', itemsTableDataSchema);

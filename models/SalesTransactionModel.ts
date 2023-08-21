import mongoose from 'mongoose';

const salesTransactionSchema = new mongoose.Schema({
  createdAt: {
    required: true,
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemsTableData',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

export default mongoose.model('SalesTransaction', salesTransactionSchema);

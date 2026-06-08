const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coin: { type: String, required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true },
  buyPrice: { type: Number, required: true },
  sellPrice: { type: Number, default: null },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String, default: '' },
  pnl: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);

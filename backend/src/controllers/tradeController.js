const Trade = require('../models/Trade');

const getTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user._id }).sort({ date: -1 });
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTrade = async (req, res) => {
  try {
    const { coin, type, buyPrice, sellPrice, amount, date, notes } = req.body;

    let pnl = 0;
    if (type === 'sell' && sellPrice) {
      pnl = (sellPrice - buyPrice) * amount;
    }

    const trade = await Trade.create({
      user: req.user._id,
      coin,
      type,
      buyPrice,
      sellPrice,
      amount,
      date,
      notes,
      pnl,
    });

    res.status(201).json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) return res.status(404).json({ message: 'Trade not found' });
    if (trade.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await trade.deleteOne();
    res.json({ message: 'Trade deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user._id });
    const totalTrades = trades.length;
    const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
    const wins = trades.filter(t => t.pnl > 0).length;
    const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0;
    const bestTrade = trades.reduce((best, t) => t.pnl > (best?.pnl || -Infinity) ? t : best, null);
    const worstTrade = trades.reduce((worst, t) => t.pnl < (worst?.pnl || Infinity) ? t : worst, null);

    res.json({ totalTrades, totalPnl, winRate, bestTrade, worstTrade });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrades, createTrade, deleteTrade, getStats };

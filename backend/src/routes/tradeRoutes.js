const express = require('express');
const router = express.Router();
const { getTrades, createTrade, deleteTrade, getStats } = require('../controllers/tradeController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getTrades);
router.post('/', createTrade);
router.delete('/:id', deleteTrade);
router.get('/stats', getStats);

module.exports = router;

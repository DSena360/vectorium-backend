// Q360.ViewerEngine.v1 — Clean Deployable Backend
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const operantData = {
  operant_id: 'OP-005',
  validator: 'Validator-007',
  mutation_data: { type: 'frequency_increase', value: '250Hz' },
  delta_e: 0.000,
  capsule_sync_delta: 0.01,
  timestamp: new Date().toISOString()
};

const memoryDiff = {
  before_operant_id: 'OP-004',
  after_operant_id: 'OP-005',
  delta_e_change: 0.000,
  clause_diff: { validation_frequency: '250Hz' },
  sync_origin_node: 'Validator-007',
  timestamp: new Date().toISOString()
};

app.get('/q360/viewer/data', (req, res) => {
  res.json(operantData);
});

app.get('/q360/viewer/memory', (req, res) => {
  res.json(memoryDiff);
});

app.post('/q360/clause-tree/v1', (req, res) => {
  const input = req.body;
  fs.writeFileSync('./operant_log.json', JSON.stringify(input, null, 2));
  res.json({
    status: 'accepted',
    delta_e: 0.000,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Q360.ViewerEngine.v1 backend running on port ${PORT}`);
});


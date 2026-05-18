import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { isValidTransition } from '../utils/statusFlow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/shipments.json');

const readData = () => {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

const generateTrackingId = (shipments) => {
  if (shipments.length === 0) return 'SHP-1001';
  const nums = shipments
    .map(s => parseInt(s.trackingId.replace('SHP-', '')))
    .filter(n => !isNaN(n));
  const max = Math.max(...nums);
  return `SHP-${max + 1}`;
};

// GET /api/shipments
export const getShipments = (req, res) => {
  try {
    const shipments = readData();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read shipments' });
  }
};

// POST /api/shipments
export const createShipment = (req, res) => {
  try {
    const { sender, receiver, origin, destination } = req.body;

    if (!sender || !receiver || !origin || !destination) {
      return res.status(400).json({ error: 'All fields are required: sender, receiver, origin, destination' });
    }

    const shipments = readData();

    const newShipment = {
      id: uuidv4(),
      trackingId: generateTrackingId(shipments),
      sender,
      receiver,
      origin,
      destination,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    shipments.push(newShipment);
    writeData(shipments);

    res.status(201).json(newShipment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create shipment' });
  }
};

// PATCH /api/shipments/:id/status
export const updateStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const shipments = readData();
    const index = shipments.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    const shipment = shipments[index];

    if (!isValidTransition(shipment.status, status)) {
      return res.status(400).json({ error: 'Invalid status transition' });
    }

    shipments[index] = { ...shipment, status };
    writeData(shipments);

    res.json(shipments[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};
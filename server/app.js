import express from 'express';
import cors from 'cors';
import shipmentRoutes from './routes/shipmentRoutes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/shipments', shipmentRoutes);

app.listen(PORT, () => {
  console.log(`[SAMEX] Server running on http://localhost:${PORT}`);
});
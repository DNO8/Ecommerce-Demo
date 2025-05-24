import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import shipitRoutes from '../routes/shipit-routes.mjs';
import flowRoutes from '../routes/flow-routes.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, '../../public');
const app = express();
const PORT=3001
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/shipit-demo',shipitRoutes);
app.use('/flow-demo',flowRoutes);
app.listen(PORT, () => {
  console.log(`API de Shipit corriendo en http://localhost:${PORT}`);
});

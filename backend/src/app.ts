import express from "express";
import { initializeDatabase } from "./database/db";
import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initializeDatabase();

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

app.use('/api', userRoutes);
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

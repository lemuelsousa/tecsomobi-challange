import express from "express";
import { initializeDatabase } from "./database/db";
import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initializeDatabase();

app.get('/', (req, res) => {
    res.json( {message: 'hello, world'} );
});

app.use('/api', userRoutes);
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

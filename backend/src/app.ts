import express from "express";
import { initializeDatabase } from "./database/db";
import userRoutes from "./routes/users";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());

const allowedOrigin = ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(cors({ origin: allowedOrigin }));

initializeDatabase();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

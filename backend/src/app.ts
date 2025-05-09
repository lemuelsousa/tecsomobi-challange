import express from "express";
import { initializeDatabase } from "./database/db";
import userRoutes from "./routes/users";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = 3000;

app.use(express.json());

const allowedOrigin = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

app.use(cors({ origin: allowedOrigin }));

initializeDatabase();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.use("/api", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

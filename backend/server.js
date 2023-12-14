// backend/server.mjs (note the .mjs extension for ESM)
import express from "express";
import cors from "cors";
import apiRoutes from "./apiRoutes.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Not in Production"));
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

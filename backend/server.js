const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.get("/api/ideas", async (_req, res) => {
  const result = await pool.query("SELECT id, text FROM ideas ORDER BY id");
  res.json(result.rows);
});

app.post("/api/ideas", async (req, res) => {
  const text = String(req.body.text || "").trim();
  if (!text) {
    res.status(400).json({ error: "Text is required" });
    return;
  }

  const result = await pool.query(
    "INSERT INTO ideas (text) VALUES ($1) RETURNING id, text",
    [text],
  );
  res.status(201).json(result.rows[0]);
});

app.listen(5000, "0.0.0.0");

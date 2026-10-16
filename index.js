import cors from "cors";
import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb
const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.37pyayk.mongodb.net/`,
);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

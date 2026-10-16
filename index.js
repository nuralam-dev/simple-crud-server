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
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.dir(error);
  }
}
// connect database
const connectedClient = await connectToMongoDB();
const db = connectedClient.db("simplecruddb");
const users = db.collection("user");

app.get("/", (req, res) => {
  res.send("hello world");
});
// for all users
app.get("/user", async (req, res) => {
  const cursor = users.find({});
  const allUser = await cursor.toArray();
  res.send(allUser);
});
// post data
app.post("/user", async (req, res) => {
  const newUser = req.body;

  const result = await users.insertOne(newUser);
  console.log("adding new user", newUser);
  res.send(result);
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

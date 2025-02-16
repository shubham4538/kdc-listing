const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./connection.js");

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/getdata", async (req, res) => {
  try {
    const db = await connectDB();
    const data = await db.collection("products").find({}).toArray();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.data);

  try {
    const db = await connectDB();
    const data = `await db
      .collection("products")
      .findOneAndUpdate({ _id: id }, {});`;
    res.status(200).send(data);
  } catch (err) {
    console.log(data);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

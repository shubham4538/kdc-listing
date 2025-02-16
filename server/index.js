const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./connection.js");
const { ObjectId } = require("mongodb");

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/getdata", async (req, res) => {
  try {
    const db = await connectDB();
    const data = await db.collection("products").find({}).toArray();
    // const filteredData = data.filter((item) => item.added);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body.data;
  delete product._id;

  try {
    const db = await connectDB();
    const data = await db
      .collection("products")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: product });
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

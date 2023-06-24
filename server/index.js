const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
const port = process.env.PORT || 5000;

// MONGODB CONNECTION
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server Started on Port ${port}`));

// SCHEMA

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  image: String,
});

const userModel = mongoose.model("user", userSchema);

// API
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// SIGN UP API
app.post("/signup", async (req, res) => {
  const { email } = req.body;
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        res.send({ message: "Email already is use", alert: false });
      } else {
        const data = userModel(req.body);
        data.save();
        res.send({ message: "Successfully sign Up", alert: true });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "An error occurred", alert: false });
    });
});

//LOGIN API
app.post("/login", async (req, res) => {
  const { email } = req.body;
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        const dataSend = {
          _id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        res.send({
          message: "Login Successfully",
          alert: true,
          data: dataSend,
        });
      } else {
        res.send;
        ({
          message: "Email is not exist, please sign up",
          alert: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "An error occurred", alert: false });
    });
});

// PRODUCT API

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", productSchema);

app.post("uploadProduct", async (req, res) => {
  const data = await productModel(req.body);
  await data.save();
  res.send({ message: "Product Uploaded Successfully" });
});

app.get("/products", async (req, res) => {
  const data = productModel.find({});
  res.send(JSON.stringify(data));
});

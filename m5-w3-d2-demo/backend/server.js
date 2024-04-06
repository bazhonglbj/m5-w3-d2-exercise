const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose.connect("mongodb+srv://bazhonglbj:YOEMB7EtaT9xM2OU@cluster0.ffbuyjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const cors = require("cors");
app.use(express.json());
app.use(cors());

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title required'],
  },
  author: {
    type: String,
    required: [true, 'author required'],
  },
})

const book = mongoose.model('book', BookSchema);
//book.createIndexes();

app.get('/', async (req, resp) => {
  const data = await book.find();
  console.log(data)
  resp.send(data);
  //resp.send("App is Working");
});

app.post("/posts", async (req, resp) => {
  try {
      const book = new book(req.body);
      let result = await book.save();
      result = result.toObject();
      resp.send(req.body);
      console.log(result);
  } catch (e) {
      resp.send("Something Went Wrong");
  }
});

// Listen on a port
const port =  5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

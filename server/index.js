const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

const advertiseModel = require("./models/advertise");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:admin1994@cluster0.pw7h6j1.mongodb.net/advertisementTest?retryWrites=true&w=majority", {
  useNewUrlparser: true,
});

app.post('/insert', async (req, res) => {
  const adPais = req.body.adPais;
  const adConversao = req.body.adConversao;
  const adLance = req.body.adLance;
  const advertise = new advertiseModel({adPais: adPais, adConversao: adConversao, adLance: adLance});

  try{
    await advertise.save();
    res.send("insert data");
  } catch(err){
    console.log(err)
  }
});

app.get('/read', async (req, res) => {
  advertiseModel.find({}, (err, result) => {
    if(err){
      res.send(err)
    }

    res.send(result);
  })
});


app.put('/update', async (req, res) => {
  const newPais = req.body.newPais;
  const id = req.body.id;

  try{
    await advertiseModel.findById(id, (err, updatedAdvertise) => {
      updatedAdvertise.adPais = newPais;
      updatedAdvertise.save();
      res.send("update");
    });
  } catch(err){
    console.log(err)
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await advertiseModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});


app.listen(3001, ()=> {
  console.log('server running on port 3001..');
});
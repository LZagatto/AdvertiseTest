const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  adPais:{
    type: String,
    require: true,
  },
  adConversao:{
    type: String,
    require: true,
  },
  adLance:{
    type: Number,
    require: true,
  },
});

const advertisementTest = mongoose.model("advertisementTest", adSchema);
module.exports = advertisementTest;
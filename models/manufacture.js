const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ManufactureSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    product: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    });

const Manufacture = mongoose.model("Manufacture", ManufactureSchema);

module.exports = Manufacture;
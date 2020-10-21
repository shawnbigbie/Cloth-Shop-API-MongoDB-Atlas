// Imports and Packages
const express = require('express');
const http = require("http");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware
const Product = require('./models/product');
const Manufacture = require('./models/manufacture');

// Connect To DB
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('Connected to DB')
);

app.get('/', (req, res) => {
  res.send('Welcome to the node.js Shop API.');
})

// Server
server.listen(PORT, (req, res) => console.log(`Server running on: ${PORT}`));

// Route to create a Manufacture
app.post("/manufactures", (req, res) => {
    Manufacture.create({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
    })
      .then((manufacture) => {
        res.json(manufacture);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // Route to get all manufactutes
  app.get("/manufactures", (req, res) => {
    Manufacture.find({})
      .then((manufactures) => {
        res.json(manufactures);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // Route to delete a Manufacture
  app.delete("/manufactures", (req, res) => {
    Manufacture.deleteOne({ name: req.body.name }, (err, manufactures) => {
      Manufacture.find((err, manufactures) => {
        if (err) console.log(err);
  
        res.json(manufactures);
      });
    });
  });
  
  // Route for creating a new Product and updating Manufacture "Products" field with it
  app.post("/manufactures/:id", (req, res) => {
    Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    })
  
      .then((product) => {
        return Manufacture.updateOne(
          { _id: req.params.id },
          { $addToSet: { product: product._id } }
        );
      })
      .then((manufacture) => {
        res.json(manufacture);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // Route for retrieving a Manufacture by id and populating it's Products.
  app.get("/manufactures/:id", (req, res) => {
    Manufacture.findById({ _id: req.params.id })
      .populate("product")
      .then((manufacture) => {
        res.json(manufacture);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // Route to get all Products
  app.get("/products", (req, res) => {
    Product.find({})
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // Route to delete a product
  app.delete("/products", (req, res) => {
    Product.deleteOne({ name: req.body.name }, (err, products) => {
      Product.find((err, products) => {
        if (err) console.log(err);
  
        res.json(products);
      });
    });
  });
  
  // Get product by id
  app.get("/products/:id", (req, res) => {
    Product.findById(req.params.id)
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // Update product by id
  app.put("/products/:id", (req, res) => {
    Product.findById({ _id: req.params.id }, (err, product) => {
      if (err) console.log(err);
  
      product.update(req.body, (err, products) => {
        if (err) console.log(err);
  
        Product.find((err, products) => {
          if (err) console.log(handleError(err));
          res.json(products);
        });
      });
    });
  });
  
  // Update manufacture by id
  app.put('/manufacturs/:id', (req, res) =>{
      Manufacture.findById({ _id: req.params.id}, (err, product) => {
          if (err) console.log(err)
  
          manufacture.update(req.body, (err, manufactures) => {
              if (err) console.log(err)
  
              Manufacture.find((err, manufactures) => {
                  if (err) console.log(handleError(err))
  
                  res.json(manufactures)
              })
          })
      })
  })
# Build a REST API with Node JS and Express

# Introduction
Type "npm install" in console

Then type "npm start" to run API

Runs on http://localhost:3000 or https://syndicateorginal-api.herokuapp.com/ for live version

## To Get all Product or Manufacture
Send a Get Request to
http://localhost:3000/products

or

http://localhost:3000/manufactures

## To Add A Product or Manufacture
Post Request a JSON object to http://localhost:3000/manufactures/ID to add Product for a Manufacture
below is Product example
{
    "name": "name",
    "category": "category",
    "price": "price",
    "quantity": "quantity"
}


Post Request a JSON object to http://localhost:3000/manufactures to add a Manufacture
below is Manufacture example
{
    "name": "name",
    "address": "address",
    "phone": "phone"
}


can see the updated JSON infomation by sending another Get request,
all new and users created will have a ID created with them.

## To Update A Product or Manufacture
Put Request with JSON data and the URL of the User 
http://localhost:3000/products/Id or http://localhost:3000/manufactures/Id

below is example
below is Product example
{
    "name": "name",
    "category": "category",
    "price": "price",
    "quantity": "quantity"
}

below is Manufacture example
{
    "name": "name",
    "address": "address",
    "phone": "phone"
}

## To Delete A Product or Manufacture
Delete Request with the Product or Manufacture URL
http://localhost:3000/products or http://localhost:3000/manufactures
This will Delete one

const express = require("express");
const connectdb = require("./connectdb");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

// Middleware to parse incoming request bodies
app.use(express.json());

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// Create and save a record of a model
const person = new Person({
  name: 'John Doe',
  age: 30,
  favoriteFoods: ['Pizza', 'Pasta']
});

person.save()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });

// Create many records with Model.create()
const arrayOfPeople = [
  { name: 'Mary', age: 25, favoriteFoods: ['Sushi'] },
  { name: 'Jane', age: 40, favoriteFoods: ['Burrito', 'Tacos'] }
];

Person.create(arrayOfPeople)
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  });


// Use model.find() to search your database
Person.find({ name: 'Mary' })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });

// Use model.findOne() to return a single matching document from your database
Person.findOne({ favoriteFoods: 'Pizza' }).exec()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });


// Use model.findById() to search your database by _id
Person.findById('603f314b8f8ecf19f080d583')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });


// Perform classic updates by running find, edit, then save
Person.findById(person._id)
  .then(data => {
    if (!data) return console.log('No person found');
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });

// Perform new updates on a document using model.findOneAndUpdate()
Person.findOneAndUpdate({ name: 'John Doe' }, { age: 20 }, { new: true })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });


// Delete one document using model.findByIdAndRemove
Person.findByIdAndRemove(person._id)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });


// MongoDB and Mongoose - Delete many documents with model.remove()
Person.deleteOne({ name: 'Mary' })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  });


// Chain search query helpers to narrow search results
Person.find({ favoriteFoods: 'Burrito' })
  .sort({ name: 1 })
  .limit(2)
  .select('-age')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  });


app.listen(port, () => console.log("server is running at port: " + port));

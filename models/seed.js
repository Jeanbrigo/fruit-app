require('dotenv').config
const mongoose = require('./connection')
const Fruit = require('./fruit')

mongoose.connection.on('open', ()=>{

        const startFruits = [
          { name: "Orange", color: "orange", readyToEat: false },
          { name: "Grape", color: "purple", readyToEat: false },
          { name: "Banana", color: "orange", readyToEat: false },
          { name: "Strawberry", color: "red", readyToEat: false },
          { name: "Coconut", color: "brown", readyToEat: false },
        ];
      
        // Delete all fruits
        Fruit.deleteMany({}, (err, data) => {
          // Seed Starter Fruits
          Fruit.create(startFruits, (err, createdFruits) => {
            // send created fruits as response to confirm creation
            console.log(createdFruits);
          });
        });
      });
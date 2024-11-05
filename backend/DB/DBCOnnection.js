const mongoose = require('mongoose');

async function connectionToMongodb() {
     try {
          return mongoose.connect('mongodb+srv://tusharsuthar081:GX3SRPZD0G8nJHUD@cluster0.gvju3.mongodb.net/')
     } catch (error) {
          console.log("MONGOOES || ERROR WHILE CONNECTIONG TO MONGO DB -> ",error);
          
     }
}

module.exports = {
     connectionToMongodb
}


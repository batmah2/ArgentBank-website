const mongoose = require("mongoose");

module.exports = async function (tries = 5) {
  try {
    console.log("Attempting to connect to the database (with Mongoose)...");
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    mongoose.connection.on("error", error => {
      console.error("An error occurred with the database:", error);
    });

    console.log("The connexion to the database (with Mongoose) has been successfully established!");
  } catch (error) {
    if (tries) {
      console.error("Failed to connect to the database. Retrying in 5 seconds...");
      console.error(error);
      setTimeout(() => {
        this.connect(tries - 1);
      }, 5000);
    } else {
      console.error(error.message);
      process.exit(1);
    }
  }
};
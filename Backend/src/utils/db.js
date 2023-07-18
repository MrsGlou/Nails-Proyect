//Creamos la función que conecta con la base de datos: Mongo DB
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Traemos la mongo uri de la db
const MONGO_URI = process.env.MONGO_URI;

//Creamos el puerto de la función qeu se va a exportar e importar en el index
const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { host, name } = db.connection;
    console.log(`Connected to db: ${name} in host: ${host}`);
  } catch (error) {
    console.log('Error connecting to db: ', error);
  }
};

module.exports = connect;

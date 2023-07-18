//Creamos servidor con express
const express = require('express');
const dotenv = require('dotenv');
const connect = require('./src/utils/db');
const { configCloudinary } = require('./src/middlewares/files.middleware');
dotenv.config();

//Creamos el servidor web y conectamos la db y configuramos cloudinary
const PORT = process.env.PORT;
configCloudinary();
const app = express();
connect();

//Configuramos las cors
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
  //Creamos las cabeceras de nuestro back para controlar el acceso a la api
  res.header('Access-Control-Allow-Origen', '*');
  //Puede haber autorizaciones mediante request con contenido concreto
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  //Verbos persmitidos en los metodos
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  next();
});

//Decimos el tipo de servidor web que vamos a tener, estos dos parametros siempre son IGUAlES
//Siempre va a utilizar un json en el middleware para enviar los datos
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: false }));

//--------RUTAS----------
const UserRoutes = require('./src/api/routes/user.routes');
const ServiceRoutes = require('./src/api/routes/services.routes');
const ServiceTypeRoutes = require('./src/api/routes/servicesTypes.routes');

app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/service', ServiceRoutes);
app.use('/api/v1/servicetype', ServiceTypeRoutes);
app.use(`*`, (req, res, next) => {
  const error = new Error(`Route not found`);
  error.status = 404;
  next(error);
});

//Escuchamos a escuchar el servidor web en su puerto correspondiente
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const multer = require('multer');
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

//creamos almacen para las fotos de ususarios
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  //Le decimos que vamos a crear una carpeta para meter toda esa documentación y el formato permitido de archivo
  params: {
    folder: 'nailsAuthDB',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
  },
});

//Creamos la función de subir imagenes
const upload = multer({ storage });

//Función que borra las imagenes
const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split('/');
  const nameSplited = imgSplited[imgSplited.length - 1].split('.');
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log('Image delete in cloudinary');
  });
};

//Hay que configurar cloudinary para que funcione
const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

module.exports = { upload, deleteImgCloudinary, configCloudinary };

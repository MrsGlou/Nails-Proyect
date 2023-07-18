//Función seteadora de errores
const setError = (code, message) => {
  //Con el new instanciamos la constante
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
};

module.exports = setError;

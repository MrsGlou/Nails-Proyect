const dotenv = require('dotenv');
const Appointment = require('../models/appointment.model');
const setError = require('../../helpers/handle-error');
dotenv.config();

//--------- CREATE APPOINTMENT ---------//
const create = async (req, res, next) => {
  try {
    await Appointment.syncIndexes();
    //1. Recogemos todos los servicios y calculamos el tiempo que debe durar la cita sumandolos
    //2. Revisamos las citas programadas(GET ALL -> appointment x calendario) En este punto hacenos tmb el 4 al recibirlas.
    //3. Obtenemos hora y fecha actual
    //4. Ordena las citas programadas por fecha()
    //5. Calcula las citas disponibles en función de la duración de la cita(GET DISPONIBILITY -> Appointment)
    //6. Calculamos la cita que el cliente quiere reservar y guardamos
    //7. Guardamos la cita
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error create appointment'
      )
    );
  }
};
//--------- MODIFY APPOINTMENT ---------//
//--------- VERIFY APPOINTMENT ---------//
//--------- CLOSED APPOINTMENT ---------//
//--------- DELETE APPOINTMENT ---------//
//--------- GET BY EMAIL APPOINTMENT ---------//
//--------- GET BY ID ---------//
const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointmentID = await Appointment.findById(id).populate('calendar');
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error get by ID appointment'
      )
    );
  }
};

module.exports = {
  create,
};

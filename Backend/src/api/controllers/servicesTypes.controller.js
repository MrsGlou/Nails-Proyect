const dotenv = require('dotenv');
const ServiceType = require('../models/serviceTypes.model');
const setError = require('../../helpers/handle-error');
dotenv.config();
//SE BORRA
//--------- CREATE ---------//
const create = async (req, res, next) => {
  try {
    await ServiceType.syncIndexes();
    const newServiceType = new ServiceType({
      ...req.body,
    });

    const serviceTypeExists = await ServiceType.findOne({
      name: newServiceType.name,
    });

    if (serviceTypeExists) {
      return next(setError(409, 'This service type already exist'));
    } else {
      try {
        const createServiceType = await newServiceType.save();
        return res.status(201).json({
          serviceType: createServiceType,
        });
      } catch (error) {
        return res.status(404).json(error.message);
      }
    }
  } catch (error) {
    return next(
      setError(error.code || 500, error.message || 'Failed create service type')
    );
  }
};

//--------- UPDATE ---------//
const update = async (req, res, next) => {
  //Recogemso el id del tipo de servicio que queremos actualizar
  try {
    await ServiceType.syncIndexes();
    const patchServiceType = new ServiceType(req.body);
    try {
      await ServiceType.findByIdAndUpdate(
        req.serviceType._id,
        patchServiceType
      );
      //----TEST RUNTIME ----//
      const updateServiceType = await ServiceType.findById(req.serviceType._id);
      const updateKeys = Object.keys(req.body);
      //Variable para guardar el login
      const testUpdate = [];
      //Recorremos keys y comparamos
      updateKeys.forEach((item) => {
        if (updateServiceType[item] == req.body[item]) {
          testUpdate.push({
            [item]: true,
          });
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });
      return res.status(200).json({ testUpdate });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error update service type'
      )
    );
  }
};

//--------- DELETE ---------//
//FALTA: No se puede borrar si existe un servicio dentro del tipo que queremos borrar, lo primero que miramos.
//https://github.com/pedroleni/NODE_PT_JULIO_NEOLAND/blob/main/20-POPULATE/src/api/Calendar/route/calendar.route.js -> DELETE
const deleteServiceType = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await ServiceType.findByIdAndDelete(_id);
    if (await ServiceType.findById(_id)) {
      return res.status(404).json('Dont delete');
    } else {
      return res.status(200).json('Ok, delete');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error delete service Type'
      )
    );
  }
};

//--------- GET ALL SERVICE TYPE ---------//

//--------- GET BY ID SERVICE TYPE ---------//

module.exports = {
  create,
  update,
  deleteServiceType,
};

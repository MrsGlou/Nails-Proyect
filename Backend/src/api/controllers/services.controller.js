const dotenv = require('dotenv');
const Service = require('../models/service.model');
const setError = require('../../helpers/handle-error');
const ServiceType = require('../models/serviceTypes.model');
dotenv.config();

//--------- CREATE SERVICE ---------//
const create = async (req, res, next) => {
  try {
    await Service.syncIndexes();
    //Buscamos si el tipo de servicio existe
    const serviceType = await ServiceType.findOne({
      name: req.body.ServiceType,
    });

    if (!serviceType) {
      return res.status(404).json('Service Type not found');
    }

    const newService = new Service({
      ...req.body,
      type: serviceType._id,
    });

    try {
      const postNewService = await newService.save();

      if (postNewService) {
        try {
          //Guardamos el servicio nuevo en los tipos de servicio
          serviceType.services.push(newService._id);
          await ServiceType.findByIdAndUpdate(
            req.body.serviceType._id,
            serviceType._id
          );
        } catch (error) {
          return next(error);
        }
        return res.status(200).json({
          service: postNewService,
          updateServiceType: await serviceType
            .findOne({ name: req.body.ServiceType })
            .populate('Service'),
        });
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error create service'
      )
    );
  }
};

//--------- UPDATE SERVICE ---------//
//FALTA : si se actualiza el tipo de servicio que se actualicen los tipos de servicio tmb en el caso de que cambie
const update = async (req, res, next) => {
  try {
    await Service.syncIndexes();
    //Recogemos el id del servicio que queremos actualizar
    const { id } = req.params;
    const patchService = new Service(req.body);

    try {
      await Service.findByIdAndUpdate(id, patchService);
      const updateService = await Service.findById(id);

      if (!updateService) {
        return res.status(404).json('Service not found');
      }
      const updateKeys = Object.keys(req.body);
      const testUpdate = [];
      updateKeys.forEach((item) => {
        if (updateService[item] == req.body[item]) {
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
        error.message || 'General error update service'
      )
    );
  }
};

//--------- DELETE SERVICE ---------//
//Cuando se borre servicio que se borre tambien de los tipos de servicios
const deleteService = async (req, res, next) => {
  try {
    const { _id } = req.service;
    await Service.findByIdAndDelete(_id);
    if (await Service.findById(_id)) {
      return res.status(404).json('Not delete service');
    } else {
      await ServiceType.updateMany(
        { services: _id },
        { $pull: { services: _id } }
      );
      return res.status(200).json('Ok delete service');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error delete services'
      )
    );
  }
};
//--------- GET ALL SERVICE ---------//
const getAll = async (req, res, next) => {
  try {
    const servicesAll = await Service.find();
    if (servicesAll) {
      return res.status(200).json(servicesAll);
    } else {
      return res.status(404).json('Faliled GetAll controller to services');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error get all services'
      )
    );
  }
};

//--------- GET BY ID SERVICE ---------//
const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serviceID = await Service.findById(id).populate('type');
    if (serviceID) {
      return res.status(200).json(serviceID);
    } else {
      return res.status(404).json('Error controller getByIDEvent');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error get by ID services'
      )
    );
  }
};

module.exports = {
  create,
  update,
  deleteService,
  getAll,
  getByID,
};

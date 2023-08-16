const dotenv = require('dotenv');
const Service = require('../models/service.model');
const setError = require('../../helpers/handle-error');
dotenv.config();

//--------- CREATE SERVICE ---------//
const create = async (req, res, next) => {
  try {
    await Service.syncIndexes();
    //Buscamos si elservicio existe
    const serviceExists = await Service.findOne({
      name: req.body.name,
    });

    if (serviceExists) {
      return res.status(409).json('This service already exists');
    }

    const newService = new Service({
      ...req.body,
    });

    try {
      const postNewService = await newService.save();

      if (postNewService) {
        return res.status(200).json({
          service: postNewService,
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
const update = async (req, res, next) => {
  try {
    await Service.syncIndexes();
    //Recogemos el id del servicio que queremos actualizar
    const { id } = req.params;
    const patchService = new Service(req.body);

    patchService._id = req.body.id;
    patchService.type = req.body.type;

    try {
      console.log(req.body.id);
      await Service.findByIdAndUpdate(req.body.id, patchService);
      const updateService = await Service.findById(req.body.id);
      console.log(updateService);
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
const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    if (await Service.findById(id)) {
      return res.status(404).json('Not delete service');
    } else {
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
    const serviceID = await Service.findById(id);
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

//--------- GET BY TYPE SERVICE ---------//
const getByType = async (req, res, next) => {
  try {
    const { type } = req.parms;
    const serviceByType = await Service.find({ type });
    if (serviceByType) {
      return res.status(200).json({ serviceByType });
    } else {
      return res.status(404).json("Service type don't found");
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error get services by type'
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
  getByType,
};

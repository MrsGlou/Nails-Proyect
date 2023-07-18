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
      return res.status(404).json({ error: 'Service Type dont found' });
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
//FALTA : si se actualiza el tipo de servicio que se actualicen los tipos de servicio tmb
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
        return res.status(404).json({ error: 'Servicio no encontrado' });
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

//--------- GET ALL SERVICE ---------//

//--------- GET BY ID SERVICE ---------//

//--------- GET BY TYPE SERVICE ---------//

module.exports = {
  create,
  update,
};

const dotenv = require('dotenv');
const Service = require('../models/service.model');
const setError = require('../../helpers/handle-error');
const ServiceType = require('../models/serviceTypes.model');
dotenv.config();

//--------- CREATE SERVICE ---------//
const create = async (req, res, next) => {
  try {
    await Service.syncIndexes();
    const newService = new Service({
      ...req.body,
    });

    try {
      const postNewService = await newService.save();
      if (postNewService) {
        const serviceType = await ServiceType.findOne({
          name: req.body.ServiceType,
        });
        let updateServiceType;

        try {
          serviceType.services.push(newService._id);
          updateServiceType = await ServiceType.findByIdAndUpdate(
            req.body.serviceType._id,
            serviceType
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

//--------- DELETE SERVICE ---------//

//--------- GET ALL SERVICE ---------//

//--------- GET BY ID SERVICE ---------//

//--------- GET BY TYPE SERVICE ---------//

module.exports = {
  create,
};

  
import Joi from 'joi';
import response from '../middlewares/response';

class validator {

    static validateUserSignUp(req, res, next) {
        const data  = req.body;
        const schema = Joi.object().keys({
            fullName: Joi.string().required().regex(/^[A-Z]+ [A-Z]+$/i),
            email: Joi.string().required().email(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,80}$/).required(),
            address: Joi.string().required(),
            phoneNumber: Joi.string().regex(/^\d{4}-\d{3}-\d{4}$/).required(),
        });
        Joi.validate(data, schema, (err, value) => {
            if(err)
            {
                return response.errorResponse(
                    res, 422, err.message.replace(/['"]/g, '')
                )
            }
            return next();
        }) 
    }

    static validateUserSignIn(req, res, next) {
        const data = req.body;
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required(),
        });

        Joi.validate(data, schema, (err) => {
            if(err) {
                return response.errorResponse(
                    res, 422, err.message.replace(/['"]/g, '')
                )
            }
            return next();
        })
    }

  static validateCounter(req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
        amount: Joi.number().required(),
        name: Joi.string().trim().required(),
    });
  
    Joi.validate(data, schema, (err) => {
        if(!err) return next(); 
        return response.errorResponse(
            res, 422, err.message.replace(/['"]/g, '')
        )
    })
  }

  static validateQuote(req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
  
        companyName: Joi.string().trim().required(),
        loadingSite: Joi.string().required(),
        companyEmail: Joi.string().required().email(),
        companyPhone: Joi.number().required(),
        product: Joi.string().required(),
        tonnage: Joi.string().required(),
        truckType: Joi.string().required(),

    });
  
    Joi.validate(data, schema, (err) => {
        if(!err) return next(); 
        return response.errorResponse(
            res, 422, err.message.replace(/['"]/g, '')
        )
    })
  }

  static validateUser(req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
  
        fullName: Joi.string().required().regex(/^[A-Z]+ [A-Z]+$/i),
        email:  Joi.string().required().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required(),
        address: Joi.string().required(),
        phoneNumber: Joi.string().required(),

    });
  
    Joi.validate(data, schema, (err) => {
        if(!err) return next(); 
        return response.errorResponse(
            res, 422, err.message.replace(/['"]/g, '')
        )
    })
  }

  static validateContact(req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
  
        firstName: Joi.string().required().regex(/^[A-Za-z0-9]+$/i),
        lastName: Joi.string().required().regex(/^[A-Za-z0-9]+$/i),
        email:  Joi.string().required().email(),
        phoneNumber: Joi.string().required(),
        message: Joi.string(),
       

    });
  
    Joi.validate(data, schema, (err) => {
        if(!err) return next(); 
        return response.errorResponse(
            res, 422, err.message.replace(/['"]/g, '')
        )
    })
  }

}

export default validator;
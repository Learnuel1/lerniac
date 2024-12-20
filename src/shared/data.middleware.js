const Schemas = require("../schema")
module.exports = {
  validateRequestData (schema, data ={}){
    return async (req, res, next) => {
      try {

        Schemas[schema].parse(req.body); 
      } catch (error) {
        next(error)
      }
    }
  }
}
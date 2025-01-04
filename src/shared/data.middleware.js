const Schemas = require("../schema");
const { shortIdGen, isPhoneNumberValid } = require("../utils/generator");
const {APIError} = require("../utils/apiError")
module.exports = {
  validateRequestData (schema, data ={}){
    return async (req, res, next) => {
      try {
        if(!schema) return next(APIError.badRequest("Schema name is required"));
        if (!Schemas[schema]) return next(APIError.badRequest("Invalid schema name"));
        if(schema === "ZAccountSchema"){
          req.body.accountId = shortIdGen(17);
          if(req.body?.phone){
            if(!isPhoneNumberValid(req.body.phone)) return next(APIError.badRequest("invalid phone number"))
          }
        } 
        Schemas[schema].safeParse(req.body); 
        next()
      } catch (error) {
        next(error)
      }
    }
  },
  renameZodSchema(schema) { 
    return  async (req, res, next) => {
    try{
      let rename = schema.slice(0,(schema.length-6)).slice(1);
      if(!schema) return next(APIError.badRequest("Zod Schema name is required"));
     req.schema = rename;
      next();
    }catch(error){
      next(error);  
    }
  }
  },
}
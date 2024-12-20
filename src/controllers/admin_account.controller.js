const { hashSync } = require("bcryptjs");
const logger = require("../logger");
const { userExistByMail, userExistByType } = require("../services");
const { META } = require("../utils/actions");
const { generateStrongPassword, isStrongPassword, uniqueIdGen, shortIdGen } = require("../utils/generator");
const config = require("../config/env");
const { CONSTANTS, CONFIG } = require("../config");

exports.defaultAdminAccount = async () => {
  try {   
    const exist = await userExistByMail(config.ADMIN_MAIL)
    if(exist) return logger.info(`${exist.type} already exist`, {
      service: META.ACCOUNT,
    }); 
    const role = await userExistByType(CONSTANTS.ACCOUNT_TYPE_OBJ.admin);
    if(role)return logger.info(`${CONSTANTS.ACCOUNT_TYPE_OBJ.admin} admin already exist`, {
      service: META.ACCOUNT,
    });
    const password =  generateStrongPassword(12);
    if (!isStrongPassword(password)) {
      logger.info("Weak password detected", {service: META.ACCOUNT})
    }
    const info = {
      password: hashSync(password, 10),
      email:config.ADMIN_MAIL,
      firstName: CONFIG.APP_NAME,
      lastName: CONFIG.APP_NAME,
      phoneNumber: config.ADMIN_NUMBER,
      type: CONSTANTS.ACCOUNT_TYPE_OBJ.admin, 
      accountId: shortIdGen(12),
    } 
    console.log(info)
    let account = await createAccount(info);
    if(!account) return logger.info("Admin Account creation failed", {
      service: META.ACCOUNT,
    })
    if(account.error) return logger.info(account.error, {
      service: META.ACCOUNT,
    });
    logger.info('Admin Account created successfully', {
      service: META.ACCOUNT,
    }); 
    console.log(password)
     // email admin login info
    //  const result = await registrationMailHandler(info.email, "Account creation", CONFIG.APP_NAME, "admin", `Admin Password:${password}`);
    //  if (result.error) {
    //    await deleteUser(info.email);
    //    return logger.info(ERROR_FIELD.REG_FAILED, {
    //     service: META.ACCOUNT,
    //   });
    //  }
    //  logger.info('Admin login mail sent successfully', {
    //   service: META.ACCOUNT,
    // });  
  } catch (error) {
    throw new Error(error);
  }
};

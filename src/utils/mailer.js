const hbs = require("nodemailer-express-handlebars");
const { CONFIG } = require("../config");

const handlebarsOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./src/views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/views"),
  extName: ".handlebars",
};
let transporter = nodemailer.createTransport(
  {
    ...mailAuth
  });

  transporter.use("compile", hbs(handlebarsOptions));



  const adminAccountMailOptions = (
    sendTo,
    subject,
    password
  ) => {
    return {
      from: `${CONFIG.APP_NAME} ${domainMail.mail()}`,
      to: sendTo,
      subject,
      template: "default.account",
      context: {
        password,
      },
    };
  };

  exports.adminAccountMailHandler = async (email,password) => {
    try {
      return new Promise((resolve, reject) => {
        const mail = adminAccountMailOptions(
          email,
          "Account Login Details",
          password, 
        );
        transporter.sendMail(mail, (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve({ success: true });
        });
      });
    } catch (error) {
      return { error: error };
    }
  };
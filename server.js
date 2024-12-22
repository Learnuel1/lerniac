
const appServer = require("./src/app")
const { dbConnect } = require("./src/config/db.config.js");
const appLogger = require("./src/logger/index.js"); 
const config = require("./src/config/env.js");
const { engine } = require("express-handlebars");
const { errorMiddleWareModule } = require("./src/middlewares/index.js");
const { defaultAdminAccount } = require("./src/controllers/admin_account.controller.js");
const { Routers } = require("./src/routes");
const server = require("http").createServer(appServer);

// template engin
appServer.engine('.handlebars', engine({extname: '.handlebars'}));
appServer.set('view engine', '.handlebars');
appServer.set('views', '../src/views');

appServer.use("/api/v1", Routers)
const PORT = config.SERVER_PORT || 4000;
appServer.all("*", errorMiddleWareModule.notFound);
appServer.use(errorMiddleWareModule.errorHandler);

server.listen(PORT, async () => {
  try {
    await dbConnect.MongoDB(); 
    await defaultAdminAccount()
    appLogger.info(`server running on port ${PORT}`, {service:"application"});
  } catch (error) {
    appLogger.error(error, {service:"application"});
    process.exit(-1);
  }
});

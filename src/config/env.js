require("dotenv").config();
const config = {
DB_URI: process.env.DB_URL,
  LOCAL_DBURL: process.env.LOCAL_DB_URL,
 SERVER_PORT: process.env.PORT,
FRONTEND_ORIGIN_URL: process.env.FRONTEND_ORIGIN_URL,
 TOKEN_SECRETE: process.env.TOKEN_SECRETE,
  REFRESH_TOKEN_SECRETE: process.env.REFRESH_TOKEN_SECRETE,
  NODE_ENV: process.env.NODE_ENV,

}
module.exports = config;
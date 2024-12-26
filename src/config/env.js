require("dotenv").config();
const config = {
DB_URI: process.env.DB_URI,
LOCAL_DB_URL:process.env.LOCAL_DB_URL,
SERVER_PORT: process.env.SERVER_PORT,
FRONTEND_ORIGIN_URL: process.env.FRONTEND_ORIGIN_URL,
TOKEN_SECRETE: process.env.TOKEN_SECRETE,
REFRESH_TOKEN_SECRETE: process.env.REFRESH_TOKEN_SECRETE,
NODE_ENV: process.env.NODE_ENV,
MAIL_USER:process.env.MAIL_USER,
MAIL_PASS:process.env.MAIL_PASS,
MAIL_USER:process.env.MAIL_USER,
ADMIN_MAIL:process.env.ADMIN_MAIL,
ADMIN_NUMBER:process.env.ADMIN_NUMBER,

}
module.exports = config;
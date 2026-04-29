const dotenv = require("dotenv");
const path = require("path");

const envPath = path.resolve(__dirname, "..", "..", ".env");

dotenv.config({ path: envPath });

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

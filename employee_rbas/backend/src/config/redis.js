// Redis configuration placeholder
// Install and configure your Redis client here.

module.exports = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
};

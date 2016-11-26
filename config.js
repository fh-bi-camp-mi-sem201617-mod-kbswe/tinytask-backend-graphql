var config = {
    auth: {}
};

config.auth.domain = process.env.AUTH_DOMAIN || "";
config.auth.clientID = process.env.AUTH_CLIENT_ID || "";
config.auth.clientSecret = process.env.AUTH_CLIENT_SECRET || "";

module.exports = config;
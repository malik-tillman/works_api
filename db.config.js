/* Database configuration todo: retrieve info from env variables*/
module.exports = {
    HOST: "us-cdbr-east-02.cleardb.com",
    USER: "b690328a58ef91",
    PORT: 213,
    PASSWORD: "213e9cf2",
    DB: "heroku_229de97a5633e50",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 15000,
        idle: 10000
    }
};

// mysql://b690328a58ef91:213e9cf2@us-cdbr-east-02.cleardb.com/heroku_229de97a5633e50?reconnect=true

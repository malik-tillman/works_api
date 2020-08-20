/* Database configuration todo: retrieve info from env variables*/
module.exports = {
    HOST: "localhost",
    PORT: 3306,
    USER: "api",
    PASSWORD: "Only4api",
    DB: "works",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 15000,
        idle: 10000
    }
};

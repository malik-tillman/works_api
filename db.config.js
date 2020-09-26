/* Database configuration todo: retrieve info from env variables*/
module.exports = {
    HOST: process.env.WorksDB_HOST,
    USER: process.env.WorksDB_USER,
    PORT: 3306,
    PASSWORD: process.env.WorksDB_PASSWORD,
    DB: process.env.WorksDB,
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 15000,
        idle: 10000
    }
};


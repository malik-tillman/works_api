const config = require('./db.config');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

const RootModel = require('./models/root')(sequelize, DataTypes);
const WorkModel = require('./models/work')(sequelize, DataTypes);

/* Export sequelize */
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.config = config;

module.exports = {
    db,
    RootModel,
    WorkModel
};

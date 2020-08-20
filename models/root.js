module.exports = (sequelize, type) => {
    return sequelize.define('root', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: type.STRING
        },
        last_entry: {
            type: type.DATE
        },
        count: {
            type: type.INTEGER
        }
    })
}

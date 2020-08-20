module.exports = (sequelize, type) => {
    return sequelize.define('Work', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hidden: {
          type: type.BOOLEAN
        },
        name: {
            type: type.STRING(64),
            allowNull: false
        },
        category: {
            type: type.STRING(32),
            defaultValue: "uncategorized"
        },
        tags: {
            type: type.STRING(255)
        },
        github: {
            type: type.STRING(255)
        },
        behance: {
            type: type.STRING(255)
        },
        website: {
            type: type.STRING(255)
        },
        description: {
            type: type.TEXT
        },
        images: {
            type: type.TEXT
        },
        videos: {
            type: type.TEXT
        },
        thumbnail: {
            type: type.STRING(255)
        }
    }, {
        tableName: 'works',
        paranoid: true,
        timestamps: true
    })
}

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        bio: {
            type: type.STRING,
            allowNull: true,
        },
        // type will be band or fan
        type: {
            type: type.STRING,
            allowNull: false
        }
    })
}
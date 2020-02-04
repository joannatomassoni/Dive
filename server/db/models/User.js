module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        name: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        nickname: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        bio: {
            type: type.STRING,
            allowNull: true,
        },
        link_facebook: {
            type: type.STRING,
            allowNull: true
        },
        link_spotify: {
            type: type.STRING,
            allowNull: true
        },
        link_instagram: {
            type: type.STRING,
            allowNull: true
        },
        photo: {
            type: type.STRING,
            allowNull: true
        },
        bandPhoto: {
            type: type.STRING,
            allowNull: true
        },
        expoPushToken: {
            type: type.STRING,
            allowNull: true
        },
        calPermission: {
            type: type.BOOLEAN,
            allowNull: true
        },
        calID: {
            type: type.STRING,
            allowNull: true
        }
    })
}
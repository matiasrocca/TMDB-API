
const User = require("./Users")
const Favoritos = require("./Favoritos")

User.hasMany(Favoritos, {
    foreignKey: "userId"
});
Favoritos.belongsTo(User);

module.exports = { User, Favoritos };
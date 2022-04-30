
const db = require("../config/index");
const S = require("sequelize");

class Favoritos extends S.Model{

}


Favoritos.init({
    favoriteId:{
        type:S.DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    favoriteTitle: {
        type: S.DataTypes.STRING
    },
    poster_path:{
        type: S.DataTypes.STRING
    },
    type:{
        type: S.DataTypes.STRING
    }

},{
    sequelize: db,
    modelName: "favourites"
})


module.exports = Favoritos
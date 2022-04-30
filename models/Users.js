
const db = require("../config/index");
const S = require("sequelize");
const bcrypt = require('bcrypt')

class User extends S.Model{
    setHash(password, salt){
        return bcrypt.hash(password, salt)
    }
}


User.init({
    nombre:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    apellido:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    usuario:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    contraseña:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    salt:{
        type: S.DataTypes.STRING
    }


},{
    sequelize: db,
    modelName: "user"
})

User.addHook('beforeCreate',(user)=>{
    return bcrypt.genSalt(16)
    .then(salt => {
        user.salt = salt
        return user.setHash(user.contraseña, user.salt)
    })
    .then(hashedPassword => user.contraseña = hashedPassword)
})

module.exports = User
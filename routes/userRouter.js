const express = require("express");
const { User, Favoritos } = require("../models");
const router = express.Router();
const passport = require("passport");
const S = require("sequelize");

router.post("/register", async (req, res, next) =>{
    const {nombre, apellido, usuario, email, contraseña } = req.body

    User.findOrCreate({
        where: {
            usuario: usuario,
            email: email
        },
        defaults:{ nombre, apellido, usuario, email, contraseña }
    }).then(respuesta => res.send(respuesta))
    .catch(error=>res.send(error))

    }
)


router.get("/all", (req, res, next)=>{

    User.findAll({})
    .then(respuesta => res.send(respuesta))
    
})

router.get("/all/:search", (req, res, next)=>{
    console.log(req.cookies)
    const busqueda = req.params.search

    User.findAll({
        where:{
            nombre:{
                [S.Op.iLike]: busqueda + "%"
            }
        }
    })
    .then(respuesta => res.send(respuesta))
    
})


router.post('/login', passport.authenticate('local'), (req, res) =>  {
    res.send(req.user);
});

router.post('/logout', (req, res) => {
  
    req.logOut()
    res.sendStatus(200)
  
})

router.get('/me', (req, res)=> {
    if(!req.user) return res.sendStatus(401)
  
    res.send(req.user)
})

router.post('/:user/add', async (req, res, next) =>{
    const {id, title, poster_path, type} = req.body
    const user = req.params.user

    const respuesta = await Favoritos.findOrCreate({
        where: {userId : user, favoriteId : id},
        defaults:{ favoriteId: id , favoriteTitle : title, poster_path: poster_path, type: type }
    })

    if(respuesta[1]){
        res.status(200).json({
            succes: true,
            message: "La pelicula se agrego con exito a favoritos."
        })
    }else{
        res.send(respuesta)
    }
})

router.delete('/:user/:id/delete', (req, res, next)=>{
    const user = req.params.user
    const id = req.params.id

    Favoritos.destroy({
        where:{
            userId : user,
            favoriteId: id
        }
    })
    .then(respuesta => {res.status(200).json({success: true, respuesta: respuesta})})

})

router.get('/:user/favoritos', (req, res, next)=>{
    const user = req.params.user
    Favoritos.findAll({
        where:{
            userId: user
        }
    })
    .then(resultados => res.send(resultados))
})

router.get('/:user/favoritos/:id', (req, res, next)=>{
    const user = req.params.user
    const id = req.params.id
    Favoritos.findOne({
        where:{
            userId: user,
            favoriteId:id
        }
    })
    .then(resultados => {
        console.log(resultados)
        if(!resultados){
            res.status(400).json({
                success: false,
                message: "not in favorites"
            })
        }else{
            res.status(200).json({
                success:true,
                resultados: resultados})
        }
    }).catch(error => {
        res.send(error)
    })
})

router.get('/:user', (req, res, next) => {
    const user = req.params.user

    User.findOne({
        where:{
            id: user
        }
    })
    .then(resultados => res.send(resultados))
})


module.exports = router;
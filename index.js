// Configuración del server

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config();

const routes = require("./routes");
const db = require("./config/index");
const User = require("./models/Users")

const app = express();
app.set("trust proxy", 1);
app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_APP_URL]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));

app.use(session({
    secret: "bootcamp",
    resave: true,
    saveUninitialized: true
  }))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(
        
        {
            usernameField: "email",
            passwordField: "contraseña",
        },
        
        function (email, password, done) {
            User.findOne({
                where:{
                  email:email
                }
              })
              .then(user => {
                if (!user) return done(null, false)
                user.setHash(password, user.salt)
                .then(hash => {
                    if (hash !== user.contraseña) return done(null, false)
                    done(null, user)  
                })
            })
            .catch(done)
    }
  )
);

passport.serializeUser(function(user, done) {
    done(null, user.id); 
});

passport.deserializeUser(function(id, done) { 
    User.findByPk(id) 
      .then(user => done(null, user))
      .catch(done)
});

app.use("/api", routes);

/*
app.get("/", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
*/

const PORT =  3001;

db.sync({ force: false}).then(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log("Escuchando en el puerto ", PORT);
    });
});

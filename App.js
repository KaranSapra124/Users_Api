const User = require("./Models/User")
const express = require("express");
const BodyParser = require("body-parser");
const Jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
// const router = express.Router()
const config = require("./config")
const md5 = require("md5")
const app = express();

// const secretKey = 'O7mzVJbE1IhtNqFdXn8yRpswAe9jYl6B'

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))

mongoose.connect(config.MongoDBConnection);

// Function to verify whether token is valid or invalid or exists or not.
const AuthToken = (req, res, next) => {
    const Token = req.headers.authorization;
    // const token = req.headers.authorization;
    const tokenValue = Token.split(' ')[1]; //To split the token with bearer keyword

    // console.log(Token);

    if (!Token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    Jwt.verify(tokenValue, config.secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: Token });
        }

        req.user = user;
        console.log(user);
        next();
    });
};

// Register User Route

app.post("/register", (req, res) => {
    const { Name, email, Password } = req.body;
    const NewUser = new User({
        Name: Name,
        email: email,
        Password: md5(md5(Password))
    })


    NewUser.save()
        .then(() => {

            const payload = {
                Name: NewUser.Name,
                email: NewUser.email,
            };
            const token = Jwt.sign(payload, config.secretKey);

            return res.json({ token: token })
        })
        .catch((err) => {
            return res.send("Error while registering")
        })


}).post('/login', (req, res) => {  //login route
    const { email, Password } = req.body;
    User.findOne({ email: email })
        .then((docs) => {
            if (docs.Password === md5(md5(Password))) {
                const payload = {
                    email: docs.email,
                    email: docs.Password
                };
                const token = Jwt.sign(payload, config.secretKey);

                return res.json({ token: token })
            }
            else {
                return res.send("Password Incorrect!!!")
            }
        })
        .catch((err) => {
            return res.send("No User Found")
        })

}).get("/users", AuthToken, (req, res) => { //Get All Users From Database
    console.log(AuthToken);
    User.find({}).lean()
        .then((users) => {

            return res.json(users)
        })
        .catch((err) => {
            return res.status(401).send("Error whie reading")
        })
}).post('/users', AuthToken, async (req, res) => { //Post a new user to database
    const { Name, email, Password } = req.body; 

    const NewUser = new User({
        Name: Name,
        email: email,
        Password: md5(md5(Password))
    });

    await NewUser.save().then(() => {
        res.send("Added")
    })

}).get("/users/:id", AuthToken, (req, res) => {  //Get a speciifc user
    const Id = req.params.id;
    User.find({ _id: Id })
        .then((users) => {
            return res.json(users)
        })
        .catch((err) => {
            return res.status(500).send(err)
        })
}).put("/users/:id", AuthToken, (req, res) => { //Update a specific user
    const id = req.params.id;
    const UpdatedData = req.body

    User.findByIdAndUpdate(id, UpdatedData, { new: true })
        .then((users) => {
            return res.json(users)
        })
        .catch((err) => {
            return res.status(500).send(err)
        })
}).delete("/users/:id", AuthToken, (req, res) => { //Delete a specific user

    User.findByIdAndDelete(req.params.id, { new: true }).lean()
        .then(() => {
            return res.send("Deleted")
        })
        .catch((err) => {
            return res.status(500).send("Id Not Found")
        })
})

app.get("/", (req, res) => { //To check the server
    res.send("Hello")
})

// Listen server to port 3000
app.listen(3000, () => {
    console.log("Running");
})
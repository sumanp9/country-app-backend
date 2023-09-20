var express = require('express');
var app = express();
var cors = require('cors');

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require("./app/models/index.js");


db.sequelize.sync()
    .then(()=> {
        console.log("Synced db");
    })
    .catch((err) => {
        console.log("Failed to sync db: "+ err.message);
    })

app.get("/", (req, res) => {
    res.json({message: "Welcome to country application"})
})



require("./app/routes/routes.js")(app);
const  PORT =  process.env.PORT || 8080;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
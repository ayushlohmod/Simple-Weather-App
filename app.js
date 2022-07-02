
// const { json } = require("express");
const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req , res){

    res.sendFile(__dirname + "/index.html");
    

    
    //res.send("server is up and running")
});
app.post("/", function(req , res){
    //console.log(req.body.CityName);
    const query = req.body.CityName;
    const apikey = "77c8d781190fa0603ea8e969d0b8c392"; 
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units="+ unit;
    
    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temprature = weatherdata.main.temp;
            const weatherdiscription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            //console.log(temprature);
            //const = imageurl = 
            
            res.write( "<h1>The temprature in "+ query +" is " + temprature + " degrees celsius</h1>")
            
            res.write("<p>The weather is currently " + weatherdiscription + "</p>")
            res.write("<img src = "+ imageurl + ">");
            res.send();
            
        });
    }); 

    //console.log("request recieved");
})




app.listen(3000, function(){
    console.log("server is runnig on port 3000");
    
})
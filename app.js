const express=require("express")
const app=express()
const https=require("https")
const bodyparser=require("body-parser")
require('dotenv').config()
console.log(process.env);
app.use(bodyparser.urlencoded({extended:true}))
app.get("/", function (req,res) {
  res.sendFile(__dirname+"/index.html")

})
app.post("/", function(req,res){
  city=req.body.city;
  api_key= process.env.API_KEY
  url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key+"&units=metric"
  console.log(city)
  https.get(url, function (response) {
  console.log(response);
  response.on("data", function(data){
        weather=JSON.parse(data);
        console.log(weather);
        console.log(weather.main.temp);
        const icon=weather.weather[0].icon;
        const source = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write('<head><meta charset="utf-8"></head>');
        res.write("<img src="+source+ ">")
        res.write("<h1>The temperature at "+city+" is "+weather.main.temp+" degrees<\h1>")
        res.send();
    })

  })
})
app.listen(3000, function () {
  console.log("listening on port 3000");
})

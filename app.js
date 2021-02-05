const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, response) {
  const query = request.body.cityName;
  const apiKey = "e8eed26bc6856c43ee0b39015415e210";
  const unit = "imperial";

  https.get("https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + unit, function(res){
    console.log(res.statusCode);

    res.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;

      response.write("<p> The weather is currently " + description +"</p>");
      response.write("<h1> The tempartue in " + query + " is " + temp +  " degree celcius</h1>");
      response.write("<img src=" + imageURL + ">");
      response.send();
    });
  });
});

app.listen(3000, function() {
  console.log(`Server is successfully running on 3000 server`);
});

var request = require("request");


var fs = require('fs');
 

var citys=[
    'Mumbai','Pune','Vasai-Virar','Nashik','Solapur','Aurangabad','Kolhapur','Ichalkaranji','Jalgaon','Latur'
];
var host = "http://api.openweathermap.org";
var path= "/data/2.5/weather?q=";

var restPath=",IN&appid=b36e18a1e424b240627d5b37e21c63e1";


//function definition for making the actual call

getWeatherDataHttps= function(city, callback){
    request(host+path+city+restPath, function(error, response, body) {
    callback(body);
      });
}




getWeatherData = function(){
    var str="";

//weather data of each city are being called
    for(let i =0 ; i<citys.length; i++){
        getWeatherDataHttps(citys[i],function(data){
           //response for each city is being written separate files 
        fs.appendFile(citys[i]+'.json',data+',', 'utf8',
        function(err) { 
            if (err) throw err;
            // if no error
            console.log("Data is appended to file successfully.")
        });

        })
    }
}


//function called every hour (3600 secs)

setInterval(getWeatherData, 1*60*60*1000);

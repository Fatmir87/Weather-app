$(document).ready(function(){
  let cityName = '';
  let countryName = '';
      var getWeather = function(){
                
            var city = $("#city").val();
            var key  = '4de3768c62b67fe359758977a3efc069';
            
            $.ajax({
              url:'http://api.openweathermap.org/data/2.5/weather',
              dataType:'json',
              type:'GET',
              data:{q:city, appid: key, units: 'metric'},

              success: function(data){
                var wf = '';
                $.each(data.weather, function(index, val){
                

                  wf += '<p><b>' + data.name + ' ' +  parseInt(data.main.temp) + '&deg;C ' + 
                  ' | ' + val.main + ", " + val.description 
                  cityName = data.name;
                  countryName = data.sys.country;
                  console.log(countryName);
                  getDisco();
                });
              
               $(".ShowWeatherForcast").html(wf);
              },
              error: function (error) {
               
               var wf = '';

                 wf += '<p><b>' + error.responseJSON.message + "</b></p>"; 

              $(".ShowWeatherForcast").html(wf);
              }

            })
      };
      /* Allows the user to call the weather function with the Enter key or the press of the button,
      when the input reaches three or more characters, a function will be called to place the suggested
      cities by prefix into the autocomplete widget*/
      $( function() {
        $( "#city" ).autocomplete({
        minLength: 3,
          source: function(request, response){
            let namePrefix = request.term;
            let availableTags = new Array();
             console.log("sending request: " + namePrefix);
             $.ajax({
               url:'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
               dataType:'json',
               type:'GET',
               data:{namePrefix, minPopulation:30000},
               headers:{"x-rapidapi-key" : "bc1b7d1154msh0328f4a0ef9c8a7p1260cfjsnd58a1bbe1063"},
               success: function(cityPrefix) {
                console.log(namePrefix); 
                // For each element in data, pick city, map and set the list to available tags.
                availableTags = (cityPrefix.data.map(x => x.city));
                console.log(availableTags);
                response(availableTags);
               }
            });
          }
        });
      });
      $('#getWeatherForcast').on("keypress", function (e){   
        if (e.keycode == 13) { 
          getWeather();
        }
      });
      $("#getWeatherForcast").click(getWeather);

      function getDisco(){
        console.log(cityName)
                  $.ajax({
            url:'./disco.json',
            //firefox apparently tries to parse the request to html, so I set mimeType to JSON manually
            mimeType:'json',
            type:'GET',
            data: null,
            //find country code and produce a link to a song from this country!
            success : function(data){
              //countryCode = country.data.filter(country => data == countryName)
              var findDisco = '';
              findDisco += '<p><b>' + data.test + "</b></p>";  
              console.log(findDisco);
              $(".someDisco").html(findDisco);
            },

            error: function (data) {
              console.log('err');
              console.log(data);
                }
            });

       };
});
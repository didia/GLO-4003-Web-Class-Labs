$(document).ready(function(){
    var currentLocation = new CurrentLocation();
    var header = new HeaderView({model: currentLocation});
    currentLocation.fetch();
    var forecasts = new WeekForecast();
    var forecastView = new WeekForecastView({collection: forecasts});
    forecasts.fetch();

});


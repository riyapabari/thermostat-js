$(document).ready(function(){
  var thermostat = new Thermostat();

  function updateTemperatureOutput() {
    $('#output-temperature').text(thermostat.temperature);
    $('#output-temperature, #thermometer-bar').attr('class', thermostat.energyConsumption());
    $('#thermometer-bar').height(thermostat.temperatureConvertToPercentage());
  };

  updateTemperatureOutput();

  function updatePowerSavingMode() {
    var powerSavingMode =  thermostat.isPowerSavingOn ? "On" : "Off";
    $('#input-toggle').text(powerSavingMode);
  };

  updatePowerSavingMode();

  $('#input-increase').on('click', function() {
    thermostat.increaseTemperature();
    updateTemperatureOutput();
  });

  $('#input-decrease').on('click', function() {
    thermostat.decreaseTemperature();
    updateTemperatureOutput();
  });

  $('#input-toggle').on('click', function() {
    thermostat.togglePowerSavingMode();
    updatePowerSavingMode();
    updateTemperatureOutput();
  });

  $('#input-reset').on('click', function() {
    thermostat.reset();
    updateTemperatureOutput();
  });

  var ajax = function(city) {
    $.getJSON('http:api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=6457bac87f96f21776277d3368399a82', function(data) {
      console.log(data);
      $('#output-weather').html(data.name + ': ' + (data.main.temp - 273).toFixed(1) + '&deg;C')
    });
  };

  ajax('london');

  $('#city-change').on('change', function(data) {
    console.log(data.currentTarget.value);
    ajax(data.currentTarget.value);
  });

});


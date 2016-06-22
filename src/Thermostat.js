'use strict';

var Thermostat = function(startTemperature, increment){
	this.DEFAULT_TEMPERATURE = startTemperature || 20;
	this.DEFAULT_INCREMENT = increment || 0.5;
  this.MIN_TEMPERATURE = 10;
  this.temperature = this.DEFAULT_TEMPERATURE;
  this.powerSavingMode = true;
};

Thermostat.prototype = {
	increaseTemperature: function() {
		if (this.temperature < this._setMaxTemperature()) {
			this.temperature += this.DEFAULT_INCREMENT;
		}
	},

  decreaseTemperature: function() {
    if (this.temperature > this.MIN_TEMPERATURE) {
      this.temperature -= this.DEFAULT_INCREMENT;
    }
  },

  togglePowerSavingMode: function() {
    this.powerSavingMode = !this.powerSavingMode
  },

  reset: function() {
    this.temperature = this.DEFAULT_TEMPERATURE;
  },

  energyConsumption: function() {
  	switch (true) {
  		case (this.temperature <= 18):
  			return 'low';
  		case (this.temperature > 18 && this.temperature < 25):
  			return 'medium';
  		case (this.temperature >= 25):
  			return 'high';
  	}
  },

  _setMaxTemperature: function() {
  	return this.powerSavingMode ? 25 : 32;
  }

};

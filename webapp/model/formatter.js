sap.ui.define([], function() {
	"use strict";
	return {
		sumOfAllFields: function(n) {
			return parseFloat(n);
		},
				priceState: function(iPrice) {
			var percent = parseFloat(iPrice);
			if (20 < percent > 40) {
				return "None";
			} else if (41 < percent > 60) {
				return "Error";
			} else if (61 < percent > 80) {
				return "Warning";
			} else {
				return "Success";
			}
		}
	};
});
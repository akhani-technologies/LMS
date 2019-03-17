sap.ui.define([
	"sap/m/Text"
], function(Text) {
	"use strict";
	return {
		/**
		 * Defines a value state based on the price
		 *
		 * @public
		 * @param {number} iPrice the price of a post
		 * @returns {string} sValue the state for the price
		 */
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
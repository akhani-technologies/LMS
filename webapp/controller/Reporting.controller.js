sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Reporting", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.view.Reporting
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Reporting").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {

		},

		onMilestone: function(oEvent) {
			this.oRouter.navTo("MilestoneReport");
		},

		onIncidentReport: function(oEvent) {
			this.oRouter.navTo("IncidentList");
		},

		onAttendanceList: function(oEvent) {
			this.oRouter.navTo("AttendanceReport");
		},

		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("master", {}, bReplace);
			}
		},

	});

});
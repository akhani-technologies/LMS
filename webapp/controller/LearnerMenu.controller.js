sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("programmeMotse.controller.LearnerMenu", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.LearnerMenu
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function() {
			this.getRouter().navTo("MenuPage");
		},

		onLearnerInfoPress: function(oEvent) {
			this.oRouter.navTo("LearnerInfo");
		},

		onLearnerList: function(oEvent) {
			this.oRouter.navTo("LearnerList");
		},

		onCaptureResults: function(oEvent) {
			this.oRouter.navTo("CaptureResults");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf programmeMotse.view.LearnerMenu
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.LearnerMenu
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.LearnerMenu
		 */
		//	onExit: function() {
		//
		//	}

	});

});
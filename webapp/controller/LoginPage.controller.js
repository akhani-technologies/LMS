sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox'
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.LoginPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.controller.view.LoginPage
		 */

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		onLogin: function(oEvent) {

			// $.ajax({
			// 	type: "POST",
			// 	url: 'https://petstore.swagger.io/v2/pet',
			// 	async: false,
			// 	contentType: 'application/json',
			// 	dataType: 'json',
			// 	accept: "application/json",
			// 	data: JSON.stringify({
			// 		id: 1988,
			// 		category: {
			// 			id: 1,
			// 			name: "Neo"
			// 		},
			// 		name: "doggie",
			// 		photoUrls: [
			// 			"string"
			// 		],
			// 		tags: [{
			// 			id: 1,
			// 			name: "Lehoko"
			// 		}],
			// 		status: "available"
			// 	}),
			// 	success: function(data, s, xhr) {
			// 		alert("success " + s);
			// 	}.bind(this),
			// 	error: function(err, e, xhr) {
			// 		alert("error " + e);
			// 	}
			// });

			//	var json = new sap.ui.model.json.JSONModel();
			// var email = this.byId("usernameInput").getValue().toLowerCase();
			// var password = this.byId("passwordInput").getValue();
			// var that = this;
			// var correct = false;
			// $.ajax({
			// 	url: 'PHP/users.php',
			// 	async: false,
			// 	success: function(data) {
			// 		for (var i = 0; i < data.result.length; i++) {
			// 			if (data.result[i].Email === email && data.result[i].Password === password) {
			// correct = true;
			this.oRouter.navTo("MenuPage");
			// 			}
			// 		}
			// 		if (!correct) {
			// 			that.handleError2MessageBoxPress();
			// 		}
			// 	},
			// 	error: function(err) {
			// 		console.log(err);
			// 	}
			// });
		},

		onAgri: function() {
			this.oRouter.navTo("AgriSeta");
		},

		onMerseta: function() {
			this.oRouter.navTo("Merseta");
		},

		onCeta: function() {
			this.oRouter.navTo("Ceta");
		},

		handleError2MessageBoxPress: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.error(
				"Incorrect login creditials please enter the correct username or password.", {
					actions: [sap.m.MessageBox.Action.CLOSE],
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						// MessageToast.show("Action selected: " + sAction);
					}
				}
			);
		},

		onRegister: function(oEvent) {
			this.oRouter.navTo("RegisterPage");
		},

		onForgotPassword: function() {
			this.oRouter.navTo("ForgotPassword");
		}

	});

});
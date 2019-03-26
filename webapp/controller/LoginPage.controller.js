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

		onLogin: function() {
			// var script =
			// 	'<APPLET CODE="JavaApplication2.class"  WIDTH=350 HEIGHT=100 ></APPLET >';
			// document.write(script);

			// SimpleMessageApplet.setMessage("Hello");
			// $.ajax({
			// 	type: "POST",
			// 	url: 'https://petstore.swagger.io/v2/user',
			// 	async: false,
			// 	contentType: 'application/json',
			// 	dataType: 'jsonp',
			// 	accept: "*/*",
			// 	data: JSON.stringify({
			// 			id: 1993,
			// 		username: "Neo",
			// 		firstName: "string",
			// 		lastName: "string",
			// 		email: "string",
			// 		password: "string",
			// 		phone: "string",
			// 		userStatus: 0
			// 	}),
			// 	success: function(data, s, xhr) {
			// 		alert("success " + s);
			// 	}.bind(this),
			// 	error: function(err, e, xhr) {
			// 		alert("error " + e);
			// 	}
			// });

			// const Http = new XMLHttpRequest();
			// const url = 'https://jsonplaceholder.typicode.com/posts';
			// Http.open("GET", url);
			// Http.send();
			// Http.onreadystatechange = (e) => {
			// 	console.log(Http.responseText)
			// }
			// $.ajax({
			// 	type: 'POST',
			// 	url: 'https://petstore.swagger.io/v2/user',
			// 	crossDomain: true,
			// 	contentType: 'application/json',
			// 	dataType: 'jsonp',
			// 	accept: "*/*",
			// 	data: JSON.stringify({
			// 		id: 1993,
			// 		username: "Neo",
			// 		firstName: "string",
			// 		lastName: "string",
			// 		email: "string",
			// 		password: "string",
			// 		phone: "string",
			// 		userStatus: 0
			// 	}),

			// 	success: function(data, s, xhr) {
			// 		alert("success " + s);
			// 	}.bind(this),
			// 	error: function(err, e, xhr) {
			// 		alert("error " + e);
			// 	}
			// })

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

		UserAction: function() {
			var data = {
				action: "ENROL",
				fingerPrintData: "string",
				idNumber: "8002064019183"
			};
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					//alert(this.responseText);
					console.log(this.responseText);
				}
			};
			xhttp.open("POST", "http://192.168.1.56:8080/api/fingerprint/enrol-verify", true);
			xhttp.setRequestHeader("Content-type", "application/json");
			xhttp.setRequestHeader("accept", "*/*");
			// xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
			// xhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			// xhttp.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
			xhttp.send(data);
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
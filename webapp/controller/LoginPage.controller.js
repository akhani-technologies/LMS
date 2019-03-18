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

			$.ajax({
				type: "POST",
				url: 'http://10.142.0.3:8080/api/fingerprint/enrol-verify/{8002064019183}',
				async: false,
				contentType: 'application/json',
				dataType: 'json',
				accept: "*/*",
				data: JSON.stringify({
					action:"ENROL",
					fingerPrintData : "iVBORw0KGgoAAAANSUhEUgAAAfQAAAImCAMAAACSFogBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OX" ,
					idNumber: "8002064019183"
				}),
				success: function(data, s, xhr) {
					alert("success " + s);
				}.bind(this),
				error: function(err, e, xhr) {
					alert("error " + e);
				}
			});

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
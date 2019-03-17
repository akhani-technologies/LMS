sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox'
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.ForgotPassword", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.ForgotPassword
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.onGetUsers();
		},

		onGetUsers: function(oEvent) {
			//	var json = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: 'PHP/users.php',
				async: false,
				success: function(data) {
					this.Users = data.result;
				}.bind(this),
				error: function(err) {
					console.log(err);
				}
			});
		},

		onVerifyEmail: function(oEvent) {
			var oItem = oEvent.getSource();
			var email = this.byId("inpEmailAddress").getValue().toLowerCase();
			for (var i = 0; i < this.Users.length; i++) {
				if (email === this.Users[i].Email) {
					this.UserID = this.Users[i].UserID;
					oItem.setValueState("Success");
					oItem.setValueStateText(null);
					this.byId("lblNew").setVisible(true);
					this.byId("newPassword").setVisible(true);
					this.byId("lblconfirm").setVisible(true);
					this.byId("confirm").setVisible(true);
					break;
				} else {
					oItem.setValueState("Error");
					oItem.setValueStateText("Email address does not exist");
					this.byId("lblNew").setVisible(false);
					this.byId("newPassword").setVisible(false);
					this.byId("lblconfirm").setVisible(false);
					this.byId("confirm").setVisible(false);
				}
			}
		},
		
		onCancel:function(){
			this.oRouter.navTo("LoginPage");
		},

		onSubmitPress: function() {
			var oData = {};

			oData.Password = this.byId("newPassword").getValue();
			oData.UserID = this.UserID;
			if (oData.Password === this.byId("confirm").getValue()) {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/updatePassword.php',
					data: oData,
					//successfully logged on 
					success: function(data, response, xhr) {
						var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
						MessageBox.success(
							"Password reset successful", {
								styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function(sAction) {
									this.oRouter.navTo("LoginPage");
								}.bind(this)
							}
						);
					}.bind(this),
					error: function(e, status, xhr) {}
				});
			} else {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.warning(
					"Incorrect confirmation password provided", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf programmeMotse.view.ForgotPassword
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.ForgotPassword
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.ForgotPassword
		 */
		//	onExit: function() {
		//
		//	}

	});

});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox'
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.RegisterPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.view.RegisterPage
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		onRegister: function(oEvent) {
			// this.oRouter.navTo("LoginPage");
			var oData = {};

			oData.UserID = parseInt(("" + Math.random()).substring(2, 5));
			oData.Name = this.byId("inpName").getValue();
			oData.Surname = this.byId("inpSurname").getValue();
			oData.DOB = this.byId("inpDOB").getValue();
			oData.Password = this.byId("inpPassword").getValue();
			oData.AddressLine1 = this.byId("strNum").getValue() + ", " + this.byId("strName").getValue();
			oData.AddressLine2 = this.byId("addr2").getValue();
			oData.Suburb = this.byId("suburbId").getValue();
			oData.PostalCode = this.byId("code").getValue();
			oData.Province = this.byId("slctProv").getSelectedItem().getText();
			oData.Number = this.byId("contactNumber").getValue();
			oData.Email = this.byId("email").getValue().toLowerCase();
			oData.UserType = this.byId("cmbType").getSelectedItem().getText();

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/register.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					sap.ui.core.BusyIndicator.hide();
					this.handleSuccessMessageBoxPress();
					// oThat.oRouter.navTo("Menu");
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});
		},

		onCancel: function() {
			this.oRouter.navTo("LoginScreen");
		},

		onConfirmPassword: function(oEvent) {
			var confirm = oEvent.getSource();
			var password = this.byId("inpPassword").getValue();
			if (confirm.getValue() !== password) {
				confirm.setValueStateText("Passwords do not Match");
				confirm.setValueState("Error");
				// this._oViewModel.setProperty("/enableCreate", false);
			} else {
				confirm.setValueState("Success");
				// this._oViewModel.setProperty("/enableCreate", true);
			}
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Profile successfully created", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						this.oRouter.navTo("LoginScreen");
					}.bind(this)
				}
			);
		}

	});

});
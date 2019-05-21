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
			this.oRouter.getRoute("RegisterPage").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {
			var oIconBar = this.byId("iconRegister");
			oIconBar.setSelectedKey("general");
			this.ResetFields();
		},

		ResetFields: function() {
			this.byId("iconAddress").setEnabled(false);
			this.byId("btnRegister").setEnabled(false);
			this.byId("iconContact").setEnabled(false);
			this.byId("inpName").setValue(null);
			this.byId("inpSurname").setValue(null);
			this.byId("inpDOB").setValue(null);
			this.byId("inpPassword").setValue(null);
			this.byId("strNum").setValue(null);
			this.byId("strName").setValue(null);
			this.byId("addr2").setValue(null);
			this.byId("suburbId").setValue(null);
			this.byId("code").setValue(null);
			this.byId("slctProv").setSelectedItem(null);
			this.byId("contactNumber").setValue(null);
			this.byId("email").setValue(null);
			this.byId("cmbType").setSelectedItem(null);
			this.byId("inpConfirm").setValue(null);
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
			this.oRouter.navTo("LoginPage");
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
				this.onValidateGeneral();
				// this._oViewModel.setProperty("/enableCreate", true);
			}
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Profile successfully created", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						this.oRouter.navTo("LoginPage");
					}.bind(this)
				}
			);
		},

		onValidateGeneral: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formGeneral"));
			var oInputControl;
			// var oIconBar = this.byId("iconRegister");
			var sValue;
			var valid = false;
			for (var m = 0; m < aInputControls.length; m++) {
				oInputControl = aInputControls[m].control;
				var _roadCtrlType = oInputControl.getMetadata().getName();

				if (aInputControls[m].required) {
					if (_roadCtrlType === "sap.m.ComboBox") {
						sValue = oInputControl.getSelectedItem();
					} else {
						sValue = oInputControl.getValue();
					}
					if (!sValue) {
						valid = false;
						return;
					} else {
						valid = true;
					}
				}
			}
			if (valid) {
				this.byId("iconAddress").setEnabled(true);
				// oIconBar.setSelectedKey("address");
			} else {
				this.byId("iconAddress").setEnabled(false);
				// oIconBar.setSelectedKey("general");
			}
		},

		onValidateContact: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formContact"));
			var oInputControl;
			// var oIconBar = this.byId("iconRegister");
			var sValue;
			var valid = false;
			for (var m = 0; m < aInputControls.length; m++) {
				oInputControl = aInputControls[m].control;
				var _roadCtrlType = oInputControl.getMetadata().getName();

				if (aInputControls[m].required) {
					if (_roadCtrlType === "sap.m.ComboBox") {
						sValue = oInputControl.getSelectedItem();
					} else {
						sValue = oInputControl.getValue();
					}
					if (!sValue) {
						valid = false;
						return;
					} else {
						valid = true;
					}
				}
			}
			if (valid) {
				this.byId("btnRegister").setEnabled(true);
				// oIconBar.setSelectedKey("address");
			} else {
				this.byId("btnRegister").setEnabled(false);
				// oIconBar.setSelectedKey("general");
			}
		},

		onValidateAddress: function() {
			var aInputControls = this._getFormInputFields(this.byId("formAddr"));
			var oInputControl;
			// var oIconBar = this.byId("iconRegister");
			var sValue;
			var valid = false;
			for (var m = 0; m < aInputControls.length; m++) {
				oInputControl = aInputControls[m].control;
				var _roadCtrlType = oInputControl.getMetadata().getName();

				if (aInputControls[m].required) {
					if (_roadCtrlType === "sap.m.ComboBox") {
						sValue = oInputControl.getSelectedItem();
					} else {
						sValue = oInputControl.getValue();
					}
					if (!sValue) {
						valid = false;

						return;
					} else {
						valid = true;

					}
				}
			}
			if (valid) {
				this.byId("iconContact").setEnabled(true);
				// oIconBar.setSelectedKey("contact");
			} else {
				this.byId("iconContact").setEnabled(false);
				// oIconBar.setSelectedKey("general");
			}
		},

		checkPwd: function(oEvent) {
			var oControl = oEvent.getSource();
			var str = oEvent.getSource().getValue();
			var reg = /[!@#$%^&*(),._?":{}|<>]/;

			if (str.length < 6) {
				oControl.setValueState("Error");
				oControl.setValueStateText("Password should have a minimum of 6 characters");
				this.byId("iconAddress").setEnabled(false);
				// return ("too_short");
			} else
			if (str.length > 50) {
				oControl.setValueState("Error");
				oControl.setValueStateText("Password too long");
				this.byId("iconAddress").setEnabled(false);
				// return ("too_long");
			} else if (str.search(/\d/) == -1) {
				oControl.setValueState("Error");
				oControl.setValueStateText("Password should have at least 1 number");
				this.byId("iconAddress").setEnabled(false);
				// return ("no_num");
			} else if (str.search(/[A-Z]/) == -1) {
				oControl.setValueState("Error");
				oControl.setValueStateText("Password should have at least 1 Capital Letter");
				this.byId("iconAddress").setEnabled(false);
				// return ("no_letter");
			} else if (!reg.test(str)) {
				oControl.setValueState("Error");
				oControl.setValueStateText("Password should have at least 1 Special character");
			} else {
				if (this.byId("inpConfirm").getValue() !== "") {
					if (this.byId("inpConfirm").getValue() !== str) {
						this.byId("inpConfirm").setValueState("Error");
						this.byId("inpConfirm").setValueStateText("Passwords do not match");
					} else {
						this.byId("inpConfirm").setValueState("Success");
						this.byId("inpConfirm").setValueStateText("Passwords match");
					}
				}
				oControl.setValueState("Success");
				oControl.setValueStateText("Strong password");
				this.onValidateGeneral();
			}

			return ("ok");
		},

		_getSimpleFormFields: function(oSimpleForm) {
			var aControls = [];
			var aFormContent = oSimpleForm.getContent();
			var sControlType;
			for (var i = 0; i < aFormContent.length; i++) {
				sControlType = aFormContent[i].getMetadata().getName();
				if (sControlType === "sap.m.Input" || sControlType === "sap.m.MaskInput" || sControlType === "sap.m.ComboBox" || sControlType ===
					"sap.m.DatePicker") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
		},

		_getFormInputFields: function(oForm) {
			var aControls = [];
			var aFormContainerElementFields = [];
			var aFormContainers = oForm.getFormContainers();
			var bool;

			for (var i = 0; i < aFormContainers.length; i++) {
				var aFormElements = aFormContainers[i].getFormElements();
				bool = aFormContainers[i].getVisible();
				if (bool) {
					for (var j = 0; j < aFormElements.length; j++) {
						var oFormElement = aFormElements[j];
						var aFormFields = oFormElement.getFields();
						var oFormLabel = oFormElement.getLabel();
						for (var n = 0; n < aFormFields.length; n++) {
							aFormContainerElementFields.push({
								control: aFormFields[n],
								label: oFormLabel
							});
						}
					}
				}
			}

			for (i = 0; i < aFormContainerElementFields.length; i++) {
				var sControlType = aFormContainerElementFields[i].control.getMetadata().getName();
				if (sControlType === "sap.m.Input" || sControlType === "sap.m.MaskInput" || sControlType === "sap.m.ComboBox" || sControlType ===
					"sap.m.DatePicker") {
					aControls.push({
						control: aFormContainerElementFields[i].control,
						required: aFormContainerElementFields[i].label.getRequired()
					});
				}
			}
			return aControls;
		}

	});

});
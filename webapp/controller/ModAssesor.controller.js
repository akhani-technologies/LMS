sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.ModAssesor", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.view.ModAssesor
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("ModAssesor").attachPatternMatched(this._onObjectMatched, this);
			this.onGetServiceProviders();

		},
		_onObjectMatched: function() {
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			this.ResetFields();
		},

		ResetFields: function() {
			this.byId("cmbMod").setSelectedItem(null);
			this.byId("inpName").setValue(null);
			this.byId("inpONumber").setValue(null);
			this.byId("inpMNumber").setValue(null);
			this.byId("inpEmail").setValue(null);
			this.byId("Uploader").setValue(null);
			this.byId("inpID").setValue(null);
			this.byId("inpSurname").setValue(null);
			this.byId("cmbProvider").setSelectedItem(null);
			this.byId("btnSave").setEnabled(false);
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

		onGetServiceProviders: function() {
			this.serviceModel = new sap.ui.model.json.JSONModel();
			var Select = this.byId("cmbProvider");
			$.ajax({
				url: 'PHP/getServiceProviders.php',
				async: false,
				data:{
					CompanyCode : this.CompanyCode
				},
				success: function(data) {
					var oData = data.result;
					this.serviceModel.setData(oData);
					Select.setModel(this.serviceModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onValidate: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("ModAssessor"));
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
				this.byId("btnSave").setEnabled(true);
				// oIconBar.setSelectedKey("address");
			} else {
				this.byId("btnSave").setEnabled(false);
				// oIconBar.setSelectedKey("general");
			}
		},

		_getSimpleFormFields: function(oSimpleForm) {
			var aControls = [];
			var aFormContent = oSimpleForm.getContent();
			var sControlType;
			for (var i = 0; i < aFormContent.length; i++) {
				sControlType = aFormContent[i].getMetadata().getName();
				if (sControlType === "sap.m.Input" || sControlType === "sap.ui.unified.FileUploader" || sControlType === "sap.m.ComboBox") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
		},

		onSaveDetails: function(oEvent) {
			var oData = {};
			oData.PersonID = parseInt(("" + Math.random()).substring(2, 5));
			oData.PersonType = this.byId("cmbMod").getSelectedItem().getText();
			oData.Name = this.byId("inpName").getValue();
			oData.OfficeNumber = this.byId("inpONumber").getValue();
			oData.MobileNumber = this.byId("inpMNumber").getValue();
			oData.Email = this.byId("inpEmail").getValue();
			oData.ProofOfReg = window.Content;
			oData.IDNumber = this.byId("inpID").getValue();
			oData.Surname = this.byId("inpSurname").getValue();
			oData.ServiceProvider = this.byId("cmbProvider").getSelectedItem().getText();
			oData.CompanyCode = this.CompanyCode;

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createAssesorMod.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.AddEntryLog("Created an Assessor/Moderator");
					this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});
			// this.handleSuccessMessageBoxPress();
		},
		_getLogDate: function() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; //January is 0!
			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			var ScanDate = yyyy + mm + dd;
			return ScanDate;
		},

		_getLogTime: function() {
			var ScanTime = new Date().toLocaleTimeString('en-GB');
			ScanTime = ScanTime.replace(/:/g, "");
			return ScanTime;
		},

		AddEntryLog: function(change) {
			var oUserModel = sap.ui.getCore().getModel("loggedUser");
			var user = oUserModel.getData();
			var oData = {};
			oData.logID = parseInt(("" + Math.random()).substring(2, 5));
			oData.Username = user.Name + " " + user.Surname;
			oData.Date = this._getLogDate();
			oData.Time = this._getLogTime();
			oData.Change = change;
			oData.CompanyCode = this.CompanyCode;

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/EntryLog.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					console.log(data);
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});

		},

		onAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var oFileReader = new FileReader();

			oFileReader.onload = function() {
				var base64String = oFileReader.result;
				window.Content = base64String.split(',')[1];
			};

			//	var txt = oParameters.files[0] var my_file_as_base64 = getBase64(file)
			window.IDfileName = oParameters.files[0].name;
			window.IDfileType = oParameters.files[0].type;

			oFileReader.readAsDataURL(oParameters.files[0]);
			this.onValidate();
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Assessor application successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		}

	});

});
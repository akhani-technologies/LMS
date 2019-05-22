sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Attendance", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Attendance").attachPatternMatched(this._onObjectMatched, this);

			if (!this.sdk) {
				this.sdk = new Fingerprint.WebApi();
			}
		},

		_onObjectMatched: function() {
			this.sdk.onDeviceConnected = function(e) {
				// Detects if the deveice is connected for which acquisition started
				MessageBox.information(
					"Device successfully connected.", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			};
			this.sdk.onDeviceDisconnected = function(e) {
				// Detects if device gets disconnected - provides deviceUid of disconnected device
				MessageBox.alert(
					"Scanning device disconnected.", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			};
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			this.onGetFacilitators();
			this.onGetLearner();

			this.byId("type").setSelectedItem(null);
			this.byId("conType").setSelectedItem(null);
			this.byId("cmbClock").setSelectedItem(null);
			this.byId("txtNotes").setValue(null);
			this.byId("finger1").setSrc("images/index.png");

			
		},

		onGetFacilitators: function() {
			var oSelect = this.byId("cmbFacilitator");
			this.facilitatorModel = new sap.ui.model.json.JSONModel();
			var facilitatorArr = [];
			$.ajax({
				url: 'PHP/getFacilitators.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++){
						if(data.result[i].CompanyCode === this.CompanyCode){
							facilitatorArr.push(data.result[i]);
						}
					}
					this.facilitatorModel.setData(facilitatorArr);
					oSelect.setModel(this.facilitatorModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onGetVenue: function() {
			this.venueModel = new sap.ui.model.json.JSONModel();
			var Select = this.byId("cmbVenue");
			var venueArr = [];
			$.ajax({
				url: 'PHP/getVenue.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++){
						if(data.result[i].CompanyCode === this.CompanyCode){
							venueArr.push(data.result[i]);
						}
					}
					this.venueModel.setData(venueArr);
					Select.setModel(this.venueModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onGetLearner: function() {
			this.LearnerModel = new sap.ui.model.json.JSONModel();
			var Select = this.byId("cmbLearner");
			var learnerArr = [];
			$.ajax({
				url: 'PHP/learnerDetails.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++){
						if(data.result[i].CompanyCode === this.CompanyCode){
							learnerArr.push(data.result[i]);
						}
					}
					this.LearnerModel.setData(learnerArr);
					Select.setModel(this.LearnerModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
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

		onSaveDetails: function(msg) {
			var oData = {};
			oData.AttendanceID = parseInt(("" + Math.random()).substring(2, 5));
			oData.UserType = this.byId("type").getSelectedItem().getText();
			oData.ConfirmationType = this.byId("conType").getSelectedItem().getText();
			oData.Clock = this.byId("cmbClock").getSelectedItem().getText();
			oData.Notes = this.byId("txtNotes").getValue();
			oData.Status = "Verified";
			oData.CompanyCode = this.CompanyCode;
			var dt = new Date();
			oData.Stamp = dt.toString();
			if (oData.UserType === "Learner") {
				oData.IDNumber = this.LearnerID;
				oData.Name = this.LearnerName;
			} else {
				oData.IDNumber = this.FacilitatorID;
				oData.Name = this.FacilitatorName;
			}

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createAttendance.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});

			// this.handleSuccessMessageBoxPress();
		},

		onSelectLeaner: function(oEvent) {
			var sPath = oEvent.getSource().getSelectedItem().getBindingContext().getPath();
			var properties = this.LearnerModel.getProperty(sPath);
			this.LearnerID = properties.IDNumber;
			this.LearnerName = properties.Name + " " + properties.Surname;
		},

		onSelectFacilitator: function(oEvent) {
			var sPath = oEvent.getSource().getSelectedItem().getBindingContext().getPath();
			var properties = this.facilitatorModell.getProperty(sPath);
			this.FacilitatorID = properties.IDNumber;
			this.FacilitatorName = properties.Name + " " + properties.Surname;
		},

		onTypeSelect: function(oEvent) {
			var type = oEvent.getSource().getSelectedItem().getText();

			if (type === "Learner") {
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(false);
				this.byId("cmbLearner").setVisible(true);
				this.byId("lblFacilitator").setVisible(false);
				this.byId("lblLearner").setVisible(true);
				this.byId("lblFacilitator").setRequired(false);
				this.byId("lblLearner").setRequired(true);
			} else if (type === "Facilitator") {
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(true);
				this.byId("cmbLearner").setVisible(false);
				this.byId("lblFacilitator").setVisible(true);
				this.byId("lblLearner").setVisible(false);
				this.byId("lblFacilitator").setRequired(true);
				this.byId("lblLearner").setRequired(false);
			} else {
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(false);
				this.byId("cmbLearner").setVisible(false);
				this.byId("lblFacilitator").setVisible(false);
				this.byId("lblLearner").setVisible(false);
				this.byId("lblFacilitator").setRequired(false);
				this.byId("lblLearner").setRequired(false);
			}
			this.onValidateGeneral();
		},

		onStartFingerPrint: function() {
			this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(function() {
				this.onSampleAcquired();
			}.bind(this), function(error) {
				console.log(error.message);
			});

		},

		onStopFingerPrint: function() {
			this.sdk.stopAcquisition().then(function() {
				// console.log("Capturing stopped !!!");
			}, function(error) {
				// showMessage(error.message);
			});
		},

		onSampleAcquired: function() {
			var fingerprint = this.byId("finger1");
			this.sdk.onSamplesAcquired = function(s) {
				var samples = JSON.parse(s.samples);
				var sampleObject = Fingerprint.b64UrlTo64(samples[0]);
				fingerprint.setSrc("data:image/png;base64," + sampleObject);
				this.fingerprint = sampleObject;
				//console.log("WSQ Format  " + this.fingerprint);
			}.bind(this);
		},

		enrolOrVerify: function() {
			var oComboType = this.byId("type").getSelectedItem().getText();
			var sID = null;

			if (!this.fingerprint) {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.warning(
					"Please scan the finger before saving", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			} else {
				if (oComboType === "Learner") {
					sID = this.LearnerID;
				} else {
					sID = this.FacilitatorID;
				}
				var fingerprintStatusRequest = {
					"action": "VERIFY", // Dynamically load the action depending on the workflow
					"idNumber": sID, // Dynamically load the ID number from the UI
					"fingerprintIndex": 1, //for now you may hard code it to 1. This must not hard coded  if many fingers are enrolled
					"fingerprintData": this.fingerprint
				};

				var fingerprintStatusRequestJson;
				fingerprintStatusRequestJson = JSON.stringify(fingerprintStatusRequest);

				var URL = "http://102.133.161.46:8080/api/fingerprint/enrol-verify";
				var xmlhttp = new XMLHttpRequest();

				xmlhttp.open("POST", URL, false);
				xmlhttp.setRequestHeader("Content-Type", "application/json");

				// xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
				xmlhttp.send(fingerprintStatusRequestJson);

				xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
				// this.byId("btnPrints").setEnabled(true);
			}

		},

		callbackFunction: function(xmlhttp) {
			var response = JSON.parse(xmlhttp.response);
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			if (response.success) {
				this.onSaveDetails(response.failureReason);
				this.byId("btnPrints").setEnabled(true);
			} else {
				MessageBox.warning(
					"Please make sure you you have selected the correct information and used the correct finger to verify", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}
			// console.log(response);
		},

		handleSuccessMessageBoxPress: function(msg) {
			var oComboType = this.byId("type").getSelectedItem().getText();
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				oComboType + " Successfully Verfied", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		},

		onValidateGeneral: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formAttendance"));
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
				if (sControlType === "sap.m.ComboBox") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
		}

	});
});
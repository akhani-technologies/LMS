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
			this.onGetFacilitators();
			this.onGetLearner();

			this.byId("type").setSelectedItem(null);
			this.byId("conType").setSelectedItem(null);
			this.byId("cmbClock").setSelectedItem(null);
			this.byId("txtNotes").setValue(null);
		},

		onGetFacilitators: function() {
			var oSelect = this.byId("cmbFacilitator");
			this.facilitatorModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: 'PHP/getFacilitators.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.facilitatorModel.setData(oData);
					oSelect.setModel(this.facilitatorModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onGetVenue: function() {
			this.venueModel = new sap.ui.model.json.JSONModel();
			var Select = this.byId("cmbVenue");
			$.ajax({
				url: 'PHP/getVenue.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.venueModel.setData(oData);
					Select.setModel(this.venueModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onGetLearner: function() {
			this.LearnerModel = new sap.ui.model.json.JSONModel();
			var Select = this.byId("cmbLearner");
			$.ajax({
				url: 'PHP/learnerDetails.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.LearnerModel.setData(oData);
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

		onSaveDetails: function(oEvent) {
			var oData = {};
			oData.AttendanceID = parseInt(("" + Math.random()).substring(2, 5));
			oData.UserType = this.byId("type").getSelectedItem().getText();
			oData.ConfirmationType = this.byId("conType").getSelectedItem().getText();
			oData.Clock = this.byId("cmbClock").getSelectedItem().getText();
			oData.Notes = this.byId("txtNotes").getValue();
			oData.Status = "Verified";
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
			} else if (type === "Facilitator") {
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(true);
				this.byId("cmbLearner").setVisible(false);
				this.byId("lblFacilitator").setVisible(true);
				this.byId("lblLearner").setVisible(false);
			} else {
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(false);
				this.byId("cmbLearner").setVisible(false);
				this.byId("lblFacilitator").setVisible(false);
				this.byId("lblLearner").setVisible(false);
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
				console.log("Capturing stopped !!!");
			}, function(error) {
				showMessage(error.message);
			});
		},

		onSampleAcquired: function() {
			var fingerprint = this.byId("finger1");
			this.sdk.onSamplesAcquired = function(s) {
				var samples = JSON.parse(s.samples);
				fingerprint.setSrc("data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
				this.fingerprint = Fingerprint.b64UrlTo64(samples[0]);

			};
		},

		// onSampleAcquired2:function

		onSaveFingerPrint: function() {
			$.ajax({
				type: "POST",
				url: 'https://petstore.swagger.io/v2/pet',
				async: false,
				contentType: 'application/json',
				dataType: 'json',
				accept: "application/json",
				data: JSON.stringify({
					id: 1988,
					category: {
						id: 1,
						name: "Neo"
					},
					name: "doggie",
					photoUrls: [
						"string"
					],
					tags: [{
						id: 1,
						name: "Lehoko"
					}],
					status: "available"
				}),
				success: function(data, s, xhr) {
					alert("success " + s);
				}.bind(this),
				error: function(err, e, xhr) {
					alert("error " + e);
				}
			});
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Attendance information successfully submitted", {
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
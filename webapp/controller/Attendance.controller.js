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
			// this.onGetVenue();
			this.onGetModerators();
			this.onGetLearner();
		},
		
		

		onGetFacilitators: function() {
			var oSelect = this.byId("cmbFacilitator");
			var facilitatorModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: 'PHP/getFacilitators.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					facilitatorModel.setData(oData);
					oSelect.setModel(facilitatorModel);
				},
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

		onGetModerators: function() {
			this.ModModel = new sap.ui.model.json.JSONModel();
			var Select = this.byId("cmbMod");
			$.ajax({
				url: 'PHP/getModerator.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.ModModel.setData(oData);
					Select.setModel(this.ModModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},
		
		onGetLearner:function(){
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
			oData.AttendanceID = mysqli_real_escape_string($conn, $_POST['AttendanceID']);
			oData.UserType = mysqli_real_escape_string($conn, $_POST['UserType']);
			oData.ConfirmationType = mysqli_real_escape_string($conn, $_POST['ConfirmationType']);
			oData.IDNumber = mysqli_real_escape_string($conn, $_POST['IDNumber']);
			oData.TimeIn = mysqli_real_escape_string($conn, $_POST['TimeIn']);
			oData.TimeOut = mysqli_real_escape_string($conn, $_POST['TimeOut']);
			oData.Date = mysqli_real_escape_string($conn, $_POST['Date']);
			oData.Notes = mysqli_real_escape_string($conn, $_POST['Notes']);
			oData.Status = mysqli_real_escape_string($conn, $_POST['Status']);
			oData.Name = mysqli_real_escape_string($conn, $_POST['Name']);
			oData.Surname = mysqli_real_escape_string($conn, $_POST['Surname']);

			this.handleSuccessMessageBoxPress();
		},
		
		onTypeSelect:function(oEvent){
			var type = oEvent.getSource().getSelectedItem().getText();
			
			if(type === "Learner"){
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(false);
				this.byId("cmbMod").setVisible(false);
				this.byId("cmbLearner").setVisible(true);
			}else if(type === "Facilitator"){
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(true);
				this.byId("cmbMod").setVisible(false);
				this.byId("cmbLearner").setVisible(false);
			}else if (type === ""){
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(false);
				this.byId("cmbMod").setVisible(false);
				this.byId("cmbLearner").setVisible(false);
			}else{
				// this.byId("cmbVenue").setVisible(false);
				this.byId("cmbFacilitator").setVisible(false);
				this.byId("cmbMod").setVisible(true);
				this.byId("cmbLearner").setVisible(false);
			}
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
		}

	});
});
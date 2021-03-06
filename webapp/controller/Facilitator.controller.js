sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Facilitator", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Facilitator").attachPatternMatched(this._onObjectMatched, this);
			if (!this.sdk) {
				this.sdk = new Fingerprint.WebApi();
			}
		},

		_onObjectMatched: function() {
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			this.onGetVenue();
			this.ResetFields();

		},

		ResetFields: function() {
			this.byId("inpFName").setValue(null);
			this.byId("inpONumber").setValue(null);
			this.byId("inpMobile").setValue(null);
			this.byId("inpEmail").setValue(null);
			this.byId("file").setValue(null);
			this.byId("inpID").setValue(null);
			this.byId("inpFSurname").setValue(null);
			this.byId("cmbVenue").setSelectedItem(null);
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

		onAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var oFileReader = new FileReader();

			oFileReader.onload = function() {
				var base64String = oFileReader.result;
				window.IDContent = base64String.split(',')[1];
			};

			//	var txt = oParameters.files[0] var my_file_as_base64 = getBase64(file)
			window.IDfileName = oParameters.files[0].name;
			window.IDfileType = oParameters.files[0].type;

			oFileReader.readAsDataURL(oParameters.files[0]);
			this.onValidate();
		},

		handlePopoverPress: function(oEvent) {
			// create popover
			this.event = oEvent.getSource();
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("programmeMotse.view.Fragments.Popover", this);
				this.getView().addDependent(this._oPopover);
			}
			this._oPopover.openBy(oEvent.getSource());
		},

		handleAttachment: function() {
			this.event.setText(window.IDfileName);
			this.event.setEnabled(false);
			this.event.setType("Accept");
			this._oPopover.close();
		},

		onSaveDetails: function(oEvent) {
			var oData = {};
			oData.FacilitatorID = parseInt(("" + Math.random()).substring(2, 5));
			oData.Name = this.byId("inpFName").getValue();
			oData.OfficeNumber = this.byId("inpONumber").getValue();
			oData.MobileNumber = this.byId("inpMobile").getValue();
			oData.Email = this.byId("inpEmail").getValue();
			oData.ProofOfReg = window.bankStatementContent;
			oData.IDNumber = this.byId("inpID").getValue();
			oData.Surname = this.byId("inpFSurname").getValue();
			oData.TrainingCenter = this.byId("cmbVenue").getSelectedItem().getText();
			oData.CompanyCode = this.CompanyCode;

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createFacilitator.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.AddEntryLog("Created a facilitator");
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

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Facilitator information successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
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
				var sampleObject = Fingerprint.b64UrlTo64(samples[0]);
				fingerprint.setSrc("data:image/png;base64," + sampleObject);
				this.fingerprint = sampleObject;
				//console.log("WSQ Format  " + this.fingerprint);

			}.bind(this);
		},

		enrolOrVerify: function() {
			var IdNumber = this.byId("inpID").getValue();
			if (!this.fingerprint) {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.warning(
					"Please scan the learners right hand thumb before saving", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			} else {
				var fingerprintStatusRequest = {
					"action": "ENROL", // Dynamically load the action depending on the workflow
					"idNumber": IdNumber, // Dynamically load the ID number from the UI
					"fingerprintIndex": 1, //for now you may hard code it to 1. This must not hard coded  if many fingers are enrolled
					"fingerprintData": this.fingerprint
				};

				var fingerprintStatusRequestJson;
				fingerprintStatusRequestJson = JSON.stringify(fingerprintStatusRequest);

				// var URL = "http://35.229.36.224:8080/api/fingerprint/enrol-verify";  //Your URL
				var URL = "http://102.133.161.46:8080/api/fingerprint/enrol-verify";
				var xmlhttp = new XMLHttpRequest();

				// xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);

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
				MessageBox.success(
					response.failureReason, {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
				this.byId("btnSave").setEnabled(true);
			} else {
				MessageBox.warning(
					response.failureReason, {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}
			// console.log(response);
		},

		onNextPress: function() {
			this.byId("fingerIcon").setEnabled(true);
			var oIconTabBar = this.getView().byId("FacTabBar");
			oIconTabBar.setSelectedKey("Key2");
			$("body").scrollTop(0);
		},

		onBankAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var bFileReader = new FileReader();

			bFileReader.onload = function() {
				var base64String = bFileReader.result;
				window.bankStatementContent = base64String.split(',')[1];
			};
			window.bankStatementfileId = oParameters.id;
			window.bankStatementfileName = oParameters.files[0].name;
			window.bankStatementfileType = oParameters.files[0].type;
			bFileReader.readAsDataURL(oParameters.files[0]);
			this.onValidate();
		},

		onValidate: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formFacilitator"));
			var oInputControl;
			var sValue;
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
						this.byId("btnNext").setEnabled(false);
						return;
					} else {
						this.byId("btnNext").setEnabled(true);
					}
				}
			}
		},

		_getSimpleFormFields: function(oSimpleForm) {
			var aControls = [];
			var aFormContent = oSimpleForm.getContent();
			var sControlType;
			for (var i = 0; i < aFormContent.length; i++) {
				sControlType = aFormContent[i].getMetadata().getName();
				if (sControlType === "sap.m.Input" || sControlType === "sap.m.ComboBox" || sControlType === "sap.ui.unified.FileUploader") {
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
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.IncidentReport", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.IncidentReport
		 */
		onInit: function() {

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("IncidentReport").attachPatternMatched(this._onObjectMatched, this);

		},

		_onObjectMatched: function(oEvent) {
			this.byId("cmbType").setSelectedItem(null);
			this.byId("cmbVenue").setSelectedItem(null);
			this.byId("cmbLearner").setSelectedItem(null);
			this.byId("txtDescr").setValue(null);
			this.byId("txtDetails").setValue(null);
			this.byId("attach").setValue(null);
			this.onGetLearner();
			this.onGetVenue();
			this.onGetFacilitator();
		},

		onGetLearner: function() {
			this.learnerModel = new sap.ui.model.json.JSONModel();
			var oSelect = this.byId("cmbLearner");
			$.ajax({
				url: 'PHP/learnerDetails.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.learnerModel.setData(oData);
					oSelect.setModel(this.learnerModel);
				}.bind(this),
				error: function(err) {

				}
			});
		},

		onGetFacilitator: function() {
			this.facilitatorModel = new sap.ui.model.json.JSONModel();
			var Select = this.byId("cmbFacilitor");
			$.ajax({
				url: 'PHP/getFacilitators.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.facilitatorModel.setData(oData);
					Select.setModel(this.facilitatorModel);
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

		onSelectFor: function(oEvent) {
			var oItem = oEvent.getSource().getSelectedItem().getText();
			if (oItem === "Learner") {
				this.byId("lblLearner").setVisible(true);
				this.byId("cmbLearner").setVisible(true);
				this.byId("lblvenue").setVisible(false);
				this.byId("cmbVenue").setVisible(false);
				this.byId("lblfacilitator").setVisible(false);
				this.byId("cmbFacilitor").setVisible(false);
				this.byId("lblOther").setVisible(false);
				this.byId("inpOther").setVisible(false);
			} else if (oItem === "Facilitator") {
				this.byId("lblLearner").setVisible(false);
				this.byId("cmbLearner").setVisible(false);
				this.byId("lblvenue").setVisible(false);
				this.byId("cmbVenue").setVisible(false);
				this.byId("lblfacilitator").setVisible(true);
				this.byId("cmbFacilitor").setVisible(true);
				this.byId("lblOther").setVisible(false);
				this.byId("inpOther").setVisible(false);
			} else if (oItem === "Training Center") {
				this.byId("lblLearner").setVisible(false);
				this.byId("cmbLearner").setVisible(false);
				this.byId("lblvenue").setVisible(true);
				this.byId("cmbVenue").setVisible(true);
				this.byId("lblfacilitator").setVisible(false);
				this.byId("cmbFacilitor").setVisible(false);
				this.byId("lblOther").setVisible(false);
				this.byId("inpOther").setVisible(false);
			} else {
				this.byId("lblLearner").setVisible(false);
				this.byId("cmbLearner").setVisible(false);
				this.byId("lblvenue").setVisible(false);
				this.byId("cmbVenue").setVisible(false);
				this.byId("lblfacilitator").setVisible(false);
				this.byId("cmbFacilitor").setVisible(false);
				this.byId("lblOther").setVisible(true);
				this.byId("inpOther").setVisible(true);
			}
		},

		onSaveIncident: function() {
			var oData = {};
			oData.IncidentID = parseInt(("" + Math.random()).substring(2, 5));
			oData.Type = this.byId("cmbType").getSelectedItem().getText();
			if (oData.Type === "Learner") {
				oData.TypeInfo = this.byId("cmbLearner").getSelectedItem().getText();
			} else if (oData.Type === "Facilitator") {
				oData.TypeInfo = this.byId("cmbFacilitor").getSelectedItem().getText();
			} else if (oData.Type === "Other") {
				oData.TypeInfo = this.byId("inpOther").getValue();
			} else {
				oData.TypeInfo = this.byId("cmbVenue").getSelectedItem().getText();
			}
			oData.Description = this.byId("txtDescr").getValue();
			oData.Details = this.byId("txtDetails").getValue();
			oData.Attachment = window.Content;

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/CreateIncident.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.AddEntryLog("Reported an incident");
					this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});
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
			oFileReader.readAsDataURL(oParameters.files[0]);
			this.onValidate();
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Incident logged successfully", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
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

		onValidate: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formIncident"));
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
		}

	});

});
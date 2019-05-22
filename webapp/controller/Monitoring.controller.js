sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox'
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Monitoring", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.Monitoring
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Monitoring").attachPatternMatched(this._onObjectMatched, this);
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			this.onGetProjects();
		},

		onGetProjects: function() {
			var ProjectsModel = new sap.ui.model.json.JSONModel();
			var PreCombo = this.byId("inpProject");
			var projectArr = [];
			$.ajax({
				url: 'PHP/getProjects.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++){
						if(data.result[i].CompanyCode === this.CompanyCode){
							projectArr.push(data.result[i]);
						}
					}
					ProjectsModel.setData(projectArr);
					PreCombo.setModel(ProjectsModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

			onSaveDetails: function() {
			var oData = {};
			if (this.byId("inpProject").getSelectedItem() === undefined) {
				this.handleWarningMessageBoxPress();
			} else {
				oData.Project = this.byId("inpProject").getSelectedItem().getText();
				oData.ContractualA = this.byId("inpContractual").getValue();
				oData.Establishment = this.byId("inpEstablishment").getValue();
				oData.Service = this.byId("inpService").getValue();
				oData.Recruitment = this.byId("inpLearner").getValue();
				oData.Arrange = this.byId("inpArrange").getValue();
				oData.Conduct = this.byId("inpConduct").getValue();
				oData.Upload = this.byId("inpUpload").getValue();
				oData.Invoicing = this.byId("inpInvoicing").getValue();
				oData.Implementation = this.byId("inpImplementation").getValue();
				oData.Successes = this.byId("inpSeccesses").getValue();
				oData.Recommendations = this.byId("inpRecommendations").getValue();
				oData.ClosingRemarks = this.byId("inpClosing").getValue();
				oData.CompanyCode = this.CompanyCode;

				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/CreateInception.php',
					data: oData,
					//successfully logged on 
					success: function(data, response, xhr) {
						this.AddEntryLog("Created an inception report");
						this.handleSuccessMessageBoxPress();
					}.bind(this),
					error: function(e, status, xhr) {

					}
				});
			}

		},
		handleWarningMessageBoxPress: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.warning(
				"Please select a project from the dropdown list or add one under the project tile.", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
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

		onValidateField: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formInception"));
			var oInputControl;
			var sValue;
			for (var m = 0; m < aInputControls.length; m++) {
				oInputControl = aInputControls[m].control;

				if (aInputControls[m].required) {

					sValue = oInputControl.getValue();

					if (!sValue) {
						this.byId("btnSave").setEnabled(false);
						return;
					} else {
						this.byId("btnSave").setEnabled(true);
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
				if (sControlType === "sap.m.Input" || sControlType === "sap.m.TextArea") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
		},

		onNavBack: function() {
			this.oRouter.navTo("MenuPage");

		},
		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Inception report information successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf programmeMotse.view.Monitoring
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.Monitoring
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.Monitoring
		 */
		//	onExit: function() {
		//
		//	}

	});

});
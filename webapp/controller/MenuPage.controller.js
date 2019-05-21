sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.MenuPage", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("MenuPage").attachPatternMatched(this._onObjectMatched, this);
			this._oViewModel = new sap.ui.model.json.JSONModel({
				onShowCreate: false
			});
			this.getView().setModel(this._oViewModel, "viewModel");
		},

		_onObjectMatched: function() {
			var oTypeModel = sap.ui.getCore().getModel("userType");
			var userType = oTypeModel.getData();
			if (userType === "Project Manager" || userType === "Project Administrator") {
				this._oViewModel.setProperty("/onShowCreate", true);
			} else {
				this._oViewModel.setProperty("/onShowCreate", false);
			}

		},

		onLearnerInfoPress: function(oEvent) {
			this.oRouter.navTo("LearnerMenu");
			// this.onVerifyLearner(oEvent);
			// this.oRouter.navTo("LearnerInfo");

		},

		onIncidentReport: function(oEvent) {
			this.oRouter.navTo("IncidentReport");
		},

		onAttendencePress: function(oEvent) {
			this.oRouter.navTo("Attendance");
		},

		onTrainingPress: function(oEvent) {
			this.oRouter.navTo("Training");
		},

		onUserPress: function(oEvent) {
			this.oRouter.navTo("TrainingVenue");
		},

		onMonitorPress: function(oEvent) {
			this.oRouter.navTo("Facilitator");
		},

		onReportingPress: function(oEvent) {
			this.oRouter.navTo("Reporting");
		},

		onImplementationPress: function(oEvent) {
			this.oRouter.navTo("Implementation");
		},

		onModAssesor: function() {
			this.oRouter.navTo("ModAssesor");
		},

		onMonitor: function() {
			this.oRouter.navTo("Monitoring");
		},
		
		onAddAttachments:function(){
			this.oRouter.navTo("Attachments");
		},
		handleConfirmationMessageBoxPress: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.warning(
				"Do you want to logout?", {
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction, type) {
						if (sAction === "YES") {
							this.oRouter.navTo("LoginPage");
						}
					}.bind(this)
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
		}

	});
});
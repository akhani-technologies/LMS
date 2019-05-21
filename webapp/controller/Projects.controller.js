sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Projects", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.Projects
		 */
		onInit: function() {

		},

		onAddProject: function(oEvent) {
			this.event = oEvent.getSource();
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("programmeMotse.view.Fragments.AddProject", this);
				this.getView().addDependent(this._oPopover);
			}
			sap.ui.getCore().byId("inpProjectName").setValue(null);
			sap.ui.getCore().byId("inpStartDate").setValue(null);
			sap.ui.getCore().byId("inpEndDate").setValue(null);
			this._oPopover.open();
			// this._oPopover.openBy(oEvent.getSource());
		},

		onSaveProject: function() {
			var oTable = this.byId("projectTable");
			var oData = {};
			oData.ProjectID = parseInt(("" + Math.random()).substring(2, 5));
			oData.ProjectName = sap.ui.getCore().byId("inpProjectName").getValue();
			oData.ProjectStartDate = sap.ui.getCore().byId("inpStartDate").getValue();
			oData.ProjectEndDate = sap.ui.getCore().byId("inpEndDate").getValue();
			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: oData.ProjectName,
						width: "auto"
					}),
					new sap.m.Text({
						text: oData.ProjectStartDate,
						width: "auto"
					}),
					new sap.m.Text({
						text: oData.ProjectEndDate,
						width: "auto"
					})
					// new sap.ui.unified.FileUploader("sId?")
				]
			});

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/CreateProject.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					oTable.addItem(columnListItemNewLine);
					this._oPopover.close();
					this.AddEntryLog();
					// oThat.oRouter.navTo("Menu");
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

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf programmeMotse.view.Projects
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.Projects
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.Projects
		 */
		//	onExit: function() {
		//
		//	}

	});

});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox',
	"sap/ui/core/routing/History"
], function(Controller, MessageBox, History) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Tools", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.Tools
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Tools").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent) {
			var oModel = sap.ui.getCore().getModel("learnerModel");
			this.getView().setModel(oModel);
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").learnerPath
			});
			this.LearnerID = oModel.getProperty("/" + oEvent.getParameter("arguments").learnerPath).LearnerID;
		},

		onAddItems: function() {
			var oTable = this.byId("tblTools");
			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.ComboBox({
						width: "auto",
						items: [
							new sap.ui.core.ListItem({
								text: "Hat"
							}),
							new sap.ui.core.ListItem({
								text: "Earplugs"
							}),
							new sap.ui.core.ListItem({
								text: "Mask"
							}),
							new sap.ui.core.ListItem({
								text: "Gloves"
							}),

							new sap.ui.core.ListItem({
								text: "Overalls"
							}),
							new sap.ui.core.ListItem({
								text: "Books"
							}),
							new sap.ui.core.ListItem({
								text: "ToolBox"
							})
						]
					}),
					new sap.m.Input({
						width: "auto"
					})
				]
			});
			oTable.addItem(columnListItemNewLine);

			this.onValidateTable();
		},

		onSubmitTools: function() {
			var oTable = this.byId("tblTools");
			var oItems = oTable.getItems();
			for (var i = 0; i < oItems.length; i++) {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/createTools.php',
					data: {
						ToolID: parseInt(("" + Math.random()).substring(2, 5)),
						LearnerID: this.LearnerID,
						Tool: oItems[i].mAggregations.cells[0].getProperty("value"),
						QTY: oItems[i].mAggregations.cells[1].getProperty("value")
					},
					//successfully logged on 
					success: function(data, response, xhr) {
						this.AddEntryLog("Created learner tools");
						oTable.removeAllItems();
						this.handleSuccessMessageBoxPress();
					}.bind(this),
					error: function(e, status, xhr) {

					}
				});
			}
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

		onValidateTable: function() {
			var oTable = this.byId("tblTools");
			var oItems = oTable.getItems();
			if (oItems.length > 0) {
				this.byId("btnSave").setEnabled(true);
			} else {
				this.byId("btnSave").setEnabled(false);
			}
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Tools successfully assigned to Learner", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		},

		onNavBack: function() {
			this.oRouter.navTo("TrainingTool");
		}

	});

});
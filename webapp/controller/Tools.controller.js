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
						oTable.removeAllItems();
						this.handleSuccessMessageBoxPress();
					}.bind(this),
					error: function(e, status, xhr) {

					}
				});
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
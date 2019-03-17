sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.TrainingVenue", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		onAddItems: function() {
			var oTable = this.byId("tblProg");
			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Input({
						width: "auto"
					}),
					new sap.m.Input({
						width: "auto"
					}),
					new sap.m.Input({
						width: "auto"
					}),
					new sap.m.Input({
						width: "auto"
					}),
					new sap.m.DatePicker(),
					new sap.m.DatePicker()
				]
			});
			oTable.addItem(columnListItemNewLine);
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
			oData.VenueID = parseInt(("" + Math.random()).substring(2, 5));
			oData.VenueType = this.byId("comboType").getSelectedItem().getText();
			oData.VenueName = this.byId("inpVenueName").getValue();
			oData.StreetAddress = this.byId("inpStreetAddress").getValue();
			oData.City = this.byId("inpCity").getValue();
			oData.Postalcode = this.byId("inpPostal").getValue();

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createVenue.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});

		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Training Venue information successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		}

	});
});
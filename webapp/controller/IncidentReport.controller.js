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
			this.onGetLearner();
			this.onGetVenue();
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

			} else {
				this.byId("lblLearner").setVisible(false);
				this.byId("cmbLearner").setVisible(false);
				this.byId("lblvenue").setVisible(true);
				this.byId("cmbVenue").setVisible(true);
			}
		},

		onSaveIncident: function() {
			var oData = {};
			oData.IncidentID = parseInt(("" + Math.random()).substring(2, 5));
			oData.IncidentType = this.byId("cmbType").getSelectedItem().getText();
			if (oData.IncidentType === "Venue") {
				oData.IncidentFor = this.byId("cmbVenue").getSelectedItem().getText();
			} else {
				oData.IncidentFor = this.byId("cmbLearner").getSelectedItem().getText();
			}
			oData.IncidentDescription = this.byId("txtDescr").getValue();

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/CreateIncident.php',
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

	});

});
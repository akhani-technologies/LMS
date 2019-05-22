sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox'
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Attachments", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.Attachments
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Attachments").attachPatternMatched(this._onObjectMatched, this);
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

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Attachments successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}.bind(this)
				}
			);
		},
		
		onNavBack: function() {
			this.oRouter.navTo("MenuPage");

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf programmeMotse.view.Attachments
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.Attachments
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.Attachments
		 */
		//	onExit: function() {
		//
		//	}

	});

});
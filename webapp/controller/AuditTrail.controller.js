sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("programmeMotse.controller.AuditTrail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.AuditTrail
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("AuditTrail").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {
			var AuditModel = new sap.ui.model.json.JSONModel();
			var oTable = this.byId("auditTable");
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			var AuditArr = [];
			$.ajax({
				url: 'PHP/getLoggedEntries.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++) {
						if (data.result[i].CompanyCode === this.CompanyCode) {
							AuditArr.push(data.result[i]);
						}
					}
					AuditModel.setData(AuditArr);
					oTable.setModel(AuditModel);
					sap.ui.getCore().setModel(AuditModel, "learnerModel");
				},
				error: function(err) {

				}
			});
		},

		onNavBack: function() {
				this.oRouter.navTo("Reporting");
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf programmeMotse.view.AuditTrail
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.AuditTrail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.AuditTrail
		 */
		//	onExit: function() {
		//
		//	}

	});

});
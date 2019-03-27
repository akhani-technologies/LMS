sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("programmeMotse.controller.AttendanceDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.AttendanceDetails
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("AttendanceDetails").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent) {
			var AttendModel = sap.ui.getCore().getModel("AttendModel");
			this.getView().setModel(AttendModel);
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").attendancePath
			});
		},

		onPrint: function() {
			var oTarget = this.getView();

			if (oTarget) {
				var $domTarget = oTarget.$()[0],
					sTargetContent = $domTarget.innerHTML,
					sOriginalContent = document.body.innerHTML;

				document.body.innerHTML = sTargetContent;
				window.print();
				document.body.innerHTML = sOriginalContent;
			} else {
				jQuery.sap.log.error("onPrint needs a valid target container [view|data:targetId=\"SID\"]");
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf programmeMotse.view.AttendanceDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.AttendanceDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.AttendanceDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});
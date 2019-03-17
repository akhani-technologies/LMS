sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Ceta", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.Ceta
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Ceta").attachPatternMatched(this._onObjectMatched, this);

		},

		_onObjectMatched: function() {
			var sLearnerModel = sap.ui.getCore().getModel("sLearnerModel");
			var Data = sLearnerModel.getData();

			switch (Data.Province) {
				case "Eastern Cape":
					this.byId("EC").setSelected(true);
					this.byId("FC").setSelected(false);
					this.byId("GP").setSelected(false);
					this.byId("KZN").setSelected(false);
					this.byId("LP").setSelected(false);
					this.byId("MP").setSelected(false);
					this.byId("NC").setSelected(false);
					this.byId("NW").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				case "Free State":
					this.byId("FC").setSelected(true);
					this.byId("EC").setSelected(false);
					this.byId("GP").setSelected(false);
					this.byId("KZN").setSelected(false);
					this.byId("LP").setSelected(false);
					this.byId("MP").setSelected(false);
					this.byId("NC").setSelected(false);
					this.byId("NW").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				case "Gauteng":
					this.byId("GP").setSelected(true);
					this.byId("EC").setSelected(false);
					this.byId("FC").setSelected(false);
					this.byId("KZN").setSelected(false);
					this.byId("LP").setSelected(false);
					this.byId("MP").setSelected(false);
					this.byId("NC").setSelected(false);
					this.byId("NW").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				case "KwaZulu-Natal":
					this.byId("KZN").setSelected(true);
					this.byId("EC").setSelected(false);
					this.byId("FC").setSelected(false);
					this.byId("GP").setSelected(false);
					this.byId("LP").setSelected(false);
					this.byId("MP").setSelected(false);
					this.byId("NC").setSelected(false);
					this.byId("NW").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				case "Limpopo":
					this.byId("LP").setSelected(true);
					this.byId("EC").setSelected(false);
					this.byId("FC").setSelected(false);
					this.byId("GP").setSelected(false);
					this.byId("KZN").setSelected(false);
					this.byId("MP").setSelected(false);
					this.byId("NC").setSelected(false);
					this.byId("NW").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				case "Mpumalanga":
					this.byId("MP").setSelected(true);
					this.byId("EC").setSelected(false);
					this.byId("FC").setSelected(false);
					this.byId("GP").setSelected(false);
					this.byId("KZN").setSelected(false);
					this.byId("LP").setSelected(false);
					this.byId("NC").setSelected(false);
					this.byId("NW").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				case "Northern Cape":
					this.byId("NC").setSelected(true);
					this.byId("EC").setSelected(false);
					this.byId("FC").setSelected(false);
					this.byId("GP").setSelected(false);
					this.byId("KZN").setSelected(false);
					this.byId("LP").setSelected(false);
					this.byId("MP").setSelected(false);
					this.byId("NW").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				case "North West":
					this.byId("NW").setSelected(true);
					this.byId("EC").setSelected(false);
					this.byId("FC").setSelected(false);
					this.byId("GP").setSelected(false);
					this.byId("KZN").setSelected(false);
					this.byId("LP").setSelected(false);
					this.byId("MP").setSelected(false);
					this.byId("NC").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				case "Western Cape":
					this.byId("WC").setSelected(true);
					this.byId("EC").setSelected(false);
					this.byId("FC").setSelected(false);
					this.byId("GP").setSelected(false);
					this.byId("KZN").setSelected(false);
					this.byId("LP").setSelected(false);
					this.byId("MP").setSelected(false);
					this.byId("NC").setSelected(false);
					this.byId("NW").setSelected(false);
					this.byId("WC").setSelected(false);
					break;
				default:
					// code block
			}
			this.getView().setModel(sLearnerModel);
			this._getDate();
		},

		_getDate: function() {
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
			var ScanDate = yyyy + "/" + mm + "/" + dd;
			this.byId("txtDate").setText(ScanDate);

		},
		onDone: function(oEvent) {
			this.oRouter.navTo("LearnerMenu");
		},

		onPrint: function() {
			var oTarget = this.byId("frm");

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
		 * @memberOf programmeMotse.view.Ceta
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.Ceta
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.Ceta
		 */
		//	onExit: function() {
		//
		//	}

	});

});
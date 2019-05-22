sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter'
], function(Controller, Filter) {
	"use strict";

	return Controller.extend("programmeMotse.controller.AttendanceReport", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.AttendanceReport
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("AttendanceReport").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent) {
			this.onGetAttendance();
		},

		onNavBack: function() {
			this.oRouter.navTo("Reporting");

		},

		onPress: function(oEvent) {
			var oItem = oEvent.getSource();
			this.oRouter.navTo("AttendanceDetails", {
				attendancePath: oItem.getBindingContext().getPath().substr(1)
			});
		},

		onGetAttendance: function() {
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			this.AttendModel = new sap.ui.model.json.JSONModel();
			var oTable = this.byId("tblAttendance");
			$.ajax({
				url: 'PHP/getAttendance.php',
				async: false,
				data: {
					CompanyCode: this.CompanyCode
				},
				success: function(data) {
					var oData = data.result;
					this.AttendModel.setData(oData);
					oTable.setModel(this.AttendModel);
					sap.ui.getCore().setModel(this.AttendModel, "AttendModel");
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});

		},

		handleFilterButtonPressed: function(oEvent) {
			// var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];
			// if (!this._oPopover) {
			this._oPopover = sap.ui.xmlfragment("programmeMotse.view.Fragments.AttendanceFilter", this);
			this.getView().addDependent(this._oPopover);
			this._oPopover.open();
			// }
		},

		handleFilterAttendConfirm: function(oEvent) {
			var oTable = this.byId("tblAttendance"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aFilters = [];

			mParams.filterItems.forEach(function(oItem) {
				var aSplit = oItem.getKey().split("+"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});

			// apply filter settings
			oBinding.filter(aFilters);
		},

		onPrint: function() {
			var oTarget = this.byId("tblAttendance");

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
		 * @memberOf programmeMotse.view.AttendanceReport
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.AttendanceReport
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.AttendanceReport
		 */
		//	onExit: function() {
		//
		//	}

	});

});
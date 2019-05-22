sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/ui/model/Filter'
], function(Controller, History, Filter) {
	"use strict";

	return Controller.extend("programmeMotse.controller.LearnerList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.view.LearnerList
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("LearnerList").attachPatternMatched(this._onObjectMatched, this);

		},

		_onObjectMatched: function() {
			var that = this;
			var learnerModel = new sap.ui.model.json.JSONModel();
			var oTable = this.byId("tblLearners");
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			$.ajax({
				url: 'PHP/learnerDetails.php',
				async: false,
				data: {
					CompanyCode: this.CompanyCode
				},
				success: function(data) {
					var oData = data.result;
					learnerModel.setData(oData);
					oTable.setModel(learnerModel);
					sap.ui.getCore().setModel(learnerModel, "learnerModel");
				},
				error: function(err) {

				}
			});
		},

		onNavBack: function() {
			this.oRouter.navTo("LearnerMenu");
		},

		handleFilterButtonPressed: function(oEvent) {
			// var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];
			// if (!this._oPopover) {
			this._oPopover = sap.ui.xmlfragment("programmeMotse.view.Fragments.FilterDialog", this);
			this.getView().addDependent(this._oPopover);
			this._oPopover.open();
			// }
		},

		handleFilterDialogConfirm: function(oEvent) {
			var oTable = this.byId("tblLearners"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aFilters = [];

			mParams.filterItems.forEach(function(oItem) {
				var aSplit = oItem.getKey().split("___"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});

			// apply filter settings
			oBinding.filter(aFilters);

			// // update filter bar
			// this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			// this.byId("vsdFilterLabel").setText(mParams.filterString);
		},

		onClearSetting: function() {
			var oTable = this.byId("tblLearners"),
				oBinding = oTable.getBinding("items");
			oBinding.filter(null);
		},

		onLearner: function(oEvent) {
			var oItem = oEvent.getSource();
			this.oRouter.navTo("LearnerDetails", {
				learnerPath: oItem.getBindingContext().getPath().substr(1)
			});
		},

		onSearch: function(oEvt) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("IDNumber", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oTable = this.byId("tblLearners");
			var binding = oTable.getBinding("items");
			binding.filter(aFilters, "Application");
		}

	});

});
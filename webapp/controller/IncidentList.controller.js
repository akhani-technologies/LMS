sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/ui/model/Filter'
], function(Controller, History, Filter) {
	"use strict";

	return Controller.extend("programmeMotse.controller.IncidentList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.IncidentList
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("IncidentList").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {
			this.onGetIncidents();
		},

		onGetIncidents: function() {
			var oTable = this.byId("tblIncidents");
			var incidentsModel = new sap.ui.model.json.JSONModel();
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			var incidentsArr = [];
			this.CompanyCode = user.CompanyCode;
			$.ajax({
				url: 'PHP/getIncidents.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++){
						if(data.result[i].CompanyCode === this.CompanyCode){
							incidentsArr.push(data.result[i]);
						}
					}
					incidentsModel.setData(incidentsArr);
					oTable.setModel(incidentsModel);
					sap.ui.getCore().setModel(incidentsModel, "incidentsModel");
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onPrint: function(oEvent) {
			var oTarget = this.byId("tblIncidents");

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
		},

		onNavBack: function() {
			this.oRouter.navTo("Reporting");

		},

		handleFilterButtonPressed: function(oEvent) {
			// var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];
			// if (!this._oPopover) {
			this._oPopover = sap.ui.xmlfragment("programmeMotse.view.Fragments.FilterIncidents", this);
			this.getView().addDependent(this._oPopover);
			this._oPopover.open();
			// }
		},

		onPress: function(oEvent) {
			var oItem = oEvent.getSource();
			this.oRouter.navTo("IncidentDetails", {
				incidentPath: oItem.getBindingContext().getPath().substr(1)
			});
		},

		handleFilterIncidentConfirm: function(oEvent) {
			var oTable = this.byId("tblIncidents"),
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

			// // update filter bar
			// this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			// this.byId("vsdFilterLabel").setText(mParams.filterString);
		}

	});

});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"../model/formatter"
], function(Controller, History, formatter) {
	"use strict";

	return Controller.extend("programmeMotse.controller.MilestoneReport", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.MilestoneReport
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("MilestoneReport").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {
			this.onGetImplementation();
			this.onGetPreImplementation();
			this.onGetPostImplementation();

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

		onGetImplementation: function() {
			var oSelect = this.byId("tblImp");
			this.ImpModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: 'PHP/getImplementation.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.ImpModel.setData(oData);
					oSelect.setModel(this.ImpModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},
		onGetPreImplementation: function() {
			var oSelect = this.byId("tblPre");
			this.PreModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: 'PHP/getPreImplement.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.PreModel.setData(oData);
					oSelect.setModel(this.PreModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},
		onGetPostImplementation: function() {
			var oSelect = this.byId("tblPost");
			this.PostModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: 'PHP/getPostImplement.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.PostModel.setData(oData);
					oSelect.setModel(this.PostModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onSelectPost: function(oEvent) {
			var sPath = oEvent.getSource().getSelectedItem().getBindingContext().getPath();
			this.getView().setModel(this.PostModel);
			this.getView().bindElement({
				path: sPath
			});
		},

		onSelectPre: function(oEvent) {
			var oTable = this.byId("tblPre");
			var sPath = oEvent.getSource().getSelectedItem().getBindingContext().getPath();
			oTable.setModel(this.PreModel);
			oTable.bindElement({
				path: sPath
			});
		},

		onSelectImp: function(oEvent) {
			var sPath = oEvent.getSource().getSelectedItem().getBindingContext().getPath();
			this.getView().setModel(this.ImpModel);
			this.getView().bindElement({
				path: sPath
			});
		},

		onPrint: function(oEvent) {
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

	});

});
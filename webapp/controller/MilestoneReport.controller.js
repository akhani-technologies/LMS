sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"../model/formatter",
	'sap/ui/model/Filter'
], function(Controller, History, formatter, Filter) {
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
			this.FilterTable = null;
		},

		_onObjectMatched: function() {
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			this.onGetImplementation();
			this.onGetPreImplementation();
			this.onGetPostImplementation();
			this.getPreProjects();
			this.getImpProjects();
			this.getPostProjects();
			

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
			var ImpArr = [];
			$.ajax({
				url: 'PHP/getImplementation.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++) {
						if (data.result[i].CompanyCode === this.CompanyCode) {
							ImpArr.push(data.result[i]);
						}
					}
					this.ImpModel.setData(ImpArr);
					oSelect.setModel(this.ImpModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onGetPreImplementation: function() {
			var oSelect = this.byId("tblPre");
			this.PreModel = new sap.ui.model.json.JSONModel();
			var PreArr = [];
			$.ajax({
				url: 'PHP/getPreImplement.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++) {
						if (data.result[i].CompanyCode === this.CompanyCode) {
							PreArr.push(data.result[i]);
						}
					}
					this.PreModel.setData(PreArr);
					oSelect.setModel(this.PreModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		},

		onGetPostImplementation: function() {
			var oSelect = this.byId("tblPost");
			this.PostModel = new sap.ui.model.json.JSONModel();
			var PostArr = [];
			$.ajax({
				url: 'PHP/getPostImplement.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++) {
						if (data.result[i].CompanyCode === this.CompanyCode) {
							PostArr.push(data.result[i]);
						}
					}
					this.PostModel.setData(PostArr);
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
		},

		getPreProjects: function() {
			var oTable = this.byId("tblPre");
			var oItems = oTable.getItems();
			var Arr = [];
			this.PreProjectModel = new sap.ui.model.json.JSONModel();
			for (var i = 0; i < oItems.length; i++) {
				Arr.push({
					Projects: oItems[i].mAggregations.cells[0].getProperty("text")
				});
			}
			var ProjectArr = this.removeDuplicates(Arr, "Projects");
			this.PreProjectModel.setData(ProjectArr);
		},

		getImpProjects: function() {
			var oTable = this.byId("tblImp");
			var oItems = oTable.getItems();
			var Arr = [];
			this.ImpProjectModel = new sap.ui.model.json.JSONModel();
			for (var i = 0; i < oItems.length; i++) {
				Arr.push({
					Projects: oItems[i].mAggregations.cells[0].getProperty("text")
				});
			}
			var ProjectArr = this.removeDuplicates(Arr, "Projects");
			this.ImpProjectModel.setData(ProjectArr);
		},
		getPostProjects: function() {
			var oTable = this.byId("tblPost");
			var oItems = oTable.getItems();
			var Arr = [];
			this.PostProjectModel = new sap.ui.model.json.JSONModel();
			for (var i = 0; i < oItems.length; i++) {
				Arr.push({
					Projects: oItems[i].mAggregations.cells[0].getProperty("text")
				});
			}
			var ProjectArr = this.removeDuplicates(Arr, "Projects");
			this.PostProjectModel.setData(ProjectArr);
		},

		removeDuplicates: function(originalArray, prop) {
			var newArray = [];
			var lookupObject = {};

			for (var i in originalArray) {
				lookupObject[originalArray[i][prop]] = originalArray[i];
			}

			for (i in lookupObject) {
				newArray.push(lookupObject[i]);
			}
			return newArray;
		},

		handleFilterButtonPressed: function(oEvent) {
			var sId = oEvent.getSource().getId();
			console.log("Button ID " + sId);
			this._oPopover = sap.ui.xmlfragment("programmeMotse.view.Fragments.FilterPlans", this);
			this.getView().addDependent(this._oPopover);
			if (sId === "__button17") {
				this._oPopover.setModel(this.PreProjectModel);
				this.FilterTable = this.byId("tblPre");
			} else if (sId === "__button18") {
				this._oPopover.setModel(this.ImpProjectModel);
				this.FilterTable = this.byId("tblImp");
			} else {
				this._oPopover.setModel(this.PostProjectModel);
				this.FilterTable = this.byId("tblPost");

			}
			this._oPopover.open();
			// }
		},

		handleFilterConfirm: function(oEvent) {
			var oTable = this.FilterTable,
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
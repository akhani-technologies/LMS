sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox',
	'sap/ui/model/Filter'
], function(Controller, History, MessageBox, Filter) {
	"use strict";

	return Controller.extend("programmeMotse.controller.TrainingTool", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.view.TrainingTool
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("TrainingTool").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {
			
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			this.learnerModel = new sap.ui.model.json.JSONModel();
			var oTable = this.byId("__table0");
			var learnerArr = [];
			$.ajax({
				url: 'PHP/learnerDetails.php',
				async: false,
				success: function(data) {
					for (var i = 0; i < data.result.length; i++){
						if(data.result[i].CompanyCode === this.CompanyCode){
							learnerArr.push(data.result[i]);
						}
					}
					this.learnerModel.setData(learnerArr);
					oTable.setModel(this.learnerModel);
					sap.ui.getCore().setModel(this.learnerModel, "learnerModel");
				}.bind(this),
				error: function(err) {

				}
			});
		},

		onSearch: function(oEvt) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
				// var filter2 = new Filter("Surname", sap.ui.model.FilterOperator.Contains, sQuery);
				// aFilters.push(filter2);
			}

			// update list binding
			var list = this.byId("__table0");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},

		onNavBack: function() {
			this.oRouter.navTo("LearnerMenu");
		},

		onUpdateTools: function() {
			this.ArrData = [];
			var oData = {};
			var name = sap.ui.getCore().byId("objLearner").getTitle();
			oData.LearnerID = this.LearnerID;
			oData.ToolQuantity = sap.ui.getCore().byId("inpQty").getValue();
			oData.LearningTool = sap.ui.getCore().byId("cmbTool").getSelectedItem().getText();
			this.ArrData.push(oData);
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Training tool(s) have been added to Learner: " + name, {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						this.oDialog.close();
					}.bind(this)
				}
			);
		},

		onItemPress: function(oEvent) {
			var oItem = oEvent.getSource();
			this.oRouter.navTo("Tools", {
				learnerPath: oItem.getBindingContext().getPath().substr(1)
			});
		},

		onCancelItem: function(oEvent) {
			this.oDialog.close();
		},

		onSaveLearnerTools: function(oEvent) {
			for (var i = 0; i < this.ArrData.length; i++) {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/updateLearnerTool.php',
					data: this.ArrData[i],
					//successfully logged on 
					success: function(data, response, xhr) {
						if (i === this.ArrData.length - 1) {
							this.AddEntryLog("Updated learner Tools");
						}
						this.handleSuccessMessageBoxPress();
					}.bind(this),
					error: function(e, status, xhr) {

					}

				});
			}

		},

		_getLogDate: function() {
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
			var ScanDate = yyyy + mm + dd;
			return ScanDate;
		},

		_getLogTime: function() {
			var ScanTime = new Date().toLocaleTimeString('en-GB');
			ScanTime = ScanTime.replace(/:/g, "");
			return ScanTime;
		},

		AddEntryLog: function(change) {
			var oUserModel = sap.ui.getCore().getModel("loggedUser");
			var user = oUserModel.getData();
			var oData = {};
			oData.logID = parseInt(("" + Math.random()).substring(2, 5));
			oData.Username = user.Name + " " + user.Surname;
			oData.Date = this._getLogDate();
			oData.Time = this._getLogTime();
			oData.Change = change;

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/EntryLog.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					console.log(data);
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});

		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Learner(s) have been successfully assigned training tool(s)", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		}

	});

});
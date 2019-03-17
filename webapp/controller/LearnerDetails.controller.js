sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.LearnerDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.view.LearnerDetails
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("LearnerDetails").attachPatternMatched(this._onObjectMatched, this);
			this._oViewModel = new sap.ui.model.json.JSONModel({
				Edit: false,
				View: true
			});
			this.getView().setModel(this._oViewModel, "viewModel");
		},

		_onObjectMatched: function(oEvent) {
			var learnerModel = sap.ui.getCore().getModel("learnerModel");
			var LearnerPath = "/" + oEvent.getParameter("arguments").learnerPath;
			this.oProperties = learnerModel.getProperty(LearnerPath);
			this.LearnerID = this.oProperties.LearnerID;
			var detailsModel = new sap.ui.model.json.JSONModel(this.oProperties);
			this.getView().setModel(detailsModel);
			this._oViewModel.setProperty("/Edit", false);
			this._oViewModel.setProperty("/View", true);
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

		onEditDetails: function() {
			this._oViewModel.setProperty("/Edit", true);
			this._oViewModel.setProperty("/View", false);
		},

		onSaveDetails: function(oEvent) {
			var oData = {};
			oData.LearnerID = this.LearnerID;
			
			oData.Name = this.byId("inpName").getValue();
			oData.Surname = this.byId("inpSurname").getValue();
			oData.ContactNumber = this.byId("inpNumber").getValue();
			oData.EmailAddress = this.byId("inpEmail").getValue();
			oData.AddressLine1 = this.byId("inpLine1").getValue();
			oData.AddressLine2 = this.byId("inpLine2").getValue();
			oData.City = this.byId("inpCity").getValue();
			if (this.byId("slctProv").getSelectedItem() === null) {
				oData.Province = this.oProperties.Province;
			} else {
				oData.Province = this.byId("slctProv").getSelectedItem().getText();
			}

			if (this.byId("slctQual").getSelectedItem() === null) {
				oData.HighestQualification = this.oProperties.HighestQualification;
			} else {
				oData.HighestQualification = this.byId("slctQual").getSelectedItem().getText();
			}

			if (this.byId("radioEmploy").getSelectedIndex() === 1) {
				oData.EmploymentStatus = "Unemployed";
			} else {
				oData.EmploymentStatus = "Employed";
			}

			if (this.byId("slctLType").getSelectedItem() === null) {
				oData.LearnerType = this.oProperties.LearnerType;
			} else {
				oData.LearnerType = this.byId("slctLType").getSelectedItem().getText();
			}

			if (this.byId("slctDisability").getSelectedItem() === null) {
				oData.Disability = this.oProperties.Disability;
			} else {
				oData.Disability = this.byId("slctDisability").getSelectedItem().getText();
			}
			if (this.byId("slctUIF").getSelectedItem() === null) {
				oData.UIF = this.oProperties.UIF;
			} else {
				oData.UIF = this.byId("slctUIF").getSelectedItem().getText();
			}

			oData.BankName = this.byId("inpBankName").getValue();
			oData.AccountNumber = this.byId("inpAccNum").getValue();
			oData.AccountType = this.byId("AccType").getValue();

			if (this.byId("cmbProgram").getSelectedItem() === null) {
				oData.Program = this.oProperties.Program;
			} else {
				oData.Program = this.byId("cmbProgram").getSelectedItem().getText();
			}

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/updateLearner.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"Details successfully updated", {
							styleClass: bCompact ? "sapUiSizeCompact" : "",
							onClose: function(sAction) {
								this.oRouter.navTo("LearnerList");
							}.bind(this)
						}
					);
				}.bind(this),
				error: function(e, status, xhr) {
					
				}
			});

		}
	});

});
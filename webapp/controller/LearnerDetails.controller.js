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

		onCancel: function() {
			this._oViewModel.setProperty("/Edit", false);
			this._oViewModel.setProperty("/View", true);
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

			oData.EmployerName = this.byId("inpEmpName").getValue();
			oData.EmployerContact = this.byId("inpEmpCont").getValue();
			oData.EmploymentStart = this.byId("EmpDPStart").getValue();
			oData.EmployementEnd = this.byId("EmpDPEnd").getValue();
			if (this.byId("slctStatus").getSelectedItem() === null) {
				oData.Status = this.oProperties.Status;
			} else {
				oData.Status = this.byId("slctStatus").getSelectedItem().getText();
			}

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/updateLearner.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.AddEntryLog("Updated learner details");
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
	});

});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Training", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.AttachArray = [];
		},

		handleBankpress: function(oEvent) {
			// create popover
			this.event = oEvent.getSource();
			if (!this._Popover) {
				this._Popover = sap.ui.xmlfragment("programmeMotse.view.Fragments.Bankingdetails", this);
				this.getView().addDependent(this._Popover);
			}
			this._Popover.openBy(oEvent.getSource());
		},

		onAddBankingDetails: function(oEvent) {
			this._Popover.close();
		},

		onAddItems: function(oEvent) {
			var oTable = this.byId("tblTrain");
			var that = this;
			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Input({
						width: "auto"
					}),
					new sap.m.Input({
						width: "auto"
					}),
					new sap.m.Input({
						width: "auto"
					}),
					new sap.m.DatePicker(),
					new sap.m.Button({
						text: "Add Attachment",
						press: function() {
							that.handlePopoverPress(oEvent);
						}
					})
					// new sap.ui.unified.FileUploader("sId?")
				]
			});
			oTable.addItem(columnListItemNewLine);
		},

		onAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var oFileReader = new FileReader();

			oFileReader.onload = function() {
				var base64String = oFileReader.result;
				window.IDContent = base64String.split(',')[1];
			};

			//	var txt = oParameters.files[0] var my_file_as_base64 = getBase64(file)
			window.IDfileName = oParameters.files[0].name;
			window.IDfileType = oParameters.files[0].type;

			oFileReader.readAsDataURL(oParameters.files[0]);
		},

		handlePopoverPress: function(oEvent) {
			// create popover
			this.event = oEvent.getSource();
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("programmeMotse.view.Fragments.Popover", this);
				this.getView().addDependent(this._oPopover);
			}
			this._oPopover.openBy(oEvent.getSource());
		},

		handleAttachment: function() {
			this.event.setText(window.IDfileName);
			this.AttachArray.push(window.IDfileName);
			this.event.setEnabled(false);
			this.event.setType("Accept");
			this._oPopover.close();
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

		onSaveDetails: function(oEvent) {
			var oData = {};
			oData.TrainingID = parseInt(("" + Math.random()).substring(2, 5));
			oData.AccreditationNumber = this.byId("inpAccreNum").getValue();
			oData.Position = this.byId("inpPosition").getValue();
			oData.OfficeNumber = this.byId("inpOffice").getValue();
			oData.MobileNumber = this.byId("inpMobile").getValue();
			oData.Email = this.byId("inpEmail").getValue();
			oData.BankName = this.byId("cmbBankName").getSelectedItem().getText();
			oData.AccountNumber = this.byId("inpAccNum").getValue();
			oData.AccountType = this.byId("cmbAccType").getSelectedItem().getText();
			oData.BankProof = window.bankStatementContent;
			oData.TrainingProviderName = this.byId("inpContactPerson").getValue();
			oData.RegistrationNumber = this.byId("inpRegNum").getValue();
			oData.CSDReport = window.CSDContent;

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createTraining.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});

			var oTable = this.byId("tblTrain");
			var oItems = oTable.getItems();
			for (var i = 0; i < oItems.length; i++) {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/createAccreditation.php',
					data: {
						AccreditationID: parseInt(("" + Math.random()).substring(2, 5)),
						TrainingID: oData.TrainingID,
						AccreditationNumber: oItems[i].mAggregations.cells[0].getProperty("value"),
						ETQA: oItems[i].mAggregations.cells[1].getProperty("value"),
						ExpiryDate: oItems[i].mAggregations.cells[2].getProperty("value"),
						AccreditationAttach: this.AttachArray[i],
						LearningProgram: oItems[i].mAggregations.cells[3].getProperty("value")
					},
					//successfully logged on 
					success: function(data, response, xhr) {
						oTable.removeAllItems();
						// this.handleSuccessMessageBoxPress();
					}.bind(this),
					error: function(e, status, xhr) {

					}
				});
			}
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Training information successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		},
		onSaveBankingDetails: function(oEvent) {
			// var oTable = this.byId("tblBank");
			this.BankName = sap.ui.getCore().byId("inpBankName").getValue();
			this.AccountNumber = sap.ui.getCore().byId("inpAccNum").getValue();
			this.Branch = sap.ui.getCore().byId("branch").getValue();
			this.AccType = sap.ui.getCore().byId("AccType").getValue();

			this._Popover.close();
		},

		onBankAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var bFileReader = new FileReader();

			bFileReader.onload = function() {
				var base64String = bFileReader.result;
				window.bankStatementContent = base64String.split(',')[1];
			};
			window.bankStatementfileId = oParameters.id;
			window.bankStatementfileName = oParameters.files[0].name;
			window.bankStatementfileType = oParameters.files[0].type;
			bFileReader.readAsDataURL(oParameters.files[0]);
		},

		onChangeAttachment: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var bFileReader = new FileReader();

			bFileReader.onload = function() {
				var base64String = bFileReader.result;
				window.CSDContent = base64String.split(',')[1];
			};
			bFileReader.readAsDataURL(oParameters.files[0]);
		}
	});
});
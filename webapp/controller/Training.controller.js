sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Training", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Training").attachPatternMatched(this._onObjectMatched, this);
			this.AttachArray = [];
		},

		_onObjectMatched: function() {
			var loggedUser = sap.ui.getCore().getModel("loggedUser");
			var user = loggedUser.getData();
			this.CompanyCode = user.CompanyCode;
			this.ResetFields();
		},

		ResetFields: function() {
			this.byId("btnTraining").setEnabled(false);
			this.byId("inpAccreNum").setValue(null);
			this.byId("inpPosition").setValue(null);
			this.byId("inpOffice").setValue(null);
			this.byId("inpMobile").setValue(null);
			this.byId("inpEmail").setValue(null);
			this.byId("cmbBankName").setSelectedItem(null);
			this.byId("inpAccNum").setValue(null);
			this.byId("cmbAccType").setSelectedItem(null);
			this.byId("FileBank").setValue(null);
			this.byId("inpContactPerson").setValue(null);
			this.byId("inpRegNum").setValue(null);
			this.byId("fileCDS").setValue(null);
			this.byId("tblTrain").removeAllItems();
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

		onValidateGeneral: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formTraining"));
			var oInputControl;
			// var oIconBar = this.byId("iconRegister");
			var sValue;
			var valid = false;
			for (var m = 0; m < aInputControls.length; m++) {
				oInputControl = aInputControls[m].control;
				var _roadCtrlType = oInputControl.getMetadata().getName();

				if (aInputControls[m].required) {
					if (_roadCtrlType === "sap.m.ComboBox") {
						sValue = oInputControl.getSelectedItem();
					} else {
						sValue = oInputControl.getValue();
					}
					if (!sValue) {
						valid = false;
						return;
					} else {
						valid = true;
					}
				}
			}
			if (valid) {
				this.byId("btnTraining").setEnabled(true);
				// oIconBar.setSelectedKey("address");
			} else {
				this.byId("btnTraining").setEnabled(false);
				// oIconBar.setSelectedKey("general");
			}
		},

		_getSimpleFormFields: function(oSimpleForm) {
			var aControls = [];
			var aFormContent = oSimpleForm.getContent();
			var sControlType;
			for (var i = 0; i < aFormContent.length; i++) {
				sControlType = aFormContent[i].getMetadata().getName();
				if (sControlType === "sap.m.Input" || sControlType === "sap.ui.unified.FileUploader") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
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
			oData.CompanyCode = this.CompanyCode;

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createTraining.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.AddEntryLog("Created training service provider");
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
						LearningProgram: oItems[i].mAggregations.cells[3].getProperty("value"),
						CompanyCode : this.CompanyCode
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
			oData.CompanyCode = this.CompanyCode;

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
			this.onValidateGeneral();
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
			this.onValidateGeneral();
		}
	});
});
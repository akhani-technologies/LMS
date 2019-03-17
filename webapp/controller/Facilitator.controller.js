sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Facilitator", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Facilitator").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {

			// this.onGetFacilitators();
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

		onAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var oFileReader = new FileReader();

			oFileReader.onload = function() {
				var base64String = oFileReader.result;
				window.IDContent = base64String.split(',')[1];
			};

			//	var txt = oParameters.files[0] var my_file_as_base64 = getBase64(file)
			window.IDfileName = oParameters.files[0].name
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
			this.event.setEnabled(false);
			this.event.setType("Accept");
			this._oPopover.close();
		},

		onSaveDetails: function(oEvent) {
			var oData = {};
			oData.FacilitatorID = parseInt(("" + Math.random()).substring(2, 5));
			oData.Name = this.byId("inpFName").getValue();
			oData.OfficeNumber = this.byId("inpONumber").getValue();
			oData.MobileNumber = this.byId("inpMobile").getValue();
			oData.Email = this.byId("inpEmail").getValue();
			oData.ProofOfReg = window.bankStatementContent;
			oData.IDNumber = this.byId("inpID").getValue();
			oData.Surname = this.byId("inpFSurname").getValue();

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createFacilitator.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});
			// this.handleSuccessMessageBoxPress();
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Facilitator information successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		},

		onSaveLearners: function() {
			var oTable = this.byId("tblLearners");
			var aItems = oTable.getItems();
			var aSelectedItems = [];
			var Facilitator = this.byId("cmbFac").getSelectedItem().getText();
			for (var i = 0; i < aItems.length; i++) {
				if (aItems[i].getSelected()) {
					aSelectedItems.push(this.learnerModel.getProperty(aItems[i].getBindingContextPath()));
					$.ajax({
						type: "POST",
						async: false,
						cache: false,
						url: 'PHP/updateFacilitator.php',
						data: {
							FacilitatorName: Facilitator,
							LearnerID: this.learnerModel.getProperty(aItems[i].getBindingContextPath()).LearnerID
						},
						//successfully logged on 
						success: function(data, response, xhr) {
							var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
							MessageBox.success(
								"Learner(s) have been sucessfully assignned to Facilitator: " + Facilitator, {
									styleClass: bCompact ? "sapUiSizeCompact" : "",
									onClose: function(sAction) {
										this.oRouter.navTo("MenuPage");
									}.bind(this)
								}
							);
						}.bind(this),
						error: function(e, status, xhr) {

						}

					});
				}
			}

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

		onAssignLearner: function(oEvent) {

		}

	});
});
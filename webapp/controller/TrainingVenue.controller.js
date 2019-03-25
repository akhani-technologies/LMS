sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.TrainingVenue", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.AttachArray = [];
		},

		onAddItems: function(oEvent) {
			var oTable = this.byId("oTableApproval");
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
							this.handlePopoverPress(oEvent);
						}.bind(this)
					})
					// new sap.ui.unified.FileUploader("sId?")
				]
			});
			oTable.addItem(columnListItemNewLine);
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

		onAssessmentAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var oFileReader = new FileReader();

			oFileReader.onload = function() {
				var base64String = oFileReader.result;
				window.AssessContent = base64String.split(',')[1];
			};

			oFileReader.readAsDataURL(oParameters.files[0]);
		},

		handleDelete: function(oEvent) {
			var oTable = oEvent.getSource(),
				oItem = oEvent.getParameter("listItem");
			oTable.removeItem(oItem);
		},

		onSaveDetails: function(oEvent) {
			var oData = {};
			var odata = {};
			oData.VenueID = parseInt(("" + Math.random()).substring(2, 5));
			oData.VenueType = this.byId("comboType").getSelectedItem().getText();
			oData.VenueName = this.byId("inpVenueName").getValue();
			oData.VenueOwner = this.byId("inpVenueO").getValue();
			oData.EmailAddress = this.byId("inpEmail").getValue();
			oData.ContactNumber = this.byId("inpNumber").getValue();
			oData.Address1 = this.byId("inpAddr1").getValue();
			oData.Address2 = this.byId("inpAddr2").getValue();
			oData.City = this.byId("inpCity").getValue();
			oData.Province = this.byId("slctProv").getSelectedItem().getText();

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createVenue.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					// this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});

			odata.VenueID = oData.VenueID;
			odata.AssessedBy = this.byId("inpBy").getValue();
			odata.Date = this.byId("DateP").getValue();
			odata.Report = window.AssessContent;

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/CreateVenueAssess.php',
				data: odata,
				//successfully logged on 
				success: function(data, response, xhr) {
					// this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});

			var oTable = this.byId("oTableApproval");
			var oItems = oTable.getItems();
			for (var i = 0; i < oItems.length; i++) {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/CreateVenueApproval.php',
					data: {
						VenueID: oData.VenueID,
						ApprovalBody: oItems[i].mAggregations.cells[0].getProperty("value"),
						SaqaID: oItems[i].mAggregations.cells[1].getProperty("value"),
						SETA: oItems[i].mAggregations.cells[2].getProperty("value"),
						ExpiryDate: oItems[i].mAggregations.cells[3].getProperty("value"),
						ApprovalAttach: this.AttachArray[i]
							// ToolID: parseInt(("" + Math.random()).substring(2, 5)),
							// LearnerID: this.LearnerID,
							// Tool: oItems[i].mAggregations.cells[0].getProperty("value"),
							// QTY: oItems[i].mAggregations.cells[1].getProperty("value")
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
				"Training Venue information successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function(sAction) {
						that.oRouter.navTo("MenuPage");
					}
				}
			);
		}

	});
});
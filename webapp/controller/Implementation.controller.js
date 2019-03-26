sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Implementation", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.view.Implementation
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Implementation").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent) {
			this.resetFields();
		},

		resetFields: function() {
			this.byId("TT").setValue(0);
			this.byId("AR").setValue(0);
			this.byId("SOAR").setValue(0);
			this.byId("PS").setValue(0);
			this.byId("MAEV").setValue(0);
			this.byId("PTLWFWPAT").setValue(0);
			this.byId("PrT").setValue(0);
			this.byId("ASR").setValue(0);
			this.byId("SOAR2").setValue(0);
			this.byId("PS2").setValue(0);
			this.byId("MAEV2").setValue(0);
			this.byId("MR").setValue(0);
			this.byId("IFNYCL").setValue(0);
			this.byId("POW").setValue(0);
			this.byId("WT").setValue(0);
			this.byId("SOL").setValue(0);
			this.byId("SOPR").setValue(0);
			this.byId("PS3").setValue(0);
			this.byId("MAEV3").setValue(0);
			this.byId("ETQAVV").setValue(0);
			this.byId("SFA").setValue(0);
			this.byId("SOF").setValue(0);
			this.byId("LC").setValue(0);
			this.byId("COR").setValue(0);

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

		onAddItems: function() {
			var oTable = this.byId("tblImplement");
			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Input({
						width: "auto"
					}),
					new sap.m.DatePicker(),
					new sap.m.DatePicker()
				]
			});
			oTable.addItem(columnListItemNewLine);
		},

		onCreateImplementation: function() {
			var implData = [
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblTT").getText(), Date: this.byId("TTdate").getValue(), Rate: this.byId("TT").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("AR").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblSOAR").getText(), Date: this.byId("SOARdate").getValue(), Rate: this.byId("SOAR").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblPS").getText(), Date: this.byId("PSdate").getValue(), Rate: this.byId("PS").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("MAEV").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("PTLWFWPAT").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("PrT").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("ASR").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("SOAR2").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("PS2").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("MAEV2").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("MR").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("IFNYCL").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("POW").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("WT").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("SOL").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("SOPR").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("PS3").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("MAEV3").getValue()},
				{Project: this.byId("inpImpPorject").getValue(), Description: this.byId("lblAR").getText(), Date: this.byId("ARdate").getValue(), Rate: this.byId("inpImpPorject").getValue()}
				
				];
			

			// $.ajax({
			// 	type: "POST",
			// 	async: false,
			// 	cache: false,
			// 	url: 'PHP/CreateImplementation.php',
			// 	data: oData,
			// 	//successfully logged on 
			// 	success: function(data, response, xhr) {
			// 		var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			// 		MessageBox.success(
			// 			"Implementation rates successfully saved", {
			// 				styleClass: bCompact ? "sapUiSizeCompact" : "",
			// 				onClose: function(sAction) {
			// 					this.oRouter.navTo("MenuPage");
			// 				}.bind(this)
			// 			}
			// 		);
			// 	}.bind(this),
			// 	error: function(e, status, xhr) {

			// 	}
			// });
		},

		createPostImp: function() {
			var odata = {};
			odata.postID = parseInt(("" + Math.random()).substring(2, 5));
			odata.ETQA = this.byId("ETQAVV").getValue();
			odata.SignFunding = this.byId("SFA").getValue();
			odata.Statement = this.byId("SOF").getValue();
			odata.LearnerCertification = this.byId("LC").getValue();
			odata.CloseoutReport = this.byId("COR").getValue();
			odata.Project = this.byId("inpPostPorject").getValue();

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/CreatePostImplementation.php',
				data: odata,
				//successfully logged on 
				success: function(data, response, xhr) {
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"Post-Implementation rates successfully saved", {
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
		},

		createPreImp: function() {
			var odata = {};
			odata.PreID = parseInt(("" + Math.random()).substring(2, 5));
			odata.ProjectApproval = this.byId("rate1").getValue();
			odata.SignFunding = this.byId("rate2").getValue();
			odata.ProjectSteering = this.byId("rate3").getValue();
			odata.ProjectPlan = this.byId("rate4").getValue();
			odata.ContractLearners = this.byId("rate5").getValue();
			odata.Verification = this.byId("rate6").getValue();
			odata.ServiceProviders = this.byId("rate7").getValue();
			odata.LearnerUploads = this.byId("rate8").getValue();
			odata.LearnerInduction = this.byId("rate9").getValue();
			odata.ProcedurePPE = this.byId("rate10").getValue();
			odata.ArrangeTTVenue = this.byId("rate11").getValue();
			odata.ArrangePTVenue = this.byId("rate12").getValue();
			odata.ArrangeWorkplaces = this.byId("rate13").getValue();
			odata.Project = this.byId("inpPrePorject").getValue();

			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/CreatePreImplementation.php',
				data: odata,
				//successfully logged on 
				success: function(data, response, xhr) {
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"Pre-Implementation rates successfully saved", {
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

	});

});
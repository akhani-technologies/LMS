sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox',
	"sap/ui/core/routing/History"
], function(Controller, MessageBox, History) {
	"use strict";

	return Controller.extend("programmeMotse.controller.CaptureResults", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.CaptureResults
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("CaptureResults").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {

			this.byId("cmbComptence").setSelectedItem(null);
			this.byId("inpMark").setValue(null);
			this.byId("slctLearner").setSelectedItem(null);

			this.learnerModel = new sap.ui.model.json.JSONModel();
			var oSelect = this.byId("slctLearner");
			$.ajax({
				url: 'PHP/learnerDetails.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					this.learnerModel.setData(oData);
					this.getView().setModel(this.learnerModel);
					oSelect.setModel(this.learnerModel);
				}.bind(this),
				error: function(err) {

				}
			});
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
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var oData = {};
			oData.ResultsID = parseInt(("" + Math.random()).substring(2, 5));
			oData.LearnerID = this.LearnerId;
			oData.Competence = this.byId("cmbComptence").getSelectedItem().getText();
			oData.LearnerMark = this.byId("inpMark").getValue();

			if (oData.LearnerID === undefined || oData.Competence === undefined || oData.LearnerMark === "") {
				MessageBox.alert(
					"Please make sure that all details have provided before submitting.", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			} else {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/captureResults.php',
					data: oData,
					//successfully logged on 
					success: function(data, response, xhr) {
						MessageBox.success(
							"Learner results saved successfully", {
								styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function(sAction) {
									this.oRouter.navTo("LearnerMenu");
								}.bind(this)
							}
						);
					}.bind(this),
					error: function(e, status, xhr) {

					}
				});
			}

			// this.handleSuccessMessageBoxPress();
		},

		onSelectLearner: function(oEvent) {
			var oItem = oEvent.getSource();
			var sPath = oItem.getSelectedItem().getBindingContext().getPath();
			var oProperties = this.learnerModel.getProperty(sPath);
			this.LearnerId = oProperties.LearnerID;
			this.byId("txtProgram").setText(oProperties.Program);
		}

	});

});
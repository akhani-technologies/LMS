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
			this.oRouter.navTo("LearnerMenu");
		},

		onSaveDetails: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var oData = {};
			oData.ResultsID = parseInt(("" + Math.random()).substring(2, 5));
			oData.LearnerID = this.LearnerId;
			oData.Competence = this.byId("cmbComptence").getSelectedItem().getText();
			oData.LearnerMark = this.byId("inpMark").getValue();
			oData.UnitStandard = this.byId("inpUnitStandard").getValue();

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
			this.onValidateGeneral();
		},

		onValidateGeneral: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formCapture"));
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
				this.byId("btnCapture").setEnabled(true);
				// oIconBar.setSelectedKey("address");
			} else {
				this.byId("btnCapture").setEnabled(false);
				// oIconBar.setSelectedKey("general");
			}
		},

		_getSimpleFormFields: function(oSimpleForm) {
			var aControls = [];
			var aFormContent = oSimpleForm.getContent();
			var sControlType;
			for (var i = 0; i < aFormContent.length; i++) {
				sControlType = aFormContent[i].getMetadata().getName();
				if (sControlType === "sap.m.ComboBox") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
		}

	});

});
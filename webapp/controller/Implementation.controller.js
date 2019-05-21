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
			this.onGetProjects();
			this.resetFields();
		},

		resetFields: function() {
			var oIconTabBar = this.byId("ImplementationBar");
			oIconTabBar.setSelectedKey("Pre");
			this.byId("inpImpPorject").setValue(null);
			this.byId("inpPostPorject").setValue(null);
			this.byId("inpPrePorject").setValue();
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
			this.byId("rate1").setValue(0);
			this.byId("rate2").setValue(0);
			this.byId("rate3").setValue(0);
			this.byId("rate4").setValue(0);
			this.byId("rate5").setValue(0);
			this.byId("rate6").setValue(0);
			this.byId("rate7").setValue(0);
			this.byId("rate8").setValue(0);
			this.byId("rate9").setValue(0);
			this.byId("rate10").setValue(0);
			this.byId("rate11").setValue(0);
			this.byId("rate12").setValue(0);
			this.byId("rate13").setValue(0);
			this.byId("rate14").setValue(0);

			this.byId("TTdate").setValue(null);
			this.byId("ARdate").setValue(null);
			this.byId("SOARdate").setValue(null);
			this.byId("PSdate").setValue(null);
			this.byId("MAEVdate").setValue(null);
			this.byId("PTLWFWPATdate").setValue(null);
			this.byId("PrTdate").setValue(null);
			this.byId("ASRdate").setValue(null);
			this.byId("SOAR2date").setValue(null);
			this.byId("PS2date").setValue(null);
			this.byId("MAEV2date").setValue(null);
			this.byId("MRdate").setValue(null);
			this.byId("IFNYCLdate").setValue(null);
			this.byId("POWdate").setValue(null);
			this.byId("WTdate").setValue(null);
			this.byId("SOLdate").setValue(null);
			this.byId("SOPRdate").setValue(null);
			this.byId("PS3date").setValue(null);
			this.byId("MAEV3date").setValue(null);
			this.byId("ETQAVVdate").setValue(null);
			this.byId("SFAdate").setValue(null);
			this.byId("SOFdate").setValue(null);
			this.byId("LCdate").setValue(null);
			this.byId("CORdate").setValue(null);
			this.byId("rate1date").setValue(null);
			this.byId("rate2date").setValue(null);
			this.byId("rate3date").setValue(null);
			this.byId("rate4date").setValue(null);
			this.byId("rate5date").setValue(null);
			this.byId("rate6date").setValue(null);
			this.byId("rate7date").setValue(null);
			this.byId("rate8date").setValue(null);
			this.byId("rate9date").setValue(null);
			this.byId("rate10date").setValue(null);
			this.byId("rate11date").setValue(null);
			this.byId("rate12date").setValue(null);
			this.byId("rate13date").setValue(null);
			this.byId("rate14date").setValue(null);

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
			var implData = [{
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblTT").getText(),
				Date: this.byId("TTdate").getValue(),
				Rate: this.byId("TT").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblAR").getText(),
				Date: this.byId("ARdate").getValue(),
				Rate: this.byId("AR").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblSOAR").getText(),
				Date: this.byId("SOARdate").getValue(),
				Rate: this.byId("SOAR").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblPS").getText(),
				Date: this.byId("PSdate").getValue(),
				Rate: this.byId("PS").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblMAEV").getText(),
				Date: this.byId("MAEVdate").getValue(),
				Rate: this.byId("MAEV").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblPTLWFWPAT").getText(),
				Date: this.byId("PTLWFWPATdate").getValue(),
				Rate: this.byId("PTLWFWPAT").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblPrT").getText(),
				Date: this.byId("PrTdate").getValue(),
				Rate: this.byId("PrT").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblASR").getText(),
				Date: this.byId("ASRdate").getValue(),
				Rate: this.byId("ASR").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblSOAR2").getText(),
				Date: this.byId("SOAR2date").getValue(),
				Rate: this.byId("SOAR2").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblPS2").getText(),
				Date: this.byId("PS2date").getValue(),
				Rate: this.byId("PS2").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblMAEV2").getText(),
				Date: this.byId("MAEV2date").getValue(),
				Rate: this.byId("MAEV2").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblMR").getText(),
				Date: this.byId("MRdate").getValue(),
				Rate: this.byId("MR").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblIFNYCL").getText(),
				Date: this.byId("IFNYCLdate").getValue(),
				Rate: this.byId("IFNYCL").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblPOW").getText(),
				Date: this.byId("POWdate").getValue(),
				Rate: this.byId("POW").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblWT").getText(),
				Date: this.byId("WTdate").getValue(),
				Rate: this.byId("WT").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblSOL").getText(),
				Date: this.byId("SOLdate").getValue(),
				Rate: this.byId("SOL").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblSOPR").getText(),
				Date: this.byId("SOPRdate").getValue(),
				Rate: this.byId("SOPR").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblPS3").getText(),
				Date: this.byId("PS3date").getValue(),
				Rate: this.byId("PS3").getValue()
			}, {
				Project: this.byId("inpImpPorject").getValue(),
				Description: this.byId("lblMAEV3").getText(),
				Date: this.byId("MAEV3date").getValue(),
				Rate: this.byId("MAEV3").getValue()
			}];

			for (var i = 0; i < implData.length; i++) {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/CreateImplementation.php',
					data: {
						Project: implData[i].Project,
						Description: implData[i].Description,
						Date: implData[i].Date,
						Rate: implData[i].Rate
					},
					//successfully logged on 
					success: function(data, response, xhr) {
						if (i === 18) {
							this.this.AddEntryLog("Created a Pre-Implementation Plan");
							var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
							MessageBox.success(
								"Implementation rates successfully saved", {
									styleClass: bCompact ? "sapUiSizeCompact" : "",
									onClose: function(sAction) {
										this.oRouter.navTo("MenuPage");
									}.bind(this)
								}
							);
						}

					}.bind(this),
					error: function(e, status, xhr) {

					}
				});
			}

		},

		createPostImp: function() {

			var implData = [{
				Project: this.byId("inpPostPorject").getValue(),
				Description: this.byId("lblETQAVV").getText(),
				Date: this.byId("ETQAVVdate").getValue(),
				Rate: this.byId("ETQAVV").getValue()
			}, {
				Project: this.byId("inpPostPorject").getValue(),
				Description: this.byId("lblSFA").getText(),
				Date: this.byId("SFAdate").getValue(),
				Rate: this.byId("SFA").getValue()
			}, {
				Project: this.byId("inpPostPorject").getValue(),
				Description: this.byId("lblSOF").getText(),
				Date: this.byId("SOFdate").getValue(),
				Rate: this.byId("SOF").getValue()
			}, {
				Project: this.byId("inpPostPorject").getValue(),
				Description: this.byId("lblLC").getText(),
				Date: this.byId("LCdate").getValue(),
				Rate: this.byId("LC").getValue()
			}, {
				Project: this.byId("inpPostPorject").getValue(),
				Description: this.byId("lblCOR").getText(),
				Date: this.byId("CORdate").getValue(),
				Rate: this.byId("COR").getValue()
			}];

			for (var i = 0; i < implData.length; i++) {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/CreatePostImplementation.php',
					data: {
						Project: implData[i].Project,
						Description: implData[i].Description,
						Date: implData[i].Date,
						Rate: implData[i].Rate
					},
					//successfully logged on 
					success: function(data, response, xhr) {

						if (i === 4) {
							this.AddEntryLog("Created a Post-Implementation Plan");
							var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
							MessageBox.success(
								"Post-Implementation rates successfully saved", {
									styleClass: bCompact ? "sapUiSizeCompact" : "",
									onClose: function(sAction) {
										this.oRouter.navTo("MenuPage");
									}.bind(this)
								}
							);

						}
					}.bind(this),
					error: function(e, status, xhr) {

					}
				});
			}

		},

		onValidatePre: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("formPre"));
			var oInputControl;
			// var oIconBar = this.byId("iconRegister");
			var sValue;
			var valid = false;
			for (var m = 0; m < aInputControls.length; m++) {
				oInputControl = aInputControls[m].control;
				// var _roadCtrlType = oInputControl.getMetadata().getName();

				if (aInputControls[m].required) {
					sValue = oInputControl.getValue();
					// if (_roadCtrlType === "sap.m.Slider") {
					// 	sValue = oInputControl.getSelectedItem();
					// } else {

					// }
					if (!sValue) {
						valid = false;
						return;
					} else {
						valid = true;
					}
				}
			}
			if (valid) {
				this.byId("iconAddress").setEnabled(true);
				// oIconBar.setSelectedKey("address");
			} else {
				this.byId("iconAddress").setEnabled(false);
				// oIconBar.setSelectedKey("general");
			}
		},

		_getSimpleFormFields: function(oSimpleForm) {
			var aControls = [];
			var aFormContent = oSimpleForm.getContent();
			var sControlType;
			for (var i = 0; i < aFormContent.length; i++) {
				sControlType = aFormContent[i].getMetadata().getName();
				if (sControlType === "sap.m.Slider" || sControlType === "sap.m.DatePicker") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
		},

		createPreImp: function() {

			var implData = [{
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate1").getText(),
				Date: this.byId("rate1date").getValue(),
				Rate: this.byId("rate1").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate2").getText(),
				Date: this.byId("rate2date").getValue(),
				Rate: this.byId("rate2").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate3").getText(),
				Date: this.byId("rate3date").getValue(),
				Rate: this.byId("rate3").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate4").getText(),
				Date: this.byId("rate4date").getValue(),
				Rate: this.byId("rate4").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate5").getText(),
				Date: this.byId("rate5date").getValue(),
				Rate: this.byId("rate5").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate6").getText(),
				Date: this.byId("rate6date").getValue(),
				Rate: this.byId("rate6").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate7").getText(),
				Date: this.byId("rate7date").getValue(),
				Rate: this.byId("rate7").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate8").getText(),
				Date: this.byId("rate8date").getValue(),
				Rate: this.byId("rate8").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate9").getText(),
				Date: this.byId("rate9date").getValue(),
				Rate: this.byId("rate9").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate10").getText(),
				Date: this.byId("rate10date").getValue(),
				Rate: this.byId("rate10").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate11").getText(),
				Date: this.byId("rate11date").getValue(),
				Rate: this.byId("rate11").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate12").getText(),
				Date: this.byId("rate12date").getValue(),
				Rate: this.byId("rate12").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate13").getText(),
				Date: this.byId("rate13date").getValue(),
				Rate: this.byId("rate13").getValue()
			}, {
				Project: this.byId("inpPrePorject").getValue(),
				Description: this.byId("lblrate14").getText(),
				Date: this.byId("rate14date").getValue(),
				Rate: this.byId("rate14").getValue()
			}];

			for (var i = 0; i < implData.length; i++) {
				$.ajax({
					type: "POST",
					async: false,
					cache: false,
					url: 'PHP/CreatePreImplementation.php',
					data: {
						Project: implData[i].Project,
						Description: implData[i].Description,
						Date: implData[i].Date,
						Rate: implData[i].Rate
					},
					//successfully logged on 
					success: function(data, response, xhr) {
						if (i === 13) {
							this.AddEntryLog("Created a Pre-Implementation Plan");
							var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
							MessageBox.success(
								"Pre-Implementation rates successfully saved", {
									styleClass: bCompact ? "sapUiSizeCompact" : "",
									onClose: function(sAction) {
										this.oRouter.navTo("MenuPage");
									}.bind(this)
								}
							);
						}

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
		onGetProjects: function() {
			var ProjectsModel = new sap.ui.model.json.JSONModel();
			var PreCombo = this.byId("PreCombo");
			var ImpCombo = this.byId("ImpCombo");
			var PostCombo = this.byId("PostCombo");

			$.ajax({
				url: 'PHP/getProjects.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					ProjectsModel.setData(oData);
					PreCombo.setModel(ProjectsModel);
					ImpCombo.setModel(ProjectsModel);
					PostCombo.setModel(ProjectsModel);
				}.bind(this),
				error: function(err, e, xhr) {

				}
			});
		}

	});

});
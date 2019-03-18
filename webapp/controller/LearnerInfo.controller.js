sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("programmeMotse.controller.LearnerInfo", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("LearnerInfo").attachPatternMatched(this._onObjectMatched, this);
			if (!this.sdk) {
				this.sdk = new Fingerprint.WebApi();
			}

		},

		_onObjectMatched: function(oEvent) {
			// this.sdk = new Fingerprint.WebApi;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			this.sdk.onDeviceConnected = function(e) {
				// Detects if the deveice is connected for which acquisition started
				MessageBox.information(
					"Device successfully connected.", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			};
			this.sdk.onDeviceDisconnected = function(e) {
				// Detects if device gets disconnected - provides deviceUid of disconnected device
				MessageBox.alert(
					"Scanning device disconnected.", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			};
			this.onGetPrograms();
			

		},

		onStartFingerPrint: function() {
			this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(function() {
				this.onSampleAcquired();
			}.bind(this), function(error) {
				console.log(error.message);
			});

		},

		onStopFingerPrint: function() {
			this.sdk.stopAcquisition().then(function() {
				console.log("Capturing stopped !!!");
			}, function(error) {
				showMessage(error.message);
			});
		},

		onSampleAcquired: function() {
			var fingerprint = this.byId("finger1");
			this.sdk.onSamplesAcquired = function(s) {
				var samples = JSON.parse(s.samples);
				fingerprint.setSrc("data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
				this.fingerprint = Fingerprint.b64UrlTo64(samples[0]);
				console.log("finger ...   " + this.fingerprint);

			}.bind(this);
		},

		// onSampleAcquired2:function

		onSaveFingerPrint: function() {
			// $.ajax({
			// 	type: "POST",
			// 	url: 'http://35.229.36.224:8080/swagger-ui.html#',
			// 	async: false,
			// 	contentType: 'application/json',
			// 	dataType: 'json',
			// 	accept: "application/json",
			// 	data: JSON.stringify({
			// 		action: "ENROL",
			// 		fingerPrintData: this.fingerprint,
			// 		idNumber: "8002064019183"
			// 	}),
			// 	success: function(data, s, xhr) {
			// 		alert("success " + s);
			// 	}.bind(this),
			// 	error: function(err, e, xhr) {
			// 		alert("error " + e);
			// 	}
			// });
		},

		onSelect: function(oEvent) {
			var key = oEvent.getSource().getProperty("selectedKey");
			// this.r = document.getElementById('r');
			if (key === "key8") {
				this.onSummaryPageFill();
			}

		},

		onNavBack: function() {
			this.getRouter().navTo("LearnerMenu");
		},

		onSaveDetails: function(oEvent) {
			var oThat = this;
			var oData = {};
			var sLearnerModel = new sap.ui.model.json.JSONModel();
			oData.LearnerID = parseInt(("" + Math.random()).substring(2, 5));
			oData.Name = this.byId("inpName").getValue();
			oData.Surname = this.byId("inpSurname").getValue();
			oData.IDNumber = this.byId("inpID").getValue();
			oData.IDType = "ZA";
			if (this.byId("radioGender").getSelectedIndex() === 1) {
				oData.Gender = "Female";
			} else {
				oData.Gender = "Male";
			}

			oData.Age = this.byId("inpAge").getValue();
			oData.ContactNumber = this.byId("inpNumber").getValue();
			oData.EmailAddress = this.byId("inpEmail").getValue();
			oData.AddressLine1 = this.byId("inpLine1").getValue();
			oData.AddressLine2 = this.byId("inpLine2").getValue();
			oData.City = this.byId("inpCity").getValue();
			oData.Province = this.byId("slctProv").getSelectedItem().getText();
			oData.HighestQualification = this.byId("slctQual").getSelectedItem().getText();
			if (this.byId("radioEmploy").getSelectedIndex() === 1) {
				oData.EmploymentStatus = "Unemployed";
			} else {
				oData.EmploymentStatus = "Employed";
			}

			oData.LearnerType = this.byId("slctLType").getSelectedItem().getText();
			oData.Disability = this.byId("slctDisability").getSelectedItem().getText();
			oData.Race = this.byId("slctRace").getSelectedItem().getText();
			oData.UIF = this.byId("slctUIF").getSelectedItem().getText();
			oData.Image = this.image;
			oData.BankName = this.byId("inpBankName").getValue();
			oData.AccountNumber = this.byId("inpAccNum").getValue();
			oData.BranchNumber = this.byId("branch").getValue();
			oData.AccountType = this.byId("AccType").getValue();
			oData.Program = this.byId("cmbProgram").getSelectedItem().getText();
			oData.Signature = this.signatureImage;

			sLearnerModel.setData(oData);
			sap.ui.getCore().setModel(sLearnerModel, "sLearnerModel");
			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/createLearner.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					sap.ui.core.BusyIndicator.hide();
					oThat.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

				}
			});
			// oLearnerModel.setData(oData);
			// sap.ui.getCore().setModel(oLearnerModel, "oLearnerModel");
			// this.handleSuccessMessageBoxPress();
		},

		handleSuccessMessageBoxPress: function(oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Learner information successfully submitted", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
						// onClose: function(sAction) {
						// 	that.oRouter.navTo("MenuPage");
						// }
				}
			);
		},

		onGenerateContract: function(oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			if (sKey === "AgriSeta") {
				this.oRouter.navTo("AgriSeta");
			} else
			if (sKey === "MerSeta") {
				this.oRouter.navTo("Merseta");
			} else {
				this.oRouter.navTo("Ceta");
			}

		},
		handleBankingDetails: function(oEvent) {
			// create popover
			this.event = oEvent.getSource();
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("programmeMotse.view.Fragments.Bankingdetails", this);
				this.getView().addDependent(this._oPopover);
			}
			this._oPopover.openBy(oEvent.getSource());
		},

		onNextPress: function() {
			this.byId("IconAdditional").setEnabled(true);
			var oIconTabBar = this.getView().byId("oIconTB");
			oIconTabBar.setSelectedKey("Key2");
		},
		
		onValidateAdditional:function(){
			var oNextButton = this.byId("btnNextAdd");
			var oLearnerType = this.byId("slctLType");
			var oDisability = this.byId("slctDisability");
			var oRace = this.byId("slctRace");
			var oUIF = this.byId("slctUIF");
			
			if(oLearnerType === null || oDisability === null || oRace === null || oUIF === null){
				oNextButton.setEnabled(false);
			}else{
				oNextButton.setEnabled(true);
			}
		},

		/**
		 * Checks if the save button can be enabled
		 * @private
		 */
		_validateRequiredInputFields: function() {
			var aInputControls = this._getSimpleFormFields(this.byId("PersonalForm"));
			var oInputControl;
			var sValue;
			for (var m = 0; m < aInputControls.length; m++) {
				oInputControl = aInputControls[m].control;
				var _roadCtrlType = oInputControl.getMetadata().getName();

				if (aInputControls[m].required) {
					if (_roadCtrlType === "sap.m.Input") {
						sValue = oInputControl.getValue();
					} else {
						sValue = oInputControl.getSelectedItem();
					}

					if (!sValue) {
						this.byId("btnPNext").setEnabled(false);
						return;
					} else {
						this.byId("btnPNext").setEnabled(true);
					}
				}
			}
		},

		onCameraNext: function(oEvent) {
			this.byId("PrintsIcon").setEnabled(true);
			this.byId("IconBar").setSelectedKey("key3");
		},

		onNextPrint: function(oEvent) {
			this.byId("IconBank").setEnabled(true);
			this.byId("IconBar").setSelectedKey("key4");
		},

		onNextBank: function(oEvent) {
			this.byId("ProgramIcon").setEnabled(true);
			this.byId("IconBar").setSelectedKey("key5");
		},

		onPrint: function(oEvent) {
			var oTarget = this.getView();
			if (oTarget) {
				var $domTarget = oTarget.$()[0],
					sTargetContent = $domTarget.innerHTML,
					sOriginalContent = document.body.innerHTML;

				document.body.innerHTML = sTargetContent;
				window.print();
				document.body.innerHTML = sOriginalContent;
			} else {
				jQuery.sap.log.error("onPrint needs a valid target container [view|data:targetId=\"SID\"]");
			}
		},

		_getSimpleFormFields: function(oSimpleForm) {
			var aControls = [];
			var aFormContent = oSimpleForm.getContent();
			var sControlType;
			for (var i = 0; i < aFormContent.length; i++) {
				sControlType = aFormContent[i].getMetadata().getName();
				if (sControlType === "sap.m.Input" || sControlType === "sap.m.ComboBox") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
		},

		onSummaryPageFill: function(oEvent) {
			this.byId("txtName").setText(this.byId("inpName").getValue());
			this.byId("txtSurname").setText(this.byId("inpSurname").getValue());
			this.byId("txtIDNumber").setText(this.byId("inpID").getValue());
			this.byId("txtAge").setText(this.byId("inpAge").getValue());
			this.byId("txtNumber").setText(this.byId("inpNumber").getValue());
			this.byId("txtEmail").setText(this.byId("inpEmail").getValue());
			this.byId("txtAddress").setText(this.byId("inpLine1").getValue() + ", " + this.byId("inpLine2").getValue() + ", " + this.getView()
				.byId("inpCity").getValue() + ", " + this.getView().byId("slctProv").getSelectedKey());
			this.byId("txtQual").setText(this.getView().byId("slctQual").getSelectedItem().getText());

			this.byId("txtBankName").setText(this.byId("inpBankName").getValue());
			this.byId("txtAcc").setText(this.byId("inpAccNum").getValue());
			this.byId("userIMG").setSrc(this.data);
			this.byId("txtBranch").setText(this.byId("branch").getValue());
			this.byId("txtAccType").setText(this.byId("AccType").getValue());
			if (this.byId("radioEmploy").getSelectedIndex() === 1) {
				this.byId("txtEmployement").setText("Unemployed");
			} else {
				this.byId("txtEmployement").setText("Employed");
			}
			this.byId("txtLType").setText(this.byId("slctLType").getSelectedItem().getText());
			this.byId("txtDisability").setText(this.byId("slctDisability").getSelectedItem().getText());
			this.byId("txtRace").setText(this.byId("slctRace").getSelectedItem().getText());
			this.byId("txtUIF").setText(this.byId("slctUIF").getSelectedItem().getText());
			this.byId("txtProgram").setText(this.getView().byId("cmbProgram").getSelectedItem().getText());

		},

		onNextProg: function(oEvent) {
			this.byId("SummIcon").setEnabled(true);
			this.byId("IconBar").setSelectedKey("key6");
			this.onSummaryPageFill();
		},

		onBankAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var oFileReader = new FileReader();

			oFileReader.onload = function() {
				var base64String = oFileReader.result;
				window.BankContent = base64String.split(',')[1];
			};
			oFileReader.readAsDataURL(oParameters.files[0]);
		},

		onIDAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var oFileReader = new FileReader();

			oFileReader.onload = function() {
				var base64String = oFileReader.result;
				window.IDContent = base64String.split(',')[1];
			};
			oFileReader.readAsDataURL(oParameters.files[0]);
		},

		onQualAttachmentChange: function(oEvent) {
			var oParameters = oEvent.getParameters();
			//create file reader and file reader event handler
			var oFileReader = new FileReader();

			oFileReader.onload = function() {
				var base64String = oFileReader.result;
				window.QualContent = base64String.split(',')[1];
			};
			oFileReader.readAsDataURL(oParameters.files[0]);
		},

		onSaveBankingDetails: function(oEvent) {
			var oTable = this.byId("tblBank");
			var BankName = sap.ui.getCore().byId("inpBankName").getValue();
			var AccountNumber = sap.ui.getCore().byId("inpAccNum").getValue();
			var Branch = sap.ui.getCore().byId("branch").getValue();
			var AccType = sap.ui.getCore().byId("AccType").getValue();

			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: BankName
					}),
					new sap.m.Text({
						text: AccountNumber
					}),
					new sap.m.Text({
						text: Branch
					}),
					new sap.m.Text({
						text: AccType
					})
				]
			});
			oTable.addItem(columnListItemNewLine);
			oTable.setVisible(true);
			this.byId("btnBank").setVisible(false);
			this._oPopover.close();
		},

		onGetPrograms: function(oEvent) {
			var ProgramModel = new sap.ui.model.json.JSONModel();
			var cmb = this.byId("cmbProgram");
			$.ajax({
				url: 'PHP/getPrograms.php',
				async: false,
				success: function(data) {
					var oData = data.result;
					ProgramModel.setData(oData);
					cmb.setModel(ProgramModel);
				},
				error: function(err) {

				}
			});
		},

		onSign: function() {
			this.tmr;
			var ctx = document.getElementById('cnv').getContext('2d');
			SetDisplayXSize(500);
			SetDisplayYSize(100);
			SetTabletState(0, this.tmr);
			SetJustifyMode(0);
			ClearTablet();
			SetKeyString("0000000000000000");
			SetEncryptionMode(0);
			if (this.tmr == null) {
				this.tmr = SetTabletState(1, ctx, 50);
			} else {
				SetTabletState(0, this.tmr);
				this.tmr = null;
				this.tmr = SetTabletState(1, ctx, 50);
			}
		},

		GetSigString: function() {
			var Prop = "SigString";

			Prop = Prop;
			var Str = this.SigWebGetProperty(Prop);

			return Str.slice(1, Str.length - 1);
		},

		onClear: function() {
			var Prop = "ClearSignature";

			Prop = Prop;
			return this.SigWebGetProperty(Prop);
		},

		SigWebGetProperty: function(prop) {
			var xhr = this.SigWebcreateXHR();

			if (xhr) {
				xhr.open("GET", baseUri + prop, false);
				xhr.send(null);
				if (xhr.readyState == 4 && xhr.status == 200) {
					return xhr.responseText;
				}
			}
			return "";
		},

		SigWebcreateXHR: function() {
			try {
				return new XMLHttpRequest();
			} catch (e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			} catch (e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch (e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {}
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}

			alert("XMLHttpRequest not supported");
			return null;
		},

		getFile: function(url, post, done) {
			var that = this;
			var postEnc, method;
			if (post == null) {
				postEnc = '';
				method = 'GET';
			} else {
				method = 'POST';
				postEnc = new FormData();
				for (var i in post)
					postEnc.append(i, post[i]);
			}
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var res = this.response;
					var reader = new window.FileReader();
					reader.readAsDataURL(res);
					reader.onloadend = function() {
						that.FillPDF(res);
						//return (reader.result.split('base64,')[1]);
					};
				}
			};
			xhr.open('GET', 'Merseta.PDF');
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send('fname=Henry&lname=Ford');
			xhr.responseType = 'blob';
			// xhr.send(postEnc);
		},

		onDone: function() {
			var canvas = document.getElementById('cnv');
			this.signatureImage = canvas.toDataURL('image/jpeg', 1.0);

			// if (NumberOfTabletPoints() == 0) {
			// 	alert("Please sign before continuing");
			// } else {
			// 	SetTabletState(0, this.tmr); //deactivate connection
			// 	var CryptoData = "";
			// 	CryptoData = "This represents sample data the signer reads and is agreeing to when signing.";
			// 	CryptoData = CryptoData + "Concatenate all this data into a single variable.";
			// 	AutoKeyAddData(CryptoData); //PASS THE DATA IN TO BE USED FOR AUTOKEY
			// 	SetEncryptionMode(2);
			// 	SetSigCompressionMode(1);
			// 	//alert("KEYSTRING:" + GetKeyString());
			// 	// document.FORM1.bioSigData.value = this.GetSigString();
			// 	// document.FORM1.sigStringData.value += this.GetSigString();
			// 	SetImageXSize(500);
			// 	SetImageYSize(100);
			// 	SetImagePenWidth(5);
			// 	GetSigImageB64(this.SigImageCallback()); //PASS IN THE FUNCTION NAME SIGWEB WILL USE TO RETURN THE FINAL IMAGE
			// }
		},

		SigImageCallback: function(str) {
			this.signatureImage = str;
			document.FORM1.sigImageData.value = str; //OBTAIN FINAL IMAGE HERE
		},

		snapshot: function() {
			this.canvas = document.getElementById("myCanvas");
			this.ctx = this.canvas.getContext('2d');
			// Draws current image from the video element into the canvas
			this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
		},

		stopWebcam: function() {
			var video = document.getElementById('video');
			this.image = this.data;
			video.pause();
			video.currentTime = 0;
			var mediaStream = null;
			navigator.mediaDevices.getUserMedia({
					audio: true,
					video: true
				},
				function(stream) {
					mediaStream = stream;
					mediaStream.stop = function() {
						this.getAudioTracks().forEach(function(track) {
							track.stop();
						});
						this.getVideoTracks().forEach(function(track) { //in case... :)
							track.stop();
						});
					};
					/*
					 * Rest of your code.....
					 * */
				});

			mediaStream.getTracks()[0].stop();

			/*
			 * somewhere insdie your code you call
			 * */
			mediaStream.stop();
		},

		startWebcam: function() {
			this.width = 320; // We will scale the photo width to this
			this.height = 0; // This will be computed based on the input stream
			var that = this;
			var streaming = false;

			var video = document.getElementById('video');
			var canvas = document.getElementById('canvas');
			var photo = this.byId("photo");
			var startbutton = document.getElementById('startbutton');

			navigator.mediaDevices.getUserMedia({
					video: true,
					audio: false
				})
				.then(function(stream) {
					video.srcObject = stream;
					video.play();
				})
				.catch(function(err) {
					console.log("An error occurred! " + err);
				});

			video.addEventListener('canplay', function(ev) {
				if (!streaming) {
					that.height = video.videoHeight / (video.videoWidth / that.width);

					video.setAttribute('width', that.width);
					video.setAttribute('height', that.height);
					canvas.setAttribute('width', that.width);
					canvas.setAttribute('height', that.height);
					streaming = true;
				}
			}, false);
		},

		clearphoto: function() {
			var photo = this.byId("photo");
			photo.setSrc(null);
		},

		takepicture: function() {
			var video = document.getElementById('video');
			var canvas = document.getElementById('canvas');
			var photo = this.byId("photo");
			var context = canvas.getContext('2d');
			if (this.width && this.height) {
				canvas.width = this.width;
				canvas.height = this.height;
				context.drawImage(video, 0, 0, this.width, this.height);

				this.data = canvas.toDataURL('image/png');
				photo.setSrc(this.data);
				//photo.setAttribute('src', data);
			} else {
				this.clearphoto();
			}
		}
	});
});
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("programmeMotse.controller.Testing", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.Testing
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("LearnerInfo").attachPatternMatched(this._onObjectMatched, this);
			if (!this.sdk) {
				this.sdk = new Fingerprint.WebApi();
			}
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
				var sampleObject = Fingerprint.b64UrlTo64(samples[0]);
				fingerprint.setSrc("data:image/png;base64," + sampleObject);
				this.fingerprint = "data:image/png;base64," + sampleObject;

				this.enrolOrVerify(sampleObject);
				//console.log("WSQ Format  " + this.fingerprint);

			}.bind(this);
		},

		enrolOrVerify: function(s) {
			var fingerprintStatusRequest = {
				"action": "VERIFY", // Dynamically load the action depending on the workflow
				"idNumber": "5005022934180", // Dynamically load the ID number from the UI
				"fingerprintIndex": 1, //for now you may hard code it to 1. This must not hard coded  if many fingers are enrolled
				"fingerprintData": s
			};

			var fingerprintStatusRequestJson;
			fingerprintStatusRequestJson = JSON.stringify(fingerprintStatusRequest);
			console.log(fingerprintStatusRequestJson);

			// var URL = "http://35.229.36.224:8080/api/fingerprint/enrol-verify";  //Your URL
			var URL = "http://34.73.21.183:8080/api/fingerprint/enrol-verify";
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);

			xmlhttp.open("POST", URL, false);
			xmlhttp.setRequestHeader("Content-Type", "application/json");

			xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
			xmlhttp.send(fingerprintStatusRequestJson);

			xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
		},

		callbackFunction: function(xmlhttp) {
			var response = JSON.parse(xmlhttp.response);
			console.log(response);
		},

		onSaveFingerPrint: function() {
			// this.onSendFile();
			// this.downloadURI(this.fingerprint, "9001018980085.png", "image/png");
		},

		downloadURI: function(uri, name, dataURIType) {
			if (this.IeVersionInfo() > 0) {
				//alert("This is IE " + IeVersionInfo());
				var blob = this.dataURItoBlob(uri, dataURIType);
				// window.navigator.msSaveOrOpenBlob(blob, name);

				var reader = new FileReader();

			} else {
				//alert("This is not IE.");

				var save = document.createElement('a');
				save.href = uri;
				save.download = name;
				var event = document.createEvent("MouseEvents");
				event.initMouseEvent(
					"click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
				);
				save.dispatchEvent(event);
			}
		},

		dataURItoBlob: function(dataURI, dataURIType) {
			var binary = atob(dataURI.split(',')[1]);
			var array = [];
			for (var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}
			return new Blob([new Uint8Array(array)], {
				type: dataURIType
			});
		},

		IeVersionInfo: function() {
			var sAgent = window.navigator.userAgent;
			var IEVersion = sAgent.indexOf("MSIE");

			// If IE, return version number.
			if (IEVersion > 0) {
				return parseInt(sAgent.substring(IEVersion + 5, sAgent.indexOf(".", IEVersion)));
			}

			// If IE 11 then look for Updated user agent string.
			else if (!navigator.userAgent.match(/Trident\/7\./)) {
				return 11;
			}

			// Quick and dirty test for Microsoft Edge
			else if (document.documentMode || /Edge/.test(navigator.userAgent)) {
				return 12;
			} else {
				return 0; //If not IE return 0
			}
		},

		onSendFile: function() {
			var oData = {};
			// var file = new File([this.blob], "9001018980085.png");
			// // var myFile = this.blobToFile(this.blob, "9001018980085.png");
			// var link = document.createElement("a");
			oData.Image = this.fingerprint;
			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/onSendImage.php',
				data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					// this.handleSuccessMessageBoxPress();
					console.log("success data : " + data);
					console.log("success response : " + response);
					console.log("success xhr : " + xhr);

				}.bind(this),
				error: function(e, status, xhr) {
					console.log("Error e : " + e);
					console.log("Error status : " + status);
					console.log("Error xhr : " + xhr);
				}
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf programmeMotse.view.Testing
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.Testing
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.Testing
		 */
		//	onExit: function() {
		//
		//	}

	});

});
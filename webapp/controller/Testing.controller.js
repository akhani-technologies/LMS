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
				fingerprint.setSrc("data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
				this.fingerprint = "data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]);
				//console.log("WSQ Format  " + this.fingerprint);

			}.bind(this);
		},

		// onSampleAcquired2:function

		onSaveFingerPrint: function() {
			this.downloadURI(this.fingerprint, "9001018980085.png", "image/png");
		},

		downloadURI: function(uri, name, dataURIType) {
			if (this.IeVersionInfo() > 0) {
				//alert("This is IE " + IeVersionInfo());
				var blob = this.dataURItoBlob(uri, dataURIType);

				window.navigator.msSaveOrOpenBlob(blob, name);

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
			// var oData = {};
			// var file = new File([this.blob], "9001018980085.png");
			// // var myFile = this.blobToFile(this.blob, "9001018980085.png");
			// oData.Image = file;
			$.ajax({
				type: "POST",
				async: false,
				cache: false,
				url: 'PHP/onSendImage.php',
				// data: oData,
				//successfully logged on 
				success: function(data, response, xhr) {
					// this.handleSuccessMessageBoxPress();
				}.bind(this),
				error: function(e, status, xhr) {

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
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("programmeMotse.controller.WelcomePage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf programmeMotse.view.WelcomePage
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oModel = new JSONModel({
				HTML: 
					"<ol>"+ 
						"<li>This Service User Agreement and Terms of Use constitutes the agreement between Akhani Technologies. ('Akhani') and you as a user who accesses or establishes a connection ('user,' 'you,' or 'your') to the internet site located at www.akhani-lms/webapp/lms or any services provided in connection with the site (collectively the 'Service'), which are owned and controlled by Akhani. If you have registered for or on behalf of an entity, you are deemed to have accepted this Agreement on behalf of that entity. YOU AGREE THAT BY USING THE SERVICE YOU REPRESENT THAT YOU ARE AT LEAST 18 YEARS OLD AND THAT YOU ARE LEGALLY ABLE TO ENTER INTO THIS AGREEMENT.</li>"+
						"<li>You agree to abide by all of the provisions in this Agreement in order to remain an authorized user of the Service, and your use of the Service constitutes your agreement to abide by these provisions. You are solely responsible for your use of the Service, for all use of the Service made by others using your user name and password, and for ensuring that such use complies fully with the provisions of this Agreement. </li>"+
						"<li>Akhani respects your privacy and permits you to control the treatment of your personal information as provided for in the Protection of Personal Information Act</li>"+ 
						"<li>Akhani reserves the right, in its sole discretion, to change any or all of the provisions of this Agreement at any time. Akhani will notify users of any changes by posting them on the Service or through other reasonable means of providing notice. Any changes to this Agreement will be effective immediately upon notice to you. Your use of the Service after notice of changes to this Agreement have been made will be deemed your acceptance of the changes. </li>"+ 
						"<li>Akhani reserves the right, in its sole discretion, to change, limit, or discontinue any aspect, content, or feature of the Service, as well as any aspect pertaining to the use of the Service. Akhani further reserves the right, in its sole discretion, to restrict the use of the Service as well as suspend or revoke your rights to use the Service based on Akhani's belief that your use of the Service violates that permitted by this Agreement or applicable law.</li>" + 
						"<li>if you do not agree to the provision of this agreement or are not satisfied with the service, your sole and exclusive remedy is to discontinue your use of the service.</li>"+
						"<li>Rights in Akhani Service"+ 
							"<ol>"+
								"<li>The Service is protected by copyright, patent, trademark, and other applicable intellectual property and proprietary rights laws and is owned, controlled, and/or licensed by Akhani. The Akhani logo is a trademark of Akhani and its parent or subsidiaries. All other trademarks appearing on the Service are the property of their respective owners.</li>"+
								"<li>Akhani hereby grants to you for the term of this Agreement a worldwide, revocable, nonexclusive license to use the Service solely for your personal, organizational, or internal use only. You will make no other use of the content without the express written permission of Akhani, the copyright owner or its authorized agent. You will not modify, publish, distribute, transmit, participate in the transfer or sale, create derivative works, or in any way exploit, any of the content, in whole or in part, found on the Service that was not expressly created by yourself or someone in your organization with your permission. You also will not 'frame' any of the content on the Service or the Service itself without the express written permission of Akhani and the copyright owner or its authorized agent. You agree that you do not acquire any ownership rights in the Service or in any downloaded content. Your further agree that all rights in the Service and any of the content found on the Service not granted to you under this Agreement are expressly reserved to Akhani and/or its licensors. </li>"+
							"</ol>"+
						"</li>"+
						"<li>User Activities and User Content on the Service "+
							"<ol>"+
								"<li>You will use the Service and any content, material, or information found on the Service solely for lawful purposes. You shall not upload to, distribute to, or otherwise disseminate through the Service any material or information of any kind that is libelous, defamatory, obscene, pornographic, abusive, or otherwise violates any law or infringes or violates any rights of any other person or entity, or contains a solicitation of funds, advertising, or a solicitation for goods or services. </li> " + 
								"<li>Akhani does not claim ownership of the content you publish on the Site. After publishing content on the Site, you (or a third party who permitted you to publish their content on the Site) continue to retain all ownership to the content, subject to the license terms described herein, and you continue to have the right to use the content in any way you choose.</li>"+
								"<li>You grant Akhani a license to use the materials you post to the Service. By posting, downloading, displaying, performing, transmitting, or otherwise distributing information or other content (User Content) to the Service, you are granting Akhani, its affiliates, officers, directors, employees, consultants, agents, and representatives a license to use User Content in connection with the operation of the Internet business of Akhani, including without limitation, a right to copy, distribute, license, transmit, reproduce, and reformat User Content. You agree that Akhani may publish or otherwise disclose your company name in connection with becoming a customer.</li>"+
								"<li>You warrant that any material or information that you make available through the Service, including, for example, any documents, remediation or related content, is solely your original work, or that you have all necessary rights to make the material or information of any other person or entity available on the Service. You will be solely responsible for the content of any material or information that you make available through the Service. You will also be liable for any damage resulting from your making any material or information available through the Service. </li> "+ 
								"<li>Akhani has no obligation to, and does not and cannot, review every item of material or information that you and users other than yourself make available through the Service, and Akhani is not responsible for any content of this material or information. However, Akhani reserves the right to delete, move, or edit any material or information that it deems, in its sole discretion, unacceptable, libelous, defamatory, obscene, pornographic, abusive, or otherwise in violation of any law or that infringes or violates any rights of any other person or entity. Further, Akhani reserves the right at all times to disclose any material or information as necessary to satisfy any law, regulation, or governmental request. </li>"+
							"</ol>"+
						"</li>"+
						"<li>Disclaimer of Warranties & Limitation of Liability"+
							"<ol>"+
								"<li>You expressly agree that use of the Service and the Akhani Software (as defined below) is at your sole risk. Neither Akhani nor any of its parents, subsidiaries, affiliates, employees, agents, distributors, third party content providers, or licensors (and their respective directors, officers, employees, and agents) warrant that the Service or the Akhani Software will be uninterrupted or error free or that they will be free of viruses or other harmful components nor do they make any warranty as to the results that may be obtained from the use of the Service or the Akhani Software, or as to the accuracy, reliability, completeness, or contents of any content, information, material, postings, or posting responses found on the Service or the Akhani Software, any merchandise or services provided through the Service or the Akhani Software, or any links to other sites or services made available on the Service or the Akhani Software</li>"+
								"<li>THE SERVICE, ALL CONTENT, MATERIAL, INFORMATION, POSTINGS, OR POSTING RESPONSES FOUND ON THE SERVICE, AND THE AKHANI SOFTWARE ARE PROVIDED ON AN 'AS IS' BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. </li>"+
								"<li>Notwithstanding anything in this Agreement to the contrary, under no circumstances, including, but not limited to, negligence, shall Akhani or any of its parents, subsidiaries, related companies, affiliates, assignees, successors-in-interest, employees, agents, distributors, third party content providers, partners, licensees, licensors, or sponsors or any of their respective directors, officers, employees, agents and independent contractors (individually and collectively, the 'AKHANI entities') be liable for any direct, indirect, incidental, special or consequential damages, losses or expenses arising out of or relating to the use of, the misuse of, or the inability to use, any content, information, material, postings, posting responses, modules, features, links or other elements on or of the System or the Akhani Software or any failure of performance, error, omission, interruption, inconvenience, unauthorized access, defect, incorrect sequencing, delay in operation or transmission, virus, configuration or compatibility problem, or line or system failure. These limitations apply regardless of whether the party liable or allegedly liable was advised, had other reason to know, or in fact knew of the possibility of such damages, losses or expenses. You specifically acknowledge and agree that none of the AKHANI Entities is or will be liable for any defamatory, offensive or illegal conduct of any user. In no event shall the aggregate, total liability of the AKHANI Entities exceed the amount of the Hosting Fees paid by you to Akhani during the twelve (12) months prior to any claim of injury or damage. </li>"+
							"</ol>"+ 
						"</li>"+
						"<li>Non- Circumvention <br/> User agrees to be legally bound, and irrevocably agrees not to circumvent, avoid, bypass or obviate Akhani, directly or indirectly, to secure business from clients first introduced to the User by Akhani, unless first consented to by Akhani in a writing signed by Akhani management."+
							"This agreement shall be binding on the User, its successors and assigns, agents, employees and representatives. User agrees to notify Akhani by express mail prior to any request to deal directly and before reaching any agreement and or contract or terms of any kind in connection with securing business from clients first introduced to User by Akhani. "+
							"The non-circumvention rules and provisions in effect for this transaction are binding for all parties, including employees, representatives, associates, assignees, relatives, designees and third parties for the three year duration of this agreement or for the life of the User, whichever is greater.</li>"+
						"<li>Indemnification <br/>To the maximum extent permitted by applicable law, you will defend, indemnify and hold harmless Akhani (and any of its parts, subsidiaries, affiliates, employees, agents, distributors, third party content providers, or licensors (and their respective directors, officers, employees, and agents)) from and against all claims, liability, and expenses, including attorneys' fees and legal fees and costs, arising out of your use of the Service or your breach of any provision of this Agreement. Akhani reserves the right, in its sole discretion and at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you. You will cooperate as fully as reasonably required in the defense of any claim. </li> "+ 
						"<li>Termination<br/>Akhani shall have the right immediately upon notice to you to terminate your use of the Service in the event of any conduct by you which Akhani, in its sole discretion, considers to be unacceptable, or in the event of any breach by you of this Agreement or violation of applicable law. </li>"+
						"<li>General Terms<br/>This Agreement and any rules posted on the Service by Akhani constitute the entire agreement of the parties with respect to the subject matter hereof. No waiver by either Akhani or you of any breach or default under this Agreement shall be deemed to be a waiver of any preceding or subsequent breach or default. This Agreement shall be binding upon and inure to the benefit of Akhani and its successors, trustees, and permitted assigns. Akhani may assign this Agreement, or any of its rights or obligations under this Agreement, with or without notice to you. Any such assignment by Akhani does not relieve you of your obligations under this Agreement</li>"+
					"</ol>" 
					
			});
			this.getView().setModel(oModel);
		},

		onAccept: function() {
			this.oRouter.navTo("LoginPage");
		},

		onDecline: function() {
			this.oRouter.navTo("ConfirmationPage");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf programmeMotse.view.WelcomePage
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf programmeMotse.view.WelcomePage
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf programmeMotse.view.WelcomePage
		 */
		//	onExit: function() {
		//
		//	}

	});

});
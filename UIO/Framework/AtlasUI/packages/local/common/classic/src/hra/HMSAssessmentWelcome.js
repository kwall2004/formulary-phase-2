/**
 * Created by b6636 on 11/1/2016.
 */
Ext.define('Atlas.common.view.hra.HMSAssessmentWelcome', {
  extend: 'Ext.panel.Panel',
  controller: 'hmsAssessmentController',
  viewModel: 'hmsassessmentwelcomeviewmodel',
  layout: 'fit',
  align: 'stretch',
  title: 'HMS Assessment',
  items: [
    {
      xtype: 'panel',
      cls: 'card-panel',
      title: 'Welcome',
      reference: 'welcomePage',
      hidden: true,
      scrollable: true,
      items: [
        {
          cls: 'formPanel',
          padding: 10,
          bind: {
            html: '\<p>Hello {userFirstName} {userLastName}\<br />' +
                        'If you wish to download a blank copy of the Healthy Michigan HRA Survey please click on the pdf link below.\</p>' +
                        '\<p><a target="_blank" href="{HEALTHY_MI_MEMBER_DOWNLOAD_LINK}">Healthy Michigan Survey Risk Assessment PDF</a></p>' +
                        '\<p>If you wish to complete the survey online, click on the link below to proceed:</p>'
          }
        },
        {
          xtype: 'button',
          margin: 10,
          text: 'Healthy Michigan Survey Health Risk Assessment',
          listeners: {
            click: 'displayHMSAssessmentForm'
          }
        },
        {
          padding: 10,
          cls: 'formPanel',
          html: '\<br />** <b>Please Note:</b><br />You will be able to fill out Sections 1,2, and 3 of the form on the Member Portal.<br />' +
                    'Section 4 of the HRA form must be completed by your Primary Care Physician.\<br />When you have completed filling out ' +
                    'Sections 1,2, and 3 you will be able to save your responses and download the\ <br />entire form including (blank) Section 4 ' +
                    'and carry the form to your physician\'s office for completion and attestation.'
        }
      ]
    },
    {
      xtype: 'panel',
      cls: 'card-panel',
      title: 'Health Risk Assessment for the Healthy Michigan Plan',
      reference: 'providerWelcomePage',
      hidden: true,
      scrollable: true,
      items: [
        {
          cls: 'formPanel',
          padding: 10,
          bind: {
            html: 
                        'In partnership with Meridian, the member\'s PCP is to complete a Health Risk Assessment (HRA) with<br />' +
                        'each Healthy Michigan Plan (HMP) member and sign (attest) on the last page.  The assigned PCP will <br />' +
                        'receive a <b>$25 bonus</b> for each HRA completed and submitted to Meridian.<br /><br />' +
                        'Detailed instructions regarding the HRA are available to you in PDF format: {HEALTHY_MI_PCP_INSTRUCTIONS_LINK}<br /><br />' +
                        'To fill out the survey by hand and fax it in:<br /><br />' +
                        '<a target="_blank" href="{HEALTHY_MI_MEMBER_DOWNLOAD_LINK}">Healthy Michigan Survey Risk Assessment PDF</a><br /><br />' +

                        'To complete the survey online and attest with an electronic signature:<br /><br />'
          }
        },
        {
          xtype: 'button',
          margin: 10,
          text: 'Proceed to online Healthy Michigan Health Risk Assessment',
          listeners: {
            click: 'displayProviderHMSAssessmentForm'
          }
        },
        {
          cls: 'formPanel',
          padding: 10,
          html: '<b>Note:</b> To use documents in PDF format you will need Adobe Acrobat Reader, which can be downloaded at <a href="http://www.adobe.com" target="blank">www.adobe.com</a>.'
        }
      ]
    },
        // {
        //     xtype: 'panel',
        //     reference: 'hmsAssessmentForm',
        //     visible: false,
        //     items: []
        // },
    {
      xtype: 'form',
      region: 'center',
      title: 'Health Risk Assessment',
      cls: 'card-panel',
      layout: 'card',
      reference: 'hmsAssessmentForm',
      visible: false,
      fieldDefaults: {
        msgTarget: 'under' // if set to side, the validation indicators show up to the far right
      },
            // just an example of one possible navigation scheme, using buttons
      tbar: [
        {
          id: 'hms-card-instructions',
          text: 'Instructions',
          hmsDirection: 0,
          handler: 'processHMSButtonClick'
        },
        {
          id: 'hms-card-aboutyou',
          text: 'Section 1',
          hmsDirection: 1,
          handler: 'processHMSButtonClick'
        },
        {
          id: 'hms-card-medicalhistory',
          text: 'Section 2',
          hmsDirection: 2,
          handler: 'processHMSButtonClick'
        },
        {
          id: 'hms-card-medications',
          text: 'Section 3',
          hmsDirection: 3,
          handler: 'processHMSButtonClick'
        },
        {
          id: 'hms-card-page4',
          text: 'Section 4',
          hmsDirection: 4,
          handler: 'processHMSButtonClick'
        }
      ],
      bbar: [
        {
          id: 'hms-move-prev',
          text: 'Back',
          hmsDirection: 'prev',
          handler: 'processHMSButtonClick',
          disabled: true
        },
        '->', // greedy spacer so that the buttons are aligned to each side
        {
          id: 'hms-move-next',
          text: 'Next',
          hmsDirection: 'next',
          handler: 'processHMSButtonClick'
        },
        {
          id: 'hms-save',
          text: 'Save Draft',
          listeners: {
            click: 'onSaveDraft'
          }
        },
        {
          id: 'hms-saveSubmit',
          text: 'Submit',
          listeners: {
            click: 'onSubmit'
          },
          disabled: true,
          bind: {
            visible: '{portalType == "hpprovider"}'
          }
        },
        {
          id: 'hms-refused',
          text: 'Refused',
          listeners: {
            click: 'onRefused'
          }
        }
      ],
      defaults:
      {
        padding: 10,
        cls: 'formPanel'
      },
      items: [
        {
                    //id: 'hms-card-instructions',
          reference: 'hmsInstructions',
          scrollable: true,
          items: [
            {
              cls: 'formPanel',
              bind: {
                html: '<h2><u>Instructions</u></h2>' +
                '<p>{currentDate}</p>' +
                '<p></p>' +
                '<p>{userFirstName} {userLastName}<br />' +
                '{memberAddressLine1}<br />' +
                '{memberAddressLine2}' +
                '{memberCity}, {memberState} {memberZip}</p>' +
                '<p>The Healthy Michigan Plan wants to reward you for working on getting healthy and staying healthy.  We want<br />' +
                'to ask you a few questions about your current health and hope you see your doctor for a check-up as soon as<br />' +
                'possible after you enroll, and at least once a year after that.  Take this form with you when you visit your <br />' +
                'doctor.  An annual check-up is a covered benefit of the Health Michigan Plan.</p>' +
                '<p>Your doctor and your health plan will use this info to better meet your health needs.  The info you provide in<br />' +
                'this form will be kept confidential. It CANNOT be used to deny health care coverage.</p>' +
                '<p>If you need help completing this form or have any questions, call Meridian at 888-437-0606.</p>' +
                '<p><b>Instructions for completing this Health Risk Assessment for Healthy Michigan Plan:</b></p>' +
                '<ul>' +
                '<li>Answer the questions in sections 1-3 as best you can.  You are not required to answer all of the questions</li>' +
                '<li>Call your doctor\'s office to schedule your annual check-up.  Take this form with you when you go</li>' +
                '<li>Your doctor or primary care provider (PCP) will complete section 4.  Your PCP will send your results to Meridian</li>' +
                '<li>Once your doctor completes this form and sends it to Meridian, you could <b>earn a reward</b></li>' +
                '</ul>' +
                '<p>You could earn a $50 gift card (if below 100% FPL) or 50% off your monthly contributions (if 100-133% FPL).<br />' +
                'Your doctor will talk to you about what you need to do to earn this reward. This may include maintaining current<br />' +
                'healthy behaviors or starting new ones.  Some examples are exercising more, eating healthier, lowering alcohol<br />' +
                'or tobacco use.  Keep a copy of this form with your doctor\'s signature on it. This is your record that you<br />' +
                'completed your annual Health Risk Assessment.</p>' +
                '<p></p>' +
                '<p>Sincerely,</p>' +
                '<p>Meridian Health Plan</p>' +
                '<div style="background-color:#D5E1F3;"><b>Please Note:</b>  Any completed information in this health risk assessment has been <br />' +
                'submitted to Meridian Health Plan on your behalf.  Meridian may have received <br />' +
                'part of your health risk assessment from your initial MIEnrolls application or your<br />' +
                'personal doctor.  You may return to this page and edit your information until the <br />' +
                'assessment is completed.  Please contact Meridian\'s Member Services <br />' +
                'department at 888-437-0606 if you have any questions</div>'
              }
            }
          ]
        },
        {
                    //id: 'hms-card-0',
          reference: 'hmsSection1',
          scrollable: true
        },
        {
                    //id: 'hms-card-1',
          reference: 'hmsSection2',
          scrollable: true
        },
        {
                    //id: 'hms-card-2',
          reference: 'hmsSection3',
          scrollable: true
        },
        {
                    //id: 'hms-card-3',
          reference: 'hmsSection4',
          scrollable: true
        }
      ]
    },
    {
      xtype: 'window',
      reference: 'attestDialog',
      title: 'Attest and Submit the Survey',
      bbar: [
        {
          xtype: 'button',
          text: 'Sign',
          listeners: {
            click: 'onAttestSign'
          }
        },
        {
          xtype: 'button',
          text: 'Cancel',
          listeners: {
            click: 'onAttestCancel'
          }
        }
      ],
      modal: true,
      items: [
        {
          html: 'I attest that I have examined the member named in this online survey<br />and that the information is complete ' +
                    'and accurate to the best of <br />my knowledge.  I have provided a copy of the Healthy ' +
                    'Michigan Survey<br />to the member.<br /><br />' +
                    'Please check the details below and provide your password<br />to complete your electronic signature.<br /><br />' +
                    'If you have selected the incorrect provider, please press<br /> cancel and return ' +
                    'to the survey to select a different provider.<br /><br />',
          autoEl: 'div'
        },
        {
          fieldLabel: 'Name',
          reference: 'attestName',
          xtype: 'textfield',
          readOnly: true
        },
        {
          fieldLabel: 'NPI',
          reference: 'attestNPI',
          xtype: 'textfield',
          readOnly: true
        },
        {
          fieldLabel: 'Attestation Date (MM/DD/YY)',
          reference: 'attestDate',
          xtype: 'textfield',
          readOnly: true
        },
        {
          fieldLabel: 'Password',
          xtype: 'textfield',
          reference: 'attestPassword',
          inputType: 'password'
        }
      ]
    }
  ]
});
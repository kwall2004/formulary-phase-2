/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Demographics - Notify Health plan
 * Description: Gives users a place to view Notify Health Plan
 */
Ext.define('Atlas.portals.view.provider.MemberNotifyHealthPlan', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberNotifyHealthPlan',
  controller: 'membernotifyhealthplancontroller',

  tbar: [{
    xtype: 'displayfield',
    fieldLabel: 'Member ID',
    reference: 'memberIdRef'
  }, {
    xtype: 'displayfield',
    fieldLabel: 'Name',
    reference: 'memberNameRef'
  }],

  bbar: [
    '->',
    {
      xtype: 'button',
      text: 'OK',
      handler: 'onOkClick'
    },
    {
      xtype: 'button',
      text: 'Cancel',
      handler: function () {
        this.up('window').close();
      }
    },
    '->'
  ],

  items: [
    {
      xtype: 'tabpanel',
      cls: 'formPanel',
      reference: 'notifyHealthTabs',
      activeTab: 0,
      items: [
        {
          title: 'Member Management',
          xtype: 'container',

          items: [
            {
              xtype: 'container',
              layout: 'hbox',
              items: [
                {
                  xtype: 'fieldset',
                  title: 'Member Information',
                  defaults: {
                    labelWidth: 120,
                    xtype: 'textfield'
                  },
                  items: [
                    {
                      fieldLabel: 'Address 1',
                      name: 'memberMgmtAddr1',
                      reference: 'memberMgmtAddr1'
                    },
                    {
                      fieldLabel: 'Address 2',
                      name: 'memberMgmtAddr2',
                      reference: 'memberMgmtAddr2'
                    },
                    {
                      fieldLabel: 'City',
                      name: 'memberMgmtCity',
                      reference: 'memberMgmtCity'
                    },
                    {
                      fieldLabel: 'State',
                      xtype: 'combo',
                      name: 'stateCombo',
                      reference: 'stateCombo'
                    },
                    {
                      xtype: 'textfield',
                      fieldLabel: 'Zip',
                      name: 'memberMgmtzip',
                      reference: 'memberMgmtzip',
                      minLength: 5,
                      maxLength: 10
                    },
                    {
                      fieldLabel: 'Phone',
                      name: 'memberMgmtPhone',
                      reference: 'memberMgmtPhone'
                    }, {
                      fieldLabel: 'Type of Action',
                      xtype: 'combo',
                      reference: 'TOACombo',
                      displayField: 'key',
                      valueField: 'value',
                      queryMode: 'local'
                    }
                  ]
                },
                {
                  xtype: 'fieldset',
                  title: 'Requested By',
                  height: 291,
                  items: [
                    {
                      fieldLabel: 'Name',
                      xtype: 'textfield',
                      reference: 'memberMgmtUserName',
                      allowblank: false
                    },
                    {
                      fieldLabel: 'Phone',
                      xtype: 'textfield',
                      reference: 'memberMgmtPhoneNum',
                      allowblank: false
                    }
                  ]
                }]
            },
            {
              xtype: 'fieldset',
              title: 'Please Explain Reason for Notification',
              items: [
                {
                  xtype: 'textarea',
                  name: 'memberMgmtReason',
                  reference: 'memberMgmtReason',
                  width: 626
                }
              ]
            }]

        }, {
          title: 'Case Management',
          xtype: 'container',

          items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
              xtype: 'fieldset',
              title: 'Case Requirement',
              height: 121,

              items: [{
                fieldLabel: 'Referral Reason',
                xtype: 'combo',
                name: 'referralCombo',
                reference: 'referralCombo',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local'
              }]
            }, {
              xtype: 'fieldset',
              title: 'Requested By',
              items: [
                {
                  fieldLabel: 'Name',
                  xtype: 'textfield',
                  reference: 'caseMgmtUserName',
                  allowblank: false
                },
                {
                  fieldLabel: 'Phone',
                  xtype: 'textfield',
                  reference: 'caseMgmtPhone',
                  allowblank: false
                }]
            }]

          }, {
            xtype: 'fieldset',
            title: 'Please Explain Reason for Referral',
            items: [{
              xtype: 'textarea',
              name: 'caseMgmtReason',
              reference: 'caseMgmtReason',
              width: 626
            }]
          }]

        },
        {
          title: 'Behavioral Health',
          xtype: 'container',

          items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
              xtype: 'fieldset',
              title: 'Behavioral Health Requirement',
              height: 121,
              
              items: [{
                fieldLabel: 'Type of Action',
                xtype: 'combo',
                reference: 'TOABehavioralCombo',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local'
              }]
            }, {
              xtype: 'fieldset',
              title: 'Requested By',
              items: [
                {
                  fieldLabel: 'Name',
                  xtype: 'textfield',
                  reference: 'behavioralUserName',
                  allowblank: false
                },
                {
                  fieldLabel: 'Phone',
                  xtype: 'textfield',
                  reference: 'behavioralPhone',
                  allowblank: false
                }]
            }]
          }, {
            xtype: 'fieldset',
            title: 'Please Explain Reason for Referral',
            items: [{
              xtype: 'textarea',
              reference: 'behavioralMgmtReason',
              width: 626
            }]
          }]
        }, {
          title: 'Compliance',
          xtype: 'container',

          items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
              xtype: 'fieldset',
              title: 'Compliance Requirement',
              height: 121,

              items: [{
                fieldLabel: 'Type of Action',
                xtype: 'combo',
                reference: 'TOAComplianceCombo',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local'
              }]
            }, {
              xtype: 'fieldset',
              title: 'Requested By',
              items: [
                {
                  fieldLabel: 'Name',
                  xtype: 'textfield',
                  reference: 'complianceUserName',
                  allowblank: false
                },
                {
                  fieldLabel: 'Phone',
                  xtype: 'textfield',
                  reference: 'compliancePhone',
                  allowblank: false
                }]
            }]

          }, {
            xtype: 'fieldset',
            title: 'Please Explain Reason for Referral',
            items: [{
              xtype: 'textarea',
              reference: 'complianceReason',
              width: 626
            }]
          }]
        }, {
          title: 'Report MCIR ID #',
          reference: 'mcirTabRef',
          xtype: 'panel',

          items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
              xtype: 'fieldset',
              title: 'MCIR Information',
              height: 121,

              items: [{
                fieldLabel: 'MCIR ID Number',
                xtype: 'numberfield',
                reference: 'mcirIdNumber',
                allowblank: false,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false
              }]
            }, {
              xtype: 'fieldset',
              title: 'Requested By',
              items: [
                {
                  fieldLabel: 'Name',
                  xtype: 'textfield',
                  reference: 'mcirUserName',
                  allowblank: false
                },
                {
                  fieldLabel: 'Phone',
                  xtype: 'textfield',
                  reference: 'mcirPhone',
                  allowblank: false
                }]
            }]
          }, {
            xtype: 'fieldset',
            title: 'Please Explain Reason for Notification',
            items: [{
              xtype: 'textarea',
              reference: 'mcirReason',
              width: 626
            }]
          }]
        }],
      listeners: {
        tabchange: 'removeErrorMsg'
      }
    }, {
      xtype: 'container',
      defaults: {
        style: {
          padding: '5px'
        }
      },
      items: [{
        xtype: 'displayfield',
        reference: 'errorMsgRef'
      }]
    }],
  listeners: {
    beforerender: 'loadMemberData'
  }
});
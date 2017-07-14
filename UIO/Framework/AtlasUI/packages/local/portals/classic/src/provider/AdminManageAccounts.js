Ext.define('Atlas.portals.view.provider.AdminManageAccounts', {
  extend: 'Ext.panel.Panel',
  xtype: 'provider-adminmanageaccounts',
  title: 'Manage Accounts',
  controller: 'adminmanageaccounts',
  layout: 'hbox',
  requires: [
    'widget.hiddenfield'
  ],
  viewModel: {
    stores: {
      userList: {
        model: 'Atlas.portals.provider.model.UserList'
      },
      states: {
        type: 'provider-state',
        autoLoad: true
      }
    },
    record: {},
    isReadOnly: true,
    userCount: 0,
    numberOfUsers: 0
  },

  scrollable: true,

  items: [{
    xtype: 'panel',
    cls: 'card-panel',
    title: 'Provider Group User Details',
    width: 1200,

    items: [
      {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
          flex: 1
        },
        items: [
          {
            xtype: 'fieldset',
            title: 'New User Request',
            layout: 'vbox',
            items: [
              {
                xtype: 'toolbar',
                items: [
                  {
                    xtype: 'numberfield',
                    fieldLabel: 'Number of user(s)',
                    reference: 'numberOfUsers',
                    allowDecimals: false,
                    hideTrigger: true,
                    mouseWheelEnabled: false,
                    publishes: 'value',
                    minValue: 0,
                    allowExponential: false
                  },
                  {
                    xtype: 'button',
                    text: 'Create Additional Users',
                    listeners: {
                      click: 'createAdditionalUsers'
                    },
                    bind: {
                      disabled: '{!numberOfUsers.value}'
                    }
                  }
                ]
              },
              {
                xtype: 'container',
                flex: 1,
                bind: {
                  html: '{createUsersMessage}'
                }
              }
            ]
          },
          {
            xtype: 'fieldset',
            title: 'Existing User Account',
            layout: 'hbox',
            flex: 1,
            items: [
              {
                xtype: 'container',
                flex: 1,
                bind: {
                  html: 'Currently there are {userCount} user(s) in this group. The user(s) range from: <br> ' +
                  '{userNames}'
                }
              }
            ]
          }
        ]
      },
      {
        xtype: 'fieldset',
        title: 'Never Used/Active/Terminated User(s)',
        layout: 'hbox',
        flex: 1,
        items: [
          {
            xtype: 'container',
            flex: 1,
            bind: {
              html: '{unusedActiveTerminatedUsers}'
            }
          }
        ]
      },
      {
        xtype: 'form',
        cls: 'formPanel',
        layout: 'hbox',
        reference: 'userDetailsForm',

        defaults: {
          flex: 1
        },

        items: [
          {
            xtype: 'fieldset',
            title: 'User Information',
            defaults: {
              xtype: 'textfield',
              padding: '5 0 5 0',
              labelWidth: 125,
              flex: 1
            },
            items: [
              {
                fieldLabel: 'Username',
                name: 'UserName',
                reference: 'userName',
                allowBlank: false,
                listeners: {
                  blur: 'getUser',
                  focus: 'onUserNameFocus'
                },
                bind: {
                  value: '{record.UserName}'
                },
                publishes: 'value'
              },
              {
                xtype: 'checkbox',
                fieldLabel: 'Terminate',
                padding: '5 0 10 0',
                name: 'Terminate',
                reference: 'chkTerminate',
                bind: {
                  disabled: '{isReadOnly}',
                  value: '{record.Terminate}'
                },
                listeners: {
                  change: 'onTerminateChange'
                }
              },
              {
                xtype: 'hiddenfield',
                fieldLabel: 'Active',
                name: 'Activate',
                reference: 'chkActivate',
                bind: {
                  value: '{record.Activate}'
                }
              },
              {
                fieldLabel: 'First Name',
                allowBlank: false,  // Causing an Alignment Issue So Remove it
                name: 'FirstName',
                reference: 'firstname',
                bind: {
                  value: '{record.FirstName}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                fieldLabel: 'Last Name',
                allowBlank: false,
                name: 'LastName',
                bind: {
                  value: '{record.LastName}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                fieldLabel: 'Address 1',
                name: 'Address1',
                reference: 'address1',
                bind: {
                  value: '{record.Address1}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                fieldLabel: 'Address 2',
                name: 'Address2',
                reference: 'address2',
                bind: {
                  value: '{record.Address2}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                fieldLabel: 'City',
                name: 'City',
                reference: 'city',
                bind: {
                  value: '{record.City}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                xtype: 'combobox',
                fieldLabel: 'State',
                name: 'State',
                reference: 'stateCombo',
                displayField: 'abbr',
                valueField: 'abbr',
                bind: {
                  value: '{record.State}',
                  disabled: '{isReadOnly}',
                  store: '{states}'
                },
                minChars: 0,
                queryMode: 'local',
                typeAhead: true

              },
              {
                fieldLabel: 'Zip',
                name: 'Zip',
                reference: 'zip',
                bind: {
                  value: '{record.Zip}',
                  disabled: '{isReadOnly}'
                }
              }
            ]
          },
          {
            xtype: 'fieldset',
            title: 'Contact Information',
            defaults: {
              xtype: 'numberfield',
              allowDecimals: false,
              hideTrigger: true,
              mouseWheelEnabled: false,
              allowExponential: false,
              minValue: 0,
              padding: '5 0 5 0',
              labelWidth: 125,
              flex: 1
            },
            items: [
              {
                fieldLabel: 'Extension',
                name: 'Ext',
                reference: 'extension',
                bind: {
                  value: '{record.Ext}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Home',
                name: 'HomePhone',
                reference: 'homePhone',
                bind: {
                  value: '{record.HomePhone}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Direct',
                allowBlank: false,
                name: 'Phone',
                reference: 'directPhone',
                bind: {
                  value: '{record.Phone}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Cell',
                name: 'Cell',
                reference: 'cellPhone',
                bind: {
                  value: '{record.Cell}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Fax',
                name: 'Fax',
                reference: 'fax',
                bind: {
                  value: '{record.Fax}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                xtype: 'textfield',
                fieldLabel: 'Email',
                name: 'Email',
                reference: 'email',
                bind: {
                  value: '{record.Email}',
                  disabled: '{isReadOnly}'
                }
              },
              {
                xtype: 'hiddenfield',
                name: 'Theme',
                reference: 'theme',
                bind: {
                  value: '{record.Theme}'
                }
              }
            ]
          }
        ]
      }],
    bbar: ['->',
      {
        text: 'Export Users Info',
        handler: 'exportUsers'
      },
      {
        text: 'Bulk Password Reset',
        handler: 'bulkPasswordReset'
      },
      {
        text: 'Reset Password, Secret Q/A',
        handler: 'resetPasswordAndQuestions',
        bind: {
          disabled: '{!userName.value}'
        }
      },
      {
        text: 'Update User',
        handler: 'updateUser',
        bind: {
          disabled: '{!userName.value}'
        }
      },
      {
        text: 'IDs Never Used',
        handler: 'idsNeverUsed'
      },
      {
        text: 'Active Users',
        handler: 'activeUsers'
      },
      {
        text: 'Terminated Users',
        handler: 'terminatedUsers'
      },
      {
        text: 'Clear',
        handler: 'clearFields'
      }, '->'
    ]
  },
  {
    xtype: 'window',
    reference: 'bulkPasswordResetDialog',
    title: 'Reset Password',
    bbar: [
      {
        xtype: 'button',
        text: 'Reset Password',
        listeners: {
          click: 'onBulkPasswordReset'
        }
      },
      {
        xtype: 'button',
        text: 'Close',
        listeners: {
          click: 'onBulkCancel'
        }
      }
    ],
    modal: true,
    padding: 10,
    items: [
      {
        xtype: 'label',
        text: 'Please enter username range (example 013-028) to reset password for a bulk of users'
      },
      {
        xtype: 'fieldcontainer',
        layout: 'hbox',
        bind: {
          fieldLabel: '{bulkReset.userName}'
        },
        defaults: {
          xtype: 'numberfield',
          allowDecimals: false,
          minValue: 0,
          allowExponential: false,
          hideTrigger: true,
          mouseWheelEnabled: false
        },
        items: [
          {
            reference: 'firstId',
            bind: {
              minValue: '{bulkReset.firstId}',
              maxValue: '{bulkReset.lastId}',
              value: '{bulkReset.firstId}'
            }
          },
          {
            xtype: 'label',
            text: '-'
          },
          {
            reference: 'lastId',
            bind: {
              minValue: '{bulkReset.firstId}',
              maxValue: '{bulkReset.lastId}',
              value: '{bulkReset.lastId}'
            }
          }
        ]
      },
      {
        xtype: 'label',
        bind: {
          text: '{bulkMessage}'
        }
      }
    ]
  }]
});

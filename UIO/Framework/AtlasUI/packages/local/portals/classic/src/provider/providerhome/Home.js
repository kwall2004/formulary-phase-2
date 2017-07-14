// k3279 - Kevin Tabasan - 11/20/2016

Ext.define('Atlas.portals.view.provider.providerhome.Home', {
  extend: 'Ext.panel.Panel',
  xtype: 'provider-home',
  controller: 'providerhome',
  viewModel: 'providerhomeviewmodel',
  title: 'Home',
  layout: 'hbox',
  scrollable: true,

  defaults: {
    flex: 1
  },

  items: [{
    xtype: 'panel',
    title: 'Eligibility Inquiry',
    cls: 'card-panel',

    items: [{
      xtype: 'container',
      reference: 'ilInquiryText',
      padding: '0 0 0 10',
      html: '<br><b>PCP - Please click the "Provider" menu on the left and select the "Enrollment" tab to view the' +
      'enrollment list of the selected provider.<br><br> Sepcialist - Please click "Member" menu on the left and' +
      'enter the member\'s ID number to view the member status.<br><br> You may also utilize the Illinois HFS MEDI' +
      'system at the following website:</b><br>' +
      '<a href="https://www.illinois.gov/hfs/MedicalProviders/EDI/medi/Pages/default.aspx" target="_blank">' +
      'https://www.illinois.gov/hfs/MedicalProviders/EDI/medi/Pages/default.aspx</a><br><br> Providers may also' +
      ' contact Meridian Health Plan at 1-866-606-3700 to verify a Member\'s eligibility or for further support'
    }, {
      xtype: 'fieldset',
      title: 'Provider (For CSHCS Inquiries)',
      reference: 'miProviderFieldSet',

      items: [{
        xtype: 'radiogroup',
        layout: 'hbox',

        defaults: {
          flex: 1
        },

        items: [{
          boxLabel: 'Provider',
          name: 'providerType',
          reference: 'providerRadio',
          checked: true,
          listeners: {
            change: 'onTopRadioGroupClick'
          }
        }, {
          boxLabel: 'CSHCS Inquiries',
          name: 'providerType'
        }]
      }, {
        xtype: 'form',
        cls: 'formPanel',
        reference: 'npiForm',
        hidden: true,

        items: [{
          xtype: 'textfield',
          fieldLabel: 'NPI or Medicaid ID',
          reference: 'npiField',
          allowBlank: false
        }]
      }]
    }, {
      xtype: 'fieldset',
      bind: {
        title: 'Inquiry by {inquiryName}'
      },

      items: [{
        xtype: 'radiogroup',
        reference: 'miInquiryRadioGroupTop',
        layout: 'hbox',

        defaults: {
          flex: 1
        },

        items: [{
          boxLabel: 'Member ID',
          reference: 'memberIDRadio',
          name: 'memberType',
          checked: true,
          listeners: {
            change: 'onMiddleRadioGroupClick'
          }
        }, {
          boxLabel: 'Name',
          name: 'memberType'
        }]
      }, {
        xtype: 'form',
        cls: 'formPanel',
        reference: 'memberField',

        items: [{
          xtype: 'textfield',
          name: 'memberID',
          reference: 'memberIdRef',
          fieldLabel: 'Member ID',
          allowBlank: false,
          labelWidth: 168,
          listeners: {
            blur: 'onMemberIDBlur'
          }
        }, {
          xtype: 'combobox',
          name: 'memberPlan',
          reference: 'miMemberPlanCombo',
          editable: false,
          selectOnFocus: false,
          disabled: true,
          displayField: 'key',
          queryMode: 'local',
          valueField: 'value',
          fieldLabel: 'Select Member\'s Plan'
        }]
      }, {
        xtype: 'form',
        cls: 'formPanel',
        reference: 'nameField',
        hidden: true,

        defaults: {
          xtype: 'textfield',
          labelWidth: 134
        },

        items: [{
          name: 'lastName',
          fieldLabel: 'Last Name',
          allowBlank: false
        }, {
          name: 'firstName',
          fieldLabel: 'First Name',
          allowBlank: false
        }, {
          xtype: 'datefield',
          name: 'dob',
          fieldLabel: 'Birth Date',
          format: 'm/d/Y',
          invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy'
        }, {
          name: 'ssn',
          fieldLabel: 'Social Security',
          minLength: 9,
          maxLength: 9,
          enforceMaxLength: true,
          maskRe: new RegExp(/[0-9]/)
        }]
      }, {
        xtype: 'radiogroup',
        reference: 'miInquiryRadioGroupBottom',
        layout: 'hbox',

        defaults: {
          flex: 1
        },

        items: [{
          boxLabel: 'Output to Screen',
          reference: 'outputToScreen',
          name: 'outputType'
        }, {
          boxLabel: 'Output to PDF',
          reference: 'outputToPDF',
          name: 'outputType',
          checked: true
        }]
      }]
    }, {
      xtype: 'fieldset',
      title: 'Select Eligibility Period',
      reference: 'miEligibilityFieldSet',

      items: [{
        xtype: 'form',
        cls: 'formPanel',
        reference: 'eligibilityPeriodForm',

        items: [{
          xtype: 'datefield',
          reference: 'startDate',
          fieldLabel: 'Start Date',
          format: 'm/d/Y',
          invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
          value: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }, {
          xtype: 'datefield',
          reference: 'endDate',
          fieldLabel: 'End Date',
          format: 'm/d/Y',
          invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
          value: new Date()
        }]
      }]
    }, {
      xtype: 'grid',
      margin: 5,
      reference: 'batchGrid',
      forceFit: true,
      hidden: true,
      bind: '{batchList}',
      listeners: {
        rowdblclick: 'onBatchRowDoubleClick'
      },
      columns: [{
        text: 'DOB',
        dataIndex: 'dob'
      }, {
        text: 'Member ID',
        dataIndex: 'memberID'
      }, {
        text: 'Last Name',
        dataIndex: 'lastName'
      }, {
        text: 'First Name',
        dataIndex: 'firstName'
      }, {
        text: 'LOB',
        dataIndex: 'lob'
      }]
    }],

    bbar: ['->', {
      text: 'Submit',
      handler: 'onSubmitEligibilityInquiryClick'
    }, {
      text: 'Add to Batch',
      handler: 'onAddToBatchClick'
    }, {
      text: 'Clear Form',
      handler: 'onClearFormClick'
    }, {
      text: 'Clear Batch',
      handler: 'onClearBatchList'
    }]
  }, {
    xtype: 'container',

    items: [{
      xtype: 'panel',
      bind: {
        title: 'Coordination of Care Messages ({unreadMessages} Unread)'
      },
      cls: 'card-panel',

      tbar: [{
        xtype: 'textfield',
        emptyText: 'Enter Search Text',
        reference: 'cocSearchBox',
        listeners: {
          specialkey: 'onEnterMessagePress'
        }
      }, {
        text: 'Search',
        handler: 'onMessageSearchClick'
      }, '->', {
        xtype: 'combobox',
        editable: false,
        selectOnFocus: false,
        reference: 'providersCombo',
        bind: {
          store: '{reformattedProviderList}'
        },
        displayField: 'fullName',
        width: 270,
        listeners: {
          select: 'onProviderComboSelect'
        },
        value: 'All Providers Within This Group'
      }, {
        xtype: 'combobox',
        editable: false,
        selectOnFocus: false,
        store: ['All', 'Unread', 'Read', 'Sent'],
        reference: 'cocCombo',
        listeners: {
          select: 'onProviderComboSelect'
        },
        value: 'Unread'
      }],

      items: [{
        xtype: 'grid',
        margin: 5,
        reference: 'cocGrid',
        maxHeight: 389,
        bind: '{coc}',
        emptyText: 'No Messages',
        forceFit: true,
        listeners: {
          rowdblclick: 'onCOCRowDoubleClick'
        },
        columns: [{
          text: 'Subject',
          dataIndex: 'messageSubject',
          renderer: function (one, two, record) {
            if (null === record.getData().messageReadDate) {
              return '<b>' + record.getData().messageSubject + '</b>';
            }

            return record.getData().messageSubject;
          }
        }, {
          xtype: 'datecolumn',
          dataFormat: 'm/d/Y',
          text: 'Date',
          dataIndex: 'createDate'
        }]
      }],

      bbar: ['->', {
        text: 'Mark Read/Unread',
        handler: 'onMarkMessageClick'
      }, {
        text: 'Refresh',
        handler: 'onRefreshMessagesClick'
      }, {
        text: 'Reply',
        handler: 'onMessageReplyClick'
      }]
    }, {
      xtype: 'panel',
      bind: {
        title: 'Notifications ({unreadNotifications} Unread)'
      },
      cls: 'card-panel',

      tbar: [{
        xtype: 'textfield',
        reference: 'notificationSearchBox',
        emptyText: 'Enter Search Text',
        listeners: {
          specialkey: 'onEnterNotificationPress'
        }
      }, {
        xtype: 'button',
        text: 'Search',
        handler: 'onNotificationSearchClick'
      }, '->', {
        xtype: 'combobox',
        editable: false,
        selectOnFocus: false,
        store: ['All', 'Unread', 'Read'],
        reference: 'notificationCombo',
        value: 'Unread',
        listeners: {
          select: 'onNotificationComboSelect'
        }
      }],

      items: [{
        xtype: 'grid',
        margin: 5,
        maxHeight: 389,
        forceFit: true,
        reference: 'notificationGrid',
        emptyText: 'No Notifications',
        bind: '{notificationMessages}',

        columns: [{
          text: 'Subject',
          dataIndex: 'subject',
          renderer: function (one, two, record) {
            if ('false' === record.getData().read) {
              return '<b>' + record.getData().subject + '</b>';
            }

            return record.getData().subject;
          }
        }, {
          xtype: 'datecolumn',
          dataFormat: 'm/d/Y',
          text: 'Date',
          dataIndex: 'date',
          renderer: function (one, two, record) {
            var date = record.getData().date;

            if (date !== undefined) {
              return Atlas.common.utility.Utilities.formatDate(new Date(date), 'm/d/Y');
            }

            return '';
          }
        }],

        plugins: [{
          ptype: 'rowexpander',
          rowBodyTpl: ['{description}']
        }],

        viewConfig: {
          listeners: {
            collapsebody: 'onCollapseNotificationRow'
          }
        }
      }],

      bbar: ['->', {
        text: 'Mark Read/Unread',
        handler: 'onMarkNotificationClick'
      }, {
        text: 'Delete',
        handler: 'onDeleteNotificationClick'
      }, {
        text: 'Refresh',
        handler: 'onRefreshNotificationClick'
      }, {
        text: 'Print',
        handler: 'onPrintNotificationClick'
      }]
    }]
  }]
});
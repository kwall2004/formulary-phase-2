/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Request New
 * Description: Gives users a place to create New auth Request
 */
Ext.define('Atlas.portals.view.provider.CreateAuthRequest', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsProviderCreateAuthRequest',
  title: 'Create New Request',
  controller: 'portalsProviderCreateAuthRequestController',
  viewModel: 'portalsprovidercreateauthrequestviewmodel',
  scrollable: true,

  items: [
    {
      xtype: 'panel',
      cls: 'card-panel',
      title: 'Member',

      items: [{
        xtype: 'toolbar',

        items: [{
          xtype: 'textfield',
          fieldLabel: 'Member ID',
          width: 250,
          reference: 'memberIdRef',
          listeners: {blur: 'onMemberIDBlur'}
        }, {
          xtype: 'button',
          text: 'Enter',
          handler: 'onEnterClick'
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Member Name',
          labelWidth: 125,
          width: 400,
          bind: '{memberNameRef}'
        }, {
          xtype: 'button',
          text: 'Lookup',
          handler: 'onMemberLookupClick'
        },

        {
          xtype: 'displayfield',
          bind: '{dobDash}',
          fieldLabel: 'DOB',
          labelWidth: 35,
          renderer: function (value) {
            return Ext.util.Format.date(value, 'm/d/Y');
          }
        },
        {
          xtype: 'displayfield',
          bind: '{alertsDash}',
          style: '',
          fieldLabel: 'Alerts',
          labelAlign: 'right',
          labelStyle: '',
          labelWidth: 35,
          fieldStyle: 'color:red;font-weight:bold;'
        },
        {
          xtype: 'button',
          text: 'Visit Count',
          handler: 'onVisitCountClick'
        }]
      }, {
        xtype: 'toolbar',

        items: [{
          xtype: 'combo',
          reference: 'portalPlanSelectDlg',
          fieldLabel: 'Select Member\'s Plan',
          editable: false,
          selectOnFocus: false,
          disabled: true,
          displayField: 'name',
          queryMode: 'local',
          valueField: 'id',
          listeners: {select: 'onSelectPortalPlan'},
          bind: {store: '{ProvPortalPlanLOBStore}'}
        }]
      }, {
        xtype: 'fieldset',
        collapsible: true,
        title: 'Auth Summary Detail',
        layout: 'hbox',

        items: [
          {
            xtype: 'container',
            flex: 1,

            defaults: {
              xtype: 'displayfield',
              labelWidth: 130
            },

            items: [
              {
                bind: '{memberIDDash}',
                fieldLabel: 'Member ID'
              },
              {
                bind: '{memberNameRef}',
                fieldLabel: 'Member Name'
              },
              {
                bind: '{benefitPlanDash}',
                fieldLabel: 'Benefit Plan'
              },
              {
                bind: '{lobID_newAuth}',
                fieldLabel: 'LOB'
              },
              {
                xtype: 'hidden',
                bind: '{levelOfCare_newAuth}'
              },
              {
                bind: '{effDate}',
                fieldLabel: 'Eff. Date'
              },
              {
                bind: '{memberTermDate}',
                fieldLabel: 'Term Date'
              }
            ]
          },
          {
            xtype: 'container',
            flex: 1,

            defaults: {
              xtype: 'displayfield',
              labelWidth: 165
            },

            items: [
              {
                fieldLabel: 'Determination Type',
                value: 'New Request'
              },
              {
                fieldLabel: 'Start',
                bind: '{startDate_newAuth.rawValue}'
              },
              {
                fieldLabel: 'End',
                bind: '{endDate_newAuth.rawValue}'
              },
              {
                fieldLabel: 'Proc. Category',
                bind: '{procedureCategoryCombo.rawValue}'
              },
              {
                fieldLabel: 'Level of Service',
                bind: '{levelOfService_newAuth.rawValue}'
              }
            ]
          },
          {
            xtype: 'container',
            flex: 1,

            defaults: {
              xtype: 'displayfield',
              labelWidth: 155
            },

            items: [
              {
                bind: '{servProv}',
                fieldLabel: 'Servicing Provider'
              },
              {
                bind: '{servFac}',
                fieldLabel: 'Servicing Facility'
              },
              {
                bind: '{requestType_newAuth.rawValue}',
                fieldLabel: 'Request Type'
              },
              {
                bind: '{placeOfService_newAuth.rawValue}',
                fieldLabel: 'Place of Service'
              },
              {
                bind: '{reviewType_newAuth.rawValue}',
                fieldLabel: 'Review Type'
              }
            ]
          }
        ]
      }]
    },
    {
      xtype: 'panel',
      cls: 'card-panel',
      title: 'Request',

      items: [{
        xtype: 'container',
        html: '<hr class="hr-gray-thin">'
      }, {
        xtype: 'panel',
        cls: 'formPanel',
        layout: 'card',
        reference: 'newAuthCardPanel',
        padding: 8,

        items: [
          {
            xtype: 'form',
            cls: 'formPanel',
            reference: 'newAuthReferralTab',
            itemId: 'newAuthReferralTab',
            items: [
              {
                xtype: 'container',
                layout: 'hbox',

                items: [
                  {
                    xtype: 'container',

                    defaults: {
                      labelWidth: 176,
                      padding: 5
                    },

                    items: [
                      {
                        xtype: 'datefield',
                        reference: 'startDate_newAuth',
                        name: 'startDate_newAuth',
                        fieldLabel: 'Start',
                        allowBlank: false,
                        value: new Date(),
                        minValue: new Date(),
                        listeners: {
                          blur: 'onFieldBlurChange',
                          change: 'onFieldBlurChange'
                        },
                        publishes: 'rawValue',
                        format: 'm/d/Y'
                      },
                      {
                        xtype: 'datefield',
                        reference: 'endDate_newAuth',
                        name: 'endDate_newAuth',
                        fieldLabel: 'End',
                        allowBlank: false,
                        minValue: new Date(),
                        listeners: {
                          blur: 'onFieldBlurChange',
                          change: 'onFieldBlurChange'
                        },
                        publishes: 'rawValue',
                        format: 'm/d/Y'
                      },
                      {
                        xtype: 'combo',
                        name: 'levelOfService_newAuth',
                        reference: 'levelOfService_newAuth',
                        publishes: 'rawValue',
                        fieldLabel: 'Level of Service',
                        width: 426,
                        allowBlank: false,
                        editable: false,
                        selectOnFocus: false,
                        displayField: 'name',
                        queryMode: 'local',
                        valueField: 'id',
                        listeners: {
                          blur: 'onFieldBlurChange',
                          change: 'onFieldBlurChange',
                          select: 'onLevelOfServiceSelect'
                        },
                        bind: {store: '{ODAGLevelOfServiceStore}'}
                      },
                      {
                        xtype: 'combo',
                        name: 'procedureCategoryCombo',
                        reference: 'procedureCategoryCombo',
                        fieldLabel: 'Procedure Category',
                        width: 426,
                        disabled: true,
                        allowBlank: false,
                        editable: false,
                        selectOnFocus: false,
                        displayField: 'procedureCategory',
                        queryMode: 'local',
                        valueField: 'procedureCategoryID',
                        listeners: {
                          blur: 'onFieldBlurChange',
                          change: 'onFieldBlurChange',
                          select: 'onProcCategorySelect'
                        },
                        bind: {disabled: '{!levelOfService_newAuth.rawValue}'},
                        publishes: 'rawValue'
                      },
                      {
                        xtype: 'combo',
                        name: 'requestingProvider',
                        reference: 'requestingProvider',
                        fieldLabel: 'Requesting Provider',
                        width: 426,
                        allowBlank: false,
                        editable: false,
                        selectOnFocus: false,
                        displayField: 'displayNameLastFirst',
                        queryMode: 'local',
                        valueField: 'provID',
                        listeners: {
                          blur: 'onFieldBlurChange',
                          change: 'onFieldBlurChange',
                          select: 'onRequestingProviderSelect'
                        },
                        bind: {store: '{providerListStore}'}
                      },
                      {
                        xtype: 'container',
                        layout: 'hbox',

                        defaults: {
                          xtype: 'hiddenfield',
                          labelWidth: 176
                        },

                        items: [
                          {
                            name: 'servProvId',
                            bind: {value: '{servProvId}'}
                          },
                          {
                            xtype: 'textfield',
                            fieldLabel: 'Servicing Provider',
                            allowBlank: false,
                            blankText: 'You must enter either a servicing provider or a servicing facility',
                            name: 'servicingProvRefe',
                            reference: 'servicingProvRefe',
                            readOnly: true,
                            bind: {value: '{servProv}'}
                          },
                          {
                            xtype: 'button',
                            text: 'Lookup',
                            reference: 'provLookupBtn',
                            handler: 'onProviderLookupClick',
                            margin: 4
                          },
                                              {name: 'oonServProv_ProvName'},
                                              {name: 'oonServProv_ProvNPI'},
                                              {name: 'oonServProv_PracName'},
                                              {name: 'oonServProv_PracAddr1'},
                                              {name: 'oonServProv_PracAddr2'},
                                              {name: 'oonServProv_PracCity'},
                                              {name: 'oonServProv_PracState'},
                                              {name: 'oonServProv_PracZip'},
                                              {name: 'oonServProv_PracPhone'},
                                              {name: 'oonServProv_PracFax'},
                          {
                            xtype: 'button',
                            text: 'OON',
                            tooltip: 'Click here for out of network service providers',
                            handler: 'onOONProviderClick',
                            margin: 4
                          }
                        ]
                      },
                      {
                        xtype: 'displayfield',
                        labelWidth: 186,
                        fieldLabel: 'OON Reason',
                        name: 'oonServProv_Reason',
                        submitValue: true
                      },
                      {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '13 0 0 0',
                        
                        defaults: {
                          xtype: 'hiddenfield',
                          labelWidth: 176
                        },

                        items: [
                          {
                            name: 'servFacId',
                            bind: {value: '{servFacId}'}
                          },
                          {
                            xtype: 'textfield',
                            fieldLabel: 'Servicing Facility',
                            allowBlank: false,
                            blankText: 'You must enter either a servicing provider or a servicing facility',
                            name: 'servicingFacility',
                            reference: 'servicingFacRef',
                            listeners: {
                              blur: 'onFieldBlurChange',
                              change: 'onFieldBlurChange'
                            },
                            readOnly: true,
                            bind: {value: '{servFac}'}
                          },
                          {
                            xtype: 'button',
                            text: 'Lookup',
                            reference: 'facLookupBtn',
                            handler: 'onFacilityLookupClick',
                            margin: 4
                          },
                          {
                            xtype: 'button',
                            text: 'OON',
                            tooltip: 'Click here for out of network service facility providers',
                            handler: 'onOONFacilityClick',
                            margin: 4
                          },
                                              {name: 'oonServFac_ProvName'},
                                              {name: 'oonServFac_ProvNPI'},
                                              {name: 'oonServFac_PracName'},
                                              {name: 'oonServFac_PracAddr1'},
                                              {name: 'oonServFac_PracAddr2'},
                                              {name: 'oonServFac_PracCity'},
                                              {name: 'oonServFac_PracState'},
                                              {name: 'oonServFac_PracZip'},
                                              {name: 'oonServFac_PracPhone'},
                                              {name: 'oonServFac_PracFax'}
                        ]
                      },
                      {
                        xtype: 'displayfield',
                        labelWidth: 186,
                        fieldLabel: 'OON Reason',
                        reference: 'oonServFac_Reason',
                        name: 'oonServFac_Reason',
                        submitValue: true
                      },
                                        {
                    xtype: 'textareafield',
                    bind: '{longDescr}',
                    width: 450,
                    margin: '13 0 0 -3',
                    fieldLabel: 'Description of Procedure Category',
                    labelAlign: 'top',
                    readOnly: true
                  }
                    ]
                  },
                  {
                    xtype: 'container',

                    defaults: {
                      labelWidth: 192,
                      width: 400,
                      padding: 5
                    },

                    items: [
                      {
                        xtype: 'datefield',
                        name: 'admitDate_newAuth',
                        reference: 'admitDate_newAuth',
                        fieldLabel: 'Admit',
                        bind: {disabled: '{levelOfService_newAuth.rawValue != "Inpatient"}'},
                        format: 'm/d/Y'
                      },
                      {
                        xtype: 'datefield',
                        name: 'dischargeDate_newAuth',
                        reference: 'dischargeDate_newAuth',
                        fieldLabel: 'Discharge',
                        bind: {disabled: '{levelOfService_newAuth.rawValue != "Inpatient"}'},
                        format: 'm/d/Y'
                      },
                      {
                        xtype: 'combo',
                        disabled: true,
                        name: 'requestType_newAuth',
                        reference: 'requestType_newAuth',
                        fieldLabel: 'Request Type',
                        invalidText: '',
                        allowBlank: false,
                        displayField: 'name',
                        queryMode: 'local',
                        valueField: 'id',
                        value: '01',
                        listeners: {
                          blur: 'onFieldBlurChange',
                          change: 'onFieldBlurChange'
                        },
                        bind: {store: '{requestTypeStore}'},
                        publishes: 'rawValue'
                      },
                      {
                        xtype: 'combo',
                        name: 'placeOfService_newAuth',
                        reference: 'placeOfService_newAuth',
                        fieldLabel: 'Place of Service',
                        allowBlank: false,
                        editable: false,
                        selectOnFocus: false,
                        displayField: 'name',
                        queryMode: 'local',
                        valueField: 'id',
                        listeners: {
                          blur: 'onFieldBlurChange',
                          change: 'onFieldBlurChange'
                        },
                        bind: {store: '{placeOfServiceStore}'},
                        publishes: 'rawValue'
                      },
                      {
                        xtype: 'combobox',
                        disabled: true,
                        name: 'reviewType_newAuth',
                        reference: 'reviewType_newAuth',
                        fieldLabel: 'Review Type',
                        allowBlank: false,
                        displayField: 'name',
                        queryMode: 'local',
                        valueField: 'id',
                        value: 'PN',
                        listeners: {
                          blur: 'onFieldBlurChange',
                          change: 'onFieldBlurChange'
                        },
                        bind: {store: '{AuthPriorityWebStore}'},
                        publishes: 'rawValue'
                      },
                      {
                        xtype: 'textareafield',
                        name: 'reviewTypeDesc',
                        reference: 'reviewTypeDesc',
                        fieldLabel: 'Review Type Description',
                        width: 650,
                        labelWidth: 192,
                        readOnly: true
                      },
                      {
                        xtype: 'container',
                        padding: 0,

                        defaults: {
                          padding: 2
                        },

                        items: [
                          {
                            xtype: 'container',
                            layout: 'hbox',
                            
                            items: [
                              {
                                xtype: 'checkboxfield',
                                boxLabel: 'Accident Related',
                                name: 'accidentRelatedFlag',
                                reference: 'accidentRelatedFlag',
                                publishes: 'checked'
                              },
                              {
                                xtype: 'textfield',
                                disabled: true,
                                name: 'accidentInformation',
                                reference: 'accidentInformation',
                                labelWidth: 30,
                                hideEmptyLabel: false,
                                labelSeparator: '',
                                bind: {disabled: '{!accidentRelatedFlag.checked}'}
                              }
                            ]
                          },
                          {
                            xtype: 'container',
                            layout: 'hbox',

                            items: [
                              {
                                xtype: 'checkboxfield',
                                boxLabel: 'Other Primary Payor',
                                name: 'otherPrimaryPayor',
                                reference: 'otherPrimaryPayor',
                                publishes: 'checked'
                              },
                              {
                                xtype: 'textfield',
                                disabled: true,
                                reference: 'otherPrimaryPayorInformation',
                                labelWidth: 10,
                                labelSeparator: '',
                                hideEmptyLabel: false,
                                bind: {disabled: '{!otherPrimaryPayor.checked}'},
                                readOnly: false
                              }
                            ]
                          },
                                            {
                    xtype: 'textareafield',
                    bind: '{requiredDocs}',
                    width: 450,
                    margin: '7 -1 0 0 ',
                    fieldLabel: 'Required Documentation',
                    labelAlign: 'top',
                    readOnly: true
                  }
                        ]
                      }
                    ]
                  },
                  {
                    xtype: 'container',
                    layout: 'hbox',

                    items: [
                      {
                        xtype: 'container',

                        items: []

                      }
                    ]
                  }
                ]
              }
            ],
            listeners: {activate: 'onNewAuthReferralTabActivate'}
          },
          {
            xtype: 'container',
            reference: 'newAuthServiceTab',
            itemId: 'newAuthServiceTab',
            title: 'Service',
            layout: 'hbox',

            items: [{
              xtype: 'grid',
              margin: 10,
              height: 400,
              forceFit: true,
              flex: 1,
              reference: 'newAuthServiceProcedureGrid',
              title: 'Procedures',
              bind: {store: '{authProcedureStore}'},
              columns: [
                {
                  dataIndex: 'cpt',
                  text: 'CPT',
                  editor: {
                    xtype: 'textfield',
                    itemId: 'procCode_newAuth',
                    reference: 'procCode_newAuth',
                    listeners: {blur: 'onProcfieldBlur'}
                  }
                },
                {
                  dataIndex: 'description',
                  text: 'Description',
                  editor: {
                    xtype: 'textfield',
                    reference: 'procDesc_newAuth',
                    readOnly: true
                  }
                },
                {
                  dataIndex: 'units',
                  text: 'Units',
                  editor: {
                    xtype: 'numberfield',
                    reference: 'units_newAuth',
                    minValue: 0,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    maxLength: 5,
                    enforceMaxLength: true
                  }
                },
                {
                  dataIndex: 'measure',
                  text: 'Measure',
                  editor: {
                    xtype: 'combobox',
                    reference: 'measure_newAuth',
                    editable: false,
                    selectOnFocus: false,
                    displayField: 'name',
                    queryMode: 'local',
                    valueField: 'id',
                    bind: {store: '{measureStore}'}
                  }
                }
              ],
              plugins: [
                {
                  ptype: 'rowediting',
                  pluginId: 'rowEditingProcedure',
                  listeners: {
                    validateedit: 'onProcRowValidateedit',
                    canceledit: 'onProcRowCanceledit',
                    edit: 'onProcRowEdit'
                  }
                }
              ],
              dockedItems: [
                {
                  xtype: 'toolbar',
                  dock: 'top',
                  items: [
                    {
                      xtype: 'button',
                      text: 'Add Procedure',
                      handler: 'onButtonClick'
                    }
                  ]
                }
              ],
              listeners: {select: 'onNewAuthServiceProcedureGridSelect'}
            },
            {
              xtype: 'grid',
              margin: 10,
              height: 400,
              flex: 1,
              disabled: true,
              reference: 'newAuthServiceDiagGrid',
              title: 'Diagnosis',
              bind: {store: '{authDiagnosisStore}'},
              columns: [
                {
                  width: 100,
                  dataIndex: 'diagCode',
                  text: 'Diag Code',
                  editor: {
                    xtype: 'textfield',
                    reference: 'newAuthServiceDiagCode',
                    listeners: {blur: 'onDiagfieldBlur'}
                  }
                },
                {
                  xtype: 'gridcolumn',
                  flex: 1,
                  dataIndex: 'description',
                  text: 'Description',
                  editor: {
                    xtype: 'textfield',
                    reference: 'newAuthServiceDiagDesc',
                    readOnly: true
                  }
                },
                {
                  xtype: 'gridcolumn',
                  hidden: true,
                  reference: 'newAuthServiceCPT',
                  dataIndex: 'cpt',
                  text: 'CPT'
                }
              ],
              plugins: [
                {
                  ptype: 'rowediting',
                  pluginId: 'rowEditing',
                  listeners: {
                    validateedit: 'onDiagRowValidateedit',
                    canceledit: 'onDiagRowCanceledit',
                    edit: 'onDiagRowEdit'
                  }
                }
              ],
              dockedItems: [
                {
                  xtype: 'toolbar',
                  dock: 'top',
                  items: [
                    {
                      xtype: 'button',
                      text: 'Add Diagnosis',
                      handler: 'onDiagnosisButtonClick'
                    }
                  ]
                }
              ]
            }],
            listeners: {activate: 'onNewAuthServiceTabActivate'}
          },
          {
            xtype: 'container',
            reference: 'newAuthContactNotesTab',
            itemId: 'newAuthContactNotesTab',
            title: 'Contact Notes',

            defaults: {
              padding: 3,
              labelWidth: 103,
              width: 557
            },

            items: [
              {
                xtype: 'combo',
                disabled: true,
                reference: 'subjectCombo',
                fieldLabel: 'Subject',
                allowBlank: false,
                displayField: 'name',
                queryMode: 'local',
                valueField: 'name',
                value: 'Submission',
                bind: {store: '{subjectStore}'}
              },
              {
                xtype: 'combo',
                reference: 'contactCombo',
                fieldLabel: 'Contact',
                allowBlank: false,
                editable: false,
                selectOnFocus: false,
                displayField: 'name',
                queryMode: 'local',
                valueField: 'name',
                bind: {store: '{contactStore}'},
                listeners: {
                  blur: 'onFieldBlurChange',
                  change: 'onFieldBlurChange'
                }
              },
              {
                xtype: 'textfield',
                reference: 'noteName_newAuth',
                fieldLabel: 'Name',
                readOnly: false,
                allowBlank: false,
                minLength: 3,
                listeners: {
                  blur: 'onFieldBlurChange',
                  change: 'onFieldBlurChange'
                }
              },
              {
                xtype: 'container',
                layout: 'hbox',
                width: 565,

                items: [{
                  xtype: 'textfield',
                  reference: 'notePhone_newAuth',
                  fieldLabel: 'Phone',
                                //regex: '^\d{10}$',
                  labelWidth: 103,
                  readOnly: false,
                  allowBlank: false,
                  minLength: 10,
                  listeners: {
                    blur: 'onFieldBlurChange',
                    change: 'onFieldBlurChange'
                  }
                },
                {
                  xtype: 'textfield',
                  reference: 'noteExtension_newAuth',
                  fieldLabel: 'Extension',
                  readOnly: false,
                  listeners: {
                    blur: 'onFieldBlurChange',
                    change: 'onFieldBlurChange'
                  }
                }]
              },
              {
                xtype: 'textareafield',
                width: 557,
                reference: 'noteNote_newAuth',
                fieldLabel: 'Notes',
                allowBlank: false,
                minLength: 2,
                maxLength: 500,
                enforceMaxLength: true,
                emptyText: 'You can enter a min of 2 and max of 500 number of characters',
                listeners: {
                  blur: 'onFieldBlurChange',
                  change: 'onFieldBlurChange'
                }
              }
            ],
            listeners: {activate: 'onNewAuthContactNotesTabActivate'}
          }
        ]
      }, {
        xtype: 'toolbar',
        items: [ '->', {
          xtype: 'container',
          html: '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=bvqgL+uLCD0p9XET4fuHE+P1SebN7M26UOQb3zFYSlDGtqb1zmVwhDQb8bKVo9J4R/K0yqcBMd0vQ/CVjPkUqQ==" target="_blank">Authorization Procedure Overview</a>'
        }]
      }],

      tbar: [{
        text: '1',
        margin: 10,
        reference: 'refButton',
        cls: 'circular-border',
        handler: 'onStepperButtonClick'
      }, {
        xtype: 'label',
        reference: 'refLabel',
        html: '<span class="x-form-item-label-default">Referral</span>'
      }, {
        xtype: 'container',
        width: 120,
        html: '<hr class="hr-lightgray-thick">'
      }, {
        text: '2',
        margin: 10,
        disabled: true,
        reference: 'servButton',
        cls: 'circular-border',
        handler: 'onStepperButtonClick'
      }, {
        xtype: 'label',
        reference: 'servLabel',
        html: '<span class="x-form-item-label-thin">Service</span>'
      }, {
        xtype: 'container',
        width: 120,
        html: '<hr class="hr-lightgray-thick">'
      }, {
        text: '3',
        margin: 10,
        disabled: true,
        reference: 'contactButton',
        cls: 'circular-border',
        handler: 'onStepperButtonClick'
      }, {
        xtype: 'label',
        reference: 'contactLabel',
        html: '<span class="x-form-item-label-thin">Contact Notes</span>'
      }],

      bbar: [ '->', {
        xtype: 'displayfield',
        itemId: 'attachDocText',
        value: 'You may attach clinical documentation on the next screen after clicking submit.'
      },
        {
          reference: 'cancelBtn',
          text: 'Cancel',
          handler: 'onCancelClick'
        },
        {
          reference: 'prevBtn',
          text: '<i class="fa fa-chevron-left" aria-hidden="true"></i> Previous',
          disabled: true,
          handler: 'onPrevBtnClick'
        },
        {
          disabled: true,
          reference: 'nextBtn',
          text: 'Next <i class="fa fa-chevron-right" aria-hidden="true"></i>',
          handler: 'onNextBtnClick'
        },
        {
          disabled: true,
          reference: 'submitBtn',
          text: 'Submit',
          handler: 'onSubmitClick'
        }
      ]
    }
  ]
});
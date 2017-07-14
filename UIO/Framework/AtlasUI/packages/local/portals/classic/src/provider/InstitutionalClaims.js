/**
 * Created by b6636 on 11/14/2016.
 * Feat. K-Swiss (k3279)
 */

Ext.define('Atlas.portals.view.provider.InstitutionalClaims', {
  extend: 'Ext.Container',
  controller: 'portalsproviderinstitutionalclaims',
  layout: 'border',
  title: 'Institutional Claims',
  viewModel: {
    stores: {
      providers: {
        model: 'Atlas.portals.provider.model.ProviderListWeb'
      },
      memberIds: {
        model: 'Atlas.portals.provider.model.PortalMemberFuncs'
      },
      authMasterRecords: {
        model: 'Atlas.portals.provider.model.MemberOdcdMasterApi'
      },
      memberODCDs: {
        model: 'Atlas.portals.provider.model.MemberOdcdMasterApi'
      },
      surgProcCodes: {
        mode: 'Atlas.portals.provider.model.SurgProcCodeMaster'
      },
      frequencyCodes: {
        fields: [
          'key', 'value'
        ],
        data: [
          {
            key: '1',
            value: 'Original Claims'
          },
          {
            key: '7',
            value: 'Replacement Claims'
          }
        ]
      },
      claimsHeaderMaster: {
        model: 'Atlas.portals.provider.model.ClaimHeaderMasterWeb'
      },
      serviceClaims: {
        model: 'Atlas.portals.provider.model.RemitDetailWeb'
      },
      listItems: {
        model: 'Atlas.portals.provider.model.ListItems'
      },
      revCodes: {
        model: 'Atlas.portals.provider.model.RevCode'
      },
      billTypes: {
        proxy: {
          type: 'memory'
        }
      },
      admitTypes: {
        proxy: {
          type: 'memory'
        }
      },
      admitSources: {
        proxy: {
          type: 'memory'
        }
      },
      dischStatuses: {
        proxy: {
          type: 'memory'
        }
      },
      admitHours: {
        proxy: {
          type: 'memory'
        }
      },
      dischHours: {
        proxy: {
          type: 'memory'
        }
      }
    },
    data: {
      providerId: -1,
      isClaimsEditTabVisited: false,
      isLtss: false,
      recipientId: '',
      minServiceDate: '',
      memberTermDate: '',
      lobId: '',
      selectedFrequencyCode: '',
      controlNumber: '',
      billingNpi: '',
      billingTin: '',
      isEditing: false
    }
  },
  items: [
    {
      xtype: 'panel',
      cls: 'card-panel',
      region: 'north',
      reference: 'alertsPanel',
      title: 'Alerts',
      hidden: true,
      items: [{
        xtype: 'displayfield',
        reference: 'alertsDisplayField'
      }]
    },
    {
      xtype: 'form',
      cls: 'card-panel',
      region: 'center',
      title: 'Institutional Claims',
      reference: 'institutionalClaimForm',
      scrollable: true,
      layout: 'hbox',
      bbar: {
        xtype: 'toolbar',
        items: [
          {
            xtype: 'button',
            text: 'OB Visits',
            handler: 'showObVisits'
          },
          {
            xtype: 'button',
            text: 'Create New Claim',
            handler: 'createClaim'
          },
          {
            xtype: 'button',
            text: 'Submit/Resubmit Claim',
            handler: 'submitClaim'
          }
        ]
      },
      items: [{
        xtype: 'container',
        layout: 'vbox',
        items: [
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield',
              labelWidth: 145
            },
            items: [
              {
                xtype: 'combo',
                reference: 'providerCombo',
                name: 'provider',
                fieldLabel: 'Provider',
                displayField: 'displayName',
                valueField: 'provID',
                queryMode: 'local',
                width: 400,
                bind: {
                  store: '{providers}'
                },
                listeners: {
                  select: 'onProviderSelect'
                },
                editable: false,
                selectOnFocus: false,
                required: true,
                allowBlank: false,
                dataIndex: 'servProvId'
              },
              {
                xtype: 'textfield',
                reference: 'providerSpecialty',
                name: 'providerSpecialty',
                fieldLabel: 'Primary Specialty',
                readOnly: true
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield',
              labelWidth: 145
            },
            items: [
              {
                fieldLabel: 'Member ID',
                reference: 'memberId',
                name: 'memberId',
                dataIndex: 'dispMemberID',
                listeners: {
                  blur: 'onMemberIdBlur'
                },
                allowBlank: false
              },
              {
                reference: 'memberName',
                width: 400,
                name: 'memberName',
                readOnly: true
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield',
              labelWidth: 145
            },
            items: [
              {
                xtype: 'combo',
                fieldLabel: 'Select Member\'s <br> Plan',
                reference: 'memberPlan',
                name: 'memberPlan',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local',
                readOnly: false,
                disabled: true,
                listeners: {
                  select: 'onMemberPlanSelected'
                }
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield'
            },
            items: [
              {
                fieldLabel: 'Billing NPI',
                labelWidth: 145,
                xtype: 'numberfield',
                reference: 'billingNpi',
                name: 'billingNpi',
                bind: {
                  hidden: '{isLtss}'
                },
                allowBlank: false,
                                // Remove spinner buttons, and arrow key and mouse wheel listeners
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                dataIndex: 'billprovnpi'
              },
              {
                xtype: 'numberfield',
                fieldLabel: 'Facility NPI',
                labelWidth: 159,
                reference: 'facilityNpi',
                name: 'facilityNpi',
                dataIndex: 'facilitynpi'
              },
              {
                boxLabel: 'Same as billing',
                xtype: 'checkbox',
                labelWidth: 120,
                width: 150,
                listeners: {
                  change: 'onSameAsBillingChange'
                }
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield'
            },
            items: [
              {
                xtype: 'numberfield',
                fieldLabel: 'Billing TIN',
                labelWidth: 145,
                reference: 'billingTin',
                name: 'billingTin',
                allowBlank: false,
                dataIndex: 'fedTaxId'
              },
              {
                fieldLabel: 'Billing Taxonomy',
                reference: 'billingTaxonomy',
                labelWidth: 159,
                name: 'billingTaxonomy',
                allowBlank: false
              }
            ]
          },
          {
            xtype: 'fieldset',
            title: 'Attending Summary',

            items: [{
              xtype: 'container',
              layout: 'hbox',

              defaults: {
                xtype: 'textfield'
              },

              items: [{
                fieldLabel: 'Attending Taxonomy',
                name: 'attendingTaxonomy'
              },{
                fieldLabel: 'First Name',
                name: 'attendingFirstName'
              },{
                fieldLabel: 'Last Name',
                name: 'attendingLastName'
              }]
            },{
              xtype: 'container',

              items: [{
                xtype: 'textfield',
                fieldLabel: 'Attending NPI',
                name: 'attendingNPI',
                labelWidth: 164
              }]
            }]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            items: [
              {
                xtype: 'textfield',
                labelWidth: 145,
                reference: 'patientAccountNumber',
                name: 'patientAccountNumber',
                fieldLabel: 'Patient Account#',
                dataIndex: 'ptnAccountNum'
              },
              {
                xtype: 'textfield',
                fieldLabel: 'DRG Code',
                labelWidth: 159,
                name: 'drgCode',
                dataIndex: 'drgCode'
              },
              {
                xtype: 'container',
                layout: {
                  type: 'hbox',
                  align: 'center'
                },
                items: [
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Prior Auth#',
                    reference: 'priorAuthNumber',
                    name: 'priorAuthNumber',
                    listeners: {
                      blur: 'onPriorAuthNumberBlur'
                    },
                    dataIndex: 'priorAuthNum'
                  },
                  {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    handler: 'onPriorAuthSearch'
                  }
                ]
              }

            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield',
              labelWidth: 145
            },
            items: [
              {
                fieldLabel: 'Type Of Bill',
                xtype: 'combo',
                reference: 'typeOfBill',
                name: 'billType',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local',
                width: 722,
                bind: {
                  store: '{billTypes}'
                },
                editable: false,
                selectOnFocus: false,
                allowBlank: false,
                dataIndex: 'billType'
              },
              {
                fieldLabel: 'Orig. Claim Ref',
                labelWidth: 125,
                xtype: 'textfield',
                reference: 'origRefNum',
                name: 'origRefNum',
                dataIndex: 'origRefnum'
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield',
              labelWidth: 120
            },
            items: [
              {
                fieldLabel: 'Statement From',
                xtype: 'datefield',
                reference: 'stmtFromDate',
                name: 'stmtFromDate',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                allowBlank: false,
                dataIndex: 'stmtFromDate'
              },
              {
                fieldLabel: 'Statement Thru',
                xtype: 'datefield',
                reference: 'stmtThruDate',
                name: 'stmtThruDate',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                listeners: {
                  blur: 'onStatementThruBlur'
                },
                allowBlank: false,
                dataIndex: 'stmtThruDate'
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield',
              labelWidth: 120
            },
            items: [
              {
                fieldLabel: 'Admit Date',
                labelWidth: 145,
                xtype: 'datefield',
                reference: 'admitDate',
                name: 'admitDate',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                listeners: {
                  blur: 'onAdmitDateBlur'
                },
                allowBlank: false,
                dataIndex: 'admitDate'
              },
              {
                xtype: 'combo',
                reference: 'admitHour',
                name: 'admitHour',
                fieldLabel: 'Admit Hour',
                labelWidth: 141,
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local',
                bind: {
                  store: '{admitHours}'
                },
                editable: false,
                selectOnFocus: false,
                allowBlank: false,
                dataIndex: 'admitHour'
              },
              {
                xtype: 'combo',
                reference: 'admitType',
                name: 'admitType',
                fieldLabel: 'Type',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local',
                bind: {
                  store: '{admitTypes}'
                },
                editable: false,
                selectOnFocus: false,
                allowBlank: false,
                dataIndex: 'admitType'
              },
              {
                xtype: 'combo',
                reference: 'admitSource',
                name: 'admitSource',
                fieldLabel: 'Source',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local',
                bind: {
                  store: '{admitSources}'
                },
                editable: false,
                selectOnFocus: false,
                allowBlank: false,
                dataIndex: 'admitSource'
              }

            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              xtype: 'textfield',
              labelWidth: 120
            },
            items: [
              {
                xtype: 'datefield',
                name: 'dischargeDate',
                fieldLabel: 'Disch Date',
                labelWidth: 145,
                reference: 'dischargeDate'
              },
              {
                xtype: 'combo',
                reference: 'dischHour',
                name: 'dischHour',
                fieldLabel: 'Disch Hour',
                labelWidth: 141,
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local',
                bind: {
                  store: '{dischHours}'
                },
                editable: false,
                selectOnFocus: false,
                allowBlank: false,
                dataIndex: 'dischargeHour'
              },
              {
                xtype: 'combo',
                reference: 'dischargeStatus',
                name: 'dischargeStatus',
                fieldLabel: 'Disch Status',
                displayField: 'key',
                valueField: 'value',
                queryMode: 'local',
                bind: {
                  store: '{dischStatuses}'
                },
                                // listeners: {
                                //     select: 'onProviderSelect'
                                // }
                editable: false,
                selectOnFocus: false,
                allowBlank: false,
                dataIndex: 'dischargeStatus'
              },
              {
                xtype: 'textfield',
                name: 'condCodes',
                fieldLabel: 'Condition Codes',
                width: 165,
                reference: 'condCode1'
              },
              {
                xtype: 'textfield',
                name: 'condCodes',
                width: 40,
                reference: 'condCode2'
              },
              {
                xtype: 'textfield',
                name: 'condCodes',
                width: 40,
                reference: 'condCode3'
              },
              {
                xtype: 'textfield',
                name: 'condCodes',
                width: 40,
                reference: 'condCode4'
              },
              {
                xtype: 'textfield',
                name: 'condCodes',
                width: 40,
                reference: 'condCode5'
              },
              {
                xtype: 'textfield',
                name: 'condCodes',
                width: 40,
                reference: 'condCode6'
              },
              {
                xtype: 'textfield',
                name: 'condCodes',
                width: 40,
                reference: 'condCode7'
              }
            ]
          },
          {
            xtype: 'fieldset',
            title: 'Occurrence Codes',
            layout: 'hbox',
            defaults: {
              labelAlign: 'top',
              labelSeparator: ''
            },
            items: [
              {
                xtype: 'textfield',
                name: 'occurCodes',
                fieldLabel: 'Cd',
                labelPad: '0 0 0 10',
                width: 40,
                reference: 'occurCode1'
              },
              {
                fieldLabel: 'Date',
                xtype: 'datefield',
                name: 'occurDates',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'occurDate1'
              },
              {
                xtype: 'textfield',
                name: 'occurCodes',
                fieldLabel: 'Cd',
                width: 40,
                reference: 'occurCode2'
              },
              {
                fieldLabel: 'Date',
                xtype: 'datefield',
                name: 'occurDates',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'occurDate2'
              },
              {
                xtype: 'textfield',
                name: 'occurCodes',
                fieldLabel: 'Cd',
                width: 40,
                reference: 'occurCode3'
              },
              {
                fieldLabel: 'Date',
                xtype: 'datefield',
                name: 'occurDates',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'occurDate3'
              },
              {
                xtype: 'textfield',
                name: 'occurCodes',
                fieldLabel: 'Cd',
                width: 40,
                reference: 'occurCode4'
              },
              {
                fieldLabel: 'Date',
                xtype: 'datefield',
                name: 'occurDates',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'occurDate4'
              },
              {
                xtype: 'textfield',
                name: 'occurCodes',
                fieldLabel: 'Cd',
                width: 40,
                reference: 'occurCode5'
              },
              {
                fieldLabel: 'Date',
                xtype: 'datefield',
                name: 'occurDates',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'occurDate5'
              },
              {
                xtype: 'textfield',
                name: 'occurCodes',
                fieldLabel: 'Cd',
                width: 40,
                reference: 'occurCode6'
              },
              {
                fieldLabel: 'Date',
                xtype: 'datefield',
                name: 'occurDates',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'occurDate6'
              }
            ]
          },
          {
            xtype: 'fieldset',
            title: 'Occurrence Span',
            layout: 'hbox',
            defaults: {
              labelAlign: 'top',
              labelSeparator: ''
            },
            items: [
              {
                xtype: 'textfield',
                name: 'spanCodes',
                fieldLabel: 'Cd',
                width: 40,
                reference: 'spanCd1'
              },
              {
                fieldLabel: 'From Date',
                xtype: 'datefield',
                name: 'spanFromDate',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'spanFromDate1'
              },
              {
                fieldLabel: 'Thru Date',
                xtype: 'datefield',
                name: 'spanThruDate',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'spanThruDate1'
              },
              {
                xtype: 'textfield',
                name: 'spanCodes',
                fieldLabel: 'Cd',
                width: 40,
                reference: 'spanCd2'
              },
              {
                fieldLabel: 'From Date',
                xtype: 'datefield',
                name: 'spanFromDate',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'spanFromDate2'
              },
              {
                fieldLabel: 'Thru Date',
                xtype: 'datefield',
                name: 'spanThruDate',
                format: 'm/d/Y',
                invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                width: 150,
                reference: 'spanThruDate2'
              }
            ]
          }, {
            xtype: 'fieldset',
            title: 'Value Codes',

            items: [{
              xtype: 'container',
              layout: 'hbox',
              defaults: {
                labelAlign: 'top',
                labelSeparator: '',
                                // Remove spinner buttons, and arrow key and mouse wheel listeners
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false
              },
              items: [
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  fieldLabel: 'Cd',
                  width: 40,
                  reference: 'valueCode1'
                },
                {
                  fieldLabel: 'Amt/Value',
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt1'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  fieldLabel: 'Cd',
                  width: 40,
                  reference: 'valueCode2'
                },
                {
                  fieldLabel: 'Amt/Value',
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt2'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  fieldLabel: 'Cd',
                  width: 40,
                  reference: 'valueCode3'
                },
                {
                  fieldLabel: 'Amt/Value',
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt3'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  fieldLabel: 'Cd',
                  width: 40,
                  reference: 'valueCode4'
                },
                {
                  fieldLabel: 'Amt/Value',
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt4'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  fieldLabel: 'Cd',
                  width: 40,
                  reference: 'valueCode5'
                },
                {
                  fieldLabel: 'Amt/Value',
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt5'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  fieldLabel: 'Cd',
                  width: 40,
                  reference: 'valueCode6'
                },
                {
                  fieldLabel: 'Amt/Value',
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt6'
                }
              ]
            },
            {
              xtype: 'container',
              layout: 'hbox',
              defaults: {
                labelAlign: 'top',
                labelSeparator: '',
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false
              },
              items: [
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  width: 40,
                  reference: 'valueCode7'
                },
                {
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt7'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  width: 40,
                  reference: 'valueCode8'
                },
                {
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt8'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  width: 40,
                  reference: 'valueCode9'
                },
                {
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt9'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  width: 40,
                  reference: 'valueCode10'
                },
                {
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt10'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  width: 40,
                  reference: 'valueCode11'
                },
                {
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt11'
                },
                {
                  xtype: 'textfield',
                  name: 'valueCode1',
                  width: 40,
                  reference: 'valueCode12'
                },
                {
                  xtype: 'numberfield',
                  name: 'valueAmt',
                  width: 110,
                  reference: 'valueAmt12'
                }
              ]
            }]
          }, {
            xtype: 'fieldset',
            title: 'Surgical Procedure',

            items: [{
              xtype: 'container',
              layout: 'hbox',
              defaults: {
                labelAlign: 'top',
                labelSeparator: ''
              },
              items: [
                {
                  xtype: 'textfield',
                  name: 'surgProcCode',
                  fieldLabel: 'Cd',
                  width: 100,
                  reference: 'surgProcCode1',
                  listeners: {
                    blur: 'onSurgProcCodeBlur'
                  }
                },
                {
                  fieldLabel: 'Date',
                  xtype: 'datefield',
                  name: 'surgProcDate',
                  format: 'm/d/Y',
                  invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                  width: 150,
                  reference: 'surgProcDate1'
                },
                {
                  xtype: 'textfield',
                  name: 'surgProcCode',
                  fieldLabel: 'Cd',
                  width: 100,
                  reference: 'surgProcCode2',
                  listeners: {
                    blur: 'onSurgProcCodeBlur'
                  }
                },
                {
                  fieldLabel: 'Date',
                  xtype: 'datefield',
                  name: 'surgProcDate',
                  format: 'm/d/Y',
                  invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                  width: 150,
                  reference: 'surgProcDate2'
                },
                {
                  xtype: 'textfield',
                  name: 'surgProcCode',
                  fieldLabel: 'Cd',
                  width: 100,
                  reference: 'surgProcCode3',
                  listeners: {
                    blur: 'onSurgProcCodeBlur'
                  }
                },
                {
                  fieldLabel: 'Date',
                  xtype: 'datefield',
                  name: 'surgProcDate',
                  format: 'm/d/Y',
                  invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                  width: 150,
                  reference: 'surgProcDate3'
                }
              ]
            },
            {
              xtype: 'container',
              layout: 'hbox',
              defaults: {
                labelAlign: 'top',
                labelSeparator: ''
              },
              items: [
                {
                  xtype: 'textfield',
                  name: 'surgProcCode',
                  width: 100,
                  reference: 'surgProcCode4',
                  listeners: {
                    blur: 'onSurgProcCodeBlur'
                  }
                },
                {
                  xtype: 'datefield',
                  name: 'surgProcDate',
                  format: 'm/d/Y',
                  invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                  width: 150,
                  reference: 'surgProcDate4'
                },
                {
                  xtype: 'textfield',
                  name: 'surgProcCode',
                  width: 100,
                  reference: 'surgProcCode5',
                  listeners: {
                    blur: 'onSurgProcCodeBlur'
                  }
                },
                {
                  xtype: 'datefield',
                  name: 'surgProcDate',
                  format: 'm/d/Y',
                  invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                  width: 150,
                  reference: 'surgProcDate5'
                },
                {
                  xtype: 'textfield',
                  name: 'surgProcCode',
                  width: 100,
                  reference: 'surgProcCode6',
                  listeners: {
                    blur: 'onSurgProcCodeBlur'
                  }
                },
                {
                  xtype: 'datefield',
                  name: 'surgProcDate',
                  format: 'm/d/Y',
                  invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                  width: 150,
                  reference: 'surgProcDate6'
                }
              ]
            }]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              labelAlign: 'left',
              labelSeparator: ':'
            },
            items: [
              {
                xtype: 'button',
                text: 'Enter Diag Codes',
                margin: 7,
                handler: 'onEnterDiagCodesClick'
              },
              {
                xtype: 'textareafield',
                name: 'diagnosisCodes',
                reference: 'diagnosisCodes',
                fieldLabel: 'Diagnosis Codes',
                labelWidth: 130,
                editable: false,
                allowBlank: false,
                emptyText: 'Click the Enter Diag Codes button to enter diagnoses codes. At lease one is required.',
                width: 700
              },
              {
                xtype: 'textfield',
                name: 'admitDiag',
                reference: 'admitDiag',
                fieldLabel: 'Admit Diag',
                allowBlank: false,
                listeners: {
                  blur: 'onBlurDiagTextfield'
                },
                dataIndex: 'admitDiagCd'
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              labelAlign: 'left',
              labelSeparator: ':'
            },
            items: [
              {
                xtype: 'textfield',
                name: 'attendingProvNPI',
                fieldLabel: 'Attending Prov NPI',
                dataIndex: 'attprovnpi'
              },
              {
                xtype: 'textfield',
                name: 'operationProvNPI',
                fieldLabel: 'Operating Prov NPI',
                dataIndex: 'otherProvNpi'
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
              labelAlign: 'left',
              labelSeparator: ':'
            },
            items: [
              {
                xtype: 'textfield',
                name: 'otherCarrier',
                fieldLabel: 'Other Carrier',
                labelWidth: 151,
                dataIndex: 'otherpayername'
              },
              {
                xtype: 'textfield',
                name: 'insured',
                fieldLabel: 'Insured',
                labelWidth: 153,
                dataIndex: 'otherInsLastName'
              },
              {
                xtype: 'numberfield',
                name: 'paidAmount',
                fieldLabel: 'Paid Amount',
                dataIndex: 'otherInsPaidAmt'
              },
              {
                xtype: 'textfield',
                name: 'denyReason',
                fieldLabel: 'Deny Reason',
                dataIndex: 'adjrsncode'
              }
            ]
          },
          {
            xtype: 'textareafield',
            fieldLabel: 'Notes',
            labelWidth: 151,
            width: 658,
            name: 'notesText',
            dataIndex: 'remarks'
          },
          {
            xtype: 'container',
            layout: 'hbox',
            items: [
              {
                xtype: 'textarea',
                labelWidth: 120,
                fieldLabel: 'OB Visits',
                reference: 'obVisits',
                name: 'obVisits',
                readOnly: true,
                hidden: true,
                style: {
                  width: '595px'
                }
              }
            ]
          }
        ]
      }]
    },
    {
      xtype: 'gridpanel',
      reference: 'serviceGrid',
      region: 'south',
      cls: 'card-panel',
      forceFit: true,
      plugins: [{
        ptype: 'rowediting',
        saveBtnText: 'Save'
      }],
      title: 'Services',
      height: 250,
      tbar: {
        xtype: 'toolbar',
        items: [
          {
            xtype: 'button',
            text: 'Add',
            iconCls: 'x-fa fa-plus-circle',
            handler: 'addService'
          },
          {
            xtype: 'button',
            text: 'Remove',
            iconCls: 'x-fa fa-minus-circle',
            handler: 'removeService'
          }
        ]
      },
      listeners: {
        canceledit: 'cancelServiceUpdate',
        edit: 'maybeEditService',
        beforeedit: 'beforeEditService'
      },
      bind: {
        store: '{serviceClaims}'
      },
      columns: [
        {
          text: '#',
          dataIndex: 'lineNum',
          width: 30,
          sortable: false
        },
        {
          xtype: 'datecolumn',
          format: 'm/d/Y',
          text: 'Serv. From',
          dataIndex: 'servLnFromDate',
          sortable: false,
          editor: {
            xtype: 'datefield',
            itemId: 'servLnFromDate',
            reference: 'servFromDate',
            allowBlank: false,
            format: 'm/d/Y',
            invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
            listeners: {
              blur: 'onServiceLineFromDateBlur'
            }
          }
        },
        {
          text: 'Rev. Code',
          dataIndex: 'revCode',
          sortable: false,
          editor: {
            xtype: 'combo',
            displayField: 'revCode',
            valueField: 'revCode',
            queryMode: 'local',
            editable: false,
            selectOnFocus: false,
            allowBlank: false,
            bind: {
              store: '{revCodes}'
            },
            listConfig: {
              itemTpl: [
                '{revCode} - {description}'
              ]
            }
          }
        },
        {
          text: 'Proc Code',
          dataIndex: 'servLnProcCode',
          sortable: false,
          editor: {
            xtype: 'textfield',
            listeners: {
              blur: 'onServLnProcCodeBlur'
            }
          }
        },
        {
          text: 'Description',
          dataIndex: 'servLnProcCodeDesc',
          sortable: false,
          editor: {
            xtype: 'textfield',
            itemId: 'servLnProcCodeDesc',
            readOnly: true
          }
        },
        {
          text: 'NDC',
          dataIndex: 'servLnNDC',
          sortable: false,
          editor: {
            xtype: 'textfield',
            itemId: 'servLnNDC'
          }
        },
        {
          text: '1',
          dataIndex: 'mod1',
          width: 30,
          sortable: false,
          editor: {
            xtype: 'textfield'
          }
        },
        {
          text: '2',
          dataIndex: 'mod2',
          width: 30,
          sortable: false,
          editor: {
            xtype: 'textfield'
          }
        },
        {
          text: '3',
          dataIndex: 'mod3',
          width: 30,
          sortable: false,
          editor: {
            xtype: 'textfield'
          }
        },
        {
          text: '4',
          dataIndex: 'mod4',
          width: 30,
          sortable: false,
          editor: {
            xtype: 'textfield'
          }
        },
        {
          text: 'Units',
          dataIndex: 'servLnUnits',
          sortable: false,
          editor: {
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 1
          }
        },
        {
          text: 'Billed',
          dataIndex: 'servLnBilled',
          sortable: false,
          editor: {
            xtype: 'textfield',
            allowBlank: false
          }
        }
      ]
    }
  ]
});
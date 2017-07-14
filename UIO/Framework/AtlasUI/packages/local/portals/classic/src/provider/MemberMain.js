/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Main
 * Description: Gives users a place to view Member Info
 */
Ext.define('Atlas.portals.view.provider.MemberMain', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberMain',
  title: 'Member',
  layout: 'vbox',
  controller: 'portalsprovidermembermain',
  viewModel: {
    data: {
      recipientId: '',
      errorMessage: '',
      memberCap: '',
      isHealthyMI: false,
      isMIHealthLink: false,
      memberDetails: {},
      tempDemographicsId: '',
      tempHedisId: '',
      tempAuthId: '',
      tempImmunizationId: '',
      tempCobId: '',
      tempICDId: '',
      tempCareTeamId: '',
      isDocumentsTabVisited: false
    }
  },
  scrollable: true,

  items: [
    {
      xtype: 'form',
      width: '100%',
      minWidth: 1400,
      reference: 'memberForm',
      title: 'Member',
      cls: 'card-panel',
      bbar: {
        xtype: 'toolbar',
        items: [{
          xtype: 'button',
          name: 'healthyMIHRABtn',
          reference: 'healthyMIHRABtn',
          text: 'Health Risk Assessment',
          handler: 'onHraSelect',
          bind: {
            hidden: '{!isHealthyMI}'
          },
          listeners: {
            click: 'launchHRA'
          }
        }, {
          xtype: 'button',
          name: 'integratedCareBtn',
          reference: 'integratedCareBtn',
          text: 'Integrated Care',
          handler: 'onIcSelect',
          bind: {
            hidden: '{!isMIHealthLink}'
          }
        }, {
          xtype: 'displayfield',
          bind: {
            hidden: '{!memberCap}',
            value: '{memberCap}'
          }
        }
        ]
      },
      defaults: {
        xtype: 'container'
      },
      layout: 'hbox',
      items: [
        {
          defaults: {
            labelWidth: 140,
            xtype: 'textfield',
            readOnly: true,
            width: 375
          },
          items: [
            {
              xtype: 'container',
              readOnly: false,
              layout: {
                type: 'hbox',
                align: 'center'
              },
              items: [{
                labelWidth: 140,
                width: 352,
                xtype: 'textfield',
                fieldLabel: 'Member ID',
                reference: 'memberCardID',
                readOnly: false,
                listeners: {
                  blur: 'onMemberIdBlur',
                  keyup: 'onMemberKeyPress'
                },
                enableKeyEvents: true
              }, {
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                handler: 'openMemberSearch'
              }]
            },
            {
              fieldLabel: 'Enrollment Status',
              reference: 'enrollmentStatus',
              name: 'enrollmentStatus'
            },
            {
              xtype: 'combo',
              fieldLabel: 'LOB',
              reference: 'lob',
              name: 'lob',
              displayField: 'name',
              valueField: 'value',
              queryMode: 'local',
              readOnly: false,
              disabled: true
            },
            {
              xtype: 'combo',
              reference: 'family',
              name: 'family',
              displayField: 'name',
              valueField: 'value',
              fieldLabel: 'Family',
              listeners: {
                select: 'onFamilySelected'
              },
              readOnly: false,
              disabled: true
            },
            {
              fieldLabel: 'PCP',
              reference: 'PCP',
              name: 'PCP'
            }
          ]
        },
        {
          defaults: {
            labelWidth: 160,
            xtype: 'textfield',
            readOnly: true
          },
          items: [
            {
              fieldLabel: 'Name',
              reference: 'name',
              name: 'name'
            }, {
              fieldLabel: 'Case Num',
              reference: 'caseNumber',
              name: 'caseNumber'
            }, {
              xtype: 'combo',
              fieldLabel: 'Select Plan',
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
            }, {
              fieldLabel: 'Delinquency Status',
              reference: 'delinquencyStatus',
              name: 'delinquencyStatus'
            }, {
              fieldLabel: 'PCP Phone',
              reference: 'PCPPhone',
              name: 'PCPPhone'
            }]
        },
        {
          defaults: {
            labelWidth: 115,
            xtype: 'textfield',
            readOnly: true
          },
          items: [
            {
              fieldLabel: 'DOB',
              reference: 'birthDate',
              name: 'birthDate'
            }, {
              fieldLabel: 'Eff Date',
              reference: 'contCoverageSince',
              name: 'contCoverageSince'
            }, {
              fieldLabel: 'Benefit Plan',
              reference: 'primaryLOB',
              name: 'primaryLOB'
            }, {
              fieldLabel: 'MCIR ID#',
              reference: 'mcirID',
              name: 'mcirID'
            }]
        },
        {
          defaults: {
            labelWidth: 90,
            xtype: 'textfield',
            readOnly: true
          },
          items: [
            {
              fieldLabel: 'SSN',
              reference: 'socSecNum',
              name: 'socSecNum'
            }, {
              fieldLabel: 'Term Date',
              reference: 'contCoverageTerm',
              name: 'contCoverageTerm'
            }, {
              xtype: 'displayfield',
              fieldLabel: 'Alerts',
              reference: 'detailedAlerts',
              name: 'detailedAlerts'
            }, {
              fieldLabel: 'Language',
              reference: 'memberLanguage',
              name: 'memberLanguage'
            }]
        },
        {
          defaults: {
            labelWidth: 65,
            width: 105,
            xtype: 'textfield',
            readOnly: true
          },
          items: [
            {
              fieldLabel: 'Gender',
              reference: 'gender',
              name: 'gender'
            }]
        }]

    },
    {
      xtype: 'tabpanel',
      width: '100%',
      minWidth: 1400,
      cls: 'formPanel',
      padding: 20,
      reference: 'memberTabs',
      activeTab: 0,
      layout: 'fit',
      listeners: {
        tabchange: 'onTabChange'
      },

      items: [{
        title: 'Demographics',
        reference: 'Demographics',
        xtype: 'portalsMemberDemographics'

      }, {
        title: 'Authorizations',
        reference: 'Authorizations',
        xtype: 'portalsMemberAuthorizations'
      }, {
        title: 'HEDIS',
        reference: 'HEDIS',
        xtype: 'portalsMemberHEDIS'
      }, {
        title: 'Immunizations',
        reference: 'Immunizations',
        xtype: 'portalsMemberImmunization'
      }, {
        title: 'COB',
        reference: 'COB',
        xtype: 'portalsMemberCOB'
      }, {
        title: 'Claim Status',
        reference: 'Claim'
      }, {
        title: 'Messages',
        reference: 'Messages',
        xtype: 'portalsMemberMessages'
      }, {
        title: 'Documents',
        reference: 'Documents',
        xtype: 'portalsMemberDocuments'
      }, {
        title: 'ICD',
        reference: 'ICD',
        xtype: 'integratedcaremain'
      }, {
        title: 'Care Team',
        reference: 'Care',
        xtype: 'careteammain'
      }]
    }]
});
/**
 * Created by s6627 on 11/7/2016.
 */
/**
 * Created by s6627 on 11/7/2016.
 */
/**
 * Created by s6627 on 11/7/2016.
 */
Ext.define('Atlas.casemanagement.view.CaseInfo', {
    extend: 'Ext.tab.Panel',
    xtype: 'CaseInfo',
    alias:'CaseInfo',
    layout: 'fit',
    controller:'casedetailscontroller',
    viewModel: 'CaseDetailsViewModel',
    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'textfield',
                itemId: 'numMTMID',
                width: '250px',
                maskRe: /[0-9\/.-]/,
                emptyText: '[Case ID]',
                enableKeyEvents: true,
                listeners: {
                    'keypress': {
                        fn: 'GetDetails'
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Advanced Search',
                handler: 'btAdvancedSearch',
                itemId: 'btAdvancedSearch',
                iconCls: 'x-fa fa-search'
            },
            '-',
            {
                xtype: 'displayfield',
                anchor: '10%',
                itemId:'lblCaseManager',
                hidden:true
            },
            {
                xtype: 'displayfield',
                anchor: '10%',
                itemId:'lblPlanGroupId',
                hidden:true
            }
            , {
                xtype: 'displayfield',
                fieldLabel: 'Status',
                itemId:'lblStatus',
                labelWidth: 20
            }
            , {
                xtype: 'displayfield',
                fieldLabel: 'Days Open',
                fieldCls:'m-red-color',
                itemId:'lbldaysopen',
                labelWidth: 20
            },
            '-',
            {
                xtype: 'label',
                text:'MRx ID'
            },
            {
                xtype: 'button',
                text: '',
                handler: 'btnGoToMember',
                itemId: 'btnMRxId'
            },
            '-',
            {
                xtype: 'displayfield',
                itemId:'lblMemberName',
                labelWidth: 20
            },
            '-',
            {
                xtype: 'button',
                text: 'All Member Cases',
                handler: 'btnAllCasesClick',
                itemId: 'btnAllCases',
                disabled:true,
                iconCls: 'x-fa fa-search'
            },
            {
                xtype: 'label',
                itemId: 'lblKey',
                hidden: true
            },
            {
                xtype: 'label',
                itemId: 'lblName',
                hidden: true
            },
            {
                xtype: 'hidden', itemId: 'hdnMTMSystemId'
            },
            {
                xtype: 'hidden', itemId: 'hiddenMTMSystemID'
            },
            {
                xtype: 'hidden', itemId: 'hiddenRefreshKey'
            },
            {
                xtype: 'hidden', itemId: 'hiddenMTMID'
            },
            {
                xtype: 'hidden', itemId: 'hiddenKey'
            },
            {
                xtype: 'hidden', itemId: 'hiddenTotalCases'
            },
            {
                xtype: 'hidden', itemId: 'hiddenDaysOpen'
            },
            {
                xtype: 'hidden', itemId: 'hiddenRecipientId'
            },
            {
                xtype: 'hidden', itemId: 'hiddenPreRecipientId'
            },
            {
                xtype: 'hidden', itemId: 'hiddenRefreshKey'
            },
            '->',
            {
                xtype: 'button',
                reference: 'menu',
                text: 'Menu',
                iconCls: 'x-fa fa-bars',
                menu: {
                    plain: true,
                    listeners: {
                        click: 'onMenuClick'
                    }
                }
            }
        ]
    }
    ,
    defaults: {
        closable: true
    }
});
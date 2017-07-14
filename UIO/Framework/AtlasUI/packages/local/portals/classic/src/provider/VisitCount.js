/*
 * Last Developer: Srujith Cheruku
 * Date: 11-22-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Inquiry
 * Description: Gives users a place to view Visit Counts
 */
Ext.define('Atlas.portals.view.provider.VisitCount', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderVisitCount',
    controller: 'portalsProviderVisitCountController',
    viewModel: {
        stores: {
            visitCountStore: {
                model: 'Atlas.portals.provider.model.GetServiceCounts'
            }
        }
    },

    items:[{
        xtype: 'gridpanel',
        height: 400,
        tbar: {
            xtype: 'toolbar',
            reference: 'yearToolbar',
            items: [{
                xtype: 'combobox',
                fieldLabel: 'Select Year',
                reference: 'yearCombo',
                queryMode: 'local',
                displayField: 'value',
                valueField: 'value',
                listeners: {
                    change: 'loadVisitCount'
                }
            }]
        },
        columns:[{
            text: 'Benefit Type',
            dataIndex: 'benefitType',
            width: 200
        },{
            text: 'Benefit Unit',
            dataIndex: 'benefitUnit'
        },{
            text: 'Benefit Count',
            dataIndex: 'benefitCountHard'
        },{
            text: 'Auth Req',
            dataIndex: 'authReq',
            renderer: function(value) {
                return value ? 'Yes' : 'No';
            }
        },{
            text: 'Auth Count',
            dataIndex: 'authCount'
        },{
            text: 'Auth Remain',
            dataIndex: 'authremain'
        },{
            text: 'Claim Count',
            dataIndex: 'claimCount'
        },{
            text: 'Claim Remain',
            dataIndex: 'claimRemain'
        },{
            text: 'Next Benefit Date',
            dataIndex: 'nextBenefitDate'
        }],
        bind: {
            store: '{visitCountStore}'
        }
    }],
    listeners:{
        beforerender: 'loadVisitCount'
    }
});
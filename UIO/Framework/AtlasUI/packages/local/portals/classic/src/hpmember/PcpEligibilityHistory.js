/**
 * Created by b6636 on 11/7/2016.
 */
Ext.define('Atlas.portals.view.hpmember.PcpEligibilityHistory', {
    extend: 'Ext.container.Container',
    xtype: 'hpmember-pcpeligibility',
    controller: 'pcpEligibilityHistoryController',
    viewModel: 'pcpEligibilityHistoryViewModel',
    scrollable: true,
    title: 'PCP/Eligibility',
    items: [
        {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'PCP/Eligibility',
            defaults: {
                xtype: 'textfield',
                labelWidth: 110,
                style: {
                    padding:'5px'
                }
            },
            scrollable: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',

                items: ['->',{
                    xtype: 'button',
                    text: 'Print Member Report',
                    listeners: {
                        click: 'printReport'
                    }
                }]
            }],
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Member:',
                    reference: 'familyListCombo',
                    name: 'family',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    listeners: {
                        beforerender: 'initializeFamilyList',
                        change: 'onFamilyListChange'
                    },
                    width: 500
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Plan:',
                    reference: 'lobCombo',
                    name: 'lob',
                    bind: {
                        store: '{memberLobStore}',
                        value: '{primaryLob}'
                    },
                    displayField: 'name',
                    valueField: 'name',
                    forceSelection: true,
                    queryMode: 'local',
                    lastquery: '',
                    listeners: {
                        change: 'onLobChange'
                    },
                    width: 500
                },
                {
                    fieldLabel: 'Effective Date:',
                    name: 'eff',
                    bind: '{contCoverageSince}',
                    readOnly: true,
                    width: 500
                },
                {
                    fieldLabel: 'Term Date:',
                    name: 'term',
                    bind: '{contCoverageTerm}',
                    readOnly: true,
                    width: 500
                },
                {
                    fieldLabel: 'Status:',
                    name: 'status',
                    bind: '{enrollmentStatus}',
                    readOnly: true,
                    width: 500
                },
                {
                    fieldLabel: 'PCP Name:',
                    name: 'pcpName',
                    bind: '{PCP}',
                    readOnly: true,
                    width: 500
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ph No:',
                    name: 'phNoPCP',
                    bind: '{PCPPhone}',
                    readOnly: true,
                    width: 500
                },
                {
                    xtype: 'container',
                    padding: '11px 0 0 8px',
                    bind: {
                        html: '<b>Alerts:</b> {alerts}',
                        hidden: '{hideAlerts}'
                    }
                },
                {
                    xtype: 'container',
                    padding: '11px 0 0 8px',
                    html: '<font style="color:red;" >Note: Eligibility and PCP history details are populated below based on the selected member in the family drop down.</font>'
                },
                {
                    xtype: 'hboxform',
                    items: [
                        {
                            xtype: 'grid',
                            title: 'Eligibility History',
                            bind: '{eligibilityStore}',
                            flex: 1,
                            columns: [
                                {
                                    text: 'From Date',
                                    dataIndex: 'sDate',
                                    formatter: 'date("m/d/Y")',
                                    flex: 1
                                },
                                {
                                    text: 'Thru Date',
                                    dataIndex: 'eDate',
                                    formatter: 'date("m/d/Y")',
                                    flex: 1
                                },
                                {
                                    text: 'County',
                                    dataIndex: 'countyName',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            title: 'PCP History',
                            bind: '{pcpStore}',
                            flex: 1,
                            columns: [
                                {
                                    text: 'PCP Name',
                                    dataIndex: 'pcpName',
                                    flex: 1
                                },
                                {
                                    text: 'From Date',
                                    dataIndex: 'sDate',
                                    formatter: 'date("m/d/Y")',
                                    flex: 1
                                },
                                {
                                    text: 'Thru Date',
                                    dataIndex: 'eDate',
                                    formatter: 'date("m/d/Y")',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

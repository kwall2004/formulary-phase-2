/**
 * Created by T3852 on 9/27/2016.
 */
Ext.define('Atlas.portals.view.rxmember.MyBenefitsAndCoverage', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxmemberbenefitsandcoverage',
    title: 'My Benefits & Coverage',

    controller: 'mybenefitsandcoverage',
    viewModel: 'mybenefitsandcoverageviewmodel',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'grid',
            cls: 'card-panel',
            title: 'My Coverage',
            flex: 1,
            itemId: 'myBenefitsAndCoverageGrid',
            reference: 'coverageGridRef',
            columns: [
                {
                    flex: 1,
                    dataIndex: 'PlanGroupName',
                    renderer: function (value, record) {
                        var memberRecord = record.record.data;
                        var planGroupName = memberRecord.PlanGroupName;
                        var effDate = memberRecord.EffDate;
                        var termDate = memberRecord.TermDate;

                        if (termDate == "") {
                            termDate = 'N/A';
                        }
                        return '<b>' + planGroupName + '</b><br>From: ' + effDate + '<br>To: ' + termDate;
                    }
                }
            ],
            listeners: {
                select: 'coverageRowClick'
            }
        },
        {
            flex: 3,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            xtype: 'form',
            cls: 'formPanel',
            reference: 'planDetails',
            defaults: {
                xtype: 'panel',
                cls: 'card-panel'
            },
            items: [
                {
                    title: 'Plan Details',
                    defaults: {
                        xtype: 'displayfield',
                        margin: 0,
                        style: {
                            margin: 0
                        }
                    },
                    items: [
                        {
                            fieldLabel: 'Plan Name',
                            name: 'PlanGroupName'
                        },
                        {
                            fieldLabel: 'Plan Type',
                            name: 'LOBName'
                        },
                        {
                            fieldLabel: 'Effective Date',
                            name: 'EffDate'
                        },
                        {
                            fieldLabel: 'Term Date',
                            name: 'TermDate'
                        }
                    ]
                },
                {
                    title: 'PCP Details',
                    defaults: {
                        xtype: 'displayfield',
                        margin: '0 0 0 5px'
                    },
                    items: [
                        {
                            itemId: 'pcpDetails'
                        }
                    ]
                },
                {
                    title: 'Out of Pocket Details',
                    defaults: {
                        xtype: 'displayfield',
                        margin: 0
                    },
                    items: [
                        {
                            fieldLabel: 'Assigned Out of Pocket Maximum Per Plan Benefit',
                            itemId: 'pocketAssigned'
                        },
                        {
                            fieldLabel: 'Current Out of Pocket Total',
                            itemId: 'pocketCurrent',
                            labelWidth: 325
                        }
                    ]
                },
                {
                    title: 'Deductible Details',
                    defaults: {
                        xtype: 'displayfield',
                        margin: 0
                    },
                    items: [
                        {
                            fieldLabel: 'Assigned Deductible Per Plan',
                            itemId: 'deductibleAssigned',
                            labelWidth: '20'
                        },
                        {
                            fieldLabel: 'Deductible Amount Remaining',
                            itemId: 'deductibleCurrent',
                            labelWidth: '20'
                        }
                    ]
                }
            ]
        }
    ]
});
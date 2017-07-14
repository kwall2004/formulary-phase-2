/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.LTCDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementLTCDetails',
    title: 'LTC Details',
    controller: 'ltcdetailscontroller',
    viewModel: 'LTCDetailsViewModel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [
        {
            xtype: 'panel',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'grid',
                    itemId: 'gpLTC',
                    height:'100%',
                    width : '100%',
                    flex: 1,
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'fa  fa-plus-circle',
                            handler:'btnAddClick',
                            itemId:'btnAdd'
                        }
                    ],
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'System ID', dataIndex: 'systemID' ,hidden:true
                            },
                            {
                                text: 'Record Type', dataIndex: 'recordType' ,hidden:true
                            },
                            {
                                text: 'LTC Enrolled', dataIndex: 'LTCEnrolledNew',
                                renderer: function (value, summaryData, dataIndex) {
                                    var strLTCEnrollValue = value.toString();
                                    if (strLTCEnrollValue == "1" || strLTCEnrollValue == "True" || strLTCEnrollValue == "Yes" || strLTCEnrollValue == "yes") {
                                        return "Yes";
                                    }
                                    else if (strLTCEnrollValue == "2" || strLTCEnrollValue == "False" || strLTCEnrollValue == "No" || strLTCEnrollValue == "no")  {
                                        return "No";
                                    }
                                    else {
                                        return "Unknown";
                                    }
                                }
                            },
                            {
                                text: 'LTC Start Date', dataIndex: 'LTCEntrollStartDate',
                                xtype: 'datecolumn',
                                format:'m/d/Y'
                            },
                            {
                                text: 'LTC End Date', dataIndex: 'LTCEntrollEndDate',
                                xtype: 'datecolumn',
                                format:'m/d/Y'
                            }
                        ]
                    },
                    listeners: {
                        itemdblclick: 'gpLTC_Click'
                    },
                    bind: '{StoreLTC}'

                }
               ]
        }
    ]
})
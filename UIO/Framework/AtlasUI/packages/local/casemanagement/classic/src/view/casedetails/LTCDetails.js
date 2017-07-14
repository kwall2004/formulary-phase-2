/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.casedetails.LTCDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCasedetailsLTCDetails',
    title: 'LTC Details',
    tbar: {
        // xtype: 'casedetailshome'
    },
    items: [{
        xtype: 'button',
        iconCls: 'fa fa-plus',
        text: 'Add'
    }, {
        xtype: 'grid',
        height: 400,
        columns: [{
            text: 'LTC Enrolled',
            dataIndex: 'ltcEnrolled'
        }, {
            text: 'LTC Start Date',
            dataIndex: 'ltcStartDate'
        }, {
            text: 'LTC End Date',
            dataIndex: 'ltcEndDate'
        }],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Displaying: ',
            emptyMsg: "No data to display"
        }
    }]
});
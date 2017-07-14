/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.casedetails.ProblemsAndGoals', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCasedetailsProblemsAndGoals',
    title: 'Problems and Goals',
    tbar: {
        // xtype: 'casedetailshome'
    },
    items: [{
        xtype: 'button',
        iconCls: 'fa fa-plus',
        text: 'Add Problem',
        buttonAlign: 'right'
    }, {
        xtype: 'grid',
        height: 400,
        columns: [{
            text: 'Problem/Goals',
            dataIndex: 'problemGoals'
        }, {
            text: 'Progress to Goal',
            dataIndex: 'progressToGoal'
        }, {
            text: 'Goal Status',
            dataIndex: 'goalStatus'
        }, {
            text: 'Goal Barriers',
            dataIndex: 'goalBarriers'
        }],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Displaying: ',
            emptyMsg: "No data to display"
        }
    }, {
        xtype: 'button',
        iconCls: 'fa fa-pdf',
        text: 'View PDF',
        buttonAlign: 'right'
    }]
});
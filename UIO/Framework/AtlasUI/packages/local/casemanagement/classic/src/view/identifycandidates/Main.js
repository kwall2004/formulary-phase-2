/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/18/2016
* Origin: MERLIN - Case Management
* Description: Main page for the Identify Candidates page
**/

Ext.define('Atlas.casemanagement.view.identifycandidates.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementIdentifyCandidatesMain',
    title: 'Idenfity Candidates',

    items: [{
        xtype: 'panel',
        title: 'Search',
        collapsible: true,

        items: [{
            xtype: 'combo',
            fieldLabel: 'Case Type'
        },{
            xtype: 'fieldset',
            title: 'Candidates Identification Search',

            items: [{
                xtype: 'IdentifyCandidatesMTM'
            },{
                xtype: 'container',
                layout: 'hbox',

                items: [{
                    xtype: 'button',
                    iconCls: 'fa fa-print',
                    text: 'Submit Job'
                },{
                    xtype: 'button',
                    iconCls: 'fa fa-repeat',
                    text: 'Reset'
                }]
            }]
        }]
    },{
        xtype: 'grid',

        columns: [{
            dataIndex: 'view',
            text: 'View'
        },{
            dataIndex: 'delete',
            text: 'Delete'
        },{
            dataIndex: 'type',
            text: 'Type'
        },{
            dataIndex: 'status',
            text: 'Status'
        },{
            dataIndex: 'enrollJobStatus',
            text: 'Enroll Job Status'
        },{
            dataIndex: 'description',
            text: 'Description'
        },{
            dataIndex: 'attachmentSubmitDate',
            text: 'Attachment / Submit Date'
        },{
            dataIndex: 'completionDate',
            text: 'Completion Date'
        }],

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            layout: {
                pack: 'end'
            },

            items: [{
                xtype: 'button',
                iconCls: 'fa fa-refresh'
            }]
        }]
    }]
});
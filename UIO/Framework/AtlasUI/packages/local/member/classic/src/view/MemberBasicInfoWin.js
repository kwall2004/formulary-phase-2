/**
 * Created by agupta on 12/13/2016.
 */


Ext.define('Atlas.member.view.MemberBasicInfoWin', {
    extend: 'Ext.window.Window',
    xtype: 'memberbasicinfowin',
    controller: 'memberbasicinfowincontroller',
    viewModel: 'memberbasicinfowinviewmodel',
    //itemId : 'winNotesEditEnrollment',
    title: 'Members Detail',
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height: 430,
    width: 800,
    items: [
        {
            xtype: 'grid',
            flex : 10,
            itemId: 'gpMemberBasicInfo',
            title: 'System found existing members for same demographics detail.',
            bind: {
                store: '{storeMemberBasicInfo}'
            },
            selModel: {
                selType: 'rowmodel', // rowmodel is the default selection model
                mode: 'SINGLE' // Allows selection of multiple rows
            },
            columns: [
                {text: 'Coverage', dataIndex: 'LOB', hidden: true},
                {text: 'Recipient ID', dataIndex: 'RecipientID', hidden: true},
                {text: 'First Name', dataIndex: 'firstName', width: 150},
                {text: 'Middle Name', dataIndex: 'middleName', width: 100},
                {text: 'LastName', dataIndex: 'lastName', width: 100},
                {
                    text: 'Birth Date',
                    dataIndex: 'birthDate',
                    width: 120,
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    filter: {type: 'date'}
                },
                {text: 'SSN(last 4 digit)', dataIndex: 'socSecNum', width: 120},
                {text: 'Home Phone', dataIndex: 'HomePhone', width: 150},
                {text: 'Gender', dataIndex: 'gender', width: 80}
            ]
        },
        {
            xtype: 'panel',
            items : [
                {
                    xtype : 'panel',
                    layout : 'hbox',
                    items : [
                        {
                            xtype : 'button',
                            iconCls: 'fa fa-star',
                            width: 25,
                            disabled : true
                        },
                        {
                            xtype : 'displayfield',
                            fieldLabel: 'Select : Click \'Select\' to update existing member.'
                        }
                    ]
                },
                {
                    xtype : 'panel',
                    layout : 'hbox',
                    items : [
                        {
                            xtype : 'button',
                            iconCls: 'fa fa-star',
                            width: 25,
                            disabled : true
                        },
                        {
                            xtype : 'displayfield',
                            fieldLabel: 'Create New : Click \'Create New\' to create a new member.'
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        items: [
            '->',
            {
                xtype: 'button',
                itemId: 'btnOk',
                iconCls: 'fa fa-check',
                text: 'Select',
                listeners: {
                    click: 'btnOk_Click'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnCreate',
                iconCls: 'fa fa-save',
                text: 'Create New',
                hidden : true,
                listeners: {
                    click: 'btnCreate_Click'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnClose',
                //iconCls: 'fa fa-save',
                text: 'Cancel',
                hidden : true,
                listeners: {
                    click: 'btnClose_Click'
                }
            }
        ]
    }
});

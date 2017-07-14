/**
 * Developer: Tremaine Grant
 * Description: This view used for the grid in the member locks section.
 */


Ext.define('Atlas.authorization.view.authletterqueue.MemberLocksGrid', {
    xtype: 'MemberLocksGrid',
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    viewModel:{
        type: 'common-shared-editgridmodel',
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: true,
                update: true,
                save: true
            }
        },
        stores:{
            memberlocks:{
                fields: ['memberId',
                    'memberName',
                    'carrier',
                    'account',
                    'LOB',
                    'lockType',
                    'pharmacyPresc',
                    'currentLockId',
                    'proposedLockId',
                    'currentStatus',
                    'proposedStatus']
            }
        }
    },
    bind:{
        store: '{memberlocks}'
    },
    columns:[
        {text:'Member ID', dataIndex:'memberId'}, 
        {text:'Member Name', dataIndex:'memberName'}, 
        {text:'Carrier', dataIndex:'carrier'}, 
        {text:'Account', dataIndex:'account'}, 
        {text:'LOB', dataIndex:'LOB'}, 
        {text:'Lock Type', dataIndex:'lockType'}, 
        {text:'Pharmacy/Prescriber', dataIndex:'pharmacyPresc'},
        {text:'Current Lock ID', dataIndex:'currentLockId'},
        {text:'Proposed Lock ID', dataIndex:'proposedLockId'},
        {text:'Current Status', dataIndex:'currentStatus'},
        {text:'Proposed Status', dataIndex:'proposedStatus'}
    ],
    dockedItems: [{
        dock:'bottom',
        defaults:{
            margin:5,
            border:true,
            xtype:'panel'
        },
        items:[{
            xtype:'combobox',
            fieldLabel: 'Lock Type',
            emptyText: '[Lock Type]'
        },{
            xtype:'combobox',
            fieldLabel: 'Lock Status',
            emptyText: '[Lock Type]'
        },{
            xtype:'button',
            text: 'Search'  
        }]    
    },{
        dock:'bottom',
        xtype: 'pagingtoolbar',
        pageSize:24
    }]
});

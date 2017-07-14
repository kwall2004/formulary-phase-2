Ext.define('Atlas.plan.view.carriers.LOBs', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    alias: 'widget.plan-carriers-lobs',
    title: '~lobs',

    controller: 'plan-carriers-lobs',

    dialogxtype: 'plan-carriers-lobform',
    dialogxtypecontroller: 'plan-carriers-lobform',
    dialogwidth: 500,
    dialogheight: 200,
    rowdblclick: 'ongrdDoubleClick',
    listeners: {
        select: 'onLOBSelect',
        rowdblclick: 'onLOBGrdDoubleClick'
    },

    tbar:[
        '->',
        {
            iconCls: 'x-fa fa-plus-circle',
            handler: 'onAddButtonClick',
            alignment: 'right',
            reference: 'btnAddLOB',
            disabled:true,
            text: 'Add LOB'
        },
        {
            iconCls: 'x-fa fa-remove',
            handler: 'onRemoveButtonClick',
            alignment: 'right',
            reference:'btnRemoveLOB',
            disabled:true,
            text: 'Delete LOB'
        }

    ],

    viewModel: {
        type: 'common-shared-editgridmodel',
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: false,
                update: false,
                destroy: false
            }
        },
        stores: {
            carrierLOBs: {
                type:'plan-carrierLOBs'
            }
        }
    },

    bind:{
        store: '{carrierLOBs}'
    },
    columns: {
        defaults: {
            flex:1
        },
        items: [
            {text: 'LOB ID', dataIndex: 'carrierLOBId'},
            {text: 'LOB Name', dataIndex: 'lobName'}
        ]
    }

});
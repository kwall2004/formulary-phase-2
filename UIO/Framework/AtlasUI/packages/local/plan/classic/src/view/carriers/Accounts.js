Ext.define('Atlas.plan.view.carriers.Accounts', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    alias: 'widget.plan-carriers-accounts',
    title: '~accounts',

    controller: 'plan-carriers-accounts',

    dialogxtype: 'plan-carriers-accountform',
    dialogxtypecontroller: 'plan-carriers-accountform',
    dialogwidth: 500,
    dialogheight: 200,
    listeners: {
        select: 'onAccountSelect',
        rowdblclick: 'onAccountGrdDoubleClick'
    },

    tbar:[
        '->',
        {
            iconCls: 'x-fa fa-plus-circle',
            handler: 'onAddButtonClick',
            alignment: 'right',
            reference: 'btnAddAccount',
            disabled:true,
            text: 'Add Account'
        },
        {
            iconCls: 'x-fa fa-remove',
            handler: 'onRemoveButtonClick',
            alignment: 'right',
            reference:'btnRemoveAccount',
            disabled:true,

            text: 'Delete Account'
        }

    ],

    viewModel: {
        type: 'common-shared-editgridmodel', //required for editable grid
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: false,
                update: false,
                destroy: false
            }
        },
        stores: {
            accounts: {
                type:'plan-carrieraccounts'
            }
        }
    },

    bind:{
        store: '{accounts}'
    },

    columns: {
        defaults: {
            flex:1
        },
        items: [
            {text: 'Account Number', dataIndex: 'carrierAcctNumber' },
            {text: 'Account Name', dataIndex: 'accountName'}
        ]
    }

});
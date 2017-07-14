Ext.define('Atlas.pharmacy.view.PricingTemplate', {
    extend: 'Ext.Panel',
    controller: 'pricingtemplatecontroller',
    viewModel: 'pricingtemplateviewmodel',
    title: 'PricingTemplate',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    defaults: {
        anchor: '100%'
    },
    items: [
        {
            xtype: 'form',
            itemId:'frmcreatededitpharmacy',
            layout:'hbox',
            flex:1,
            items: [
                {
                    xtype: 'panel',
                    itemId: 'pnlFtypes',
                    title: 'Service Compensation',
                    height : '100%',
                    overflowY: true,
                    flex: 1
                },
                {
                    xtype: 'tabpanel',
                    itemId: 'tabPanelPharmacyContracts',
                    flex : .65,
                    height : '100%',

                    height:960,
                    flex:1,
                    listeners: {
                        'tabchange': 'tabPanelPharmacyContracts_tabchange'
                    }
                }
            ]
        },
        {
            itemId:'bbargroup',
            bbar: [

                '->',
                {xtype: 'button', text: 'Create a Pharmacy', iconCls: 'fa fa-plus-circle', handler: 'btnCreateAPharmacyClick'},
                {xtype: 'button', text: 'Edit', iconCls: 'fa fa-pencil-square-o', handler: 'btnEditClick',disabled:true},
                {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler: 'btnSaveClick',disabled:true},
                {xtype: 'button', text: 'Cancel', iconCls: 'fa fa-times', handler: 'btnCancelClick',disabled:true},
                {xtype: 'button', text: 'Delete', iconCls: 'fa fa-minus', handler: 'btnDeleteClick',disabled:true}

            ]
        }
    ]
});
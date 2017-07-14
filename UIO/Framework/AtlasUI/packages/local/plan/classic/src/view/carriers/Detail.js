Ext.define('Atlas.plan.view.carriers.Detail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-carriers-detail',
    title: '~details'

    // dockedItems:[
    //     {
    //         xtype: 'toolbar',
    //         dock: 'top',
    //         items:[
    //             '->',
    //             {
    //                 iconCls: 'x-fa fa-edit',
    //                 handler: 'onEditClick',
    //                 bind:{
    //                     disabled: '{!canEdit}'
    //                 },
    //                 text: 'Edit'
    //             },
    //             {
    //                 iconCls: 'x-fa fa-toggle-on',
    //                 handler: 'onActivateClick',
    //                 bind:{
    //                     disabled: '{!canActivate}'
    //                 },
    //                 text: 'Activate'
    //             },
    //             {
    //                 iconCls: 'x-fa fa-floppy-o',
    //                 handler: 'onDoneClick',
    //                 bind:{
    //                     disabled: '{!isEditing}'
    //                 },
    //                 text: 'Save'
    //             },
    //             {
    //                 iconCls: 'x-fa fa-ban',
    //                 handler: 'onCancelClick',
    //                 bind:{
    //                     disabled: '{!isEditing}'
    //                 },
    //                 text: 'Cancel'
    //             }
    //         ]
    //     }
    // ],
    //
    // scrollable: true,
    // bodyPadding: 10,
    // layout: 'center',
    // items: [
    //
    //     {
    //         xtype: 'panel',
    //         width: 800,
    //         //layout: 'hbox',
    //         items: [
    //             {
    //                 defaults: {
    //                     labelWidth: 175,
    //                     flex: 1,
    //                     xtype: 'displayfield',
    //                     minWidth: 350
    //                 },
    //                 items:[
    //                     {
    //                         fieldLabel: 'Carrier ID',
    //                         hidden: true
    //                     },{
    //                         fieldLabel: 'Carrier Name',
    //                         bind: '{masterRecord.carrierName}'
    //
    //                     },{
    //                         fieldLabel: 'Service Location'
    //                     },{
    //                         fieldLabel: 'Address 1'
    //                     },{
    //                         fieldLabel: 'Address 2'
    //                     },{
    //                         fieldLabel: 'City'
    //                     },{
    //                         fieldLabel: 'State'
    //                     },{
    //                         fieldLabel: 'Zip'
    //                     }
    //
    //                 ]
    //             },
    //             {
    //                 xtype: 'container',
    //                 layout: 'hbox',
    //                 defaults: {
    //                     flex: 1,
    //                     height: 400,
    //                     margin: 25
    //                 },
    //                 items:[
    //                     {
    //                         xtype: 'plan-carriers-accounts'
    //                     },
    //                     {
    //                         xtype: 'plan-carriers-lobs'
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]

});
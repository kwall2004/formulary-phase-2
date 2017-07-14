Ext.define('Atlas.plan.view.group.DUR', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    alias: 'widget.plan-group-dur',

    dialogxtype: 'plan-group-durform',
    dialogxtypecontroller: 'plan-group-durform',
    dialogwidth: 500,
    dialogheight: 200,


    viewModel: {
        type: 'common-shared-editgridmodel',
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: true,
                update: true,
                destroy: true
            }
        }
    },
    bind:{
        store: '{durs}'
    },
    columns:{
        defaults:{
            flex:1,
            editor: {
                allowBlank: false
            }
        },
        items: [
            {text: 'DUR Type', dataIndex: 'durTypeDescription'},
            {text: 'Severity Level', dataIndex: 'durSeverityLevelDescription'},
            {text: 'Action', dataIndex: 'durAction'}
        ]}

});
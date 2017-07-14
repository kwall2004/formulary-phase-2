Ext.define('Atlas.plan.view.group.Enrollment', {
    alias: 'widget.plan-group-enrollment',
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
   //  controller: 'plan-group-enrollment',
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
    tbar:[{
        xtype:'textfield',
        emptyText: 'Enter search term',
        fieldLabel: 'Search'
    },{
        iconCls: 'x-fa fa-search'
    }],
    bind:{
        store: '{enrollments}'
    },
    columns:{
        defaults:{
            flex:1,
            editor: {
                allowBlank: false
            }
        },
        items: [
            {text: 'Member ID', dataIndex: ''},
            {text: 'Last Name', dataIndex: ''},
            {text: 'First Name', dataIndex: ''},
            {text: 'Plan', dataIndex: ''},
            {text: 'LOB', dataIndex: ''},
            {text: 'Effective Date', dataIndex: ''},
            {text: 'Term Date', dataIndex: ''},
            {text: 'SSN', dataIndex: ''},
            {text: 'Third Party', dataIndex: ''},
            {text: 'Address', dataIndex: ''},
            {text: 'City', dataIndex: ''},
            {text: 'State', dataIndex: ''},
            {text: 'Zip', dataIndex: ''},
            {text: 'Phone', dataIndex: ''}
        ]}
});
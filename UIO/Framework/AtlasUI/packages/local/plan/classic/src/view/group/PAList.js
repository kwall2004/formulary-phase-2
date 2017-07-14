Ext.define('Atlas.plan.view.group.PAList', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    alias: 'widget.plan-group-palist',
    // controller: 'pharmacygroupsetup',


    dialogxtype: 'plan-group-palistform',
    dialogxtypecontroller: 'plan-group-palistform',
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
        store: '{palists}'
    },
    columns:{
        defaults:{
            flex:1,
            editor: {
                allowBlank: false
            }
        },
        items: [
            {text: 'PA Name', dataIndex: 'paName'},
            {text: 'Std Response', dataIndex: 'standardResponse'},
            {text: 'Approval Criteria', dataIndex: 'progressProgramName'},
            {text: 'Progress Prog Name', dataIndex: 'approvalCriteria'}
        ]}

});
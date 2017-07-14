/**
 * Created by T3852 on 9/26/2016.
 */
Ext.define('Atlas.portals.view.rxmember.Forms', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxmemberforms',
    title: 'Documents & Forms',
    layout: 'fit',

    items: [{
        xtype: 'grid',
        title: 'Documents & Forms',
        cls: 'card-panel',
        controller: 'forms',
        viewModel: 'formsviewmodel',
        bind: '{formsStore}',

        columns: [
            {
                text: 'Attachment',
                xtype: 'actioncolumn',
                align: 'center',
                items: [{
                    xtype: 'button',
                    handler: 'displayForm',
                    iconCls: 'x-fa fa-paperclip',
                    tooltip: 'PDF Attachment'
                }]
            },
            {
                text: 'Document',
                dataIndex: 'ListDescription',
                flex: 2
            }
        ]
    }]
});
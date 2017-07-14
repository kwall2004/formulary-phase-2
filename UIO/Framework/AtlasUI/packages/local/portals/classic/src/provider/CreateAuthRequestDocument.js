Ext.define('Atlas.portals.view.provider.CreateAuthRequestDocument', {
    extend: 'Ext.window.Window',
    xtype: 'providercreateauthdoc',
    controller: 'providercreateauthdoc',
    title: 'Document Master',
    scrollable: true,
    width: 600,

    items: [{
        xtype: 'grid',
        forceFit: true,
        height: 500,

        bbar: ['->',{
            xtype: 'filefield',
            reference: 'fileUpload',
            fieldLabel: 'File Upload',
            width: 400
        },{
            xtype: 'button',
            text: 'Attach',
            handler: 'onAttachClick'
        },'->'],

        columns: [{
            text: 'Job #',
            dataIndex: 'jobNum'
        },{
            text: 'Date',
            dataIndex: 'submitDate'
        },{
            text: 'Description',
            dataIndex: 'jobDesc'
        },{
            text: 'Job Type',
            dataIndex: 'jobType',
            hidden: true
        },{
            text: 'RowNum',
            dataIndex: 'rowNum',
            hidden: true
        },{
            text: 'Actions'
        }]
    }]
});
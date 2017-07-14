/**
 * Created by c4539 on 1/24/2017.
 */
Ext.define('Atlas.portals.provider.AuthAttachmentWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsProviderAuthAttachmentWindow',
    controller: 'portalsProviderAuthAttachmentWindow',

    items: [{
        xtype: 'gridpanel',
        reference: 'attachmentGridRef',
        height: 300,
        maxHeight: 300,
        minHeight: 300,
        bind: {
            store: '{documents}'
        },
        columns: [{
            dataIndex: 'jobNum',
            text: 'Job #'
        }, {
            dataIndex: 'submitDate',
            text: 'Date'
        }, {
            dataIndex: 'jobDesc',
            text: 'Description',
            width: 200
        }, {
            dataIndex: 'jobType',
            text: 'Job Type',
            hidden: true
        }, {
            dataIndex: 'rowNum',
            text: 'Row Num',
            hidden: true
        }, {
            xtype: 'actioncolumn',
            width: 30,
            tooltip: 'View',
            items: [{
                handler: 'onViewAttachment',
                iconCls: 'x-fa fa-download'
            }]
        }]
    }, {
        xtype: 'form',
        reference: 'uploadForm',
        bodyPadding: 10,
        title: 'File Attachment',
        layout: {
            type: 'hbox',
            align: 'center'
        },
        items: [{
            xtype: 'filefield',
            name: 'fileToUpload',
            maxWidth: 350,
            minWidth: 350,
            width: 350,
            fieldLabel: 'File Upload',
            buttonConfig: {
                margin: '-2 3 0 5'
            }
        }, {
            xtype: 'button',
            reference: 'submit',
            text: 'Attach',
            handler: 'onSubmit'
        }]
    }]
});
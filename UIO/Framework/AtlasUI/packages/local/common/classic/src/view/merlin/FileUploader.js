/**
 * Created by g2304 on 11/18/2016.
 */
Ext.define('Atlas.common.view.merlin.FileUploader', {
    extend: 'Ext.panel.Panel',
    xtype: 'merlin.fileuploader',
    //height: 200, width: 300,
   // width:500,
    padding: 10,
    controller: 'fileuploader',
    itemId: 'fileUploadGrid',
    viewModel: {
        stores: {
            fileStore: {
                fields: ['name', 'size', 'file', 'status', 'description', 'keyType', 'fileType']
            }
        },
        data: {
            keyType: null,
            documentIDList: [],
            fileType: null,
            endpoint: null
        }
    },
    layout: 'fit',

    items: [{
        //multiSelect: true,
        itemId: 'fileUploaderGrid',
        xtype: 'grid',
        columns: [{
            header: 'Name',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Description',
            dataIndex: 'description',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowblank: false
            }
        }, {
            header: 'Size',
            dataIndex: 'size',
            flex: 1,
            renderer: Ext.util.Format.fileSize
        }, {
            header: 'Status',
            dataIndex: 'status',
            flex: 1,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                var color = "grey";
                if (value == "Ready") {
                    color = "blue";
                } else if (value == "Uploading") {
                    color = "orange";
                } else if (value == "Uploaded") {
                    color = "green";
                } else if (value == "Error") {
                    color = "red";
                }
                metaData.tdStyle = 'color:' + color + ';';
                return value;
            }
        }],

        plugins: {
            ptype: 'rowediting',
            clicksToEdit: 2
        },

        viewConfig: {
            emptyText: 'Drop Files Here',
            deferEmptyText: false
        },
        listeners: {
            drop: {
                element: 'el',
                fn: 'onDrop'
            },

            dragstart: {
                element: 'el',
                fn: 'addDropZone'
            },

            dragenter: {
                element: 'el',
                fn: 'addDropZone'
            },

            dragover: {
                element: 'el',
                fn: 'addDropZone'
            },

            dragleave: {
                element: 'el',
                fn: 'removeDropZone'
            },

            dragexit: {
                element: 'el',
                fn: 'removeDropZone'
            }
        },
        bind: {store: '{fileStore}'}

    }],

    bbar: [
        '->',
        {
            text: "Upload",
            handler: 'uploadFiles'
        }
        //, {
        //    text: "Delete All",
        //    handler: 'removeAllFiles'
        //}, {
        //    text: "Delete Uploaded",
        //    handler: 'removeUploadedFiles'
        //}
        , {
            text: "Delete",
            handler: 'removeSelectedFiles'
        }
    ]
});
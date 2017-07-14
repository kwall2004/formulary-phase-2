/**
 * Created by T4317 on 10/25/2016.
 */

var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
    startCollapsed: true,
    hideGroupedHeader: true,
    groupHeaderTpl: '<span style="font-weight:bold">{name}</span>'
});



Ext.define('Atlas.common.view.sharedviews.ContactLog', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    alias: 'widget.contactlog',
    xtype: 'common-contactlog',
    Model: 'Atlas.common.model.ContactLog',
    controller: 'common-contactlogcontroller',
    reference: 'contactlogpage',
    closable: true,
    dialogwidth: 950,
    dialogheight: 825,
    layout: 'fit',
    height: '100%',

    dialogxtype: 'contactlogwindow',
    itemId:'gridContactloglist',

    //features: [groupingFeature],
    viewModel: {
        type: 'common-shared-editgridmodel',
        data: {
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: true,
                update: true,
                destroy: true
            },
            createDisabled: true,
            editDisable: true,
            destroyDisabled: true

        },
        stores: {
            contactlog: {
                // model: 'Atlas.common.model.ContactLog',
                // session: true,
                // remoteSort: true,
                // remoteFilter: true
                type:'common-contactLog'
            }
        }
    },

    listeners: {
        itemclick: 'contractlog_rowclick',
        itemdblclick: 'contractlog_itemdblclick'
    },


    plugins: [
        'gridfilters'
    ],
     bind: {
        store: '{contactlog}'
    },
   /* features: [{
        startCollapsed: false,
        groupHeaderTpl: '<span style="font-weight:bold">{name}</span>'
    }],*/
    columns: {
        defaults: {
            flex : 3.5
        },
        items: [
            {text: 'Case #', dataIndex: 'CaseNum', sortable: true,    filter: {
                type: 'string'
            }},
            {text: 'Subject', dataIndex: 'subject'},
            {text: 'Reason', dataIndex: 'Reason1',
                renderer: function(value, metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }},
            {text: 'Status', dataIndex: 'CallStatusInfo',
                filter: {
                    type: 'list'
                }},
            {text: 'User', dataIndex: 'contactUser'},
            {text: 'Type', dataIndex: 'ContactTypeInfo'},
            {text: 'CallTime ', dataIndex: 'callDateTime',renderer:'localizeDateTime'},
            {text: 'Last modified By', dataIndex: 'LastModifiedBy', hidden:true},
            {text: 'Last modified date', dataIndex: 'LastModified', hidden:true,format: 'm/d/Y h:i:s A', renderer:'localizeDateTime'},
            {text: 'Plan Group ID', dataIndex: 'planGroupId', hidden:true},
            {text: 'Updated Date Time', dataIndex: 'updatedDatetime', hidden:true,format: 'm/d/Y h:i:s A', renderer:'localizeDateTime'}

        ]
    },
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        flex : 1,
        items: [
            {
                text: 'Add',
                iconCls: 'fa  fa-plus-circle',
                reference: 'addcontactlog',
                handler: 'onAdd'
            },
            {
                text: 'Update',
                iconCls: 'fa fa-pencil-square-o',
                reference: 'updatecontactlog',
                handler: 'onEdit'

            },
            {
                text: 'Delete',
                iconCls: 'fa  fa-minus-circle',
                reference: 'deletecontactlog',
                handler: 'onRemoveButtonClick'
            }]
    }, {
        dock: 'bottom',
        displayInfo: true,
        flex : 1,
        xtype: 'pagingtoolbar',
        bind: {
            store: '{contactlog}'
        },
        listeners: {
            afterrender: function(pt){
                if (this.up('member-membertoolbar') === this.up('merlinworkspace').getReferences().workspaceTabs.activeTab){
                    var btnRefresh = pt.down('#refresh');

                    btnRefresh.onBefore('click', function(btn){
                        btn.up('pagingtoolbar').getStore().getProxy().setExtraParam('pKeyValue', btn.up('contactlog').getViewModel().get('contactlogmasterrecord').recipientID);
                    });
                }
            }
        }
    }]
});
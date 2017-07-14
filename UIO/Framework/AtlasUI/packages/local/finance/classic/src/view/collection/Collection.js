Ext.define('Atlas.finance.view.collection.Collection', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-collection',

    controller: 'finance-collection',
    viewModel: 'finance-collection',

    title: 'Collection/Credit',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaults: {
        anchor: '100%'
    },

    tbar: [{
        xtype: 'segmentedbutton',
        itemId:'itemIdsegmentedbutton',
        allowDepress: false,
        autoDestroy: true,
        items: [{
            text: 'Search by',
            hint: '[Letter ID]',
            action: 'letterId',
            iconCls: 'x-fa fa-folder',
            pressed: true,
            handler:'onSearchTypeToggle'
        }]//,
        // listeners: {
        //     toggle: 'onSearchTypeToggle'
        // }
    },{
        xtype: 'uxsearchfield',
        reference: 'searchfield',
        width: 150,
        bind: {
            emptyText: '[Letter ID]'
        },
        listeners: {
            search: 'onSearch'
        }
    },
        {
            text: 'Advanced Search',
            itemId:'btnAdvancedSearch',
            iconCls: 'x-fa fa-search',
            handler: 'onAdvancedSearch'
        },
        {
            text: 'Create New',
            hint: 'Letter Type',
            action: 'createNew',
            iconCls: 'x-fa fa-plus',
            handler:'onSearchTypeToggle'
        }
    ,{
            xtype: 'combo',
            name: 'lettertype',
            fieldLabel: 'Type',
            displayField: 'LetterName',
            valueField: 'LetterNameID',
            bind: {
                store: '{letterslist}'
            },
            itemId:'itemidlettertype',

            queryMode: 'local',
            emptyText: '[Letter Type]',
            forceSelection: true,
            selectOnFocus: false,
            width: 210,
            labelWidth: 30
        },
        {
            xtype:'membertypeahead',
            fieldLabel: 'Member:',
            itemId:'itemIdmembertypeaheadbox',
            name: 'member',
            width: 300,
            labelWidth: 52,
            listeners: {
                select: 'setMemberInfo'
            }
        },{
            xtype: 'combo',
            name: 'plangroup',
            fieldLabel: 'Plan Group',
            displayField: 'planGroupName',
            emptyText:'Select Plan Group',
            valueField: 'planGroupId',
            bind: {
                store: '{memberplanstore}'
            },
            itemId:'itemidplangroup',
            queryMode: 'local',
            forceSelection: true,
            selectOnFocus: false,
            width: 260,
            labelWidth: 65
        }],

    items: [{
        xtype: 'grid',
        reference: 'collectioncreditsearchgrid',
        bind: {
            store: '{storeCollectioncreditDetailExt}'
        },
       flex:1,
        tbar: [
            {xtype: 'button', text: 'Add', itemId:'btnaddcollection', iconCls: 'x-fa fa-plus-circle', handler: 'onAddClick', disabled: true},
            {xtype: 'button', text: 'Update', itemId:'btnupdatecollection' ,iconCls: 'x-fa fa-edit', handler: 'onEditClick', disabled: true},
            {xtype: 'button', text: 'Delete', itemId:'btndeletecollection', iconCls: 'x-fa fa-minus-circle', handler: 'onDeleteClick', disabled: true}
        ],
        columns: {
            items: [{
                text: 'Claim ID',
                dataIndex: 'transactionID'
            },{
                text: 'Service Date',
                dataIndex: 'serviceDate',
                renderer: function(value) {
                    if(!value)
                        return '';
                    var format = value.split('-');
                    return  format[1]+'/'+format[2]+'/'+format[0];
                }
            },{
                text: 'Drug Name',
                dataIndex: 'drugName'
            },{
                text: 'Amount',
                dataIndex: 'amtAdjusted',
                renderer: function(value) {
                    return '<font class="m-red-color">'+ Ext.util.Format.currency(value, '$', 2) + '</font>';
                }
            },{
                text: 'Create Date',
                dataIndex: 'createDate',
                renderer: function(value) {
                    if(!value)
                        return '';
                    var format = value.split('-');
                    return  format[1]+'/'+format[2]+'/'+format[0];
                }
            },{
                text: 'Created By',
                dataIndex: 'createBy'
            },{
                text: 'Carrier',
                dataIndex: 'Carrier'
            },{
                text: 'Account',
                dataIndex: 'Account'
            },{
                text: 'LOB',
                dataIndex: 'LOB'
            }]
        },
        listeners: {
            itemclick: 'collectioncreditsearchgrid_itemclick'
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            keepParams: true,
            pageSize: 25,
            bind: {
                store: '{storeCollectioncreditDetailExt}'
            }
        }]
    },
    {
        xtype: 'form',
        width: '30%',
        itemId:'frmmemberdetails',
        scrollable: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'fieldset',
            title: 'Member Details',
            collapsible: true,
            defaults: {
                xtype: 'displayfield'
            },
            items: [ {
                xtype:'container',
                layout: 'hbox',
                defaults: {
                    xtype:'displayfield'
                },
                items:[{
                    xtype:'displayfield',
                    fieldLabel:'Status'
                }, {
                    userCls: 'fa fa-flag m-green-color',
                    itemId:'pnlActiveStatus',
                    hidden:true
                }, {
                    itemId:'pnlActiveWordStatus',
                    value:'<font  class="m-green-color "> <strong>Active</strong></font>',
                    hidden:true
                }, {
                    userCls: 'fa fa-flag m-red-color',
                    itemId:'pnlInActiveStatus',
                    hidden:true
                }, {
                    itemId:'pnlInActiveWordStatus',
                    value:'<font class="m-red-color "> Inactive</font>',
                    hidden:true
                }]
            },{
                fieldLabel: 'MeridianRx ID:',
                bind: '{loadrecord.recipientID}'
            },{
                fieldLabel: 'Member Name:',
                bind: '{loadrecord.membernamewithfirstandlast}'
            },{
                fieldLabel: 'Address:',
                bind: '{loadrecord.homeaddress1}'
            },{
                fieldLabel: 'City, State:',
                bind: '{loadrecord.homecityandstate}'
            },{
                fieldLabel: 'Home Phone:',
                bind: '{loadrecord.homephoneContactInfo}'
            }]
        },{
            xtype: 'fieldset',
            title: 'Statement Total',
            collapsible: true,
            defaults: {
                xtype: 'displayfield'

            },
            items: [{
                fieldLabel: 'Statement Total',
                bind: '{loadrecord.total}'
            }]
        },{
            xtype: 'fieldset',
            title: 'Letter Detail',
            collapsible: true,
            defaults: {
                xtype: 'displayfield'
            },
            items: [{
                fieldLabel: 'Create Date:',
                bind: '{loadrecord.LetterCreatedDate}'
            },{
                fieldLabel: 'Created By:',
                bind: '{loadrecord.LetterCreatedBy}'
            },{
                fieldLabel: 'Approved Date:',
                bind: '{loadrecord.LetterApproveDate}'
            },{
                fieldLabel: 'Approved By:',
                bind: '{loadrecord.LetterApproveBy}'
            },{
                fieldLabel: 'Sent Date:',
                bind: '{loadrecord.LetterSentDate}'
            },{
                fieldLabel: 'Sent By:',
                bind: '{loadrecord.LetterSentBy}'
            },{
                fieldLabel: 'Hours Remaining:',
                bind: '{loadrecord.HourRemaining}'
            }]
         }, {
                xtype: 'fieldset',
                title: 'Notes',
                itemId: 'fsNotes',
                width: '100%',
                height: '100%',
                layout: 'vbox',
                flex: 1,
                items: [
                    {
                        xtype: 'collectioncheckmaster.notes',
                        width: '100%',
                        height: '100%',
                        flex: 1,
                        parentSystemId: ''
                    }
                ]
            }
        ]
    }],

    bbar: [
        {
            xtype: 'combo',
            name: 'assignto',
            itemId:'itemassignto',
            fieldLabel: 'Assign To:',
            labelWidth: 50,
            displayField: 'userName',
            valueField: 'userName',
            allowBlank:false,
            queryMode: 'local',
            bind: {
                store: '{assignuser}'
            }
        },
        '->',
        {xtype: 'button', itemId:'btnCreateLetter', text: 'Create Letter', iconCls: 'x-fa fa-paste', handler: 'onCreateLetterClick', disabled: true},
        {xtype: 'button', itemId:'btnView', text: 'View', iconCls: 'x-fa fa-file-pdf-o', handler: 'onViewPdfClick', disabled: true},
        {xtype: 'button', itemId:'btnApprove', text: 'Approve' ,iconCls: 'x-fa fa-check', handler: 'onApproveClick', disabled: true},
        {xtype: 'button', itemId:'btnSend', text: 'Send' ,iconCls: 'x-fa fa-envelope', handler: 'onSendClick', disabled: true},
        {xtype: 'button', itemId:'btnDelete', text: 'Delete', iconCls: 'x-fa fa-minus-circle', handler: 'onDeleteLetterClick', disabled: true}
    ]
});
/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Inquiry Member Search
 * Description: Gives users a place to search for Members
 */
Ext.define('Atlas.portals.view.provider.AuthInquiryMemberSearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderAuthInquiryMemberSearch',
    controller: 'portalsProviderAuthInquiryMemberSearchController',
    viewModel: {
        stores: {
            memberDetailStore: {
                model: 'Atlas.portals.provider.model.MemberMasterExtPortal'
            }
        }
    },
    items:[{
        xtype:'gridpanel',
        layout: 'fit',
        height: 400,
        reference: 'memberGridRef',
        defaults: {
            flex: 1
        },
        tbar: {
            xtype: 'toolbar',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Member Name',
                reference: 'memberNameRef',
                labelWidth: 135,
                flex: 1,
                listeners: {
                    keyup: 'onMemberKeyPress'
                },
                enableKeyEvents: true
            }, {
                xtype: 'button',
                text: 'Search',
                handler:'onSearchClick'
            },{
                xtype: 'button',
                text: 'Select',
                handler:'onSelectClick'
            }]
        },
        bind: {
            store: '{memberDetailStore}'
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            pageSize: 10,
            bind: {
                store: '{memberDetailStore}'
            },
            displayInfo: true
        }],
        listeners: {
            rowdblclick: 'onRowDblClick'
        },
        columns:[{
            xtype: 'actioncolumn',
            align: 'center',
            sortable: 'false',
            hidden: true,
            items: [{
                xtype: 'button',
                tooltip: 'Select this member',
                iconCls: 'x-fa fa-check',
                handler: 'onSelectAction'
            }]
        },{
            text: 'MemberID',
            dataIndex: 'memberID'
        },{
            text: 'First name',
            dataIndex: 'firstName'
        },{
            text: 'Middle name',
            dataIndex: 'middleName'
        },{
            text: 'Last name',
            dataIndex: 'lastName'
        },{
            text: 'LOB',
            dataIndex: 'LobId'
        },{
            text: 'Gender',
            dataIndex: 'gender'
        },{
            text: 'Birth Date',
            dataIndex: 'birthDate',
            renderer: function(value){
                return Ext.util.Format.date(value, 'm/d/Y');
            }
        }]
    }]
});
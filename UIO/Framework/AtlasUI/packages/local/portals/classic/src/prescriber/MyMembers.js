/**
 * Created by m4542 on 10/3/2016.
 */
Ext.define('Atlas.portals.view.prescriber.MyMembers', {
    extend: 'Ext.panel.Panel',
    title: 'My Members',
    xtype: 'portals-prescriber-MyMembers',
    viewModel: 'myMembersViewModel',
    controller: 'myMembersController',
    requires: [
        'Ext.panel.Panel',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.feature.Grouping'
    ],
    layout: 'border',

    items: [{
        xtype: 'form',
        reference: 'membersform',
        cls: 'card-panel',
        region: 'north',
        layout: 'hbox',
        title: 'Selection',
        iconCls: 'fa fa-search',
        name: 'testing',

        items: [{
            xtype: 'toolbar',

            items: [{
                xtype: 'portalmembertypeahead',
                fieldLabel: 'Member',
                name: 'member',
                reference: 'member',
                hideLabel: false,
                width: 380
            },
                {
                    xtype: 'plangrouptypeahead',
                    fieldLabel: 'Plan Search',
                    valueField: 'planGroupName',
                    name: 'plan',
                    reference: 'plan',
                    emptyText: '[e.g. MHP Medicare 2011]',
                    hideLabel: false,
                    width: 350
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    iconCls: 'fa fa-search',
                    listeners: {
                        click: 'myMembersSearch'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Reset',
                    iconCls: 'fa fa-refresh',
                    listeners: {
                        click: 'resetFields'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-external-link',
                    text: 'Export To Excel',
                    handler: 'exportToExcel'
                },
                {
                    xtype: 'button',
                    text: 'Request Access',
                    iconCls: 'fa fa-plus-circle',
                    buttonAlign: 'center',
                    listeners: {
                        click: 'addUser'
                    }
                }]
        }]
    },

    {
        xtype: 'grid',
        region: 'center',
        reference: 'myMemberGrid',
        cls: 'card-panel',
        plugins: [{
            ptype: 'gridexporter'
        }],
        columns: [
            {
                xtype: 'actioncolumn',
                menuDisabled: true,
                sortable: false,
                hideable: false,
                align: 'center',
                handler: 'onMemberGridClick',
                items: [
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-user',
                        text: 'View'
                    }
                ]
            },
            {text: 'MeridianRx ID', dataIndex: 'RecipientId', flex: 1},
            {text: 'Name', dataIndex: 'fullName', flex: 1},
            {text: 'Plan', dataIndex: 'Plan', flex: 1},
            {text: 'Account', dataIndex: 'Account', flex: 1},
            {text: 'LOB', dataIndex: 'LOB', flex: 1},
            {text: 'Last Fill', dataIndex: 'LASTFill', flex: 1},
            {text: 'Fill Date', dataIndex: 'Filldate', flex: 1,
                renderer: function(date) {
                    return Atlas.common.utility.Utilities.formatDate(date, 'm/d/Y');
                }
            }
        ],
        bind: {
            store: '{membersstore}'
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            pageSize: 2,
            displayInfo: true
        }]
    }]


});
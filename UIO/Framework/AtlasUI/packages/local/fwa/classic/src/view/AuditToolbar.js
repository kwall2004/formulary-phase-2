/**
 * Created by d3973 on 11/1/2016.
 */
Ext.define('Atlas.fwa.view.AuditToolbar', {
    extend: 'Ext.panel.Panel',
    xtype: 'view-fwaaudittoolbar',

    layout: 'border',
    bodyBorder: false,

    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Audit ID'
        },
            '-',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                text: 'Advanced Search'
            },
            '-',
            {
                xtype: 'displayfield',
                iconCls: 'x-fa fa-star-o'
            },
            '->',
            {
                xtype: 'button',
                iconCls: 'fa fa-search-plus',
                text: 'Menu',
                menu: [{
                    text: 'Audit Details'
                }, {
                    text: 'Audit Questions'
                }, {
                    text: 'Audit Scripts'
                }, {
                    text: 'Contact Log'
                }]
            }]
    }],
    items: [{
        collapsible: true,
        region: 'west',
        floatable: false,
        width: 300,
        items: [{
            title: 'Pharmacy Info',
            iconCls: 'x-fa fa-home',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Pharmacy'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'NCPDP'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'NPI'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'DEA'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Type'
            }]
        }, {
            title: 'Contact Information',
            iconCls: 'x-fa fa-info-circle',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Address'
            }, {
                xtype: 'displayfield'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Contact'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Title'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Phone'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Fax'
            }]
        }, {
            title: 'Contract Status',
            iconCls: 'x-fa fa-file-text-o',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Status'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Effective Date'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Term Date'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Contracts'
            }]
        }]
    },{
        region: 'center',
        items: [{
            xtype: 'tabpanel',
            items: [{
                xtype: 'view-fwaauditdetails'
            }]
        }]
    }]
});
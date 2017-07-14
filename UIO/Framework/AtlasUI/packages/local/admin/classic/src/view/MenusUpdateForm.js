Ext.define('Atlas.admin.view.MenusUpdateForm', {
    extend: 'Ext.form.Panel',
    border: false,
    frame: false,
    modal: true,
    alias: 'widget.admin-menusadminform',
    defaults: {
        labelWidth: 180,
        flex: 1,
        xtype: 'textfield',
        minWidth: 400,
        allowBlank: true
    },
    items: [
        {
            fieldLabel: 'Menu ID',
            name: 'menuID',
            bind: {
                disabled: '{masterRecord.menuID > 0}',
                hidden: '{masterRecord.menuID == 0}'
            },
            allowBlank: false
        }, {
            fieldLabel: 'Menu Title',
            name: 'menuTitle',
            allowBlank: false,
            emptyText: ''
        }, {
            fieldLabel: 'Program Name',
            name: 'programName',
            emptyText: ''
        }, {
            fieldLabel: 'Icon Name',
            name: 'iconName',
            emptyText: ''
        }, {
            xtype: 'numberfield',
            hideTrigger: true,
            allowDecimals: false,
            fieldLabel: 'Max Running',
            name: 'maxRunning',
            emptyText: ''
        }, {
            xtype: 'numberfield',
            hideTrigger: true,
            allowDecimals: false,
            fieldLabel: 'Menu Order',
            name: 'menuOrder',
            emptyText: ''
        },
        {
            xtype: 'combobox',
            itemId: 'dashboardId',
            fieldLabel: 'Dashboard List',
            emptyText: '[Select a Dashboard]',
            bind: {
                store: '{dashboardItems}'
            },
            queryMode: 'local',
            displayField: 'dashboardName',
            valueField: 'dashboardId',
            multiSelect: true,
            listConfig: {
                getInnerTpl: function (dashboardName) {
                    return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + dashboardName + '}</div>';
                }
            }
        },
        {
            fieldLabel: 'Default Menu',
            xtype: 'checkbox',
            labelWidth: 190,
            name: 'defaultMenu',
            emptyText: ''
        },
        {
            xtype: 'combobox',
            name: 'allowExtAccess',
            fieldLabel: 'External Access',
            emptyText: 'External Acccess Allowed',
            store: {
                data: [
                    {text: 'Yes', value: 'yes'},
                    {text: 'No', value: 'no'}
                ]
            },
            displayField: 'text',
            valueField: 'value'
        },
        {
            fieldLabel: 'X type',
            name: 'xType',
            allowBlank: true
        }, {
            fieldLabel: 'Icon Cls',
            name: 'iconCls',
            emptyText: '',
            allowBlank: true
        }, {
            fieldLabel: 'Route',
            name: 'route',
            emptyText: '',
            allowBlank: true
        },
        {
            fieldLabel: 'Leaf',
            xtype: 'checkbox',
            labelWidth: 190,
            name: 'leaf'
        }
    ]

});
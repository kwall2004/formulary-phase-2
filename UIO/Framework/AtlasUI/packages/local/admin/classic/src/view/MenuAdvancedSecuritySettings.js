/**
 * Created by n6684 on 12/9/2016.
 */
Ext.define('Atlas.admin.view.MenuAdvancedSecuritySettings', {
    extend: 'Ext.window.Window',
    xtype: 'admin_menuadvancedsecuritysettings',
    modal : true,
    //itemId : 'custompricewindow',
    title: 'Advanced Security Setting',
    viewModel: 'admin_menuadvancedsecuritysettingsviewmodel',
    controller: 'admin_menuadvancedsecuritysettingscontroller',
    closable: true,
    scrollable: true,

    items: [
        {
            xtype: 'form',
            layout: 'hbox',
            itemId: 'formWinEnrollment',
            items: [
                {
                    xtype: 'fieldset',
                    title:'By Group',
                    itemId: 'flsbygroup',
                    defaults: {
                        labelWidth: 135
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Group Name',
                            name:'hiddenfieldslist',
                            disabled:true,
                            itemId:'txtgpgroupname'
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Hidden Fields',
                            name:'hiddenfieldslist',
                            bind: {value:'{groupdata.hiddenfieldslist}'}
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Disabled Fields',
                            name:'fieldsList',
                            bind: {value:'{groupdata.fieldsList}'}
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Disabled Controls',
                            name:'operationalControls',
                            bind: {value:'{groupdata.operationalControls}'}
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'flsbyuser',
                    title:'By User',
                    disabled:true,
                    defaults: {
                        labelWidth: 150
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            editable: true,
                            itemId : 'cbxusergroup',
                            displayField: 'userName',
                            valueField: 'userName',
                            reference: 'refcbxusergroup',
                            fieldLabel: 'By User',
                            emptytext:   '[Select a Service Type]',
                            allowBlank: false,
                            queryMode: 'local',
                            bind: {
                                //value:'TypeCode{0}',
                                store: '{users}'
                            },
                            multiSelect: true,
                            forceSelection: true,
                            triggerAction: 'all',
                            listConfig: {
                                tpl: Ext.create('Ext.XTemplate',
                                    '<div style="margin-top:5px"><tpl for=".">',
                                    '<div class="boundList x-boundlist-item" style="display:table">',
                                    '<span style="display:table-cell; vertical-align: middle;"><div class="chkbox" value={userName}></div>{userName}</span>',
                                    '</div>',
                                    '</tpl></div>'
                                )
                            }
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Hidden Fields',
                            itemId: 'txtusareagroupname',
                            allowBlank: false
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Disabled Fields',
                            itemId: 'txtusareadisabledfields',
                            allowBlank: false
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Disabled Controls',
                            itemId: 'txtusareadisabledcontrols',
                            allowBlank: false
                        }
                    ]
                }
            ]
        }

    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    itemId: 'btnSaveWin',
                    iconCls: 'fa fa-save',
                    listeners: {

                        click: 'btnsave'
                    }
                },
                {
                    xtype: 'button',
                    itemId : 'btnCancelWin',
                    text: 'Cancel',
                    iconCls: 'fa fa-remove',
                    listeners: {
                        click: 'btncancel'
                    }
                }
            ]
        }
    ]

});
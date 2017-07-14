Ext.define('Atlas.letter.view.LetterSetting', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    //extend: 'Ext.grid.plugin.RowEditing',
    xtype: 'LetterSetting',
    title: 'Letter Setting',
    layout: 'fit',
    controller: 'lettersettingctrl',
    viewModel: 'lettersettingvm',
    bind: '{letterslistdata}',
    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2
    },
    columns: [
        {
            text: 'Letter Name ID',
            dataIndex: 'LetterNameID',
            flex: 1,hidden:true
        },
        {
            text: 'Letter Name',
            dataIndex: 'LetterName',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'LetterName',
                allowBlank: false
            }
        },
        {
            text: 'Program Name',
            dataIndex: 'LetterProgramName',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'LetterProgramName'
            }
        },
        {
            text: 'Template Name',
            dataIndex: 'LetterTemplateName',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'LetterTemplateName'
            }
        },
        {
            text: 'System Id',
            dataIndex: 'systemID',
            flex: 1,
            hidden:true
        },
        {
            text: 'Template Fields',
            dataIndex: 'TemplateFields',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'TemplateFields'
            }
        },
        {
            text: 'Module Name',
            dataIndex: 'moduleName',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'moduleName'
            }
        },
        {
            text: 'Auth Letter ID',
            dataIndex: 'authLetterId',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'authLetterId'
            }
        },
        {
            text: 'Auth Letter Type',
            dataIndex: 'authLetterType',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'authLetterType'
            }
        },
        {
            text: 'FromType',
            dataIndex: 'LetterFrom',
            flex: 1,
            editor: {
                xtype: 'combobox',
                displayField: 'LetterFrom',
                valueField: 'LetterFrom',
                dataIndex: 'LetterFrom',
                queryMode: 'local',
                store: {
                    fields: ['LetterFrom', 'LetterFromDisplay'],
                    data : [
                        {"LetterFrom":"MRx", "LetterFromDisplay":"MRx"},
                        {"LetterFrom":"Plan", "LetterFromDisplay":"Plan"}
                    ]
                }
            }
        }
    ],
    tbar: [
        {
            xtype: 'button',
            text: 'Add',
            cls: 'btn-small',
            iconCls: 'x-fa fa-plus-square',
            listeners: {
                click: 'onActionClick'
            }
        },
        {
            xtype: 'button',
            text: 'Remove',
            cls: 'btn-small',
            iconCls: 'x-fa fa-minus-square',
            listeners: {
                click: 'onActionClick'
            }
        }
    ],
    bbar: ['->',
        {
            xtype: 'button',
            text: 'Save',
            cls: 'btn-small',
            iconCls: 'x-fa fa-floppy-o',
            listeners: {
                click: 'onActionClick'
            }
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        xtype: 'pagingtoolbar',
        bind:{
            store: '{letterslistdata}'
        },
        displayInfo: true
    }]
});

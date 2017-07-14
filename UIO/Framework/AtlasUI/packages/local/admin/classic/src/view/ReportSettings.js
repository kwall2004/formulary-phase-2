
Ext.define('Atlas.admin.view.ReportSettings', {
    extend: 'Ext.grid.Panel',
    xtype: 'view-admin-reportsettings',
    title: 'Report Settings',
    controller: 'admin-reportsettings',
    viewModel: {
        stores: {
            reportList: {
                model:'Atlas.common.model.ReportsList',
                remoteSort: true,
                remoteFilter: true
                //sorter:'reportName'
            },

            reportListProxy: {

            },

            reportFilter: {
                model:'Atlas.common.model.ReportFilters'
            },
            usergroups: {
                model: 'Atlas.common.model.UserGroupWithAll',
                remoteSort:true,
                autoLoad: false,
                remoteFilter:true
                /* listeners: {
                 load: function (store) {
                 store.insert(0, {groupName: 'All',groupId:'0'});
                 }
                 }*/
            },
            DataPACategories: {

                model: 'Atlas.common.model.shared.ListDetailModel',
                autoLoad: false
            }
        }
    },
    reference: 'admin-reportsettings',
    //multiSelect: true,
    bind:{
        store:'{reportList}'
    },
    columns: {
        defaults: {
            flex: 1
        },
        items: [
            {text:'Report Module',dataIndex: 'ReportModule', editor:{
                allowBlank:false,
                reference:'cbReportModule',
                xtype:'combo',
                store:['MERLIN', 'DATAPA'],
                listeners: {
                    change: 'ReportModuleOnChange'
                }

            }},
            {text:'Category',dataIndex: 'CategoryId',
                renderer:'CategoryRenderer',
                editor:{
                    allowBlank:true,
                    queryMode: 'local',
                    xtype:'combo',
                    reference:'cbCategory',
                    emptyText: 'Select a Category',
                    displayField:'ListDescription',
                    valueField: 'ListItem',
                    bind:{
                        store:'{DataPACategories}'
                    }


                }},
            {text:'Report Object',dataIndex: 'ReportObject', editor:{
                xtype:'combo',
                allowBlank:false,
                queryMode: 'local',
                reference:'cbReportObject',
                emptyText: 'Select a Object',
                store:['Report', 'Batch']
            }},
            {text:'Report Name',dataIndex: 'reportName',
                editor:{
                    allowBlank:false,
                    xtype:'textfield'},
                filter: {
                    type: 'string'
                }
            },
            {text:'Program Name',dataIndex: 'programName', editor:{
                allowBlank:false,
                xtype:'textfield'
            }},
            {text:'Run Mode',dataIndex: 'runMode',
                renderer: function (value, metaData) {
                    var recvalue;

                    if(value === 1) {
                        recvalue = 'Immediate';
                    } else {
                        recvalue = 'Background';
                    }

                    return recvalue;
                },
                editor:{
                    allowBlank:false,
                    xtype:'combo',
                    store:{
                        fields: ['val', 'name'],
                        data : [
                            {"val":1, "name":"Immediate"},
                            {"val":2, "name":"Background"}
                        ]
                    },
                    displayField:'name',
                    valueField: 'val'
                }},
            {
                text: 'User Group',
                dataIndex: 'userGroupsData',
                width:'100px',
                editor: {
                    xtype: 'combobox',
                    bind: {
                        store: '{usergroups}'
                    },
                    queryMode: 'local',
                    displayField: 'groupName',
                    valueField: 'groupId',
                    multiSelect: true,
                    listConfig: {
                        getInnerTpl: function(groupName) {
                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + groupName + '}</div>';
                        }
                    }
                },

                renderer: 'renderUserGroup'
            },

            {text:'Report by Drug Class',dataIndex: 'RptByDrugClass',
                editor:{
                    xtype: 'checkbox',
                    inputValue: true,
                    uncheckedValue: false
                },
                xtype:'checkcolumn',
                disabled:true,
                filter:{type:'boolean'}
            },
            {text:'Data Access Filter',dataIndex: 'dataAccessFilterFlag',
                editor:{
                    xtype: 'checkbox',
                    inputValue: true,
                    uncheckedValue: false
                },
                xtype:'checkcolumn',
                disabled:true,
                filter:{type:'boolean'}
            },
            {text:'Expand Plan Level',dataIndex: 'usePlanLevelDATree',
                editor:{
                    xtype: 'checkbox',
                    inputValue: true,
                    uncheckedValue: false
                },
                xtype:'checkcolumn',
                disabled:true,
                filter:{type:'boolean'}
            },
            {
                xtype: 'widgetcolumn',
                align: 'center',
                width: 100,
                hideable : false,
                flex:0,
                widget: {
                    xtype: 'container',
                    bind: true,
                    defaults: {
                        xtype: 'tool',
                        viewModel: true
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Reject',
                            width: 75,
                            iconCls: 'x-action-col-icon x-fa fa-undo',
                            bind: {
                                hidden: '{!record.isNeedUpdate}',
                                tooltip: 'Reject '
                            },
                            listeners: {
                                click: 'onReject'
                            }
                        }
                    ]
                }
            }
        ]
    },
    plugins:[
        {
            ptype: 'rowediting',
            clicksToEdit: 2,
            id: 'rowEditreportsettings',
            autoCancel: false,
            listeners: {
                'canceledit': 'cancelEditButton',
                edit: 'afterEditing',
                beforeedit: 'beforeEditing'
            }
        },
        {
            ptype: 'gridfilters'
        }
    ]
    ,
    listeners: {
        rowclick:'grdRowClick'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    reference: 'addButton',
                    iconCls: 'x-fa  fa-plus-circle',
                    listeners: {
                        click: 'onRecordAdd'
                    }
                }, {
                    xtype: 'button',
                    text: 'Remove',
                    reference: 'removeButton',
                    iconCls: 'x-fa  fa-minus-circle',
                    listeners: {
                        click: 'removeRecord'
                    },
                    bind:{
                        disabled: '{!admin-reportsettings.selection}'
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'x-fa fa-save',
                    reference: 'saveButton',
                    bind:{
                        disabled: '{!reportsettings.needsSync}'
                    },
                    listeners: {
                        click: 'saveReportList'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-tasks',
                    reference: 'setViewButton',
                    text: 'Set/View Report Filter',
                    listeners: {
                        click: 'onViewReportFilterClick'
                    }
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            pageSize : 18,
            displayInfo: 'true',
            bind: {
                store: '{reportList}'
            }
        }
    ]


});

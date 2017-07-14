Ext.define('Atlas.claims.view.detail.ClaimDetailStatusClaimDetailMedical', {
    extend: 'Ext.Container',
    requires: [
        'Ext.layout.container.Column',
        'Atlas.claims.controller.detail.ClaimDetailStatusClaimDetailMedicalController',
        'Atlas.claims.view.detail.ClaimDetailDiagCodeField'        
    ],
    controller: 'claimDetailMedical',

    itemId: 'ClaimDetailStatusClaimDetailMedicalID',

    xtype: 'ClaimDetailStatusClaimDetailMedical',    
    items: [{
        xtype: 'fieldset',
        title: 'Claim Detail Medical',
        collapsible: true,
        items: [{
            xtype: 'fieldcontainer',
            items: [{
                xtype: 'fieldset',
                layout: 'hbox',
                defaults:{
                    margin: '5 15 5 0',
                    padding: '3 20 3 20'
                },
                items:[{ 
                        xtype: 'button',
                        text: 'Adjudicate'
                    }, { 
                        xtype: 'button', 
                        text: 'Reject'
                    }, { 
                        xtype: 'button', 
                        text: 'Reject Line'
                    }, { 
                        xtype: 'button', 
                        text: 'Remit History'
                    }, { 
                        xtype: 'button', 
                        text: 'Hold'
                    }, { 
                        xtype: 'button', 
                        text: 'Release'
                    }, { 
                        xtype: 'button', 
                        text: 'Release Void'
                    }, { 
                        xtype: 'button', 
                        text: 'Forward'
                    }, { 
                        xtype: 'button', 
                        text: 'View Claim'
                    }, { 
                        xtype: 'button', 
                        text: 'Appeal'
                    }]
                }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'fieldcontainer',
                    width: 350,
                    defaults: {
                        labelWidth: 200,
                        margin: '0 0 0 0'
                    },
                    items: [{
                        xtype: 'fieldcontainer',
                        width: 350,
                        defaults: {labelWidth: 50},
                        items: [{
                            xtype: 'combobox',
                            margin: '0 0 0 0',
                            fieldLabel: 'LOB',
                            emptyText: ' - Please select - ',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            store: {
                                fields: ['abbr', 'name'],
                                data: [
                                    {"abbr": "Medicaid","name": "Medicaid"},
                                    {"abbr": "Medicare","name": "Medicare"},
                                    {"abbr": "Comm-HMO","name": "Comm-HMO"}
                                ]
                            }
                        }]
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Illness Date',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Injury Date',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Disch Date',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Patient Paid',
                        value: 'TBD'
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Other Insurance',
                        defaultType: 'checkboxfield',
                        items: [{
                            name      : 'insurance',
                            inputValue: '1',
                            id        : 'checkbox1'
                        }]
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    width: 350,
                    defaults: {
                        labelWidth: 200,
                        margin: '0 0 0 0'
                    },
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'From DOS',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Disabled From',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Prior Auth #',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'POS:',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Ptn. Account#',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Other Ins Pd',
                        value: 'TBD'
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    width: 350,
                    defaults: {
                        labelWidth: 200,
                        margin: '0 0 0 0'
                    },
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Through DOS',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'First Illness Date',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Disabled To',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Orig Ref#',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Resubmit Code',
                        value: 'TBD'
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    width: 350,
                    defaults: {
                        labelWidth: 200,
                        margin: '0 0 0 0'
                    },
                    items: [{ 
                        xtype: 'button',
                        text: 'OB Visits',
                        margin: '0 10px 0 0'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'LMP Date',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Admit Date',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Total Charges',
                        value: 'TBD'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Fee Schedule',
                        value: 'TBD'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Conditions Related To',
                labelwidth: 100,
                height: 152,
                width: '24%',
                margin: '0 10 0 0',
                style: 'float:left',
                items: [{
                    xtype: 'fieldcontainer',
                    defaultType: 'checkboxfield',
                    items: [{
                        boxLabel: 'Employment',
                        bind: '{employment}'
                    }, {
                        boxLabel: 'Auto Accident',
                        bind: '{autoAccident}'
                    }, {
                        boxLabel: 'Other',
                        bind: '{other}'
                    }]
                },{
                    xtype: 'combobox',
                    fieldLabel: 'State',
                    queryMode: 'local',
                    displayField: 'name',
                    emptyText: ' - Please select - ',
                    valueField: 'abbr',
                    store: {
                        fields: ['abbr', 'name'],
                        data: [
                            {"abbr": "Michigan","name": "Michigan"},
                            {"abbr": "Illinois","name": "Illinois"},
                            {"abbr": "Iowa","name": "Iowa"}
                        ]
                    }
                }]
            },{
                xtype: 'fieldset',
                title: 'Diagnosis Codes',
                width: '75%',
                layout: 'hbox',
                labelwidth: 200,    
                itemId: 'diagCodeSet',
                items: [{
                    id: 'leftDiag'
                }, {
                    id: 'centerDiag'
                }, {
                    id: 'rightDiag'
                }]
            }, {
                xtype: 'button',
                text: 'Add Diag Code',
                iconCls: 'pictos pictos-add2',
                cls: 'claimdetail_button',
                align: 'bottom',
                style: 'margin-left: 25%;',
                listeners: {
                    click: function() {
                        this.up().up().up().getController('claimDetailMedical').addNewField();                                    
                    }
                }
            }, {
                xtype: 'grid',
                height: 200,
                width: '100%',
                columns: [{
                    xtype: "checkcolumn",
                    columnHeaderCheckbox: true,//this setting is necessary for what you want
                    store: '', // (you need to put the grids store here)
                    sortable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: "value_flag",
                    listeners: {
                        checkchange: function(column, rowIndex, checked){
                             //code for whatever on checkchange here
                        }
                    }
                },{
                    text: 'L#',
                    flex: 1
                },{
                    text: 'Status',
                    flex: 1
                },{
                    text: 'Serv From',
                    flex: 1
                },{
                    text: 'Serv To',
                    flex: 1
                },{
                    text: 'ProcCode',
                    flex: 1
                },{
                    text: 'Mod 1',
                    flex: 1
                },{
                    text: 'Mod 2',
                    flex: 1
                },{
                    text: 'Mod 3',
                    flex: 1
                },{
                    text: 'Mod 4',
                    flex: 1
                },{
                    text: 'Associated Diag Code',
                    flex: 1
                },{
                    text: 'Paid',
                    flex: 1
                },{
                    text: 'Units',
                    flex: 1
                }],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults:{
                    margin: '5 5 5 0',
                    padding: '3 10 3 10'
                },
                items:[{
                    xtype: 'button',
                    text: 'Add'
                }, {
                    xtype: 'button',
                    text: 'Update'
                }, {
                    xtype: 'button',
                    text: 'Delete',
                    margin: '5 400 5 0'
                }, {
                    xtype: 'button',
                    text: 'Reject Line'
                }, {
                    xtype: 'button',
                    text: 'Hold Line'
                }, {
                    xtype: 'button',
                    text: 'Release Line',
                    margin: '5 520 5 0'
                }, {
                    xtype: 'button',
                    text: 'Cancel'
                }, {
                    xtype: 'button',
                    text: 'Save'
                }]
            }]
        }]
    }]
});
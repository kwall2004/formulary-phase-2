/*
 Last Developer: Paul Glinski
 Previous Developers: []
 Origin: Merlin - Member
 Date: 7/14/2016
 Description: The demographic tab shows general information about the Member as well as information about there coverage and HEDIS.
 */
Ext.define('Atlas.member.view.Demographics', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-demographics',
    title: 'Demographics',
    controller: 'demographics',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            flex: 2.5,
            margin: '0 0 5 0',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            defaults: {
                bodyPadding: 2
            },
            // overflowY : 'scroll',
            items: [
                {
                    xtype:'panel',
                    layout:'vbox',
                    flex:1,
                    autoScroll:true,
                    cls : 'borderNone',
                    items:[
                        {
                            xtype: 'fieldset',
                            flex: 3.1,
                            width:'100%',
                            minHeight : 330,
                            //margin: '0 5 0 0',
                            title: 'Member General Information',
                            collapsible: true,  autoScroll:true,
                            // overflowY : 'scroll',
                            defaults: {
                                labelWidth: 130,
                                anchor: '98%',
                                xtype: 'displayfield'
                            },
                            items: [
                                {
                                    fieldLabel: 'First Name:',
                                    bind: '{masterrecord.firstname}'
                                },
                                {
                                    fieldLabel: 'Middle Name:',
                                    bind: '{masterrecord.middlename}'
                                },
                                {
                                    fieldLabel: 'Last Name:',
                                    bind: '{masterrecord.lastname}'
                                },
                                {
                                    fieldLabel: 'Suffix:',
                                    bind: '{masterrecord.suffix}'
                                },
                                {
                                    fieldLabel: 'Gender:',
                                    bind: '{masterrecord.gender}'
                                },
                                {
                                    fieldLabel: 'Birth Date:',
                                    renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                                    bind: '{masterrecord.birthDate}'
                                },
                                {
                                    fieldLabel: 'Age:',
                                    bind: '{masterrecord.age}'
                                },
                                {
                                    fieldLabel: 'SSN:',
                                    bind: '{masterrecord.ssn}'
                                },
                                {
                                    fieldLabel: 'Language:',
                                    bind: '{masterrecord.languageDescription}'
                                },
                                {
                                    fieldLabel: 'Ethnicity/Race:',
                                    bind: '{masterrecord.race}'
                                },
                                {
                                    fieldLabel: 'Deceased Date:',
                                    renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                                    bind: '{masterrecord.deathDate}'
                                },
                                {
                                    fieldLabel: 'Primary Subscriber:',
                                    bind: '{masterrecord.primarySubscriber}'
                                },
                                {
                                    fieldLabel: 'HICN:',
                                    bind: '{masterrecord.HICN}'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 0.9,
                            width:'100%',
                            minHeight : 100,
                            //margin: '0 5 0 0',
                            title: 'Plan Group Information',  autoScroll:true,
                            collapsible: true,
                            // overflowY : 'scroll',
                            defaults: {
                                labelWidth: 130,
                                anchor: '98%',
                                xtype: 'displayfield'
                            },
                            items: [
                                {
                                    fieldLabel: 'Carrier:',
                                    bind: '{masterrecord.CarrierName}'
                                },
                                {
                                    fieldLabel: 'Account:',
                                    bind: '{masterrecord.AccountName}'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype:'panel',
                    layout:'vbox',
                    flex:1,
                    autoScroll:true,
                    cls : 'borderNone',
                    items:[
                        {
                            xtype: 'fieldset',
                            flex: 2.5,
                            width:'100%',
                            minHeight : 230,autoScroll:true,
                            //margin: '0 5 0 0',
                            title: 'Member Contact Information',
                            collapsible: true,
                            // overflowY : 'scroll',
                            defaults: {
                                labelWidth: 130,
                                anchor: '98%',
                                xtype: 'displayfield'
                            },
                            items: [
                                {
                                    fieldLabel: 'Address:',
                                    bind: '{masterrecord.Home_Address1} ' + ' '+ '{masterrecord.Home_Address2}' +'</br>'  + ' {masterrecord.Home_City},  {masterrecord.Home_State} {masterrecord.homeZip}'
                                },

                                {
                                    fieldLabel: 'County:',
                                    bind: '{masterrecord.countyDescription}'
                                },
                                {
                                    fieldLabel: 'Home Phone:',
                                    bind: '{masterrecord.homePhone}'
                                },
                                {
                                    fieldLabel: 'Work Phone:',
                                    bind: '{masterrecord.workPhone}'
                                },
                                {
                                    fieldLabel: 'Cell Phone:',
                                    bind: '{masterrecord.cellPhone}'
                                },
                                {
                                    fieldLabel: 'Email:',
                                    bind: '{masterrecord.email_ContactInfo}'
                                }
                            ]
                        },
                        {

                            xtype: 'fieldset',
                            flex: 1.5,
                            width:'100%',
                            minHeight : 150,autoScroll:true,
                            //margin: '0 5 0 0',
                            title: 'Guardian/Responsible Party Information',
                            collapsible: true,
                            // overflowY : 'scroll',
                            defaults: {
                                labelWidth: 130,
                                anchor: '98%',
                                xtype: 'displayfield'
                            },
                            items: [
                                {
                                    fieldLabel: 'Name:',
                                    bind: '{masterrecord.respFirstName} {masterrecord.respMiddleName} {masterrecord.respLastName}'
                                },
                                {
                                    fieldLabel: 'Address:',
                                    bind: '{masterrecord.resp_address1}' + ' ' + '{masterrecord.resp_address2}' + ' '+ '</br> {masterrecord.resp_city}, {masterrecord.resp_state} {masterrecord.respZip}'
                                },
                                {
                                    fieldLabel: 'Home Phone:',
                                    bind: '{masterrecord.respHomePhone}'
                                },
                                {
                                    fieldLabel: 'Work Phone:',
                                    bind: '{masterrecord.respWorkPhone}'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            flex: 1.5,
            margin: '0 0 5 0',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            defaults: {
                bodyPadding: 1
            },
            items: [
                {
                    flex: 1,
                    margin: '0 5 0 0',
                    title: 'Coverage',
                    xtype: 'gridpanel',
                    height: '50%',
                    width: '100%',
                    autoScroll: true,
                    loadMask: true,
                    bind: {
                        store: '{membercoveragehistorystore}'
                    },
                    columns: [
                        {
                            text: 'Member ID',
                            flex: 1,
                            dataIndex: 'tmemberId'
                        },
                        {
                            text:'Carrier',
                            flex:1,
                            dataIndex:'tCarrierName',
                            hidden:true
                        },
                        {
                            text: 'LOB',
                            flex: 1,
                            dataIndex: 'tCarrierLOBName'
                        },
                        {
                            text: 'Group',
                            flex: 1,
                            dataIndex: 'tPlanGroupName'
                        },
                        {
                            text: 'Effective Date',
                            flex: 1,
                            dataIndex: 'tEffDate',
                            xtype: 'datecolumn',
                            format:'m/d/Y'
                        },
                        {
                            text: 'Termination Date',
                            flex: 1,
                            dataIndex: 'tTermDate',
                            xtype: 'datecolumn',
                            format:'m/d/Y'
                        },
                        {
                            text: 'Coverage Code',
                            flex: 1,
                            dataIndex: 'coverageCode',
                            hidden: true
                        },
                        {
                            text: 'Alt. Ins. Carrier',
                            flex: 1,
                            dataIndex: 'tAltInsCarrierName',
                            hidden: true
                        },
                        {
                            text: 'Alt. Ins. Member ID',
                            dataIndex: 'tAltInsMemberID',
                            flex: 1,
                            hidden: true
                        },
                        {
                            xtype: 'widgetcolumn',
                            text: 'History',
                            flex: 1,hideable:false,
                            widget: {
                                xtype: 'button',
                                iconCls: 'fa fa-search',
                                handler: 'coverageHistory'
                            }
                        }
                    ]/*,
                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        displayInfo: 'true',
                        pageSize: 25,
                        bind: {
                            store: '{membercoveragehistorystore}'
                        }
                    }]*/
                },
                {
                    flex: 1,
                    margin: '0 5 0 0',
                    title: 'HEDIS',
                    xtype: 'gridpanel',
                    height: '50%',
                    width: '100%',
                    autoScroll: true,
                    loadMask: true,
                    features: [{
                        ftype: 'grouping',
                        groupHeaderTpl: '{name}',
                        hideGroupHeader: true
                    }],
                    listeners:{
                        itemmouseenter: function(view, record, item, index, e, options)
                        {
                            var rec = '<b>'+ record.getData().measureDesc +'</b>'+ ': '+ record.getData().helpText;
                            Ext.fly(item).set({ 'data-qtip': rec });
                        }
                    },
                    bind: {
                        store: '{memberhedissummary}'
                    },
                    columns: [
                        {
                            text: 'Measure',
                            flex: 1,
                            dataIndex: 'measureDesc'
                        },
                        {
                            text: 'Sub Measure',
                            flex: 1,
                            dataIndex: 'subMeasure'
                        },
                        {
                            text: 'Due By',
                            flex: 1,
                            dataIndex: 'dueBy'
                            ,formatter: 'date("m/d/Y")'
                        },
                        {
                            text: 'Help Text',
                            flex: 1,
                            dataIndex: 'helpText',
                            hidden: true
                        }
                    ]/*,
                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        displayInfo: 'true',
                        pageSize: 25,
                        bind: {
                            store: '{memberhedissummary}'
                        }
                    }]*/
                }
            ]
        }
    ]
});
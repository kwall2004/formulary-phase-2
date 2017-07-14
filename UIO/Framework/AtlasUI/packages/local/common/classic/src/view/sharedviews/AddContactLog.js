/**
 * Created by T4317 on 9/19/2016.
 */

Ext.define('Atlas.common.view.AddContactLog', {
    extend: 'Ext.panel.Panel',
    xtype: 'contactlogwindow',
    viewModel: {
        stores: {
            contactreceiverlist:{
                model: 'Atlas.common.model.ContactReceiverList',
                remoteSort:true,
                remoteFilter: true
            },
            contactcodelist:{
                model:'Atlas.common.model.ContactCode',
                remoteSort:true,
                remoteFilter: true
            },

            memberplanstore: {
                model: 'Atlas.member.model.MemberPlanGroups',
                autoLoad:false
            },

            storegetUserDetailList :{
                model: 'Atlas.pharmacy.model.SendMissingLetterLetterDetail',
                autoLoad: false
            },

            storeuserdetails:{
                model: 'Atlas.common.model.UserList',
                autoLoad: false
            },

            storelistuserqueue:{
                model: 'Atlas.common.model.shared.ListModel',
                autoLoad: false
            }
        }
    },
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        defaults:{
            xtype:'displayfield'
        },
        items:[
            {
                xtype: 'panel',
                iconCls: 'fa fa-folder-open-o',
                width:23,
                iconMask: false
            },
            {
                fieldLabel:'Case#',
                labelWidth:50,
                itemId:'lblcase',
                bind:{
                    value:'{case}'
                }
            }
            , {
                xtype: 'panel',
                iconCls: 'fa fa-calendar-check-o',
                width:23,
                iconMask: false
            }
            ,{
                fieldLabel:'Date',
                labelWidth:50,
                bind:{
                    value:'{date}'
                }
            }
            , {
                xtype: 'panel',
                iconCls: 'fa fa-clock-o',
                width:23,
                iconMask: false
            },{
                fieldLabel:'Time',
                labelWidth:50,
                bind:{
                    value:'{time}'
                }
            }, {
                xtype: 'panel',
                iconCls: 'fa fa-user',
                width:23,
                iconMask: false
            },{
                fieldLabel:'Created by',
                labelWidth:50,
                bind:{
                    value:'{createdby}'
                }
            }]
    },{
        dock:'bottom',
        xtype:'toolbar',
        items:[{
            text:'Update',
            reference:'updatebutton',
            iconCls: 'fa fa-save',
            listeners:{
                click: 'saveContactLog'
            }
        },{
            text:'Add',
            reference:'addbutton',
            iconCls: 'fa fa-save',
            listeners:{
                click: 'saveContactLog'
            }
        },{
            text:'Cancel',
            iconCls: 'fa fa-times',
            listeners:{
                click: 'onCancelClick'
            }
        },{
            text:'Print',
            reference:'printbutton',
            iconCls: 'fa fa-print',
            listeners:{
                click: 'printbuttonContactLog'
            }
        },'->',{
            xtype: 'panel',
            iconCls: 'fa fa-user',
            width:23,
            iconMask: false
        },{
            xtype: 'displayfield',
            value:'Last Modified By:'
        },{
            xtype: 'displayfield',
            reference:'lastmodifiedby'
        },{
            xtype: 'panel',
            iconCls: 'fa fa-calendar-check-o',
            width:23,
            iconMask: false
        },{
            xtype: 'displayfield',
            value:'On:'
        },{
            xtype: 'displayfield',
            reference:'on'
        }]
    }],
    items: [{
        modelValidation: true,
        layout:{
            type:'hbox',
            align:'stretch'
        },

        items:[
            {
                xtype:'form',
                reference:'callerform',
                cls: 'card-panel',
                margin:10,
                title: 'Caller Info',
                flex:1,
                defaults: {
                    xtype:'textfield',
                    margin:5
                },
                items:[
                    {
                        xtype:'container',
                        layout: 'hbox',
                        width:450,
                        defaults: {
                            xtype:'textfield',
                            margin:1
                        },
                        items:[{
                            fieldLabel:'Caller Name',
                           // name:'callerLastName',
                            reference:'contactlogcallerLastName',
                            emptyText:'Caller Last Name'
                        },{
                            fieldLabel:'',
                          //  name:'callerFirstName',
                            reference:'contactlogcallerFirstName',
                            emptyText:'Caller First Name'
                        }]
                    }
                    ,
                    {
                        xtype:'container',
                        layout: 'hbox',
                        flex:1,
                        defaults: {
                            xtype:'textfield',
                            margin:1
                        },
                        items:[{
                            xtype:'numberfield',
                            fieldLabel: 'Caller Phone',
                            name:'callerPhone',
                            reference:'contactlogcallerPhone',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                        },{
                            xtype:'checkbox',
                            fieldLabel: '1st call resolution',
                            reference :'resolvedFirstCall',
                            name: 'resolvedFirstCall',
                            checked:true
                        }]
                    }
                    ,{
                        xtype:'container',
                        layout: 'hbox',
                        flex:1,
                        items:[{
                            fieldLabel: 'Reason 1',
                            itemId:'itemidReason1',
                            xtype: 'reasontypeahead',
                            //forceSelection:true,
                            minChars:1,
                            reference: 'reason1',
                            enableKeyEvents: true,
                            width:449,
                            listeners:{
                                select: 'onreasonselect',
                                keyup:'onkeyup'
                            }
                        }]
                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            fieldLabel: 'Reason 2',
                            itemId:'itemidReason2',
                            //forceSelection:true,
                            minChars:1,
                            xtype: 'reasontypeahead',
                            reference: 'reason2',
                            enableKeyEvents: true,
                            width:450,
                            listeners:{
                                select: 'onreasonselect',
                                keyup:'onkeyup'
                            }
                        }]

                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            fieldLabel: 'Reason 3',
                            xtype: 'reasontypeahead',
                            //forceSelection:true,
                            itemId:'itemidReason3',
                            minChars:1,
                            reference: 'reason3',
                            enableKeyEvents: true,
                            width:450,
                            listeners:{
                                select: 'onreasonselect',
                                keyup:'onkeyup'
                            }
                        }]
                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            fieldLabel: 'Prescriber',
                            name:'ProviderName',
                            xtype:'prescribertypeahead',
                            reference:'prescribertypeaheadbox',
                            itemId:'itemidprescribertypeahead',
                            //forceSelection:true,
                            width:450,
                            valueField: 'fullname',
                            listeners: {
                                select: function(prescriber,b,c,d) {
                                    prescriber.setValue(prescriber.lastSelection[0].data.npi +' '+  prescriber.lastSelection[0].data.fullname);
                                }
                            }
                        },{
                            xtype:'button',
                            iconCls:'fa fa-tag',
                            reference:'redirectPrescriber',
                            listeners:{
                                click:'redirectPage'
                            }
                        }]
                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            fieldLabel: 'Pharmacy',
                            name:'pharmacyName',
                            xtype:'providertypeahead',
                            //forceSelection:true,
                            reference:'providertypeaheadbox',
                            itemId:'itemidprovidertypeaheadbox',
                            width:450,
                            emptyText:'[e.g. Target]',
                            listeners: {
                                select: function(provider) {
                                    provider.setValue(provider.lastSelection[0].data.ncpdpId +' '+  provider.lastSelection[0].data.Name);
                                }
                            }
                        },{
                            xtype:'button',
                            iconCls:'fa fa-medkit',
                            reference:'redirectpharmacyName',
                            listeners:{
                                click:'redirectPage'
                            }
                        }]
                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            fieldLabel: 'Member',
                            name:'MemberName',
                            xtype:'membertypeahead',
                            //forceSelection:true,
                            itemId:'itemidmembertypeaheadbox',
                            reference:'membertypeaheadbox',
                            width:450,
                            listeners: {
                                select: 'setMemberInfo'
                            }
                        },{
                            xtype:'button',
                            iconCls:'fa fa-user',
                            reference:'redirectMemberName',
                            listeners:{
                                click:'redirectPage'
                            }
                        }]
                    },{

                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            fieldLabel:'Plan Group ID:',
                            emptyText: '[e.g. MHP Medicare 2011]',
                            name:'planGroupName',
                            xtype:'plangrouptypeahead',
                            //forceSelection:true,
                            reference:'plangrouptypeaheadbox',
                            width:450,
                            displayField:'planGroupName',
                            itemId:'itemidplangrouptypeaheadbox',
                            valueField:'planGroupId'
                        }]
                    },{

                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            xtype: 'combo',
                            name: 'plangroup',
                            fieldLabel: 'Plan Group ID:',
                            displayField: 'planGroupCode',
                            width:450,
                            emptyText:'Select Plan Group',
                            valueField: 'planGroupId',
                            bind: {
                                store: '{memberplanstore}'
                            },
                            itemId:'itemidplangroup',
                            reference:'refplangroup',
                            queryMode: 'local',
                            forceSelection: true,
                            listConfig: {
                                // Custom rendering template for each item
                                userCls: 'common-key-value-boundlist',
                                getInnerTpl: function() {
                                    return '<h4>{planGroupCode}</h4>' +
                                        '<h5>{planGroupName}</h5>'
                                }
                            },
                            hidden:true,
                            selectOnFocus: false,
                            listeners: {
                                select: 'setplangroupInfo'
                            }
                        }]
                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            xtype:'numberfield',
                            name:'TransactionID',
                            reference:'contactlogTransactionID',
                            fieldLabel: 'Claim ID',
                            hideTrigger: true,
                            value:0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                        },{
                            xtype:'button',
                            iconCls:'fa fa-folder',
                            reference:'redirectTransactionID',
                            listeners:{
                                click:'redirectPage'
                            }
                        }]
                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            xtype:'numberfield',
                            name:'MTMId',
                            reference:'contactlogMTMId',
                            fieldLabel: 'MTM ID',
                            value:0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                        },{
                            xtype:'button',
                            iconCls:'fa fa-link',
                            reference:'redirectMTMId',
                            listeners:{
                                click:'redirectPage'
                            }
                        }]
                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            xtype:'numberfield',
                            name:'AuthID',
                            reference:'contactlogAuthID',
                            fieldLabel: 'Auth ID',
                            value:0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                        },{
                            xtype:'button',
                            iconCls:'fa fa-link',
                            reference:'redirectAuthID',
                            listeners:{
                                click:'redirectPage'
                            }
                        }]
                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            xtype:'common-contacttypecombo',
                            name:'ContactTypeInfo',
                            reference:'contactlogtype',
                            fieldLabel:'Type'
                        }]},{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            xtype:'common-contactstatuscombo',
                            name:'callStatus',
                            reference:'contactlogstatus',
                            fieldLabel:'Status'
                        }]},{
                        xtype:'container',
                        layout: 'hbox',
                    flex:1,
                        items:[{
                            fieldLabel:'Subject',
                            reference:'contactlogsubject',
                            name:'subject',
                            width:450,
                            xtype: 'textfield'
                        }]}
                        ,{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            fieldLabel:'Description',
                            name:'description',
                            reference:'contactlogdescription',
                            width:450,
                            xtype: 'textarea'
                        },{
                            xtype:'button',
                            iconCls:'fa fa-search-plus',
                            hidden:true,
                            reference:'contactlogshowDescription',
                            handler:'showDescription'
                        }]

                    },{
                        xtype:'container',
                        layout: 'hbox',
                        items:[{
                            xtype: 'combo',
                            fieldLabel: 'Assign To',
                            name:'updatedBy',
                            reference:'assignto',
                            forceSelection:true,
                            allowBlank:false,
                            queryMode: 'local',
                            bind: {
                                store: '{storeuserdetails}'
                            },
                            displayField: 'userName',
                            valueField: 'userName'
                        },{
                            xtype:'displayfield',
                            reference:'assigntogroup'
                        }]
                    },{
                        hidden:true,
                        name:'systemId',
                        reference:'systemid'
                    }]
            },{
                defaults:{
                    xtype:'panel',
                    margin:10
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex:1,
                items:[{
                    title: 'Received From',
                    cls: 'card-panel',
                    flex:1,
                    layout:'hbox',
                    // Dynamically created in the init
                    items:[{
                        xtype: 'radiogroup',
                        reference:'receiveForm',
                        height:52,
                        columns:2,
                        listeners:{
                            change: 'onReceivedFormChange'
                        }
                    }]
                },{
                    title:'Contact Code',
                    cls: 'card-panel',
                    //scrollable:true,
                    items:[{
                        xtype: 'panel',
                        reference:'pnlcontactlog',
                        height:400,
                        scrollable:true
                    }],
                    dockedItems: [{
                        dock:'bottom',
                        xtype:'toolbar',
                        items:[{
                            text: 'View Notes',
                            reference:'viewNotesButton',
                            iconCls: 'fa fa-sticky-note',
                            hidden:false,
                            listeners:{
                                click:'launchNotesDialog'
                            }
                        },{
                            text: 'Add Notes',
                            reference:'addNotesButton',
                            iconCls: 'fa fa-plus',
                            hidden:false,
                            listeners:{
                                click:'launchNotesDialog'
                            }
                        }]
                    }]
                }]
            }]
    }]
});

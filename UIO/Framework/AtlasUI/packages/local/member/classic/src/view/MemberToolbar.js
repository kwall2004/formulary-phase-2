/*
 Last Developer: Paul Glinski
 Previous Developers: [Tremaine Grant]
 Origin: Merlin - Member
 Date: 7/26/2016
 Description: This toolbar appears at the top of all of the Member - member screens in merlin.
 */
Ext.define('Atlas.member.view.MemberToolbar', {
    extend: 'Ext.tab.Panel',
    xtype: 'member-membertoolbar',
    recipientID: 0,
    parentViewID: '',
    title: 'Member',
    controller: 'member',
    viewModel: 'member',
   // reference:'membertoolbar', //never set reference at the root. It's not needed and causes errors
   // itemId:'membertoolbar',//never set itemId at the root. It's not needed and causes errors
    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        // autoScroll:true,
        // overFlowX : 'scroll',

        items: [
            {
                xtype: 'segmentedbutton',
                items: [
                    {
                        text: 'MRx ID',
                        tooltip: 'Search by MRx ID',
                        action: 'recip'
                    },
                    {
                        text: 'Advanced',
                        tooltip: 'Search by Advanced',
                        action: 'advanced',
                        pressed: true
                    }
                ],
                listeners: {
                    toggle: 'onSearchTypeToggle'
                }
            },
            {
                xtype: 'membertypeahead',
                itemId:'cboMember',
                reference:'advancedtextbox',
                hidden:false,
                width:280,
                listeners: {
                    select: 'onMemberSelection'
                }
            },
            {
                xtype: 'textfield',
                hidden:true,
                reference:'recipId',
                emptyText:'[MRx ID]',
                maskRe: /[0-9]/,
                width:100,
                listeners:{
                    specialkey:'searchRecipId'
                }
            },
            { xtype:'combobox',fieldLabel:'Family Member',itemId:'cboMemberList', valueField:'recipientID', displayField:'MemberName',bind:{store:'{memberfamilystore}'},queryMode: 'local',listeners: {
                select: 'onMemberSelection'
            }},
            {
                xtype:'hidden',itemId:'hiddenRecipientID'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'MRx ID',labelWidth:40,
                bind: {
                    value: '{masterrecord.recipientID}'
                }
            },'-',
            {
                xtype: 'displayfield',
                fieldLabel: 'DOB',labelWidth:40,
                renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                bind: {
                    value: '{masterrecord.birthDate}'
                }
            },'-',
           {
                xtype: 'displayfield',itemId:'status',name:'status',userCls:'fa fa-flag',cls:'m-red-color m-flag-icon'
            },{
                xtype: 'displayfield',cls:'m-flag-status',width:60,itemId:'statusVal',
                bind: {
                    value: '{masterrecord.enrollmentStatus}'
                }
            },'-',
            {
                xtype: 'displayfield',itemId:'cocMember',
                bind: {
                    value: '{masterrecord.CoCMember}'
                },
                listeners:{
                    render: function(value){
                        var tooltips = [
                            {
                                target: value.id,
                                anchor:'top',
                                trackMouse: true,
                                items:[{
                                    xtype: 'container',
                                    width:100,
                                    height:25,
                                    html:'Coordinated Care Member'
                                }]
                            }];
                        Ext.each(tooltips, function(config) {
                            Ext.create('Ext.tip.ToolTip', config);
                        });
                    }
                }
            },'-',

            {
                xtype: 'displayfield',itemId:'hospice',
                bind: {
                    value: '{masterrecord.hospice}'
                }
            },'-',
            {
                xtype: 'displayfield',itemId:'progGroup',tooltip:'Program Code',
                bind: {
                    value: '{masterrecord.mcsProgGroupCode}'
                },
                listeners:{
                    render: function(value){
                        var tooltips = [
                            {
                                target: value.id,
                                anchor:'top',
                                trackMouse: true,
                                items:[{
                                    xtype: 'container',
                                    width:100,
                                    height:25,
                                    html:'Program Group Code'
                                }]
                            }];
                        Ext.each(tooltips, function(config) {
                            Ext.create('Ext.tip.ToolTip', config);
                        });
                    }
                }

            },
            {
                xtype: 'displayfield',itemId:'fostercare',
                bind: {
                    value: '{masterrecord.fosterCare}'
                }
            },

            '->',  {
                text: 'Order Docs',
                iconCls: 'fa fa-file-text-o',
                handler: 'orderDocsOnClick',
                bind: {
                    disabled: '{!canOrderDocs}'
                }
            },
            {
                xtype: 'button',
                iconCls: 'fa fa-phone',
                text: 'Contact', tooltip:'HEDIS Contact',
                handler: 'createContactHedisWindow',itemId:'btnContact',disabled:true

            },'-',
            {
                xtype: 'displayfield',itemId:'alerts',
                bind: {
                    value: 'Alerts: '+'{masterrecord.alerts}'
                },
                listeners:{
                    render: function(value){
                        var tooltips = [
                            {
                                target: value.id,
                                anchor:'top',
                                trackMouse: true,
                                items:[{
                                    xtype: 'container',
                                    html:'H:Hedis'
                                }]
                            }];
                        Ext.each(tooltips, function(config) {
                            Ext.create('Ext.tip.ToolTip', config);
                        });
                    }
                }
            },'-',
            {
                xtype: 'displayfield',itemId:'compAlert',
                bind: {
                    value: '{masterrecord.complianceAlert}'
                }
            },
            {
                xtype: 'button',
                reference: 'menu',
                text: 'Menu',
                iconCls: 'x-fa fa-bars',
                menu: {
                    plain: true,
                    listeners: {
                        click: 'onMenuClick'
                    }
                }
            }
            ]
    },
    defaults: {
        closable: true
    },
    initComponent: function() {
        var me = this;
        var curViewModel;
        curViewModel = this.getViewModel();
        if (me.isMemberPassedIn) {
            curViewModel.data.isMemberPassedIn = true;
            curViewModel.data.masterrecord = me.masterrecord;
        }
        else {
            curViewModel.data.isMemberPassedIn = false;
            curViewModel.data.masterrecord = null;

        }
        me.callParent();
    }



});
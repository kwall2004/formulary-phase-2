/**
 * Created by p3946 on 7/28/2016.
 */
Ext.define('Atlas.member.view.DemographicsOrderDocs', {
    extend: 'Ext.panel.Panel',

    xtype: 'member-demographicsorderdocs',
    controller: 'demographics',

    config: {
        firstName: null,
        middleName: null,
        lastName: null,
        planGroup: null,
        firstDocumentType: ""
    },

    initComponent: function () {

        var me = this;
        var memberPlanStoreList = [];
        var memberPlanStore = me.up().getViewModel().getParent().getStore('memberplanstore');
        var memberCoverageHistoryStore = me.up().getViewModel().getParent().getStore('membercoveragehistorystore');

        if(memberPlanStore && memberCoverageHistoryStore)
        {
            var coverageCollection = memberCoverageHistoryStore.queryBy(function(record,id){
                var effectiveDate = '';
                var termDate = '';
                if (record.get('tEffDate')) {
                    effectiveDate = Ext.util.Format.date(record.get('tEffDate'), 'Y/m/d');
                }
                if (record.get('tTermDate')) {
                    termDate = Ext.util.Format.date(record.get('tTermDate'), 'Y/m/d');
                }

                return ((effectiveDate && effectiveDate <= Ext.util.Format.date(Atlas.common.utility.Utilities.getLocalDateTime() , 'Y/m/d')) && (!termDate || termDate >= Ext.util.Format.date(Atlas.common.utility.Utilities.getLocalDateTime() , 'Y/m/d')));
            });

            var records = coverageCollection.items;

            if(records) {
                for (var i = 0; i < records.length; i++) {
                    var planRecord = memberPlanStore.findRecord('planGroupId',records[i].get('tPlanGroupID'),0,false,false,true );

                    if (planRecord) {
                        memberPlanStoreList.push(planRecord);
                    }

                }
            }
        }

        Ext.apply(this, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Order Documents',
                    iconCls: 'fa fa-info-circle',
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Description:',
                            value: 'Requested document will be sent to GMC to print and mail once request is sent.'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Documents',
                    iconCls: 'fa fa-file-text-o',
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'MeridianRx ID:',
                            itemId:'MrxId',
                            bind:{
                                value:'{masterrecord.recipientID}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Member Name:',
                            bind: {
                                value: me.getLastName() + ', ' + me.getMiddleName() + ' ' + me.getFirstName()
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'planGroupCombo',
                            itemId: 'planGroupCombo',
                            fieldLabel: 'Plan Group:',
                            queryMode: 'local',
                            bind: {
                                store:'{memberorderdocsplanstore}'

                            },
                            displayField: 'planGroupName',
                            valueField: 'planGroupId',
                            listeners:{select:'onPlanSelection'}
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Document Type:',
                            reference: 'docTypeCombo',
                            queryMode: 'local',
                            itemId:'letterTypeCombo',
                            bind: {
                                store: '{orderDocsListItems}'
                            },
                            displayField: 'name', valueField: 'value'
                        }
                    ]
                }
            ]
        });

        me.callParent();

        var memberOrderDocsPlanStore = me.up().getViewModel().getParent().getStore('memberorderdocsplanstore');
        if(memberOrderDocsPlanStore && memberPlanStoreList)
        {
            memberOrderDocsPlanStore.loadData(memberPlanStoreList);
        }

        var combo = me.down('#planGroupCombo');
        if (combo != null && memberOrderDocsPlanStore && memberOrderDocsPlanStore.data && memberOrderDocsPlanStore.data.items) {
            combo.setValue(memberOrderDocsPlanStore.data.items[0].get('planGroupId'));
            combo.setRawValue(memberOrderDocsPlanStore.data.items[0].get('planGroupName'));
        }
    },

    dockedItems: [
        {
            dock: 'bottom',
            xtype: 'toolbar',
            items: [

                {
                    xtype: 'container',
                    html: '<i class="fa fa-check-circle-o">&nbsp </i>'
                }, '->',
                {
                    xtype: 'button',
                    text: 'Send',
                    iconCls: 'fa fa-print',
                    handler: 'submitted'
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    iconCls: 'fa fa-times',
                    handler: function(){
                        this.up('window').close();
                    }
                }
            ]
        }
    ]
});
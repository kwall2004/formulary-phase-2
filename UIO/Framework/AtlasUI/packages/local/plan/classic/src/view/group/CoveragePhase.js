Ext.define('Atlas.plan.view.group.CoveragePhase', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget.plan-group-coveragephase',
    alias: 'widget.plan-group-coveragephase',
    title: '~coveragephase',

    controller: 'plan-group-coveragephase',

    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            alighnment: 'center',
            items: [
                {
                    // xtype: 'grid',
                    // extend:'Atlas.common.view.sharedviews.editablegrid.Grid',
                    xtype: 'grid',
                    reference: 'CoveragePhasegrid',

                    viewModel: {
                        type: 'common-shared-editgridmodel',
                        //id: 'refCoveragePhaseGrid',
                        reference: 'refCoveragePhaseGrid',
                        data:{
                            //note: this needs to move to controller with user permissions
                            userpermissions: {
                                create: true,
                                //update: true,
                                destroy: true
                            }
                        }
                    },
                    //id: 'CoveragePhasegrid',
                    columns:{
                        defaults:{
                            flex:1
                        },
                        items: [

                            {text: 'Plan Benefit', dataIndex: 'planBenefitId', renderer:'planBenefitRenderer',reference:'planBenefitId',
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'planBenefitId',
                                    emptyText: '',allowBlank: false,  bind: {store: '{coveragephaseplanbenefititems}'},
                                    listConfig: {
                                        getInnerTpl: function () {
                                            // here you place the images in your combo
                                            var tpl = '<div>' +
                                                    '<b>{planBenefitCode}</b><br/>' +
                                                    '{BenefitName}<br/>'
                                                    + '{CarrierName}<br/>' // this needs to be fixed
                                                ;
                                            return tpl;
                                        }
                                    },

                                    displayField:'BenefitName', valueField:'planBenefitId', hideTrigger:true,queryMode: 'remote',
                                    queryParam: 'pWhere', autoselect:true,minChars: 4,
                                    listeners:{
                                        beforequery: function (queryPlan) {
                                            var me = this;


                                            var coveragePhaseBenefits = this.up('plan-groups').getViewModel().getStore('coveragephaseplanbenefititems'),
                                                planGroupRecord = this.up('grid').findParentByType('tabpanel').lookupReference('plangroup').getSelection();

                                            if(queryPlan.query !='') {

                                                queryPlan.query = 'planGroupId=' + planGroupRecord.get('planGroupId') + ' and wrdidx contains ' + queryPlan.query;
                                            }
                                            else
                                            {
                                                queryPlan.query = 'planGroupId=' + planGroupRecord.get('planGroupId');
                                            }
                                            //coveragePhaseBenefits.getProxy().setExtraParam('pWhere', 'planGroupId=' + planGroupRecord.get('planGroupId') +' and wrdidx contains ' + queryPlan.query);


                                            coveragePhaseBenefits.on('load',
                                                function(){
                                                    //addRecords: true

                                                    var theStore = me.up('plan-groups').getViewModel().getStore('coveragephaseplanbenefititems');
                                                    if(theStore) {

                                                        var existinallRecord = theStore.find('planBenefitId',0,0,false,false,true);
                                                        if(existinallRecord <0 ) {
                                                            var allRercord = new Atlas.plan.model.PlanBenefitExt;
                                                            allRercord.data.planBenefitId = 0;
                                                            allRercord.data.planBenefitCode = "All";
                                                            allRercord.data.BenefitName = "All";
                                                            allRercord.data.planGroupId = 0;
                                                            allRercord.data.planGroupName = "All";
                                                            allRercord.data.CarrierName = "All";
                                                            allRercord.data.lobName = "0";
                                                            theStore.insert(0, allRercord);
                                                        }
                                                    }

                                                });

                                            coveragePhaseBenefits.on('beforeload',
                                                function(){
                                                    me.up('plan-groups').getViewModel().getStore('coveragephaseplanbenefititems').removeAll();
                                                });

                                        }
                                    }

                                }
                            },





                            {text: 'Coverage Code', dataIndex: 'coverageCode',renderer:'coverageCodeRenderer',
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'coverageCode',
                                    emptyText: '',allowBlank: true,  bind: {store: '{coveragecodes}'},
                                    displayField:'name', valueField:'value'
                                }
                            },

                            {text: 'Coverage Phase', dataIndex: 'coveragePhaseName',
                                editor: {
                                    allowBlank: false
                                }
                            },
                            {text: 'TDS Max Amount', dataIndex: 'maxTDSAmount',xtype: 'numbercolumn',format: '$0,0.00',
                                editor: {
                                    allowBlank: false
                                }
                            },
                            {text: 'Troop Max Amount', dataIndex: 'maxTROOPAmount',xtype: 'numbercolumn',format: '$0,0.00',
                                editor: {
                                    allowBlank: false
                                }
                            },
                            {text: 'Sequence', dataIndex: 'rankOrder',
                                editor: {
                                    allowBlank: false
                                }
                            }
                            ,
                            {
                                xtype: 'widgetcolumn',
                                align: 'center',
                                hideable : false,
                                widget: {
                                    xtype: 'button',
                                    width:75,
                                    text: 'Reject',
                                    iconCls: 'x-action-col-icon x-fa fa-undo',
                                    bind: {

                                        tooltip: 'Reject '
                                    },
                                    handler: 'onUndoChangeClick'

                                },
                                onWidgetAttach: function(col, widget, rec) {

                                    widget.setVisible(rec.get('isUpdated'));
                                    col.mon(col.up('gridpanel').getView(), {
                                        itemupdate: function() {
                                            widget.setVisible(rec.get('isUpdated'));
                                        }
                                    });
                                }

                            }


                        ]},

                    plugins: [
                        {
                            ptype: 'rowediting',
                            reference: 'rowediting',
                            triggerEvent: 'celldblclick',
                            removeUnmodified: true,
                            pluginId: 'rowEditing',
                            //id: 'rowEdit',
                            listeners: {
                                cancelEdit: 'cancelEditButton',
                                edit: 'completeEdit',
                                beforeEdit: 'beforeEdit'
                            }
                        }
                    ],
                    bind: {
                        store: '{coveragephases}'
                    },

                    dockedItems: [{
                        xtype: 'panel',
                        title: 'Plan Coverage Phases'
                    },{
                        xtype:'toolbar',
                        dock:'top',

                        items:[
                            {
                                iconCls: 'x-fa fa-plus-circle',
                                handler: 'onAdd',
                                alignment: 'right',
                                reference: 'btnAdd',
                                bind:{
                                    //disabled: '{!canEdit}'
                                },


                                text: 'Add'
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                handler: 'onRemoveButtonClick',
                                alignment: 'right',
                                reference:'btnRemove',
                                bind:{
                                    //disabled: '{!isEditing}'
                                },
                                text: 'Remove'
                            }

                        ]

                    }]

                }


            ],


            dockedItems: [{
                xtype:'toolbar',
                dock:'bottom',

                items:[
                    '->',
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-edit',
                        handler: 'onAdminEditClick',
                        reference : 'btnAdminEdit',
                        //xtype: 'button',
                        alignment: 'right',
                        bind:{

                            disabled: '{!canEdit}'
                        },


                        text: 'Admin Edit'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-floppy-o',
                        handler: 'onSaveClick',
                        reference: 'btnSave',
                        alignment: 'right',

                        bind:{
                            disabled: '{!isEditing}'
                        },
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-ban',
                        handler: 'onMasterCancelClick',
                        reference: 'btnCancel',
                        alignment: 'right',
                        bind:{
                            disabled: '{!isEditing}'
                        },
                        text: 'Cancel'
                    }

                ]}]

        }
    ]

});
Ext.define('Atlas.plan.view.Groups', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.plan-groups',

    controller: 'plan-groups',
    viewModel:'plan-groups',


    dockedItems: [{
        xtype:'toolbar',
        dock:'top',
        items:[
            {
                xtype: 'combo',
                labelWidth: 190,
                width: 400,
                reference: 'plangroup',
                fieldLabel: 'Select a Plan Group to View/Edit',
                emptyText: 'e.g. MHP Medicare 2011',
                minChars: 4,
                bind: {
                    store: '{plangroups}'
                },
                listeners: {
                    select: 'onPlangroupSelect',
                    beforequery: function(record){
                        //debugger;
                        record.query = new RegExp(record.query, 'ig');
                        record.forceAll = true;
                    }

                },
                listConfig: {
                    getInnerTpl: function () {
                        // here you place the images in your combo
                        var tpl = '<div>' +
                            '<b>{planGroupCode}</b><br/>' +
                            '{planGroupName}<br/>' +
                            '{lobName}<br/>' +
                            '{accountName}</div>';
                        return tpl;
                    }
                },
                //reference: 'plangroupcombo',
                forceSelection: true,
                queryMode: 'local',
                name: 'plangroup',
                displayField: 'planGroupName',
                valueField: 'planGroupId',
                hideTrigger:true,
                autoSelect: true,
                lastQuery: ''
                 // typeAhead: true,
                // typeAheadDelay: 100

            },{
                xtype:'label',
                itemId:'lblAtlasBenefitPlan',
                cls:'m-red-color'
            },

            '->',
            {
                xtype: 'combo',
                labelWidth: 125,
                width: 350,
                emptyText: 'Select a carrier',
                bind: {
                    store: '{carriers}'
                },
                listConfig: {
                    getInnerTpl: function () {
                        // here you place the images in your combo
                        var tpl = '<div>' +
                            '{carrierName}<br/>' +
                            '</div>';
                        return tpl;
                    }
                },

                listeners: {
                    select: 'onCarrierSelect'
                },
                reference: 'carriercombo',
                publishes: 'selection',
                queryMode: 'local',
                name: 'carrier',
                displayField: 'carrierName',
                valueField: 'carrierId'

            },
            // '->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                handler: 'onNewPlanGroupClick',
                text: 'Add New Plan Group'
            }, {
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
    }],
    defaults:{
        closable: true
    },
    items: [
        /* {
         xtype: 'plan-group-detail',
         closable: false
         },
         {
         xtype: 'plan-group-coveragephase'
         },
         {
         xtype: 'plan-group-copydetail'
         }*/
    ]
});
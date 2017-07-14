/**
 * Created by agupta on 8/30/2016.
 */
Ext.define('Atlas.formulary.view.FormularyInfo',{
    extend: 'Ext.tab.Panel',
    xtype:'formularyinfo',
    itemId: 'formularyinfo',
    title:'Formulary Setup',
    controller: 'formulary',
    viewModel: 'formulary',

    scrollable: true,
    layout:'hbox',
    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'combo',
                itemId: 'formularyList',
                fieldLabel: 'Formulary List',
                typeAhead: true,
                editable:true,
                triggerAction: 'all',
                emptyText: 'Formulary List',
                width : '52%',
                bind: {
                    store: '{StoreFormularyList}'
                },
                tpl: Ext.create('Ext.XTemplate',
                    '</Html>'
                    + '<tpl for=".">'
                    + '<tpl if="xindex == 1">'                    
                    + '<table style="width: 100%;">'
                    + '<tr>'
                    + '<th style="font-weight: bold; padding: 3px; width: 200px;">Formulary</th>'
                    + '<th style="font-weight: bold; padding: 3px; width: 100px;">Version</th>'
                    + '<th style="font-weight: bold; padding: 3px; width: 100px;">Status</th>'
                    + '<th style="font-weight: bold; padding: 3px; width: 250px;">Effective Date</th>'
                    + '<th style="font-weight: bold; padding: 3px; width: 250px;">Term. Date</th>'
                    + '<th style="font-weight: bold; padding: 3px; width: 100px;">Data Src.</th>'
                    + '<th style="font-weight: bold; padding: 3px; width: 100px;">Type</th>'
                    + '</tr>'
                    + '</tpl>'
                    + '<tr class="x-boundlist-item">'
                    + '<td style="padding:3px 0px;">{FormularyName}</td>' 
                    + '<td style="padding:3px 0px;">{FormularyVersion}</td>' 
                    + '<td style="padding:3px 0px;">{StatDesc}</td>' 
                    + '<td style="padding:3px 0px; width: 230px;">{EffectiveDate:date("m/d/Y")}</td>'  
                    + '<td style="padding:3px 0px; width: 230px;">{TerminationDate:date("m/d/Y")}</td>' 
                    + '<td style="padding:3px 0px;">{dataSource}</td>' 
                    + '<td style="padding:3px 0px;">{formularyType}</td>'
                    + '</tr>'
                    + '<tpl if="xindex==0">'
                    + '</table>'
                    + '</tpl>'
                    + '</tpl>'
                    + '</Html>'),
                listeners:{
                    select: 'onFormularyListChange'
                    //expand:{fn:function(combo, value){combo.clearValue();}}
                },
                reference: 'formularylistcombo',
                forceSelection:false,
                queryMode: 'local',
                name: 'formularylist',
                displayField: 'FormularyName',
                valueField: 'FormularyID'
            }

            , {
                xtype: 'displayfield',
                fieldLabel: 'Ver',
                itemId:'lblFormularyVersion',
                labelWidth: 20,
                anchor: '10%',
                bind: {
                    value: '{masterrecord.FormularyVersion}'
                }

            }
            , {
                xtype: 'displayfield',
                fieldLabel: 'Status',
                itemId:'lblStatus',
                labelWidth: 20,
                bind: {
                    value: '{masterrecord.StatDesc}'
                }
            }
            , {
                xtype: 'displayfield',
                itemId:'InfoEffectiveDate',
                fieldLabel: 'Effective Date',
                labelWidth: 20,
                bind: {
                    value: '{masterrecord.EffectiveDate}'
                },
                renderer: Ext.util.Format.dateRenderer('m/d/Y')


            },
            {
                xtype:'label',
                itemId:'lblAtlasFormulary',
                cls:'m-red-color'
            }
            ,'->'
            ,   {
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
    }
    ,
    defaults: {
        closable: true
    }

});


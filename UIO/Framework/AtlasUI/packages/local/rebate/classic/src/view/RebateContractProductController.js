/**
 * Created by j2487 on 11/16/2016.
 */
Ext.define('Atlas.rebate.view.RebateContractProductController', {
        extend: 'Ext.app.ViewController',
        alias:'controller.rebatecontractproduct',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    detailID:'',
        listen: {
            controller: {
                'rebatecontract': {
                    onTabChange: 'onTabChange_SelectHandler'
                }
            }
        },
        init:function() {
            var grid = this.getView().down('#productGrid');
            grid.on('edit',function(editor,context){
               if (context.record.dirty) {
                    context.record.set('isNeedUpdate', true);
                }
            });

        },
    rendererCostBasis:function(value)
    {
        var store=this.getViewModel().getStore('costbasisstore');
        if(store.data.length>0)
        {
            for(var i=0;i<store.data.items.length;i++)
            {
                if(store.data.items[i].data.value==value)
                {
                    return store.data.items[i].data.name;
                    break;
                }
            }
        }

    },
    onTabChange_SelectHandler:function(index,newItem,oldItem) {
        var activeTabId = this.getView().up('#contractTabs').getActiveTab().itemId;
        var view = this.getView();
        var CarrierLOBID = view.CarrierLOBId;
        if (activeTabId != 'tab' + CarrierLOBID){
            return;
        }

        var systemID = this.getView().up().up().getController().parentId;
        if(systemID == 0 || systemID == ''){return;}
        var detailId = '';
        var where = '';
        where = this.buildWhereClause(where,'CarrierLOBID','=',CarrierLOBID);
        where = this.buildWhereClause(where,'parentSystemID','=',systemID);
        var contractdetailstore1 = this.getViewModel().getStore('contractdetailstore');
        contractdetailstore1.getProxy().setExtraParam('pWhere',where);
        contractdetailstore1.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {

                var contractproductstore = this.getViewModel().getStore('contractproductstore'),
                    claimrules = this.getViewModel().getStore('claimrules');

                // if (record.length == 0){
                //     contractproductstore.removeAll();
                //     claimrules.removeAll();
                // }
                this.detailID = (record.length == 0 ? 0 : record[0].data.detailID);
                contractproductstore.getProxy().setExtraParam('pDetailId',this.detailID);
                contractproductstore.load({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                    }
                });

                claimrules.getProxy().setExtraParam('pdetailID',this.detailID);
                claimrules.load();

            }
        });

    },
    buildWhereClause: function(fullString, param, condition, value) {
        if(value === null || value.length === 0)
        {
            return fullString = fullString.length > 0 ? fullString:fullString
        }else{
            return fullString = fullString.length > 0 ? fullString + ' AND ' + param + condition + '"' + value + '"' : param + condition + '"' + value + '"';
        }
    },
    onRejectProduct:function (btn) {
        var grid = this.getView().down('#productGrid');
        var rec = btn.up().getViewModel().data.record;
        var prodStore = grid.getStore();
        if (rec.crudState=='C'){
            grid.getPlugin('rowEdit').disabled=true;
            prodStore.remove(rec);
            grid.getPlugin('rowEdit').disabled=false;
            return;

        }
        rec.reject();
        rec.set('isNeedUpdate', false);

    },
    onAddProduct:function(){
        var view = this.getView();
        var gridStore = view.down('#productGrid').getStore(),
            plugin = this.getView().down('#productGrid').getPlugin('rowEdit');
        gridStore.insert(0, {
            NDC:'' ,
            BN: '',
            CostBasis: '',
            Percentage: '',
            isNeedUpdate:true
        });
        plugin.startEdit(0);
    },
    onRemoveProduct:function(){
        var view = this.getView();
        var grid = view.down('#productGrid');
        var sm = grid.getSelectionModel();
        var store = grid.getStore();
        if(sm.getSelection()==null){return;}
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    onAddComp:function () {
        var view = this.getView();
        var gridStore = view.down('#competitorGrid').getStore(),
            plugin = this.getView().down('#competitorGrid').getPlugin('rowEdit');
        gridStore.insert(0, {
            CompetitorProductName:''
        })
        plugin.startEdit(0);
    },
    onRemoveComp:function(){
        var view = this.getView();
        var grid = view.down('#competitorGrid');
        var sm = grid.getSelectionModel();
        var store = grid.getStore();
        if(sm.getSelection()==null){return;}
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    onDrugSelection:function (combo,record) {
        this.getViewModel().set('drug',record);
    },
    onRebateSelection:function (combo,record) {
        this.getViewModel().set('rebate',record);
    },
    onCostBasisSelection:function(combo,record){
        this.getViewModel().set('cost',record);
    },

    HandleChanges:function(){
        var view = this.getView();
        var vm = this.getViewModel();
        var store = this.getStore('contractproductstore');
        var fieldListA = "CostBasis,percentage,rebateType,NDC,detailID";
        var fieldListU = "CostBasis,percentage,rebateType,NDC";
        var fieldValues ='';
        var s,d,result,message,detailID,systemId;
        var pRetSystemID; var dId =this.detailID;
        if (this.detailID == 0){
            var s = [{"Save": {"key": "pAction", "value": "A"}}];
            var fieldList = 'parentSystemID,CarrierLOBID';
            var lobid = view.CarrierLOBId;
            var parentsystemid = view.up().up().down('#mfrGrid').getSelection()[0].get('systemID');
            var extraParameters = {
                pDetailID : this.detailID,
                pFields: fieldList,
                pValues: parentsystemid + '|' + lobid
            };
            var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractdetail/update', null, [true], extraParameters,
                s, ['pRetDetailID','pRetSystemID']);
            dId = result.pRetDetailID;
        }

        for(var i in store.removed) {
            Atlas.common.utility.Utilities.post(
                'finance/rx/rebatecontractproduct/update',
                {
                    pSystemID : store.removed[i].data.SystemID,
                    pFields:'',
                    pValues:'',
                    pAction:'D'
                },
                [pRetSystemID]
            );
            //store.reload();
            store.getProxy().setExtraParam('pDetailId',dId);
            store.load();

        }

        for(var i = 0; i < store.count();i++){

            if (!store.data.items[i].dirty){
                continue;
            }

            if(store.data.items[i].data.SystemID == 0 ||store.data.items[i].data.SystemID == '' || store.data.items[i].data.SystemID == null ){
                var percentage = store.data.items[i].data.Percentage;
                var ndc = vm.get('drug').get('NDC');
                var brandName = vm.get('drug').get('BN');
                var rebateType = vm.get('rebate').get('value');
                var costBasis = vm.get('cost').get('value');
                var detailId = dId;
                fieldValues = costBasis + '|' + percentage + '|' + rebateType + '|' + ndc + '|'+ detailId;
                var extraParameters = {
                    pFields: fieldListA,
                    pValues: fieldValues
                };
                var saveAction = [{"Save": {"key": "pAction", "value": "A"}}];
                var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractproduct/update', null, [true], extraParameters,
                    saveAction, null);
                //store.reload();
                store.getProxy().setExtraParam('pDetailId',detailId);
                store.load();
            }
            else if(store.data.items[i].data.SystemID != '' ) {
                var percentage = store.data.items[i].data.Percentage;
                var ndc = store.data.items[i].data.NDC;
                var brandName = store.data.items[i].data.BN;
                var rebateType =store.data.items[i].data.RebateType;
                var costBasis = store.data.items[i].data.CostBasis;
                 systemId =  store.data.items[i].data.SystemID;
                fieldValues = costBasis + '|' + percentage + '|' + rebateType + '|' + ndc;
                var extraParameters = {
                    pFields: fieldListU,
                    pValues: fieldValues,
                    pSystemID:systemId
                };
                var saveAction = [{"Save": {"key": "pAction", "value": "U"}}];
                var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractproduct/update', null, [true], extraParameters,
                    saveAction, null);
                store.reload();
                // store.getProxy().setExtraParam('pDetailId',detailId);
                // store.load();
            }
        }
    },
    createEditCompetitor:function(){
        if (this.detailID == '0' || this.detailID == 0) {
            return;
        }

        var view = this.getView();
        var vm = this.getViewModel();
        var me = this;
        if (view.down('#productGrid').getSelection().length == 0){Ext.Msg.alert('PBM','Please select a product'); return false;}
        if (view.down('#productGrid').getSelection().length > 1){Ext.Msg.alert('PBM','Please select one product at a time'); return false;}
        var CreateEditCompetitorWin =  Ext.create('Ext.window.Window',{
            title:'Competing Products for - ' + view.down('#productGrid').getSelection()[0].data.BN,
            modal: true,
            closable: true,
            scrollable:true,
            selModel: {
                selType: 'rowmodel', // rowmodel is the default selection model
                mode: 'MULTI' // Allows selection of multiple rows
            },
            height:'40%',width:'40%',requires: [
                'Ext.grid.plugin.RowEditing'
            ],
            items: [
                {
                    xtype: 'grid',height:300,
                    itemId:'competitorGrid',
                    bind: { store: '{competitorproductstore}'},
                    plugins: {
                        ptype: 'rowediting',
                        reference: 'rowediting',
                        triggerEvent: 'celldblclick',
                        pluginId: 'rowEdit',
                        listeners: [
                            {
                                cancelEdit: 'cancelEditButton',
                                scope: me
                            },
                            {
                                beforeEdit: 'beforeEdit',
                                scope: me
                            }

                        ]
                    },
                    columns:[
                        {text:'Competitor Product',itemId:'compProduct',flex:0.8,
                            editor:{
                                allowBlank: false,
                                xtype: 'drugtypeahead',emptyText:'[Product Name]',   listeners: {
                                    select:'onDrugSelection'}
                            },
                            dataIndex:'CompetitorProductName'
                        },
                        {
                            flex:0.5,
                            xtype:'actioncolumn',
                            hideable:false,
                            items: [{
                                xtype:'button',
                                iconCls: 'x-fa fa-arrow-right',  // Use a URL in the icon config
                                tooltip: 'View Drug Details',
                                handler:'RouteToDrugSearchCompetitor'
                            }]
                        },
                        {flex:1,dataIndex:'SystemID',hidden:true}
                    ]
                }
            ],
            dockedItems:[
                {
                    xtype: 'toolbar',
                    dock:'top',items:[
                    {xtype: 'button', text: 'Add',handler:'onAddComp',iconCls: 'fa fa-plus-circle'},'-',
                    {xtype: 'button', text: 'Remove',handler:'onRemoveComp', iconCls : 'fa  fa-minus-circle'},'->',
                    {xtype:'displayfield',itemId:'drugField'}
                ]},
                {
                    xtype:'toolbar',
                    dock:'bottom',items:[
                    '->',{xtype:'button',text:'Save Competitor',handler:'HandleChangesCompetitor'}
                ]}]
        });
        view.add(CreateEditCompetitorWin);
        CreateEditCompetitorWin.show();
        var contractProductName = this.getView().down('#productGrid').getSelection()[0].get('BN');
        view.down('#drugField').setValue(contractProductName);
        var detailId = this.detailID;
        var competitorproductstore = this.getViewModel().getStore('competitorproductstore');
        competitorproductstore.getProxy().setExtraParam('pDetailId',detailId);
        competitorproductstore.getProxy().setExtraParam('pContractProductName',contractProductName);
        competitorproductstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
            }
        });
    },
    HandleChangesCompetitor:function(){
        var fieldListA =  'CompetitorProductName,ContractProductName,detailID';
        var fieldListU = 'CompetitorProductName';
        var s,result,message,pRetSystemID,fieldValues;
        var view = this.getView(); var vm = this.getViewModel();
        var CompetitorProductName,ContractProductName,detailId,systemId;
        var store = this.getStore('competitorproductstore');
        for(var i in store.removed) {
            Atlas.common.utility.Utilities.post(
                'finance/rx/rebatecontractcompetitor/update',
                {
                    pSystemID : store.removed[i].data.systemID,
                    pFields:'',
                    pValues:'',
                    pAction:'D'
                },
                ['pRetSystemID']
            );
            store.reload();
        }
        for(var i = 0; i<store.count();i++)
        {
            if (!store.data.items[i].dirty){
                continue;
            }
            if(store.data.items[i].data.systemID == '' ||store.data.items[i].data.systemID == 0 ){
               CompetitorProductName = vm.get('drug').get('BN');
               ContractProductName = view.down('#drugField').getValue();
               detailId = this.detailID;
               fieldValues = CompetitorProductName + '|'+ ContractProductName+ '|' + detailId;
               systemId = 0;
               var extraParameters = {
                   pFields: fieldListA,
                   pValues: fieldValues,
                   pSystemID:systemId
               };
               var saveAction = [{"Save": {"key": "pAction", "value": "A"}}];
               var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractcompetitor/update', null, [true], extraParameters,
                   saveAction, null);
               store.reload();
           }
           else if(store.data.items[i].data.systemID != 0){
               systemId = store.data.items[i].data.systemID;
               CompetitorProductName = vm.get('drug').get('BN');
               fieldValues = CompetitorProductName;
               var extraParameters = {
                   pFields: fieldListU,
                   pValues: fieldValues,
                   pSystemID:systemId
               };
               var saveAction = [{"Save": {"key": "pAction", "value": "U"}}];
               var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractcompetitor/update', null, [true], extraParameters,
                   saveAction, null);
               store.reload();
           }
        }

    },
    onProductRowSelect:function (me,record,tr,rowIndex,e,eOpts) {
        this.getViewModel().set('Product',record);
    },
    RouteToDrugSearch:function(grid, rowIndex, colIndex){
        var me = this, vm= me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/formulary/FDBDrugSearch'), id = vm.get('recipientID');
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        this.fireEvent('openView', 'merlin', 'formulary', 'FDBDrugSearch', {

            atlasId: grid.getStore().getAt(rowIndex).data.NDC ,
            menuId: menuId,
            openView: true
        });

    },
    RouteToDrugSearchCompetitor:function(grid, rowIndex, colIndex){
        var me = this, vm= me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/formulary/FDBDrugSearch'), id = vm.get('recipientID');
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        this.fireEvent('openView', 'merlin', 'formulary', 'FDBDrugSearch', {

            atlasId: grid.getStore().getAt(rowIndex).data.CompetitorProductName ,
            menuId: menuId,
            openView: true
        });

    },


    HandleChangesClamRules: function(){
        var view = this.getView();
        var vm = this.getViewModel();
        var store = this.getStore('claimrules');
        var fieldListA = "columnID,columnValue,detailID,operator";
        var fieldListU = "columnID,columnValue,operator";
        var fieldValues ='';
        var s,d,result,message,detailID,systemId;
        var pRetSystemID; var dId =this.detailID;
        for(var i in store.removed) {
            Atlas.common.utility.Utilities.post(
                'finance/rx/rebateclaimsubmitrules/update',
                {
                    pSystemId : store.removed[i].data.systemID,
                    pAction:'D',
                    pFields:'',
                    pValues:''
                },
                [pRetSystemID]
            );
            store.reload();
        }
        if (this.detailID == 0){
            var s = [{"Save": {"key": "pAction", "value": "A"}}];
            var fieldList = 'parentSystemID,CarrierLOBID';
            var lobid = view.CarrierLOBId;
            var parentsystemid = view.up().up().down('#mfrGrid').getSelection()[0].get('systemID');
            var extraParameters = {
                pDetailID : this.detailID,
                pFields: fieldList,
                pValues: parentsystemid + '|' + lobid
            };
            var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebatecontractdetail/update', null, [true], extraParameters,
                s, ['pRetDetailID','pRetSystemID']);
            dId = result.pRetDetailID;
        }
        for(var i = 0; i < store.count();i++){

            if (!store.data.items[i].dirty){
                continue;
            }

            var recAction = store.data.items[i].data.systemID == 0 ||store.data.items[i].data.systemID == '' || store.data.items[i].data.systemID == null ? 'A' : 'U',
                saveAction = [{"Save": {"key": "pAction", "value": recAction}}];

            var extraParameters = {
                pSystemId : store.data.items[i].data.systemID,
                pAction:recAction,
                pFields:recAction == 'A' ? fieldListA : fieldListU,
                pValues: store.data.items[i].data.columnID + '|' + store.data.items[i].data.columnValue + '|' + (recAction == 'A' ? this.detailID : '') + '|' + store.data.items[i].data.ClaimOperator
            };

            var result = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/rebateclaimsubmitrules/update', null, [true], extraParameters,
                saveAction, null);
            store.reload();
        }
    },

    beforeEdit:function(editor,context) {
        if(context.column.getXType() == 'actioncolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
        {
            if(context.record && context.record.phantom) {
                var grid = context.grid;
                grid.store.removeAt(context.rowIdx);
                return false;
            }
        }
    },

    cancelEditButton: function(editor, context) {
        if (context.record.phantom)
            context.grid.store.removeAt(context.rowIdx);
    },

    onAddRules: function (btn) {
        var store = this.getViewModel().get('claimrules'),
            plugin = this.getView().down('#gridClaimRules').getPlugin('rowEdit');

        var newRec = Ext.data.Record.create({
            detailID: '',
            ClaimOperator: '',
            columnValue: ''
        });

        store.insert(0, newRec);
        plugin.startEdit(0);
    },

    onRemoveRules: function (grid, rowIndex, colIndex) {
        grid.getStore().removeAt(rowIndex);
    }
});


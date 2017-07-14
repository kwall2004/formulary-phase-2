Ext.define('Atlas.plan.view.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-search',


    init: function () {
        var me = this;
        var carriersList = me.getViewModel().getStore('carriers');
        carriersList.load({
            callback: function (recordInfo, operation, success) {
                //debugger;

                var allRecord = new Atlas.plan.model.Carrier;
                allRecord.data.carrierName ='All';
                allRecord.data.carrierId = 999;

                var carrierStore =me.getViewModel().getStore('carriers');
                carrierStore.insert(0,allRecord);

                var storeLOB = me.getViewModel().get('lobs');
                storeLOB.load();
                me.getViewModel().getStore('plangroups').load();
            }
        });

    },


    onPlanGroupsPaged: function(store, records) {
        var vm = this.getViewModel(),
            planSearchPages = vm.getStore('planGroupsPaged');
        for (var i=0;i<records.length;i++)
        {
            if(records[i].data.planGroupStatus == 'A')
                records[i].data.planGroupStatus= 'Active';
            else if(records[i].data.planGroupStatus == 'I')
                records[i].data.planGroupStatus= 'Inactive';
            else if(records[i].data.planGroupStatus == 'D')
                records[i].data.planGroupStatus= 'Draft';
        }

        planSearchPages.getProxy().setData(records);
        planSearchPages.reload();
        planSearchPages.loadPage(1);

    },

    onItemdblclick: function (grid, record, item) {
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/plan/Groups');
        var me = this;
	/* ,
            node = me.getView().up('merlinworkspace').getViewModel().get('menuitems').findNode('route','merlin/plan/Groups'),
            client = me.getView().atlasClient,
            route = node.get('route') || node.get('routeId'),
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle'),
            atlasId = record.get('planGroupId');*/


        me.fireEvent('openView','merlin','plan','Groups', {
            //ID: menuId,
            planGroupId: record.data.planGroupId,
            planGroupName: record.data.planGroupName,
            planGroupCode: record.data.planGroupCode,
            plangroupRecord: record,
            // keyValue: '0',
            openView: true,
            //routeId: route + '/' + atlasId,
            //parentMenuId: parentMenuId,
            menuId: menuId,
            title: 'Plan Group Setup',
            atlasId: record.data.planGroupId
        });

    },

    onSearch: function () {
        //debugger;\
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            cmbCarrier = view.down('[name=carriergroup]'),
            cmbLob = view.down('[name=lob]'),
            searchFilters = [];


        var theStore = vm.getStore('plangroups');

        theStore.clearFilter();

        if (cmbCarrier.getSelection()) {
            var selectedCarrier = cmbCarrier.getSelection().get('carrierId');
            if(selectedCarrier !=999) {
                theStore.filter(Ext.create('Ext.util.Filter', {
                    property: "carrierId",
                    value: cmbCarrier.getSelection().get('carrierId'),
                    exactMatch: true
                }));
            }
        }

        if (cmbLob.getSelection()) {
            var selectionValue = cmbLob.getSelection().get('ListItem');
            if(selectionValue !=999) {

                theStore.filter(Ext.create('Ext.util.Filter', {

                    property: "carrierLOBId",
                    value: cmbLob.getSelection().get('ListItem'),
                    exactMatch: true
                }));
            }
        }
        me.onPlanGroupsPaged(theStore, theStore.data.items);
    },

    onGridExport: function () {
        var grid = this.getView();
        var store = grid.getStore();
        if (store.data.items.length > 0) {
            grid.saveDocumentAs({
                type: 'xlsx',
                fileName: 'Plans.xlsx'
            });
        }
        else {
            Ext.Msg.alert('PBM', 'No record found', Ext.emptyFn);
        }
        // debugger;
        // var me = this,
        //     view = me.getView(),
        //     cmbCarrier = view.down('[name=carriergroup]'),
        //     cmbLob = view.down('[name=lob]'),
        //     excludedCols='carrierId,carrierLOBId,RowNum,cmsPBPid,planGroupId,CMSCntrId',
        //     parentStore = this.getViewModel().getStore('plangroups'),
        //     pagingStore = this.getViewModel().getStore('planGroupsPaged');
        // // Applying pagination before export
        // //parentStore.load();
        // parentStore.getProxy().setExtraParam('pagination',true);
        // if (cmbCarrier.getSelection()) {
        //     parentStore.getProxy().setExtraParam('pcarrierId', cmbCarrier.getSelection().get('carrierId'));
        // }
        // if (cmbLob.getSelection()) {
        //     parentStore.getProxy().setExtraParam('carrierLOBId', cmbLob.getSelection().get('carrierLOBId'));
        // }
        //  Atlas.common.utility.Utilities.exportToExcel(parentStore,excludedCols);
        // // Removing pagination after export
        // Ext.Function.defer(function () {
        //     delete parentStore.proxy.extraParams.pagination;
        //     delete parentStore.proxy.extraParams.carrierId;
        //     delete parentStore.proxy.extraParams.carrierLOBId;
        //     parentStore.load();
        //    // me.getView().bindStore(pagingStore);
        // }, 1000);

    },
    planGroupStatusFormat: function(value){
        if(value == 'A')
        return 'Active';
        else if(value == 'I')
        return 'Inactive';
        else if(value == 'D')
        return 'Draft';

    }


});
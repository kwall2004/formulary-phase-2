/**
 * Created by mkorivi on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.CaseQueuesController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.casequeues',
    init: function () {
        var view = this.getView(),
        atlasId = view.atlasId;
        if (atlasId=='CMFaxes')
            atlasId='MyCasesOverdue';
        var vm = this.getViewModel();
        vm.set('searchAttempted',false);
        var store = vm.getStore('casemanagementalert');
        store.load({
            callback: function (record, operation, success) {
                if (record.length > 0) {
                    for (var i = 0; i < record.length; i++) {
                        switch (record[i].data.Description) {


                            case 'All Cases Overdue':

                                if (record[i].data.TotalCount > 0)
                                    view.down('#AllCasesOverdue').setTitle('All Cases Overdue <font style=color:red;>(' + record[i].data.TotalCount + ')</font>');
                                else
                                    view.down('#AllCasesOverdue').setTitle('All Cases Overdue <font style=color:green;>(' + record[i].data.TotalCount + ')</font>');
                                break;
                            case 'CMS Faxes':
                            case 'My Cases Overdue':
                                if (record[i].data.TotalCount > 0)
                                    view.down('#MyCasesOverdue').setTitle('My Cases Overdue <font style=color:red;>(' + record[i].data.TotalCount + ')</font>');
                                else
                                    view.down('#MyCasesOverdue').setTitle('My Cases Overdue <font style=color:green;>(' + record[i].data.TotalCount + ')</font>');
                                break;

                            case 'Open MAP Cases':
                                if (record[i].data.TotalCount > 0)
                                    view.down('#OpenMAPCases').setTitle('Open MAP Cases <font style=color:red;>(' + record[i].data.TotalCount + ')</font>');
                                else
                                    view.down('#OpenMAPCases').setTitle('Open MAP Cases <font style=color:green;>(' + record[i].data.TotalCount + ')</font>');
                                break;
                            case 'MTM CMR Queue':
                                if (record[i].data.TotalCount > 0)
                                    view.down('#MTMCMRQueue').setTitle('MTM CMR Queue <font style=color:red;>(' + record[i].data.TotalCount + ')</font>');
                                else
                                    view.down('#MTMCMRQueue').setTitle('MTM CMR Queue <font style=color:green;>(' + record[i].data.TotalCount + ')</font>');
                                break;
                            case 'MTM TMR Queue':
                                if (record[i].data.TotalCount > 0)
                                    view.down('#MTMTMRQueue').setTitle('MTM TMR Queue <font style=color:red;>(' + record[i].data.TotalCount + ')</font>');
                                else
                                    view.down('#MTMTMRQueue').setTitle('MTM TMR Queue <font style=color:green;>(' + record[i].data.TotalCount + ')</font>');
                                break;
                            case 'MTM Invitation Call Queue':
                                if (record[i].data.TotalCount > 0)
                                    view.down('#MTMInvitationCallQueue').setTitle('MTM Invitation Call Queue <font style=color:red;>(' + record[i].data.TotalCount + ')</font>');
                                else
                                    view.down('#MTMInvitationCallQueue').setTitle('MTM Invitation Call Queue <font style=color:green;>(' + record[i].data.TotalCount + ')</font>');
                                break;
                            case 'All Cases Due Today':
                                if (record[i].data.TotalCount > 0)
                                    view.down('#AllCasesDueToday').setTitle('All Cases Due Today <font style=color:red;>(' + record[i].data.TotalCount + ')</font>');
                                else
                                    view.down('#AllCasesDueToday').setTitle('All Cases Due Today <font style=color:green;>(' + record[i].data.TotalCount + ')</font>');
                                break;
                            case 'My Cases Due Today':
                                if (record[i].data.TotalCount > 0)
                                    view.down('#MyCasesDueToday').setTitle('My Cases Due Today <font style=color:red;>(' + record[i].data.TotalCount + ')</font>');
                                else
                                    view.down('#MyCasesDueToday').setTitle('My Cases Due Today <font style=color:green;>(' + record[i].data.TotalCount + ')</font>');
                                break;

                        }
                    }
                }

                if (atlasId !== null) {
                    var accordion = view.down('#' + atlasId);
                    accordion.expand();
                }
            }
        })
    },


    onActionItemClick: function (component, eOpts) {
        var me=this;
        var MTMId = component.getWidgetRecord().data.MTMId;
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/casemanagement/CaseInfo');
    /*  var  menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
            node =  menuItems.findNode('route', 'merlin/casemanagement/CaseInfo'),
            client = me.getView().atlasClient,
            route = node.get('route') || node.get('routeId'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle');*/

        me.fireEvent('openView','merlin','casemanagement','CaseInfo', {
            menuId: menuId,
            MTMId: MTMId,
            openView: true,
            title:'Case Details',
            atlasId:MTMId
        });
    },
    getSelectedPageData: function (pagingtoolbar, page, eOpts) {
        var id=null;
        switch (pagingtoolbar.getItemId()) {
            case 'gridPagingToolbarAllCases':
                id="AllCasesOverdue";
                break;
            case 'gridPagingToolbarMyCasesOverdue':
                id="MyCasesOverdue";
                break;
            case 'gridPagingToolbarOpenMAPCases':
                id="OpenMAPCases";
                break;
            case 'gridPagingToolbarMTMCMR':
                id="MTMCMRQueue";
                break;
            case 'gridPagingToolbarMTMTMR':
                id="MTMTMRQueue";
                break;
            case 'gridPagingToolbarMTMInvitationCallQueue':
                id="MTMInvitationCallQueue";
                break;
            case 'gridPagingToolbarAllCasesDueToday':
                id="AllCasesDueToday";
                break;
            case 'gridPagingToolbarMyCasesDueToday':
                id="MyCasesDueToday";
                break;
        }
        var vm = this.getViewModel(),
            prevPage = pagingtoolbar.store.currentPage,
            direction = '',
            bckRecPointer = vm.get('BckRecPointer'),
            fwdRecPointer = vm.get('FwdRecPointer'),
            jumpStart = 0,
            pageDiff = page - prevPage,
            isJump = false;

        if (pageDiff != 1 || pageDiff != -1){
            isJump = true;
        }

        if (isJump) {
            direction = 'Fwd';
            jumpStart = (page - 1) * 25;
            bckRecPointer = '';
            fwdRecPointer = '';
        }
        else if (prevPage > page) {
            direction = 'Bck';
        }
        else {
            direction = 'Fwd';
        }
        if(page!=prevPage)
        this.onLoadData(id,jumpStart, direction, bckRecPointer, fwdRecPointer);

        return true;
    },
    onLoadData:function(id,jumpStart, direction, bckRecPointer, fwdRecPointer)
    {
        var vm = this.getViewModel(),
            gridPagingToolbar = null,
            LoadPagination = vm.get('LoadPagination');
        var view=this.getView();
        var Store = null;
        var PagingToolbarStore = null;
        vm.set('BckRecPointer', '');
        vm.set('FwdRecPointer', '');
        vm.set('JumpStart', jumpStart);
        vm.set('Direction', direction);
        if (id != null && id != '') {
            switch (id) {
                case 'AllCasesOverdue':
                    gridPagingToolbar = this.getView().down('#gridPagingToolbarAllCases');
                    Store = vm.getStore('StoreAllCasesOverDue');
                    PagingToolbarStore= vm.getStore('PagingToolbarStore1');
                    Store.getProxy().setExtraParam('pWhere', "(MTMStatus = '1' OR MTMStatus = '2') AND followupdate < " + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + " AND closedDate = ? ");
                    view.down('#AllCasesOverdue').setStore(Store);
                    break;
                case 'MyCasesOverdue':
                    gridPagingToolbar = this.getView().down('#gridPagingToolbarMyCasesOverdue');
                    Store = vm.getStore('StoreMyCasesOverDue');
                    PagingToolbarStore= vm.getStore('PagingToolbarStore2');
                    Store.getProxy().setExtraParam('pWhere', "(MTMStatus = '1' OR MTMStatus = '2') AND followupdate < " + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + " AND closedDate = ? AND closedDate = ? AND CaseManager = '" + Atlas.user.un + "' ");
                    view.down('#MyCasesOverdue').setStore(Store);
                    break;
                case 'OpenMAPCases':
                    gridPagingToolbar = this.getView().down('#gridPagingToolbarOpenMAPCases');
                    Store = vm.getStore('StoreOpenMAPCases');
                    PagingToolbarStore= vm.getStore('PagingToolbarStore3');
                    Store.getProxy().setExtraParam('pWhere', "MTMStatus = '1'  AND description = '5' ");
                    view.down('#OpenMAPCases').setStore(Store);
                    break;
                case 'MTMCMRQueue':
                    gridPagingToolbar = this.getView().down('#gridPagingToolbarMTMCMR');
                    Store = vm.getStore('StoreCMRQ');
                    PagingToolbarStore= vm.getStore('PagingToolbarStore4');
                    view.down('#MTMCMRQueue').setStore(Store);
                    break;
                case 'MTMTMRQueue':
                    gridPagingToolbar = this.getView().down('#gridPagingToolbarMTMTMR');
                    Store = vm.getStore('StoreTMRQ');
                    PagingToolbarStore= vm.getStore('PagingToolbarStore5');
                    view.down('#MTMTMRQueue').setStore(Store);
                    break;
                case 'MTMInvitationCallQueue':
                    gridPagingToolbar = this.getView().down('#gridPagingToolbarMTMInvitationCallQueue');
                    Store = vm.getStore('StoreInvitationQ');
                    PagingToolbarStore= vm.getStore('PagingToolbarStore6');
                    if (view.down('#fromDate').getValue() != null && view.down('#fromDate').getValue() != '') {
                        Store.getProxy().setExtraParam('pEnrollDateFrom', view.down('#fromDate').getValue());
                    }
                    else {
                        Store.getProxy().setExtraParam('pEnrollDateFrom', '');
                    }
                    if (view.down('#toDate').getValue() != null && view.down('#toDate').getValue() != '') {
                        Store.getProxy().setExtraParam('pEnrollDateTo', view.down('#toDate').getValue());
                    }
                    else {
                        Store.getProxy().setExtraParam('pEnrollDateTo', '');
                    }
                    if (view.down('#txtCallAttempts').getValue() != null && view.down('#txtCallAttempts').getValue() != '') {
                        Store.getProxy().setExtraParam('pCallAttempts', view.down('#txtCallAttempts').getValue());
                    }
                    else {
                        Store.getProxy().setExtraParam('pCallAttempts', '');
                    }
                    view.down('#MTMInvitationCallQueue').setStore(Store);
                    break;
                case 'AllCasesDueToday':
                    gridPagingToolbar = this.getView().down('#gridPagingToolbarAllCasesDueToday');
                    Store = vm.getStore('StoreAllCasesDueToday');
                    PagingToolbarStore= vm.getStore('PagingToolbarStore7');
                    Store.getProxy().setExtraParam('pWhere', "(MTMStatus = '1' OR MTMStatus = '2') AND followupdate = " + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + " AND closedDate = ? ");
                    view.down('#AllCasesDueToday').setStore(Store);
                    break;
                case 'MyCasesDueToday':
                    gridPagingToolbar = this.getView().down('#gridPagingToolbarMyCasesDueToday');
                    Store = vm.getStore('StoreMyCasesDueToday');
                    PagingToolbarStore= vm.getStore('PagingToolbarStore8');
                    Store.getProxy().setExtraParam('pWhere', "(MTMStatus = '1' OR MTMStatus = '2') AND followupdate = " + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + " AND closedDate = ? AND CaseManager = '" + Atlas.user.un + "' ");
                    view.down('#MyCasesDueToday').setStore(Store);
                    break;
            }
        }
       if(jumpStart==='0') {
           PagingToolbarStore.removeAll(true);
           gridPagingToolbar.onLoad();
       }
        Store.getProxy().setExtraParam('pBatchSize', '25');
        Store.getProxy().setExtraParam('ipiJumpStart', jumpStart);
        Store.getProxy().setExtraParam('ipcDirection', direction);
        Store.getProxy().setExtraParam('ipcBckRecPointer', bckRecPointer);
        Store.getProxy().setExtraParam('ipcFwdRecPointer', fwdRecPointer);
        Store.load({
            callback: function (records, opts, success) {
                if (success) {

                    if (LoadPagination == 'true') {

                            if (opts._resultSet.metadata.opiRecordCount > 0)
                            {
                                switch (id) {
                                    case 'MTMInvitationCallQueue':
                                        view.down('#MTMInvitationCallQueue').setTitle('MTM Invitation Call Queue <font style=color:red;>(' + opts._resultSet.metadata.opiRecordCount + ')</font>');
                                        break;
                                    case 'AllCasesOverdue':
                                        view.down('#AllCasesOverdue').setTitle('All Cases Overdue <font style=color:red;>(' + opts._resultSet.metadata.opiRecordCount + ')</font>');
                                        break;
                                    case 'MyCasesOverdue':
                                        view.down('#MyCasesOverdue').setTitle('My Cases Overdue <font style=color:red;>(' + opts._resultSet.metadata.opiRecordCount + ')</font>');
                                        break;
                                    case 'OpenMAPCases':
                                        view.down('#OpenMAPCases').setTitle('Open MAP Cases <font style=color:red;>(' + opts._resultSet.metadata.opiRecordCount + ')</font>');
                                        break;
                                    case 'MTMCMRQueue':
                                        view.down('#MTMCMRQueue').setTitle('MTM CMR Queue <font style=color:red;>(' + opts._resultSet.metadata.opiRecordCount + ')</font>');
                                        break;
                                    case 'MTMTMRQueue':
                                        view.down('#MTMTMRQueue').setTitle('MTM TMR Queue <font style=color:red;>(' + opts._resultSet.metadata.opiRecordCount + ')</font>');
                                        break;
                                    case 'AllCasesDueToday':
                                        view.down('#AllCasesDueToday').setTitle('All Cases Due Today <font style=color:red;>(' + opts._resultSet.metadata.opiRecordCount + ')</font>');
                                        break;
                                    case 'MyCasesDueToday':
                                        view.down('#MyCasesDueToday').setTitle('My Cases Due Today <font style=color:red;>(' + opts._resultSet.metadata.opiRecordCount + ')</font>');
                                        break;
                                }
                            }
                        PagingToolbarStore.removeAll(true);

                        for (var iCnt = 1; iCnt <= opts._resultSet.metadata.opiRecordCount; iCnt++) {
                            PagingToolbarStore.add({PageNumber: iCnt});
                        }
                        PagingToolbarStore.totalCount = opts._resultSet.metadata.opiRecordCount;
                        gridPagingToolbar.bindStore(PagingToolbarStore);
                        gridPagingToolbar.doRefresh();
                        vm.set('LoadPagination', 'false');
                        vm.set('BckRecPointer', '');
                        vm.set('FwdRecPointer', '');
                    }
                    if (records.length != 0) {

                        if (direction == 'Fwd') {
                            vm.set('BckRecPointer', records[0].data.RecPointer);
                            vm.set('FwdRecPointer', records[records.length - 1].data.RecPointer);
                        }
                        else {
                            vm.set('BckRecPointer', records[records.length - 1].data.RecPointer);
                            vm.set('FwdRecPointer', records[0].data.RecPointer);
                        }
                    }
                }
            }
        });
    },
    ShowQueues: function (sender, index) {
        var view = this.getView(),
            id = sender.getItemId(),
            vm = this.getViewModel();
        var StoreMTMCases = vm.get('StoreMTMCases');
        vm.set('BckRecPointer', '');
        vm.set('FwdRecPointer', '');
        vm.set('JumpStart', '0');
        vm.set('Direction', 'Fwd');
        vm.set('LoadPagination', 'true');
        var grid = '';
        if (id != null && id != '') {
            vm.set('LoadPagination', 'true');
            this.onLoadData(id,'0', 'Fwd', '', '');
            //switch (id) {
            //    case 'AllCasesOverdue':
            //        StoreMTMCases.getProxy().setExtraParam('pWhere', "(MTMStatus = '1' OR MTMStatus = '2') AND followupdate < " + Ext.Date.format(new Date(), 'm/d/Y') + " AND closedDate = ? ");
            //        StoreMTMCases.getProxy().setExtraParam('pBatchSize', 100);
            //        StoreMTMCases.getProxy().setExtraParam('ipcDirection', 'FWD');
            //        StoreMTMCases.on({
            //            load: 'onAllCasesOverdueLoad',
            //            single: true // Remove listener after Load
            //        });
            //        StoreMTMCases.load();
            //        view.down('#AllCasesOverdue').setStore(StoreMTMCases);
            //        break;
            //    case 'MyCasesOverdue':
            //        StoreMTMCases.getProxy().setExtraParam('pWhere', "(MTMStatus = '1' OR MTMStatus = '2') AND followupdate < " + Ext.Date.format(new Date(), 'm/d/Y') + " AND closedDate = ? AND CaseManager = '" + Atlas.user.un + "' ");
            //        StoreMTMCases.getProxy().setExtraParam('pBatchSize', 100);
            //        StoreMTMCases.getProxy().setExtraParam('ipcDirection', 'FWD');
            //        StoreMTMCases.load();
            //        view.down('#MyCasesOverdue').setStore(StoreMTMCases);
            //        break;
            //    case 'OpenMAPCases':
            //        StoreMTMCases.getProxy().setExtraParam('pWhere', "MTMStatus = '1'  AND description = '5'");
            //        StoreMTMCases.getProxy().setExtraParam('pBatchSize', 100);
            //        StoreMTMCases.getProxy().setExtraParam('ipcDirection', 'FWD');
            //        StoreMTMCases.load();
            //        view.down('#OpenMAPCases').setStore(StoreMTMCases);
            //        break;
            //    case 'MTMCMR':
            //        var StoreCMRQ = vm.get('StoreCMRQ');
            //        StoreCMRQ.getProxy().setExtraParam('pBatchSize', 100);
            //        StoreCMRQ.getProxy().setExtraParam('ipcDirection', 'FWD');
            //        StoreCMRQ.load();
            //        view.down('#MTMCMRQueue').setStore(StoreCMRQ);
            //        break;
            //    case 'MTMTMR':
            //        var StoreTMRQ = vm.get('StoreTMRQ');
            //        StoreTMRQ.load();
            //        view.down('#MTMTMRQueue').setStore(StoreTMRQ);
            //        break;
            //    case 'MTMInvitationCallQueue':
            //        var StoreInvitationQ = vm.get('StoreInvitationQ');
            //        if (view.down('#fromDate').getValue() != null && view.down('#fromDate').getValue() != '') {
            //            StoreInvitationQ.getProxy().setExtraParam('pEnrollDateFrom', view.down('#fromDate').getValue());
            //        }
            //        else {
            //            StoreInvitationQ.getProxy().setExtraParam('pEnrollDateFrom', null);
            //        }
            //        if (view.down('#toDate').getValue() != null && view.down('#toDate').getValue() != '') {
            //            StoreInvitationQ.getProxy().setExtraParam('pEnrollDateTo', view.down('#toDate').getValue());
            //        }
            //        else {
            //            StoreInvitationQ.getProxy().setExtraParam('pEnrollDateTo', null);
            //        }
            //        if (view.down('#txtCallAttempts').getValue() != null && view.down('#txtCallAttempts').getValue() != '') {
            //            StoreInvitationQ.getProxy().setExtraParam('pCallAttempts', view.down('#txtCallAttempts').getValue());
            //        }
            //        else {
            //            StoreInvitationQ.getProxy().setExtraParam('pCallAttempts', null);
            //        }
            //        StoreInvitationQ.load();
            //        view.down('#MTMInvitationCallQueue').setStore(StoreInvitationQ);
            //        break;
            //    case 'AllCasesDueToday':
            //        StoreMTMCases.getProxy().setExtraParam('pWhere', "(MTMStatus = '1' OR MTMStatus = '2') AND followupdate = " + Ext.Date.format(new Date(), 'm/d/Y') + " AND closedDate = ? ");
            //        StoreMTMCases.getProxy().setExtraParam('pBatchSize', 100);
            //        StoreMTMCases.getProxy().setExtraParam('ipcDirection', 'FWD');
            //        StoreMTMCases.load();
            //        view.down('#AllCasesDueToday').setStore(StoreMTMCases);
            //        break;
            //    case 'MyCasesDueToday':
            //        StoreMTMCases.getProxy().setExtraParam('pWhere', "(MTMStatus = '1' OR MTMStatus = '2') AND followupdate = " + Ext.Date.format(new Date(), 'm/d/Y') + " AND closedDate = ? AND CaseManager '" + Atlas.user.un + "' ");
            //        StoreMTMCases.getProxy().setExtraParam('pBatchSize', 100);
            //        StoreMTMCases.getProxy().setExtraParam('ipcDirection', 'FWD');
            //        StoreMTMCases.load();
            //        view.down('#MyCasesDueToday').setStore(StoreMTMCases);
            //        break;
            //}

        }
    },
     ValidateInvitationQSearch : function () {

         var view=this.getView();
         var vm=this.getViewModel();
        if (view.down('#fromDate').getValue()==null || view.down('#fromDate').getValue() == '' || view.down('#toDate').getValue() == null || view.down('#toDate').getValue() == '') {
            Ext.Msg.alert('PBM', 'Enroll Date is required.');
            return false;
        }
         else
        {
            vm.set('searchAttempted',true);
            var StoreInvitationQ = vm.get('StoreInvitationQ');
            if (view.down('#fromDate').getValue() != null && view.down('#fromDate').getValue() != '') {
                StoreInvitationQ.getProxy().setExtraParam('pEnrollDateFrom', view.down('#fromDate').getValue());
            }
            if (view.down('#toDate').getValue() != null && view.down('#toDate').getValue() != '') {
                StoreInvitationQ.getProxy().setExtraParam('pEnrollDateTo', view.down('#toDate').getValue());
            }
            if (view.down('#txtCallAttempts').getValue() != null && view.down('#txtCallAttempts').getValue() != '') {
                StoreInvitationQ.getProxy().setExtraParam('pCallAttempts', view.down('#txtCallAttempts').getValue());
            }
            StoreInvitationQ.load();
            view.down('#MTMTMRQueue').setStore(StoreInvitationQ);
        }
    },
   resetInvitationQSearch :function () {
       var view=this.getView();
       var vm=this.getViewModel();
        var load=false;
       if((view.down('#fromDate').getValue()!=null || view.down('#toDate').getValue()!=null || view.down('#txtCallAttempts').getValue()!="")&& vm.get('searchAttempted'))
       {
           load=true;
       }
       view.down('#fromDate').setValue('');
       view.down('#toDate').setValue('');
       view.down('#txtCallAttempts').setValue('');
       if(load) {
           var StoreInvitationQ = vm.getStore('StoreInvitationQ');
           StoreInvitationQ.getProxy().setExtraParam('pEnrollDateFrom', '');
           StoreInvitationQ.getProxy().setExtraParam('pEnrollDateTo', '');
           StoreInvitationQ.getProxy().setExtraParam('pCallAttempts', '');
           StoreInvitationQ.load();
           vm.set('searchAttempted',false);
           view.down('#MTMTMRQueue').setStore(StoreInvitationQ);
       }
    }
});
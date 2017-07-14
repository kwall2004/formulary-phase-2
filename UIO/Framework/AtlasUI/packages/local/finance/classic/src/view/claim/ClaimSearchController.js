Ext.define('Atlas.finance.view.collection.ClaimAuditSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-claimsearch',

    onSearch: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            store = vm.getStore('claimauditsearch'),
            data = view.getReferences().claimsearchform.getValues(),
            dateTo = view.down('#dateTo').getValue(),
            dateFrom = view.down('#dateFrom').getValue();

        if (!(dateTo) || !(dateFrom)){
            Ext.Msg.alert('Validation', 'Please select date range first');
            return;
        }

        dateFrom = Ext.util.Format.date(dateFrom, 'm/d/Y g:i:s A');
        dateTo = Ext.util.Format.date(dateTo, 'm/d/Y g:i:s A');

        vm.set('pAuditErrorCode', data.reasonCode + "^" + data.errorCode + "^" + data.resolutionCode);
        vm.set('pStartDate', dateFrom);
        vm.set('pEndDate', dateTo);
        vm.set('ipiJumpStart', 0);
        vm.set('ipcDirection', 'Fwd');
        vm.set('ipcBckRecPointer', '');
        vm.set('ipcFwdRecPointer', '');
        vm.set('pTransId', data.claimId);
        vm.set('loadPagination', true);

        me.onLoadDetailData(store);
    },

    onLeaveDatefield:function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },

    getSelectedPageData: function(pagingToolbar, page){
        var me = this,
            store = me.getViewModel().getStore('claimauditsearch'),
            prevPage = pagingToolbar.store.currentPage,
            pageDiff = page - prevPage,
            isJump = false,
            searchParams = me.getViewModel().getData();

        if (pageDiff != 1 && pageDiff != -1){
            isJump = true;
        }

        if (isJump) {
            searchParams.ipcDirection = 'Fwd';
            searchParams.ipiJumpStart = (page - 1) * searchParams.ipiBatchSize;
            searchParams.ipcBckRecPointer = '';
            searchParams.ipcFwdRecPointer = '';
        }
        else if (prevPage > page){
            searchParams.ipcDirection = 'Bck';
            searchParams.ipiJumpStart = 0;
        }
        else {
            searchParams.ipcDirection = 'Fwd';
            searchParams.ipiJumpStart = 0;
        }

        me.onLoadDetailData(store);

        return true;
    },

    onLoadDetailData: function(store){
        var me = this,
            searchParams = me.getViewModel().getData(),
            proxy = store.getProxy();

        store.onAfter('load', 'onLoadGridPagination');

        proxy.setExtraParam('ipcBckRecPointer', searchParams.ipcBckRecPointer);
        proxy.setExtraParam('ipcDirection', searchParams.ipcDirection);
        proxy.setExtraParam('ipcFilter', searchParams.ipcFilter);
        proxy.setExtraParam('ipcFwdRecPointer', searchParams.ipcFwdRecPointer);
        proxy.setExtraParam('ipiBatchSize', searchParams.ipiBatchSize);
        proxy.setExtraParam('ipiJumpStart', searchParams.ipiJumpStart);
        proxy.setExtraParam('pAuditErrorCode', searchParams.pAuditErrorCode);
        proxy.setExtraParam('pEndDate', searchParams.pEndDate);
        proxy.setExtraParam('pQueueName', searchParams.pQueueName);
        proxy.setExtraParam('pStartDate', searchParams.pStartDate);
        proxy.setExtraParam('pTransId', searchParams.pTransId);
        proxy.setExtraParam('pagination', searchParams.pagination);
        store.load({
            callback: function(records){
                /*
                 for each record, see if there is a null or 0 value; if so, set a
                 value that will hide or show the button on the column
                 */
                if (records){
                    for (var idx = 0, length = records.length; idx < length; idx = idx + 1){
                        
                        if (records[idx].get('transactionId') === 0){
                            records[idx].set('notZeroClaim', false);
                        }
                        else {
                            records[idx].set('notZeroClaim', true);
                        }

                        if (records[idx].get('RevClaimId') === 0){
                            records[idx].set('notZeroRevClaim', false);
                        }
                        else {
                            records[idx].set('notZeroRevClaim', true);
                        }

                        if (records[idx].get('adjustedTransId') === 0){
                            records[idx].set('notZeroAdjClaim', false);
                        }
                        else {
                            records[idx].set('notZeroAdjClaim', true);
                        }

                        if (records[idx].get('NCPDPId') === ''){
                            records[idx].set('notZeroNcpdpId', false);
                        }
                        else {
                            records[idx].set('notZeroNcpdpId', true);
                        }

                        if (records[idx].get('RecipientId') === '0'){
                            records[idx].set('notZeroRecipName', false);
                        }
                        else {
                            records[idx].set('notZeroRecipName', true);
                        }
                    }
                    this.commitChanges();
                }
            }
        });
    },

    onLoadGridPagination: function(store, records, success, opts){
        var me = this,
            vm = me.getViewModel(),
            searchParams = me.getViewModel().getData(),
            PagingToolbarStore,
            gridPagingToolbar = me.getView().down('pagingtoolbar');

        PagingToolbarStore = me.getViewModel().getStore('PagingToolbarStore');

        store.unAfter('load', 'onLoadGridPagination');
        if (success) {
            /*
             loadPagination is a value used to help determine the total recs. Because the initial load
             is the one to return the total number of records for the grid, loadPagination is set to
             true for the click. loadPagination is set to false after the page has been loaded, and
             it stays false until the search button is clicked again.
             */
            if (searchParams.loadPagination == true) {
                var totalRecs;

                PagingToolbarStore.removeAll(true);

                /*
                 if the search button was just clicked, get the total rec count, set the title
                 of the grid, and change the flag to denote a fresh search button click to false
                 */
                totalRecs = opts._resultSet.metadata.opiRecordCount;

                for (var iCnt = 1; iCnt <= totalRecs; iCnt++) {
                    PagingToolbarStore.add({PageNumber: iCnt});
                }

                PagingToolbarStore.totalCount = opts._resultSet.metadata.opiRecordCount;

                gridPagingToolbar.bindStore(PagingToolbarStore);
                gridPagingToolbar.doRefresh();

                searchParams.ipcBckRecPointer = '';
                searchParams.ipcFwdRecPointer = '';
                searchParams.loadPagination = false;
            }
            if (records.length != 0) {
                if (searchParams.ipcDirection == 'Fwd') {
                    searchParams.ipcBckRecPointer = records[0].data.RecPointer;
                    searchParams.ipcFwdRecPointer =records[records.length - 1].data.RecPointer;
                }
                else {
                    searchParams.ipcBckRecPointer = records[records.length - 1].data.RecPointer;
                    searchParams.ipcFwdRecPointer = records[0].data.RecPointer;
                }
            }
        }
    },

    onReset: function () {
        var me = this,
            view = me.getView();

        view.getReferences().claimsearchform.reset();
        me.onSearch();
    },

    onColumnBtn: function(btn, event, eOpts){
        var me = this,
            record = btn._rowContext.record,
            node,
            menuId,
            grid = btn.up('grid'),
            dataIndex = btn.measurer.dataIndex,
            atlasId,
            packageName,
            pageName;

        if (dataIndex === 'transactionId'){
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');
            atlasId = record.get('transactionId');
            packageName = 'claims';
            pageName= 'ClaimsToolbar';
        }
        else if (dataIndex === 'RevClaimId'){
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');
            atlasId = record.get('RevClaimId');
            packageName = 'claims';
            pageName= 'ClaimsToolbar';
        }
        else if(dataIndex === 'adjustedTransId'){
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');
            atlasId = record.get('adjustedTransId');
            packageName = 'claims';
            pageName= 'ClaimsToolbar';
        }
        else if(dataIndex === 'NCPDPId'){
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy');
            atlasId = record.get('NCPDPId');
            packageName = 'pharmacy';
            pageName= 'Pharmacy';
        }
        else if(dataIndex === 'RecipientId'){
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');
            atlasId = record.get('RecipientId');
            packageName = 'member';
            pageName= 'MemberToolbar';

            me.fireEvent('openView','merlin',packageName,pageName, {
                RID: atlasId,
                menuId: menuId
            });
            return;
        }

       /* menuId = node.get('menuID');*/

        me.fireEvent('openView','merlin',packageName,pageName, {
            atlasId: atlasId,
            menuId: menuId
        });
    },

    onExport: function () {
        var me = this,
            refs = me.getReferences(),
            theForm = refs.claimsearchform.getForm();
        //   store = me.getViewModel().getStore('claimauditsearch');
        //var exportExcel = Atlas.common.utility.Utilities.exportToExcel(store);
        //refs.claimsearchform.getForm().findField('dateFrom').value
        var transactionId = theForm.findField('claimId').value == '' ? '0' : theForm.findField('claimId').value;
        var startDate = theForm.findField('dateFrom').value == null ? '' : Ext.Date.format(theForm.findField('dateFrom').value, 'm/d/Y');
        var endDate = theForm.findField('dateTo').value == null ? '' : Ext.Date.format(theForm.findField('dateTo').value, 'm/d/Y');
        var reasonCode = theForm.findField('reasonCode').value == null ? '' : theForm.findField('reasonCode').value;
        var errorCode = theForm.findField('errorCode').value == null ? '' : theForm.findField('errorCode').value;
        var resolutionCode = theForm.findField('resolutionCode').value == null ? '' : theForm.findField('resolutionCode').value;

        var params = {
            pDescription: 'Export Claims Audit',
            pProgramName: 'rptClaimsAudit.p',
            pParameters: startDate + '|' + endDate + '|' + transactionId + '|' + reasonCode + '|' + errorCode + '|' + resolutionCode,
            pRunMode: 2,
            pProgramType: 'Report',
            pSaveDocument: true,
            pFaxNumber: ''
        };

        saveAction =[{
            "Save": {"key": '', "value": ''}
        }];

        var submitJob = Atlas.common.utility.Utilities.saveData([], 'shared/rx/submitjob/update', null,[false], params,
            saveAction, ['pJobNumber']);

        if (submitJob.code === 0){
            Ext.Msg.alert('PBM', 'Export Claims Audit job has been queued, Please check job queue with job #: ' + submitJob.pJobNumber);
        }

    }
});
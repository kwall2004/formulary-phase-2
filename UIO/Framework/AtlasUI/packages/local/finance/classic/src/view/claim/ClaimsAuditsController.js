Ext.define('Atlas.finance.view.collection.ClaimsAuditsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-claimsaudits',

    listen: {
        controller: {
            '#common-fileUploadController':{
                successfulUpload: 'onSuccessfulUpload'
            }
        }
    },

    init: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            responseGrid = view.getReferences().responsequeue,
            resolutionGrid = view.getReferences().resolutionqueue,
            takeBacksGrid = view.getReferences().takebacks,
            approvalGrid = view.getReferences().approvalqueue,
            storeResponseQueue = me.retrieveStore('responseQueue'),
            storeResolutionQueue = me.retrieveStore('resolutionQueue'),
            storeTakeBacks = me.retrieveStore('takeBacks'),
            storeApprovalQueue = me.retrieveStore('approvalQueue'),
            storeErrorCode = me.retrieveStore('errorCode'),
            storeReasonCode = me.retrieveStore('reasonCode'),
            storeResolutionCode = me.retrieveStore('resolutionCode');

        vm.getStore('takeBacksAllRecs').onAfter('load', 'onLoadTakeBacks');

        responseGrid.down('pagingtoolbar').items.items[10].onAfter('click', 'onClickRefresh');
        resolutionGrid.down('pagingtoolbar').items.items[10].onAfter('click', 'onClickRefresh');
        approvalGrid.down('pagingtoolbar').items.items[10].onAfter('click', 'onClickRefresh');
        takeBacksGrid.down('pagingtoolbar').items.items[10].onAfter('click', 'onClickRefreshTakebacks');

        storeErrorCode.load({
            params: {
                pListName: 'auditErrorCode'
            }
        });
        storeReasonCode.load({
            params: {
                pListName: 'auditReasonCode'
            }
        });

        storeResolutionCode.load({
            params: {
                pListName: 'auditResolutionCode'
            }
        });

        vm.set('responseRecCount', storeResponseQueue.getCount());
        vm.set('resolutionRecCount', storeResolutionQueue.getCount());
        vm.set('takebacksRecCount', storeTakeBacks.getCount());
        vm.set('approvalRecCount', storeApprovalQueue.getCount());
    },

    onClickRefresh:function(btnRefresh){
        var myGrid = btnRefresh.up('grid'),
            gridName = this.getGridName(myGrid);

        if(myGrid.getStore().getCount() > 0){
            this.getSelectedPageData(myGrid.down('pagingtoolbar'), 1);
        }
    },

    onClickRefreshTakebacks:function(btnRefresh){
        var myGrid = btnRefresh.up('grid');

        if (myGrid.getStore().getCount() > 0){
            myGrid.mask('loading');
            this.onLoadTakeBacks(this.retrieveStore('takeBacksAllRecs'));
        }
    },

    resolutionCodeInitLoad: function(resolutionCodeInitLoad){
        var selectedArray = [],filteredArray=[];
        resolutionCodeInitLoad.data.items.forEach(function (val,index) {
            if (val.data.charString.toString().toLowerCase() == "audittakeback" && val.data.Active=="true") {
                selectedArray.push(val.data.ListItem);
                filteredArray.push(val.data);
            }
        });

        resolutionCodeInitLoad.removeAll();
        filteredArray.forEach(function (v,i) {
            resolutionCodeInitLoad.insert(0,{ListDescription:v.ListDescription,ListItem: v.ListItem});
        });
    },

    onLeaveDatefield: function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },

    onSearch: function (btnSearch) {
        var me = this,
            grid = btnSearch.up('grid'),
            params = me.getSearchParams(grid),
            gridName = me.getGridName(grid),
            dateFrom,dateTo;

        if (gridName === 'Response'){
            dateFrom = grid.down('#dateFromResponse').getValue();
            dateTo = grid.down('#dateToResponse').getValue();

            if (!(dateFrom) || !(dateTo)){
                Ext.Msg.alert('Validation', 'Please select date range first');
                return;
            }

            var arrayReasonCode = grid.down('[fieldLabel = Reason Code]').getValue(),
                stringReasonCode = me.retrieveStringOfCbxValues(arrayReasonCode),
                claimId = grid.down('#claimIdResponse').getValue();

            dateFrom = Ext.util.Format.date(dateFrom, 'm/d/Y g:i:s A');
            dateTo = Ext.util.Format.date(dateTo, 'm/d/Y g:i:s A');

            if (!claimId){
                claimId = 0;
            }

            params.pTransId = claimId;
            params.pStartDate = dateFrom;
            params.pEndDate = dateTo;
            params.pAuditErrorCode = stringReasonCode;
        }
        else if (gridName === 'Resolution'){
            dateFrom = grid.down('#dateFromResolution').getValue();
            dateTo = grid.down('#dateToResolution').getValue();

            if (!(dateFrom) || !(dateTo)){
                Ext.Msg.alert('Validation', 'Please select date range first');
                return;
            }

            var arrayErrorCode = grid.down('#cbxErrorCode').getValue(),
                stringErrorCode = me.retrieveStringOfCbxValues(arrayErrorCode),
                claimId = grid.down('#claimIdResolution').getValue();

            dateFrom = Ext.util.Format.date(dateFrom, 'm/d/Y g:i:s A');
            dateTo = Ext.util.Format.date(dateTo, 'm/d/Y g:i:s A');

            if (!claimId){
                claimId = 0;
            }

            params.pTransId = claimId;
            params.pStartDate = dateFrom;
            params.pEndDate = dateTo;
            params.pAuditErrorCode = stringErrorCode;
        }
        else if(gridName === 'Take Backs'){
            dateFrom = grid.down('#dateFromTakeBacks').getValue();
            dateTo = grid.down('#dateToTakeBacks').getValue();

            if (!(dateFrom) || !(dateTo)){
                Ext.Msg.alert('Validation', 'Please select date range first');
                return;
            }
            var arrayErrorCode = grid.down('#iDresolutionCode').getValue(),
                stringErrorCode = me.retrieveStringOfCbxValues(arrayErrorCode),
                claimId = grid.down('#claimIdTakeBacks').getValue();

            dateFrom = Ext.util.Format.date(dateFrom, 'm/d/Y g:i:s A');
            dateTo = Ext.util.Format.date(dateTo, 'm/d/Y g:i:s A');

            if (!claimId){
                claimId = 0;
            }

            params.pTransId = claimId;
            params.pStartDate = dateFrom;
            params.pEndDate = dateTo;
            params.pAuditErrorCode = stringErrorCode;
        }
        else if (gridName === 'Approval'){
            dateFrom = grid.down('#dateFromApproval').getValue();
            dateTo = grid.down('#dateToApproval').getValue();

            if (!(dateFrom) || !(dateTo)){
                Ext.Msg.alert('Validation', 'Please select date range first');
                return;
            }

            var claimId = grid.down('#claimIdApproval').getValue();

            dateFrom = Ext.util.Format.date(dateFrom, 'm/d/Y g:i:s A');
            dateTo = Ext.util.Format.date(dateTo, 'm/d/Y g:i:s A');

            if (!claimId){
                claimId = 0;
            }

            params.pQueueName = params.pQueueName;
            params.pTransId = claimId;
            params.pStartDate = dateFrom;
            params.pEndDate = dateTo;
            params.pAuditErrorCode = '';
        }

        params.pQueueName = params.pQueueName;
        params.ipiBatchSize = params.ipiBatchSize;
        params.ipiJumpStart = 0;
        params.ipcFilter = params.ipcFilter;
        params.ipcDirection = 'Fwd';
        params.ipcBckRecPointer = '';
        params.ipcFwdRecPointer = '';
        params.pagination = false;
        params.loadPagination = true;

        if (gridName === 'Take Backs'){
            var storeTakeBacks = me.getViewModel().getStore('takeBacksAllRecs');

            grid.mask('loading');

            storeTakeBacks.load({
                params: params
            });
            return;
        }

        me.onLoadDetailData(grid);
    },

    onLoadTakeBacks: function(storeTakeBacksAllRecs){
        var vm = this.getViewModel(),
            storeTakeBacksFiltered = vm.getStore('takeBacks'),
            gridTakeBacks = this.getView().getReferences().takebacks;
        var filteredField = [{
            filterType: 'string',
            valueToFilter: ''
        }];

        gridTakeBacks.down('pagingtoolbar').moveFirst();

        Atlas.common.view.GetFilteredStore.getFilteredStore(storeTakeBacksAllRecs, filteredField, storeTakeBacksFiltered);

        gridTakeBacks.unmask();

        vm.set('takebacksRecCount', storeTakeBacksAllRecs.getCount());
    },

    retrieveStringOfCbxValues: function(array){
        /*
         the comboboxes are placed in an array upon selection. This function concatenates into a string value
         */
        if(array.length === 0){
            return '';
        }

        var stringVal = null;

        array.forEach(function(element){
            stringVal = stringVal + ',' + element;
        });

        return stringVal.substr(5);
    },

    onSaveTBProcess: function(btn){
        var me = this,
            view = me.getView(),
            selectedRecord = [],
            grid = btn.up('grid'),
            selectionModel = grid.getSelectionModel().getSelection(),
            btnName = btn.getText();

        Ext.each(selectionModel, function (item) {
            selectedRecord.push(item.data);
        });

         if(selectedRecord.length==0)
         {
             Ext.MessageBox.show({
                 title: 'PBM',
                 msg: "Please select a record first.",
                 buttons: Ext.Msg.OK,
                 icon: Ext.Msg.INFO
             });

             return;
         }


        if (selectionModel){
            if (btnName === 'Acknowledge' || btnName === 'Process'){
                var winAck = Ext.create({
                    xtype: 'window',
                    closable: true,
                    floatable: true,
                    draggable: true,
                    modal: true,
                    width: 500,
                    height: 150,
                    title: 'PBM',
                    adjustedQty: null,
                    adjustedDaysSupply: null,
                    takeBackType: null,
                    resolutionNotes: '',
                    selectedRecord:selectedRecord,
                    action: null,
                    transactionId: 0,
                    adjustedAmt: 0,
                    theGrid: grid,
                    items: [{
                        xtype: 'displayfield'
                    }],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [
                            '->',
                            {
                                xtype: 'button',
                                text: 'Yes',
                                handler: function(btnYes){
                                    var window = btnYes.up('window'),
                                        datacol=[],
                                        controller = btnYes.lookupController();
                                    window.selectedRecord.forEach(function (v,i) {
                                      var  record = Ext.create('Atlas.finance.model.setClaimAudit');

                                        record.set('adjustedQty', winAck.adjustedQty );
                                        record.set('adjustedDaysSupply', winAck.adjustedDaysSupply);
                                        record.set('TakeBackType', winAck.takeBackType);
                                        record.set('resolutionNotes', winAck.resolutionNotes);
                                        record.set('Action', winAck.action);
                                        record.set('TransactionId', v.transactionId);
                                        record.set('adjustedAmount', winAck.adjustedAmt);
                                        datacol.push(record)
                                    })
                                    window.close();

                                    controller.completeSaveTBProcess(datacol, window.theGrid,true);
                                }
                            }, {
                                xtype: 'button',
                                text: 'No',
                                handler: function(btnNo){
                                    var window = btnNo.up('window');
                                    window.close();
                                }
                            },
                            '->'
                        ]
                    }]
                });

                view.add(winAck);

                if (btnName === 'Acknowledge'){
                    winAck.down('displayfield').setValue('Do you want to acknowledge this claim has no change?');
                    winAck.adjustedQty = 0;
                    winAck.adjustedDaysSupply = 0;
                    winAck.takeBackType = 'NA';
                    winAck.resolutionNotes = '';
                    winAck.action = 'Ack';
                    winAck.show();
                }
                else if (btnName === 'Process'){
                    if( grid.getSelectionModel().getSelection().length==2)
                    {
                        Ext.MessageBox.show({
                            title: 'PBM',
                            msg: "Please select only one record.",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });

                        return;
                    }
                    selectionModel = grid.getSelectionModel().getSelection()[0];

                    winAck.down('displayfield').setValue('Processing Takebacks will reverse original claims and reprocess amounts with new claim ID\'s.Do you wish to continue?');
                    winAck.adjustedQty = selectionModel.get('adjustedQty');
                    winAck.adjustedDaysSupply = selectionModel.get('adjustedDaysSupply');
                    winAck.takeBackType = selectionModel.get('takebackType');
                    winAck.resolutionNotes = selectionModel.get('resolutionNotes');
                    winAck.action = 'Process';
                    winAck.show();
                }
            }
            else if (btnName === 'Update'){
                if( grid.getSelectionModel().getSelection().length > 1)
                {
                    Ext.MessageBox.show({
                        title: 'PBM',
                        msg: "Please select only one record.",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });

                    return;
                }
                selectionModel = grid.getSelectionModel().getSelection()[0];
                var winUpdate = Ext.create({
                    xtype: 'window',
                    closable: true,
                    floatable: true,
                    draggable: true,
                    modal: true,
                    width: 500,
                    height: 350,
                    title: 'Update Takeback Detail: Claim # ' + selectionModel.get('transactionId'),
                    layout: 'form',
                    theGrid: grid,
                    viewModel: {
                        data: {
                            enableNewQuant: true,
                            enableDaysSupply: true
                        }
                    },
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: 'Adjustment Type',
                        forceSelection: true,
                        allowBlank: false,
                        displayField: 'name',
                        valueField: 'value',
                        store: {
                            data: [{
                                name: 'Partial',
                                value: 'P'
                            }, {
                                name: 'Full',
                                value: 'F'
                            }]
                        },
                        listeners: {
                            select: function(combo, record){
                                var vm = this.up('window').getViewModel();

                                if (record.get('name') === 'Full'){
                                    vm.set('enableNewQuant', false);
                                    vm.set('enableDaysSupply', false);
                                }
                                else if (record.get('name') === 'Partial'){
                                    vm.set('enableNewQuant', true);
                                    vm.set('enableDaysSupply', true);
                                }
                            },
                            render: function(cbx){
                                var vm = this.up('window').getViewModel();

                                if (cbx.getValue() === 'F'){
                                    vm.set('enableNewQuant', false);
                                    vm.set('enableDaysSupply', false);
                                }
                                else if (cbx.getValue() === 'P'){
                                    vm.set('enableNewQuant', true);
                                    vm.set('enableDaysSupply', true);
                                }
                            }
                        }
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'New Quantity',
                        itemId: 'newQuant',
                        bind: {
                            disabled: '{!enableNewQuant}'
                        },
                        hideTrigger: true,
                        minValue: 0
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Days Supply',
                        itemId: 'daysSupp',
                        bind: {
                            disabled: '{!enableDaysSupply}'
                        },
                        hideTrigger: true,
                        minValue: 0
                    }, {
                        xtype: 'textareafield',
                        fieldLabel: 'Notes',
                        height: 175,
                        allowBlank: false
                    }],
                    dockedItems: [{
                        dock: 'bottom',
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                xtype: 'button',
                                text: 'Save',
                                iconCls: 'x-fa fa-floppy-o',
                                handler: function(btnSave){
                                    var controller = btnSave.lookupController(),
                                        record = Ext.create('Atlas.finance.model.setClaimAudit'),
                                        window = btnSave.up('window'),
                                        actionType = 'Save',
                                        adjQty = window.down('#newQuant').getValue(),
                                        adjDaysSupp = window.down('#daysSupp').getValue(),
                                        cbxTakeBackType = window.down('combobox').getValue(),
                                        resNotes = window.down('textareafield').getValue(),
                                        adjAmt = 0;

                                    if (cbxTakeBackType === 'P' && ((adjQty == null) || (adjDaysSupp == null))){
                                        Ext.Msg.alert('Error', 'Quantity and Days Supply both cannot be blank');
                                        return;
                                    }

                                    record.set('adjustedQty', adjQty);

                                    if (cbxTakeBackType === 'F'){
                                        adjQty = 0;
                                        adjDaysSupp = 0;
                                    }
                                    else{
                                        if(adjDaysSupp == ''){
                                            adjDaysSupp = 0;
                                        }
                                    }
                                    record.set('adjustedDaysSupply', adjDaysSupp);
                                    record.set('TakeBackType', cbxTakeBackType);
                                    record.set('resolutionNotes', resNotes);
                                    record.set('Action', actionType);
                                    record.set('TransactionId', selectionModel.get('transactionId'));
                                    record.set('adjustedAmount', adjAmt);

                                    controller.completeSaveTBProcess(record, window.theGrid);
                                    window.close();
                                }
                            }, {
                                xtype: 'button',
                                text: 'Cancel',
                                iconCls: 'x-fa fa-times',
                                handler: function(btndelete){
                                    var window = btndelete.up('window');
                                    window.close();
                                }
                            }]
                    }]
                });
                view.add(winUpdate);
                if (me.getGridName(grid) === 'Approval'){
                    var adjustedQty = winUpdate.down('[fieldLabel = New Quantity]'),
                        adjustedDaysSupply = winUpdate.down('[fieldLabel = Days Supply]'),
                        cbxTBType = winUpdate.down('combobox');

                    adjustedQty.setValue(selectionModel.get('adjustedQty'));
                    adjustedDaysSupply.setValue(selectionModel.get('adjustedDaysSupply'));
                    cbxTBType.setValue(selectionModel.get('takebackType'));
                }
                winUpdate.show();
            }
        }
        else {
            Ext.Msg.alert('Select Row', 'Please select a row before trying to make updates');
        }
    },

    completeSaveTBProcess:function(record, grid,AckAction){
        var me = this,
            storeSetClaimAudits = me.retrieveStore('setClaimAudits');

        storeSetClaimAudits.removeAll();
        storeSetClaimAudits.commitChanges();
        storeSetClaimAudits.add(record);

        var saveAction =[{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        var setClaimAudits = Atlas.common.utility.Utilities.saveData([storeSetClaimAudits], 'claims/rx/claimsaudit/update', 'ttClaimsAudit',[false], null,
            saveAction, null);

        if (setClaimAudits.code === 0){
            var btnSearch = grid.down('[text = Search]');

            if(AckAction)
            {
                Ext.Msg.alert('PBM', 'Audits successfully acknowledged');
                me.onSearch(btnSearch);
            }

            switch (record.get('Action')){
                case 'Ack':
                    Ext.Msg.alert('PBM', 'Audits successfully acknowledged');
                    break;

                case 'Process':
                    Ext.Msg.alert('PBM', 'Audits successfully processed');
                    break;

                case 'Save':
                    Ext.Msg.alert('PBM', 'Audits successfully saved');
                    break;
            }
            me.onSearch(btnSearch);
        }
        else {
            Ext.Msg.alert('Error', setClaimAudits.message);
        }
    },

    getSelectedPageData: function(pagingToolbar, page){
        var me = this,
            grid = pagingToolbar.up('grid'),
            prevPage = pagingToolbar.store.currentPage,
            pageDiff = page - prevPage,
            isJump = false,
            searchParams = me.getSearchParams(grid);

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

        me.onLoadDetailData(grid);

        return true;
    },

    onLoadDetailData: function(grid){
        var me = this,
            store = grid.getStore(),
            searchParams = me.getSearchParams(grid);

        store.onAfter('load', 'onLoadGridPagination');

        store.load({
            params: searchParams,
            callback: function(records){
                /*
                 for each record, see if there is a null or 0 value; if so, set a
                 value that will hide or show the button on the column
                 */
                if (records){
                    for (var idx = 0, length = records.length; idx < length; idx = idx + 1){
                        if (records[idx].get('transactionId') === 0 || grid.getColumns()[1].isHidden()){
                            records[idx].set('notZeroClaim', false);
                        }
                        else {
                            records[idx].set('notZeroClaim', true);
                        }

                        if (records[idx].get('RevClaimId') === 0 || grid.getColumns()[3].isHidden()){
                            records[idx].set('notZeroRevClaim', false);
                        }
                        else {
                            records[idx].set('notZeroRevClaim', true);
                        }

                        if (records[idx].get('adjustedTransId') === 0 || grid.getColumns()[2].isHidden()){
                            records[idx].set('notZeroAdjClaim', false);
                        }
                        else {
                            records[idx].set('notZeroAdjClaim', true);
                        }

                        if (records[idx].get('NCPDPId') === '' || grid.getColumns()[4].isHidden()){
                            records[idx].set('notZeroNcpdpId', false);
                        }
                        else {
                            records[idx].set('notZeroNcpdpId', true);
                        }

                        if (records[idx].get('RecipientId') === '0'|| grid.getColumns()[6].isHidden()){
                            records[idx].set('notZeroRecipName', false);
                        }
                        else {
                            records[idx].set('notZeroRecipName', true);
                        }
                    }
                }
            }
        });
    },

    onLoadGridPagination: function(store, records, success, opts){
        var me = this,
            vm = me.getViewModel(),
            grid = me.getGrid(store),
            searchParams = me.getSearchParams(grid),
            PagingToolbarStore,
            gridPagingToolbar = grid.down('pagingtoolbar');

        if (me.getGridName(grid) === 'Response'){
            PagingToolbarStore = me.retrieveStore('PagingToolbarResponse');
        }
        else if (me.getGridName(grid) === 'Resolution'){
            PagingToolbarStore = me.retrieveStore('PagingToolbarResolution');
        }
        else if (me.getGridName(grid) === 'Take Backs'){
            PagingToolbarStore = me.retrieveStore('PagingToolbarTakeBack');
        }
        else if (me.getGridName(grid) === 'Approval'){
            PagingToolbarStore = me.retrieveStore('PagingToolbarApproval');
        }

        store.unAfter('load', 'onLoadGridPagination');
        if (success) {
            /*
             loadPagination is a value used to help determine the total recs. Because the initial load
             is the one to return the total number of records for the grid, loadPagination is set to
             true for the click. loadPagination is set to false after the page has been loaded, and
             it stays false until the search button is clicked again. The grid's totalRec config holds
             the total rec count
             */
            if (searchParams.loadPagination == true) {
                var totalRecs;

                PagingToolbarStore.removeAll(true);

                /*
                 if the search button was just clicked, get the total rec count, set the title
                 of the grid, and change the flag to denote a fresh search button click to false
                 */
                totalRecs = opts._resultSet.metadata.opiRecordCount;
                if (me.getGridName(grid) === 'Response'){
                    vm.set('responseRecCount', totalRecs);
                }
                else if (me.getGridName(grid) === 'Resolution'){
                    vm.set('resolutionRecCount', totalRecs);
                }
                else if(me.getGridName(grid) === 'Approval'){
                    vm.set('approvalRecCount', totalRecs);
                }
                grid.totalRecs = totalRecs;

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
        }

      //  menuId = node.get('menuID');

        me.fireEvent('openView','merlin',packageName,pageName, {
            atlasId: atlasId,
            menuId: menuId
        });
    },

    saveAttachment: function () {
        var me = this,
            view = me.getView();

        var winAddAttach = Ext.create('Ext.window.Window', {
            title: 'Upload File',
            floating: true,
            layout: {type: 'fit', align: 'stretch'},
            modal: true,
            closable: true,
            draggable: true,
            resizable: true,
            width: 500,
            height: 300,
            autoShow: false,
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    tbar: {
                        xtype: 'displayfield',
                        value: 'Please select one file to upload',
                        width: '100%'
                    },
                    width: '100%',
                    height: '100%',
                    // keyType: 'imagePlanGroupDoc',
                    keyType: 'ImageClaimsAudit',
                    fileType: 'xls,xlsx',
                    maxUploadNum: 1/*,
                 endpoint: 'shared/rx/document/update'*/
                }
            ]
        });

        view.add(winAddAttach);
        winAddAttach.show();
    },

    getGridName: function(grid){
        if (grid.getTitle().substr(0, 8) === 'Response'){
            return 'Response';
        }
        else if (grid.getTitle().substr(0, 10) === 'Resolution'){
            return 'Resolution';
        }
        else if(grid.getTitle().substr(0, 10) === 'Take Backs'){
            return 'Take Backs';
        }
        else if (grid.getTitle().substr(0, 8) === 'Approval'){
            return 'Approval';
        }
    },

    getGrid: function(store){
        var me = this,
            view = me.getView(),
            storeResponseQueue = me.retrieveStore('responseQueue'),
            storeResolutionQueue = me.retrieveStore('resolutionQueue'),
            storeTakeBacks = me.retrieveStore('takeBacks'),
            storeApprovalQueue = me.retrieveStore('approvalQueue'),
            storePagingToolbarResponse = me.retrieveStore('PagingToolbarResponse'),
            storePagingToolbarResolution = me.retrieveStore('PagingToolbarResolution'),
            storePagingToolbarTakeBack = me.retrieveStore('PagingToolbarTakeBack'),
            storePagingToolbarApproval = me.retrieveStore('PagingToolbarApproval');

        switch (store){
            case storePagingToolbarResponse:
            case storeResponseQueue:
                return view.getReferences().responsequeue;

            case storeResolutionQueue:
            case storePagingToolbarResolution:
                return view.getReferences().resolutionqueue;

            case storeTakeBacks:
            case storePagingToolbarTakeBack:
                return view.getReferences().takebacks;

            case storeApprovalQueue:
            case storePagingToolbarApproval:
                return view.getReferences().approvalqueue;
        }
    },

    getSearchParams: function(grid){
        var me = this,
            vm = me.getViewModel();

        if (me.getGridName(grid) === 'Response'){
            return vm.data.searchParamsResponse;
        }
        else if (me.getGridName(grid) === 'Resolution'){
            return vm.data.searchParamsResolution;
        }
        else if (me.getGridName(grid) === 'Take Backs'){
            return vm.data.searchParamsTakeBacks;
        }
        else if (me.getGridName(grid) === 'Approval'){
            return vm.data.searchParamsApproval;
        }
    },

    onSuccessfulUpload: function(docId){
        if (this.getView().up('[reference = workspaceTabs]').getActiveTab() === this.getView()){
            var docDescrip = 'Claims Audit',
                saveAction = [{
                    "Save": {"key": '', "value": ''}
                }],
                params = {
                    pDescription: docDescrip,
                    pProgramName: 'claimAuditFileUpload.p',
                    pParameters: 'POS||' + docId,
                    pRunMode: 2,
                    pProgramType: 'batch',
                    pSaveDocument: true,
                    pFaxNumber: ''
                };

            this.getView().down('[title = Upload File]').close();


            var submitJob = Atlas.common.utility.Utilities.saveData([], 'shared/rx/submitjob/update', null,[false], params,
                saveAction, ['pJobNumber']);

            if (submitJob.code === 0){
                Ext.Msg.alert('PBM', docDescrip + ' file upload has been successfully queued. Job #' + submitJob.pJobNumber);
            }
        }
    },

    onReset: function (btnReset) {
        var me = this,
            grid = btnReset.up('grid'),
            store = grid.getStore(),
            dateFrom,
            dateTo,
            claimId,
            midnightToday = new Date((new Date()).setHours(0, 0, 0, 0));

        if (me.getGridName(grid) === 'Response'){
            var reasonCode = grid.down('[fieldLabel = Reason Code]');

            dateFrom = grid.down('#dateFromResponse'),
                dateTo = grid.down('#dateToResponse'),
                claimId = grid.down('#claimIdResponse');

            reasonCode.setValue([]);
        }
        else if (me.getGridName(grid) === 'Resolution'){
            var errorCode = grid.down('#cbxErrorCode');

            dateFrom = grid.down('#dateFromResolution'),
                dateTo = grid.down('#dateToResolution'),
                claimId = grid.down('#claimIdResolution');

            errorCode.setValue([]);
        }
        else if (me.getGridName(grid) === 'Take Backs'){
            dateFrom = grid.down('#dateFromTakeBacks'),
                dateTo = grid.down('#dateToTakeBacks'),
                claimId = grid.down('#claimIdTakeBacks');
        }
        else if (me.getGridName(grid) === 'Approval'){
            dateFrom = grid.down('#dateFromApproval'),
                dateTo = grid.down('#dateToApproval'),
                claimId = grid.down('#claimIdApproval');
        }

        dateFrom.setValue(Ext.Date.subtract(midnightToday, Ext.Date.DAY, 7));
        dateTo.setValue(midnightToday);
        claimId.setValue(null);


        me.getView().down("#iDresolutionCode").setValue('');

        store.removeAll();
        store.commitChanges();
    },

    retrieveStore: function(store){
        return this.getViewModel().getStore(store);
    }
});
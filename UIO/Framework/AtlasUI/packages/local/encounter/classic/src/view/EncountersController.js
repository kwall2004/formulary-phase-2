Ext.define('Atlas.encounter.view.EncountersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.encountersencounterscontroller',
    id: 'encountersController',

    onLoadEncountersGridInitLoad: function(storeEncountersGridInitLoad){
        var storeEncounterGrid = this.getViewModel().getStore('encountersGrid');
        Atlas.common.view.GetFilteredStore.getFilteredStore(storeEncountersGridInitLoad, [], storeEncounterGrid);
    },

    selectEncounter: function (obj, record){
        var me = this,
            vm = me.getViewModel(),
            searchParams = vm.data.searchParams,
            viewEncounters = me.getView(),
            toolbarEncounterDetail = viewEncounters.down('#toolbarEncounterDetail'),
            storeEncountersDetail = me.retrieveStore('encountersDetailGrid'),
            storeEncountersRejectGrid = me.retrieveStore('encountersRejectGrid'),
            tempJumpStart = 0,
            tempDirection = 'Fwd',
            tempBckRecPointer = '',
            tempFwdRecPointer = '';

        storeEncountersRejectGrid.removeFilter();
        storeEncountersRejectGrid.removeAll();

        searchParams.pEncounterID = record.get('EncounterId');
        searchParams.pJumpStart = tempJumpStart;
        searchParams.pDirection = tempDirection;
        searchParams.pBckRecPointer = tempBckRecPointer;
        searchParams.pFwdRecPointer = tempFwdRecPointer;
        vm.set('loadPagination', true);

        this.onLoadDetailData(tempJumpStart, tempDirection, tempBckRecPointer, tempFwdRecPointer);

    },

    selectEncounterDetail: function (obj, record){
        var me = this,
            parentSystemId = record.get('SystemID'),
            storeEncountersReject = me.retrieveStore('encountersRejectGrid');

        if (record.get('RecordStatus') === 'REJ'){
            storeEncountersReject.getProxy().setExtraParam('pParentSystemID', parentSystemId);
            storeEncountersReject.load();
        }
        else {
            storeEncountersReject.removeAll();
        }
    },

    extractDoc: function (tableView, rowIndex, colIndex, button, e, record){
        var me = this,
            storeEncountersGrid = me.retrieveStore('encountersGrid'),
            jobNum = record.get('JobNum');

        var extractWindow = Ext.create('Ext.grid.Panel', {
            title: 'Extract',
            jobNum: jobNum,
            viewModel: 'encountersencountersviewmodel',
            floating: true,
            modal: true,
            iconCls:'icon-claims,8',
            closable: true,
            draggable: true,
            resizable: true,
            width: 500,
            height: 300,
            listeners: {
                afterrender: function (){
                    var me = this,
                        storeEncounterDocument = me.getViewModel().getStore('encounterDocument'),
                        tempJobNum = me.jobNum;

                    storeEncounterDocument.getProxy().setExtraParam('pJobNum', tempJobNum);
                    storeEncounterDocument.load();
                }
            },
            bind: {
                store: '{encounterDocument}'
            },
            plugins: [
                'gridfilters'
            ],
            columns: [{
                text: 'File',
                dataIndex: 'FILENAME',
                filters: {
                    type: 'string'
                },
                flex: 2
            }, {
                text: 'DocumentId',
                dataIndex: 'DocumentId',
                filters: {
                    type: 'string'
                },
                hidden: true,
                flex: 2
            }, {
                xtype: 'widgetcolumn',
                flex: 1,
                widget: {
                    xtype: 'button',
                    text: 'Download',
                    width: 90,
                    handler: function (btn){
                        var myRecord = btn._rowContext.record;
                        Atlas.common.utility.Utilities.viewDocument(myRecord.get('DocumentId'), null);
                    },
                    iconCls: 'x-fa fa-long-arrow-down',
                    tooltip: 'Download'
                }
            }],
            dockedItems: [{
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                displayInfo: true
            }]
        });

        me.getView().add(extractWindow);
        extractWindow.show();
    },

    getSelectedPageData: function (pagingToolbar, page){
        var vm = this.getViewModel(),
            searchParams = vm.data.searchParams,
            prevPage = pagingToolbar.store.currentPage,
            pageDirection = '',
            jumpStart = 0,
            pageDiff = page - prevPage,
            isJump = false,
            jumpStart;

        if (pageDiff != 1 && pageDiff != -1){
            isJump = true;
        }

        if (isJump) {
            pageDirection  = 'Fwd';
            jumpStart = (page - 1) * searchParams.pBatchSize;
            searchParams.pBckRecPointer = '';
            searchParams.pFwdRecPointer = '';
        }
        else if (prevPage > page){
            pageDirection  = 'Bck';
        }
        else {
            pageDirection  = 'Fwd';
        }

        this.onLoadDetailData(jumpStart, pageDirection, searchParams.pBckRecPointer, searchParams.pFwdRecPointer);

        return true;
    },

    onLoadDetailData: function (jumpStart, pageDirection , bckRecPointer, fwdRecPointer){
        var me = this,
            vm = me.getViewModel(),
            searchParams = vm.data.searchParams,
            PagingToolbarStore = me.getStore('PagingToolbarStore'),
            gridPagingToolbar = me.getView().down('#toolbarEncounterDetail'),
            loadPagination = vm.get('loadPagination'),
            storeEncountersDetailGrid = me.retrieveStore('encountersDetailGrid');


        searchParams.pJumpStart = jumpStart;
        searchParams.pDirection = pageDirection ;

        storeEncountersDetailGrid.onAfter('load', 'onLoadEncountersDetailPagination');

        storeEncountersDetailGrid.getProxy().setExtraParam('pEncounterID', searchParams.pEncounterID);
        storeEncountersDetailGrid.getProxy().setExtraParam('pBatchSize', searchParams.pBatchSize);
        storeEncountersDetailGrid.getProxy().setExtraParam('pJumpStart', searchParams.pJumpStart);
        storeEncountersDetailGrid.getProxy().setExtraParam('pDirection', searchParams.pDirection);
        storeEncountersDetailGrid.getProxy().setExtraParam('pBckRecPointer', searchParams.pBckRecPointer);
        storeEncountersDetailGrid.getProxy().setExtraParam('pFwdRecPointer', searchParams.pFwdRecPointer);

        storeEncountersDetailGrid.load();
    },

    onLoadEncountersDetailPagination: function (store, records, success, opts){
        var me = this,
            vm = me.getViewModel(),
            loadPagination = vm.get('loadPagination'),
            PagingToolbarStore = me.getStore('PagingToolbarStore'),
            gridPagingToolbar = me.getView().down('#toolbarEncounterDetail'),
            searchParams = vm.data.searchParams;

        PagingToolbarStore.unAfter('load', 'onLoadEncountersDetailPagination');

        if (success) {

            if (records.length != 0) {
                if (loadPagination == true) {
                    var numOfBatches, roundDownNumOfRecs, arrayLastBatch, numOfRecsInLastBatch, totalRecs;

                    numOfBatches = opts._resultSet.metadata.ttBatches.ttBatches.length;
                    roundDownNumOfRecs = searchParams.pBatchSize * (numOfBatches - 1);
                    arrayLastBatch = opts._resultSet.metadata.ttBatches.ttBatches[numOfBatches - 1].BatchRange.split(' - ');
                    numOfRecsInLastBatch = parseInt(arrayLastBatch[1]) - parseInt(arrayLastBatch[0]) + 1;
                    totalRecs = roundDownNumOfRecs + numOfRecsInLastBatch;

                    PagingToolbarStore.removeAll(true);
                    for (var iCnt = 1; iCnt <= totalRecs; iCnt++) {
                        PagingToolbarStore.add({PageNumber: iCnt});
                    }

                    PagingToolbarStore.totalCount = totalRecs;

                    gridPagingToolbar.bindStore(PagingToolbarStore);
                    gridPagingToolbar.doRefresh();

                    searchParams.pBckRecPointer = '';
                    searchParams.pFwdRecPointer = '';
                    vm.set('loadPagination', false);
                }

                if (searchParams.pDirection == 'Fwd') {
                    searchParams.pBckRecPointer = records[0].data.RecPointer;
                    searchParams.pFwdRecPointer =records[records.length - 1].data.RecPointer;
                }
                else {
                    searchParams.pBckRecPointer = records[records.length - 1].data.RecPointer;
                    searchParams.pFwdRecPointer = records[0].data.RecPointer;
                }
            }else {
                PagingToolbarStore.removeAll();
                gridPagingToolbar.doRefresh();
            }
        }
    },

    retrieveStore: function (storeName){
        return this.getViewModel().getStore(storeName);
    }
});
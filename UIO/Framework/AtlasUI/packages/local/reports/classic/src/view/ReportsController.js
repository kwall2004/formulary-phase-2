/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: Controller for Reports.js
 **/
Ext.define('Atlas.reports.ReportsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportscontroller',
    xtype: 'cReportListController',

    boxReady: function (view, width, height) {
        var me = this;
        Ext.defer(function () {
            me.getReportList(false, 'Load');
        }, 1000);
    },

    getReportList: function (showAll, source) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            reportLabel = view.down('#reportLabel'),
            reportliststore = vm.getStore('reportlistdata');

        vm.set('isShowFavOn', !showAll);

        reportliststore.getProxy().setExtraParam('pShowAll', showAll);
        reportliststore.getProxy().setExtraParam('pShowFav', !showAll);
        reportliststore.getProxy().setExtraParam('pReportModule', 'MERLIN');
        reportliststore.getProxy().setExtraParam('pReportObject', '');

        reportliststore.load({
            callback: function (records, opts, success) {
                if (records.length == 0) {
                    if (source == 'Load') {
                        me.getReportList(true, '');
                    }
                }
            }
        });
    },

    toggleReportList: function (btn) {
        this.getView().filters.clearFilters();
        this.getReportList(btn.id == 'btnAllReports', '');
    },

    onShowReportsClick: function (button, event, eOpts) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            expandToLevel = '',
            dataAccessStore = vm.getStore('dataaccessReport'),
            rec = button.getWidgetRecord();
        var reportFilterWindow = new Atlas.reports.view.FilterWindow({
            title: rec.get('reportName'),
            viewModel: {
                parent: vm,
                data: {
                    masterrecord: null, //This is what the form binds to on successful load of MemberMaster
                    record: rec
                },
                stores: {
                    reportfilterdata: {
                        model: 'Atlas.reports.model.ReportFilterModel',
                        session: true
                    },
                    comboboxlistsdata: {
                        model: 'Atlas.reports.model.ReportsListItemsModel',
                        session: true,
                        storeId: 'rptListsStore'//,
                        //autoLoad: true
                    },
                    reportsubmitdata: {
                        model: 'Atlas.reports.model.ReportSubmitModel',
                        session: true,
                        storeId: 'rptSubmitStore',
                        root: 'message'
                    },
                    useraccessplangroup: {
                        model: 'Atlas.reports.model.UserAccessPlanGroupModel',
                        storeId: 'rptUserAccessPlanGroupStoreId',
                        root: 'metadata',
                        session: true
                    }
                }
            }
        });
        view.add(reportFilterWindow).show();
        reportFilterWindow.mask('Loading......');
        // If dataAccessFilterFlag, add DataAccessTree to window object

        if (rec.data.dataAccessFilterFlag) {
            if (rec.get('usePlanLevelDATree')) {
                expandToLevel = 'PB';
            }
            vm.set('expandToLevel', expandToLevel);
            var datasourcePicker = {
                xtype: 'common-tri-treepicker',
                width: 500,
                name: 'dataaccess',
                store: vm.getStore('dataaccessReport'),
                pickerURL: 'system/rx/dataaccesstree/update', //required for apply
                displayField: 'nodeName',
                emptyText: 'Data Access List',
                toolbarText: 'Data Access List',
                hideApply: true,
                itemId: 'rptDataAccessTree',
                session: true,
                queryMode: 'local'
            };
            if (vm.getStore('dataaccessReport').data.length == 0) {
                dataAccessStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
                dataAccessStore.getProxy().setExtraParam('pExpandToLevel', expandToLevel);
                dataAccessStore.load();

            }
            reportFilterWindow.down('#filterFormItems').add({
                xtype: 'fieldset',
                title: 'My Data Access Filter',
                itemId: 'filterWindowDataAccessTree'
                //items: []
            });
            reportFilterWindow.down('#filterWindowDataAccessTree').add(datasourcePicker);

        }
    },

    setFavorite: function (grid, rowIndex, colIndex) {
        var vm = this.getViewModel(),
            rec = grid.getStore().getAt(rowIndex),
            pcUserName = Atlas.user.un,
            pcRptID = rec.data.reportID,
            isAFavorite = rec.data.isFav.toLowerCase(),
            pcAction = '',
            requestParameter = {},
            parameters,
            returnValue,
            returnFields = 'message',
            endpoint = 'shared/rx/userreport/update';

        if (isAFavorite == 'yes') {
            rec.set('isFav', 'no');
            pcAction = 'D';
        }
        else {
            rec.set('isFav', 'yes');
            pcAction = 'A';
        }

        parameters = {pcUsrName: pcUserName, pcRptID: pcRptID, pcAction: pcAction};
        for (var key in parameters) {
            requestParameter[key] = parameters[key];
        }

        returnValue = Atlas.common.utility.Utilities.post(endpoint, requestParameter, returnFields);
        this.getReportList(!vm.get('isShowFavOn'), '');
    },

    displayScreenInfo: function () {
        Ext.Msg.alert('Version Info', 'Last updated: 01/25/2017' + '<br/>' + 'Author: Dean C. Reed');
    }
});
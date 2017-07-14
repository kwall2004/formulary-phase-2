/**
 * Created by agupta on 1/13/2017.
 */

Ext.define('Atlas.prescriber.view.PresFaxQueueWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.presFaxQueueWinController',
    init: function () {
        // var view = this.getView();
        // var vm = view.up().getViewModel();
        // vm.set('openedTabs.fax', true);
        //
        // if(vm.get('masterrecord')){
        //     this.getFaxData(this.getView().up(),vm.get('masterrecord').get('npi'));
        // }
        this.loadInitialFaxQStoreData('');
    },

    faxQueueUpdate: function (selection) {
        var view = this.getView();

        view.down('#StartDate').setValue('');
        view.down('#EndDate').setValue('');

        if (selection.value == '1') {
            view.down('#StartDate').setDisabled(true);
            view.down('#EndDate').setDisabled(true);
        }
        else if (selection.value == '2') {
            view.down('#StartDate').setDisabled(false);
            view.down('#EndDate').setDisabled(false);
        }

        this.onSearch();
    },

    loadFaxQStoreData: function (source, pRecieptDateFrom, pRecieptDateTo, pAcknowledged) {
        var vm = this.getViewModel();
        var FaxQueueName = '';

        vm.getStore('faxQStore').removeAll();
        FaxQueueName = 'Authorizations';
        var PresFAXQueueDocuments = vm.getStore('faxQStore');//FaxQStore
        PresFAXQueueDocuments.getProxy().setExtraParam('pPlanID', 'HPM');
        PresFAXQueueDocuments.getProxy().setExtraParam('pQDescription', FaxQueueName);
        PresFAXQueueDocuments.getProxy().setExtraParam('pRecieptDateFrom', pRecieptDateFrom);
        PresFAXQueueDocuments.getProxy().setExtraParam('pRecieptDateTo', pRecieptDateTo);
        PresFAXQueueDocuments.getProxy().setExtraParam('pAcknowledged', pAcknowledged);
        PresFAXQueueDocuments.load();
    },

    loadInitialFaxQStoreData: function (source) {
        this.loadFaxQStoreData(source, null, null, '');
    },

    onSearch: function () {
        var view = this.getView();
        view.down('#searchGridPagingToolbar').getStore().loadPage(1);
        if (view.down('#presFAXQueueList').getValue() == 1) {
            this.loadInitialFaxQStoreData('');
        }
        else {
            this.loadFaxQStoreData('', view.down('#StartDate').getRawValue(), view.down('#EndDate').getRawValue(), 'Y');
        }
    },

    onReset: function () {
        var view = this.getView(),
            faxTypeSelection = view.down('#presFAXQueueList').getSelection().data;

        this.faxQueueUpdate(faxTypeSelection);
    },

    onAcknowledge: function (btn) {
        var selectedRecord = btn.up().getWidgetRecord(),
            pFieldList = 'Acknowledge,AcknowledgedDate,AcknowledgedUserName',
            pFields = 'Y|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + '|' + Atlas.user.un;
        this.setQManagementData(selectedRecord.data.SystemID, pFieldList, pFields);
    },

    setQManagementData: function (systemID, fieldList, fieldValue) {
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [true], {
                pSystemID: systemID,
                pFieldList: fieldList,
                pFields: fieldValue
            },
            saveAction, null);

        this.onSearch();

    }


});

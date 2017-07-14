/**
 * Created by agupta on 12/15/2016.
 */

Ext.define('Atlas.pharmacy.view.credentialing.popups.CredFaxQueueWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CredFaxQueueWinController',

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

    },

    faxQueueUpdate: function (selection) {
        var view = this.getView();

        if (selection.value == '1') {
            view.down('#StartDate').setValue('');
            view.down('#StartDate').setDisabled(true);
            view.down('#EndDate').setValue('');
            view.down('#EndDate').setDisabled(true);
        }
        else if (selection.value == '2') {
            view.down('#StartDate').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -2));
            view.down('#StartDate').setDisabled(false);
            view.down('#EndDate').setValue(new Date());
            view.down('#EndDate').setDisabled(false);
        }

        this.onSearch();
    },

    loadFaxQStoreData: function (source, pRecieptDateFrom, pRecieptDateTo, pAcknowledged) {
        var vm = this.getViewModel();
        var FaxQueueName = '';
        if (source == 'Missing Info') {
            vm.getStore('MIFaxQStore').removeAll();
            FaxQueueName = 'Missing Information';
            var CredFAXQueueDocuments = vm.getStore('MIFaxQStore');
            CredFAXQueueDocuments.getProxy().setExtraParam('pPlanID', 'HPM');
            CredFAXQueueDocuments.getProxy().setExtraParam('pQDescription', FaxQueueName);
            CredFAXQueueDocuments.getProxy().setExtraParam('pRecieptDateFrom', pRecieptDateFrom);
            CredFAXQueueDocuments.getProxy().setExtraParam('pRecieptDateTo', pRecieptDateTo);
            CredFAXQueueDocuments.getProxy().setExtraParam('pAcknowledged', pAcknowledged);
            CredFAXQueueDocuments.load();
            //this.MIFaxQStore.CommitChanges();
        }
        else {
            vm.getStore('FaxQStore').removeAll();
            FaxQueueName = 'Credentialing';
            var CredFAXQueueDocuments = vm.getStore('FaxQStore');//FaxQStore
            CredFAXQueueDocuments.getProxy().setExtraParam('pPlanID', 'HPM');
            CredFAXQueueDocuments.getProxy().setExtraParam('pQDescription', FaxQueueName);
            CredFAXQueueDocuments.getProxy().setExtraParam('pRecieptDateFrom', pRecieptDateFrom);
            CredFAXQueueDocuments.getProxy().setExtraParam('pRecieptDateTo', pRecieptDateTo);
            CredFAXQueueDocuments.getProxy().setExtraParam('pAcknowledged', pAcknowledged);
            CredFAXQueueDocuments.load();
            //this.FaxQStore.CommitChanges();
        }
    },

    loadInitialFaxQStoreData: function (source) {
        this.loadFaxQStoreData(source, null, null, '');
    },

    onSearch: function () {
        var view = this.getView();
        if (view.down('#CredFAXQueueList').getValue() == 1) {
            this.loadInitialFaxQStoreData('');
        }
        else {
            var _ack = 'Y';
            this.loadFaxQStoreData('', view.down('#StartDate').getRawValue(), view.down('#EndDate').getRawValue(), _ack);
        }
    },

    onReset: function () {
        var view = this.getView(),
            faxTypeSelection = view.down('#CredFAXQueueList').getSelection().data;

        this.faxQueueUpdate(faxTypeSelection);
    },

    init: function () {
        var view = this.getView();
        var windowType  = view.extraParams["windowType"];
        var winTitle  = view.extraParams["title"];
        view.title = winTitle;
        if(windowType  == ''){
            this.loadInitialFaxQStoreData('');
        }
        else{
            this.loadInitialFaxQStoreData('Missing Info');
        }

    }
});

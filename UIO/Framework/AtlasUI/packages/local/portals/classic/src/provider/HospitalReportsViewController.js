/**
 * Created by c4539 on 11/29/2016.
 */
Ext.define('Atlas.portals.provider.HospitalReportsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderHospitalReports',

    listen: {
        controller: {
            '*': {
                providerDetailsSet: 'loadHospitalReportsData'
            }
        }
    },

    init: function() {
        this.setDateValues();
    },

    setDateValues: function() {
        var fromDateInput = this.lookupReference('fromDate'),
            toDateInput = this.lookupReference('toDate'),
            fromDate = new Date(),
            toDate = new Date();

        fromDate.setDate(fromDate.getDate() - 45);
        fromDateInput.setValue(fromDate);
        toDateInput.setValue(toDate);
    },

    onHospitalReportTypeSelect: function() {
        var type = this.lookupReference('reportCombo').value,
            isUtilType = type === 'hospitalRptsMemberUtilization';

        this.getView().getViewModel().set('isUtilGridHidden', !isUtilType);
        this.getView().getViewModel().set('isERGridHidden', isUtilType);
        this.processHospitalReportsSearch();
    },

    loadHospitalReportsData: function(providerDetails) {
        this.getView().getViewModel().set('providerDetails', providerDetails);
        if (!providerDetails.provID) { this.getView().getViewModel().set('isPreviewDisabled', true); return; }
        this.getView().getViewModel().set('isPreviewDisabled', false);
        this.previewReport();
    },

    previewReport: function() {
        var providerDetails = this.getView().getViewModel().get('providerDetails'),
            form = this.lookupReference('reportForm'),
            parameters = form.getValues(),
            fromDate = '',
            toDate = '',
            currentDate = new Date();

        if (!providerDetails.provID) {
            Ext.Msg.alert('Provider Selection Error', 'Please select a provider from the drop down list.');
            return;
        }

        form.isValid();
        if (!parameters.fromDate) {
            Ext.Msg.alert('Invalid Report to Date', 'Please enter a valid report from date.');
            return;
        }

        if (!parameters.toDate) {
            Ext.Msg.alert('Invalid Report to Date', 'Please enter a valid report to date.');
            return;
        }

        fromDate = new Date(parameters.fromDate);
        toDate = new Date(parameters.toDate);
        if (fromDate.getTime() > currentDate.getTime()) {
            Ext.Msg.alert('Date Range Error', 'From date cannot be a future date.');
            return;
        }

        if (fromDate.getTime() > toDate.getTime()) {
            Ext.Msg.alert('Date Range Error', 'From date cannot be after to date.');
            return;
        }

        this.processHospitalReportsSearch();
    },

    processHospitalReportsSearch: function() {
        var vm = this.getView().getViewModel(),
            provider = vm.get('providerDetails'),
            type = this.lookupReference('reportCombo').value,
            utilType = !vm.get('isUtilGridHidden'),
            hospitalReportStore = vm.getStore(utilType ? 'utilReportStore' : 'erReportStore'),
            sortKey = utilType ? 'admitDateas' : 'serviceDate',
            parameters = this.lookupReference('reportForm').getValues();

        vm.set('isExportDisabled', true);
        hospitalReportStore.getProxy().setExtraParam('pProviderList', provider.provID);
        hospitalReportStore.getProxy().setExtraParam('pLobId', provider.selectedLob);
        hospitalReportStore.getProxy().setExtraParam('pFromDate', this.formatDate(parameters.fromDate));
        hospitalReportStore.getProxy().setExtraParam('pThruDate', this.formatDate(parameters.toDate));
        hospitalReportStore.getProxy().setExtraParam('pPageStart', 1);
        hospitalReportStore.getProxy().setExtraParam('pPageEnd', 25);
        hospitalReportStore.getProxy().setExtraParam('pSortKey', sortKey + ' desc');
        hospitalReportStore.load({
            callback: function(records) {
                if (!records) { return; }
                if (records.length > 0) { vm.set('isExportDisabled', false); return; }
                vm.set('isExportDisabled', true);
            }
        });
    },

    checkHospitalReportButtonStatus: function() {
        var fromDateInput = this.lookupReference('fromDate'),
            toDateInput = this.lookupReference('toDate'),
            provider = this.getView().getViewModel().get('providerDetails');

        if (provider.provID && fromDateInput.value && toDateInput.value) {
            this.getView().getViewModel().set('isPreviewDisabled', false);
            return;
        }
        this.getView().getViewModel().set('isPreviewDisabled', true);
    },

    exportReport: function() {
        var utilType = this.getView().getViewModel().get('isUtilGridHidden'),
            grid = this.lookupReference(utilType ? 'erReportGrid' : 'utilReportGrid');

        if (grid.getStore().count() === 0) { return; }
        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Hospital Reports',
            fileName: 'HospitalReports.xlsx'
        });
    },

    formatDate: function(newDate) {
        var date = new Date(newDate);

        if (!newDate) { return; }
        return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
    }
});
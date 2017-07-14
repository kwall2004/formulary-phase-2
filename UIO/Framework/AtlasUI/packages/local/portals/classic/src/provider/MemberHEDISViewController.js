Ext.define('Atlas.portals.provider.MemberHEDISViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberhedis',

    listen: {
        controller: {
            '*': {
                memberDetailsSet: 'loadHEDISForm'
            }
        }
    },

    init: function() {
        var me = this,
            vm = me.getViewModel(),
            faxNumber = '313-202-0006';

        if (Atlas.user.providerStateSelected == 'IL') {
            faxNumber = '312-508-7213';
        }

        vm.set('HEDISFaxNumber', faxNumber);
    },

    afterRender: function () {
        this.loadHEDISForm();
    },

    loadHEDISForm: function () {
        var hedisSummary = this.getViewModel().getStore('hedissummarymaster'),
            recipientId = this.getView().up().up().getViewModel().data.recipientId,
            reportingYearCombo = this.lookup('reportingYearCombo').getValue(),
            filterRadioGroup = this.lookup('filterRadioGroup').getChecked(),
            memberDetails = this.getView().up().up().getViewModel().getData().memberDetails;

        this.lookup('lastPcpVisit').setValue(memberDetails.lastPcpVisit);

        hedisSummary.getProxy().setExtraParam('pWhere', '(reportYear = ' + reportingYearCombo + ') and recipientID = ' + recipientId + ' and (population2 = 1 or population5 = 1)');

        hedisSummary.load();

        if (filterRadioGroup[0].inputValue == 'due') {
            hedisSummary.filter('complete', 'false');
        } else {
            hedisSummary.clearFilter();
        }


    },

    showHedisProfile: function () {
        var requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {}),
            thisYear = new Date().getFullYear(),
            recipientId = this.getView().up().up().getViewModel().data.recipientId;

        requestModel.getProxy().setExtraParam('pReportName', 'hedisprofilesheet.p');
        requestModel.getProxy().setExtraParam('pParameters', recipientId + '|' + thisYear + '|2|');
        requestModel.getProxy().setExtraParam('pRegenReport', 2);
        requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
        requestModel.getProxy().setExtraParam('pJobNum', 0);
        requestModel.phantom = false;

        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;

                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    Ext.MessageBox.alert('Error', 'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.', function(){});
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            }
        });
    },

    printMemberReport: function () {
        Ext.create('Atlas.portals.view.provider.MemberHEDISPrintMemberReport', {
            itemConfig: {
                recipientId: this.getView().up().up().getViewModel().data.recipientId,
                lobId: this.getView().up().up().getViewModel().data.memberDetails.primaryLOB
            }
        }).show();
    },

    filterRadio: function (radioGroup, newValue, oldValue, eOpts) {
        var hedisGridStore = this.lookup('hedisGrid').getStore();

        switch (newValue.filterRadios) {
            case 'all':
                hedisGridStore.clearFilter();
                break;
            case 'due':
                hedisGridStore.filter('complete', 'false');
                break;
        }
    },

    coverageRowClick: function (grid, record) {

        var helpTextStore = this.getViewModel().getStore('measurehelptext'),
            helpTextContainer = this.lookup('measureHelpText');

        helpTextStore.getProxy().setExtraParam('pMeasure', record.data.measure);
        helpTextStore.getProxy().setExtraParam('pNumerator', record.data.numerator);

        helpTextStore.load({
            callback: function (response, operation) {
                var pFieldList = Ext.JSON.decode(operation.getResponse().responseText).metadata.pFieldList,
                    parsedList = pFieldList.split('|');

                if (parsedList) {

                }
                helpTextContainer.setValue(parsedList[2]);
            }
        });
    },

    reportHEDIS: function (view, rowIndex, colIndex, item, e, record, row) {
        Ext.create('Atlas.portals.view.provider.MemberHEDISUpdate', {
            itemConfig: {
                recipientId: this.getView().up().up().getViewModel().data.recipientId,
                measure: record.getData().measure,
                numerator: record.getData().numerator,
                measureDesc: record.getData().measureDesc,
                subMeasure: record.getData().subMeasure,
                trn: record.getData().trn,
                reportYear: record.getData().reportYear,
                memberAge: this.calculateAge()
            }
        }).show();
    },

    calculateAge: function () {
        var birthDate = this.getView().up().up().getViewModel().getData().memberDetails.birthDate,
            birthDateSplit = birthDate.split('/'),
            dob = new Date(birthDateSplit[2], birthDateSplit[0] - 1, birthDateSplit[1]),
            diff_ms = Date.now() - dob.getTime(),
            age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    },

    viewHistory: function (view, rowIndex, colIndex, item, e, record, row) {
        Ext.create('Atlas.portals.view.provider.MemberHEDISHistoricalEntries', {
            itemConfig: {
                recipientId: this.getView().up().up().getViewModel().data.recipientId,
                measure: record.getData().measure,
                numerator: record.getData().numerator,
                measureDesc: record.getData().measureDesc,
                subMeasure: record.getData().subMeasure,
                trn: record.getData().trn,
                reportYear: record.getData().reportYear,
                dueBy: record.getData().dueBy,
                memberId: this.getView().up().up().lookup('memberCardID').value,
                memberAge: this.calculateAge()
            }
        }).show();
    }

});
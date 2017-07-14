/**
 * Created by m4542 on 1/9/2017.
 */
Ext.define('Atlas.portals.hpmember.HealthPassPortController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.healthpassportcontroller',

    init: function() {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            recipientId = user.recipientId,
            doctorStore = vm.getStore('DoctorVisitsStore');

        doctorStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        doctorStore.getProxy().setExtraParam('pRecipientID',recipientId);
        doctorStore.load({
            callback: function(record) {
                me.getDoctorStore(me, record);
                me.getPrescriptionStore(me, record);
                me.getImmunizationsStore(me, record);
                me.getLabsStore(me, record);
                me.getGapsStore(me, record);
                vm.set('FromDate', record[0].get('FromDate'));
                vm.set('ToDate', record[0].get('ToDate'));
                vm.set('JobNumber', record[0].get('jobNumber'));
            }
        });
    },

    printPage: function (grid, rowIndex, colIndex) {
        var me = this,
            vm = me.getViewModel(),
            requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {}),
            jobNumber = vm.get('JobNumber');

        requestModel.phantom = false;
        requestModel.getProxy().url = 'eligibility/hp/runreport64';
        requestModel.getProxy().setExtraParam('pRegenReport', 3);
        requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
        requestModel.getProxy().setExtraParam('pJobNum', jobNumber);

        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;

                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    Ext.MessageBox.alert('Error', 'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.', function(){});
                } else {
                    window.open("data:application/pdf;base64," + escape(base64EncodedPDF), "mywindow","menubar=1,resizable=1,width=1300,height=1050");
                }
            },
            failure: function() {
                Ext.MessageBox.alert('Error', 'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.', function(){});
            }
        });
    },

    getDoctorStore: function(me, record) {
        var doctorRecord = record["0"].joined["0"].proxy.reader.metaData.DoctorVisits,
            doctorArray = [];

        for (var i = 0; i < doctorRecord.length; i++) {
            var individualArray = [];
            individualArray.push(doctorRecord[i].Specialty);
            individualArray.push(doctorRecord[i].RecipientID);
            individualArray.push(doctorRecord[i].DoctorsName);
            individualArray.push(doctorRecord[i].DateOfService);
            doctorArray.push(individualArray);
        }

        if(doctorArray === "" || doctorArray === undefined || doctorArray === null || doctorArray.length === 0) {
            return;
        }

        var doctorStore = new Ext.data.ArrayStore({
            fields: ['Specialty', 'RecipientID', 'DoctorsName', 'DateOfService'],
            data: doctorArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('DoctorVisitsStore', doctorStore);
    },

    getPrescriptionStore: function(me, record) {
        var rxRecord = record["0"].joined["0"].proxy.reader.metaData.Prescriptions,
            rxArray = [];

        for (var i = 0; i < rxRecord.length; i++) {
            var individualArray = [];
            individualArray.push(rxRecord[i].RecipientID);
            individualArray.push(rxRecord[i].serviceDate);
            individualArray.push(rxRecord[i].theraclass);
            individualArray.push(rxRecord[i].DrugName);
            individualArray.push(rxRecord[i].daysSupply);
            individualArray.push(rxRecord[i].theraspeccd);
            individualArray.push(rxRecord[i].ndcCode);
            individualArray.push(rxRecord[i].theraspecdesc);
            rxArray.push(individualArray);
        }

        if(rxArray === "" || rxArray === undefined || rxArray === null || rxArray.length === 0) {
            return;
        }

        var rxStore = new Ext.data.ArrayStore({
            fields: ['RecipientID', 'serviceDate', 'theraclass', 'DrugName', 'daysSupply', 'theraspeccd', 'ndcCode', 'theraspecdesc'],
            data: rxArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('PrescriptionStore', rxStore);
    },

    getImmunizationsStore: function(me, record) {
        var imRecord = record["0"].joined["0"].proxy.reader.metaData.Immunization,
            imArray = [];

        for (var i = 0; i < imRecord.length; i++) {
            var individualArray = [];
            individualArray.push(imRecord[i].RecipientID);
            individualArray.push(imRecord[i].ImmunizationName);
            individualArray.push(imRecord[i].DateOfService);
            individualArray.push(imRecord[i].CPT4Cd);
            imArray.push(individualArray);
        }

        if(imArray === "" || imArray === undefined || imArray === null || imArray.length === 0) {
            return;
        }

        var imStore = new Ext.data.ArrayStore({
            fields: ['RecipientID', 'ImmunizationName', 'DateOfService', 'CPT4Cd'],
            data: imArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('ImmunizationStore', imStore);
    },

    getLabsStore: function(me, record) {
        var labRecord = record["0"].joined["0"].proxy.reader.metaData.LabResults,
            labArray = [];

        for (var i = 0; i < labRecord.length; i++) {
            var individualArray = [];
            individualArray.push(labRecord[i].LabResult);
            individualArray.push(labRecord[i].RecipientID);
            individualArray.push(labRecord[i].LabTest);
            individualArray.push(labRecord[i].DateOfService);
            labArray.push(individualArray);
        }

        if(labArray === "" || labArray === undefined || labArray === null || labArray.length === 0) {
            return;
        }

        var labStore = new Ext.data.ArrayStore({
            fields: ['LabResult', 'RecipientID', 'LabTest', 'DateOfService'],
            data: labArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('LabStore', labStore);
    },

    getGapsStore: function(me, record) {
        var gapRecord = record["0"].joined["0"].proxy.reader.metaData.GapsInCareMeasures,
            gapArray = [];

        for (var i = 0; i < gapRecord.length; i++) {
            var individualArray = [];
            individualArray.push(gapRecord[i].HedisNumerator);
            individualArray.push(gapRecord[i].RecipientID);
            individualArray.push(gapRecord[i].HedisComment);
            individualArray.push(gapRecord[i].HedisCompleteDate);
            individualArray.push(gapRecord[i].HedisDueDate);
            individualArray.push(gapRecord[i].HedisMeasure);
            individualArray.push(gapRecord[i].HedisDescription);
            individualArray.push(gapRecord[i].HedisCompleted);
            gapArray.push(individualArray);
        }

        if(gapArray === "" || gapArray === undefined || gapArray === null || gapArray.length === 0) {
            return;
        }

        var gapStore = new Ext.data.ArrayStore({
            fields: ['HedisNumerator', 'RecipientID', 'HedisComment', 'HedisCompleteDate', 'HedisDueDate', 'HedisMeasure', 'HedisDescription', 'HedisCompleted'],
            data: gapArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('GapStore', gapStore);
    },

    closeTab: function() {
        this.closeView();
    }
});
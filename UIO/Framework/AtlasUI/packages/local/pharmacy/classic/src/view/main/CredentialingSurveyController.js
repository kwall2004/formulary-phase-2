Ext.define('Atlas.pharmacy.view.main.CredentialingSurveyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-main-cred',

    listen: {
        controller: {
            'pharmacy': {
                datachanged: 'onModuleDataChange'
            }
        }
    },

    //Will be running after first layout
    boxReady: function () {
        // if so - load our data
        this.onModuleDataChange();
    },

    onModuleDataChange: function (origin) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            pharmacy = vm.get('activePharmacy'),
            credentials = vm.getStore('credentials'),
            grid = view.down('grid');


        // //Prevent any data collisions between tabs
        if (origin && origin !== view.ownerCt.id) {
            return;
        }

        if (pharmacy && pharmacy.get('ncpdpid')) {

            // Pharmacy data available
            credentials.load({
                params: {
                    pKeyValue: pharmacy.get('ncpdpid')
                },
                callback: function (rec, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (success) {
                        var store = vm.getStore('storePharmacistLicenseInformation');
                        objResp.metadata.ttPharmaCredPharmacist.ttPharmaCredPharmacist.forEach(function (val, ind) {
                            store.insert(0, val);
                        });
                    }

                    var store = this,
                        rec = rec && rec[0],
                        extraData = store.extraData, // Temp Tables
                        genForm = me.lookup('general'),
                        exp = '',
                        today = Atlas.common.utility.Utilities.getLocalDateTime() ,
                        isExpired = function (date) {
                            exp = '';
                            if (date) {
                                var timeDiff = new Date(date).getTime() - today.getTime();
                                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                if (diffDays < 0) {
                                    exp = '<SPAN style="COLOR: red"><b>Expired</b></SPAN>';
                                }
                                else if (diffDays < 30) {
                                    exp = '<SPAN style="COLOR: orange"><b>Expiring Soon</b></SPAN>';
                                }
                            }
                            return exp;
                        };

                    Ext.suspendLayouts();
                    if (rec) {
                        vm.set('rec', rec);
                        vm.set('extraData', extraData);

                        me.lookup('general').loadRecord(rec);
                        me.lookup('payment').loadRecord(rec);
                        me.lookup('services').loadRecord(rec);
                        me.lookup('other').loadRecord(rec);
                    }

                    //Adjust expiration visuals

                    genForm.getForm().setValues({
                        __picExpExpired: isExpired(rec.get('PICExpDate')),
                        // __picVerifExpired: isExpired(rec.get('PICVerfDate')), //Not shown in orig
                        __deaExpiredNCPDP: isExpired(rec.get('NCPDPDeaExpDate')),
                        __deaExpired: isExpired(rec.get('DeaExpDate')), //Added as per #1918
                        __expNCPDPExpired: isExpired(rec.get('NCPDPStLicExpDate')),
                        __expStateLicExpired: isExpired(rec.get('StLicExpDate')),
                        __coverageExpired: isExpired(rec.get('insuranceExpDate')),
                        //__inspectionExpired: isExpired(rec.get('lastInspectionDate')), // Removed as per #1918
                        __debarExpired: isExpired(rec.get('EvidDebarDet')),
                        __eplsExpired: isExpired(rec.get('EPLSVerfDate'))
                        //__credCommExpired: isExpired(rec.get('CredCommApprDate')) ? exp : '' // Removed as per #1918
                    });

                    Ext.resumeLayouts(true);
                }
            });
        }
    },

    onAddPharmacist: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        var grid = view.down('#gpPharmacistLicenseInformation');
        var store = viewModel.getStore('storePharmacistLicenseInformation');
        if (!grid.plugins[0].editing) {
            store.insert(0, {
                sLicenseNum: '',
                sPharmacistName: '',
                sEmployType: 1
            });

            grid.plugins[0].startEdit(0, 0);
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
        }
    },

    onRemovePharmacist: function () {
        var view = this.getView();
        var grid = view.down('#gpPharmacistLicenseInformation');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");

        }
        else {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('gpPharmacistLicenseInformation');
            store.remove(store.remove(grid.getSelectionModel().getSelection()[0]));
            this.storeUpdated(grid.getSelectionModel().getSelection()[0])
        }
    },

    storeUpdated: function (record) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            parampInsOrUpd = "2",
            pharmacy = vm.get('activePharmacy'),
            credentials = vm.getStore('credentials'),
            grid = view.down('grid');

        var _pFldList = "PharmacistRecordID,CredDate,PharLic,PharName,PharEmpType";
        var _pFldValues = record + "|" + "|" + record.get('sLicenseNum') + "|" + record.get('sPharmacistName') + "|" + record.get('sEmployType');

        if (record.crudState == "U") {
            parampInsOrUpd = "1";
        } else if (record.crudState == "C") {
            parampInsOrUpd = "0";
        } else {
            parampInsOrUpd = "2";
        }

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var extraParameters = {
            pKeyType: "NCPDPID",
            pKeyValue: pharmacy.get('ncpdpid'),
            pCredDate: '',
            pInsOrUpd: parampInsOrUpd,
            pFieldList: _pFldList,
            pFields: _pFldValues

        };

        var setsubmitjob = Atlas.common.utility.Utilities.saveData([{}], 'pharmacy/rx/pharmacredpharmacists/update', null, [false], extraParameters,
            saveAction, ['pDocumentID']);

        if (setsubmitjob.code == 0) {

        }
    },

    comboBoxsEmployTypeRenderer: function (value) {
        if (!value)
            return '';
        var name = "";
        if (value == 1)
            name = "Full Time";
        else if (value == 2)
            name = "Part Time";
        else if (value == 3)
            name = "Contractor";
        return name;
    },

    gpPharmacistLicenseInformation_beforeedit: function (dv, grid) {

    },

    gpPharmacistLicenseInformation_afteredit: function (editor, e, record, rowIndex) {


    },

    onEdit: function (editor, context) {
        if (context.record.dirty && context.record.crudState != 'C') {
            //this.getChecklistRecord().set('isNeedUpdate',true);
            context.record.set('isNeedUpdate', true);
        }

        this.storeUpdated(context.record);
    },

    onSave: function () {
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('rec'),
            services = me.lookup('services'),
            pharmacy = vm.get('activePharmacy'),
            credentials = vm.getStore('credentials'),
            pctFields = ['RetBusPct', 'MailSrvBusPct', 'LonTrmBusPct', 'SpecDspnsrBusPct', 'CompBusPct', 'IVFusBusPct', 'InternetBusPct'],
            pFieldList, pFields, pInsOrUpd, saveData, fieldList, values, data, tmpValues, tmpHash = {};

        if (rec && pharmacy && pharmacy.get('ncpdpid')) {
            me.lookup('general').updateRecord();
            me.lookup('payment').updateRecord();

            // check for empty values in services percent value fields
            // if any is empty we assign 0 before reading out in to record
            tmpValues = services.getValues();
            //debugger
            for (var i = 0; i < pctFields.length; i++) {
                if (tmpValues[pctFields[i]] === '') {
                    tmpHash[pctFields[i]] = 0;
                }
            }
            services.getForm().setValues(tmpHash);


            services.updateRecord();
            me.lookup('other').updateRecord();

            //From old code
            fieldList = 'ncpdpId,credDate,PIC,PicLic,' +
                'DeaExpDate,StLicExpDate, ' +
                'insuranceAmt,insuranceExpDate,' +
                'insuranceName,insuranceAcctNum,lastInspectionDate,lastInspectionGrade,ReCntName,ReAddress1,ReCity,ReState,' +
                'ReZip,RePhone,ReFax,ReEmail,RetBusPct,RetLicensed,MailSrvBusPct,MailSrvLicensed,LonTrmBusPct,LonTrmLicensed,' +
                'SpecDspnsrBusPct,SpecDspnsrLicensed,CompBusPct,CompLicensed,IVFusBusPct,IVFusLicensed,InternetBusPct,' +
                'InternetLicensed,PharHrM-F,PharHrSat,PharHrSun,PatCnslng,Literature,PhyLocCompSrv,SepChrDelSrv,PhyLocLang,' +
                'PhyLoc,NamePost,PrepWait,Litigation,BusFail,LegalViolations,' +
                'Allegations,OtherSvcsProvided,PICExpDate,PICVerfDate,PICDiscpAction,' +
                'DEAVerfDate,DEADiscpAction,StLicVerfDate,StLicDiscpAction,EvidDebar,' +
                'EvidDebarDet,OIGVerfDate,OIGDiscpAction,EPLSVerfDate,EPLSDiscpAction,' +
                'Comments,VerfPerfBy,VerfPerfDate,CredCommApprDate,insuranceVerfDate,stateLICStateCode,lastModifiedBy';

            saveData = rec.getSaveData(true, fieldList);

            data = saveData.raw;

            values = [data['ncpdpId'], data['credDate'], data['PIC'], data['PicLic'], data['DeaExpDate'], data['StLicExpDate'],
                data['insuranceAmt'], data['insuranceExpDate'], data['insuranceName'], data['insuranceAcctNum'],
                data['lastInspectionDate'], data['lastInspectionGrade'], data['ReCntName'], data['ReAddress1'], data['ReCity'],
                data['ReState'], data['ReZip'], data['RePhone'], data['ReFax'], data['ReEmail'], data['RetBusPct'], data['RetLicensed'],
                data['MailSrvBusPct'], data['MailSrvLicensed'], data['LonTrmBusPct'], data['LonTrmLicensed'],
                data['SpecDspnsrBusPct'], data['SpecDspnsrLicensed'], data['CompBusPct'], data['CompLicensed'], data['IVFusBusPct'],
                data['IVFusLicensed'], data['InternetBusPct'], data['InternetLicensed'], data['PharHrM-F'], data['PharHrSat'],
                data['PharHrSun'], data['PatCnslng'], data['Literature'], data['PhyLocCompSrv'], data['SepChrDelSrv'], data['PhyLocLang'],
                data['PhyLoc'], data['NamePost'], data['PrepWait'], data['Litigation'], data['BusFail'], data['LegalViolations'],
                data['Allegations'], data['OtherSvcsProvided'], data['PICExpDate'], data['PICVerfDate'], data['PICDiscpAction'],
                data['DEAVerfDate'], data['DEADiscpAction'], data['StLicVerfDate'], data['StLicDiscpAction'], data['EvidDebar'],
                data['EvidDebarDet'], data['OIGVerfDate'], data['OIGDiscpAction'], data['EPLSVerfDate'], data['EPLSDiscpAction'],
                data['Comments'], data['VerfPerfBy'], data['VerfPerfDate'], data['CredCommApprDate'], data['insuranceVerfDate'],
                data['stateLICStateCode'],
                Atlas.user.un];


            credentials.sync({
                params: {
                    pKeyValue: pharmacy.get('ncpdpid'),
                    pCredDate: '',
                    pInsOrUpd: '0', //0-insert, 1- update. Here we always insert new one
                    pFieldList: fieldList,
                    pFields: values.join('|')
                }
            });

            Ext.Msg.alert('Credentialing Survey', 'Data saved');
            this.onModuleDataChange();
        }
    },

    onPrint: function (data) {
        var vm = this.getViewModel(),
            pharmacy = vm.get('activePharmacy'),
            doc;

        if (pharmacy && pharmacy.get('ncpdpid')) {
            doc = Atlas.common.utility.Utilities.submitJobViewDoc('Credentialing Verification Sheet', 'setPharmaCredVerSheet.p', pharmacy.get('ncpdpid'), '1', 'Report', false, '');

            if (doc.code === 0) {
                Atlas.common.utility.Utilities.displayDocument('pdf', doc.data);
            }
        }
    },

    openPopup: function (xtype, data) {
        var vm = this.getViewModel(),
            pharmacy = vm.get('activePharmacy'),
            cfg = {
                xtype: xtype
            };

        if (pharmacy && pharmacy.get('ncpdpid')) {
            cfg.ncpdpid = pharmacy.get('ncpdpid');
            if (data) {
                cfg.storeData = data;
            }
            Ext.create(cfg);
        }
    },

    onWinPICVerifDate: function () {
        var data = this.getViewModel().get('extraData');

        //Old serverside code, can't do anything about it in Layer 7 as this is metadata part (@Cory)
        this.openPopup('pharmacy-main-pichistory', data ? data.ttCredentialHistoryInformation.ttCredentialHistoryInformation : []);
    },

    onWinNCPDPDetails: function () {
        var data = this.getViewModel().get('extraData');

        this.openPopup('pharmacy-main-ncpdpdetails', data ? data.ttstateLicenseInformation.ttstateLicenseInformation : []);
    },

    onWinDeaVerifDate: function () {
        var data = this.getViewModel().get('extraData');
        this.openPopup('pharmacy-main-deahistory', data ? data.ttCredentialHistoryInformation.ttCredentialHistoryInformation : []);
    },

    onWinPbmLicHistory: function () {
        var data = this.getViewModel().get('extraData');
        this.openPopup('pharmacy-main-pbmlichistory', data ? data.ttCredentialHistoryInformation.ttCredentialHistoryInformation : []);
    },

    onWinPbmInsuranceVerif: function () {
        var data = this.getViewModel().get('extraData');
        this.openPopup('pharmacy-main-pbminsurance', data ? data.ttCredentialHistoryInformation.ttCredentialHistoryInformation : []);
    },

    onWinPbmVerif: function () {
        var data = this.getViewModel().get('extraData');
        this.openPopup('pharmacy-main-pbmverification', data ? data.ttCredentialHistoryInformation.ttCredentialHistoryInformation : []);
    },

    onCheckBlank: function (cmp) {
        var val = cmp.getValue();
        // if (val === null || val === '' || +val === 0) {
        if (+val === 0) {
            cmp.setValue(0);
        }
    }
});

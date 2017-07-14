/**
 * Created by T4317 on 11/7/2016.
 */
Ext.define('Atlas.claims.view.UCFClaimProcessingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claims-ucfprocess',

    listen: {
        controller: {
            '#common-fileUploadController': {
                successfulUpload: 'onUploadAttachment'
            }
        }
    },

    init: function () {
        var vm = this.getViewModel();
        var view = this.getView();
        this.clearValues();
        //var record = Ext.create('Atlas.common.model.UCFClaim');
        //var ucfclaim = this.getViewModel().getStore('ucfclaim');
        //ucfclaim.removeAll();
        //this.getViewModel().getStore('ucfclaim').add(record);
        //var ii = view.lookupReference('insuredId');
        /*ii.setToolTip()
         ii.validator = Ext.bind(this.txtValidator, this, [ii, ii.getFieldLabel() + " is required",""]);
         var PCNID = view.lookupReference('PCNID');
         PCNID.validator = Ext.bind(this.txtValidator, this, [PCNID, PCNID.getFieldLabel() + " is required",""]);
         */

        //view.loadRecord(record);
        //this.loadDrugPricing(0,0,0,0,0,0,0,0);
        var durType = vm.getStore('durType');
        durType.getProxy().setExtraParam('pListName', 'DURType');
        durType.load({
            callback: function (record, operation) {
                var tdoverrideServiceCodes = vm.getStore('tdoverrideServiceCodes');
                tdoverrideServiceCodes.getProxy().setExtraParam('pListName', 'TDOverrideServiceCodes');
                tdoverrideServiceCodes.load({
                    callback: function (record1, operation) {
                        var durResultOfService = vm.getStore('durResultOfService');
                        durResultOfService.getProxy().setExtraParam('pListName', 'DURResultOfService');
                        durResultOfService.load({
                            callback: function (record2, operation) {
                                var qualifiedfac = vm.getStore('qualifiedfac');
                                qualifiedfac.load();
                            }

                        });

                    }

                });
            }

        });
        // hack to remove duplicate entries of 1 and 01, 2 and 02 etc.  the application uses the for 0x so those are kept

        var store = vm.getStore('residencecode');
        store.on('load', function (store) {
            store.filter({
                filterFn: function (f) {
                    return f.get('value').indexOf('0') == 0 && f.get('value').length > 1;
                }
            });
        });

        /*
         for handling calls to open the UCF Claim Processing page from another page
         */
        if (view.atlasId) {
            var txtFldClaimId = this.getView().getReferences().claimbox;
            txtFldClaimId.setValue(view.atlasId);
            this.getUCFClaimDetail(txtFldClaimId);
        }
    },
    getTransactionId: function () {
        return this.getView().lookupReference('claimbox').getValue() || '';
    },
    setClaimStatus: function (record) {
        var value = record.get('claimStatus');
        var label = this.getView().lookupReference('claimStatusLabelRef');

        if (value == 'R') {
            //label.applyStyles('color: darkgreen;');
            //label.setConfig('fieldCls', 'm-red-color');
            label.setUserCls('m-red-color-displayfield');
            //label.el.replaceCls()
            //debugger;
            // label.setFieldStyle('m-red-color');
            record.set('claimStatusLabel', "Claim Status Rejected");
        }
        else if (value == 'P') {
            label.setUserCls('m-green-color-displayfield');
            record.set('claimStatusLabel', 'Claim Status Paid');
        }
        else if (value == 'D') {
            label.setUserCls('m-red-color-displayfield');
            record.set('claimStatusLabel', 'Claim Status: Duplicate Paid');
        }
    },

    getFormattedSubmitted: function (value) {
        if (value) {
            return Ext.util.Format.currency(value);

        } else
            return '';
    },
    loadDrugPricing: function (IngCost, DispFee, IncentiveAmt, OtherAmountClaimed, SalesTax, GrossAmt, UAC, PatPaid) {
        //debugger;
        var grid = this.getView().lookupReference('drugPricingGrid');
        var drugpricing = this.getViewModel().getStore('drugpricing');
        var data = [
            {DESCRIPTION: 'Ingredient Cost', submitted: IngCost},
            {DESCRIPTION: 'Disp Fee', submitted: DispFee},
            {DESCRIPTION: 'Incentive Amt', submitted: IncentiveAmt},
            {DESCRIPTION: 'Other Amount Claimed', submitted: OtherAmountClaimed},
            {DESCRIPTION: 'Sales Tax', submitted: SalesTax},
            {DESCRIPTION: 'Gross Amount', submitted: GrossAmt},
            {DESCRIPTION: 'Usual Cust Charge', submitted: UAC},
            {DESCRIPTION: 'Patient Paid', submitted: PatPaid}
        ];
        drugpricing.loadData(data);

    },
    /*txtValidator: function(val,errortext,number,nmberval) {
     var valid =errortext;
     if(val.getValue())
     {
     if(number=="NUM")
     {

     var v=  parseInt(val.getValue());
     if(!v)
     val.setValue("");

     if(v.toString().length >= nmberval) {
     val.setValue(val.getValue().substring(0, nmberval))
     return true;
     }

     return v;
     }
     valid = true;
     }


     return valid;
     },*/
    clearValues: function () {

        this.getView().getForm().reset();
        this.loadDrugPricing(0, 0, 0, 0, 0, 0, 0, 0);
        var vm = this.getViewModel();//
        var ucfclaim = vm.getStore('ucfclaim');
        ucfclaim.getProxy().setExtraParam('ptransactionID', 0);
        ucfclaim.load();
        //vm.getStore('ucfclaim').removeAll();
        var record = Ext.create('Atlas.common.model.UCFClaim');
        this.getView().loadRecord(record);
        //this.getViewModel().getStore('ucfclaim').add(record);
        //this.getView().loadRecord(record);*/
        this.getView().lookupReference('routeToClaimDetailRef').setText('');
        this.getView().lookupReference('routeToClaimDetailRef').disabled = true;
        vm.getStore('dmedruginfo').removeAll();
        vm.getStore('ufcclaimcob').removeAll();
        vm.getStore('ufcpatrespqual').removeAll();
        vm.getStore('ucfclaimspps').removeAll();
        vm.getStore('ucfclaimdiagdetail').removeAll();


    },
    deleteClaim: function () {
        var vm = this.getViewModel();//
        var ucfclaim = vm.getStore('ucfclaim');
        ucfclaim.removeAll();
        var returnFields = ['pcTransID', 'pcSystemId'];
        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];
        var testReturn = Atlas.common.utility.Utilities.saveData([ucfclaim], 'claims/rx/ucfclaimdetail/update', 'ttUCFClaimDetail', [true], null,
            saveAction, returnFields);
        this.clearValues();


    },
    setValidity: function (saving) {
        var view = this.getView();
        var sd = view.lookupReference('sDate'); //ndcnum
        var nd = view.lookupReference('ndcnum');
        var dq = view.lookupReference('dQty');
        var ds = view.lookupReference('daySupply');
        var dea = view.lookupReference('deaNPI');
        var ncpdp = view.lookupReference('ncppdpIdCombo');
        var rxn = view.lookupReference('rxno');
        var dwr = view.lookupReference('dWrit');
        if (saving) {
            sd.setConfig('allowBlank', true);
            nd.setConfig('allowBlank', true);
            dq.setConfig('allowBlank', true);
            ds.setConfig('allowBlank', true);
            dea.setConfig('allowBlank', true);
            ncpdp.setConfig('allowBlank', true);
            rxn.setConfig('allowBlank', true);
            dwr.setConfig('allowBlank', true);

        }
        else {
            sd.setConfig('allowBlank', false);
            //sd.validator = Ext.bind(this.txtValidator, this, [sd, sd.getFieldLabel() + " is required",""]);
            nd.setConfig('allowBlank', false);
            //nd.validator = Ext.bind(this.txtValidator, this, [nd, nd.getFieldLabel() + " is required",""]);
            dq.setConfig('allowBlank', false);
            //dq.validator = Ext.bind(this.txtValidator, this, [dq, dq.getFieldLabel() + " is required",""]);
            ds.setConfig('allowBlank', false);
            //ds.validator = Ext.bind(this.txtValidator, this, [ds, ds.getFieldLabel() + " is required",""]);
            dea.setConfig('allowBlank', false);
            //dea.validator = Ext.bind(this.txtValidator, this, [dea, dea.getFieldLabel() + " is required",""]);
            ncpdp.setConfig('allowBlank', false);
            //ncpdp.validator = Ext.bind(this.txtValidator, this, [ncpdp, ncpdp.getFieldLabel() + " is required",""]);
            rxn.setConfig('allowBlank', false);
            //rxn.validator = Ext.bind(this.txtValidator, this, [rxn, rxn.getFieldLabel() + " is required",""]);
            dwr.setConfig('allowBlank', false);
            //dwr.validator = Ext.bind(this.txtValidator, this, [dwr, dwr.getFieldLabel() + " is required",""]);
        }
    },
    onSpecialKeyPress: function (field, e) {
        var me = this;

        if (e.getKey() == e.ENTER) {
            me.getUCFClaimDetail(field);
        }
    },
    getOtherPayerPatRespQual: function (value) {
        if (value) {
            var qualifiedfac = this.getViewModel().getStore('qualifiedfac');
            var record = qualifiedfac.findRecord('value', value);
            if (record)
                return record.get('name');

        } else
            return '';
    },
    getOtherPayerPatRespAmt: function (value) {
        if (value) {
            return Ext.util.Format.currency(value);
        }
    },
    onCompoundDrug: function (btn) {
        var view = this.getView();

        if (view.lookupReference('dosageFormCombo').disabled)
            Ext.MessageBox.alert('Notice', 'Please select compound GCN to enter the compound drug.');
        else {
            var compoundWindow;

            if (!this.compoundWindow) {
                compoundWindow = Ext.create('Atlas.claims.view.UCFClaimCompoundDrugWindow');
                view.add(compoundWindow);
                var tid = view.lookupReference('claimbox').getValue();
                if (tid && tid.length > 0) {
                    var store = this.getViewModel().getStore('ucfclaimcompound');
                    store.getProxy().setExtraParam('ptransactionID', tid);
                    store.load({
                            callback: function (record1, operation) {
                                compoundWindow.show();
                            }
                        }
                    );
                }
                else {
                    compoundWindow.show();
                }


            }
        }

    },
    onPatRespDelete: function (btn) {
        var record = btn.up().getViewModel().data.record;
        var ufcpatrespqual = this.getViewModel().getStore('ufcpatrespqual');
        ufcpatrespqual.remove(record);
    },
    onDurDelete: function (btn, context) {
        var record = btn.up().getViewModel().data.record;
        var ucfclaimspps = this.getViewModel().getStore('ucfclaimspps');
        ucfclaimspps.remove(record);
    },
    onDiagDelete: function (btn) {
        var record = btn.up().getViewModel().data.record;
        var ucfclaimdiagdetail = this.getViewModel().getStore('ucfclaimdiagdetail');
        ucfclaimdiagdetail.remove(record);
    },
    onMemberTypeAheadSelect: function (combo, record) {
        //var fieldList = "recipientID,firstname,lastname,gender,birthDate,@enrollmentStatus,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State";
        //var keyType = 'recipientId';
        //var keyValue= combo.getValue();
        var view = this.getView();
        var memberinfo = this.getViewModel().getStore('memberinfo');
        memberinfo.getProxy().setExtraParam('pKeyType', 'recipientId');
        memberinfo.getProxy().setExtraParam('pFieldList', 'recipientID,firstname,lastname,gender,birthDate,@enrollmentStatus,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State');
        memberinfo.getProxy().setExtraParam('pKeyValue', record.get('trecipientID'));
        memberinfo.load({
            callback: function (record1, operation) {
                var rec = view.getRecord();//
                rec.set('insuredId', record.get('memberID'));
                rec.set('recipientID', record.get('recipientID'));
                //rec.set('memberName',record1[0].get('firstname')+ ' ' + record1[0].get('lastname'));
                rec.set('insuredFirstName', record1[0].get('firstname'));
                rec.set('insuredLastName', record1[0].get('lastname'));
                var address = record1[0].get('Home.Address1');
                if (record1[0].get('Home.Address2'))
                    address += record1[0].get('Home.Address2');
                address += ', ' + record1[0].get('Home.City') + ', ' + record1[0].get('Home.State') + record1[0].get('zip');
                rec.set('memberAddress', address);
                var bd = record1[0].get('birthDate');
                var d = Ext.Date.parse(bd, 'm/d/Y');
                rec.set('dateOfBirth', d.toString());
                rec.set('genderCode', record1[0].get('gender'));
                view.loadRecord(rec);
            }
        });


    },
    onDrugTypeAheadSelect: function (combo, record) {
        var view = this.getView();
        var formRec = view.getRecord();
        //debugger;
        //GCN_SEQNO
        //LN
        formRec.set('productId', record.get('NDC'));
        formRec.set('LN', record.get('LN'));
        formRec.set('gcnseq', record.get('GCN_SEQNO'));
        if (record.get('NDC') != '00000000000') {
            view.lookupReference('dosageFormCombo').clearValue();
            view.lookupReference('dispensingUnitCombo').clearValue();
            formRec.set('compoundDosageForm', '');
            formRec.set('compoundDispUnitForm', '');
        }
        view.lookupReference('dosageFormCombo').setDisabled(record.get('NDC') != '00000000000');
        view.lookupReference('dispensingUnitCombo').setDisabled(record.get('NDC') != '00000000000');

        view.loadRecord(formRec);
        //vm.set('transactionId',field.value);
        //vm.set('masterrecord', record);
    },
    onProviderTypeAheadSelect: function (combo, record) {
        var view = this.getView();
        var prescriber = this.getViewModel().getStore('prescriber');
        prescriber.getProxy().setExtraParam('pKeyValue', record.get('npi'));
        prescriber.load({
            callback: function (record1, operation) {
                var rec = view.getRecord();//
                rec.set('prescriberId', record.get('npi'));
                rec.set('prescriberName', record1[0].get('fullname'));
                rec.set('prescriberPhone', record1[0].get('phone'));
                rec.set('excludedPharmacy', record1[0].get('FWAPrescriberLockFlag'));
                view.loadRecord(rec);
            }
        });
    },
    onNcpdpSelect: function (combo, record) {
        //debugger;
        /*combo.setDisplayTpl(Ext.create('Ext.XTemplate',
         '<tpl for=".">{ncpdpId} {Name}</tpl>'
         ));*/
        var view = this.getView();
        var rec = view.getRecord();
        rec.set('ncpdpId', record.get('ncpdpId'));
        rec.set('PharmacyNameDescr', record.get('ncpdpId') + ' ' + record.get('Name'));
        rec.set('PharmacyName', record.get('Name'));
        var pharmacy = this.getViewModel().getStore('pharmacy');
        pharmacy.getProxy().setExtraParam('pKeyType', 'ncpdpid');
        pharmacy.getProxy().setExtraParam('pFieldList', 'ncpdpid,name,locCity,@locAcceptsErxFlag,locState,locAddress1,locAddress2,locZip,locCrossStreet,mailAddress1,mailCity,mailState,mailZip,locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactFax,contactExt,ContactEmail,legalBusinessName,primDispTypeCode,secDispTypeCode,tertDispTypeCode,dispClassCode,fedTaxId');
        //pharmacy.getProxy().setExtraParam('pKeyValue',combo.getValue());
        pharmacy.getProxy().setExtraParam('pKeyValue', record.get('ncpdpId'));
        pharmacy.load({
            callback: function (record1, operation) {
                var address = record.get('Address1');
                if (record.get('Address2'))
                    address += record.get('Address2');
                address += ', ' + record.get('locCity') + ', ' + record.get('locState') + ', ' + record.get('locZip');
                rec.set('pharmacyAddress', address);
                rec.set('PharmacyPhone', record1[0].get('phone'));
                view.loadRecord(rec);
            }
        });


        //rec.set('PharmacyPhone',record.get)
        // rec.set()
        //this.getView().loadRecord(rec);
    },
    getUCFClaimDetail: function (field) {
        //this.clearValues();
        //debugger;
        var me = this,
            view = me.getView(),
            vm = this.getViewModel();
        var previousRecord = vm.get('masterrecord');
        //ucfclaim = Ext.create('Atlas.common.model.UCFClaim', {});
        var ucfclaim = vm.getStore('ucfclaim');
        ucfclaim.getProxy().setExtraParam('ptransactionID', field.value);
        ucfclaim.load({
            callback: function (records, operation) {
                view.lookupReference('routeToClaimDetailRef').setDisabled(false);
                if (operation._response.responseText.toLowerCase().indexOf('record not found') != -1) {
                    Ext.MessageBox.alert('PBM', 'No Record Found.');
                    if (previousRecord)
                        field.setValue(previousRecord.get('transactionId'));
                    return;
                }
                var ucfimage = vm.getStore('ucfimage');
                ucfimage.load();

                var record = records[0];
                view.reset();
                me.setClaimStatus(record);
                view.loadRecord(record);
                view.lookupReference('dosageFormCombo').setDisabled(view.lookupReference('ndcnum').getValue() != '00000000000');
                view.lookupReference('dispensingUnitCombo').setDisabled(view.lookupReference('ndcnum').getValue() != '00000000000');
                vm.set('transactionId', field.value);
                view.lookupReference('routeToClaimDetailRef').setText(record.get('claimRefNum'));
                vm.set('pbmClaimId', record.get('claimRefNum'));
                vm.set('masterrecord', record);
                //vm.set('claimRecord', record);
                me.getUCFImages(vm, field.value);
                var nc = view.lookupReference('ncppdpIdCombo');
                me.getDMRDrugInfo(record.get('insuredId'), record.get('productId'), new Date(record.get('serviceDate')).toLocaleString());
                var button = view.lookupReference('saveButton');
                //view.lookupReference('submitButton').setDisabled(false);
                //view.lookupReference('saveButton').setDisabled(false);
                var clinicalDur = vm.getStore('ucfclaimspps');
                clinicalDur.getProxy().setExtraParam('ptransactionID', field.value);
                clinicalDur.load({
                        callback: function (record, operation) {
                            // just use a renderer?
                        }
                    }
                    //DURResultOfService
                );
                var ucfclaimdiagdetail = vm.getStore('ucfclaimdiagdetail');
                ucfclaimdiagdetail.getProxy().setExtraParam('ptransactionID', field.value);
                ucfclaimdiagdetail.load();
                var notes = vm.getStore('notes');
                notes.getProxy().setExtraParam('pParentSystemID', record.get('SystemID'));
                notes.load(
                    {
                        callback: function (record1, operation) {

                        }
                    }
                );

                me.loadDrugPricing(record.get('ingCostSubmitted'), record.get('dispFeeSubmitted'), record.get('incentiveAmtSubmitted'), record.get('otherAmtSubmitted'), record.get('salesTaxSubmitted'), record.get('grossAmtDue'), record.get('patPaidSubmitted'), record.get('usualCustCharge'));
                var ufcclaimcob = vm.getStore('ufcclaimcob');
                var ttUCFClaimCOB, ttUCFPatResp;
                ufcclaimcob.getProxy().setExtraParam('pcTransID', field.value);
                //ufcclaimcob.getProxy().setExtraParam('ttUCFClaimCOB',ttUCFClaimCOB);
                //ufcclaimcob.getProxy().setExtraParam('ttUCFClaimCOB',ttUCFPatResp);
                //debugger;
                ufcclaimcob.load({
                        callback: function (record, operation) {
                            //debugger;
                            var ttUCFPatResp = operation._resultSet.metadata.ttUCFPatResp;
                            //console.log(ttUCFPatResp);
                            if (record.length > 0) {
                                view.lookupReference('paidAmount').setValue(record[0].get('paidAmt'));
                                view.lookupReference('payerId').setValue(record[0].get('payerID'));
                                view.lookupReference('datePaid').setValue(record[0].get('payerDate'));
                                view.lookupReference('rejectCodes').setValue(record[0].get('rejCode'));
                            }

                            var ufcpatrespqual = vm.getStore('ufcpatrespqual');
                            /*var data = [];

                             for (var i=0;i<ttUCFPatResp.ttUCFPatResp.length;i++)
                             {
                             data[i]={
                             otherPayerPatRespQual:ttUCFPatResp.ttUCFPatResp[i].otherPayerPatRespQual,
                             otherPayerPatRespAmt:ttUCFPatResp.ttUCFPatResp[i].otherPayerPatRespAmt,
                             systemId:ttUCFPatResp.ttUCFPatResp[i].systemId,
                             transactionID:ttUCFPatResp.ttUCFPatResp[i].transactionID
                             };
                             }
                             ufcpatrespqual.loadData(data);*/
                            ufcpatrespqual.loadData(ttUCFPatResp.ttUCFPatResp);

                        }
                    }
                    //DURResultOfService
                );


            }
        });
    },
    getDUROverride: function (value) {
        var store = this.getViewModel().getStore('durType');
        var record = store.findRecord('value', value);
        if (record)
            return record.get('name');
        else return '';
    },
    getProfServCode: function (value) {
        var store = this.getViewModel().getStore('tdoverrideServiceCodes');
        var record = store.findRecord('value', value);
        if (record)
            return record.get('name');
        else return '';
    },
    getResultOfServCode: function (value) {
        var store = this.getViewModel().getStore('durResultOfService');
        var record = store.findRecord('value', value);
        if (record)
            return record.get('name');
        else return '';
    },
    getUCFImages: function (vm, claimId) {
        var UCFImage = this.getViewModel().getStore('ucfimage');
        UCFImage.getProxy().setExtraParam('pcKeyValue', claimId);
        UCFImage.load();

    },
    detachUCFImage: function (btn) {
        var rec = btn.up().getViewModel().data.record;
        var UCFImage = this.getViewModel().getStore('ucfimage');
        UCFImage.remove(rec);


    },
    onViewPdf: function (btn) {
        var rec = btn.up().getViewModel().data.record;
        Atlas.common.utility.Utilities.viewDocument(rec.get('DocumentID'), '.pdf');
    },
    btnView_Click: function (sender, index) {

    },
    onAddPatientResponsibiityGrid: function (btn) {
        var grid = this.getView().lookupReference('patRespGrid');
        var store = this.getViewModel().get('ufcpatrespqual');
        var plugin = grid.getPlugin('rowEdit4');
        store.insert(0, {
            transactionID: this.getViewModel().get('transactionId'),
            otherPayerPatRespQual: '',
            getOtherPayerPatRespQual: ''
        });
        plugin.startEdit(0);
    },
    onAddDurClinical: function (btn) {
        //debugger;
        var grid = this.getView().lookupReference('durClinicalGrid');
        var store = this.getViewModel().get('ucfclaimspps');
        //var    newList = Ext.create('Atlas.common.model.UCFClaimPPSModel');
        var plugin = grid.getPlugin('rowEdit');
        //store.insert(0, newList);
        store.insert(0, {
            serviceRsnCode: '',
            transactionId: this.getViewModel().get('transactionId'),
            profServCode: '',
            resultOfServiceCode: ''
        });
        plugin.startEdit(0);
    },
    onAddDiagClinical: function (btn) {
        //var grid
        var grid = this.getView().lookupReference('diagClinicalGrid');
        var store = this.getViewModel().get('ucfclaimdiagdetail');
        //newList = Ext.create('Atlas.common.model.UCFClaimDiagDetailModel'),
        var plugin = grid.getPlugin('rowEdit2');
        var sc = store.count() + 1;
        //debugger;
        store.insert(0, {
            diagCodeQual: "0" + sc, diagCode: "", TransactionID: this.getViewModel().get('transactionId')
        });

        plugin.startEdit(0);
    },
    onNotesHistoryClick: function () {
        var vm = this.getViewModel(),
            view = this.getView();
        var notesWindow;
        if (!this.notesWindow) {
            notesWindow = Ext.create('Atlas.claims.view.ClaimsNotesWindow', {
                //autoShow: true,
                closeAction: 'hide' // Keep window around and don't destroy
            });

            this.getView().add(notesWindow);
            var notes = vm.getStore('notes');
            //debugger;
            var nData = notes.getData();
            var nString = '';
            //debugger;
            for (var i = 0; i < nData.items.length; i++) {
                var dts = Ext.Date.format(nData.items[i].data.CreateDate, 'm/d/Y') + ' ' + nData.items[i].data.CreateTime.trim();
                var dtst= Ext.Date.parse(dts,'m/d/Y g:i:sa');
                var dt = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(dtst,'m/d/Y g:i:sa');

                nString += nData.items[i].data.CreateUser + ' - ' + dt + ' : ' + nData.items[i].data.Subject + ' - ' + nData.items[i].data.Note + '\n';
            }
            //notesWindow.getView().lookupReference('notesHistoryText').setValue('this is the notes history');
            notesWindow.down('[reference=notesHistoryText]').setValue(nString);
            //view.add(notesWindow).show();
            notesWindow.show();
        } else {
            this.notesWindow.show();
        }
    },
    openFaxQueue: function () {
        //debugger;
        var vm = this.getViewModel();
        var faxWindow;
        if (!this.faxWindow) {
            faxWindow = Ext.create('Atlas.claims.view.FaxQueue', {
                autoShow: true,
                closeAction: 'hide' // Keep window around and don't destroy
            });
            this.getView().add(faxWindow);
        } else {
            this.faxWindow.show();
        }
    },
    getDMRDrugInfo: function (memberId, productId, servicedate) {

        var view = this.getView();
        var DMRDrug = Ext.create('Atlas.common.model.DMRDrugInfo', {});
        DMRDrug.getProxy().setExtraParam('pMemberId', memberId);
        DMRDrug.getProxy().setExtraParam('pDOS', servicedate)
        DMRDrug.getProxy().setExtraParam('pNDC', productId);
        DMRDrug.load({
            callback: function (record) {

                if (record.get('Covered'))
                    view.lookupReference('onFormularyLabel').setValue(record.get('Covered'));
                else
                    view.lookupReference('onFormularyLabel').setValue('No');

                if (record.get('PartDExcludedDrug') && !record.get('PartDExcludedDrug'))
                    view.lookupReference('excludedDrug').setValue(record.get('PartDExcludedDrug'));
                else
                    view.lookupReference('excludedDrug').setValue('No');

                if (record.get('QtyLimit'))
                    view.lookupReference('qtyLimit').setValue(record.get('QtyLimit'));
                else
                    view.lookupReference('qtyLimit').setValue('0');

                if (record.get('NonMatched') && !record.get('NonMatched'))
                    view.lookupReference('nonMatchedNDC').setValue(record.get('NonMatched'));
                else
                    view.lookupReference('nonMatchedNDC').setValue('No');

                if (record.get('PAInd') && !record.get('PAInd'))
                    view.lookupReference('paReq').setValue(record.get('PAInd'));
                else
                    view.lookupReference('paReq').setValue('No');

                if (record.get('StepTherapyInd') && !record.get('StepTherapyInd'))
                    view.lookupReference('stReqd').setValue(record.get('StepTherapyInd'));
                else
                    view.lookupReference('stReqd').setValue('No');
            }
        });

    },
    onSaveUCFClaim: function () {
        this.saveUCFClaim(false);
    },
    saveUCFClaim: function (submitting) {
        var me = this,
            vm = this.getViewModel();
        var form = this.getView().getForm();
        this.setValidity(true);
        if (!form.isValid()) {
            Ext.MessageBox.alert('PBM', 'Please complete the identified items before saving.');
            return;
        }
        var ucfclaimspps = vm.getStore('ucfclaimspps');
        var ucfclaimdiagdetail = vm.getStore('ucfclaimdiagdetail');
        var claim = vm.get('masterrecord');
        var formVals = this.getView().getForm().getFieldValues();//this.getView().getForm().getValues();


        //var   UCFClaim = Ext.create('Atlas.common.model.UCFClaim');
        var ucfclaim = vm.getStore('ucfclaim');
        //var record = ucfclaim.get
        var record = ucfclaim.getData().first();
        /*var modeVar = "U";
         if (!formVals.transactionId || formVals.transactionId==''|| formVals.transactionId==0){
         modeVar = "A";
         record.crudState="C";
         }*/
        if (!record)
            record = Ext.create('Atlas.common.model.UCFClaim');
        record.set('transactionID', formVals.transactionId || 0);
        record.set('serviceDate', formVals.serviceDate || null);
        record.set('PCN', formVals.PCN || '');
        record.set('groupID', formVals.groupId || '');
        record.set('insuredID', formVals.insuredId || '');
        record.set('recipientId', formVals.recipientID || (claim.get('recipientId') || ''));
        record.set('compoundCode', (formVals.compoundCode == '00000000000' ? '2' : '1')); //UCFClaimInfo.compoundCode = (cbxMedication.SelectedItem.Value == "00000000000" ? "2" ', "1");
        record.set('productIdQual', formVals.productIdQual || '03');
        record.set('ProductID', formVals.productId || '');
        record.set('gcnseq', formVals.gcnseq || '');
        record.set('priorAuthNumSubmitted', formVals.priorAuthNumSubmitted || null);
        record.set('priorAuthTypeCode', null);
        record.set('carrierLobID', formVals.carrierLobId || '');
        record.set('ncpdpId', formVals.ncpdpId || '');
        record.set('PharmacyNameDescr', formVals.PharmacyNameDescr || '');
        record.set('PharmacyNameDescr', formVals.PharmacyName || '');
        record.set('pharmacyAddress', formVals.pharmacyAddress || '');
        record.set('PharmacyPhone', formVals.PharmacyPhone || '');
        record.set('dawCode', formVals.dawCode || '');
        record.set('dispQuantity', formVals.dispQuantity || '');
        record.set('daysSupply', formVals.daysSupply || '');
        record.set('rxOrigin', formVals.rxOrigin || '');
        record.set('rxNumQual', formVals.rxNumQual || '1');
        record.set('rxNum', formVals.rxNum || '');
        record.set('otherCoverageCode', formVals.otherCoverageCode || '');
        record.set('prescriberIdQual', formVals.prescriberIdQual || '01');
        record.set('prescriberId', formVals.prescriberId || '');
        record.set('servProvQual', formVals.servProvQual || '07');
        record.set('servProvId', formVals.ncpdpId || '');
        //record.set('ncpdpId', formVals.ncpdpId|| '');
        record.set('fillNumber', formVals.fillNumber || '');
        record.set('basisOfCost', formVals.basisOfCost || '');
        record.set('dateWritten', formVals.dateWritten || ''); //"dateWritten"', "2011-10-16")
        var drugpricing = vm.getStore('drugpricing');
        var ingCostSubmitted = drugpricing.findRecord('DESCRIPTION', 'Ingredient Cost').get('submitted');
        var dispFeeSubmitted = drugpricing.findRecord('DESCRIPTION', 'Disp Fee').get('submitted');
        var incentiveAmtSubmitted = drugpricing.findRecord('DESCRIPTION', 'Incentive Amt').get('submitted');
        var otherAmtSubmitted = drugpricing.findRecord('DESCRIPTION', 'Other Amount Claimed').get('submitted');
        var salesTaxSubmitted = drugpricing.findRecord('DESCRIPTION', 'Sales Tax').get('submitted');
        var grossAmtDue = drugpricing.findRecord('DESCRIPTION', 'Gross Amount').get('submitted');
        var usualCustCharge = drugpricing.findRecord('DESCRIPTION', 'Usual Cust Charge').get('submitted');
        var patPaidSubmitted = drugpricing.findRecord('DESCRIPTION', 'Patient Paid').get('submitted');
        record.set('ingCostSubmitted', isNaN(parseFloat(ingCostSubmitted)) ? 0.0 : parseFloat(ingCostSubmitted));//claim.get('ingCostSubmitted') || 0.0);
        record.set('dispFeeSubmitted', isNaN(parseFloat(dispFeeSubmitted)) ? 0.0 : parseFloat(dispFeeSubmitted));//claim.get('dispFeeSubmitted')|| 0.0);
        record.set('salesTaxSubmitted', isNaN(parseFloat(salesTaxSubmitted)) ? 0.0 : parseFloat(salesTaxSubmitted));//claim.get('salesTaxSubmitted')|| 0.0);
        record.set('patPaidSubmitted', isNaN(parseFloat(patPaidSubmitted)) ? 0.0 : parseFloat(patPaidSubmitted));//claim.get('patPaidSubmitted')|| '');
        record.set('incentiveAmtSubmitted', isNaN(parseFloat(incentiveAmtSubmitted)) ? 0.0 : parseFloat(incentiveAmtSubmitted));//claim.get('incentiveAmtSubmitted')|| 0.0);
        record.set('usualCustCharge', isNaN(parseFloat(usualCustCharge)) ? 0.0 : parseFloat(usualCustCharge));//claim.get('usualCustCharge')|| 0.0);
        record.set('otherAmtSubmitted', isNaN(parseFloat(otherAmtSubmitted)) ? 0.0 : parseFloat(otherAmtSubmitted));//claim.get('otherAmtSubmitted')|| 0.0);
        record.set('grossAmtDue', isNaN(parseFloat(grossAmtDue)) ? 0.0 : parseFloat(grossAmtDue));// claim.get('grossAmtDue')||0.0);
        record.set('representativeName', formVals.representativeName || '');
        record.set('compoundDosageForm', formVals.compoundDosageForm || '');
        record.set('compoundDispUnitForm', formVals.compoundDispUnitForm || '');
        record.set('patResidenceCode', formVals.patResidenceCode || '');
        record.set('PharmacyServType', formVals.PharmacyServType || '');
        record.set('subClarificationCode1', formVals.subClarificationCode1 || null);
        record.set('subClarificationCode2', formVals.subClarificationCode2 || null);
        record.set('subClarificationCode3', formVals.subClarificationCode3 || null);
        record.set('CMSQualFacility', formVals.CMSQualFacility || '');
        if (!formVals.transactionId || formVals.transactionId == '' || formVals.transactionId == 0) {
            //modeVar = "A";
            record.set('mode', "A");
            record.crudState = "C";
            //ucfclaim.removeAll();
        }
        else
            record.set('mode', "U");

        ucfclaim.add(record);
        //ucfclaim.get
        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];
        var pcTransID = 0, pcSystemId = 0.0;
        var returnFields = ['pcTransID', 'pcSystemId'];
        var testReturn = Atlas.common.utility.Utilities.saveData([ucfclaim], 'claims/rx/ucfclaimdetail/update', 'ttUCFClaimDetail', [true], null,
            saveAction, returnFields);
        if (testReturn.pcTransID) {
            record.set('transactionId', parseInt(testReturn.pcTransID));
            record.set('SystemID', testReturn.pcSystemId);
            pcTransID = testReturn.pcTransID;
            pcSystemId = testReturn.pcSystemId;
        }
        else {
            pcTransID = formVals.transactionId;
            pcSystemId = formVals.SystemID;
        }
        this.getView().lookupReference('claimbox').setValue(pcTransID);
        //var ttUCFPatResp = operation._resultSet.metadata.ttUCFPatResp;

        var success = false;
        if (testReturn.message.toLowerCase().indexOf("success") != -1) {
            testReturn = this.saveUCFClaimDUR(pcTransID);
            if (testReturn.message.toLowerCase().indexOf("success") != -1) {
                testReturn = this.saveUCFClaimDiag(pcTransID);
                if (testReturn.message.toLowerCase().indexOf("success") != -1) {
                    testReturn = this.saveCOBInfo(pcTransID);
                    if (testReturn.message.toLowerCase().indexOf("success") != -1 || testReturn.message.toLowerCase().indexOf("no ucfclaimcob record") != -1) {
                        testReturn = this.saveNotes(pcTransID, pcSystemId);
                        if (testReturn.code == 0) {
                            testReturn = this.saveCompoundDrugInfo(pcTransID);
                            if (testReturn.code == 0) {
                                success = true;
                                me.updateUCFImage(pcTransID);
                            }
                        }

                    }
                }
            }
        }

        if (!success) {
            Ext.MessageBox.alert('PBM', 'UCF Claim NOT Successfully Updated');
            return -1;
        }
        else if (!submitting) {
            Ext.MessageBox.alert('PBM', 'UCF Claim Successfully Updated');
            this.getUCFClaimDetail(this.getView().lookupReference('claimbox'));
            return 0;
        } else if (submitting) {
            return pcTransID;
        }


    },
    saveUCFClaimDUR: function (transId) {
        var ucfclaimspps = this.getViewModel().getStore('ucfclaimspps');
        var temp = [];
        var ditems = ucfclaimspps.getData().items;
        for (var i = 0; i < ditems.length; i++) {
            var x = {};
            x.serviceRsnCode = ditems[i].data.serviceRsnCode;
            if (!ditems[i].data.transactionId)
                ditems[i].data.transactionId = transId;
            x.transactionId = ditems[i].data.transactionId;
            x.profServCode = ditems[i].data.profServCode;
            x.resultOfServiceCode = ditems[i].data.resultOfServiceCode;
            temp.push(x);

        }
        var ttUCFClaimPPS = {};
        var params = {};
        ttUCFClaimPPS['ttUCFClaimPPS'] = temp;
        params['ttUCFClaimPPS'] = ttUCFClaimPPS;
        var testReturn = Atlas.common.utility.Utilities.post('claims/rx/ucfclaimpps/update', params, null);
        return testReturn;

    },
    saveUCFClaimDiag: function (transId) {
        var ucfclaimdiagdetail = this.getViewModel().getStore('ucfclaimdiagdetail');
        var temp = [];
        var ditems = ucfclaimdiagdetail.getData().items;
        for (var i = 0; i < ditems.length; i++) {
            var x = {};
            x.diagCodeQual = ditems[i].data.diagCodeQual;
            if (!ditems[i].data.TransactionID)
                ditems[i].data.TransactionID = transId;
            x.transactionId = ditems[i].data.TransactionID;
            x.diagCode = ditems[i].data.diagCode;
            temp.push(x);

        }
        var ttUCFClaimDiagDetail = {};
        var params = {};
        ttUCFClaimDiagDetail['ttUCFClaimDiagDetail'] = temp;
        params['ttUCFClaimDiagDetail'] = ttUCFClaimDiagDetail;
        var testReturn = Atlas.common.utility.Utilities.post('claims/rx/ucfclaimdiagdetail/update', params, null);
        return testReturn;

    },
    saveCOBInfo: function (transId) {
        var ufcpatrespqual = this.getViewModel().getStore('ufcpatrespqual');
        var ritems = ufcpatrespqual.getData().items;
        var sPatRespQual = '';
        var sPatRespAmt = '';

        for (var i = 0; i < ritems.length; i++) {
            var q = ritems[i].data.otherPayerPatRespQual
            if (q && q != '')
                sPatRespQual += q;
            if (i < ritems.length - 1)
                sPatRespQual += '|';
            var a = ritems[i].data.otherPayerPatRespAmt
            if (a && a != '')
                sPatRespAmt += a;
            if (i < ritems.length - 1)
                sPatRespAmt += '|';

        }
        var ufcclaimcob = this.getViewModel().getStore('ufcclaimcob');
        var temp = [];
        var ditems = ufcclaimcob.getData().items;
        if (ditems.length == 0) {
            var x = {};
            x.transactionId = transId;
            x.coverageType = '01';
            var pmt = this.getView().lookupReference('paidAmount').getValue();
            x.paidAmt = isNaN(parseFloat(pmt)) ? 0.0 : parseFloat(pmt);
            x.paidAmtQual = '08';
            x.payerDate = this.getView().lookupReference('datePaid').getValue() || '';
            x.payerID = this.getView().lookupReference('payerId').getValue() || '';
            x.payerIDQual = '03';
            x.otherPayerPatRespQual = sPatRespQual;
            x.otherPayerPatRespAmt = sPatRespAmt;
            temp.push(x);

        }
        else {
            for (var i = 0; i < ditems.length; i++) {
                var x = {};
                if (!ditems[i].data.transactionID)
                    ditems[i].data.transactionID = transId;
                x.transactionId = ditems[i].data.transactionID;
                x.coverageType = '01';
                var pmt = this.getView().lookupReference('paidAmount').getValue();
                x.paidAmt = isNaN(parseFloat(pmt)) ? 0.0 : parseFloat(pmt);
                x.paidAmtQual = '08';
                x.payerDate = this.getView().lookupReference('datePaid').getValue() || '';
                x.payerID = this.getView().lookupReference('payerId').getValue() || '';
                x.payerIDQual = '03';
                x.otherPayerPatRespQual = sPatRespQual;
                x.otherPayerPatRespAmt = sPatRespAmt;
                temp.push(x);

            }
        }

        var ttUCFClaimCOB = {};
        var params = {};
        ttUCFClaimCOB['ttUCFClaimCOB'] = temp;
        params['ttUCFClaimCOB'] = ttUCFClaimCOB;
        var testReturn = Atlas.common.utility.Utilities.post('claims/rx/ucfclaimcob/update', params, null);
        return testReturn;
    },
    saveNotes: function (transid, sysId) {
        var vm = this.getViewModel();
        var view = this.getView();
        //var record = vm.get('masterrecord');
        var params = [];
        var x = {};
        x.psystemID = sysId;//record.get("SystemID");
        //params.push(psystemID);
        x.pMode = 'A';
        //params.push(pMode);
        var nSubj = 'UCF Claim Created';
        if (transid > 0)
            nSubj = 'UCF Claim Updated';

        var pFieldList = "ParentSystemID,Subject,Note,CreateUser";
        x.pFieldList = pFieldList;
        //params.push(pFieldList);
        var returnFields = []
        var pFields = x.psystemID + '|' + nSubj + '|' + view.lookupReference('notesTextArea').getValue() + '|' + Atlas.user.un;
        x.pFields = pFields;

        params.push(x);
        //var notes = vm.getStore('notes');
        //notes.getProxy().set
        //var testReturn = Atlas.common.utility.Utilities.saveData([notes], 'shared/rx/notes/update/update', null,[true], null,
        //  saveAction, returnFields );

        var testREturn = Atlas.common.utility.Utilities.post('shared/rx/notes/update', x, null);
        return testREturn;
    },
    saveCompoundDrugInfo: function (transid) {
        var vm = this.getViewModel();
        var store = vm.getStore('ucfclaimcompound');
        //if (store.get)
        store.each(function (record) {
            record.set('transactionId', transid);
        });
        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];
        var testReturn = Atlas.common.utility.Utilities.saveData([store], 'claims/rx/ucfclaimcompound/update', 'ttUCFClaimCompound', [true], null,
            saveAction, null);
        return testReturn;


    },
    processClaim: function () {
        this.setValidity(false);
        var form = this.getView().getForm();
        var transId = 0;
        if (!form.isValid()) {
            Ext.MessageBox.alert('PBM', 'Please complete the identified items before submitting.');
            return;
        }
        transId = this.saveUCFClaim(true);
        if (transId == -1)
            return;

        var me = this,
            //me.lookup('claimbox').getValue(),
            processClaim = Ext.create('Atlas.common.model.ProcessClaim');
        processClaim.phantom = false;
        processClaim.getProxy().setExtraParam('pTransactionID', transId);
        processClaim.save({
            callback: function (record, operation) {
                Ext.MessageBox.alert('Success', 'Claim has been successfully processed');
                me.getUCFClaimDetail(me.getView().lookupReference('claimbox'));
            }
        });
    },
    /*routeToClaimDetail: function () {
     var me = this,
     vm = me.getViewModel(),
     node = this.getViewModel().getParent().getStore('menuitems').findNode('route','merlin/claims/ClaimsToolbar'),
     route = node.get('route') || node.get('routeId'),
     parentMenuId = node.get('parentMenuID'),
     menuId = node.get('menuID'),
     menuTitle = node.get('menuTitle'),
     atlasId = vm.get('transactionId');
     me.fireEvent('routeTo', {
     routeId: route + '/' + atlasId,
     parentMenuId: parentMenuId,
     menuId: menuId,
     title: menuTitle
     });
     }*/
    routeToClaimDetail: function () {
        //changes requested by Ankit Kumar
        var me = this,
            vm = me.getViewModel(),
            //atlasId = vm.get('transactionId'),
            atlasId = vm.get('pbmClaimId');
        menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');

        me.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
            menuId: menuId,
            atlasId: atlasId
        });

    },

    updateUCFImage: function (transactionID) {
        var iCnt,
            docID = 0,
            docList = '',
            delDocList = '',
            descList = '',
            docDescription = '',
            saveData = '',
            ucfimagestore = this.getViewModel().getStore('ucfimage');

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        /* ADDD ATTACHMENT RECORD */
        for (iCnt = 0; iCnt < ucfimagestore.count(); iCnt++) {

            var record = ucfimagestore.data.items[iCnt];

            if (!record.dirty) {
                continue;
            }
            docID = record.get('DocumentID');
            docDescription = record.get('Subject');
            docList = docList + (docList == '' ? '' : '|') + docID;

            if (record.get('Subject')) {
                if (descList == '') {
                    descList = docDescription;
                }
                else {
                    descList = descList + '|' + docDescription;
                }
            }
            else {
                if (descList == '') {
                    descList = 'File' + docID;
                }
                else {
                    descList = descList + '|' + 'File' + docID;
                }
            }
        }

        if (docList != '') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'UCFTransactionId',
                    pcKeyValue: transactionID,
                    pcKeyAction: 'A',
                    pcDocIDList: docList,
                    pcDescrData: descList
                },
                saveAction, null);

            if (saveData.code != "0") {
                Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
            }
        }

        /* DELETE ATTACHMENT RECORD */
        for (iCnt in ucfimagestore.removed) {
            delDocList = delDocList + (delDocList == '' ? '' : '|') + ucfimagestore.removed[iCnt].data.DocumentID;
        }

        if (delDocList != '') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'UCFTransactionId',
                    pcKeyValue: transactionID,
                    pcKeyAction: 'D',
                    pcDocIDList: delDocList,
                    pcDescrData: ''
                },
                saveAction, null);

            if (saveData.code != "0") {
                Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
            }
        }
    },

    showAddAttachmentPopUp: function (button, event, myParam) {
        var view = this.getView(),
            winAddAttach = Ext.create('Ext.window.Window', {
                title: 'Add Attachment',
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
                        width: '100%',
                        height: '100%',
                        keyType: 'imagePBMUpload',
                        fileType: 'pdf',
                        endpoint: 'shared/rx/document/update'
                    }
                ]
            });

        view.add(winAddAttach);
        winAddAttach.show();
    },

    onUploadAttachment: function (arrayDocumentId) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            storeucfimage = vm.getStore('ucfimage'),
            panelFileUpload = view.down('#fileUploadGrid'),
            fileStore = panelFileUpload.getViewModel().getStore('fileStore');

        var newRecord = Ext.create('Atlas.common.model.UCFImage', {
            DocumentID: arrayDocumentId[arrayDocumentId.length - 1],
            Subject: fileStore.getAt(0).get('description'),
            fileName: '',
            InOut: '',
            RecieptDate: '',
            RecieptTime: '',
            AddlSystemID: ''
        });
        newRecord.dirty = true;
        fileStore.removeAll();
        storeucfimage.insert(storeucfimage.data.length, newRecord);
    }
});


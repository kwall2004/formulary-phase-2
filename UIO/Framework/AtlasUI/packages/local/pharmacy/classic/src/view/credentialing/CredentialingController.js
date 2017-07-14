/**
 * This class is the Main ViewController of the Pharmacy Credentialing Page
 * @author : Leo
 */

Ext.define('Atlas.pharmacy.view.credentialing.CredentialingController', {
    extend: 'Ext.app.ViewController',
    listen: {
        controller: {
            '*': {
                updatesendfaxdetail: 'funupdatesendfaxdetail'
            }
        }
    },
    init: function () {
        this.createListitems();
        if (this.getView().openView) {
            var record = this.getView().QueueRec;
            this.LoadPhamacyOrRelationShip();
            this.onSelectRelation('', record);
        }
    },
    LoadPhamacyOrRelationShip: function () {
        if (this.getView().openView) {
            var me = this;
            var combo = this.getView().lookupReference('pharmaSrchboxRef');
            var comboRid = this.getView().lookupReference('relationSrchboxRef');
            var record = this.getView().QueueRec;
            if (record.get('NCPDPId')) {
                combo.setVisible(true);
                comboRid.setVisible(false);
                this.getViewModel().set('isPharma', true);
                this.getViewModel().set('selCredType', 'NCPDPID');
            }
            else {
                combo.setVisible(false);
                comboRid.setVisible(true);
                this.getViewModel().set('isPharma', false);
                this.getViewModel().set('selCredType', 'RID');
            }
        }
    },
    attachFax: function (keyType, keyValue, docId, docDescription) {
        var vm = this.getViewModel();
        var setAttachment = Ext.create('Atlas.pharmacy.model.AttachmentList');
        setAttachment.phantom = false;
        setAttachment.save({
            params: {
                pcPlanID: 'HPM',
                pcKeyType: keyType,
                pcKeyValue: keyValue,
                pcKeyAction: 'A',
                pcDocIDList: docId,
                pcDescrData: docDescription
            },
            callback: function (record, operation, success) {
                if (success) {
                    var relCredKeyObj = {params: {pKeyType: keyType, pKeyValue: keyValue}};
                    vm.getStore('credfaxattachment').load(relCredKeyObj);
                }
            }
        });
    },

    doMissingInfoFaxQueue: function () {
        var me = this,
            win = Ext.create({
                xtype: 'pharmacy-CredFaxQueueWin',
                extraParams: {
                    windowType: 'Missing Info',
                    title: 'Missing Info Fax Queue'
                },
                autoShow: true
            });
        me.getView().add(win);
        win.show();
    },

    doFaxQueue: function () {
        var me = this,
            win = Ext.create({
                xtype: 'pharmacy-CredFaxQueueWin',
                extraParams: {
                    windowType: '',
                    title: 'Fax Queue'
                },
                autoShow: true
            });
        me.getView().add(win);
        win.show();
    },

    deleteAttachment: function (keyType, keyValue, docId) {
        var vm = this.getViewModel();
        var setAttachment = Ext.create('Atlas.pharmacy.model.AttachmentList');
        setAttachment.phantom = false;
        setAttachment.save({
            params: {
                pcPlanID: '',
                pcKeyType: keyType,
                pcKeyValue: keyValue,
                pcKeyAction: 'D',
                pcDocIDList: docId,
                pcDescrData: 'anything'
            },
            callback: function (record, operation, success) {
                if (success) {
                    var relCredKeyObj = {params: {pKeyType: keyType, pKeyValue: keyValue}};
                    vm.getStore('credfaxattachment').load(relCredKeyObj);
                }
            }
        });
    },

    getDocumentDetails: function (docID) {
        if (docID != '') {
            Atlas.common.utility.Utilities.viewDocument(docID);
        }
    },

    onUndoChangeClick: function (button) {
        button.up().getViewModel().data.record.reject();
        var me = this,
            isEnable = false,
            vm = me.getViewModel(),
            cklStore = vm.get('pharmcredchecklist');
        for (var i = 0; i < cklStore.data.items.length; i++) {
            if (cklStore.data.items[i].dirty == true) {
                if (cklStore.data.items[i].get('CompleteStatus') == 'Yes' && cklStore.data.items[i].get('CompleteDate') == null) {
                    isEnable = false;
                    return;
                }
                else {
                    isEnable = true;
                }
            }
        }
        if (isEnable == true) {
            me.getView().down("#btnchecklistsave").setDisabled(false);
        }
        else {
            me.getView().down("#btnchecklistsave").setDisabled(true);
        }
    },

    onEdit: function (editor, context) {
        if (context.record.dirty && context.record.crudState != 'C') {
            context.record.set('isNeedUpdate', true);
        }
    },

    createListitems: function () {
        var vm = this.getViewModel();
        vm.getStore('stateslist').load({params: {pListName: 'States'}});
        vm.getStore('credresultlist').load({params: {pListName: 'CredResult'}});
        vm.getStore('dispenserclasslist').load({params: {pListName: 'DispenserClass'}});
        vm.getStore('credtypelist').load({params: {pListName: 'CredType'}});
        vm.getStore('applicationtypelist').load({params: {pListName: 'ApplicationType'}});
        vm.getStore('trainingtypelist').load({params: {pListName: 'trainingType'}});
    },

    onToggleSearch: function (container, button) {
        this.switchToggleSearch(button.searchType);
    },

    switchToggleSearch: function (searchType) {
        var me = this,
            vm = me.getViewModel(),
            refs = this.getReferences(),
            isRID = (searchType == 'RID');
        me.getViewModel().set('selCredType', searchType);
        if (searchType === 'NCPDPID' && vm.get('hasNCPDPID') === true) {
            this.getViewModel().set('isPharma', true);
        }
        else {
            this.getViewModel().set('isPharma', false);
        }
        refs.relationSrchboxRef.setVisible(isRID);
        refs.pharmaSrchboxRef.setVisible(!isRID);
    },

    onSelectRelation: function (item, record) {
        var me = this,
            vm = me.getViewModel(),
            view = this.getView(),
            refs = me.getReferences();
        vm.set('canAddCredentialYear', true);

        if (record.get('ncpdpId') || record.get('NCPDPId')) {
            vm.set('hasNCPDPID', true);
            vm.set('hasRID', false);
            vm.set('relationshipLbl', 'NCPDP ID');
            this.getViewModel().set('isPharma', true);
            vm.set('selCredValue', record.get('ncpdpId') ? record.get('ncpdpId') : record.get('NCPDPId'));
            this.getView().down('#cbxRel').setValue('');
        }
        else {
            vm.set('hasNCPDPID', false);
            vm.set('hasRID', true);
            vm.set('relationshipLbl', 'Relationship ID');
            vm.set('selCredValue', record.get('relationshipID') ? record.get('relationshipID') : record.get('RelationshipId'));
            this.getView().down('#cbxPhar').setValue('');
        }

        var paramRelIdObj = {params: {prelationshipID: vm.get('selCredValue')}},
            relCredKeyObj = {pKeyType: vm.get('selCredType'), pKeyValue: vm.get('selCredValue')},
            pharmCredKeyObj = {
                params: {
                    pKeyType: vm.get('selCredType'),
                    pKeyValue: vm.get('selCredValue'),
                    pFieldList: "ncpdpid,name,locCity,locState,locAddress1,locAddress2,locZip,locCrossStreet,mailAddress1,mailCity,mailState,mailZip,locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactFax,contactExt,ContactEmail,legalBusinessName,primDispTypeCode,secDispTypeCode,tertDispTypeCode,dispClassCode,fedTaxId,systemID,locCloseDate"
                }
            },
            paramIPCKeyObj = {params: {ipcParent: vm.get('selCredType'), ipcParentKey: vm.get('selCredValue')}};
        refs.credGeneralInfoFormRef.reset();
        vm.getStore('credentailtodo').removeAll();
        vm.getStore('pharmcredchecklist').removeAll();

        if (vm.get('selCredType') == 'RID') {
            vm.getStore('relationshipmasterdata').load({
                scope: this,
                params: relCredKeyObj,

                failure: function (record, operation) {

                },
                success: function (record, operation) {

                },
                callback: function (recorddata, operation, success) {
                    var message = Ext.JSON.decode(operation._response.responseText).message[0];
                    if (me.getView.openView) {
                        var RelationShip = me.getView().down('#cbxRel').getStore();
                        var RelationShipStoreRec = {
                            relationshipID: record.data.RelationshipId,
                            name: record.data.Relname
                        };
                        RelationShip.add(RelationShipStoreRec);
                        me.getView().down('#cbxRel').setValue(record.data.NCPDPId);
                    }
                    if (message.code != 0) {
                        Ext.Msg.alert('Failed', message.message);
                        return;
                    }

                }
            });
            vm.getStore('pharmaciesbyrid').load(paramRelIdObj);
        } else {
            vm.getStore('pharmacymasterdata').getProxy().setExtraParam('pKeyType', vm.get('selCredType'));
            vm.getStore('pharmacymasterdata').getProxy().setExtraParam('pKeyValue', vm.get('selCredValue'));
            vm.getStore('pharmacymasterdata').getProxy().setExtraParam('pFieldList', "ncpdpid,name,locCity,locState,locAddress1,locAddress2,locZip,locCrossStreet,mailAddress1,mailCity,mailState,mailZip,locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactFax,contactExt,ContactEmail,legalBusinessName,primDispTypeCode,secDispTypeCode,tertDispTypeCode,dispClassCode,fedTaxId,systemID,locCloseDate");
            vm.getStore('pharmacymasterdata').load(
                {
                    success: function (record, operation) {

                    },
                    callback: function (recorddata, operation, success) {
                        if (me.getView().openView) {

                            var Pharmacy = me.getView().down('#cbxPhar').getStore();
                            var PharmacyStoreRec = {
                                ncpdpId: record.data.NCPDPId,
                                Name: record.data.PharmName
                            };
                            Pharmacy.add(PharmacyStoreRec);
                            me.getView().down('#cbxPhar').setValue(record.data.NCPDPId);
                        }
                    }
                }
            );
        }
        view.down('#btnSavePharInfo').setDisabled(false);
        vm.getStore('credfaxattachment').load({
            scope: this,
            params: relCredKeyObj
        });

        vm.getStore('pharmacredlogmaster').load({
            scope: this,
            params: relCredKeyObj
        });

        vm.getStore('pharmtraining').load({
            scope: this,
            params: relCredKeyObj
        });
        vm.getStore('contactinfotable').load(paramIPCKeyObj);
    },

    loadMainInfoForm: function (store, rec) {
        var me = this,
            vm = me.getViewModel(),
            pharmacyRelationship = vm.getStore('pharmacyrelationship'),
            form = me.lookupReference('mainInfoFormRef'),
            contractStatus = '',
            effDate = '',
            termDate = '',
            i = 0;

        if (rec.length == 0) {
            return
        }
        else {
            if (rec[0].get('RSSystemId')) {
                vm.set('keySystemID', (rec[0].get('RSSystemId')));
            }
            else {
                vm.set('keySystemID', (rec[0].get('systemID')));
            }

            if (vm.get('selCredType') == 'NCPDPID') {
                var ncpGridStore = vm.getStore('pharmaciesbyrid');
                ncpGridStore.loadData(rec);
                me.getLicenseInfoByNCPDPId(null, rec);
            }

            //required only for the forms , not for popups
            if (form) {
                if (rec && rec[0]) {
                    rec[0].data.RSphone = me.phoneFaxFormatter(rec[0].data.RSphone.toString(), 'PHONE');
                    rec[0].data.RSfaxNum = me.phoneFaxFormatter(rec[0].data.RSfaxNum.toString(), 'FAX');
                    if (rec[0].data.RSSystemId != undefined) {

                        me.getView().down('#pnlDescription').setTitle('<div class="mPharmContract">RELATIONSHIP - ' + rec[0].data.RSname + '</div>');
                    }

                    else {
                        me.getView().down('#pnlDescription').setTitle('<div class="mPharmContract">PHARMACY - ' + rec[0].data.name + '</div>');
                    }

                    form.reset();
                    form.loadRecord(rec[0]);
                    var searchParams = '';
                    if( vm.get('selCredType') === 'RID')
                    {
                        searchParams =  Ext.String.format("{0}='{1}'", vm.get('selCredType'), vm.get('selCredValue'));

                    }
                    else
                    {
                        searchParams =  Ext.String.format("{0}='{1}'", vm.get('selCredType'), vm.get('selCredValue'));
                    }

                    vm.set('contract', {});
                    pharmacyRelationship.load({
                        params: {
                            pWhere: Ext.String.format("{0}='{1}'", vm.get('selCredType'), vm.get('selCredValue')),
                            pKeyType: vm.get('selCredType')
                        },
                        callback: function (items, operation) {
                            pharmacyRelationship.filter(new Ext.util.Filter({
                                filterFn: function (item) {
                                    // return item.ContractStatus === 'Active' && (item.Excluded === '' ||item.Excluded === null) && (item.RLTermDate==='' || item.RLTermDate === null) ;
                                    //Simplified according to JavaScript language rules
                                    //Note: RLTermDate does not exist in payload?
                                    return item.get('contractStatus') === 'Active' && !item.get('Excluded') && !item.get('RLTermDate');
                                }
                            }));
                            var records = pharmacyRelationship.data.items;

                            if (pharmacyRelationship.data.items.length == 0) {
                                contractStatus = 'No Active Contract';
                            }

                            for (; i < records.length; i++) {
                                // Logic:
                                // Again RLEffectiveDate is not on the model!
                                // if (TermDate && term date >= today) and (EffectiveDate <= today) and (RLEffectiveDate<=today)
                                if (records[i].get('Termdate')==''?null:records[i].get('Termdate') >= Atlas.common.utility.Utilities.getLocalDateTime()  &&
                                    records[i].get('EffectiveDate')==''?null:records[i].get('EffectiveDate') <= Atlas.common.utility.Utilities.getLocalDateTime()  &&
                                    records[i].get('RLEffectiveDate')==''?null:records[i].get('RLEffectiveDate') <= Atlas.common.utility.Utilities.getLocalDateTime() ) {
                                    contractStatus = 'In Network Active';
                                    if (records[i].get('EffectiveDate') > records[i].get('RLEffectiveDate')) {
                                        effDate = me.changeDateFormat(records[i].get('EffectiveDate'));
                                    }
                                    else{
                                        effDate = me.changeDateFormat(records[i].get('RLEffectiveDate'));
                                    }

                                    if (records[i].get('TermDate') != null && records[i].get('TermDate') != '') {
                                        termDate = me.changeDateFormat(records[i].get('TermDate'));
                                    }
                                    else {
                                        termDate = '';
                                    }

                                    // Contract status -> Contracts build line
                                    // model is defined without Atlas, because it's part of the chema and can be skipped (schema is defined in Base model)
                                    Ext.create('Ext.data.Store', {model: 'pharmacy.model.PricingMasterData'}).load({
                                        params: {
                                            ParentSystemId: records[i].get('SystemId')
                                        },
                                        callback: function (pricingrecords) {
                                            var arr = vm.get('contract.contracts') || [],
                                                len = pricingrecords.length,
                                                j = 0,
                                                data;

                                            for (; j < len; j++) {
                                                data = pricingrecords[j].data;
                                                arr.push(data['LOB'] + ' ' + data['FulfillmentType']);
                                            }

                                            vm.set('contract.contracts', arr);
                                            me.onPricingStoreLoad();
                                        }
                                    });
                                }
                            }
                            me.getView().down('#txtContractStatus').setValue(contractStatus);
                        }
                    });
                } else {
                    form.reset();
                    Ext.toast("No Data Found");
                }
            }
        }
    },

    phoneFaxFormatter: function (number, formatType) {
        var formattedNumber = number.toUpperCase() == "ERROR" ? '' : number;
        number = number.replace("/[-)(\s]/", ""); //Regex.Replace(number, @"[-)(\s]", string.Empty);

        if (number.length == 10) {
            if (formatType.toUpperCase() == "PHONE") {
                formattedNumber = '(' + number.substring(0, 3) + ')-' + number.substring(3, 6) + '-' + number.substring(6, 10);
            }
            else {
                formattedNumber = number.substring(0, 3) + '-' + number.substring(3, 6) + '-' + number.substring(6, 10);
            }
        }
        return formattedNumber == '0' ? '' : formattedNumber;
    },

    loadContactInfo: function (store, records) {
        for (var i = 1; i < 6; i++) {
            this.lookupReference('contactType' + i).reset();
        }

        for (var i = 0, recLen = records.length; i < recLen; i++) {
            var contactRec = records[i],
                contactType = 'contactType' + contactRec.get('contactType'),
                contactObj = this.lookupReference(contactType);

            contactObj && contactObj.getForm().loadRecord(contactRec);
        }

    },

    loadPharmaTraining: function (store, record) {
        var trainingForm = this.lookupReference('pharmaTrainingFormref');
        trainingForm.reset();
        if (record.length > 0) {
            trainingForm.loadRecord(record[0]);
        } else {
            Ext.isObject(record) && trainingForm.loadRecord(record);
        }

    },

    onPharmaciesByRIDLoad: function (store, records) {
        var view = this.getView();
        if (records && records.length > 0) {
            this.lookupReference('includedPharmaciesGridRef').getSelectionModel().select(0);
            this.getLicenseInfoByNCPDPId(store, records);
            view.down('#btnSavePharInfo').setDisabled(false);
        }
        else {
            view.down('#btnSavePharInfo').setDisabled(true);
        }
    },

    getLicenseInfoByNCPDPId: function (store, record) {
        if (record.length == 0) return;
        if (record.length > 0) {
            record = record[0];
        }
        if (record.get('ncpdpId')) {
            this.getViewModel().set('pNCPDPId', record.get('ncpdpId'));
        }
        var paramNcpIdObj = {params: {pNCPDPId: record.get('ncpdpId')}};
        this.getViewModel().getStore('pharmacylicinfo').load(paramNcpIdObj);
    },

    onPharmaCredMasterLoad: function (store, records) {
        var arr = [],
            vm = this.getViewModel(),
            refs = this.getReferences();
        if (records.length > 0) {
            vm.set('hasNCPDPID', true);  //
            records.forEach(function (item) {
                if (item.get('CredLogID') != -1) {
                    arr.push(item);
                }
            });
            vm.getStore('pharmacredlogmaster').loadData(arr);
            this.lookupReference('pharmaCredLogGridRef').getSelectionModel().select(0);
            this.onCredLogRowClick(null, records[0]);
        }
        else {
            refs.credGeneralInfoFormRef.reset();
            vm.getStore('credentailtodo').removeAll();
            vm.getStore('pharmcredchecklist').removeAll();
            vm.set('hasNCPDPID', false);
            vm.set('hasRID', false);
            vm.set('canSendMissingLetter', false);
        }
    },

    loadLicenseInfoByNCPDPId: function (store, record, evnts, opts) {
        var me = this,
            refs = me.getReferences(),
            vm = me.getViewModel(),
            res = opts.getResponse(),
            resObj = Ext.decode(res.responseText),
            data = resObj.metadata;

        var ttFederalTaxIDHistory = data.ttFederalTaxIDHistory.ttFederalTaxIDHistory;
        var ttStateLicenseNCPDPHistory = data.ttStateLicenseNCPDPHistory.ttStateLicenseNCPDPHistory;

        me.loadDataToGridandForm(refs.picLicInfoGridRef, vm.getStore('pharmacylicinfo'), refs.picLicInforFormRef, record);
        if (data.ttDEALicenseHistory.ttDEALicenseHistory.length == 0) {
            var paramNcpIdObj = {
                params: {
                    pKeyType: 'NCPDPID',
                    pKeyValue: opts._params.pNCPDPId,
                    pFieldList: 'deaId,deaExpirationDate,@NTISActivity'
                }
            };
            vm.getStore('pharmacyMasterData').load({
                scope: this,
                params: paramNcpIdObj.params,
                callback: function () {
                    me.loadMasterPharmacyDataToForm(vm.getStore('dealicensehistory'), refs.deaLicFormRef, vm.getStore('pharmacyMasterData').data.items);
                }
            });
        }
        else {
            me.loadDataToGridandForm(refs.deaLicGridRef, vm.getStore('dealicensehistory'), refs.deaLicFormRef, data.ttDEALicenseHistory.ttDEALicenseHistory);
        }
        if (vm.get('selCredType') == 'RID' && data.ttINSLicenseHistory.ttINSLicenseHistory.length > 0) {
            refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenLicenseHistoryApply').setValue(true);
            refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenIsApplyAll').setValue(true);
        }
        else {
            refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenLicenseHistoryApply').setValue(false);
            refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenIsApplyAll').setValue(false);
        }

        if (vm.get('selCredType') == 'RID' && data.ttPharmacyInfo.ttPharmacyInfo.length > 0) {
            refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenPharmacyInfoTable').setValue(true);
            refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenIsApplyAll').setValue(true);
        }
        else {
            refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenPharmacyInfoTable').setValue(false);
            refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenIsApplyAll').setValue(false);
        }

        if (vm.get('selCredType') == 'RID' && vm.get('activeTab') == 'pharmacy-inslicense' && data.ttINSLicenseHistory.ttINSLicenseHistory.length > 0) {
            vm.set('hasApplyAll', false);
        }
        else if (vm.get('selCredType') == 'RID' && vm.get('activeTab') == 'pharmacy-pharmacyandpatient' && data.ttPharmacyInfo.ttPharmacyInfo.length > 0) {
            vm.set('hasApplyAll', false);
        }
        else {
            vm.set('hasApplyAll', true);
        }

        me.loadDataToGridandForm(refs.insLicInfoGridRef, vm.getStore('inslicensehistory'), refs.insLicInfoFormRef, data.ttINSLicenseHistory.ttINSLicenseHistory);
        me.loadDataToGridandForm(refs.stateLicInfoGridRef, vm.getStore('statelicensepbminfo'), null, data.ttStateLicensePBMShow.ttStateLicensePBMShow);
        me.loadDataToGridandForm(refs.stateLicHistGridRef, vm.getStore('statelicensepbmhistory'), null, data.ttStateLicensePBMHistory.ttStateLicensePBMHistory);
        me.loadDataToGridandForm(null, vm.getStore('pharmntisinfo'), refs.ntisInfoFormRef, data.ttPharmNTISInfo.ttPharmNTISInfo);
        me.loadDataToGridandForm(null, vm.getStore('pharmacyandpatientinfo'), refs.pharmacyAndPatientFormRef, data.ttPharmacyInfo.ttPharmacyInfo);
        vm.getStore('statelicensencpdphistory').loadData(ttStateLicenseNCPDPHistory);
        vm.getStore('federaltaxidhistory').loadData(ttFederalTaxIDHistory);

        var firstRowofStLicInfo = vm.getStore('statelicensepbminfo').getData().items[0];
        var staLicHistStore = vm.getStore('statelicensepbmhistory');

        var tempstaLicHistStore = [];
        for (var idx2 = 0, length2 = staLicHistStore.data.length; idx2 < length2; idx2++) {
            if (staLicHistStore.data.items[idx2].data.LicenseStateCode == firstRowofStLicInfo.data.LicenseStateCode) {
                tempstaLicHistStore.push(staLicHistStore.data.items[idx2])
            }
        }
        vm.getStore('statelicensepbmhistoryTemp').removeAll();
        vm.getStore('statelicensepbmhistoryTemp').loadData(tempstaLicHistStore);
    },


    loadMasterPharmacyDataToForm: function (store, form, dataObj) {
        store.removeAll();
        form && form.reset();
        var formDea = this.getReferences().deaLicFormRef.getForm();
        formDea.findField('NCPDPDEAId').setValue(dataObj[0].get('deaId').toString());
        formDea.findField('DEAExpDateNCPDP').setValue(new Date(Date.parse(dataObj[0].get('deaExpirationDate'), 'Y-m-d')));
        formDea.findField('NTISActivity').setValue(dataObj[0].get('@NTISActivity'));
    },

    loadDataToGridandForm: function (grid, store, form, record) {
        store.removeAll();
        form && form.reset();
        store.loadData(record);
        if (store.getData().items.length > 0) {
            form && form.getForm().loadRecord(store.getData().items[0]);
            grid && grid.getSelectionModel().select(0);
        }
    },

    stateLicInfoClick: function (store, rec) {
        var vm = this.getViewModel();
        var staLicHistStore = vm.getStore('statelicensepbmhistory');
        var tempstaLicHistStore = [];
        for (var idx2 = 0, length2 = staLicHistStore.data.length; idx2 < length2; idx2++) {
            if (staLicHistStore.data.items[idx2].data.LicenseStateCode == rec.data.LicenseStateCode) {
                tempstaLicHistStore.push(staLicHistStore.data.items[idx2])
            }
        }
        if (tempstaLicHistStore.length == 0) {
            tempstaLicHistStore.push(rec);
        }
        var store = vm.getStore('statelicensepbmhistoryTemp');
        store.data.clear();
        vm.getStore('statelicensepbmhistoryTemp').loadData(tempstaLicHistStore);
    },

    updateGrid: function (picLicInfoGridRef) {
        this.lookupReference('picLicInfoGridRef').getSelectionModel().select(0);
    },

    onCredLogItemClick: function (selModel, record, rowIndex) {
        var me = this;
        if (selModel.selected.length == 1 && (me.getViewModel().get('selCredLogId') != record.get('CredLogID'))) {
            Ext.Msg.confirm('Confirm', 'Are you sure you want to change your credential log selection?', function (btn) {
                if (btn == 'yes') {
                    me.onCredLogRowClick(selModel, record, rowIndex);
                } else {
                    var gridPharmaCredLog = me.getView().down('#pharmaCredLogGrid'),
                        origSelectedRec = gridPharmaCredLog.getStore().findRecord('CredLogID', me.getViewModel().get('selCredLogId'));
                    gridPharmaCredLog.setSelection(origSelectedRec);
                }
            }, me);
        }
    },

    onCredLogRowClick: function (item, record) {
        var me = this,
            vm = me.getViewModel(),
            credToDoStore = vm.getStore('credentailtodo'),
            credChkListStore = vm.getStore('pharmcredchecklist'),
            credToDoParams = credToDoStore.getModel().getProxy().getExtraParams(),
            credChkListParams = credChkListStore.getModel().getProxy().getExtraParams();
        vm.set('selCredLogId', record.get('CredLogID'));
        vm.set('selCredData', record);

        credToDoParams.pCredLogId = vm.get('selCredLogId');
        credChkListParams.pCredLogID = vm.get('selCredLogId');
        credChkListParams.pTaskID = 2; //vm.get('ApplicationSource'); ToDO
        credToDoStore.load();
        credChkListStore.load({
            scope: this,
            callback: function (record, operation) {
                var objRespCredChkList = Ext.decode(operation.getResponse().responseText);
                objRespCredChkList.data.forEach(function (item) {
                    item.isNeedUpdate = false;
                });
                me.getView().down("#btnchecklistsave").setDisabled(true);
                vm.set('canSendMissingLetter', credChkListStore.findRecord('CompleteStatus', 'No'));
            }
        });

        var genInfoForm = me.lookupReference('credGeneralInfoFormRef');
        genInfoForm.loadRecord(record);
        vm.set('sendfaxobject', record);
        me.enableCredentialingDetailForm(record);
    },

    showCredDetailCredLettersWin: function () {
        var me = this,
            vm = this.getViewModel();

        var credLettersParams = {
            KeyType: vm.get('selCredType'),
            KeyValue: vm.get('selCredValue'),
            CredLogID: vm.get('selCredLogId'),
            KeySystemID: vm.get('keySystemID'),
            SelectedCredLogRecord: vm.get('sendfaxobject'),
            FaxNumber: me.getView().down('#displayFax').getValue(),
            CredType: me.getView().down('#cbxCredType').getRawValue()
        };

        var win = Ext.create({
            xtype: 'widget.pharmacy-credentialingdetail-letters-win',
            extraParams: {
                'pCredLettersParams': credLettersParams
            }
        });
        win.show(this);
    },

    onPharmacyClick: function () {
        var me = this, vm = me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy'), id = vm.get('selCredValue');
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        me.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
            atlasId: id,
            ncpdpId: id,
            menuId: menuId
        }, null);
    },

    onRelationshipsClick: function () {
        var me = this, vm = me.getViewModel();
        var relationshipsWindow = Ext.create('Atlas.pharmacy.view.credentialing.popups.Relationships');
        me.getView().add(relationshipsWindow);
        relationshipsWindow.show();
        vm.get('relationshipPopupData').load({
            params: {
                pKeyType: vm.get('selCredType'),
                pKeyValue: vm.get('selCredValue')
            }
        });
    },

    doSendMissingLetter: function () {
        var me = this;
        var record = this.getViewModel().get('sendfaxobject');
        var para = "";
        if(this.getViewModel().get('isPharma'))
            para = "NCPDPID";
        else
            para = "RID";

        var paramsendfax = {
            MissInfoDocId: record.data.MissInfoDocId,
            MissInfoLtrId: record.data.MissInfoLtrId,
            ExceedTimeDocId: record.data.ExceedTimeDocId,
            ExceedTimeLtrId: record.data.ExceedTimeLtrId,
            CredSystemId: record.data.systemID,
            faxnumber: me.lookupReference('mainInfoFormRef').getRecord().data.RSfaxNum,
            KeyType: para,
            KeyValue: me.lookupReference('mainInfoFormRef').getRecord().data.RSrelationshipID
        };

        var win = Ext.create({
            xtype: 'pharmacy-checklist-sendmissingletter-win',
            extraParams: {
                'pRecord': paramsendfax
            }
        });
        win.show(this);
    },

    showCredAddAttachmentPopUp: function () {
        var vm = this.getViewModel();
        var mpuPopUp = new Atlas.common.view.sharedviews.windows.CredAttachmentPopUp({
            itemConfig: {
                tgtPlanId: '',
                tgtKeyType: 'PharmParentSystemId',
                tgtKeyValue: vm.data.srchJobGroupExtMdl.data.systemID,
                tgtAttachFile: true
            }
        });
        mpuPopUp.show();
    },

    doShowNcpdpSoueceData: function () {
        var ncpdpWin = Ext.create('Atlas.pharmacy.view.credentialing.popups.NcpdpSourceData');
        this.getView().add(ncpdpWin);
        var NcpdpSourceDataStore = this.getViewModel().getStore('statelicensencpdphistory');
        // Selected NCPDPID FROM GRID
        var selected_ncpdpId = this.getView().lookupReference('includedPharmaciesGridRef').selection.get('ncpdpId');
        var localList = [];
        NcpdpSourceDataStore.data.items.forEach(function (item) {
            item.data.ncpdipid = selected_ncpdpId;
            localList.push(item);
        });
        NcpdpSourceDataStore.loadData(localList);
        ncpdpWin.show();
    },

    gaction: '',
    doAddStateLicense: function () {
        var stateLicWin = Ext.create('Atlas.pharmacy.view.credentialing.popups.StateLicenseAddWin');
        var rec = Ext.create('Atlas.pharmacy.model.StateLicensePBMHistory');
        this.gaction = 'Add';
        var form = stateLicWin.down('form');
        form.loadRecord(rec);
        this.getView().add(stateLicWin);
        var cbStateCode = this.lookupReference('cbStateCode');
        cbStateCode.setDisabled(false);
        stateLicWin.show();

    },

    stateLicInfoDblclick: function (dv, record) {
        var stateLicWin = Ext.create('Atlas.pharmacy.view.credentialing.popups.StateLicenseAddWin');
        this.gaction = 'Update';
        record.data.action = "Update";
        var form = stateLicWin.down('form');
        form.loadRecord(record);
        this.getView().add(stateLicWin);
        var cbStateCode = this.lookupReference('cbStateCode');
        cbStateCode.setDisabled(true);
        stateLicWin.show();
    },

    gdchecklist_beforeedit: function (editor, metaData) {
        if (this.checkListDisability(metaData)) {
            return false;
        }
    },

    gdchecklist_afteredit: function (editor, metaData) {
        var me = this;

        if (metaData.record.data.CompleteDate == null && metaData.record.data.CompleteStatus == "Yes") {
            Ext.Msg.alert('Error', 'Please insert complete date.');
            me.getView().down("#btnchecklistsave").setDisabled(true);
            metaData.record.set('isNeedUpdate', true);
            return false;
        }
        else
            me.getView().down("#btnchecklistsave").setDisabled(false);

    },

    funupdatesendfaxdetail: function () {
        // alert('hi');
        //todo reload pharmacy cred log grid
    },

    columnsubtaskrender: function (val, metaData) {
        var values = val;
        if (this.checkListDisability(metaData)) {
            metaData.tdStyle = 'background-color: #CCC';
            metaData.tdCls = '.x-item-disabled';
        }
        return values;
    },

    columnsubtaskdatetimerender: function (val, metaData) {
        var values = '';
        if (val)
            values = Ext.Date.format(new Date(val), 'm/d/Y');

        if (this.checkListDisability(metaData)) {
            metaData.tdStyle = 'background-color: #CCC';
        }
        return values;
    },

    checkListDisability: function (metaData) {
        if (metaData.record == undefined) {
            return false;
        }
        else {
            var me = this,
                form = me.lookupReference('credGeneralInfoFormRef'),
                vm = me.getViewModel(),
                record = form.getRecord();

            var isexistdata = false;
            var storecredtype = vm.getStore("credtypelist");
            var existval = storecredtype.findRecord('value', record.get("CredType"));

            metaData.record.data.CredTypeDisable.split(',').forEach(function (val) {
                if (val == existval.data.name)
                    isexistdata = true;
            });

            return isexistdata;
        }
    },

    grdPharmTrngRowClick: function (grid, selctedRow) {
        var trainingForm = this.lookupReference('pharmaTrainingFormref');
        trainingForm.reset();
        trainingForm.loadRecord(selctedRow);
        this.lookupReference('btnSaveRef').setDisabled(selctedRow.data.source != 'PBM');
        this.lookupReference('btnCanRef').setDisabled(selctedRow.data.source != 'PBM');
        trainingForm.query('.field, .button').forEach(function (c) {
            c.setDisabled(selctedRow.data.source != 'PBM');
        });
    },

    formatPhoneNumber: function (control) {
        var i;
        var returnString = '';
        var s = control.getValue();
        if (s.charAt(0) == '+') {
            return false;
        }
        var filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'';

        /* Search through string and append to unfiltered values
         to returnString. */
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if ((filteredValues.indexOf(c) == -1) && (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += '-';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }
        control.setValue(returnString);

        return false;
    },

    enableCredentialingDetailForm: function (record) {
        var me = this;

        me.getView().down('#cbxCredType').setDisabled(record);
        me.getView().down('#cbxApplicationType').setDisabled(record);
        me.getView().down('#dtCreateDate').setDisabled(record);
        me.getView().down('#dtCompleteDate').setDisabled(record);
        me.getView().down('#cbxCredResult').setDisabled(record);
        me.getView().down('#dtExpectedReCredDate').setDisabled(record);
        me.getView().down('#dtReCredFileReceivedDate').setDisabled(record);
        me.getView().down('#txtComments').setDisabled(record);
        me.getView().down('#btSaveCredentialInfo').setDisabled(record);
        me.getView().down('#btCancelContractInfo').setDisabled(record);

        if (record && record.data.CredCompleteDate && record.data.CredCompleteDate != '') {
            me.getView().down('#btSaveCredentialInfo').setDisabled(true);
            me.getView().down('#btCancelContractInfo').setDisabled(true);
        }
        else if (record) {
            me.getView().down('#cbxCredType').setDisabled(false);
            me.getView().down('#cbxApplicationType').setDisabled(false);
            me.getView().down('#dtCreateDate').setDisabled(false);
            me.getView().down('#dtCompleteDate').setDisabled(false);
            me.getView().down('#cbxCredResult').setDisabled(false);
            me.getView().down('#dtExpectedReCredDate').setDisabled(false);
            me.getView().down('#txtComments').setDisabled(false);
            me.getView().down('#btSaveCredentialInfo').setDisabled(false);
            me.getView().down('#btCancelContractInfo').setDisabled(false);
        }

        if (record && record.data.expectedReCredDate && record.data.expectedReCredDate != '') {
            me.getView().down('#dtReCredFileReceivedDate').setDisabled(false);
            me.getView().down('#btSaveCredentialInfo').setDisabled(false);
            me.getView().down('#btCancelContractInfo').setDisabled(false);
        }
    },

    onSendFax: function () {

    },

    getFederalTaxHistory: function () {
        var storeFederalTaxHistory = this.getViewModel().getStore('federaltaxidhistory');
        var win = Ext.create({
            xtype: 'widget.pharmacy-federaltaxhistory-win',
            extraParams: {
                'storeFederalTaxHistory': storeFederalTaxHistory
            }
        });
        win.show(this);
    },

    gdToDolist_beforeedit: function (editor, metaData) {

        if (this.checkToDoListDisability(metaData)) {
            return false;
        }
    },
    columnToDorender: function (val, metaData) {
        var values = val;
        if (this.checkToDoListDisability(metaData)) {
            metaData.tdStyle = 'background-color: #CCC';
        }
        if (metaData.cellIndex == '1') {
            if (val) {
                var arr = val.split('-');
                //values = arr[1] + '/' + arr[2] + '/' + arr[0]; //Ext.Date.format(new Date(val), 'm/d/Y');
                values = Ext.Date.format(new Date(val), 'm/d/Y');
            }
        }
        return values;
    },
    checkToDoListDisability: function (metaData) {
        var me = this,
            form = me.lookupReference('credGeneralInfoFormRef'),
            vm = me.getViewModel(),
            record = form.getRecord();

        var isexistdata = false;
        var storecredtype = vm.getStore("credtypelist");
        var existval = storecredtype.findRecord('value', record.get("CredType"));

        metaData.record.data.CredTypeDisable.split(',').forEach(function (val) {
            if (val == existval.data.name)
                isexistdata = true;
        });

        return isexistdata;
    },

    BlurDtCompletedDate: function (Control) {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('pharmaCredTodoGridRef'),
            record = grid.actionables[0].activeRecord,
            saveData,
            trgStore = vm.getStore('credentailtodo'),
            trgStoreTemp = vm.getStore('credentailtodo');

        record.data.completeDate = Ext.Date.format(new Date(Control.rawDate), 'Y-m-d');
        if(!isNaN(Date.parse(record.data.completeDate))) {
            record.data.userName = Atlas.user.un;
            record.crudState = 'U';
            record.dirty = true;

            var saveAction = [{
                "Create": {"key": 'Action', "value": 'Add'},
                "Update": {"key": 'Action', "value": 'Update'},
                "Delete": {"key": 'Action', "value": 'Delete'}
            }];
            saveData = Atlas.common.utility.Utilities.saveData(
                [trgStore],
                'pharmacy/rx/pharmcredtodo/update',
                'ttpharmCredToDo',
                [true],
                {},
                saveAction,
                null
            );

            if (saveData.code == 0) {
                trgStore.reload();

            } else {
                trgStoreTemp.reload();
                Ext.MessageBox.alert('Pharmacy - Credentialing ToDo Detail', saveData.message, this.showResult, this);
            }
        }


    },

    onPharInfoTabChange: function (src) {
        var me = this,
            vm = this.getViewModel(),
            clickedTab = src.tabBar.tabPanel.activeTab.xtype;
        vm.set('activeTab', clickedTab);
        me.btnEnableDisable(clickedTab);
    },

    btnEnableDisable: function (activeTab) {
        var me = this,
            refs = me.getReferences(),
            vm = me.getViewModel();
        switch (activeTab) {
            case 'pharmacy-piclicense':
                vm.set('hasApplyAll', true);
                break;
            case 'pharmacy-dealicense':
                vm.set('hasApplyAll', true);
                break;
            case 'pharmacy-inslicense':
                if (refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenIsApplyAll').getValue() == 'true' && refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenLicenseHistoryApply').getValue() == 'true') {
                    vm.set('hasApplyAll', false);
                }
                else {
                    vm.set('hasApplyAll', true);
                }
                break;
            case 'pharmacy-statelicense':
                vm.set('hasApplyAll', true);
                break;
            case 'pharmacy-pharmacyandpatient':
                if (refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenIsApplyAll').getValue() == 'true' && refs.hdnPnlPharmacyInfoMainRef.getForm().findField('hiddenPharmacyInfoTable').getValue() == 'true') {
                    vm.set('hasApplyAll', false);
                }
                else {
                    vm.set('hasApplyAll', true);
                }
                break;
        }
    },

    credHomeTabPnlRef_tabchange: function (tabPanel, tab) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel();
        if (view) {
            if (tab.itemId == 'pharmacyInformation') {
                Ext.defer(function () {
                    me.lookupReference('includedPharmaciesGridRef').getSelectionModel().select(0);
                }, 300);
            }
            else if (tab.itemId == 'pharmacyAttachments') {
                var relCredKeyObj = {pKeyType: vm.get('selCredType'), pKeyValue: vm.get('selCredValue')};
                vm.getStore('credfaxattachment').load({
                    scope: this,
                    params: relCredKeyObj
                });
            }
        }
    },
    onPricingStoreLoad: function () {
        var me = this;
        --me.pendingChainedLoads;

        //All chained stores loaded - we can use the data
        if (!me.pendingChainedLoads) {
            me.showContracts();
        }
    },

    showContracts: function () {
        var contract = this.getViewModel().get('contract'),
            arr = contract.contracts,
            view = this.getView();

        //Filter out dupes
        arr = arr.filter(function (element, index, array) {
            return element in this ? false : this[element] = true;
        }, {});

        //view.down('#contracts').unmask();
        /*view.getForm().setValues({
            _contractStatus: contract.contractStatus,
            _effectiveDate: contract.effectiveDate,
            _termDate: contract.termDate,
            _contracts: contract.contracts.join(', ') // contracts is an array
        });*/
    },
    changeDateFormat : function (dateStr) {
        var d = Ext.Date;
        if(dateStr){
            return d.format(dateStr, 'm/d/Y');}
        else{
            return '';
        }
    }
});
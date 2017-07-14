/**
 * Created by rsalekin on 11/8/2016.
 */


Ext.define('Atlas.pharmacy.view.ContractsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contracts',

    listen: {
        controller: {
            '*': {
                changeDispenser: 'chkDischargeNotification_Change',
                disableEFT: 'disableEFTFlag',
                contractInfo: 'getContractInfo'
            }
        }
    },
    winContractsDetail: {},
    winContractFileUploader: {},
    lobDetails: {},
    dispenserDetail: {},
    loadContractDetail: {},
    PharmcontractInfo: {},

    initViewModel: function () {

    },

    init: function () {
        var view = this.getView();
        var modelList = Ext.create('Atlas.pharmacy.model.ListItems');
        modelList.getProxy().setExtraParam('pListName', 'LineOfBusiness');
        modelList.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (recordLOB, operationLOB, successLOB) {
                if (successLOB) {
                    var objRespLineOfBusiness = Ext.decode(operationLOB.getResponse().responseText);
                    var modelList = Ext.create('Atlas.pharmacy.model.ListItems');
                    modelList.getProxy().setExtraParam('pListName', 'DispenserType');
                    modelList.load({
                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (recordDT, operationDT, successDT) {
                            if (successDT) {
                                var objRespDispenserType = Ext.decode(operationDT.getResponse().responseText);
                                objRespLineOfBusiness.data.forEach(function (itemLOB, countLOB) {
                                    lobDetails = itemLOB;
                                    var fieldLOB = Ext.create('Ext.form.FieldSet', {
                                        itemId: itemLOB.name.replace('-', ''),
                                        reference: itemLOB.name.replace('-', ''),
                                        title: itemLOB.name,
                                        width: '100%',
                                        defaults: {
                                            labelWidth: 150,
                                            flex: 1
                                        },
                                        collapsible: true,
                                        collapsed: true
                                    });

                                    var fieldChkGroup = Ext.create('Ext.form.CheckboxGroup', {
                                        columns: 3
                                    });

                                    objRespDispenserType.data.forEach(function (itemDT, countDT) {
                                        var lobId = lobDetails.value.replace('-', '');
                                        var lobName = lobDetails.name.replace('-', '');
                                        var tempObj = Ext.create('Ext.form.Checkbox', {
                                            name: itemDT.value + lobName.replace('-', ''),
                                            boxLabel: itemDT.name,
                                            FulfillmentTypeVal: itemDT.value,
                                            listeners: {
                                                change: function (control, checked) {
                                                    //control.disable();
                                                    var controller = Ext.create('Atlas.pharmacy.view.ContractsController');
                                                    controller.fireEvent('changeDispenser', checked, lobId, lobName, control.name, control.boxLabel, control.FulfillmentTypeVal);
                                                }
                                            }
                                        });
                                        fieldChkGroup.items.add(tempObj);
                                    });
                                    fieldLOB.add(fieldChkGroup);
                                    view.down('#pnlCompensation').add(fieldLOB);
                                });
                            }
                        }
                    });

                }
            }
        });
    },

    onSearchTypeToggle: function (seg, button) {
        var view = this.getView();

        if (button.action == "relationshipId") {
            view.down('#cbxRel').show();
            view.down('#cbxPhar').hide();
            button.action == 'pharmacy';
            view.down('#viewPhar').setDisabled(true);

        } else {
            view.down('#cbxPhar').show();
            view.down('#cbxRel').hide();
            button.action == 'relationshipId';
            if (view.down('#hiddenType').getValue() && view.down('#hiddenType').getValue() === 'NCPDPID') {
                view.down('#viewPhar').setDisabled(false);
            }
            else {
                view.down('#viewPhar').setDisabled(true);
            }
        }
    },

    /**
     * View Pharmacy Details
     */
    onPharmacyClick: function () {
        var me = this, vm = me.getViewModel(), view = this.getView();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy'), id = view.down('#cbxPhar').getValue();
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        if (view.down('#cbxPhar').displayTplData) {
            if (view.down('#cbxPhar').displayTplData.length > 0) {
                me.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
                    atlasId: id,
                    ncpdpId: id,
                    menuId: menuId
                }, null);
            }
        } else {
            view.down('#cbxPhar').setValue('');
        }
    },

    chkDischargeNotification_Change: function (checked, lobId, lobName, chkId, chkName, FulfillmentTypeVal) {
        var view = this.getView();
        if (view) {
            var tabPanel = view.down('#tabPanelPharmacyContracts');
            var contractSystemID = view.down('#hiddenContractSystemID').getValue();
            var contractID = view.down('#hiddenContractID').getValue();
            if (checked) {
                var addIndex = tabPanel.items.length;
                tabPanel.insert(addIndex, {
                    xtype: Ext.create({
                        xtype: 'pharmacy-contractpricing',
                        itemId: (lobName + chkName).replace(/[^a-zA-Z0-9]/g, ''),
                        FulfillmentTypeVal: FulfillmentTypeVal,
                        LOBVal: lobId,
                        LOB: lobName,
                        FulfillmentType: chkName,
                        PriceId: 0,
                        ParentSystemID: contractSystemID,
                        ContractID: contractID,
                        LoadContractDetail: this.loadContractDetail,
                        extraParams: {
                            'FulfillmentTypeVal': FulfillmentTypeVal,
                            'LOBVal': lobId,
                            'LOB': lobName,
                            'FulfillmentType': chkName,
                            'PriceId': 0,
                            'ParentSystemID': contractSystemID,
                            'ContractID': contractID,
                            'LoadContractDetail': this.loadContractDetail
                        },
                        title: lobName + '-' + chkName
                    }),
                    closable: false
                });
            }
            else {
                //view.down('#' + lobName).collapse();
                view.down('#pnlCompensation').getForm().findField(chkId).setDisabled(false);
                var tab = tabPanel.getComponent((lobName + chkName).replace(/[^a-zA-Z0-9]/g, ''));
                tabPanel.remove(tab);
            }
        }
    },

    btnViewDetail_Click: function (btn, text) {
        this.getView().down('#btCancelContractInfo').setDisabled(true);
        if (winContractsDetail.isDestroyed) {
            this.getContracts();
        }
        winContractsDetail.show();
    },

    btnEFT_Click: function (btn, text) {
        var view = this.getView();
        var keyType = view.down('#hiddenType').getValue();
        var keyValue = view.down('#hiddenKey').getValue();
        var win = Ext.create({
            xtype: 'pharmacy-eftvanwindow',
            extraParams: {
                'keyType': keyType,
                'keyValue': keyValue
            },
            autoShow: true
        });
    },

    btnAddAttachment_Click: function (btn, text) {
        var view = this.getView();
        var me = this;
        if (view) {
            var winContractFileUploader = Ext.create('Ext.window.Window', {
                title: 'File upload', modal: true,
                width: 400, height: 300,
                layout: {type: 'fit', align: 'stretch'},
                listeners: {
                    'close': function (win) {
                        me.closeContractFileUploader(win);
                    }
                },
                items: [
                    {
                        xtype: 'merlin.fileuploader',
                        keyType: 'imagePharmContract',
                        fileType: 'pdf,txt',
                        endpoint: 'shared/rx/document/update'
                    }
                ]
            }, this);
            winContractFileUploader.show();
        }
    },

    btnFax_Click: function (btn, text) {
        var view = this.getView(),
            org = '',
            faxTo = '',
            faxNumber = '',
            re = 'MeridianRx EFT Enrollment Form';

        org = view.down('#dispKeyValue').fieldLabel + ': ' + view.down('#dispKeyValue').getValue();
        faxTo = view.down('#dispContactTitle').getValue().split('-')[0];
        faxNumber = view.down('#displayFax').getValue();

        var sendFaxParams = {
            Org: org,
            FaxTo: faxTo,
            FaxNumber: faxNumber,
            ReferenceForm: re
        };

        var win = Ext.create({
            xtype: 'pharmacy-sendfaxwindow',
            extraParams: {
                'pSendFaxParams': sendFaxParams
            },
            autoShow: false
        });

        win.show();
    },

    cbxPharmacy_Select: function (control, record, event) {
        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view.down('#cbxPhar').getValue() != '') {
            view.down('#cbxRel').setValue('');
            view.down('#btnDelete').setDisabled(true);
            view.down('#btnAddNote').setDisabled(true);
            view.down('#pnlTerms').reset();
            view.down('#pnlAttachment').reset();
            viewModel.getStore('storeAttachment').removeAll();
            view.down('#pnlCompensation').reset();
            view.down('#pnlTerms').setDisabled(true);
            view.down('#pnlCompensation').setDisabled(true);
            view.down('#pnlAttachment').setDisabled(true);
            view.down('#btSaveContractInfo').setDisabled(true);
            view.down('#btnAddAttachment').setDisabled(true);
            view.down('#viewPhar').setDisabled(false);
            view.down('#hiddenContractID').setValue('');
            view.down('#hiddenContractStatus').setValue('');
            view.down('#hiddenContractTermDate').setValue('');
            view.down('#cbxPhar').setRawValue(record.get('ncpdpId') + ' ' + record.get('Name'));
            this.getPharmacy('ncpdpID', view.down('#cbxPhar').getValue());
        }
        else {
            vm.set('hasNCPDPID', false);
        }
    },

    getPharmacy: function (keyType, keyValue) {
        var tt = this;
        var view = this.getView();
        var viewModel = this.getViewModel();
        this.resetAll();
        var storePaymentCenter = viewModel.getStore('storePaymentCenter');
        storePaymentCenter.getProxy().setExtraParam('pKeyType', keyType);
        storePaymentCenter.getProxy().setExtraParam('pKeyValue', keyValue);
        storePaymentCenter.load();

        var fieldList = 'ncpdpid,name,locCity,locState,locAddress1,locAddress2,locZip,locCrossStreet,mailAddress1,mailCity,mailState,mailZip,' +
            'locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactFax,contactExt,ContactEmail,' +
            'legalBusinessName,primDispTypeCode,secDispTypeCode,tertDispTypeCode,dispClassCode,fedTaxId';

        var pharmacyMasterModel = Ext.create('Atlas.common.model.Pharmacy');
        pharmacyMasterModel.getProxy().setExtraParam('pKeyType', keyType);
        pharmacyMasterModel.getProxy().setExtraParam('pKeyValue', keyValue);
        pharmacyMasterModel.getProxy().setExtraParam('pFieldList', fieldList);
        pharmacyMasterModel.phantom = false;
        pharmacyMasterModel.load(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            var locCityStateZip = objResp.data[0].locCity + ', ' + objResp.data[0].locState + ' ';
                            var locZip = objResp.data[0].locZip.replace(' ', '');
                            locCityStateZip += (locZip.length > 5 ? (locZip.substr(0, 5) + '-' + locZip.substr(5)) : locZip);
                            var mailingCityStateZip = objResp.data[0].mailCity + ', ' + objResp.data[0].mailState + ' ';
                            var mailZip = objResp.data[0].mailZip.replace(' ', '');
                            mailingCityStateZip += (mailZip.length > 5 ? (mailZip.substr(0, 5) + '-' + mailZip.substr(5)) : mailZip);
                            view.down('#dispKeyValue').setFieldLabel('NCPDP');
                            view.down('#dispKeyValue').setValue(objResp.data[0].ncpdpid);
                            view.down('#dispType').setValue(objResp.data[0].dispClassCode.substring(0, objResp.data[0].dispClassCode.indexOf('^')));
                            view.down('#dispAddress').setValue(objResp.data[0].locAddress1 + ' ' + objResp.data[0].locAddress2);
                            view.down('#dispCityState').setValue(locCityStateZip);
                            view.down('#dispMailingAddress').setValue(objResp.data[0].mailAddress1);
                            view.down('#dispMailingCityState').setValue(mailingCityStateZip);
                            view.down('#dispContactTitle').setValue(objResp.data[0].contactFirstname + ' ' + objResp.data[0].contactLastname + ' - ' + objResp.data[0].contactTitle);
                            view.down('#displayPhone').setValue(objResp.data[0].locPhone);
                            view.down('#displayFax').setValue(objResp.data[0].locFax);
                            view.down('#dispEmail').setValue(objResp.data[0].locEmail);
                            view.down('#hiddenKey').setValue(objResp.data[0].ncpdpid);
                            view.down('#hiddenType').setValue('NCPDPID');
                            view.down('#btnEFT').setText('Pharmacy EFT/VAN');
                            view.down('#btnAddContract').setDisabled(false);
                            view.down('#btnEFT').setDisabled(false);
                            view.down('#btnFax').setDisabled(false);
                            view.down('#pnlExclusion').setDisabled(true);
                            view.down('#tabPanelPharmacyContracts').setActiveTab('tabContractTerms');
                            //view.down('#txtTaxID').setValue(pharmacy.TaxID);
                            view.down('#pnlDescription').setTitle('<div class="mPharmContract">PHARMACY - ' + objResp.data[0].name + '</div>');
                            this.getContracts();
                        }
                        else {
                            Ext.Msg.alert('PBM', objResp.message[0].message);
                        }
                    }
                    else {
                        Ext.Msg.alert('Failure', 'Pharmacy System error, Please contact admin.');
                    }
                    this.getContracts();
                }
            }
        );
    },

    cbxRelationship_Select: function (control, record, event) {
        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view.down('#cbxRel').getValue() != '') {
            view.down('#cbxPhar').setValue('');
            view.down('#btnDelete').setDisabled(true);
            view.down('#btnAddNote').setDisabled(true);
            view.down('#btnAddAttachment').setDisabled(true);
            view.down('#pnlTerms').reset();
            view.down('#pnlAttachment').reset();
            viewModel.getStore('storeAttachment').removeAll();
            view.down('#pnlCompensation').reset();
            view.down('#pnlTerms').setDisabled(true);
            view.down('#pnlCompensation').setDisabled(true);
            view.down('#pnlAttachment').setDisabled(true);
            view.down('#btSaveContractInfo').setDisabled(true);
            view.down('#hiddenContractID').setValue('');
            view.down('#hiddenContractStatus').setValue('');
            view.down('#hiddenContractTermDate').setValue('');
            this.getRelationship('RID', view.down('#cbxRel').getValue());
            view.down('#viewPhar').setDisabled(true);
        }
    },

    getRelationship: function (keyType, keyValue) {
        this.resetAll();
        var view = this.getView();
        var viewModel = this.getViewModel();
        view.down('#cbxPhar').setValue('');
        var storePaymentCenter = viewModel.getStore('storePaymentCenter');
        var pharmacyRelationshipModel = Ext.create('Atlas.pharmacy.model.Relationships');
        pharmacyRelationshipModel.getProxy().setExtraParam('pKeyType', keyType);
        pharmacyRelationshipModel.getProxy().setExtraParam('pKeyValue', keyValue);
        pharmacyRelationshipModel.phantom = false;
        pharmacyRelationshipModel.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        storePaymentCenter.loadData(objResp.data, false);
                        var relCityStateZip = objResp.data[0].RScity + ', ' + objResp.data[0].RSstate + ' ';
                        var relZip = objResp.data[0].RSzip.replace(' ', '');
                        relCityStateZip += (relZip.length > 5 ? (relZip.substr(0, 5) + '-' + relZip.substr(5)) : relZip);
                        view.down('#dispKeyValue').setFieldLabel('RelationshipID');
                        view.down('#dispKeyValue').setValue(objResp.data[0].RSrelationshipID);
                        view.down('#dispType').setValue(objResp.data[0].RSRelationTypeInfo);
                        view.down('#dispAddress').setValue(objResp.data[0].RSaddress1 + ' ' + objResp.data[0].RSaddress2);
                        view.down('#dispCityState').setValue(relCityStateZip);
                        view.down('#dispMailingAddress').setValue(objResp.data[0].RSaddress1 + ' ' + objResp.data[0].RSaddress2);
                        view.down('#dispMailingCityState').setValue(relCityStateZip);
                        view.down('#dispContactTitle').setValue(objResp.data[0].RScontactName + ' - ' + objResp.data[0].RScontactTitle);
                        view.down('#displayPhone').setValue(objResp.data[0].RSphone);
                        view.down('#displayFax').setValue(objResp.data[0].RSfaxNum);
                        view.down('#dispEmail').setValue(objResp.data[0].RSemail);
                        view.down('#btnEFT').setText('Relationship EFT/VAN');
                        view.down('#btnAddContract').setDisabled(false);
                        view.down('#btnEFT').setDisabled(false);
                        view.down('#btnFax').setDisabled(false);
                        view.down('#pnlExclusion').setDisabled(false);
                        view.down('#tabPanelPharmacyContracts').setActiveTab('tabContractTerms');
                        view.down('#pnlDescription').setTitle('<div class="mPharmContract">RELATIONSHIP - ' + objResp.data[0].RSname + '</div>');
                        //view.down('#txtTaxID').setValue('');
                        view.down('#hiddenKey').setValue(objResp.data[0].RSrelationshipID);
                        view.down('#hiddenType').setValue('RID');
                    }
                    else {
                        Ext.Msg.alert('PBM', objResp.message[0].message);
                    }
                }
                else {
                    Ext.Msg.alert('Failure', 'This Relationship is not active.');
                }
                this.getContracts();
            }
        });
    },

    getContracts: function () {
        var view = this.getView();
        var keyValue = view.down('#hiddenKey').getValue();
        var keyType = view.down('#hiddenType').getValue();
        if (keyType && keyType != '' && keyValue && keyValue != '') {
            winContractsDetail = Ext.create({
                xtype: 'pharmacy-contractsdetailwindow',
                autoShow: false,
                keyType: keyType
            });

            var where = (keyType == 'RID' ? 'RelationshipID' : 'ncpdpid') + "='" + keyValue + "'";

            var storeContractsDetail = winContractsDetail.getViewModel().getStore('storeSearchGrid');
            storeContractsDetail.getProxy().setExtraParam('pRowID', '0');
            storeContractsDetail.getProxy().setExtraParam('pRowNum', 0);
            storeContractsDetail.getProxy().setExtraParam('pBatchSize', 0);
            storeContractsDetail.getProxy().setExtraParam('pKeyType', keyType);
            storeContractsDetail.getProxy().setExtraParam('pWhere', where);
            storeContractsDetail.getProxy().setExtraParam('pSort', '');
            storeContractsDetail.getProxy().setExtraParam('pagination', true);
            storeContractsDetail.load({
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            view.down('#btnViewDetail').setDisabled(objResp.data.length <= 0);
                        }
                    }
                }
            });
        }
    },

    resetAll: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        var storePaymentCenter = viewModel.getStore('storePaymentCenter');
        storePaymentCenter.loadData({})
        view.down('#btnAddContract').setDisabled(true);
        view.down('#btnViewDetail').setDisabled(true);
        view.down('#btnDelete').setDisabled(true);
        view.down('#dispKeyValue').setValue('');
        view.down('#dispType').setValue('');
        view.down('#dispAddress').setValue('');
        view.down('#dispAddress').setValue('');
        view.down('#dispMailingAddress').setValue('');
        view.down('#dispMailingCityState').setValue('');
        view.down('#dispCityState').setValue('');
        view.down('#dispContactTitle').setValue('');
        view.down('#displayPhone').setValue('');
        view.down('#displayFax').setValue('');
        view.down('#dispEmail').setValue('');
        view.down('#hiddenKey').setValue('');
        view.down('#hiddenType').setValue('');
    },

    disableEFTFlag: function (disableRequired) {
        var view = this.getView();
        view.down('#lblEFTFlag').setDisabled(disableRequired);
    },

    getContractInfo: function (contractInfo) {
        var view = this.getView();
        var viewModel = this.getViewModel();
        PharmcontractInfo = contractInfo;
        if (view) {
            loadContractDetail = contractInfo;
            view.down('#pnlTerms').reset();
            view.down('#pnlAttachment').reset();
            viewModel.getStore('storeAttachment').removeAll();
            view.down('#pnlCompensation').reset();
            view.down('#tabPanelPharmacyContracts').setActiveTab('tabContractTerms');
            if (contractInfo.NcpdpId == '') {
                this.getRelationship('RID', contractInfo.RelationShipId);
                view.down('#cbxRel').setValue('');
                view.down('#cbxPhar').setValue('');
            }
            else {
                this.getPharmacy('NCPDPID', contractInfo.NcpdpId);
                view.down('#cbxRel').setValue('');
                view.down('#cbxPhar').setValue('');
            }

            if (contractInfo.contractStatus != 'No Contract') {
                view.down('#pnlTerms').setDisabled(false);
                view.down('#pnlAttachment').setDisabled(false);
                view.down('#pnlCompensation').setDisabled(false);
                view.down('#btnDelete').setDisabled(false);
                view.down('#btnAddNote').setDisabled(false);
                view.down('#btSaveContractInfo').setDisabled(false);
                view.down('#btnAddAttachment').setDisabled(false);

                var fieldList = 'ContractID,effDate,termDate,contractStatus,NetworkID,renewalDate,paymentType,paymentCycle,maintDays,maxDaysSupply,contactName,contactPhone,' +
                    'contactFax,systemID,macListId,salesTaxFlag,PaytoPharmFlag,customPriceListID,prefNetworkProgram';
                var storePharmacyContractMaster = viewModel.getStore('storePharmacyContractMaster');
                storePharmacyContractMaster.getProxy().setExtraParam('pKeyValue', contractInfo.ContractId);
                storePharmacyContractMaster.getProxy().setExtraParam('pKeyType', 'ContractID');
                storePharmacyContractMaster.getProxy().setExtraParam('pFieldList', fieldList);
                storePharmacyContractMaster.load({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        if (success) {
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.message[0].code == 0) {
                                view.down('#pnlTerms').loadRecord(storePharmacyContractMaster.last());
                                var record = storePharmacyContractMaster.last().data;
                                view.down('#chkSalesTax').setValue(record.salesTaxFlag == 'yes');
                                view.down('#chkPayToPhar').setValue(record.PaytoPharmFlag == 'yes');
                                view.down('#chkPrefNetworkPgm').setValue(record.prefNetworkProgram == 'yes');
                                var values = [];
                                var networkIDs = record.NetworkID.split(',');
                                Ext.Array.each(networkIDs, function (id) {
                                    values.push(id);
                                });
                                view.down('#cbxPharmacyNetwork').setValue(values);
                                view.down('#hiddenContractSystemID').setValue(record.systemID);
                                view.down('#hiddenContractID').setValue(record.ContractID);
                                view.down('#hiddenContractTermDate').setValue(record.termDate);
                                view.down('#hiddenContractStatus').setValue(record.contractStatus);
                                view.down('#cbxPharmacyNetwork').setDisabled(true);
                                this.getServiceCompensation(contractInfo.SystemId);
                                this.getAttachment('ContractID', contractInfo.ContractId);
                            }
                        }
                        else {
                            Ext.Msg.alert('PBM', objResp.message[0].message);
                        }
                    }
                });
            }
            else {
                view.down('#btnAddNote').setDisabled(true);
                view.down('#pnlTerms').setDisabled(true);
                view.down('#pnlCompensation').setDisabled(true);
                view.down('#pnlAttachment').setDisabled(true);
                view.down('#btnDelete').setDisabled(true);
            }
        }
        /*var recordNumber = Ext.getCmp('cbxMacList').getStore().findExact('MACListID', contract.MacList, 0);
         if (recordNumber >= 0) {
         Ext.getCmp('cbxMacList').selectByIndex(recordNumber);
         }
         else {
         Ext.getCmp('cbxMacList').setValue('');
         }*/
    },

    getAttachment: function (keyType, keyValue) {
        var viewModel = this.getViewModel();
        var storeAttachment = viewModel.getStore('storeAttachment');
        storeAttachment.getProxy().setExtraParam('pcKeyType', keyType);
        storeAttachment.getProxy().setExtraParam('pcKeyValue', keyValue);
        storeAttachment.getProxy().setExtraParam('pcInOut', '');
        storeAttachment.load({
            callback: function (record, operation, success) {
                if (success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    objResp.data.forEach(function (item, index) {
                        var arrfilePath = item.fileName.replace(/\//g, '\\').split('\\');
                        item.fileName = arrfilePath[arrfilePath.length - 1];
                    });
                    storeAttachment.loadData(objResp.data, false);
                }
            }
        });
    },

    getServiceCompensation: function (parentSystemId) {
        var modelPricingMaster = Ext.create('Atlas.pharmacy.model.PricingMasterData');
        modelPricingMaster.getProxy().setExtraParam('ParentSystemId', parentSystemId);
        modelPricingMaster.phantom = false;
        modelPricingMaster.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {
                    var lob = '';
                    var type = '';
                    var lobs = [];
                    var types = [];
                    this.getView().down('#pnlCompensation').reset();
                    objResp.data.forEach(function (item, index) {
                        lob = (index == 0 ? item.LOB : lob + '^' + item.LOB);
                        type = (index == 0 ? item.FulfillmentTypeVal + item.LOB : type + '^' + item.FulfillmentTypeVal + item.LOB);
                    });
                    lobs = lob.split('^');
                    types = type.split('^');
                    lobs.forEach(function (item, index) {
                        this.getView().down('#' + item).expand();
                    }, this);

                    types.forEach(function (item, index) {
                        this.getView().down('#pnlCompensation').getForm().findField(item).setValue(true);
                        this.getView().down('#pnlCompensation').getForm().findField(item).setDisabled(true);
                    }, this);
                }
                else {
                    Ext.Msg.alert('PBM', objResp.message[0].message);
                }
            }
        });
    },

    btSaveContractInfo_Click: function () {
        var view = this.getView();
        if (view.down('#pnlTerms').isValid()) {
            var fieldList = 'contractStatus,effDate,termDate,renewalDate,ncpdpid,relationshipID,' +
                'macListId,paymentType,paymentCycle,maintDays,maxDaysSupply,contactName,contactPhone,contactFax,salesTaxFlag,PaytoPharmFlag,customPriceListID,prefNetworkProgram';

            var contractID = ((view.down('#hiddenContractID').getValue() != null && view.down('#hiddenContractID').getValue() != '') ? view.down('#hiddenContractID').getValue() : '0');

            var salesTax = (view.down('#chkSalesTax').getValue() ? "yes" : "no");
            var payToPhar = (view.down('#chkPayToPhar').getValue() ? "yes" : "no");
            var prefNetworkPgm = (view.down('#chkPrefNetworkPgm').getValue() ? "yes" : "no");
            var phone;
            phone = view.down('#txtContractPhone').getValue().replace("-", "");
            phone = phone.replace("(", "");
            phone = phone.replace(")", "");
            var fax;
            fax = view.down('#txtContractFax').getValue().replace("-", "");
            fax = fax.replace("(", "");
            fax = fax.replace(")", "");

            var fields = view.down('#cbxContractStatus').getValue() + "|" + Ext.Date.format(view.down('#DFEffDate').getValue(), 'm/d/Y') + "|" + Ext.Date.format(view.down('#DFTermDate').getValue(), 'm/d/Y') + "|" + Ext.Date.format(view.down('#DFRenewDate').getValue(), 'm/d/Y') +
                "|" + (view.down('#hiddenType').getValue() == "NCPDPID" ? view.down('#hiddenKey').getValue() : "") + "|" + (view.down('#hiddenType').getValue() == "RID" ? view.down('#hiddenKey').getValue() : "") +
                "|" + (view.down('#cbxMacList').getValue() == '' ? '0' : view.down('#cbxMacList').getValue()) + "|" + view.down('#cbxPaymentType').getValue() + "|" + view.down('#spPayCycle').getValue() + "|" + view.down('#txtDays').getValue() + "|" + view.down('#txtMaxDays').getValue() +
                "|" + view.down('#txtContractContact').getValue() + "|" + phone + "|" + fax + "|" + salesTax + "|" + payToPhar + "|" + (view.down('#cbxCustPriceList').getValue() == null ? '' : view.down('#cbxCustPriceList').getValue()) + "|" + prefNetworkPgm;

            if (contractID == "0" || contractID == "") {
                fieldList = fieldList + ",NetworkID";
                var cTemp = "";
                var networkIDs = view.down('#cbxPharmacyNetwork').getValue();
                for (var iCount = 0; iCount < networkIDs.length; iCount++) {
                    cTemp = cTemp + (cTemp != "" ? "," : "") + networkIDs[iCount];
                }
                fields = fields + "|" + cTemp;
            }

            var modelContractMaster = Ext.create('Atlas.pharmacy.model.ContractMaster');
            modelContractMaster.getProxy().setExtraParam('pContractID', contractID);
            modelContractMaster.getProxy().setExtraParam('pFieldList', fieldList);
            modelContractMaster.getProxy().setExtraParam('pFields', fields);
            modelContractMaster.phantom = false;
            modelContractMaster.save({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var view = this.getView();
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            view.down('#hiddenContractSystemID').setValue(objResp.metadata.pRetSystemID);
                            view.down('#hiddenContractID').setValue(objResp.metadata.pRetContractID);
                            view.down('#hiddenContractStatus').setValue(view.down('#cbxContractStatus').getValue());
                            view.down('#hiddenContractTermDate').setValue(view.down('#DFTermDate').getValue());
                            view.down('#tabContractTerms').setTitle('Contract Terms');
                            view.down('#btnViewDetail').setDisabled(false);
                            view.down('#btnAddNote').setDisabled(false);
                            view.down('#btnAddAttachment').setDisabled(false);
                            view.down('#txtContractID').setValue(view.down('#hiddenContractID').getValue());
                            view.down('#pnlCompensation').setDisabled(false);
                            view.down('#pnlAttachment').setDisabled(false);
                            winContractsDetail.isDestroyed = true;
                            Ext.Msg.alert('PBM', 'Record saved successfully.');
                        }
                        else {
                            Ext.Msg.alert('PBM', objResp.message[0].message);
                        }

                    }
                }
            });
        }


    },

    btnAddContract_Click: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view) {
            view.down('#tabPanelPharmacyContracts').setActiveTab('tabContractTerms');
            view.down('#cbxPhar').setValue('');
            view.down('#pnlTerms').reset();
            view.down('#pnlAttachment').reset();
            viewModel.getStore('storeAttachment').removeAll();
            view.down('#pnlCompensation').reset();
            view.down('#btnDelete').setDisabled(true);
            view.down('#btnAddNote').setDisabled(true);
            view.down('#btnAddAttachment').setDisabled(true);
            view.down('#btCancelContractInfo').setDisabled(false);
            view.down('#pnlTerms').setDisabled(false);
            view.down('#pnlCompensation').setDisabled(true);
            view.down('#pnlAttachment').setDisabled(true);
            view.down('#btSaveContractInfo').setDisabled(false);
            //view.down('#btnGoToPharmacy').setDisabled(true);
            view.down('#hiddenContractID').setValue('');
            view.down('#hiddenContractStatus').setValue('');
            view.down('#hiddenContractTermDate').setValue('');
            view.down('#cbxContractStatus').setValue('Draft');
            view.down('#cbxPharmacyNetwork').setDisabled(false);
            view.down('#txtContractContact').setValue(view.down('#dispContactTitle').getValue());
            view.down('#txtContractPhone').setValue(view.down('#displayPhone').getValue());
            view.down('#txtContractFax').setValue(view.down('#displayFax').getValue());
            view.down('#cbxContractStatus').allowBlank = false;
            view.down('#cbxPharmacyNetwork').allowBlank = false;
            view.down('#DFEffDate').allowBlank = false;
            view.down('#spPayCycle').allowBlank = false;
            view.down('#txtMaxDays').allowBlank = false;
            view.down('#txtDays').allowBlank = false;
        }
    },

    btCancelContractInfo_Click: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view) {
            view.down('#pnlTerms').reset();
            view.down('#pnlTerms').setDisabled(true);
            view.down('#pnlAttachment').reset();
            viewModel.getStore('storeAttachment').removeAll();
            view.down('#pnlCompensation').reset();
            view.down('#pnlCompensation').setDisabled(true);
            view.down('#btnDelete').setDisabled(true);
            view.down('#btnAddNote').setDisabled(true);
        }
    },

    btnDelete_Click: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view) {
            view.down('#tabPanelPharmacyContracts').setActiveTab('tabContractTerms');

            Ext.Msg.confirm('Confirm', 'Are you sure you would like to delete Contract for <b>' + view.down('#dispKeyValue').fieldLabel + ':' + view.down('#dispKeyValue').getValue() + '</b>?', function (btn) {
                if (btn == 'yes') {
                    var modelDelContractMaster = Ext.create('Atlas.pharmacy.model.DelContractMaster');
                    modelDelContractMaster.getProxy().setExtraParam('pContractID', view.down('#hiddenContractID').getValue());
                    modelDelContractMaster.phantom = false;
                    modelDelContractMaster.save({
                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {
                            if (success) {
                                var objResp = Ext.decode(operation.getResponse().responseText);
                                if (objResp.message[0].code == 0) {
                                    view.down('#pnlTerms').reset();
                                    view.down('#pnlTerms').setDisabled(true);
                                    view.down('#pnlAttachment').reset();
                                    viewModel.getStore('storeAttachment').removeAll();
                                    view.down('#pnlCompensation').reset();
                                    view.down('#pnlCompensation').setDisabled(true);
                                    view.down('#btnDelete').setDisabled(true);
                                    view.down('#btnAddNote').setDisabled(true);
                                    winContractsDetail.isDestroyed = true;
                                }
                                else {
                                    Ext.Msg.alert('PBM', objResp.message[0].message);
                                }
                            }
                        }
                    });
                }
            }, this);
        }
    },

    tabPanelPharmacyContracts_tabchange: function (tabPanel, tab) {
        var view = this.getView();
        if (view) {
            if (tab.itemId == 'pnlExclusion') {
                this.fireEvent('InclusionExclusionActivate', view.down('#hiddenType').getValue(), view.down('#hiddenKey').getValue(), view.down('#hiddenContractID').getValue(), view.down('#hiddenContractTermDate').getValue(), view.down('#hiddenContractStatus').getValue());
            }
            else if (tab.itemId == 'tabContractTerms') {

            }
            else {
                this.fireEvent('PopulateContractPricing', tab.FulfillmentTypeVal, tab.LOBVal, tab.LOB, tab.FulfillmentType, tab.PriceId, tab.ParentSystemID, tab.ContractID, tab.LoadContractDetail, PharmcontractInfo);
            }
        }
    },

    closeContractFileUploader: function (win) {
        var view = this.getView();
        if (view) {
            win.items.items[0].getViewModel().data.documentIDList.forEach(function (item, count) {
                var description = win.items.items[0].getViewModel().data.fileStore.data.items[count].data.description;
                var modelSetAttachmentList = Ext.create('Atlas.pharmacy.model.ContractAttachmentList');
                modelSetAttachmentList.getProxy().setExtraParam('pcPlanID', '');
                modelSetAttachmentList.getProxy().setExtraParam('pcKeyType', 'ContractID');
                modelSetAttachmentList.getProxy().setExtraParam('pcKeyValue', view.down('#hiddenContractID').getValue());
                modelSetAttachmentList.getProxy().setExtraParam('pcKeyAction', 'A');
                modelSetAttachmentList.getProxy().setExtraParam('pcDocIDList', item);
                modelSetAttachmentList.getProxy().setExtraParam('pcDescrData', description);
                modelSetAttachmentList.phantom = false;
                modelSetAttachmentList.save({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        if (success) {
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.message[0].code == 0) {
                                this.getAttachment('ContractID', view.down('#hiddenContractID').getValue());
                            }
                            else {
                                Ext.Msg.alert('PBM', objResp.message[0].message);
                            }
                        }
                    }
                });
            }, this);
        }
    },

    openContractAttachment: function (component, eOpts) {
        var documentID = component.getWidgetRecord().data.DocumentID;
        var modelViewPDF = Ext.create('Atlas.common.model.shared.ViewPDF');
        modelViewPDF.getProxy().setExtraParam('pDocumentID', documentID);
        modelViewPDF.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {
                    Atlas.common.utility.Utilities.displayDocument('pdf', objResp.metadata.pData);
                }
                else {
                    Ext.Msg.alert('Message', 'PDF Document is being generated. Please try again later.');
                }
            }
        });
    },

    deleteContractAttachment: function (component, eOpts) {
        var view = this.getView();
        if (view) {
            var documentID = component.getWidgetRecord().data.DocumentID;
            var contractID = view.down('#hiddenContractID').getValue();
            Ext.Msg.confirm('Confirm', 'Are you sure you would like to remove this attachment?', function (btn) {
                if (btn == 'yes') {
                    var modelSetAttachmentList = Ext.create('Atlas.pharmacy.model.ContractAttachmentList');
                    modelSetAttachmentList.getProxy().setExtraParam('pcPlanID', '');
                    modelSetAttachmentList.getProxy().setExtraParam('pcKeyType', 'ContractID');
                    modelSetAttachmentList.getProxy().setExtraParam('pcKeyValue', contractID);
                    modelSetAttachmentList.getProxy().setExtraParam('pcKeyAction', 'D');
                    modelSetAttachmentList.getProxy().setExtraParam('pcDocIDList', documentID);
                    modelSetAttachmentList.getProxy().setExtraParam('pcDescrData', 'anything');
                    modelSetAttachmentList.phantom = false;
                    modelSetAttachmentList.save({
                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {
                            if (success) {
                                var objResp = Ext.decode(operation.getResponse().responseText);
                                if (objResp.message[0].code == 0) {
                                    this.getAttachment('ContractID', contractID);
                                }
                                else {
                                    Ext.Msg.alert('PBM', objResp.message[0].message);
                                }
                            }
                        }
                    });
                }
            }, this);
        }
    },

    btnAddNote_Click: function () {
        var view = this.getView();

        if (view) {
            var winPharmacyNotes = Ext.create('Ext.window.Window', {
                title: 'Notes',
                iconCls: 'x-fa fa-sticky-note-o',
                modal: true,
                width: 500,
                height: 400,
                layout: {type: 'fit', align: 'stretch'},
                items: [
                    {
                        xtype: 'pharmacy.notes',
                        parentSystemId: view.down('#hiddenContractSystemID').getValue()
                    }
                ]
            }, this);
            winPharmacyNotes.show();
        }
    }
});
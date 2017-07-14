/**
 * Created by rsalekin on 11/17/2016.
 */
Ext.define('Atlas.pharmacy.view.EftVanWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eftvanwindow',

    keyType: '',
    keyValue: '',

    init: function () {
        var view = this.getView();
        keyType = view.extraParams["keyType"];
        keyValue = view.extraParams["keyValue"];
        this.getEFTInfo();
    },

    getEFTInfo: function () {
        var view = this.getView();
        var fieldList = '';
        var type = (keyType == 'RID' ? 'RelationshipID' : keyType)
        view.down('#lblID').setValue(keyType.toUpperCase() + ":" + keyValue);

        fieldList = "BankAccountNum,BankAccountName,BankAddress,BankCity,BankContactName,BankName,BankPhone,BankRouting,BankState,BankZip,noPaperEob,accountType," +
            "EpaymentId,systemID,TaxId,FTPContactEmail,FTPContactName,FTPContactPhone,eftStatus";

        var viewModel = this.getViewModel();
        var storeEftVan = viewModel.getStore('storeEftVan');
        storeEftVan.getProxy().setExtraParam('pKeyType', type);
        storeEftVan.getProxy().setExtraParam('pKeyvalue', keyValue);
        storeEftVan.getProxy().setExtraParam('pFieldList', fieldList);
        storeEftVan.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (success) {
                    scope: this;
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        view.down('#btnDeleteEFT').setDisabled(false);
                        view.down('#formPanelEFT').loadRecord(storeEftVan.last());
                        var record = storeEftVan.last().data;
                        view.down('#hiddenEPayCenterID').setValue(record.EpaymentId);
                        view.down('#hiddenEFTSystemID').setValue(record.systemID);
                        var bankPhone = '';
                        var bankPhoneExt = '';
                        if (record.BankPhone != '') {
                            bankPhone = record.BankPhone.replace(/\D/g, '');
                            if (record.BankPhone.substring(0, 1) == '1') {
                                bankPhone = bankPhone.substring(1);
                            }
                            if (bankPhone.length < 10) {
                                bankPhone = '';
                                bankPhoneExt = '';
                            }
                            else {
                                bankPhoneExt = bankPhone.substring(10);
                                bankPhone = bankPhone.substring(0, 10);
                            }
                        }

                        var ftpContactPhone = '';
                        var ftpContactPhoneExt = '';
                        if (record.FTPContactPhone != '') {
                            ftpContactPhone = record.FTPContactPhone.replace(/\D/g, '');
                            if (record.FTPContactPhone.substring(0, 1) == '1') {
                                ftpContactPhone = ftpContactPhone.substring(1);
                            }
                            if (ftpContactPhone.length < 10) {
                                ftpContactPhone = '';
                                ftpContactPhoneExt = '';
                            }
                            else {
                                ftpContactPhoneExt = ftpContactPhone.substring(10);
                                ftpContactPhone = ftpContactPhone.substring(0, 10);
                            }
                        }

                        view.down('#txtBankPhone').setValue(this.numberFormatter(bankPhone, 'PHONE'));
                        view.down('#txtBankPhoneExt').setValue(bankPhoneExt);

                        view.down('#txtVanContactPhone').setValue(this.numberFormatter(ftpContactPhone, 'PHONE'));
                        view.down('#txtVanContactExt').setValue(ftpContactPhoneExt);

                        view.down('#chkNoPaperEob').setValue(record.noPaperEob == 'yes');
                        view.down('#btnDeleteEFT').setDisabled(false);
                        view.down('#btnAddEFTAttachment').setDisabled(false);

                        this.getAttachmentList('ePayID', view.down('#hiddenEPayCenterID').getValue());
                    }
                    else {
                        view.down('#btnDeleteEFT').setDisabled(true);
                        Ext.Msg.alert('PBM', objResp.message[0].message);
                    }
                    if (keyType.toUpperCase() == 'NCPDPID') {
                        var fieldList = "ncpdpid,name,mailAddress1,mailAddress2,mailCity,mailState,mailZip," +
                            "locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactFax,contactExt,ContactEmail,fedTaxId";

                        var pharmacyMasterModel = Ext.create('Atlas.common.model.Pharmacy');
                        pharmacyMasterModel.getProxy().setExtraParam('pKeyType', keyType);
                        pharmacyMasterModel.getProxy().setExtraParam('pKeyValue', keyValue);
                        pharmacyMasterModel.getProxy().setExtraParam('pFieldList', fieldList);
                        pharmacyMasterModel.phantom = false;
                        pharmacyMasterModel.load({
                            scope: this,
                            failure: function (record, operation) {
                            },
                            success: function (record, operation) {
                            },
                            callback: function (record, operation, success) {
                                if (success) {
                                    var objResp = Ext.decode(operation.getResponse().responseText);
                                    this.reloadNotes();
                                    if (objResp.message[0].code == 0) {
                                        var pmCityState = '';
                                        view.down('#lblPMName').setValue(objResp.data[0].name);
                                        view.down('#lblPMAddress1').setValue(objResp.data[0].mailAddress1 + ' ' + objResp.data[0].mailAddress2);
                                        if (objResp.data[0].mailCity && objResp.data[0].mailCity != '') {
                                            pmCityState = objResp.data[0].mailCity + ', ' + objResp.data[0].mailState + ' ' + objResp.data[0].mailZip;
                                        }
                                        else {
                                            pmCityState = objResp.data[0].mailZip;
                                        }
                                        view.down('#lblPMCityState').setValue(pmCityState);
                                        view.down('#lblPMContactName').setValue(objResp.data[0].contactFirstname + ' ' + objResp.data[0].contactLastname);
                                        view.down('#lblPMContactTitle').setValue( objResp.data[0].contactTitle);
                                        view.down('#lblPMPhone').setValue(  objResp.data[0].contactPhone);
                                        view.down('#lblPMFax').setValue(  objResp.data[0].locFax);
                                        view.down('#lblPMEmail').setValue( objResp.data[0].ContactEmail);
                                        if (view.down('#txtTaxID').getValue() == '') {
                                            view.down('#txtTaxID').setValue(objResp.data[0].fedTaxId);
                                        }
                                    }
                                    else {
                                        Ext.Msg.alert('PBM', objResp.message[0].message);
                                    }
                                }
                            }
                        });
                    }
                    else if (keyType.toUpperCase() == 'RID') {
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
                                    this.reloadNotes();
                                    if (objResp.message[0].code == 0) {
                                        var pmCityState = '';
                                        view.down('#lblPMName').setValue(objResp.data[0].RSname);
                                        view.down('#lblPMAddress1').setValue(objResp.data[0].RSaddress1 + ' ' + objResp.data[0].RSaddress2);
                                        if (objResp.data[0].RScity && objResp.data[0].RScity != '') {
                                            pmCityState = objResp.data[0].RScity + ', ' + objResp.data[0].RSstate + ' ' + objResp.data[0].RSzip;
                                        }
                                        else {
                                            pmCityState = objResp.data[0].RSzip;
                                        }
                                        view.down('#lblPMCityState').setValue(pmCityState);
                                        view.down('#lblPMContactName').setValue( objResp.data[0].RScontactName);
                                        view.down('#lblPMContactTitle').setValue(  objResp.data[0].RScontactTitle);
                                        view.down('#lblPMPhone').setValue( objResp.data[0].RSphone);
                                        view.down('#lblPMFax').setValue( objResp.data[0].RSfaxNum);
                                        view.down('#lblPMEmail').setValue(objResp.data[0].RSemail);
                                    }
                                    else {
                                        Ext.Msg.alert('PBM', objResp.message[0].message);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    },

    numberFormatter: function (number, formatType) {
        var formattedNumber = '';
        if (number != undefined) {
            var contactNumber = 0;
            formattedNumber = number.toUpperCase() == "ERROR" ? '' : number;
            number = number.replace("/[-)(\s]/", ""); //Regex.Replace(number, @"[-)(\s]", string.Empty);

            if (number.length == 10) {

                if (formatType.toUpperCase() == "PHONE") {
                    formattedNumber = '(' + number.substring(0, 3) + ')-' + number.substring(3, 6) + '-' + number.substring(6, 10);
                }
                else {
                    formattedNumber = number.substring(0, 3) + '-' + number.substring(3, 6) + '-' + number.substring(6, 10);
                }
            }
        }
        return formattedNumber;
    },
    formatPhoneNumber: function (control, e) {
        var i;
        var returnString = '';
        var s = control.getValue();
        if (s.charAt(0) == '+') {
            return false;
        }
        filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'';

        /* Search through string and append to unfiltered values
         to returnString. */
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
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
    reloadNotes: function () {
        var view = this.getView();
        if (view) {
            this.fireEvent('reloadNotes', view.down('#hiddenEFTSystemID').getValue());
        }
    },

    getAttachmentList: function (keyType, keyValue) {
        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view) {
            var storeEFTAttachment = viewModel.getStore('storeEFTAttachment');
            storeEFTAttachment.removeAll();
            storeEFTAttachment.getProxy().setExtraParam('pcKeyType', keyType);
            storeEFTAttachment.getProxy().setExtraParam('pcKeyValue', keyValue);
            storeEFTAttachment.getProxy().setExtraParam('pcInOut', '');
            storeEFTAttachment.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        objResp.data.forEach(function (item, index) {
                            var arrfilePath = item.fileName.replace(/\//g, '\\').split('\\');
                            item.fileName = arrfilePath[arrfilePath.length - 1];
                        });
                        storeEFTAttachment.loadData(objResp.data, false);
                    }
                }
            });
        }
    },

    btnSave_Click: function () {
        var view = this.getView();
        if (view.down('#formPanelEFT').isValid()) {
            var noPaperEOB = (view.down('#chkNoPaperEob').getValue() ? 'yes' : 'no');
            var bankPhone = view.down('#txtBankPhone').getValue().replace(/\D/g, '') + view.down('#txtBankPhoneExt').getValue();
            var contactPhone = view.down('#txtVanContactPhone').getValue().replace(/\D/g, '') + view.down('#txtVanContactExt').getValue();
            var fieldList = 'BankAccountNum,BankAccountName,BankAddress,BankCity,BankContactName,BankName,BankPhone,BankRouting,BankState,BankZip,noPaperEob,accountType,' +
                'FTPContactEmail,FTPContactName,FTPContactPhone,TaxId,eftStatus';
            var fields = view.down('#txtBankAccount').getValue() + "|" + view.down('#txtBankAccountName').getValue() + "|" + view.down('#txtBankAddress').getValue() + "|" + view.down('#txtBankCity').getValue() + "|" +
                view.down('#txtBankContact').getValue() + "|" + view.down('#txtBankName').getValue() + "|" + bankPhone + "|" + view.down('#txtBankRouting').getValue() + "|" +
                view.down('#txtBankState').getValue() + "|" + view.down('#txtBankZip').getValue() + "|" + view.down('#chkNoPaperEob').getValue() + "|" + view.down('#txtAccountType').getValue() + "|" + view.down('#txtVanEmail').getValue() + "|" +
                view.down('#txtVanContactName').getValue() + "|" + contactPhone + "|" + view.down('#txtTaxID').getValue() + "|" + view.down('#cbxEFTStatus').getValue();
            var type = (keyType == "RID" ? "RelationshipID" : keyType);
            var viewModel = this.getViewModel();
            var pMode = view.down('#hiddenEPayCenterID').getValue() != '' ? 'U' : 'A';
            var setEftVanModel = Ext.create('Atlas.pharmacy.model.SetEftVanWindow');
            setEftVanModel.getProxy().setExtraParam('pMode', pMode);
            setEftVanModel.getProxy().setExtraParam('pKeyType', type);
            setEftVanModel.getProxy().setExtraParam('pKeyvalue', keyValue);
            setEftVanModel.getProxy().setExtraParam('pFieldList', fieldList);
            setEftVanModel.getProxy().setExtraParam('pFields', fields);
            setEftVanModel.phantom = false;
            setEftVanModel.save({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            view.down('#btnAddEFTAttachment').setDisabled(false);
                            view.down('#btnDeleteEFT').setDisabled(false);
                            this.getEFTInfo();
                            this.fireEvent('disableEFT', false);
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

    btnDelete_Click: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();

        Ext.Msg.confirm('Confirm', 'Are you sure you would like to delete EFT and VAN for <b>' + keyType.toUpperCase() + ":" + keyValue + '</b>?', function (btn) {
            if (btn == 'yes') {
                var type = (keyType == "RID" ? "RelationshipID" : keyType);
                var setEftVanModel = Ext.create('Atlas.pharmacy.model.SetEftVanWindow');
                setEftVanModel.getProxy().setExtraParam('pMode', 'D');
                setEftVanModel.getProxy().setExtraParam('pKeyType', type);
                setEftVanModel.getProxy().setExtraParam('pKeyvalue', keyValue);
                setEftVanModel.getProxy().setExtraParam('pFieldList', '');
                setEftVanModel.getProxy().setExtraParam('pFields', '');
                setEftVanModel.phantom = false;
                setEftVanModel.save({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        if (success) {
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.message[0].code == 0) {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
                                this.fireEvent('disableEFT', true);
                            }
                            else {
                                Ext.Msg.alert('PBM', objResp.message[0].message);
                            }
                        }
                    }
                });
            }
        }, this);
    },

    btnAddEFTAttachment_Click: function () {
        var view = this.getView();
        var me = this;
        if (view) {
            var winEFTFileUploader = Ext.create('Ext.window.Window', {
                title: 'File upload', modal: true,
                width: 400, height: 300,
                layout: {type: 'fit', align: 'stretch'},
                listeners: {
                    'close': function (win) {
                        me.closeEFTFileUploader(win);
                    }
                },
                items: [
                    {
                        xtype: 'merlin.fileuploader',
                        keyType: 'imageEFT',
                        fileType: 'pdf,txt',
                        endpoint: 'shared/rx/document/update'
                    }
                ]
            }, this);
            winEFTFileUploader.show();
        }
    },

    closeEFTFileUploader: function (win) {
        var view = this.getView();
        if (view) {
            win.items.items[0].getViewModel().data.documentIDList.forEach(function (item, count) {
                var description = win.items.items[0].getViewModel().data.fileStore.data.items[count].data.description;
                var modelSetAttachmentList = Ext.create('Atlas.pharmacy.model.EFTAttachmentList');
                modelSetAttachmentList.getProxy().setExtraParam('pcPlanID', '');
                modelSetAttachmentList.getProxy().setExtraParam('pcKeyType', 'ePayID');
                modelSetAttachmentList.getProxy().setExtraParam('pcKeyValue', view.down('#hiddenEPayCenterID').getValue());
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
                                this.getAttachmentList('ePayID', view.down('#hiddenEPayCenterID').getValue());
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

    openEFTAttachment: function (component, eOpts) {
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

    deleteEFTAttachment: function (component, eOpts) {
        var view = this.getView();
        if (view) {
            var documentID = component.getWidgetRecord().data.DocumentID;
            var ePayID = view.down('#hiddenEPayCenterID').getValue();
            Ext.Msg.confirm('Confirm', 'Are you sure you would like to remove this attachment?', function (btn) {
                if (btn == 'yes') {
                    var modelSetAttachmentList = Ext.create('Atlas.pharmacy.model.EFTAttachmentList');
                    modelSetAttachmentList.getProxy().setExtraParam('pcPlanID', '');
                    modelSetAttachmentList.getProxy().setExtraParam('pcKeyType', 'ePayID');
                    modelSetAttachmentList.getProxy().setExtraParam('pcKeyValue', ePayID);
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
                                    this.getAttachmentList('ePayID', ePayID);
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
    }
});


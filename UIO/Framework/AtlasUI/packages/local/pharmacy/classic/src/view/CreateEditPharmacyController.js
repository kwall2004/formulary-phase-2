/**
 * Created by n6684 on 11/19/2016.
 */

Ext.define('Atlas.authorization.view.CreateEditPharmacyController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.createeditpharmacycontroller',
        listen: {
            controller: {
                '*': {
                    refreshgrid: 'onpbmcreatedChange'
                }
            }
        },
        custompage_init: {
            action: 'create'
        },
        setformcontrolflag: function (mode) {
            var view = this.getView();
            var frm = view.down("#frmcreatededitpharmacy");
            frm.query('field').forEach(function (c) {
                c.setDisabled(mode);
            });
        },
        txtValidator: function (val, errortext, number, nmberval) {
            var valid = errortext;
            if (val.getValue()) {
                if (number == "NUM") {

                    var v = parseInt(val.getValue());
                    if (!v)
                        val.setValue("");

                    if (v.toString().length >= nmberval) {
                        val.setValue(val.getValue().substring(0, nmberval))
                        return true;
                    }

                    return v;
                }

                if (number == "PADNUM") {
                    var pv = parseInt(val.getValue());
                    if (!pv)
                        val.setValue("");

                    if (pv == 0 && pv.toString().length == 1) {
                        val.setValue("0");
                        return true;
                    }


                    if (pv.toString().length >= nmberval) {
                        val.setValue(val.getValue().substring(0, nmberval))
                        return true;
                    }

                    return pv;
                }

                valid = true;
            }


            return valid;
        },

        init: function () {
            // var reftextnpi = this.lookupReference('reftextnpi');
            // reftextnpi.validator = Ext.bind(this.txtValidator, this, [reftextnpi, "10-digit NPI is required","PADNUM",10]);

            // var reftextncpdpid = this.lookupReference('reftextncpdpid');
            // reftextncpdpid.validator = Ext.bind(this.txtValidator, this, [reftextncpdpid, "7-digit NCPDP ID is required","PADNUM",7]);


            var reftextpharmacyname = this.lookupReference('reftextpharmacyname');
            reftextpharmacyname.validator = Ext.bind(this.txtValidator, this, [reftextpharmacyname, "Pharmacy Name is required", ""]);

            var refcbxPharmacyType = this.lookupReference('refcbxPharmacyType');
            refcbxPharmacyType.validator = Ext.bind(this.txtValidator, this, [refcbxPharmacyType, "Pharmacy Type is required", ""]);

            var refcbxServiceType = this.lookupReference('refcbxServiceType');
            refcbxServiceType.validator = Ext.bind(this.txtValidator, this, [refcbxServiceType, "Service Type is required", ""]);

            var reftxtlocaddress = this.lookupReference('reftxtlocaddress');
            reftxtlocaddress.validator = Ext.bind(this.txtValidator, this, [reftxtlocaddress, "Location Address is required", ""]);

            var reftxtloccity = this.lookupReference('reftxtloccity');
            reftxtloccity.validator = Ext.bind(this.txtValidator, this, [reftxtloccity, "Location City is required", ""]);

            var refcbxLocationState = this.lookupReference('refcbxLocationState');
            refcbxLocationState.validator = Ext.bind(this.txtValidator, this, [refcbxLocationState, "Location State is required", ""]);

            // var reftxtlocZip = this.lookupReference('reftxtlocZip');
            // reftxtlocZip.validator = Ext.bind(this.txtValidator, this, [reftxtlocZip, "Location Zip is required","PADNUM",5]);

            this.getView().down("#frmcreatededitpharmacy").isValid();
            var view = this.getView();
            var vm = this.getViewModel();
            this.setformcontrolflag(true);

            var servicetypestore = vm.getStore('storepbmcreated');
            servicetypestore.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);

                }
            });


            var storeCarrierLOBs = vm.getStore('storeCarrierLOBs');
            storeCarrierLOBs.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);

                }
            });


        },


        comboxbox_multiselect: function (checkCombo, newValue, oldValue, eOpts) {

        },

        comboxbox_itemclick: function (list, record) {

        },
        onFocusLeave: function(combo, event){
            //debugger;
            if (!combo.value && combo.lastSelection){
                combo.suspendEvents(false);
                combo.setSelection(combo.lastSelectedRecords[0]);
                combo.resumeEvents();
            }
         },

        onpbmcreatedChange: function (combo, record) {
            //debugger;

            if (!record.data.NCPDPID) {
                this.getView().down('#cbxcreateeditusercreatedpharmacy').setValue("");
                record.data.NCPDPID = record.data.ncpdpId;
                if (combo.lastSelection)
                    combo.setValue(combo.lastSelection[0].data.ncpdpId + ' ' + combo.lastSelection[0].data.Name);
            }
            else {
                this.getView().down('#cbxcreateeditpharmacyprovidertype').setValue("");
                if (combo.lastSelection)
                    this.getView().down('#cbxcreateeditusercreatedpharmacy').setValue(combo.lastSelection[0].data.NCPDPID);
            }

            var view = this.getView();
            var vm = this.getViewModel();
            //vm.set('pbmcreated', record);
            var fieldList =
                "ncpdpid,npi,name,locCity,locState,locAddress1,locAddress2,locZip,mailAddress1,mailCity,mailState,mailZip," +
                "locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle," +
                "primDispTypeCode,dispClassCode,@PharmacyType,PharmacyAdditionalInfo.FWALockFlag,PharmacyAdditionalInfo.lockNote,PharmacyAdditionalInfo.FWALockLOB";

            var storepharmacymasterdata = vm.getStore('storepharmacymasterdata');
            storepharmacymasterdata.getProxy().setExtraParam('pKeyType', "ncpdpid");
            storepharmacymasterdata.getProxy().setExtraParam('pKeyValue', record.data.NCPDPID);
            storepharmacymasterdata.getProxy().setExtraParam('pFieldList', fieldList);
            storepharmacymasterdata.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText.toString().replace("@PharmacyType", "PharmacyType").replace(/PharmacyAdditionalInfo./g, "PharmacyAdditionalInfo"));
                    view.down("#frmcreatededitpharmacy").loadRecord(storepharmacymasterdata.last());
                    //debugger;
                    if (objResp.data) {
                        view.down("#btnAddRelationship").setDisabled(false);
                    }


                    var cbxPharmacyType = objResp.data[0].dispClassCode;
                    var pharmacyTypeIDs = cbxPharmacyType.split('^');
                    view.down("#cbxPharmacyType").setValue(pharmacyTypeIDs[1]);
                    view.down("#cbxPharmacyType").setRawValue(pharmacyTypeIDs[0]);
                    view.down("#txtcontactphone").setValue(Atlas.common.Util.formatPhone(objResp.data[0].locPhone));
                    view.down("#txtcontactfax").setValue(Atlas.common.Util.formatfax(objResp.data[0].locFax));
                    view.down("#txtnotes").setValue(objResp.data[0].PharmacyAdditionalInfolockNote);
                    view.down("#chkFWAPharmacylock").setValue(false);
                    var cbxServiceType = objResp.data[0].PharmacyType;
                    var cbxLineofBusiness = '';
                    try {
                        if (objResp.data[0].PharmacyAdditionalInfoFWALockLOB) {
                            view.down("#chkFWAPharmacylock").setValue(true);
                            this.checkbox_change({}, false);
                            cbxLineofBusiness = objResp.data[0].PharmacyAdditionalInfoFWALockLOB;
                        }

                    } catch (e) {

                    }

                    var selectedvalues = [];
                    var selectednames = [];


                    selectednames = [];
                    selectedvalues = [];
                    var serviceTypeIDs = cbxServiceType.split(',');
                    Ext.Array.each(serviceTypeIDs, function (value) {

                        var splitbypower = value.split('^');
                        Ext.Array.each(splitbypower, function (realvalue, index) {
                            if (index == 0)
                                selectednames.push(realvalue);
                            if (index == 1)
                                selectedvalues.push(realvalue);
                        });
                    });
                    view.down("#cbxServiceType").setValue(selectedvalues);
                    //view.down("#cbxServiceType").setRawValue(selectednames);

                    selectednames = [];
                    selectedvalues = [];
                    var lineofBusiness = cbxLineofBusiness.split(',');
                    Ext.Array.each(lineofBusiness, function (value) {
                        selectedvalues.push(value);
                    });
                    view.down("#cbxLineofBusiness").setValue(selectedvalues);
                    //view.down("#cbxLineofBusiness").setRawValue(selectednames);

                }
            });


            this.bindinitialstore(record.data.NCPDPID);
            this.setformcontrolflag(true);
            this.getView().down("#bbargroup").query('button').forEach(function (c) {
                if (c.text != "Save" && c.text != "Cancel")
                    c.setDisabled(false);
                else
                    c.setDisabled(true);
            });
        },


        btnCreateAPharmacyClick: function () {
            var view = this.getView();
            view.down("#frmcreatededitpharmacy").isValid();
            this.setformcontrolflag(false);
            view.down("#bbargroup").query('button').forEach(function (c) {
                if (c.text != "Save" && c.text != "Cancel")
                    c.setDisabled(true);
                else
                    c.setDisabled(false);
            });

            view.down("#frmcreatededitpharmacy").query('field').forEach(function (c) {
                c.setValue("");
            });
            this.checkbox_change({}, false);
            this.custompage_init.action = 'create';
            view.down("#txtnotes").setValue("");
            view.down("#displayFillIn").show();
            view.down("#btnAddRelationship").setDisabled(true)
            view.down("#cbxcreateeditusercreatedpharmacy").setValue("");
            view.down("#cbxcreateeditpharmacyprovidertype").setValue("");
            this.bindinitialstore(view.down("#textncpdpid").getValue());
            view.isNew = true;
        },

        bindinitialstore: function (ncpdpid) {
            var view = this.getView();
            var vm = this.getViewModel();
            var storePharmacyRelationShipDetail = vm.getStore('storePharmacyRelationShipDetail');
            if(ncpdpid) {
                storePharmacyRelationShipDetail.getProxy().setExtraParam('pKeyType', "ncpdpid");
                storePharmacyRelationShipDetail.getProxy().setExtraParam('pRowID', "0");
                storePharmacyRelationShipDetail.getProxy().setExtraParam('pRowNum', 0);
                storePharmacyRelationShipDetail.getProxy().setExtraParam('pBatchSize', 0);
                storePharmacyRelationShipDetail.getProxy().setExtraParam('pWhere', "NCPDPID='" + ncpdpid + "'");
                storePharmacyRelationShipDetail.getProxy().setExtraParam('pSort', "");
                storePharmacyRelationShipDetail.load();
            }
            else {
                storePharmacyRelationShipDetail.removeAll();
            }
        },

        btnCancelClick: function () {
            var view = this.getView();
            view.down("#frmcreatededitpharmacy").isValid();
            this.setformcontrolflag(true);
            view.down("#bbargroup").query('button').forEach(function (c) {
                if (c.text != "Create a Pharmacy" && c.text != "Edit" && c.text != "Delete")
                    c.setDisabled(true);
                else
                    c.setDisabled(false);
            });
            view.down("#txtnotes").setValue("");
            // view.down("#cbxcreateeditusercreatedpharmacy").setValue("");
            // view.down("#cbxcreateeditpharmacyprovidertype").setValue("");
            this.custompage_init.action = 'create';
            view.down("#btnAddRelationship").setDisabled(false);
            view.down("#displayFillIn").hide();
            if (view.isNew) {
                this.resetFields();
                view.isNew = false;
            }
        },

        resetFields: function () {
            var view = this.getView();
            var containerOne = view.down("#pnlGeneralPrescriberInfo");
            if (containerOne && containerOne.items) {

                containerOne.items.each(function (item1, index, length) {
                        if (item1.xtype != 'container')
                            item1.reset();
                    }
                )
            }


            var containerTwo = view.down("#pnlLocationInfo");
            if (containerTwo && containerTwo.items) {

                containerTwo.items.each(function (item2, index, length) {
                        if (item2.xtype != 'container')
                            item2.reset();
                    }
                )
            }

        },

        btnEditClick: function () {
            var view = this.getView();
            view.down("#frmcreatededitpharmacy").isValid();
            this.setformcontrolflag(false);
            view.down("#bbargroup").query('button').forEach(function (c) {
                if (c.text != "Save" && c.text != "Cancel")
                    c.setDisabled(true);
                else
                    c.setDisabled(false);
            });

            this.checkbox_change({}, view.down("#chkFWAPharmacylock").checked);
            view.down("#textnpi").setDisabled(true);
            view.down("#textncpdpid").setDisabled(true);
            view.down("#btnAddRelationship").setDisabled(false);
            this.custompage_init.action = 'update';
            view.down("#displayFillIn").show();
        },

        btnDeleteClick: function () {

            Ext.MessageBox.confirm('Delete Pharmacy', 'Are you sure you would like to delete pharmacy <b>' + this.getView().down("#textpharmacyname").getValue() + ' </b>?', function (btn) {
                if (btn === 'yes') {
                    this.custompage_init.action = 'delete';
                    this.btnSaveClick();
                }
                else {
                    this.btnCancelClick();
                    this.custompage_init.action = 'create';
                }
            }, this)

        },

        btnSaveClick: function () {
            var view = this.getView();

            if (view.down("#frmcreatededitpharmacy").isValid()) {
                if (!view.down("#textncpdpid").getValue()) {
                    view.down("#textncpdpid").setValue("");
                    return;
                }
                if (!view.down("#textnpi").getValue()) {
                    view.down("#textnpi").setValue("");
                    return;
                }
                if (!view.down("#textpharmacyname").getValue()) {
                    view.down("#textpharmacyname").setValue("");
                    return;
                }
                if (!view.down("#cbxPharmacyType").getValue()) {
                    view.down("#cbxPharmacyType").setValue("");
                    return;
                }
                if (!view.down("#cbxServiceType").getValue()) {
                    view.down("#cbxServiceType").setValue("");
                    return;
                }

                if (!view.down("#txtlocaddress").getValue()) {
                    return;
                }

                if (!view.down("#txtloccity").getValue()) {
                    return;
                }

                if (!view.down("#cbxLocationState").getValue()) {
                    return;
                }
                if (!view.down("#txtlocZip").getValue()) {
                    return;
                }


                var fieldListA = "ncpdpid,npi,name,legalbusinessname,locCity,locState,locAddress1,locZip,mailAddress1,mailCity,mailState,mailZip," +
                    "locPhone,locFax,locEmail,contactLastname,contactFirstname," +
                    "dispClassCode,PharmacyAdditionalInfo.FWALockFlag,PharmacyAdditionalInfo.lockNote,PharmacyAdditionalInfo.FWALockLOB,@Pharmacytype";

                var fieldListU = "name,legalbusinessname,locCity,locState,locAddress1,locZip,mailAddress1,mailCity,mailState,mailZip," +
                    "locPhone,locFax,locEmail,contactLastname,contactFirstname," +
                    "dispClassCode,PharmacyAdditionalInfo.FWALockFlag,PharmacyAdditionalInfo.lockNote,PharmacyAdditionalInfo.FWALockLOB";

                var preBlockarray = view.down("#cbxLineofBusiness").getValue();
                var preBlock = view.down("#chkFWAPharmacylock").getValue().toString();

                var cLockLOB = '';
                preBlockarray.forEach(function (item, index) {
                    if (!cLockLOB)
                        cLockLOB = item;
                    else
                        cLockLOB = cLockLOB + "," + item;
                });


                if (preBlock.toString().toLowerCase() == "true")
                    preBlock = "Yes";
                else
                    preBlock = "No";


                var singleinstance = '';
                if (view.down("#cbxServiceType").getValue())
                    singleinstance = view.down("#cbxServiceType").getValue()[0];

                var mailingaddress = '';
                if (view.down("#cbxMailingState").getValue())
                    mailingaddress = view.down("#cbxMailingState").getValue();

                var contactemail = '';
                if (view.down("#txtcontactemail").getValue())
                    contactemail = view.down("#txtcontactemail").getValue();


                var fieldsA = view.down("#textncpdpid").getValue() + "|" + view.down("#textnpi").getValue() + "|" + view.down("#textpharmacyname").getValue() + "|" + view.down("#textpharmacyname").getValue() + "|" +
                    view.down("#txtloccity").getValue() + "|" + view.down("#cbxLocationState").getValue() + "|" + view.down("#txtlocaddress").getValue() + "|" + view.down("#txtlocZip").getValue() +
                    "|" + view.down("#txtmailaddress").getValue() + "|" + view.down("#txtmailcity").getValue() + "|" + mailingaddress + "|" + view.down("#txtmailzip").getValue() +
                    "|" + Atlas.common.Util.unformatPhone(view.down("#txtcontactphone").getValue()) + "|" + Atlas.common.Util.unformatfax(view.down("#txtcontactfax").getValue()) +
                    "|" + contactemail + "|" + view.down("#txtcontactlastname").getValue() + "|" + view.down("#txtcontactfirstname").getValue() +
                    "|" + view.down("#cbxPharmacyType").getValue() + "|" + preBlock + "|" + view.down("#txtnotes").getValue() + "|" + cLockLOB + "|" + singleinstance;

                var fieldsU = view.down("#textpharmacyname").getValue() + "|" + view.down("#textpharmacyname").getValue() + "|" +
                    view.down("#txtloccity").getValue() + "|" + view.down("#cbxLocationState").getValue() + "|" + view.down("#txtlocaddress").getValue() + "|" + view.down("#txtlocZip").getValue() +
                    "|" + view.down("#txtmailaddress").getValue() + "|" + view.down("#txtmailcity").getValue() + "|" + mailingaddress + "|" + view.down("#txtmailzip").getValue() +
                    "|" + Atlas.common.Util.unformatPhone(view.down("#txtcontactphone").getValue()) + "|" + Atlas.common.Util.unformatfax(view.down("#txtcontactfax").getValue()) +
                    "|" + contactemail + "|" + view.down("#txtcontactlastname").getValue() + "|" + view.down("#txtcontactfirstname").getValue() +
                    "|" + view.down("#cbxPharmacyType").getValue() + "|" + preBlock + "|" + view.down("#txtnotes").getValue() + "|" + cLockLOB;


                var storeSetServiceTypeModel = Ext.create('Atlas.pharmacy.model.SetPharmacyMasterData');
                storeSetServiceTypeModel.getProxy().setExtraParam('pNPI', view.down("#textnpi").getValue());
                storeSetServiceTypeModel.getProxy().setExtraParam('pNCPDPID', view.down("#textncpdpid").getValue());

                if (this.custompage_init.action == 'create') {
                    storeSetServiceTypeModel.getProxy().setExtraParam('pMode', "A");
                    storeSetServiceTypeModel.getProxy().setExtraParam('pFieldList', fieldListA);
                    storeSetServiceTypeModel.getProxy().setExtraParam('pFields', fieldsA);

                } else if (this.custompage_init.action == 'delete') {
                    storeSetServiceTypeModel.getProxy().setExtraParam('pMode', "D");
                    storeSetServiceTypeModel.getProxy().setExtraParam('pFieldList', "");
                    storeSetServiceTypeModel.getProxy().setExtraParam('pFields', "");
                } else {
                    storeSetServiceTypeModel.getProxy().setExtraParam('pMode', "U");
                    storeSetServiceTypeModel.getProxy().setExtraParam('pFieldList', fieldListU);
                    storeSetServiceTypeModel.getProxy().setExtraParam('pFields', fieldsU);
                }
                storeSetServiceTypeModel.phantom = false;
                storeSetServiceTypeModel.save({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);

                        if (objResp.message[0].message != "Successful") {
                            Ext.MessageBox.show({
                                title: 'PBM',
                                msg: objResp.message[0].message,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                           return;
                        }


                        if (this.custompage_init.action == 'create') {
                            this.savePharmacyServiceType(view.down("#textncpdpid").getValue());
                            var servicetypestore = this.getViewModel().getStore('storepbmcreated');
                            servicetypestore.load({
                                scope: this,
                                failure: function (record, operation) {
                                },
                                success: function (record, operation) {
                                },
                                callback: function (record, operation, success) {

                                }
                            });


                            var record = {
                                data: {
                                    NCPDPID: view.down("#textncpdpid").getValue(),
                                    PharmacyName: view.down("#textpharmacyname").getValue()
                                }
                            };

                            view.down("#frmcreatededitpharmacy").query('field').forEach(function (c) {
                                c.setValue("");
                            });

                            this.onpbmcreatedChange({}, record);

                            view.down("#cbxcreateeditusercreatedpharmacy").setValue(record.data.NCPDPID);

                        }
                        else if (this.custompage_init.action == 'delete') {
                            var servicetypestore = this.getViewModel().getStore('storepbmcreated');
                            servicetypestore.load({
                                scope: this,
                                failure: function (record, operation) {
                                },
                                success: function (record, operation) {
                                },
                                callback: function (record, operation, success) {

                                }
                            });

                            var record = {
                                data: {
                                    NCPDPID: "",
                                    PharmacyName: ""
                                }
                            };
                            view.down("#frmcreatededitpharmacy").query('field').forEach(function (c) {
                                c.setValue("");
                            });
                            view.down("#cbxcreateeditusercreatedpharmacy").setValue(record.data.NCPDPID);
                            this.bindinitialstore(record.data.NCPDPID);
                        }
                        else {
                            this.savePharmacyServiceType(view.down("#textncpdpid").getValue());
                        }

                        if (objResp.message[0].code == 0) {
                            var  notes= view.down("#txtnotes").getValue();
                            this.btnCancelClick();
                            view.down("#txtnotes").setValue(notes);
                            view.down("#btnAddRelationship").setDisabled(false);

                            Ext.MessageBox.show({
                                title: 'PBM',
                                msg: 'Record has been saved',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });

                            if (view.isNew) {
                                view.isNew = false;
                            }

                        }
                    }
                });
            }
            else{
                Ext.Msg.alert('Validation Error', 'Please enter valid field values.');
            }


        },

        checkbox_change: function (checkbox, checked) {
            var view = this.getView();
            if (checked)
                view.down("#cbxLineofBusiness").setDisabled(false);
            else {
                view.down("#cbxLineofBusiness").setDisabled(true);
                view.down("#cbxLineofBusiness").setValue("");
            }

        },


        savePharmacyServiceType: function (ncpdid) {

            var view = this.getView();
            var varservicetype = view.down("#cbxServiceType").getValue();

            var ttServiceType = {};
            ttServiceType.ttServiceType = [];
            if (!view.down("#cbxServiceType").getValue())
                return;

            varservicetype.forEach(function (item, index) {
                var servicetype = {};
                servicetype.NCPDPID = ncpdid;
                servicetype.pharmacyType = item;
                servicetype.addDate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'Y/m/d');
                ttServiceType.ttServiceType.push(servicetype);
            });

            if (ttServiceType.ttServiceType.length == 0)
                return;

            var setpharmacyservicetypes = Ext.create('Atlas.pharmacy.model.setpharmacyservicetypes');
            setpharmacyservicetypes.getProxy().setExtraParam('ttServiceType', ttServiceType);
            setpharmacyservicetypes.phantom = false;
            setpharmacyservicetypes.save({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);
                }
            })
        },

        gpcreateeditpharmacy_itemclick: function (dv, record, item, index, e) {
            var view = this.getView();
            this.custompage_init.record = record;
            view.down("#btnAddRelationship").setDisabled(false);
            view.down("#btnUpdateRelationship").setDisabled(false);
            view.down("#btnDeleteRelationship").setDisabled(false);
        },

        gpcreateeditpharmacy_itemdblclick: function (dv, record, item, index, e) {
            var win = Ext.create({
                xtype: 'createeditpharmacy_popupaddrelationship',
                extraParams: {
                    'pRecord': record,
                    'pNCPDID': this.getView().down("#textncpdpid").getValue()
                },
                listeners: {
                    refreshgrid: 'refreshgrid'
                }
            });
            win.show(this);
        },

        btnAddRelationship: function () {
            var view = this.getView();
            view.down("#btnAddRelationship").setDisabled(false);
            view.down("#btnUpdateRelationship").setDisabled(true);
            view.down("#btnDeleteRelationship").setDisabled(true);
            this.custompage_init.record = {};
            // var controller = Ext.create('Atlas.authorization.view.PopupAddRelationShipController');
            //  controller.fireEvent('createeditpharmacy_popupaddrelationshipcontroller_search',view.down("#textncpdpid").getValue());
            var win = Ext.create({
                xtype: 'createeditpharmacy_popupaddrelationship',
                extraParams: {
                    'pRecord': {},
                    'pNCPDID': view.down("#textncpdpid").getValue()
                }
            });
            win.show(this);
        },

        btnUpdateRelationship: function () {

            var win = Ext.create({
                xtype: 'createeditpharmacy_popupaddrelationship',
                extraParams: {
                    'pRecord': this.custompage_init.record,
                    'pNCPDID': this.getView().down("#textncpdpid").getValue()
                },
                listeners: {
                    refreshgrid: 'refreshgrid'
                }
            });
            win.show(this);
        },

        btnDeleteRelationship: function () {
            Ext.MessageBox.confirm('Delete ', 'Are you sure you would like to delete this record ?', function (btn) {
                if (btn === 'yes') {


                    var setpharmacyrelationship = Ext.create('Atlas.pharmacy.model.setpharmacyrelationship');
                    setpharmacyrelationship.getProxy().setExtraParam('pSystemId', this.custompage_init.record.data.SystemID);
                    setpharmacyrelationship.getProxy().setExtraParam('pNCPDPID', this.getView().down("#textncpdpid").getValue());
                    setpharmacyrelationship.getProxy().setExtraParam('pRelationshipID', this.custompage_init.record.data.RelationShipId);
                    setpharmacyrelationship.getProxy().setExtraParam('pPayCenterID', this.custompage_init.record.data.PaycenterID);
                    setpharmacyrelationship.getProxy().setExtraParam('pEffDate', this.custompage_init.record.data.PharEffDate);
                    setpharmacyrelationship.getProxy().setExtraParam('pTermDate', this.custompage_init.record.data.PharTermdate);
                    setpharmacyrelationship.getProxy().setExtraParam('pRemitAndReconId', this.custompage_init.record.data.remitAndReconId);
                    setpharmacyrelationship.getProxy().setExtraParam('pMode', "D");
                    setpharmacyrelationship.phantom = false;
                    setpharmacyrelationship.save({
                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {

                            var objResp = Ext.decode(operation.getResponse().responseText);
                            var record = {
                                data: {
                                    NCPDPID: this.getView().down("#textncpdpid").getValue()
                                }
                            };
                            this.onpbmcreatedChange({}, record);
                            this.custompage_init.record = {};
                        }
                    });
                }
                else {
                    this.custompage_init.record = {};
                }
            }, this)
        }
    }
);

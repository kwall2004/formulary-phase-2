Ext.define('Atlas.benefitplan.view.configuration.ConfigurationAddressController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-configurationaddresscontroller',
    init: function() {
        //create an empty array to hold the addresses that will need to be sent to the API for update or create
        this.addressqueue = [];
        this.failaddressqueue = [];
    },
    loadDemoStore: function(entityType, ParentSK, basicDetailsParentTitle) {
        var me = this;
        if(entityType != 10) {
            me.getView().down("[itemId='copyDemographicsSection']").show();
            //load the demographic dropdown data
            var demostore = me.getViewModel().getStore('demographiclist');
            demostore.getProxy().setExtraParams({});
            demostore.getProxy().setExtraParam("EntityType", entityType - 10);
            demostore.getProxy().setExtraParam("lookupId", ParentSK);
            demostore.load(function () {
                var myRecordDef = Ext.create('Atlas.benefitplan.model.EntityAddress', {
                    Value: ParentSK,
                    Text: basicDetailsParentTitle
                });
                demostore.insert(demostore.data.length, myRecordDef);
                me.getView().getComponent('addresssection').getComponent('addressselectionsection').getComponent('copyDemographicsSection').getComponent('demographicselection').setValue(ParentSK);
            });
        }
    },
    initializeData: function(entityType, entityTypeSK){
        this.entityType = entityType;
        this.entityTypeSK = entityTypeSK;
    },
    loadData: function(){
        var me = this,
            vm = me.getViewModel();
        //load the address dropdown
        var addressliststore = vm.getStore('addresslist');
        addressliststore.getProxy().setExtraParams({});
        addressliststore.getProxy().setExtraParam('EntityType', me.entityType);
        addressliststore.getProxy().setExtraParam('EntityTypeSK', me.entityTypeSK);
        addressliststore.load(function (records) {
            //load the "current" address
            me.loadAddress(0, function (addressId) {
                me.fireEvent('selectTreeNode',{EntityId:me.entityTypeSK,EntityType:me.entityType});
                me.fireEvent('setActiveFlag');
                //select the "current" address in the dropdown
                vm.set('changedAddress', vm.get('changedAddress') || me.getView().down("form[itemId='addresssection']").isDirty());
                me.getView().up('[itemId="configuration-detail-section"]').down('panel').getViewModel().set('changed', me.getView().up('[itemId="configuration-detail-section"]').down('form[itemId="detailsection"]').isDirty() || me.getView().down("form[itemId='addresssection']").isDirty() || me.getView().up('[itemId="configuration-detail-section"]').down('panel').getViewModel().get('tenantHierarchyEntityId') == 0);
                if (records.length > 0) {
                    me.getView().getComponent('addresssection').getComponent('addressselectionsection').getComponent('addressselection').setValue(addressId);
                    vm.set('emptyAddressList', false);
                } else {
                    vm.set('emptyAddressList', true);
                }
            });
        });
    },
    onAddressListSelect: function (combo, record) {
        var me = this;
        if (me.getViewModel().get("changedAddress")) {
            var form = me.getView().down("form[itemId='addresssection']").getForm(),
                recordToQueue = form.getRecord();
            form.updateRecord(recordToQueue); // update the record with the form data
            me.addressqueue.push(recordToQueue);//I know if it is added or updated based on id... 0 for added
        }
        me.loadAddress(record.data.Value);
    },
    saveAddresses: function(isNewEntity, newEntityId, EfctvStartDt, EfctvEndDt) {
        var me = this,
            vm = me.getViewModel(),
            addressform = me.getView().down("form[itemId='addresssection']").getForm(),
            addrrecord = me.addressqueue[0];
        if (isNewEntity) {
            addrrecord.set("EntityTypeSK", newEntityId);
        }
        addrrecord.set("EntityEfctvStartDt", EfctvStartDt);
        addrrecord.set("EntityEfctvEndDt", EfctvEndDt);
        addrrecord.set("CurrentUser", vm.get('user').un);
        addrrecord.getProxy().setExtraParams({});
        addrrecord.save({ // save the record to the server
            success: function (results, operation) {
                if (results.data.success == "false") {
                    me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().messageArray.push({record: addrrecord.data.AddrLine1 + ' (' + addrrecord.data.EfctvStartDt + ')',
                        title: 'Failed to Save',
                        message: 'Address data failed to save: ' + results.data.messages.map(function (elem) {
                            return elem.name;
                        }).join(",") + '.'
                    });
                    me.failaddressqueue.push(addrrecord);
                    me.addressqueue.shift();
                    me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().processSaveMessage();
                } else {
                    me.addressqueue.shift();
                    me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().messageArray.push({
                        record: addrrecord.data.AddrLine1 + ' (' + addrrecord.data.EfctvStartDt + ')',
                        title: 'Success',
                        message: 'Address data saved successfully'
                    });
                    me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().processSaveMessage();
                    if (addrrecord.get("EfctvEndDt") > me.currentAddressEfctvEndDt) {
                        me.currentAddressEfctvStartDt = addrrecord.get("EfctvStartDt");
                        me.currentAddressEfctvEndDt = addrrecord.get("EfctvEndDt");
                    }
                    if (addressform.getRecord().get("EntityTypeAddressSK") == 0 && me.addressqueue.length == 0) {
                        var responsedata = JSON.parse(operation.getResponse().responseText);
                        var responseAddressId = responsedata["id"][0];
                        addressform.getRecord().set("EntityTypeAddressSK", responseAddressId);
                        var addressliststore = vm.getStore('addresslist');
                        addressliststore.getProxy().setExtraParams({});
                        addressliststore.getProxy().setExtraParam('EntityType', me.entityType);
                        if(isNewEntity) {
                            addressliststore.getProxy().setExtraParam('EntityTypeSK', newEntityId);
                        } else {
                            addressliststore.getProxy().setExtraParam('EntityTypeSK', vm.get('tenantHierarchyEntityId'));
                        }
                        vm.set('emptyAddressList', false);
                    }
                    if(me.addressqueue.length > 0) {
                        me.saveAddresses(isNewEntity, newEntityId, EfctvStartDt, EfctvEndDt);
                    } else {
                        me.loadData(me.entityType, me.entityTypeSK);
                    }
                    vm.set("changedAddress", false);
                    if (isNewEntity) {
                        if (me.entityType == 10) {
                            me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().reloadTree(newEntityId, me.entityType, newEntityId);
                        } else {
                            me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().reloadTree(newEntityId, me.entityType, vm.get('rootsk'));
                        }
                        vm.set('EntityId', newEntityId);
                    } else {
                        me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().reloadTree(vm.get('tenantHierarchyEntityId'), me.entityType, vm.get('rootsk'));
                    }
                }
            },
            failure: function (results, operation) {
                var responsedata = JSON.parse(operation.getResponse().responseText);
                me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().messageArray.push({
                    record: addrrecord.data.AddrLine1 + ' (' + addrrecord.data.EfctvStartDt + ')',
                    title: 'Failed to Save',
                    message: 'Address data failed to save: ' + responsedata.messages.map(function (elem) {
                        return elem.message;
                    }).join(",") + '.'
                });
                me.failaddressqueue.push(addrrecord);
                me.addressqueue.shift();
                me.getView().up('[itemId="configuration-detail-section"]').down('panel').getController().processSaveMessage();
            }
        });
    },
    onAddressCancelClick: function () {
//cancel address needs to reset addr sel dropdown and demolist
//cancel of new address on new entity is just plain wrong
        var me = this,
            entityAddressId = me.getView().down("form[itemId='addresssection']").getForm().getRecord().data.EntityTypeAddressSK;
        if (entityAddressId == 0) {
            me.loadAddress(0, function (addressId) {
                me.getView().getComponent('addresssection').getComponent('addressselectionsection').getComponent('addressselection').setValue(addressId);
            });
        } else if (entityAddressId != null && entityAddressId != undefined) {
            me.getView().down("form[itemId='addresssection']").getForm().reset();
        } else {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Invalid EntityTypeAddressSK value in record.',
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
    },
    createNewAddress: function (efctvStartDt, efctvEndDt) {
        efctvStartDt = (efctvStartDt != null && efctvStartDt != undefined) ? efctvStartDt : '';
        efctvEndDt = (efctvEndDt != null && efctvEndDt != undefined) ? efctvEndDt : '';
        var record = Ext.create('Atlas.benefitplan.model.Address', {
            //$id : '',
            EntityType: this.entityType,
            EntityTypeAddressSK: 0,
            EntityTypeSK: this.getViewModel().get('tenantHierarchyEntityId'),
            EntityEfctvStartDt: this.getView().up('[itemId="configurationviewtop"]').down("form[itemId='detailsection']").getComponent('detailsectionfieldset').getComponent('EfctvStartDt').getValue(),
            EntityEfctvEndDt: this.getView().up('[itemId="configurationviewtop"]').down("form[itemId='detailsection']").getComponent('detailsectionfieldset').getComponent('EfctvEndDt').getValue(),
            AddrSK: '0',
            EfctvStartDt: (efctvStartDt != undefined) ? efctvStartDt : '', /*The Effective Start Date will auto-populate as the day after the previous address's termination date, */
            EfctvEndDt: (efctvEndDt != undefined) ? efctvEndDt : '', /*    and the termination date for the address will default to the termination date of the Group. */
            AddrLine1: '',
            AddrLine2: '',
            City: '',
            StPrvncCodeSK: '',
            PostalCode: '',
            ISOCntryCodeSK: '1'//default to USA
        });
        this.currentAddressEfctvStartDt = efctvStartDt;
        this.currentAddressEfctvEndDt = efctvEndDt;
        this.getView().down("form[itemId='addresssection']").loadRecord(record);
        this.getView().up('[itemId="configuration-detail-section"]').down('panel').getViewModel().set('validforms', false);
        this.getViewModel().set("countrySelected", true);
        this.loadProvinces(1);
        this.getViewModel().set("changedAddress", true);
    },
    onAddressAddClick: function () {
        var me = this;
        var thisDate = null;
        if (me.currentAddressEfctvEndDt != undefined) {
            thisDate = new Date(me.currentAddressEfctvEndDt);
        } else {
            thisDate = new Date(me.getView().getComponent('addresssection').getComponent('addresssection').getComponent('EfctvStartDt').getValue());
        }
        thisDate.setDate(thisDate.getDate() + 1);
        if (me.getViewModel().get("changedAddress")) {
            var form = me.getView().down("form[itemId='addresssection']").getForm(); // get the form panel
            var recordToQueue = form.getRecord();
            form.updateRecord(recordToQueue); // update the record with the form data
            me.addressqueue.push(recordToQueue);//I know if it is added or updated based on id... 0 for added
            me.createNewAddress(thisDate, new Date(me.getView().up('[itemId="configurationviewtop"]').down("form[itemId='detailsection']").getComponent('detailsectionfieldset').getComponent('EfctvEndDt').getValue()));
        } else {
            me.createNewAddress(thisDate, new Date(me.getView().up('[itemId="configurationviewtop"]').down("form[itemId='detailsection']").getComponent('detailsectionfieldset').getComponent('EfctvEndDt').getValue()));
        }
        var addressSection = me.getView().getComponent('addresssection').getComponent('addresssection');
        addressSection.getComponent('AddrLine1').focus();
    },
    findEntityIndex: function (arraytosearch, key, valuetosearch) {
        for (var i = 0; i < arraytosearch.length; i++) {
            if (arraytosearch[i].data[key] == valuetosearch) {
                return i;
            }
        }
        return -1;
    },
    loadCountriesProvinces: function (record, callback) {
        var me = this,
            countryId = record.data.ISOCntryCodeSK;
        if (countryId != null && countryId != undefined) {
            me.getView().down("form[itemId='addresssection']").loadRecord(record);
            me.getViewModel().set("countrySelected", true);
            me.loadProvinces(countryId, function () {
                me.getViewModel().set("changedAddress", false);
                if (callback != undefined) {
                    callback(record.data.EntityTypeAddressSK);
                }
            });
        } else {
            me.getViewModel().set("changedAddress", false);
            if (callback != undefined) {
                callback(record.data.EntityTypeAddressSK);
            }
        }
    },
    loadAddress: function (EntityAddressId, callback) {
        var me = this,
            indexofaddressqueuerecord = me.findEntityIndex(me.addressqueue, "EntityTypeAddressSK", EntityAddressId);
        if (indexofaddressqueuerecord > -1) {
            var record = me.addressqueue[indexofaddressqueuerecord];
            me.addressqueue.slice(indexofaddressqueuerecord, indexofaddressqueuerecord + 1);
            me.loadCountriesProvinces(record, callback);
        } else {
            var addressstore = me.getViewModel().getStore('address');
            addressstore.getProxy().setExtraParams({});
            addressstore.getProxy().setExtraParam('EntityType', me.entityType);
            addressstore.getProxy().setExtraParam('EntityTypeSK', me.entityTypeSK);
            addressstore.getProxy().setExtraParam('EntityTypeAddrSK', EntityAddressId);
            addressstore.load(function (records) {
                if (records.length == 1) {
                    if (EntityAddressId == 0) {
                        me.currentAddressEfctvStartDt = records[0].data.EfctvStartDt;
                        me.currentAddressEfctvEndDt = records[0].data.EfctvEndDt;
                    }
                    if(me.entityType != 10) {
                        //load the demo dropdown
                        me.getView().down("[itemId='copyDemographicsSection']").show();
                        var demostore = me.getViewModel().getStore('demographiclist');
                        demostore.getProxy().setExtraParams({});
                        demostore.getProxy().setExtraParam("EntityType", me.entityType);
                        demostore.getProxy().setExtraParam("lookupId", me.entityTypeSK);
                        demostore.load(function () {
                            if (demostore.data) {
                                var lastvalue = demostore.data.items[demostore.data.items.length - 1].data.Value;
                                me.getView().getComponent('addresssection').getComponent('addressselectionsection').getComponent('copyDemographicsSection').getComponent('demographicselection').setValue(lastvalue);
                            }
                        });
                    }
                    me.loadCountriesProvinces(records[0], callback);
                } else if (records.length > 1) {
                    Ext.Msg.show({
                        title: 'Error',
                        msg: 'Found ' + records.length + 'records, but expected 1.',
                        buttons: Ext.Msg.OK,
                        closable: false,
                        draggable: false,
                        resizable: false
                    });
                }
            });
        }
    },
    loadProvinces: function (countryId, callback) {
        var provincestore = this.getViewModel().getStore('provinces');
        provincestore.getProxy().setExtraParams({});
        provincestore.getProxy().setExtraParam('isoCountryCodeSK', countryId);
        provincestore.load(function () {
            if (callback != undefined) {
                callback();
            }
        });
    },
    onCountrySelected: function (combo, record) {
        this.getView().getComponent('addresssection').getComponent('addresssection').getComponent('stateprovince').setValue('');
        this.getViewModel().set("countrySelected", true);
        this.loadProvinces(record.data.ISOCntryCodeSK);
    },
    onCopyDemographicInformationClick: function () {
        //overwrite whatever is showing.. dont worry about queuing or loading or anything
        var me = this,
            demoSel = me.getView().getComponent('addresssection').getComponent('addressselectionsection').getComponent('copyDemographicsSection').getComponent('demographicselection'),
            levelChoice = demoSel.getValue(),
            levelText = demoSel.selection.data.Text;
        var entityTypeChoice = 10;
        if (levelText == 'Tenant') {
            entityTypeChoice = 20;
        }
        else if (levelText == 'Account') {
            entityTypeChoice = 30;
        }
        else if (levelText == 'Group') {
            entityTypeChoice = 40;
        }
        var addressstore = me.getViewModel().getStore('address');
        addressstore.getProxy().setExtraParams({});
        addressstore.getProxy().setExtraParam('EntityType', entityTypeChoice);
        addressstore.getProxy().setExtraParam('EntityTypeSK', levelChoice);
        addressstore.getProxy().setExtraParam('EntityTypeAddrSK', 0);
        addressstore.load(function (records) {
            if (records.length == 1) {
                var addressSection = me.getView().getComponent('addresssection').getComponent('addresssection');
                addressSection.getComponent('AddrLine1').setValue(records[0].data.AddrLine1);
                addressSection.getComponent('AddrLine2').setValue(records[0].data.AddrLine2);
                addressSection.getComponent('City').setValue(records[0].data.City);
                addressSection.getComponent('stateprovince').setValue(records[0].data.StPrvncCodeSK);
                addressSection.getComponent('PostalCode').setValue(records[0].data.PostalCode);
                addressSection.getComponent('country').setValue(records[0].data.ISOCntryCodeSK);
                if (records[0].data.ISOCntryCodeSK != 1) {
                    me.loadProvinces(records[0].data.ISOCntryCodeSK);
                }
            } else if (records.length > 1) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: 'Found ' + records.length + 'records, but expected 1.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });
            }
        });
    },
    onAddressItemChanged: function (field) {
        var vm = this.getViewModel();
        if(field.name == 'EfctvStartDt') {
            this.currentAddressEfctvStartDt = field.getValue();
        } else
        if(field.name == 'EfctvEndDt') {
            this.currentAddressEfctvEndDt = field.getValue();
        }
        vm.set('changedAddress', vm.get('changedAddress') || this.getView().down("form[itemId='addresssection']").isDirty());
        this.getView().up('[itemId="configuration-detail-section"]').down('panel').getViewModel().set('changed', this.getView().up('[itemId="configuration-detail-section"]').down('form[itemId="detailsection"]').isDirty() || this.getView().down("form[itemId='addresssection']").isDirty() || this.getView().up('[itemId="configuration-detail-section"]').down('panel').getViewModel().get('tenantHierarchyEntityId') == 0);
        vm.set('validaddressform', (this.getView().down("form[itemId='addresssection']").isValid()));
        this.getView().up('[itemId="configuration-detail-section"]').down('panel').getViewModel().set('validforms', this.getView().up('[itemId="configuration-detail-section"]').down('form[itemId="detailsection"]').isValid() && this.getView().down("form[itemId='addresssection']").isValid() &&
            (this.getView().up('[itemId="configurationviewtop"]').down("[itemId='tenantIndustryIdentifier-grid']") == undefined || this.getView().up('[itemId="configurationviewtop"]').down("[itemId='tenantIndustryIdentifier-grid']").getController().isGridValid()) &&
            (this.getView().up('[itemId="configurationviewtop"]').down("[itemId='accountIndustryIdentifier-grid']") == undefined || this.getView().up('[itemId="configurationviewtop"]').down("[itemId='accountIndustryIdentifier-grid']").getController().isGridValid())
        );
    }
});
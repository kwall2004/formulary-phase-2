/**
 * Created by t3852 on 11/8/2016.
 */
Ext.define('Atlas.portals.registration.HPProviderRegistrationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hpproviderregistration',

    init: function () {
        var thisWindow = this.getView(),
            stateItemsStore = this.getViewModel().getStore('states');

        this.getViewModel().set('npiList', []);
        this.getViewModel().set('locationList', []);
        Ext.on('resize', function () {
            thisWindow.center();
        });

        stateItemsStore.getProxy().setExtraParam('userState', this.getViewModel().get('userState'));
        stateItemsStore.load();
    },

    getListItems: function () {
        var me = this,
            vm = me.getViewModel(),
            listItemsStore = vm.getStore('listItems');

        listItemsStore.getProxy().setExtraParam('pListName', 'MemberPortalPlanLOB');
        listItemsStore.getProxy().setExtraParam('userState', vm.get('userState'));

        listItemsStore.load({
            callback: function (response, operation) {
                var listItemsMetaData = listItemsStore.getProxy().getReader().metaData,
                    listItems = listItemsMetaData.pListItems.split('^'),
                    listItemsObj = [],
                    planCombo = me.lookupReference('planList');

                var planListStore = new Ext.data.Store({
                    fields: [
                        'planList'
                    ]
                });

                for (var i = 0; i < listItems.length; i += 2) {
                    listItemsObj.push({name: listItems[i], value: listItems[i+1]});
                }
                
                planListStore.loadData(listItemsObj);
                planCombo.setStore(planListStore);
                planCombo.select(planCombo.getStore().getAt(0));
            }
        });
    },

    getStates: function () {
        var me = this,
            stateCombo = me.lookupReference('stateCombo');

        var stateStore = Ext.data.Store({
            fields: ['name', 'value'],
            data : [
                {"name":"MI", "value":"MI"},
                {"name":"IL", "value":"IL"}
            ]
        });

        stateCombo.setStore(stateStore);
    },

    registerUser: function () {
        var me = this,
            vm = this.getViewModel(),
            selectedLocationGrid = this.lookup('selectedLocationGrid').getStore('selectedlocations').data.items,
            npiListGrid = this.lookup('npiListGrid').getStore('npilist').data.items,
            registrationForm = this.lookup('registrationForm'),
            registrationModel = Ext.create('Atlas.portals.provider.model.ProviderGrPreqData', {});

        if (registrationForm.isValid() == true) {
            var i,
                formValues = registrationForm.getValues(),
                pFieldList = 'Description,Address1,Address2,City,State,Zip,ContactFirstName,ContactLastName,Email,Phone,' +
                    'Fax,numberOfUsers,Comments,requestSource,requestType',
                pFields,
                pNPIList = npiListGrid[0].data.npiNumber.toString(),
                pNPIidFlag = 'FALSE',
                pMode,
                pUserName = 'User Registration',
                locationIds = [];

            for (i = 1; i < npiListGrid.length; i++) {
                pNPIList += ',' + npiListGrid[i].data.npiNumber.toString();
            }

            for (i = 0; i < selectedLocationGrid.length; i++) {
                locationIds.push(selectedLocationGrid[i].data.locationID.toString());
            }

            if (formValues.otherProviderCheckBox == 'on') {
                pMode = '|LTSS';
                pFieldList += ',groupType';
            } else {
                pMode = ''
            }

            pFields = formValues.providerGroupName + '|' + formValues.addressOne + '|' + formValues.addressTwo + '|' +
                formValues.city + '|' + formValues.state + '|' + formValues.zip + '|' + formValues.firstName + '|' +
                formValues.lastName + '|' + formValues.email + '|' + formValues.phone + '|' + formValues.fax + '|' +
                formValues.requiredUsers + '|' + 'New Provider Group Registration Request from the Web Portal.' +
                formValues.comments + '|2|1' + pMode;

            registrationModel.phantom = false;
            registrationModel.getProxy().url = 'system/hp/providergrpreqdataweb';
            registrationModel.getProxy().setExtraParam('pRequestId','0');
            registrationModel.getProxy().setExtraParam('pFieldList',pFieldList);
            registrationModel.getProxy().setExtraParam('pFields',pFields);
            registrationModel.getProxy().setExtraParam('pNPIList',pNPIList);
            registrationModel.getProxy().setExtraParam('pNPIidFlag','FALSE');
            registrationModel.getProxy().setExtraParam('pMode',pMode);
            registrationModel.getProxy().setExtraParam('pLocationList',locationIds.join(','));
            registrationModel.getProxy().setExtraParam('pUserName','User Registration');
            registrationModel.getProxy().setExtraParam('userState', vm.get('userState'));
            registrationModel.save({
                scope: me,
                success: function () {
                    Ext.MessageBox.alert('Confirm', 'Your request has been sent to Meridian Health Plan Web Site. ' +
                        'As soon as your account is activated, you will receive an email with your user name, and then ' +
                        'a separate email with your initial password. Please note that it may take 24-48 hours before ' +
                        'you receive the email.');
                    this.closeView();
                }
            });
        } else {
            Ext.MessageBox.alert('Validation Error', 'Please fill out all the required fields before registering.');
        }
    },

    addNPI: function () {
        var me = this,
            vm = me.getViewModel(),
            npiValidationModel = Ext.create('Atlas.portals.provider.model.ValidateProviderNPI', {}),
            npiInput = me.lookup('registrationForm').getValues().idField,
            npiGrid = me.lookup('npiListGrid').getStore('npilist'),
            npiGridData = npiGrid.getData(),
            otherNetwork = me.lookup('otherProviderCheckBox').getValue();

        if (npiInput !== "") {
            npiValidationModel.phantom = false;
            npiValidationModel.getProxy().url = 'provider/hp/validateprovidernpi';

            if (otherNetwork == false) {
                npiValidationModel.getProxy().setExtraParam('pMode','innetwork');
            } else {
                npiValidationModel.getProxy().setExtraParam('pMode','LTSS');
            }
            npiValidationModel.getProxy().setExtraParam('pNPI',npiInput);
            npiValidationModel.getProxy().setExtraParam('userState', vm.get('userState'));
            npiValidationModel.save({
                success: function (response,operation) {
                    var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
                        fields = metadata.pFields,
                        result = metadata.pResult,
                        splitFields = fields.split('|'),
                        npiNumber = splitFields[2],
                        firstName = splitFields[0],
                        lastName = splitFields[1],
                        npiDuplicate = false,
                        npiListGridData = vm.get('npiList');

                    if (fields === "") {
                        Ext.MessageBox.alert('Inclusion Failed', result);
                    } else {
                        for (var i = 0;i < npiGridData.items.length;i++) {
                            var npiInputGrid = npiGridData.items[i].getData().npiInput;

                            if (npiInputGrid === npiInput) {
                                npiDuplicate = true
                            }
                        }

                        if (npiDuplicate === false) {
                            var provLocStore = vm.getStore('provloc'),
                                locationsArray = vm.get('locationList');

                            provLocStore.getProxy().setExtraParam('pRowNum', 0);
                            provLocStore.getProxy().setExtraParam('pRows', 50);
                            provLocStore.getProxy().setExtraParam('pWhere', ' provID=' + npiNumber);
                            provLocStore.getProxy().setExtraParam('userState', vm.get('userState'));

                            provLocStore.load({
                                callback: function (response) {
                                    var tempLocationId = null,
                                        tempLocationsArray = [];

                                    for (var i = 0; i < response.length; i++) {
                                        var location = response[i].data,
                                            locationId = response[i].data.locationID;

                                        if (tempLocationId === null || locationId !== tempLocationId) {
                                            locationsArray.push(location);
                                            tempLocationsArray.push(location);
                                        }

                                        tempLocationId = locationId
                                    }

                                    npiListGridData.push({
                                        npiInput: npiInput,
                                        firstName: firstName,
                                        lastName: lastName,
                                        npiNumber: npiNumber,
                                        availableLocations: tempLocationsArray
                                    });

                                    npiGrid.setData(npiListGridData);
                                    vm.set('npiList', npiListGridData);
                                    me.lookup('availableLocationsGrid').getStore('availablelocations').setData(locationsArray);
                                    vm.set('locationList', locationsArray);
                                }
                            });
                        } else {
                            Ext.MessageBox.alert('Duplicate Entry','NPI has already been added.');
                        }
                    }
                },
                failure: function() {
                    Ext.MessageBox.alert('Request Failed', 'Internal Server Error.');
                }
            });
        } else {
            Ext.MessageBox.alert('Empty Field', 'Please add an NPI number to include.');
        }
    },

    changeHealthProvider: function (checkbox, newValue, oldValue, eOpts) {
        if (newValue == true) {
            this.lookup('idField').setFieldLabel('Medicaid ID');
        } else {
            this.lookup('idField').setFieldLabel('NPI Number');
        }
    },

    getProviderLocations: function (npiListGridData) {
        var me = this,
            vm = me.getViewModel(),
            provLocStore = vm.getStore('provloc'),
            locationsArray = [];

        provLocStore.getProxy().setExtraParam('pRowNum', 0);
        provLocStore.getProxy().setExtraParam('pRows', 50);
        provLocStore.getProxy().setExtraParam('pWhere', ' provID=' + npiListGridData[0].npiNumber);
        provLocStore.getProxy().setExtraParam('userState', vm.get('userState'));

        provLocStore.load({
            callback: function (response) {
                var tempLocationId = null;

                for (var i = 0; i < response.length; i++) {
                    var location = response[i].data,
                        locationId = response[i].data.locationID;

                    if (tempLocationId === null || locationId !== tempLocationId) {
                        locationsArray.push(location);
                    }

                    tempLocationId = locationId
                }
                me.lookup('availableLocationsGrid').getStore('availablelocations').setData(locationsArray);
            }
        });
    },

    clearForm: function () {
        this.lookupReference('registrationForm').reset();
    },

    onRemoveFromListClick: function() {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookup('npiListGrid'),
            gridStore = grid.getStore(),
            gridData = gridStore.getData(),
            selection = grid.getView().getSelectionModel().getSelection()[0],
            availableLocationsGrid = me.lookup('availableLocationsGrid'),
            availableLocationsGridStore = availableLocationsGrid.getStore(),
            availableLocationsGridData = availableLocationsGridStore.getData(),
            locationsToRemove = [],
            tempAvailableLocObjectArray = [],
            tempNPIList = [];

        if (selection !== undefined) {
            gridStore.remove(selection);

            for (var i = 0;i < gridData.items.length;i++) {
                var currentNPIData = gridData.items[i].getData();

                tempNPIList.push({
                    npiInput: currentNPIData.npiInput,
                    firstName: currentNPIData.firstName,
                    lastName: currentNPIData.lastName,
                    npiNumber: currentNPIData.npiNumber,
                    availableLocations: tempAvailableLocObjectArray
                });
            }

            vm.set('npiList', tempNPIList);

            for (var k=0;k<availableLocationsGridData.items.length;k++) {
                var currentLocation = availableLocationsGridData.items[k],
                    selectionLocations = selection.data.availableLocations;

                for (var j = 0;j<selectionLocations.length;j++) {
                    if (selectionLocations[j].locationID === currentLocation.data.locationID) {
                        locationsToRemove.push(currentLocation);
                    }
                }
            }

            for (var l=0;l<locationsToRemove.length;l++) {
                availableLocationsGridStore.remove(locationsToRemove[l]);
            }

            for (var m = 0;m < availableLocationsGridData.items.length;m++) {
                var currentLocationData = availableLocationsGridData.items[m].getData();

                tempAvailableLocObjectArray.push({
                    "locationAddr":currentLocationData.address,
                    "locationCSZ":currentLocationData.csz,
                    "locationDesc":currentLocationData.name,
                    "locationID":currentLocationData.locationID
                });
            }

            vm.set('locationList',tempAvailableLocObjectArray);
        } else {
            Ext.MessageBox.alert('Exclusion Failed','Please select an NPI from the grid below to exclude.');
        }
    },

    onPreviousClick: function() {
        var nextBtn = this.lookup('regNext'),
            prevBtn = this.lookup('regPrev'),
            submitBtn = this.lookup('regSubmit'),
            form = this.lookup('registrationForm'),
            activeItem = form.getLayout().getActiveItem(),
            activeItemIndex = form.items.indexOf(activeItem);

        form.setActiveItem(activeItemIndex - 1);
        this.getView().center();

        submitBtn.setDisabled(true);
        nextBtn.setDisabled(false);

        if (activeItemIndex <= 1) {
            prevBtn.setDisabled(true);
        } else {
            prevBtn.setDisabled(false);
        }
    },

    onNextClick: function() {
        var me = this,
            nextBtn = me.lookup('regNext'),
            prevBtn = me.lookup('regPrev'),
            submitBtn = me.lookup('regSubmit'),
            form = me.lookup('registrationForm'),
            activeItem = form.getLayout().getActiveItem(),
            activeItemIndex = form.items.indexOf(activeItem),
            selectedLocationGrid = me.lookup('selectedLocationGrid').getStore('selectedlocations').data.items,
            npiListGrid = me.lookup('npiListGrid').getStore('npilist').data.items;

        // handle validations
        if (activeItemIndex == 0) {
            if (!form.isValid()) {
                Ext.Msg.alert('Provider Registration', 'Please fill in all required fields before proceeding.');
                return;
            }
        }
        else if (activeItemIndex == 1) {
            // need to have at least one item in NPI
            if (npiListGrid.length == 0) {
                Ext.Msg.alert('Provider Registration', 'Please select at least one NPI before proceeding.');
                return;
            }
        }

        form.setActiveItem(activeItemIndex + 1);
        this.getView().center();

        if (activeItemIndex >= 0) {
            prevBtn.setDisabled(false);
        } else {
            prevBtn.setDisabled(true);
        }

        if (activeItemIndex >= (form.items.length-2)) {
            nextBtn.setDisabled(true);
            submitBtn.setDisabled(false);
        } else {
            nextBtn.setDisabled(false);
            submitBtn.setDisabled(true);
        }
    }
});
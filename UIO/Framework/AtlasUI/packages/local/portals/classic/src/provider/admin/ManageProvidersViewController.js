// k3279 - Kevin Tabasan - 12/09/2016

Ext.define('Atlas.portals.view.provider.admin.ManageProvidersViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.provadminmanageproviders',

  init: function () {
    var vm = this.getViewModel();

    vm.set('providerListForRemovalData', []);
    vm.set('providerListForAdditionData', []);
    vm.set('providerLocationGridData', []);

    this.loadProviders();
    this.loadSelectedLocations();
  },

  loadProviders: function () {
    var providerListStore = this.getViewModel().getStore('providerList');

    providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerListStore.load();
  },

  loadSelectedLocations: function () {
    var selectedListStore = this.getViewModel().getStore('selectedLocations');

    selectedListStore.getProxy().setExtraParam('pRowID', '');
    selectedListStore.getProxy().setExtraParam('pRowNum', 0);
    selectedListStore.getProxy().setExtraParam('pRows', 0);
    selectedListStore.getProxy().setExtraParam('pWhere', 'ProvGrpID=' + Atlas.user.userPreferences.providerGroupId +
    '|true');
    selectedListStore.getProxy().setExtraParam('pSort', '');
    selectedListStore.load();
  },

  reformatProviderList: function (store) {
    var reformattedListStore = this.getViewModel().getStore('reformattedProviderList'),
      storeData = store.getData(),
      listObjectArray = [],
      i = 0,
      items = null;

    for (i = 0; i < storeData.length; i++) {
      items = storeData.items[i].getData();

      listObjectArray.push({
        'fullName': items.lastName + ', ' + items.firstName,
        'provID': items.provID,
        'npiNum': null
      });
    }

    reformattedListStore.getProxy().setData(null);
    reformattedListStore.getProxy().setData(listObjectArray);
  },

  onIncludeRemovalClick: function () {
    var vm = this.getViewModel(),
      grid = this.lookup('removalListGrid'),
      gridStore = grid.getStore(),
      gridData = gridStore.getData(),
      duplicate = false,
      selectedProviderName = this.lookup('providersCombo').rawValue,
      selectedProviderID = this.lookup('providersCombo').value,
      removalListStore = vm.getStore('providerRemovalList'),
      providerObjectArray = vm.get('providerListForRemovalData'),
      i = 0,
      provID = null;

    if ('' === selectedProviderName) {
      Ext.MessageBox.alert('Inclusion Failed', 'No Provider selected. Please choose one from the dropdown.');
    } else {
      for (i = 0; i < gridData.items.length; i++) {
        provID = gridData.items[i].getData().provID;

        if (provID === selectedProviderID) {
          duplicate = true;
        }
      }

      if (false === duplicate) {
        providerObjectArray.push({
          'fullName': selectedProviderName,
          'provID': selectedProviderID,
          'npiNum': null
        });

        removalListStore.setData(null);
        removalListStore.setData(providerObjectArray);
        vm.set('providerListForRemovalData', providerObjectArray);
      } else {
        Ext.MessageBox.alert('Duplicate Entry', 'Provider has already been added.');
      }
    }
  },

  onExcludeRemovalClick: function () {
    this.excludeProvider('removalListGrid', 'providerRemovalList', 'providerListForRemovalData');
  },

  onIncludeAdditionClick: function () {
    var me = this,
      vm = this.getViewModel(),
      npiValidationModel = Ext.create('Atlas.portals.provider.model.ValidateProviderNPI', {}),
      npiInput = this.lookup('npiTextfield').value,
      additionListGrid = this.lookup('additionListGrid'),
      additionListGridStore = additionListGrid.getStore(),
      additionListGridData = additionListGridStore.getData(),
      providerDuplicate = false,
      providerObjectArray = vm.get('providerListForAdditionData'),
      additionListStore = vm.getStore('providerAdditionList');

    if ('' === npiInput) {
      Ext.MessageBox.alert('Inclusion Failed', 'Please enter an NPI number in the textfield above.');
    } else {
      npiValidationModel.phantom = false;
      npiValidationModel.getProxy().url = 'provider/hp/validateprovidernpi';
      npiValidationModel.getProxy().setExtraParam('pNPI', npiInput);
      npiValidationModel.getProxy().setExtraParam('pMode', 'innetwork');
      npiValidationModel.save({
        success: function (response, operation) {
          var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
            fields = metadata.pFields,
            fieldArray = fields.split('|'),
            selectedProviderID = fieldArray[2],
            selectedProviderName = fieldArray[1] + ', ' + fieldArray[0],
            result = metadata.pResult,
            providerLocationStore = vm.getStore('providerLocation'),
            i = 0,
            provID = null;

          if ('' === fields) {
            if ('Provider Not On File' === result) {
              Ext.MessageBox.alert('Inclusion Failed', 'Please enter a valid NPI number.');
            } else {
              Ext.MessageBox.alert('Inclusion Failed', result);
            }
          } else {
            for (i = 0; i < additionListGridData.items.length; i++) {
              provID = additionListGridData.items[i].getData().provID;

              if (provID === selectedProviderID) {
                providerDuplicate = true;
              }
            }

            if (false === providerDuplicate) {
              providerLocationStore.getProxy().setExtraParam('pRowID', '');
              providerLocationStore.getProxy().setExtraParam('pRowNum', 0);
              providerLocationStore.getProxy().setExtraParam('pRows', 50);
              providerLocationStore.getProxy().setExtraParam('pWhere', ' provID=' + selectedProviderID);
              providerLocationStore.getProxy().setExtraParam('pSort', '');
              providerLocationStore.load({
                callback: function (record) {
                  var availableLocationStore = vm.getStore('availableLocations'),
                    availableLocationObjectArray = vm.get('providerLocationGridData'),
                    tempLocationAddress = null,
                    j = 0,
                    recordData = null,
                    address = null,
                    csz = null;

                  for (j = 0; j < record.length; j++) {
                    recordData = record[j].getData();
                    address = recordData.address1 + ' ' + recordData.address2;
                    csz = recordData.city + ' ' + recordData.state + ' ' + recordData.zip;

                    if (null === tempLocationAddress || address !== tempLocationAddress) {
                      availableLocationObjectArray.push({
                        'locationAddr': address,
                        'locationCSZ': csz,
                        'locationDesc': recordData.name,
                        'locationID': recordData.locationID
                      });
                    }

                    tempLocationAddress = address;
                  }

                  providerObjectArray.push({
                    'fullName': selectedProviderName,
                    'provID': selectedProviderID,
                    'npiNum': npiInput,
                    'availableLocations': availableLocationObjectArray
                  });

                  additionListStore.setData(null);
                  additionListStore.setData(providerObjectArray);
                  vm.set('providerListForAdditionData', providerObjectArray);
                  me.lookup('npiTextfield').setValue('');

                  availableLocationStore.getProxy().setData(null);
                  vm.set('providerLocationGridData', availableLocationObjectArray);
                  availableLocationStore.getProxy().setData(availableLocationObjectArray);
                  availableLocationStore.reload();
                }
              });
            } else {
              Ext.MessageBox.alert('Duplicate Entry', 'Provider has already been added.');
            }
          }
        },
        failure: function () {
          Ext.MessageBox.alert('Request Failed', 'Internal Server Error.');
        }
      });
    }
  },

  onExcludeAdditionClick: function () {
    this.excludeProvider('additionListGrid', 'providerAdditionList', 'providerListForAdditionData');
  },

  excludeProvider: function (gridRef, store, list) {
    var vm = this.getViewModel(),
      grid = this.lookup(gridRef),
      gridStore = grid.getStore(),
      gridData = gridStore.getData(),
      selection = grid.getView().getSelectionModel().getSelection()[0],
      selectionLocations = selection.data.availableLocations,
      tempRemovalObjectArray = [],
      tempAvailableLocObjectArray = [],
      locationsToRemove = [],
      removalListStore = vm.getStore(store),
      availableLocationsGrid = this.lookup('availableLocationsGrid'),
      availableLocationsGridStore = availableLocationsGrid.getStore(),
      availableLocationsGridData = availableLocationsGridStore.getData(),
      currentLocation = null,
      currentData = null,
      currentNPIData = null,
      i = 0,
      j = 0,
      k = 0,
      el = 0,
      em = 0;

    if (selection === undefined) {
      Ext.MessageBox.alert('Exclusion Failed', 'Please select a provider from the grid below to exclude.');
    } else {
      gridStore.remove(selection);
      removalListStore.remove(selection);

      if ('additionListGrid' === gridRef) {
        for (k = 0; k < availableLocationsGridData.items.length; k++) {
          currentLocation = availableLocationsGridData.items[k];

          for (j = 0; j < selectionLocations.length; j++) {
            if (selectionLocations[j].locationID === currentLocation.data.locationID) {
              locationsToRemove.push(currentLocation);
            }
          }
        }
      }

      for (el = 0; el < locationsToRemove.length; el++) {
        availableLocationsGridStore.remove(locationsToRemove[el]);
      }

      for (em = 0; em < availableLocationsGridData.items.length; em++) {
        currentData = availableLocationsGridData.items[em].getData();

        tempAvailableLocObjectArray.push({
          'locationAddr': currentData.address,
          'locationCSZ': currentData.csz,
          'locationDesc': currentData.name,
          'locationID': currentData.locationID
        });
      }

      for (i = 0; i < gridData.items.length; i++) {
        currentNPIData = gridData.items[i].getData();

        tempRemovalObjectArray.push({
          'fullName': currentNPIData.fullName,
          'provID': currentNPIData.provID,
          'npiNum': currentNPIData.npiNum,
          'availableLocations': tempAvailableLocObjectArray
        });
      }

      vm.set(list, tempRemovalObjectArray);
      vm.set('providerLocationGridData', tempAvailableLocObjectArray);
    }
  },

  onSubmitRequestClick: function () {
    var me = this,
      removalListGrid = this.lookup('removalListGrid').getStore(),
      removalListGridData = removalListGrid.getData(),
      additionListGrid = this.lookup('additionListGrid').getStore(),
      locationGrid = this.lookup('selectedLocationsGrid').getStore(),
      locationGridData = locationGrid.getData(),
      additionListGridData = additionListGrid.getData(),
      userPrefs = Atlas.user.userPreferences,
      providerGroupDesc = userPrefs.providerGroupDesc,
      firstName = userPrefs.firstName,
      lastName = userPrefs.lastName,
      email = userPrefs.email,
      phone = userPrefs.phone,
      removalComments = '',
      removalInputValues = '',
      additionComments = '',
      additionInputValues = '',
      locationIDList = '',
      provIDList = '',
      npiList = '',
      fieldList = 'Description,ContactFirstName,ContactLastName,Email,Phone,Comments,requestSource,requestType',
      providerGroupSubmitModel = Ext.create('Atlas.portals.provider.model.ProviderGrPreqData', {}),
      i = 0,
      j = 0,
      k = 0;

    if ('' === email) {
      Ext.MessageBox.alert('Email Needed', 'Your email address is required to submit this request. Please go to user ' +
      'preference screen to update your email address.');

      return false;
    }

    if (0 !== removalListGridData.length || 0 !== additionListGridData.length) {
      Ext.MessageBox.show({
        title: 'Request Submitted',
        msg: 'Please Wait...',
        closable: false
      });

            // Removing Providers
      if (0 !== removalListGridData.length) {
        removalComments = 'Please remove the following provider(s) from the group. This request was submitted by ' +
        'adminuser from the Web Portal.';
        removalInputValues = providerGroupDesc + '|' + firstName + '|' + lastName + '|' + email + '|' + phone + '|' +
        removalComments + '|2|3';

        for (i = 0; i < removalListGridData.length; i++) {
          provIDList += removalListGridData.items[i].getData().provID + ',';
        }

        provIDList = provIDList.substring(0, provIDList.length - 1);

        providerGroupSubmitModel.phantom = false;
        providerGroupSubmitModel.getProxy().url = 'system/hp/providergrpreqdataweb';
        providerGroupSubmitModel.getProxy().setExtraParam('pRequestId', 0);
        providerGroupSubmitModel.getProxy().setExtraParam('pFieldList', fieldList);
        providerGroupSubmitModel.getProxy().setExtraParam('pFields', removalInputValues);
        providerGroupSubmitModel.getProxy().setExtraParam('pNPIList', provIDList);
        providerGroupSubmitModel.getProxy().setExtraParam('pNPIidFlag', 'FALSE');
        providerGroupSubmitModel.getProxy().setExtraParam('pMode', '');
        providerGroupSubmitModel.getProxy().setExtraParam('pLocationList', '');
        providerGroupSubmitModel.getProxy().setExtraParam('pUserName', Atlas.user.un);

        providerGroupSubmitModel.save({
          success: function () {
            Ext.MessageBox.hide();
            Ext.MessageBox.alert('Request Submitted', 'Your request has been sent to the Meridian Health Plan ' +
            'website. As soon as your account is activated, you will receive an email with your user name, and then ' +
            'a separate email with your initial password. Please note that it may take 24-48 hours before you ' +
            'receive the email.');
            me.lookup('providersCombo').setValue('');
            me.getViewModel().getStore('providerRemovalList').setData([]);
            me.getViewModel().set('providerListForRemovalData', []);
          },
          failure: function () {
            Ext.MessageBox.hide();
            Ext.MessageBox.alert('Removal Request Failed', 'Internal Server Error.');
          }
        });
      }

            // Adding Providers
      if (0 !== additionListGridData.length) {
        additionComments = 'Please add the following provider(s) from the group. This request was submitted by ' +
        'adminuser from the Web Portal.';
        additionInputValues = providerGroupDesc + '|' + firstName + '|' + lastName + '|' + email + '|' + phone + '|' +
        additionComments + '|2|2';

        for (j = 0; j < additionListGridData.length; j++) {
          npiList += additionListGridData.items[j].getData().npiNum + ',';
        }

        npiList = npiList.substring(0, npiList.length - 1);

        for (k = 0; k < locationGridData.length; k++) {
          locationIDList += locationGridData.items[k].getData().locationID + ',';
        }

        locationIDList = locationIDList.substring(0, locationIDList.length - 1);

        if ('' === locationIDList) {
          Ext.MessageBox.hide();
          Ext.MessageBox.alert('Addition Request Failed', 'Please add at least one location to the Selected ' +
          'Provider Locations.');

          return false;
        }

        providerGroupSubmitModel.phantom = false;
        providerGroupSubmitModel.getProxy().url = 'system/hp/providergrpreqdataweb';
        providerGroupSubmitModel.getProxy().setExtraParam('pRequestId', 0);
        providerGroupSubmitModel.getProxy().setExtraParam('pFieldList', fieldList);
        providerGroupSubmitModel.getProxy().setExtraParam('pFields', additionInputValues);
        providerGroupSubmitModel.getProxy().setExtraParam('pNPIList', npiList);
        providerGroupSubmitModel.getProxy().setExtraParam('pNPIidFlag', 'TRUE');
        providerGroupSubmitModel.getProxy().setExtraParam('pMode', '');
        providerGroupSubmitModel.getProxy().setExtraParam('pLocationList', locationIDList);
        providerGroupSubmitModel.getProxy().setExtraParam('pUserName', Atlas.user.un);

        providerGroupSubmitModel.save({
          success: function () {
            Ext.MessageBox.alert('Request Submitted', 'Your request has been sent to the Meridian Health Plan ' +
            'website. An email will be sent out when the change request is completed. Please note that it may take ' +
            '24-48 hours before you receive the email.');
            me.lookup('npiTextfield').setValue('');
            me.getViewModel().getStore('providerAdditionList').setData([]);
            me.getViewModel().set('providerListForAdditionData', []);
            me.loadSelectedLocations();
            me.lookup('availableLocationsGrid').getStore().removeAll();
          },
          failure: function () {
            Ext.MessageBox.hide();
            Ext.MessageBox.alert('Addition Request Failed', 'Internal Server Error.');
          }
        });
      }
    } else {
      Ext.MessageBox.alert('Validation Error', 'Please fill out either "Remove Existing Providers" or "Add New ' +
      'Providers". There should also be at least one selected location.');
    }

    return false;
  },

  onExportProvidersClick: function () {
    var me = this,
      providerListReportStore = this.getViewModel().getStore('providerListReport'),
      providerData = null,
      csvData = null,
      exporter = null;

    Ext.MessageBox.show({
      title: 'Request Submitted',
      msg: 'Please Wait...',
      closable: false
    });

    providerListReportStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
    providerListReportStore.load(function (records, operation, success) {
      if (success) {
        providerData = Ext.JSON.decode(operation._response.responseText).data;
        csvData = me.prepareCSVData(providerData, ['provID', 'npi', 'lastName', 'firstName', 'degree', 'Address1',
          'Address2', 'City', 'State', 'Zip', 'County']);
        exporter = Ext.Factory.exporter({
          type: 'csv',
          data: {
            columns: [{
              text: 'Prov. ID'
            }, {
              text: 'NPI'
            }, {
              text: 'Last Name'
            }, {
              text: 'First Name'
            }, {
              text: 'Degree'
            }, {
              text: 'Address 1'
            }, {
              text: 'Address 2'
            }, {
              text: 'City'
            }, {
              text: 'State'
            }, {
              text: 'ZIP'
            }, {
              text: 'County'
            }],

            groups: {
              rows: csvData
            }
          }

        });

        exporter.saveAs();
        Ext.MessageBox.hide();
      } else {
        Ext.MessageBox.alert('Request Failed', 'Something went wrong. Please try again later.');
      }
    });
  },

  prepareCSVData: function (data, columns) {
    var rows = [],
      cells = [],
      i = 0,
      j = 0;

    for (i = 0; i < data.length; i++) {
      cells = [];

      for (j = 0; j < columns.length; j++) {
        if (data[i].hasOwnProperty(columns[j])) {
          cells.push({
            value: data[i][columns[j]]
          });
        }
      }

      rows.push({
        cells: cells
      });
    }

    return rows;
  },

  onClearClick: function () {
    var vm = this.getViewModel();

    this.lookup('providersCombo').setValue('');
    this.lookup('npiTextfield').setValue('');
    vm.getStore('providerRemovalList').setData([]);
    vm.getStore('providerAdditionList').setData([]);
    vm.set('providerListForRemovalData', []);
    vm.set('providerListForAdditionData', []);
    vm.set('providerLocationGridData', []);
    this.loadSelectedLocations();
    this.lookup('availableLocationsGrid').getStore().removeAll();
  }
});
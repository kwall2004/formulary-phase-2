/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Request - OON Entry
 * Description: Controller for Authorization Request OON Entry
 */
Ext.define('Atlas.portals.provider.OONProviderEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderOONEntryController',
    
    init: function(){
        this.loadStates();
        this.loadOONReasonStore();
        this.loadInfo();
    },
    
    onOkClick: function () {
        if (this.lookupReference('portalsProviderOONEntryForm').isValid()){
            if (this.getViewModel().get('searchFrom') == 'ServicingProvider'){
                this.fireEvent('OONProviderSelected', {
                    providerName: this.lookupReference('OONProviderNameRef').getValue(),
                    NPINumber: this.lookupReference('OONNPINumber').getValue(),
                    practiceName: this.lookupReference('OONPracticeNameRef').getValue(),
                    practiceAddress: this.lookupReference('OONPracticeAddressRef').getValue(),
                    practiceAddress2: this.lookupReference('OONPracticeAddress2Ref').getValue(),
                    city: this.lookupReference('OONCityRef').getValue(),
                    state: this.lookupReference('stateCombo').getValue(),
                    zip: this.lookupReference('OONZipRef').getValue(),
                    phone: this.lookupReference('OONPhoneRef').getValue(),
                    fax: this.lookupReference('OONFaxRef').getValue(),
                    Reason: this.lookupReference('OONReasonRef').getRawValue(),
                    action: true
                });
                this.getView().up().destroy();
            } else {
                this.fireEvent('OONFacilitySelected', {
                    providerName: this.lookupReference('OONProviderNameRef').getValue(),
                    NPINumber: this.lookupReference('OONNPINumber').getValue(),
                    practiceName: this.lookupReference('OONPracticeNameRef').getValue(),
                    practiceAddress: this.lookupReference('OONPracticeAddressRef').getValue(),
                    practiceAddress2: this.lookupReference('OONPracticeAddress2Ref').getValue(),
                    city: this.lookupReference('OONCityRef').getValue(),
                    state: this.lookupReference('stateCombo').getValue(),
                    zip: this.lookupReference('OONZipRef').getValue(),
                    phone: this.lookupReference('OONPhoneRef').getValue(),
                    fax: this.lookupReference('OONFaxRef').getValue(),
                    Reason: this.lookupReference('OONReasonRef').getRawValue(),
                    action: true
                });
                this.getView().up().destroy();
            }
        } else {
            Ext.Msg.alert('Validation Error', 'Please enter the required data');
        }
            
        },

    loadInfo: function() {
        var vm = this.getViewModel(),
            providerRecord = vm.get('providerRecord');

        if (providerRecord !== null) {
            providerRecord = providerRecord.data;
            vm.set('OONProvider', providerRecord);
            this.lookup('OONProviderNameRef').setValue(providerRecord.firstName + ' ' + providerRecord.lastName);
        }
    },

    loadStates: function () {
        var combo = this.lookupReference('stateCombo'),
            states = [["AL", "AL"], ["AK", "AK"], ["AZ", "AZ"], ["AR", "AR"], ["CA", "CA"], ["CO", "CO"], ["CN", "CN"],
                ["DE", "DE"], ["DC", "DC"], ["FL", "FL"], ["GA", "GA"], ["HW", "HW"], ["ID", "ID"], ["IL", "IL"],
                ["IN", "IN"], ["IA", "IA"], ["KS", "KS"], ["KY", "KY"], ["LA", "LA"], ["ME", "ME"], ["MA", "MA"],
                ["MD", "MD"], ["MI", "MI"], ["MN", "MN"], ["MS", "MS"], ["MO", "MO"], ["MT", "MT"], ["NE", "NE"],
                ["NV", "NV"], ["NH", "NH"], ["NJ", "NJ"], ["NM", "NM"], ["NY", "NY"], ["NC", "NC"], ["ND", "ND"], ["OH", "OH"],
                ["OK", "OK"], ["OR", "OR"], ["PA", "PA"], ["RH", "RH"], ["SC", "SC"], ["SD", "SD"], ["TE", "TE"], ["TX", "TX"],
                ["UT", "UT"], ["VE", "VE"], ["VA", "VA"], ["WA", "WA"], ["WV", "WV"], ["WI", "WI"], ["WY", "WY"]],
            statesStore = {};

        statesStore = new Ext.data.ArrayStore({
            fields: ['text', 'value'],
            data: states
        });

        combo.setStore(statesStore);
    },

    loadOONReasonStore: function() {
        var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
            serviceStore = {},
            serviceCombo = this.lookupReference('OONReasonRef');

        listItemsModel.getProxy().setExtraParam('pListName', 'OONAuthReasonWeb');
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                    servicesMap = [],
                    splitValues = [];

                if (!results) { return; }

                splitValues = results.split('^');

                for (var i = 0; i < splitValues.length; i++) {
                    if (splitValues[i + 1] === '00') { i++; continue; }
                    servicesMap.push({
                        key: splitValues[i],
                        value: splitValues[i + 1]
                    });
                    i++;
                }

                serviceStore = new Ext.data.ArrayStore({});
                serviceStore.add(servicesMap);
                serviceStore.sort('value', 'ASC');
                serviceCombo.setStore(serviceStore);
            }
        });
    }
});
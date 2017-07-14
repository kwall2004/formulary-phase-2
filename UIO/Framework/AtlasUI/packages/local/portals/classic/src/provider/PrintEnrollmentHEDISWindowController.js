/**
 * Created by c4539 on 12/28/2016.
 */
Ext.define('Atlas.portals.provider.PrintEnrollmentHEDISWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsproviderprintenrollmenthediswindow',

    init: function() {
        this.loadProviderList();
    },

    loadProviderList: function() {
        var providerCombo = this.lookupReference('provider'),
            provGroupModel = Ext.create('Atlas.portals.provider.model.ProvGroupListGraph', {}),
            username = Ext.first('viewport').getViewModel().get('user').un;

        provGroupModel.getProxy().setExtraParam('pUserName', username);
        provGroupModel.getProxy().setExtraParam('pLobID', '');
        provGroupModel.load({
            callback: function(record, operation) {
                var response = {},
                    providerList = [],
                    provGroupStore = {},
                    groups = [],
                    tempGroup = [];

                if (!operation) {
                    Ext.Msg.alert('Error', 'Request Failed.');
                    return;
                }

                response = Ext.JSON.decode(operation._response.responseText);
                providerList = response.metadata.pListItems.split('^');
                if (providerList.length === 0) { return; }
                if (providerList.length > 0) {
                    for (var i = 0; i < providerList.length; i++) {
                        tempGroup = [];
                        tempGroup.push(providerList[i]);
                        tempGroup.push(providerList[i + 1]);
                        groups.push(tempGroup);
                        i++;
                    }

                    provGroupStore = new Ext.data.ArrayStore({
                        fields: ['text', 'value'],
                        data: groups
                    });
                    providerCombo.setStore(provGroupStore);
                }
            }
        });
    },

    onProviderSelected: function() {
        var provider = this.lookupReference('provider').value,
            lobCombo = this.lookupReference('lob'),
            providerLobListStore = Ext.create('Atlas.portals.provider.model.ProviderLobList', {}),
            groupIndicator = 0,
            id = '';

        if (provider.indexOf('-') !== -1) {
            var providerLobStore = new Ext.data.ArrayStore({});
            var providerLobMap = [];

            id = provider.substring(provider.indexOf('-') + 1);
            groupIndicator = 2;
            providerLobMap.push({ key: 'All', value: 'All' });
            providerLobStore.add(providerLobMap);
            lobCombo.setStore(providerLobStore);
            lobCombo.select('All');
            lobCombo.disable();
        } else {
            id = provider;
            groupIndicator = 1;
            providerLobListStore.getProxy().setExtraParam('pProvID', id);
            providerLobListStore.getProxy().setExtraParam('pDelimiter', ',');
            providerLobListStore.load({
                callback: function(record, operation) {
                    var providerLobMap = [],
                        results = Ext.JSON.decode(operation._response.responseText).metadata.pLOBList,
                        splitValues = [];

                    splitValues = results.split(',');
                    lobCombo.disable();
                    providerLobMap.push({
                        key: 'All',
                        value: 'All'
                    });
                    if (splitValues.length > 0) {
                        for (var i = 0; i < splitValues.length; i+= 2) {
                            providerLobMap.push({
                                key: splitValues[i],
                                value: splitValues[i + 1]
                            });
                        }
                        lobCombo.enable();
                    }

                    var providerLobStore = new Ext.data.ArrayStore({});
                    providerLobStore.add(providerLobMap);
                    lobCombo.setStore(providerLobStore);
                    lobCombo.select('All');
                }
            });
        }

        this.getView().getViewModel().set('id', id);
        this.getView().getViewModel().set('groupIndicator', groupIndicator);
    },

    printHEDIS: function() {
        var requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {}),
            user = Ext.first('viewport').getViewModel().get('user'),
            vm = this.getView().getViewModel(),
            lob = this.lookupReference('lob').value,
            input = '';

        input = vm.get('id') + '|' +  vm.get('id') + '|' + vm.get('groupIndicator') + '|' + vm.get('reportDate');
        input += '|2|' + '0,1,2,3,4,5,10,15,16,17,19,23||' + vm.get('reportYear') + '|No';
        lob = lob === 'All' ? '' : lob;
        input += '||' + user.un + '|' + lob + '|' + user.userPreferences.providerGroupId + '||';

        requestModel.phantom = false;
        requestModel.getProxy().url = 'eligibility/hp/runreport64';
        requestModel.getProxy().setExtraParam('pReportName', 'provhedislist.p');
        requestModel.getProxy().setExtraParam('pParameters', input);
        requestModel.getProxy().setExtraParam('pRegenReport', 2);
        requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
        requestModel.getProxy().setExtraParam('pJobNum', 0);
        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;
                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    if (obj.metadata.pStatus != ''){
                        Ext.Msg.alert('Error',obj.metadata.pStatus);
                    } else {
                        Ext.MessageBox.alert(
                            'Error',
                            'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.',
                            function () {}
                        );
                    }
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            }
        });
        this.getView().up().destroy();
    },

    cancelHEDIS: function() {
        this.getView().up().destroy();
    }
});
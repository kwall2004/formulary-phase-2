/**
 * Created by m4542 on 9/27/2016.
 */
Ext.define('Atlas.portals.rxmember.controller.PharmacySearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacySearchController',

    onPharmacySearch: function() {
        var me = this,
            form = me.getView().down('form'),
            parameters = form.getValues(),
            vm = me.getViewModel(),
            pharmacySearchResults = vm.getStore('pharmacygridstore'),
            mileRadius = 0,
            user = Ext.first('viewport').getViewModel().get('user');

        var pharmacyType = Ext.ComponentQuery.query('[itemId=pharmacyType]')[0];

        if (parameters.mile_radius !== "") {
            mileRadius = parameters.mile_radius;
        }

        if(form.isValid()) {
            pharmacySearchResults.getProxy().setExtraParam('pPharmacyNetwork', parameters.pharmacyNetwork);
            pharmacySearchResults.getProxy().setExtraParam('pRadius', parseInt(mileRadius));
            pharmacySearchResults.getProxy().setExtraParam('pZip', parameters.ZipCode);
            pharmacySearchResults.getProxy().setExtraParam('pPharmacyName', parameters.PharmacyName);
            if (pharmacyType.value != null && pharmacyType.value !== "999") {
                pharmacySearchResults.getProxy().setExtraParam('pPharmacyType', pharmacyType.value.toString());
            }
            pharmacySearchResults.getProxy().setExtraParam('pLOB', parameters.coverage);
            pharmacySearchResults.getProxy().setExtraParam('pSessionID', user.retSessionID);
            pharmacySearchResults.getProxy().setExtraParam('pRecipientID', user.retRecipientID);
            pharmacySearchResults.load();
        }
    },

    onGridClick: function (view, record) {
        var me = this,
            form = me.getView().down('form'),
            parameters = form.getValues(),
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            gridSearchModel = Ext.create('Atlas.portals.rxmember.model.PharmacyDetailsResults', {});
            gridSearchModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
            gridSearchModel.getProxy().setExtraParam('pRecipientID', user.retRecipientID);
            gridSearchModel.getProxy().setExtraParam('pKeyValue', record.data.NCPDPID);
            gridSearchModel.getProxy().setExtraParam('pKeyType', 'ncpdpID');
            gridSearchModel.getProxy().setExtraParam('pFieldList', 'ncpdpid,name,locCity,locState,locAddress1,locAddress2,locZip,locCrossStreet,mailAddress1,mailCity,mailState,mailZip,locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactExt,ContactEmail,locHandicapAccessFlag,locAcceptsErxFlag,locDeliveryServiceFlag,locCompoundServFlag,locDriveUpFlag,locDMEflag,loc24HourFlag,@locHours,@fnlocHours,legalBusinessName,primDispTypeCode,secDispTypeCode,tertDispTypeCode,dispClassCode,@PharmacyType');
            gridSearchModel.load({
                callback: function(record) {
                    var pharmacyHours = record.get('@fnlocHours');
                    var carrotSplit = pharmacyHours.split('^');
                    var newString = "";
                    for(var i = 0; i < carrotSplit.length; i++) {

                         newString +="<p><strong>" + carrotSplit[i].replace(',',':</strong>') + "</p>";
                    }

                    newString = newString.replace(/,/g , " - ");
                    record.set('@fnlocHours', newString);

                    var pharmacyType = record.get('@PharmacyType');
                    var newPharmacyType = pharmacyType.split('^01')[0];
                    record.set('@PharmacyType', newPharmacyType);

                    for (var key in record.getData()) {
                        if(record.get(key) == 'Y') {
                            record.set(key, true);
                        } else if(record.get(key) == 'N') {
                            record.set(key, false);
                        }
                    }

                    var detailsForm = me.lookupReference('pharmacydetails');
                    detailsForm.loadRecord(record);
                }
            });

        this.getDirections(record);
    },

    resetFields: function (view, record) {
        var pharmacySearchForm = this.lookupReference('pharmacySearchForm');
        var pharmacyDetails = this.lookupReference('pharmacydetails');
        pharmacySearchForm.reset();
        pharmacyDetails.reset();
        this.lookupReference('pharmacygridpanel').getStore().removeAll();
    },

    getDirections: function (record) {
        var me = this,
            vm = me.getViewModel(),
            locAddress1 = record.get('address1'),
            locAddress2 = record.get('address2'),
            locCity = record.get('city'),
            locState = record.get('state'),
            locZip = record.get('zipCode');

        var url = 'https://maps.google.com/maps?q=' + locAddress1 + '+' + locAddress2 + '+' + locCity + '+' + locState + '+' + locZip;
        vm.set('pharmacyDetailRecord', url);

    },

    onCoverageSelected: function(combo, record) {
        this.loadPharmacyNetworks(record.get('PlanGroupId'));
    },

    loadPharmacyNetworks: function(planGroupId) {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            combo = me.lookupReference('pharmacyNetwork'),
            planGroupInfo = vm.getStore('planGroupInfo');

        combo.setValue(null);
        planGroupInfo.getProxy().setExtraParam('pSessionID', user.retSessionID);
        planGroupInfo.getProxy().setExtraParam('pplanGroupId', planGroupId);
        planGroupInfo.load({
            callback: function(records) {
                var pharmacyNetwork = [],
                    pharmacyNetworks = [],
                    preferredExists = false,
                    nonPreferredExists = false,
                    pharmacyNetworksStore = {},
                    i = 0;

                for(i = 0; i < records.length; i++) {
                    pharmacyNetwork = [];
                    if (!preferredExists && records[i].data.pharmNetworkId > 0) {
                        preferredExists = true;
                        pharmacyNetwork.push('Preferred');
                        pharmacyNetwork.push(records[i].data.pharmNetworkId);
                        pharmacyNetworks.push(pharmacyNetwork);
                    }
                    if (!nonPreferredExists && records[i].data.nonPrefPharmNetworkId > 0) {
                        nonPreferredExists = true;
                        pharmacyNetwork.push('Non-Preferred');
                        pharmacyNetwork.push(records[i].data.nonPrefPharmNetworkId);
                        pharmacyNetworks.push(pharmacyNetwork);
                    }
                }

                pharmacyNetworksStore = new Ext.data.ArrayStore({
                    fields: ['displayName', 'networkId'],
                    data: pharmacyNetworks
                });
                combo.setStore(pharmacyNetworksStore);
                if (pharmacyNetworks.length > 0) {
                    combo.setValue(pharmacyNetworks[0][1]);
                }
            }
        });
    },

    exportToExcel: function() {
        var gridPanelRef = this.lookupReference('pharmacygridpanel');
        gridPanelRef.saveDocumentAs({
            type: 'xlsx',
            title: 'Pharmacy Search',
            fileName: 'PharmacySearch.xlsx'
        });
    },
    /**
     * Called when the view is created
     */
    init: function() {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            memberCoverages = vm.getStore('coveragestore'),
            comboCoverage = me.lookupReference('coverage'),
            pharmacyTypeCoverages = vm.getStore('pharmacytypestore');

        memberCoverages.getProxy().setExtraParam('pSessionId', user.retSessionID);
        memberCoverages.getProxy().setExtraParam('pRecipientId', user.retRecipientID);
        memberCoverages.load({
                callback: function (records, opts, success) {
                    var coverageArr = [];
                    for(var i = 0; i < records.length; i++) {
                        if(records[i].getData().TermDate === "") {
                            coverageArr.push(records[i]);
                        }
                    }

                    var coverageStore = new Ext.data.ArrayStore({
                        fields: ['BIN', 'CMSContractId', 'CMSPBPId', 'CarrierId', 'CarrierLOBId', 'CarrierName', 'DisplayName', 'EffDate', 'LOBName', 'MemberId', 'PCN', 'PlanBenefitId', 'PlanBenefitName', 'PlanGroupId', 'PlanGroupName', 'PrimaryCarePhys', 'RecipientId',  'SystemId', 'TermDate', 'id'],
                        data: coverageArr,
                        pageSize: 15,
                        proxy: {
                            type: 'memory',
                            enablePaging: true
                        }
                    });

                    comboCoverage.setStore(coverageStore);
                }
            });

        pharmacyTypeCoverages.load({
            callback: function(records) {
               var defaultVal = records[0].data;
                me.lookupReference('pharmacyType').setValue(defaultVal.value);
            }
        });
    }
});
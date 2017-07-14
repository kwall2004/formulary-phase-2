var currentNDC,
    drug1Name,
    NDCList;


Ext.define('Atlas.portals.rxmember.controller.DrugSearchController', {

    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsRxmemberDrugSearchController',

    init: function() {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            memberCoverages = vm.getStore('memberCoverages');

        memberCoverages.getProxy().setExtraParam('pSessionId', user.retSessionID);
        memberCoverages.getProxy().setExtraParam('pRecipientId', user.retRecipientID);
        memberCoverages.load({
            callback: function(records) {
                var combo = me.lookupReference('plan'),
                    activeCoverages = [];

                if (!records) { return; }
                if (records.length === 0) { return; }
                activeCoverages = records.filter(function(item) {
                    return item.get('TermDate') == '' || new Date(item.get('TermDate')).getTime() >= new Date().getTime();
                });
                if (activeCoverages.length === 0) { return; }
                combo.select(activeCoverages[0]);
                me.onPlanSelected(combo, activeCoverages[0]);
            }
        });
    },

    maybePopulateSearch: function() {
        var brand = this.getView().brand;

        if (!brand) { return; }
        this.lookupReference('drugSearch').setValue(brand);
        this.onDrugSearch();

    },

    onDrugSearch: function() {
        var me = this,
            form = me.lookupReference('drugsearchform'),
            parameters = form.getValues(),
            vm = me.getViewModel(),
            drugSearchResults = vm.getStore('drugSearchResults'),
            user = Ext.first('viewport').getViewModel().get('user');


        this.toggleDTD(false);

        if(form.isValid()){
            drugSearchResults.getProxy().setExtraParam('pSessionID', user.retSessionID);
            drugSearchResults.getProxy().setExtraParam('pRecipientID', user.retRecipientID);
            drugSearchResults.getProxy().setExtraParam('pBN', parameters.drugSearch);
            drugSearchResults.getProxy().setExtraParam('pCovered', parameters.coveredOnly !== "0");
            drugSearchResults.getProxy().setExtraParam('pPA', false);
            drugSearchResults.getProxy().setExtraParam('pOTC', parameters.overTheCounter !== "0");
            drugSearchResults.getProxy().setExtraParam('pPlanGroupID', parameters.plan);
            drugSearchResults.getProxy().setExtraParam('pGeneric', parameters.genericAlternatives !== "0" ? "GEN" : "");
            drugSearchResults.getProxy().setExtraParam('pPreferred', parameters.preferred !== "0");
            drugSearchResults.getProxy().setExtraParam('pBenefitYear', new Date().getFullYear().toString());
            drugSearchResults.getProxy().setExtraParam('pPlanBenefitId', vm.get('planBenefitId'));
            drugSearchResults.getProxy().setExtraParam('pNetworkId', parameters.pharmacyNetwork);
            drugSearchResults.load();
        }
    },

    onDrugSelected: function(view, record) {
        var me = this,
            form = me.lookupReference('drugdetails'),
            user = Ext.first('viewport').getViewModel().get('user'),
            today = new Date(),
            today2 = new Date(),
            minusOneMonth = new Date(today2.setDate(today2.getDate()-31)),
            shortToday = today.toLocaleDateString(),
            shortMinusOneMonth = minusOneMonth.toLocaleDateString(),
            pWhere = "TransactionDate >= " + shortMinusOneMonth + " and TransactionDate <= " + shortToday + " and respStatus = 'P'",
            vm = this.getViewModel(),
            claimsHistory = vm.getStore('claimsHistory');
        currentNDC = record.data.DrugCode;
        drug1Name = record.data.LN;

        this.toggleDTD(true);
        vm.set('dtdRec', record);
        vm.set('dtdRecNdc', record.data.DrugCode);
        vm.set('dtdRecMedName', record.data.LN);

        form.loadRecord(record);

        claimsHistory.getProxy().setExtraParam('pKeyValue', user.retRecipientID);
        claimsHistory.getProxy().setExtraParam('pKeyType', 'RecipientID');
        claimsHistory.getProxy().setExtraParam('pOverdueAlert', 'false');
        claimsHistory.getProxy().setExtraParam('pRowid', '0');
        claimsHistory.getProxy().setExtraParam('pRowNum', '0');
        claimsHistory.getProxy().setExtraParam('pBatchSize', '0');
        claimsHistory.getProxy().setExtraParam('pWhere', pWhere);
        claimsHistory.load({
            callback: function (records, operation, success) {
                for (var i = 0; i < records.length; i++) {
                    if (i != 0) {
                        NDCList = NDCList + "," + records[i].data.ndc;
                    } else {
                        NDCList = records[i].data.ndc;
                    }
                }
            }
        });


    },

    onPlanSelected: function(combo, record) {
        var vm = this.getViewModel(),
            benefitId = record.get('PlanBenefitId');

        this.getViewModel().set('isPreferred', record.get('PlanGroupId') === 191);
        this.getViewModel().set('planBenefitId', benefitId);
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
                me.maybePopulateSearch();
            }
        });
    },

    estimateCopay: function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex),
            planGroupId = this.lookupReference('plan').value,
            networkId = this.lookupReference('pharmacyNetwork').value,
            window = Ext.create('Ext.window.Window', {
                        title: 'What Do I Pay?',
                        height: 500,
                        width: 780,
                        layout: 'fit',
                        reference: 'estimateCoPayWindow',
                        closable: true,
                        items: {
                            xtype: 'portalsrxmemberestimatedcopaywindow',
                            viewModel: {
                                stores: {
                                    drugPrices: {
                                        model: 'Atlas.portals.rxmember.model.DrugPriceAtPharmacyP'
                                    }
                                },
                                data: {
                                    drugRecord: record,
                                    planGroupId: planGroupId,
                                    networkId: networkId,
                                    lat: '',
                                    long: ''
                                }
                            }
                        }
                    });

        window.show();
    },

    openCopayExample: function() {
        Ext.create('Ext.window.Window', {
            title: 'Copay Example',
            height: 700,
            width: 900,
            scrollable: true,
            items: {
                xtype: 'portlasrxmembercopayexamplewindow'
            }
        }).show();
    },

    openPharmacyWindow: function() {
        Ext.create('Ext.window.Window', {
            title: '$4 Generic Available Pharmacies',
            height: 430,
            width: 340,
            scrollable: true,
            items: {
                xtype: 'portalsrxmemberdrugpharmacywindow'
            }
        }).show();
    },

    goToMyClaims: function() {
        var me = this,
            dateFrom = new Date();

        dateFrom.setDate(dateFrom.getDate() - 30);
        this.fireEvent('openView','rxmember','portals','rxmember_MyClaimsMember', {
            isRedirect: true,
            dateFrom: me.formatDate(dateFrom),
            dateTo: me.formatDate(new Date()),
            atlasId: me.formatDate(new Date())
        });
    },

    formatDate: function(date) {
        return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
    },

    buildWhereClause: function(fullString, extra) {
        return fullString = fullString.length > 0 ? fullString + ' AND ' + extra : extra;
    },
    openDrugInteraction: function() {
        this.showPopUp("");
    },
    toggleDTD: function (enableButton) {
        var curView, btnDTD;
            curView = this.getView(),
             btnDTD = curView.query('#drugInteractionButton')[0];

        if (enableButton) {
            btnDTD.setDisabled(false);
        }
        else {
            btnDTD.setDisabled(true);
        }
    },
    showPopUp: function (popUpMsg) {
        var vm, btnDTD;
        vm = this.getViewModel();
        var mpuPopUp = new Atlas.portals.view.rxmember.DrugToDrugInteractionPopUp({
            itemConfig: {
                srchNDC: vm.data.dtdRecNdc,
                srchMedName: vm.data.dtdRecMedName
            }
        });
        mpuPopUp.show();
    }


});
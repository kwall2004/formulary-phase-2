Ext.define('Atlas.portals.hpmember.ProviderSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.providerSearchController',

    init: function () {
        var me = this,
            vm = me.getViewModel(),
            countyStore = vm.getStore('counties'),
            countyProxy = countyStore.getProxy(),
            languageStore = vm.getStore('languages'),
            specialtyStore = vm.getStore('specialties'),
            specialtyProxy = specialtyStore.getProxy(),
            lobStore = vm.getStore('memberLobs'),
            lobProxy = lobStore.getProxy(),
            user = Ext.first('viewport').getViewModel().get('user'),
            lobCombo = me.lookupReference('lobCombo'),
            familyCombo = me.lookupReference('familyListCombo');

        countyProxy.setExtraParam('pState', user.homeState);
        countyStore.load();

        languageStore.load();

        // set the default LOB
        vm.set('defaultLob', user.primaryLOB);

        // set user.primaryLOB as the selected LOB
        lobProxy.setExtraParam('pRecipientID', user.recipientId);
        lobStore.on({
            scope: me,
            single: true,
            load: 'onLobStoreLoad'
        });

        lobStore.load();

        specialtyProxy.setExtraParam('pListName', 'SpecialtyByGroup' + user.primaryLOB);
        specialtyStore.load();

        // PCP Change stuff
        // select the current user in the family combo
        familyCombo.setValue(user.recipientId);

        if (user.familyList.length === 1) {
            vm.set('familyListDisabled', true);
        }
        else {
            if (user.primaryLOB === 'Comm-HMO') {
                if (user.recipientId === user.subscriberId) {
                    //only the subscriber gets the combo enabled others are disabled
                    vm.set('familyListDisabled', false);
                }
                else {
                    vm.set('familyListDisabled', true);
                }
            }
            else {
                vm.set('familyListDisabled', false);
            }
        }

        // Get the benefit plan code
        var response = Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            async: false,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'portal/hp/returnbenefitplancode/update',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pRecipientID: user.recipientId,
                pLobID: '',
                pAsOfDate: '',
                userState: user.portalStateSelected
            })
        });

        var obj = Ext.decode(response.responseText);
        vm.set('benefitPlanCode', obj.metadata.pBenefitPlanCode);
    },

    initializeEffectiveDates: function () {
        var dt = new Ext.Date.getFirstDateOfMonth(new Date()),
            dateList = [],
            combo = this.lookupReference('effectiveDateCombo'),
            effectiveDateStore = {};

        for (var i = 1; i <= 12; i++) {
            dateList.push({value: Ext.Date.format(Ext.Date.getFirstDateOfMonth(Ext.Date.add(dt, Ext.Date.MONTH, i)), 'm/d/Y')});
        }

        effectiveDateStore = new Ext.data.Store({
            fields: ['value'],
            data: dateList
        });

        combo.setStore(effectiveDateStore);
    },

    initializeFamilyList: function () {
        var familyListStore = {},
            combo = this.lookupReference('familyListCombo'),
            user = Ext.first('viewport').getViewModel().get('user');

        familyListStore = new Ext.data.Store({
            fields: [
                'familyList'
            ]
        });

        familyListStore.loadData(user.familyList);
        combo.setStore(familyListStore);
    },

    onSearch: function () {
        var me = this,
            vm = me.getViewModel(),
            providerSearchStore = vm.getStore('providerSearchResults');

        vm.set('hideProviderDetails', true);
        providerSearchStore.removeAll(); // clear the search results grid

        me.getView().mask('Loading...');
        vm.set('searchValues', me.getView().down('form').getValues());
        providerSearchStore.load();

    },

    onSearchResultsBeforeLoad: function (store, operation) {
        var me = this,
            vm = me.getViewModel(),
            data = vm.get('searchValues'),
            proxy = store.getProxy(),
            user = Ext.first('viewport').getViewModel().get('user');

        proxy.setExtraParam('pRecipientID', 0); // This should be 0 for the search to return results
        proxy.setExtraParam('pName', data.providerName);
        proxy.setExtraParam('pGender', data.gender);
        proxy.setExtraParam('pLanguage', data.language);
        proxy.setExtraParam('pNewMembers', data.newMembers);
        proxy.setExtraParam('pProviderType', data.providerType);
        proxy.setExtraParam('pSpecCode', data.speciality);
        proxy.setExtraParam('pAffiliation', data.affiliations);
        proxy.setExtraParam('pState', user.portalStateSelected); //*****
        proxy.setExtraParam('pCountyCode', data.county);
        proxy.setExtraParam('pCity', data.city);
        proxy.setExtraParam('pZipcode', 0);
        proxy.setExtraParam('pRadius', 0);
        proxy.setExtraParam('pLOBID', data.lob ? data.lob : 'ALL');
        proxy.setExtraParam('pCSHCS', 'NO'); // Not on screen

        var pMedicaidExpansion = false;
        if (user.portalStateSelected == 'IA' && vm.get('benefitPlanCode') == '1210233') {
            pMedicaidExpansion = true;
        }

        proxy.setExtraParam('pMedicaidExpansion', pMedicaidExpansion);
        return true
    },

    onSearchResultsLoad: function (store, records) {
        var vm = this.getViewModel(),
            searchResultsPaged = vm.getStore('searchResultsPaged');

        searchResultsPaged.getProxy().setData(records);
        searchResultsPaged.load();
        //store.removeAll(true);  //Optionally remove all records from here
        this.getView().unmask();
    },

    onCityBeforeLoad: function (store, operation) {
        var countyCombo = this.lookupReference('countyCombo'),
            cityCombo = this.lookupReference('cityCombo');

        if (countyCombo.getValue())
        {
            cityCombo.setDisabled(false);
        }

        return true;
    },

    onCityClear: function (store) {
        var cityCombo = this.lookupReference('cityCombo');
        cityCombo.setDisabled(true);
    },

    onResultsRowClick: function (row, record, tr, rowIndex, e, eOpts) {
        var vm = this.getViewModel();

        vm.set('providerDetails', record.data);
        vm.set('hideProviderDetails', false);

        var hoursPanel = this.lookupReference("hoursPanel");
        hoursPanel.update(record.data.Hours);
    },

    onClear: function () {
        var me = this,
            vm = me.getViewModel(),
            providerSearchForm = this.lookupReference('providerSearchForm'),
            providerSearchResult = this.lookupReference('providerSearchResult'),
            citiesStore = vm.getStore('cities'),
            lobCombo = this.lookupReference('lobCombo'),
            defaultLob = vm.get('defaultLob');

        providerSearchForm.reset();
        providerSearchResult.getStore().removeAll(); // clear the search results grid
        citiesStore.removeAll();

        lobCombo.setValue(defaultLob); // reset the lob combo to the default lob
        vm.set('providerDetails', null);
        vm.set('hideProviderDetails', true);
    },

    onCountyChange: function (combo, value) {

        var store = this.getViewModel().getStore('cities'),
            proxy = store.getProxy(),
            user = Ext.first('viewport').getViewModel().get('user');

        proxy.setExtraParam('pState', user.homeState);
        proxy.setExtraParam('pCountyCode', value);
        store.load();
    },

    onLobStoreLoad: function(records, operation, success) {
        var me = this,
            vm = me.getViewModel(),
            lobCombo = me.lookupReference('lobCombo');

        lobCombo.setValue(vm.get('defaultLob'));
        lobCombo.setReadOnly(records.data.count() <= 1);
    },

    onMemberLobChange: function (combo, value) {
        if (value) {
            var store = this.getViewModel().getStore('affiliations'),
                proxy = store.getProxy();

            proxy.setExtraParam('pListName', 'Affiliations' + value);
            store.load();
        }

    },

    formatPhone: function (value) {
        return Atlas.common.Util.formatPhone(value);
    },

    onChangePCPClick: function () {
        var me = this,
            user = Ext.first('viewport').getViewModel().get('user'),
            familyMemberId = me.lookupReference('familyListCombo').value,
            effectiveDate = me.lookupReference('effectiveDateCombo').value,
            lobId = me.lookupReference('lobCombo').value,
            vm = this.getViewModel(),
            providerDetails = vm.get('providerDetails'),
            response;

        if (familyMemberId && effectiveDate && lobId) {
            response = Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                async: true,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'portal/hp/memberpcpchangerequest/update',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pRecipientID: familyMemberId,
                    pProvID: providerDetails.provId,
                    pLocationID: providerDetails.locationID,
                    pEffDate: effectiveDate,
                    pLobID: lobId,
                    userState: user.portalStateSelected
                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if (obj.data){
                        // there was a problem
                        Ext.MessageBox.alert('Change PCP', obj.data);
                    }
                    else {
                        Ext.MessageBox.alert('Change PCP', 'Request for change of PCP has been sent to ' + user.portalPlanTitle + ' Member Services.');
                    }
                    console.dir(obj);
                },
                failure: function (response, opts) {
                    //<debug>
                    console.log('server-side failure with status code ' + response.status);
                    //</debug>
                }
            });
        }
        else {
            Ext.MessageBox.alert('Change PCP', 'You must select a provider, member, effective date and LOB before changing PCP.');
        }
    }
});
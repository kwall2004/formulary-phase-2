Ext.define('Atlas.pharmacy.view.AdvancedSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-advsearch',

    onSearch: function () {
        var vm = this.getViewModel(),
            pharmacies = vm.getStore('pharmacies'),
            view = this.getView(),
            name = view.lookupReference('name').getValue() == undefined || view.lookupReference('name').getValue() == null ? '' : view.lookupReference('name').getValue(),
            city = view.lookupReference('city').getValue() == undefined || view.lookupReference('city').getValue() == null ? '' : view.lookupReference('city').getValue(),
            zip = view.lookupReference('zip').getValue() == undefined || view.lookupReference('zip').getValue() == null ? '' : view.lookupReference('zip').getValue(),
            radius = view.lookupReference('radius').getValue() == undefined || view.lookupReference('radius').getValue() == null ? '' : view.lookupReference('radius').getValue(),
            state = view.lookupReference('state').getValue() == undefined || view.lookupReference('state').getValue() == null ? '' : view.lookupReference('state').getValue(),
            county = view.lookupReference('county').getValue() == undefined || view.lookupReference('county').getValue() == null ? '' : view.lookupReference('county').getValue(),
            pic = view.lookupReference('pic').getValue() == undefined || view.lookupReference('pic').getValue() == null ? '' : view.lookupReference('pic').getValue();

        if (!view.down('form').isValid()) {
            Ext.Msg.alert('Message', 'Please correct form errors.');
            return;
        }

        if (name == '' && city == '' && zip == '' && radius == '' && state == '' && county == '' && pic == '') {
            Ext.Msg.alert('Message', 'Please enter at least one search criteria.');
            return;
        }

        if (zip != '' && radius == '') {
            Ext.Msg.alert('Message', 'Please provide radius while searching with zip.');
            return;
        }

        view.down('pagingtoolbar').moveFirst();

        pharmacies.getProxy().setExtraParam('pPharmacyNetwork', 0);
        pharmacies.getProxy().setExtraParam('pRadius', radius);
        pharmacies.getProxy().setExtraParam('pEffDate', null);
        pharmacies.getProxy().setExtraParam('pZip', zip);
        pharmacies.getProxy().setExtraParam('pPharmacyName', name);
        pharmacies.getProxy().setExtraParam('pPharmacyType', '');
        pharmacies.getProxy().setExtraParam('pLOB', 0);
        pharmacies.getProxy().setExtraParam('pShowContractedOnly', false);
        pharmacies.getProxy().setExtraParam('pPIC', pic);
        pharmacies.getProxy().setExtraParam('pState', state);
        pharmacies.getProxy().setExtraParam('pCity', city);
        pharmacies.getProxy().setExtraParam('pCounty', county);
        pharmacies.load();
    },

    onReset: function (bt) {
        var view = this.getView(),
            vm = this.getViewModel(),
            pharmacies = vm.getStore('pharmacies'),
            counties = vm.getStore('counties');

        bt.up('form').reset();
        pharmacies.removeAll();
        counties.removeAll();
        view.down('pagingtoolbar').onLoad();
    },

    onRecordSelect: function (grid, rec) {
        var view = this.getView();
        //Fire event with 3 params that will be received in Parent view:
        // origin (to properly target the receiving tab), ncpdpId and npi
        this.fireEvent('selected', view.origin, rec.get('NCPDPID'), rec.get('NPI'));
        view.close();
    },

    onStateChange: function (combo, value) {
        var vm = this.getViewModel(),
            counties = vm.getStore('counties');

        if (value != null && value != '') {
            counties.getProxy().setExtraParam('pState', value);
            counties.load();
        }
        else {
            counties.removeAll();
        }
    }

});
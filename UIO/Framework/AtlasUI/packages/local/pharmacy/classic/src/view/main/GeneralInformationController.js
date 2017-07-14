Ext.define('Atlas.pharmacy.view.main.GeneralInformationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-general',

    listen: {
        controller: {
            'pharmacy': {
                datachanged: 'onModuleDataChange'
            }
        }
    },

    onModuleDataChange: function (origin) {
        var me = this,
            vm = me.getViewModel(), // Our model is the parent view model as we don't have our own
            view = me.getView(),
            pharmacy = vm.get('activePharmacy'),
            pharmacyRelationship = vm.getStore('pharmacyRelationship'),
            contractStatus = '',
            effDate = '',
            termDate = '',
            i = 0,
            records,
            len;

        var changeDateFormat = function (dateStr) {
            var d = Ext.Date;
            if(dateStr){
            return d.format(dateStr, 'm/d/Y');}
            else{
                return '';
            }
        };
        if(vm.data.activePharmacy) {
            if (vm.data.activePharmacy.data.locState == "null") {
                vm.data.activePharmacy.data.locState = "";
            }
            if (vm.data.activePharmacy.data.mailState == "null") {
                vm.data.activePharmacy.data.mailState = "";
            }
        }

        //Prevent any data collisions between tabs
        if (origin && origin !== view.ownerCt.id) {
            return;
        }

        view.reset(); // cleaning out any values
        vm.set('contract', {});

        if (pharmacy && pharmacy.get('npi')) {
            // Pharmacy data available
            view.loadRecord(pharmacy);
            // Contracts section (Logic taken from original c# code)
            //NOTE: This has to be calculated on server side!
            //TODO Move to server side and get simple API instead

            //1) Reduce resultset
            //ContractStatus='Active' and (Excluded='' or Excluded is null) and (RLTermDate='' or RLTermDate is null)
            // Assumption - seems that the data is ordered from the server based on contract date
            pharmacyRelationship.filter(new Ext.util.Filter({
                filterFn: function (item) {
                    // return item.ContractStatus === 'Active' && (item.Excluded === '' ||item.Excluded === null) && (item.RLTermDate==='' || item.RLTermDate === null) ;
                    //Simplified according to JavaScript language rules
                    //Note: RLTermDate does not exist in payload?
                    return item.get('contractStatus') === 'Active' && !item.get('Excluded') && !item.get('RLTermDate');
                }
            }));

            //2) Loop over records
            records = pharmacyRelationship.getRange();
            if (!records.length) {
                contractStatus = 'No Active Contract';
            }

            len = records.length;
            me.pendingChainedLoads = len; //Every record has to be looked up for pricingMasterData

            //This might take a while - add loadmask
            //view.down('#contracts').mask(); // BUG. Fieldset mask is incorrectly placed in Triton Theme - EXTJS-23429.

            for (; i < len; i++) {
                // Logic:
                // Again RLEffectiveDate is not on the model!
                // if (TermDate && term date >= today) and (EffectiveDate <= today) and (RLEffectiveDate<=today)
                if (records[i].get('Termdate')==''?null:records[i].get('Termdate') >= Atlas.common.utility.Utilities.getLocalDateTime()  &&
                    records[i].get('EffectiveDate')==''?null:records[i].get('EffectiveDate') <= Atlas.common.utility.Utilities.getLocalDateTime()  &&
                    records[i].get('RLEffectiveDate')==''?null:records[i].get('RLEffectiveDate') <= Atlas.common.utility.Utilities.getLocalDateTime() ) {
                contractStatus = 'In Network Active';
                if (records[i].get('EffectiveDate') > records[i].get('RLEffectiveDate')) {
                    effDate = changeDateFormat(records[i].get('EffectiveDate'));
                }
                else{
                    effDate = changeDateFormat(records[i].get('RLEffectiveDate'));
                }

                if (records[i].get('TermDate') != null && records[i].get('TermDate') != '') {
                    termDate = changeDateFormat(records[i].get('TermDate'));
                }
                else {
                    termDate = '';
                }

                // Contract status -> Contracts build line
                // model is defined without Atlas, because it's part of the chema and can be skipped (schema is defined in Base model)
                Ext.create('Ext.data.Store', {model: 'pharmacy.model.PricingMasterData'}).load({
                    params: {
                        ParentSystemId: records[i].get('SystemId')
                    },
                    callback: function (pricingrecords) {
                        var arr = vm.get('contract.contracts') || [],
                            len = pricingrecords.length,
                            j = 0,
                            data;

                        for (; j < len; j++) {
                            data = pricingrecords[j].data;
                            arr.push(data['LOB'] + ' ' + data['FulfillmentType']);
                        }

                        vm.set('contract.contracts', arr);
                        me.onPricingStoreLoad();
                    }
                });
            }
            }

            // Add fields that were not directly available in the pharmacy record
            // FWALockFlag
            view.down("#chkFWAPharmacylock").setValue(pharmacy.get('PharmacyAdditionalInfo.FWALockFlag') === 'yes');

            //Contracts
            view.down("#contractStatusInfo").setValue(contractStatus);
           // vm.set('contract.contractStatus', contractStatus);
            vm.set('contract.effectiveDate', effDate);
            vm.set('contract.termDate', termDate);

            // Remove filter
            pharmacyRelationship.clearFilter();
        }
    },

    onPricingStoreLoad: function () {
        var me = this;
        --me.pendingChainedLoads;

        //All chained stores loaded - we can use the data
        if (!me.pendingChainedLoads) {
            me.showContracts();
        }
    },

    showContracts: function () {
        var contract = this.getViewModel().get('contract'),
            arr = contract.contracts,
            view = this.getView();

        //Filter out dupes
        arr = arr.filter(function (element, index, array) {
            return element in this ? false : this[element] = true;
        }, {});

        //view.down('#contracts').unmask();
        view.getForm().setValues({
            _contractStatus: contract.contractStatus,
            _effectiveDate: contract.effectiveDate,
            _termDate: contract.termDate,
            _contracts: contract.contracts.join(', ') // contracts is an array
        });
    }
});

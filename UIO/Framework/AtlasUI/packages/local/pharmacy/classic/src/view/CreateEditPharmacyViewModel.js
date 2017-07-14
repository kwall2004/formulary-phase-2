/**
 * Created by n6684 on 11/19/2016.
 */

Ext.define('Atlas.authorization.view.CreateEditPharmacyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.createeditpharmacyviewmodel',

    stores: {
        storepbmcreated: {
            model: 'Atlas.pharmacy.model.CreateEditPharmacyModel',
            autoLoad: false
        },

        storepharmacymasterdata: {
            model: 'Atlas.pharmacy.model.PharmacyMasterData',
            autoLoad: false
        },

        storePharmacyRelationShipDetail: {
            model: 'Atlas.pharmacy.model.PharmacyRelationShipDetail',
            autoLoad: false
        },

        storepharmacyservicetype: {
            model:  'Atlas.pharmacy.model.PharmacyRelationship',
            autoLoad: false
        },

        storeDispenserType: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DispenserType'
                },
                url: 'shared/{0}/listitems',
                reader: {
                    //Specify metadata property
                    metaProperty: 'metadata',
                    //Optionally specify root of the data if it's other than 'data'
                    rootProperty: function(payload) {

                        return payload.data.filter(function(el) {
                            return el.name !== "ALL";
                        });
                    }
                }
            }
        },

        storeDispenserClass: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'DispenserClass'
                },
                url: 'shared/{0}/listitems'

            }
        },

        storelocationstates: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'states'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storemailingstates: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'states'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storeLOB: {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        },

        storeCarrierLOBs: {
            model: 'Atlas.pharmacy.model.CarrierLOBs',
            autoLoad: false
        },

        storeSetPharmacyMasterData: {
            model: 'Atlas.pharmacy.model.SetPharmacyMasterData',
            autoLoad: false
        }
    }
});
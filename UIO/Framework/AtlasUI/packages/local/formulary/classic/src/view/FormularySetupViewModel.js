/**
 * Created by s6627 on 10/14/2016.
 */
Ext.define('Atlas.formulary.view.FormularySetupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formularysetupviewmodel',
    stores: {
        StoreMedicareSTDescription: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MedicareSTDescription'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreMedicareSTCountsAndValues: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MedicareSTCountsAndValues'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreMedicarePATypes: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MedicarePATypes'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreMedicarePANames: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MedicarePANames'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StorePBMRules: {
            model: 'Atlas.formulary.model.PBMRulesModel',
            autoLoad: true
        },
        StoreImportFields: {
            model: 'Atlas.formulary.model.FormularyImportFields',
            autoLoad: true,
            listeners: {
                load: 'LoadImportRules'
            }
        },
        StoreTierList: {
            model: 'Atlas.formulary.model.FormularyTiers',
            autoLoad: false
        },
        StoreGenderList:{
            autoLoad: true,
            fields: ['id', 'name'],
            data : [
                {"id":"0", "name":""},
                {"id":"1", "name":"Male"},
                {"id":"2", "name":"Female"}
            ]
        },
        StorePAGenderList:{
            autoLoad: true,
            fields: ['id', 'name'],
            data : [
                {"id":"0", "name":""},
                {"id":"1", "name":"Male Only"},
                {"id":"2", "name":"Female Only"}
            ]
        },
        StorePDLStatusList: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'PDLFlag'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreQLPeriods: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'QLTimePeriod'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreAgeRestric: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'AgeRestriction'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreCopayTypeList: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'FormularyCopayTypes'
                },
                url: 'shared/{0}/listitems'
            }
        },
        StoreCoverageList: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'CoverageRestriction'
                },
                url: 'shared/{0}/listitems'
            }
        },
        storeYear: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'YearList'
                },
                url: 'shared/{0}/listitems'
            }
        },
        storeMonth: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MonthList'
                },
                url: 'shared/{0}/listitems'
            }
        }
    }
})

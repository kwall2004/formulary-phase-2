/**
 * Created by mkorivi on 10/13/2016.
 */
Ext.define('Atlas.formulary.view.FormularyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formulary',
    data: {
        masterrecord: null,
        formularyaction: null,
        createformulary: false,
        AssociatedPlans:[]


    },


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
        menu: {
            model: 'Atlas.common.model.SystemMenu'
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
        StoreTierList: {
            model: 'Atlas.formulary.model.FormularyTiers',
            autoLoad: false
        },
        StoreImportFields: {
            model: 'Atlas.formulary.model.FormularyImportFields',
            autoLoad: false
        },
        StoreImportFieldsClone:
        {
            autoLoad: false
        },
        StoreImportFieldsRemoved:
        {
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
        },
        StoreFormularyList:
        {
            model: 'Atlas.formulary.model.FormularyApprovalModel',
            autoLoad: true

        },
        StoreDataSource:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'FormularyDataSource'
                },
                url: 'shared/{0}/listitems'
            }

        },
        StoreTierBasis:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'FormularyTierBasis'
                },
                url: 'shared/{0}/listitems'
            }

        },

        StoreTiersException:
        {
            autoLoad: false


        },
        StoreFormularyType:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'FormularyTypes'
                },
                url: 'shared/{0}/listitems'
            }

        },
        StoreDrugType:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListDetailModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'drugTypeFunction'
                },
                url: 'system/{0}/listdetail'
            }

        },
        StoreExcTPACodesFDB:
        {

            model: 'Atlas.formulary.model.FormularyFDBDrugCatCodes',
            autoLoad: false

        },
        StoreExcRtOfAdminFDB:
        {

            model: 'Atlas.formulary.model.FormularyFDBRouteOfAdmins',
            autoLoad: false

        },
        StoreExcTPACodesMSB:
        {

            model: 'Atlas.formulary.model.MSValidationTPACodes',
            autoLoad: false

        },
        StoreExcRtOfAdminMSB:
        {

            model: 'Atlas.formulary.model.MSValidation',
            autoLoad: false

        },
        StoreFormularyInfo:
        {

            model: 'Atlas.formulary.model.FormularyModel',
            autoLoad: false,
            remoteSort: true

        },

        StoreTiers:
        {
            model: 'Atlas.formulary.model.FormularyTiers',
            autoLoad: false,
            remoteSort: true
        },
        StoreFormularyRuleDetails:
        {
            model: 'Atlas.formulary.model.FormularyRuleDetails',
            autoLoad: false,
            remoteSort: true

        },
        storeMedication: {
            pageSize: 10,
            model: 'Atlas.formulary.model.MedicationModel',
            remoteSort:true,
            remoteFilter: true
        }

    }


});
Ext.define('Atlas.portals.prescriber.model.FormularyDrugSearchResults', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'LN', type: 'string' },
        { name: 'DrugType', type: 'string' },
        { name: 'Covered', type: 'string' },
        { name: 'BN', type: 'string' },
        { name: 'OTCInd', type: 'string' },
        { name: 'FormularyID', type: 'string' },
        { name: 'MinAge', type: 'string' },
        { name: 'MaxAge', type: 'string' },
        { name: 'PAInd', type: 'string' },
        { name: 'Copay', type: 'string' },
        { name: 'maxCopay', type: 'string' },
        { name: 'coinsuranceStartAmt', type: 'string' },
        { name: 'deductible', type: 'string' },
        { name: 'DrugCode', type: 'string' },
        { name: 'strength', type: 'string' },
        { name: 'SideEffect', type: 'string' },
        { name: 'tierCode', type: 'string' },
        { name: 'tierDesc', type: 'string' },
        { name: 'TitleName', type: 'string' },
        { name: 'Uses', type: 'string' },
        { name: 'OtherBrandNames', type: 'string' },
        { name: 'CoverageGapDrug', type: 'string' }
    ],

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/prescriberdrugsearch'
    }
});
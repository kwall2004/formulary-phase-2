/**
 * Created by mkorivi on 10/13/2016.
 */
Ext.define('Atlas.formulary.model.FormularyModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'CreateDateTime', type: 'string'},
        {name: 'CreatedBy', type: 'string'},
        {name: 'dataSource', type: 'string'},
        {name: 'EffectiveDate', type: 'string'},
        {name: 'excRouteOfAdminCodes', type: 'string'},
        {name: 'excTPARestrictionCodes', type: 'string'},
        {name: 'FormularyID', type: 'string'},
        {name: 'FormularyName', type: 'string'},
        {name: 'formularyType', type: 'string'},
        {name: 'FormularyVersion', type: 'string'},
        {name: 'incExcOTC', type: 'string'},
        {name: 'incExcPresc', type: 'string'},
        {name: 'incRouteOfAdminCodes', type: 'string'},
        {name: 'incTPARestrictionCodes', type: 'string'},
        {name: 'lastModified', type: 'string'},
        {name: 'LastUpdateBy', type: 'string'},
        {name: 'LastUpdateDateTime', type: 'string'},
        {name: 'MDApprovedBy', type: 'string'},
        {name: 'MDApprovedDate', type: 'string'},
        {name: 'PDApprovedDate', type: 'string'},
        {name: 'PDApprovedBy', type: 'string'},
        {name: 'spareField01', type: 'string'},
        {name: 'spareField02', type: 'string'},
        {name: 'spareField03', type: 'string'},
        {name: 'spareIndexedField', type: 'string'},
        {name: 'Stat', type: 'string'},
        {name: 'systemID', type: 'string'},
        {name: 'TerminationDate', type: 'string'},
        {name: 'AssociatedPlanIds', type: 'string'},
        {name: 'AssociatedPlans', type: 'string'},
        {name: 'StatDesc', type: 'string'},
        {name: 'genMandatory', type: 'string'},
        {name: 'drugTypeFunction', type: 'string'},
        {name: 'activeDays', type: 'string'},
        {name: 'pdfPrintFunction', type: 'string'},
        {name: 'autoAddNewDrugs', type: 'string'}
    ],
    proxy: {
        render:{

            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }

        },
        url: 'formulary/{0}/formularyinfo'
    }
});
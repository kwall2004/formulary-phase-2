/**
 * Created by mkorivi on 10/13/2016.
 */
Ext.define('Atlas.formulary.model.FormularyApprovalModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'systemID', type: 'string'},
        {name: 'FormularyID', type: 'string'},
        {name: 'FormularyName', type: 'string'},
        {name: 'Stat', type: 'string'},
        {name: 'StatDesc', type: 'string'},
        {name: 'FormularyVersion', type: 'string'},
        {name: 'dataSource', type: 'string'},
        {name: 'formularyType', type: 'string'},
        {name: 'excTPARestrictionCodes', type: 'string'},
        {name: 'incTPARestrictionCodes', type: 'string'},
        {name: 'incRouteOfAdminCodes', type: 'string'},
        {name: 'excRouteOfAdminCodes', type: 'string'},
        {name: 'incExcOTC', type: 'string'},
        {name: 'incExcPresc', type: 'string'},
        {name: 'CreatedBy', type: 'string'},
        {name: 'LastUpdateBy', type: 'string'},
        {name: 'MDApprovedBy', type: 'string'},
        {name: 'PDApprovedBy', type: 'string'},
        {name: 'genMandatory', type: 'string'},
        {name: 'CreateDateTime',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'LastUpdateDateTime',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'EffectiveDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'TerminationDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'PDApprovedDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'MDApprovedDate', type: 'date', dateFormat: 'Y-m-d'}

    ],
    proxy: {

        url: 'formulary/{0}/formularies'

    }
});

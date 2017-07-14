/**
 * Created by s6627 on 10/11/2016.
 */

Ext.define('Atlas.formulary.model.FormularyDetailModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'NDC', type: 'string'},
        {name: 'FormularyId', type: 'int'},
        {name: 'FormularyTierId', type: 'int'},
        {name: 'PAInd', type: 'boolean'},
        {name: 'QtyLimit', type: 'int'},
        {name: 'QtyLmtTimePeriod', type: 'string'},
        {name: 'DaysSupply', type: 'int'},
        {name: 'DaysSupplyTimePeriod', type: 'string'},
        {name: 'RuleStatus', type: 'string'},
        {name: 'RuleStatusDesc', type: 'string'},
        {name: 'Notes', type: 'string'},
        {name: 'ApprovedBy', type: 'string'},
        {name: 'ApprovedOn', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'SystemID', type: 'string'},
        {name: 'FormularyTierName', type: 'string'},
        {name: 'isUpdated', type: 'boolean'}

    ],
    proxy: {
        extraParams: {
            ipcNDC:'',
            pagination: true
        },
        url: 'formulary/{0}/customndcformdetail',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});

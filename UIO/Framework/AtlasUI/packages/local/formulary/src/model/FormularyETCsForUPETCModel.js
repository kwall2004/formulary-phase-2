/**
 * Created by s6627 on 10/17/2016.
 */
Ext.define('Atlas.formulary.model.FormularyETCsForUPETCModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'ETC_Name', type: 'string'},
        {name: 'ParentETC_ID', type: 'string'},
        {name: 'ULT_PARENT_ETC_ID', type: 'string'},
        {name: 'UltChildInd', type: 'string'},
        {name: 'ETC_Hierarchy_Level', type: 'string'},
        {name: 'RuleSetupRecordExists', type: 'string'},
        {name: 'Covered', type: 'string'}
    ],
    proxy: {
        extraParams: {
            piFormularyID:'10',
            piVersion:'46',
            piUltPETCID:'10'
        },
        url: 'formulary/{0}/formularyetcsforupetc',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});
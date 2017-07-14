/**
 * Created by s6627 on 10/17/2016.
 */
Ext.define('Atlas.formulary.model.FormularyTreeNDCModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'DrugCode', type: 'string'},
        {name: 'LN', type: 'string'},
        {name: 'Brand', type: 'string'},
        {name: 'DrugType', type: 'string'},
        {name: 'GNN60', type: 'string'},
        {name: 'ETC_ID', type: 'string'},
        {name: 'HICL_SeqNo', type: 'string'},
        {name: 'GCN_SeqNo', type: 'string'},
        {name: 'NDCAddDate', type: 'string'},
        {name: 'LastModDate', type: 'string'},
        {name: 'RuleSetupRecordExists', type: 'string'},
        {name: 'Covered', type: 'string'}
    ],
    proxy: {
        extraParams: {
            piFormularyID:'10',
            piVersion:'46',
            piETCID:'11',
            pcOTCind:'NO'
        },
        url: 'formulary/{0}/formularytreendcs',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});
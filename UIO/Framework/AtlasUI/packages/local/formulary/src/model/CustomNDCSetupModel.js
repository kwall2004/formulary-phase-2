/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.model.CustomNDCSetupModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'NDC', type: 'string'},
        {name: 'GCN_SeqNo', type: 'string'},
        {name: 'LN', type: 'string'},
        {name: 'NPT_DATEC', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'NPT_PRICEX', type: 'float'}
    ],
    proxy: {
        extraParams: {
            ipcRecordType:'NDC',
            ipcNDC:'',
            pagination: true
        },
        url: 'formulary/{0}/customndc',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});

/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.model.CustomNDCHistoryModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'NPT_TYPE', type: 'string'},
        {name: 'NPT_PRICEX', type: 'number'},
        {name: 'NDC', type: 'string'},
        {name: 'NPT_DATEC', type: 'date', dateFormat: 'Y-m-d'}
    ],
    proxy: {
        extraParams: {
            ipcRecordType:'PRICINGHIST',
            ipcNDC:''
        },
        url: 'formulary/{0}/customndc',
        reader: {
            type    : 'json',
            rootProperty: function(payload) {
                var result=payload.metadata.ttPricingHist.ttPricingHist;
                return result;
            }
        }
    }
});

/**
 * Created by mkorivi on 11/4/2016.
 */
Ext.define('Atlas.formulary.model.FDBDrugsSearchModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'DRUGCODE', type: 'string'},
        {name: 'LN', type: 'string'},
        {name: 'BN', type: 'string'},
        {name: 'DRUGTYPE', type: 'string'},
        {name: 'H3Code', type: 'string'},
        {name: 'GCN_SEQNO', type: 'string'},
        {name: 'OTCIND', type: 'string'},
        {name: 'ETC_ID', type: 'string'},
        {name: 'ETC_NAME', type: 'string'},
        {name: 'ETC_NAME_Calculated', type: 'string',calculate:function(data)
        {
            return "(" + data.ETC_ID + ")" + data.ETC_NAME;
        }},
        {name: 'ULTPARENTETC_NAME', type: 'string'},
        {name: 'DOSAGE', type: 'string'},
        {name: 'ROUTOFADMIN', type: 'string'},
        {name: 'STRENGTH', type: 'string'},
        {name: 'FORMULARIES', type: 'string'},
        {name: 'AWPUntPrc', type: 'number'},
        {name: 'AWPPkgPrc', type: 'number'},
        {name: 'WACUntPrc', type: 'number'},
        {name: 'WACPkgPrc', type: 'number'},
        {name: 'FFPUL', type: 'number'},
        {name: 'SWPUntPrc', type:'number'},
        {name: 'SWPPkgPrc', type:'number'},
        {name: 'MACPrc',type:'number'},
        {name: 'formIdVsn',type:'string'},
        {name: 'systemId',type:'string'},
        {name: 'dbRowID',type:'string'},
        {name: 'RowNum', type: 'string'},
        {name: 'MaintFlag', type: 'string'},
        {name: 'Repackagedind', type: 'string'},
        {name: 'AddDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'ObsoleteDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'Manufacturer', type: 'string'},
        {name: 'CoverageGapDrug', type: 'string'},
        {name: 'avgIngYtd', type: 'number'},
        {name: 'totRxYtd', type: 'number'},
        {name: 'totQtyYtd', type: 'number'},
        {name: 'totIngYtd', type: 'number'},
        {name: 'mktRxYtd', type: 'number'},
        {name: 'mktQtyYtd', type: 'number'},
        {name: 'mktIngYtd', type: 'number'},
        {name: 'RxCUI', type: 'string'}





    ],
    proxy: {
        url: 'formulary/{0}/fdbdrugsearch',
        extraParams: {
            pagination: true,
            ipiBatchSize: '',
            ipiRecStart: '0',
            timeout: 5000000
        }

    }


});

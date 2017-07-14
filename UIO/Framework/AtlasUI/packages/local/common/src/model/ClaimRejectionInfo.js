/**
 * Created by T4317 on 10/21/2016.
 */
Ext.define('Atlas.common.model.ClaimRejectionInfo', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'rejectCode',type: 'string'},
        {name: 'rejectFieldInd',type: 'string'},
        {name: 'DESCRIPTION',type: 'string'},
        {name: 'respMessage',type: 'string'},
        {name: 'rowNum',type: 'string'},
        {name: 'rowID',type: 'string'},
        {name: 'Carrier',type: 'string'},
        {name: 'Account',type: 'string'},
        {name: 'LOB',type: 'string'}
    ],
    proxy:{
        extraParams:{
            pRowid: 0,
            pRowNum: 0,
            pBatchSize: 25
        },
        url:'claims/rx/claimrejectcodesext'
    }
});
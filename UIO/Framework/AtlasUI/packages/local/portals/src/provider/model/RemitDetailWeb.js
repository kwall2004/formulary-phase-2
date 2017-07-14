/**
 * Created by c4539 on 11/21/2016.
 */
Ext.define('Atlas.portals.provider.model.RemitDetailWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'servLnProcCodeDesc', type: 'string', mapping: 'procDesc'},
        {name: 'servLnMod1',type: 'string', mapping: 'mod1'},
        {name: 'servLnMod2',type: 'string', mapping: 'mod2'},
        {name: 'servLnMod3',type: 'string', mapping: 'mod3'},
        {name: 'servLnMod4',type: 'string', mapping: 'mod4'},
        {name: 'servLnFromDate', type: 'date', dateFormat: 'Y-m-d', mapping: 'serviceDate'},
        {name: 'servLnProcCode',type: 'string', mapping: 'procCode'},
        {name: 'checkNum',type: 'string', mapping: 'checkNum'},
        {name: 'servLnToDate', type: 'date', dateFormat: 'Y-m-d', mapping: 'servthrudate'},
        {name: 'servLnDiagCode',type: 'string', mapping: 'diagCdInd'},
        {name: 'Paid', type: 'string', mapping: 'Paid'},
        {name: 'servLnNDC',type: 'string', mapping: 'ndc'},
        {name: 'revCode',type: 'string', mapping: 'revCode'},
        {name: 'servLnUnits',type: 'string', mapping: 'Units'},
        {name: 'Trn',type: 'string', mapping: 'Trn'},
        {name: 'servLnOtherInsPaid', type: 'string', mapping: 'otherInsPaid'},
        {name: 'Denied',type: 'string', mapping: 'Denied'},
        {name: 'servLnLineNum',type: 'string', mapping: 'lineNum'},
        {name: 'servLnBilled',type: 'string', mapping: 'Billed'},
        {name: 'claimStatus',type: 'string', mapping: 'claimStatus'},
        {name: 'checkdate', type: 'date', dateFormat: 'Y-m-d', mapping: 'checkdate'}
    ],

    proxy: {
        url: 'provider/hp/remitdetailweb'
    }
});
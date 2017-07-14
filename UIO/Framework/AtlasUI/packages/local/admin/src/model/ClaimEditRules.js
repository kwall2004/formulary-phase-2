/**
 * Created by d3973 on 9/28/2016.
 */
Ext.define('Atlas.admin.model.ClaimEditRules', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimeditrules',

    fields: [{
        name: 'ttRuleID',
        type: 'int'
    }, {
        name: 'ttActive',
        type: 'boolean'
    }, {
        name: 'ttAlert',
        type: 'boolean'
    }, {
        name: 'ttRuleName',
        type: 'string'
    }, {
        name: 'ttRuleLevel',
        type: 'string'
    }, {
        name: 'ttRuleSeq',
        type: 'string'
    }, {
        name: 'ttSegmentID',
        type: 'string'
    }, {
        name: 'ttdataSource',
        type: 'string'
    }, {
        name: 'ttTransactionType',
        type: 'string'
    }, {
        name: 'ttIfTrueDoWhat',
        type: 'string'
    }, {
        name: 'pVersion',
        type: 'string'
    }, {
        name: 'ttNCPDPerrCd',
        type: 'string'
    }, {
        name: 'ttsecNCPDPerrC',
        type: 'string'
    }, {
        name: 'ttErrintDesc',
        type: 'string'
    }, {
        name: 'ttDURRsnCode',
        type: 'string'
    }, {
        name: 'ttEffdate',
        type: 'date'
    }, {
        name: 'ttTermDate',
        type: 'date'
    }],

    proxy: {
        extraParams: {
            pVersion: 'D0',
            pagination: true
        },
        url: 'claims/{0}/claimeditrules'
    }
});
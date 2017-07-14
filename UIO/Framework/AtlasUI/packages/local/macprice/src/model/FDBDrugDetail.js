
Ext.define('Atlas.macprice.model.FDBDrugDetail', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'NDC', type: 'string'},
        {name: '@mfg', type: 'string'},
        {name: '@drugType', type: 'string'},
        {name: 'GCN_SEQNO', type: 'string'},
        {name: 'PS', type: 'string'},
        {name: 'LN', type: 'string'},
        {name: 'BN', type: 'string'},
        {name: 'PNDC', type: 'string'},
        {name: 'REPNDC', type: 'string'},
        {name: 'DADDNC', type: 'string'},
        {name: 'OBSDTEC', type: 'string'},
        {name: 'HCFA_UNIT', type: 'string'},
        {name: 'HCFA_UNITYesNo', type: 'string',
            calculate: function (data) {
                return (data.HCFA_UNIT == '0' ? 'No' : (data.HCFA_UNIT == '1' ? 'Yes' : data.HCFA_UNIT));
            }
        },
        {name: 'HCFA_PS', type: 'string'},
        {name: 'HCFA_MRKC', type: 'string'},
        {name: 'HCFA_TRMC', type: 'string'},
        {name: 'OBC', type: 'string'},
        {name: 'DEA', type: 'string'},
        {name: 'GNI', type: 'string'},
        {name: 'GNIYesNo', type: 'string',
            calculate: function (data) {
                return (data.GNI == '0' ? 'No' : (data.GNI == '1' ? 'Yes' : data.GNI));
            }
        },
        {name: 'GTI', type: 'string'},
        {name: 'GTIYesNo', type: 'string',
            calculate: function (data) {
                return (data.GTI == '0' ? 'No' : (data.GTI == '1' ? 'Yes' : data.GTI));
            }
        },
        {name: 'REPACK', type: 'string'},
        {name: 'REPACKYesNo', type: 'string',
            calculate: function (data) {
                return (data.REPACK == '0' ? 'No' : (data.REPACK == '1' ? 'Yes' : data.REPACK));
            }
        },
        {name: 'UD', type: 'string'},
        {name: 'UDYesNo', type: 'string',
            calculate: function (data) {
                return (data.UD == '0' ? 'No' : (data.UD == '1' ? 'Yes' : data.UD));
            }
        },
        {name: 'CL', type: 'string'}
    ],
    proxy: {
        extraParams: {

        },
        url: 'formulary/{0}/fdbdrugdetails'
    }
});
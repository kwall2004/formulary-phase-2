Ext.define('Atlas.portals.rxmember.model.MemberPrescriptionExpense', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'rowNum',type: 'int'},
        {name: 'amt',type: 'string'},
        {name: 'itemDescription',type: 'string'},
        {name: 'displayAmt', type: 'string', calculate: function(obj) {
            return '$' + obj.amt;
        }}
    ],

    proxy: {
        extraParams: {
            pType:'m'
        },
        url: 'member/{0}/memberprescriptionexpense'
    }
});
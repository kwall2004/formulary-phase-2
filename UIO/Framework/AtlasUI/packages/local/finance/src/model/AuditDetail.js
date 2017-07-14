Ext.define('Atlas.finance.model.AuditDetail', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'passed', type: 'string' },
        { name: 'completeDate',type:'date',
            convert: function(v) {
                return Ext.util.Format.date(v, 'm/d/Y');
            } },
        { name: 'assignTo', type: 'string' },
        { name: 'assignTo', type: 'string' }

    ],

    proxy: {
        url: 'pharmacy/{0}/pharmacyauditmasterext'
    }
});
/**
 * Created by p3946 on 8/25/2016.
 */
Ext.define('Atlas.member.model.AuditMaster', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {
            name: 'auditDate',
            type:'date',
            dateFormat: 'c',
            convert: function(v) {
                return Ext.util.Format.date(v, 'm/d/Y');
            }
        }
    ],

    proxy: {
        extraParams: {
            pRowNum: 0,
            pBatchSize: 0,
            pSort: "",
            pAuditGUID: ""
        },
        url: 'shared/{0}/auditmaster'
    }
});
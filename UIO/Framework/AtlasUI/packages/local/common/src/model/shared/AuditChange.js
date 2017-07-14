/**
 * Created by akumar on 11/30/2016.
 */
Ext.define('Atlas.member.model.AuditChange', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'ttAuditChange'
    ],

    proxy: {
        url: 'shared/{0}/auditchange'
    }
});
/**
 * Created by s6685 on 12/7/2016.
 */
Ext.define('Atlas.admin.model.AuditHistoryModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pTableName:'',
            pWhere:'',
            pFieldList:''

        },
        url: 'shared/{0}/audithistoryrest'
    }
});



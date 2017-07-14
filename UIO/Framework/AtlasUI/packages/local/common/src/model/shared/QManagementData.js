Ext.define('Atlas.common.model.shared.QManagementData', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pFieldList: 'Acknowledge,AcknowledgedDate,AcknowledgedUserName'
        },
        url: 'shared/{0}/qmanagementdata'
    }
});
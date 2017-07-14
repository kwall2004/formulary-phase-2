/**
 * Created by d3973 on 10/28/2016.
 */
Ext.define('Atlas.member.model.QManagementData', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'pFields',
        type: 'string'
    }],

    proxy: {
        url: 'system/{0}/qmanagementdata'
    }
});
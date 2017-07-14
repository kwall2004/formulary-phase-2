/**
 * Created by d3973 on 11/2/2016.
 */
Ext.define('Atlas.plan.model.PbmTaskConfiguration', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'TaskConfigId'
        //type: 'number'
    }, {
        name: 'TaskName',
        type: 'string'
    }, {
        name: 'CarrierName',
        type: 'string'
    }, {
        name: 'CarrierAccountName',
        type: 'string'
    }, {
        name: 'CarrierLobName',
        type: 'string'
    }, {
        name: 'Active',
        type: 'boolean'
    }, {
        name: 'ProgramName',
        type: 'string'
    }],

    proxy: {
        url: 'shared/{0}/pbmtaskconfiguration'
    }
});
/**
 * Created by s4505 on 10/13/2016.
 */

Ext.define('Atlas.admin.model.PbmRules', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminpbmrules',

    fields: [

        { name: 'RuleName',     type: 'string',defaultValue:'' },
        { name: 'RuleCriteria',      type: 'string',defaultValue:'' },
        { name: 'ProgressFuncName',   type: 'string',defaultValue:''},
        { name: 'RuleActive',   type: 'boolean',defaultValue:true},
        { name: 'SystemId', type:'number', mapping: 'systemID'}
    ],
    proxy: {
        url: 'shared/rx/pbmrules',
       // timeout: 120000,
        extraParams: {
            pagination: true
        }
    }

});
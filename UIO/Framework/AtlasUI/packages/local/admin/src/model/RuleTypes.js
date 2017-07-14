/**
 * Created by s4505 on 10/13/2016.
 */

Ext.define('Atlas.admin.model.RuleTypes', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminruletypes',

    fields: [{
        name: 'ruleId',
        type: 'int'
    }, {
        name: 'ruleName',
        type: 'string'
    }],
    proxy: {
        url: 'system/{0}/ruletypes'
    }
});
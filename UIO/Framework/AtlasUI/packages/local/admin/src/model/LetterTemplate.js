/**
 * Created by d4662 on 11/30/2016.
 */
Ext.define('Atlas.admin.model.LetterTemplate', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminLetterTemplate',

    fields: [
        { name: 'PlanGroupAccess',     type: 'string',defaultValue:'' },
        { name: 'LANGUAGE',      type: 'string',defaultValue:'' },
        { name: 'PlanGroupAccessDesc',   type: 'string',defaultValue:''},
        { name: 'Reason',   type: 'string',defaultValue:''},
        { name: 'SystemID', type:'number',defaultValue:0}
    ],
    proxy: {
        url: 'shared/rx/lettertemplatelanguage',
        timeout: 120000,
        extraParams: {
            pagination: true
        }
    }

});
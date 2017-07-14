/**
 * Created by S4505 on 10/20/2016.
 * Updated s4662 since
 */

Ext.define('Atlas.admin.model.DeterminationTimeFrame', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.admindeterminationTimeFrame',

    fields: [

        { name: 'coverageType',     type: 'string',defaultValue:'' },
        { name: 'RDType',      type: 'string',defaultValue:'' },
        { name: 'determinationCategory',   type: 'string',defaultValue:''},
        { name: 'urgency',     type: 'string',defaultValue:'' },
        { name: 'PGH',      type: 'string',defaultValue:''  },
        { name: 'ruleValue',   type: 'number',defaultValue:0},
        { name: 'tollIndicator',      type: 'boolean',defaultValue:false },
        { name: 'Active',   type: 'boolean',defaultValue:false},
        { name: 'coverageTypeDesc',     type: 'string' ,defaultValue:''},
        { name: 'RDTypeDesc',     type: 'string',defaultValue:'' },
        { name: 'determinationCategoryDesc',     type: 'string',defaultValue:'' },
        { name: 'urgencyDesc',     type: 'string',defaultValue:'' },
        { name: 'pgHierachySystemID',     type: 'number',defaultValue:0 },
        { name: 'systemID',     type: 'number',defaultValue:0 },
        { name: 'isNeedUpdate',   type: 'boolean', defaultValue:false}
    ],
    proxy: {
        url: 'claims/rx/determinationtimeframe',
        extraParams: {
            pagination: true
        },
        timeout: 120000
    }

});

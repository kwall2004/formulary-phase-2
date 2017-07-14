/**
 * Created by S4505 on 10/20/2016.
 * Updated by S4662
 */


Ext.define('Atlas.admin.model.OutreachConfiguration', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminOutreachConfiguration',

    fields: [

        { name: 'DeterminationType',     type: 'string',defaultValue:'' },
        { name: 'DeterminationTypeDesc',     type: 'string',defaultValue:'' },
        { name: 'Category',      type: 'string',defaultValue:'' },
        { name: 'CategoryDesc',      type: 'string',defaultValue:'' },
        { name: 'SubCategory',   type: 'string',defaultValue:''},
        { name: 'SubCategoryDesc',   type: 'string',defaultValue:''},
        { name: 'ContactedEntity',     type: 'string',defaultValue:'' },
        { name: 'ContactedEntityDesc',     type: 'string',defaultValue:'' },
        { name: 'AllowedAttempts',      type: 'string',defaultValue:'' },
        { name: 'AllowedContactCodes',   type: 'string',defaultValue:''},
        { name: 'SuccessContactCodes',      type: 'string',defaultValue:'' },
        { name: 'Active',   type: 'boolean',defaultValue:false},
        { name: 'isNeedUpdate',   type: 'boolean', defaultValue:false}
    ],
    proxy: {
        url: 'shared/rx/outreachconfiguration',
        timeout: 120000,
        extraParams: {
            pagination: true,
            pAuthID:''
        }
    }

});



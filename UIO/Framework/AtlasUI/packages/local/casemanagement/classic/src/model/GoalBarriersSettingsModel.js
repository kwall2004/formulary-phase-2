/**
 * Created by s6393 on 11/21/2016.
 */
Ext.define('Atlas.casemanagement.model.GoalBarriersSettingsModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'systemID', type: 'float',defaultValue:0},
        {name: 'reasonCode', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'groupPermissions', type: 'string'},
        {name: 'lastModified', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'active', type: 'bool',defaultValue:true},
        {name: 'isUpdated', type: 'boolean'}
    ],
    proxy: {
        url: 'member/{0}/mtmgoalbarriers',
        extraParams: {
            pShowAll: true,
            pagination: true
        },
    reader: {
        //Specify metadata property
        metaProperty: 'metadata',
        //Optionally specify root of the data if it's other than 'data'
        rootProperty: function(payload) {
            payload.data.forEach(function(item, index){
if(item.groupPermissions)
                item.TypeCode =item.groupPermissions.split(',');
            });



            return payload.data;
        }
    }
    }
});

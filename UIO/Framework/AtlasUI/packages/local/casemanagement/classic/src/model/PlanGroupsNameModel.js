/**
 * Created by s6627 on 12/5/2016.
 */
Ext.define('Atlas.casemanagement.model.PlanGroupsNameModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'planGroupName', type: 'string'},
        {name: 'planGroupCode', type: 'string'},
        {name: 'planGroupId', type: 'int'}
    ],
    proxy: {
        url: 'shared/{0}/sessionplangroups',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
})
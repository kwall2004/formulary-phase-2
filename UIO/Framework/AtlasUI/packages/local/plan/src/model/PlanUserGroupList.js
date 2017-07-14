/**
 * Created by S4505 on 12/13/2016.
 */

Ext.define('Atlas.plan.model.PlanUserGroupList', {
    extend: 'Atlas.common.model.Base',
    alias: 'plan-planusergrouplist',
    fields: [
        {name: 'groupName', type: 'string'},
        {name: 'groupId', type: 'string'}

    ],
    proxy: {
        url: 'shared/{0}/usergrouplist'
    }
});

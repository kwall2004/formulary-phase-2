/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.model.MemberGuardian', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'homephone', type: 'string' },
        { name: 'workphone', type: 'string' }
    ]
});
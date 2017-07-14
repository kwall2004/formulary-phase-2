/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.model.MemberContact', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'address', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'county', type: 'string' },
        { name: 'province', type: 'string' },
        { name: 'zipcode', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'homephone', type: 'string' },
        { name: 'cellphone', type: 'string' },
        { name: 'email', type: 'string' }
    ]
});
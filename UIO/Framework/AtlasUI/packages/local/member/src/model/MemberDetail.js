/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.model.MemberDetail', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'firstname', type: 'string' },
        { name: 'middlename', type: 'string' },
        { name: 'lastname', type: 'string' },
        { name: 'surfix', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'birthdate', type: 'date'},
        { name: 'age', type: 'int' },
        { name: 'ssn', type: 'string' },
        { name: 'language', type: 'string' },
        { name: 'ethnicity', type: 'string' },
        { name: 'deceaseddate', type: 'date' },
        { name: 'primarysubscriber', type: 'string' },
        { name: 'hinc', type: 'string' },
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
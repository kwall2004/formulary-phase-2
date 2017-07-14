/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.model.MemberEnrollmentHistory', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'action', type: 'string' },
        { name: 'auditdate', type: 'date' },
        { name: 'modifiedby', type: 'string' },
        { name: 'modifiedbyuserid', type: 'string' },
        { name: 'fieldname', type: 'string' },
        { name: 'oldvalue', type: 'string' },
        { name: 'newvalue', type: 'string' }
    ]
});
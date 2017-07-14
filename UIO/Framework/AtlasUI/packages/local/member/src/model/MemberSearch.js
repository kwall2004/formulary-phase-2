/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.model.MemberSearch', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'RecipientID', type: 'string', mapping: 'RecipientID' },
        { name: 'MemberName', type: 'string', mapping: 'MemberName' },
        { name: 'DOB', type: 'date', mapping: 'DOB' },
        { name: 'MemberID', type: 'string', mapping: 'MemberID' },
        { name: 'AccountName', type: 'string', mapping: 'AccountName' },
        { name: 'PlanGroup', type: 'string', mapping: 'PlanGroup' },
        { name: 'Gender', type: 'string', mapping: 'Gender' },
        { name: 'SSN', type: 'string', mapping: 'SSN' },
        { name: 'Status', type: 'string', mapping: 'Status' }
    ]
});
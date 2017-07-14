/**
 * Created by m4542 on 10/25/2016.
 */
Ext.define('Atlas.portals.hpmember.model.MemberDataWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [

        {name: 'birthDate', type: 'string'},
        {name: 'home.State', type: 'string'},
        {name: 'firstName', type: 'string'},
        {name: 'lastName', type: 'string'},
        {name: '@primaryLOB', type: 'string'},
        {name: '@dispMemberID', type: 'string'},
        {name: 'recipientID', type: 'string'},
        {name: '@familyList', type: 'string'},
        {name: '@Age', type: 'string'},
        {name: '@enrollmentStatus', type: 'string'},
        {name: '@subscriberId', type: 'string'},
        {name: 'gender', type: 'string'},

        'respHomePhone.contactInfo',
        '@contCoverageSince',
        '@contCoverageTerm',
        '@enrollmentStatus',
        '@PCP',
        '@PCPPhone'
    ],

    proxy: {
        url: 'eligibility/hp/memberdataweb'
    }

});
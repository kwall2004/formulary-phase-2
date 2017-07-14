/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Auth Inquiry - Member Search
 * Description: Member Search
 */

Ext.define('Atlas.portals.provider.model.MemberMasterExtPortal', {
    extend: 'Atlas.common.model.Base',

    fields:[
        {name: 'firstName', type: 'string'},
        {name: 'lastName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'LobId', type: 'string'},
        {name: 'recipientId', type: 'number'},
        {name: 'middleName', type: 'string'},
        {name: 'birthDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'memberID', type: 'string'}
    ],

    proxy: {
        url : 'member/hp/membermasterextportal'
        }

});
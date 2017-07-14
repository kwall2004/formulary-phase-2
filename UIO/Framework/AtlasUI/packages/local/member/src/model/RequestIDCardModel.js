/**
 * Created by j2487 on 10/12/2016.
 */
Ext.define('Atlas.member.model.RequestIDCardModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'AddressStreet', type:'string' },
        { name: 'Home_Address2',type:'string' },
        { name: 'AddressCity', type:'string' },
        { name: 'Home_State', type:'string' },
        { name: 'firstName', type:'string' },
        { name: 'lastName', type:'string' },
        { name: 'recipientId', type:'string' },
        { name: 'carrierName', type:'string' },
        { name: 'CardType', type:'string' },
        { name: 'memberId', type:'string'},
        { name: 'middlename', type:'string' },
        { name: 'home_zipCode', type:'string' },
        { name:'planGroupId',type:'string'}
    ],
    proxy: {
        extraParams: {
            pFolderOption: '',
            pEmailListName: ''

        },
        updateUrl: 'member/{0}/memberidcard'
    }

})
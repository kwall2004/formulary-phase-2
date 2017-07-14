/**
 * Created by agupta on 9/19/2016.
 */
Ext.define('Atlas.authorization.model.cdag.MemberGroupModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        { name: 'planGroupId', type : 'string'},
        { name: 'planGroupName', type : 'string'}
    ],

    proxy: {
     extraParams: {
         pRecipientId: ''
     },
     url: 'member/{0}/membergroup'
     }
    //proxy: {
    //    url: 'resources/data/dummydata/authorization/cdagmain.json'
    //}
});

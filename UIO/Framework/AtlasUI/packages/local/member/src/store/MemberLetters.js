/**
 * Created by S4505 on 4/10/2017.
 */
Ext.define('Atlas.common.store.MemberLetters',{
    alias: 'store.member-memberletters',
    extend: 'Ext.data.Store',
    //type:'clonestore',
    model: 'Atlas.member.model.MemberLettersModel',
    proxy: {
        type:'layer7',
        extraParams: {
            pKeyType: 'recipientID',
            pagination:true
        },
        url: 'member/{0}/memberletterdetail'
    }
});
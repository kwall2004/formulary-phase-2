/**
 * Created by S4505 on 4/10/2017.
 */
Ext.define('Atlas.member.store.MemberAccumBenefitEnrollment',{
    alias: 'store.memberaccumbenefitenrollment',
    extend: 'Ext.data.Store',
    //type:'clonestore',
    model: 'Atlas.member.model.MemberAccumBenefitEnrollment',
    proxy: {
        type:'layer7',
        url:'member/0/memberaccumulatedbenefits'
    }

});
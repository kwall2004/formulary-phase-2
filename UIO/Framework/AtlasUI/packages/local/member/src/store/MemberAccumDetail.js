/**
 * Created by S4505 on 4/10/2017.
 */
Ext.define('Atlas.common.store.MemberAccumDetail',{
    alias: 'store.memberaccumdetail',
    extend: 'Ext.data.Store',
    //type:'clonestore',
    model: 'Atlas.member.model.MemberAccumDetailModel',
    groupField:'BenefitMonth'

});
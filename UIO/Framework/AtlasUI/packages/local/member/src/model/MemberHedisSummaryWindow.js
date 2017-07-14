/**
 * Created by s6627 on 3/3/2017.
 */
Ext.define('Atlas.member.model.MemberHedisSummaryWindow', {
    extend: 'Atlas.common.model.Base',
    idProperty:'measureDesc',
    fields: [
        {name:'CarrierID'},
        {name:'complete'},
        {name:'dbRowID'},
        {name:'dueBy',type: 'date', dateFormat: 'Y-m-d'},
        {name:'helpText'},
        {name:'lastSeen',type: 'date', dateFormat: 'Y-m-d'},
        {name:'measure'},
        {name:'measureDesc'},
        {name:'memberId'},
        {name:'numerator'},
        {name:'recipientID'},
        {name:'rowNum'},
        {name:'subMeasure'},
        {name:'trn'}
    ],
    proxy: {
        url: 'member/{0}/memberhedissummary',
        extraParams: {
            pKeyType: 'recipientID'
        }
    }
});

Ext.define('Atlas.member.model.MemberHedisSummary', {
    extend: 'Atlas.common.model.Base',
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

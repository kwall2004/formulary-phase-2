Ext.define('Atlas.portals.provider.model.MemberHEDISSummaryMaster', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'measureDesc', type: 'string'},
        {name: 'subMeasure', type: 'string'},
        {name: 'dueBy', type: 'string'},
        {name: 'lastSeen', type: 'string'},
        {name: 'complete', type: 'string'},
        {name: 'measure', type: 'string'},
        {name: 'numerator', type: 'string'},
        {name: 'trn', type: 'string'},
        {name: 'helpText', type: 'string'},
        {name: 'recipientID', type: 'string'},
        {name: 'population1', type: 'string'},
        {name: 'population2', type: 'string'},
        {name: 'population3', type: 'string'},
        {name: 'population4', type: 'string'},
        {name: 'population5', type: 'string'},
        {name: 'population6', type: 'string'},
        {name: 'population7', type: 'string'},
        {name: 'population8', type: 'string'},
        {name: 'population9', type: 'string'},
        {name: 'reportYear', type: 'string'},
        {name: 'systemID', type: 'string'},
        {name: 'reportYear', type: 'string'},
        {name: 'pending', type: 'string'},
        {name: 'appointmentDate', type: 'string'},
        {name: 'futureAppointmentDate', type: 'string'},
        {name: 'provId', type: 'string'},
        {name: 'createUser', type: 'string'},
        {name: 'memberReported', type: 'string'},
        {name: 'dbRowID', type: 'string'},
        {name: 'rowNUm', type: 'string'},
        {name: 'picknum', type: 'string'},
        {name: 'mmsystemID', type: 'string'}
    ],

    proxy: {
        extraParams: {
            pRowNum: 0,
            pRows: 200,
            pSort: 'measure by subMeasure by trn'
        },
        url : 'member/hp/memberhedissummarymaster'
    }
});
/** ... **/

Ext.define('Atlas.letter.model.LetterStatusModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.letterstatusmdl',
    fields: [
        {name: 'CreateDate', type: 'string', mapping: 'CreateDate'},
        {name: 'CreateBy', type: 'string', mapping: 'CreateBy'},
        {name: 'ApproveDate', type: 'string', mapping: 'ApproveDate'},
        {name: 'ApprovedBy', type: 'string', mapping: 'ApprovedBy'},
        {name: 'SentDate', type: 'string', mapping: 'SentDate'},
        {name: 'AIMSDate', type: 'string', mapping: 'AIMSDate'},
        {name: 'POBoxDropDate', type: 'string', mapping: 'POBoxDropDate'},
        {name: 'POBoxDropDate02', type: 'string', mapping: 'POBoxDropDate02'},
        {name: 'SentBy', type: 'string', mapping: 'SentBy'},
        {name: 'DueDate', type: 'string', mapping: 'DueDate'},
        {name: 'HoursRemaining', type: 'float', mapping: 'HoursRemaining'}
    ],
    proxy: {
        url: 'member/{0}/letterstatus'
    }
});
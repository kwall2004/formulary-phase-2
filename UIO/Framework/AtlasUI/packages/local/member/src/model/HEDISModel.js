/**
 * Created By: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/02/2016
 * Origin: MERLIN - Member
 * Description: Model for the HEDIS page
 **/

Ext.define('Atlas.member.model.HEDISModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'recipientID', type: 'int'},
        {name: 'CarrierID', type: 'int'},
        {name: 'memberId', type: 'string'},
        {name: 'measureDesc', type: 'string'},
        {name: 'subMeasure', type: 'string'},
        {name: 'dueBy', type: 'string'},
        {name: 'lastSeen', type: 'string'},
        {name: 'complete', type: 'bool'},
        {name: 'measure', type: 'int'},
        {name: 'numerator', type: 'int'},
        {name: 'trn', type: 'int'},
        {name: 'helpText', type: 'string'},
        {name: 'rowNum', type: 'int'},
        {name: 'dbRowID', type: 'string'}
    ]
});
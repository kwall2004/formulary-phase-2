/**
 * Created By: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/11/2016
 * Origin: MERLIN - Member
 * Description: Model for the Formulary Approval page
 **/

Ext.define('Atlas.letter.model.AdvancedSearchModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'advancedsearchmodel',
    fields: [
        {name: 'LetterName', type: 'string', mapping: 'LetterName' },
        {name: 'LetterNameID', type: 'string', mapping: 'LetterNameID' }
    ],
    pageSize: 50,
    proxy: {
        url: 'shared/{0}/letterslist'
    }
});
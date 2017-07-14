/**
 * Created by p3946 on 9/6/2016.
 */
Ext.define('Atlas.member.model.LettersList', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'LetterFrom',
        'LetterName',
        'LetterNameID',
        'LetterProgramName',
        'LetterTemplateName',
        'TemplateFields',
        'authLetterId',
        'authLetterType',
        'lastModified',
        'moduleName',
        'rowNum',
        'systemID'
    ],

    proxy: {
        url: 'shared/{0}/letterslist'
    }

});
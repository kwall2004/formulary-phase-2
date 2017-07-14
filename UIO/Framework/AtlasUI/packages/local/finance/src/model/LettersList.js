Ext.define('Atlas.finance.model.LettersList', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'systemID', type: 'string'},
        {name: 'LetterTemplateName', type: 'string'},
        {name: 'authLetterId', type: 'int'},
        {name: 'rowNum', type: 'int'},
        {name: 'TemplateFields', type: 'string'},
        {name: 'moduleName', type: 'string'},
        {name: 'LetterFrom', type: 'string'},
        {name: 'lastModified', type: 'date'},
        {name: 'authLetterType', type: 'string'},
        {name: 'LetterName', type: 'string'},
        {name: 'LetterProgramName', type: 'string'},
        {name: 'LetterNameID', type: 'int'}
    ],

    proxy: {
        url: 'shared/{0}/letterslist'
    }
});
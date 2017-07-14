/** ... **/

Ext.define('Atlas.letter.model.LetterMasterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.lettermastermdl',
    fields: [
        'LetterName',
        'LetterProgramName',
        'LetterTemplateName',
        'TemplateFields',
        'moduleName',
        'authLetterId',
        'authLetterType',
        'LetterFrom'
    ],
    proxy: {
        url: 'member/{0}/lettermaster'
    }
});
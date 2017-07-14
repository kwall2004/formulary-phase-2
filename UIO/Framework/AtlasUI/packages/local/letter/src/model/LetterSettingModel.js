/**
 *      Author: Dean C. Reed
 *     Created: 11/02/2016
 *      Origin: MERLIN - Reports
 * Description: Model for store: Atlas.letter.letterdetailplan.LetterDetailModel
 **/

Ext.define('Atlas.letter.model.LetterSettingModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.lettersettingmdl',
    fields: [
        {name: 'LetterName', type: 'string', mapping: 'LetterName' },
        {name: 'LetterProgramName', type: 'string', mapping: 'LetterProgramName' },
        {name: 'LetterTemplateName', type: 'string', mapping: 'LetterTemplateName' },
        {name: 'TemplateFields', type: 'string', mapping: 'TemplateFields' },
        {name: 'moduleName', type: 'string', mapping: 'moduleName' },
        {name: 'authLetterId', type: 'string', mapping: 'authLetterId' },
        {name: 'authLetterType', type: 'string', mapping: 'authLetterType' },
        {name: 'LetterFrom', type: 'string', mapping: 'LetterFrom' },
        {name: 'LetterNameID', type: 'string', mapping: 'LetterNameID' },
        {name: 'systemID', type: 'string', mapping: 'systemID' }
    ],
    proxy: {
        url: 'shared/{0}/letterslist',
        extraParams: {
            pagination: true,
            pageSize: 50
        }
    }
});
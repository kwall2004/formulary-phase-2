/**
 *      Author: Dean C. Reed
 *     Created: 11/02/2016
 *      Origin: MERLIN - Reports
 * Description: Model for store: Atlas.letter.letterdetailplan.LetterDetailModel
 **/

Ext.define('Atlas.letter.model.LDPPlanGroupInfoModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.ldpplangroupinfomdl',
    fields: [
        {name: 'FieldOne', type: 'string', mapping: 'FieldOne' },
        {name: 'FieldTwo', type: 'string', mapping: 'FieldTwo' }
    ],
    proxy: {
        url: 'plan/{0}/plangroupinfo'
    }
});
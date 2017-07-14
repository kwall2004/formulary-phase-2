/**
 *      Author: Dean C. Reed
 *     Created: 11/02/2016
 *      Origin: MERLIN - Reports
 * Description: Model for store: Atlas.letter.letterdetailplan.LetterDetailModel
 **/

Ext.define('Atlas.letter.model.LetterDetailPlanModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.letterdetailplanmdl',
    fields: [
        'LetterDesc', 'LetterNameID', 'PlanDesc', 'customFieldLabels', 'customFieldList', 'isV5',
        'lastModified', 'leftFooter', 'leftHeader', 'letterFrom', 'overrideSignedBy',
        'planGroupId', 'recordVersion', 'rightFooter', 'rightHeader', 'signedBy',
        'spareField01', 'spareField02', 'spareField03', 'spareIndexedField', 'systemID'
    ],
    proxy: {
        url: 'shared/{0}/planletterdetail',
        extraParams: {
            pagination: true,
            pageSize: 50
        }
    }
});
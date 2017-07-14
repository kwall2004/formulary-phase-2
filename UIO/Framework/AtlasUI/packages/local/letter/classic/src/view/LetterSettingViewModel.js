/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: View Model for LetterDeailPlan.js
 **/

Ext.define('Atlas.letter.view.LetterSettingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.lettersettingvm',
    type: 'common-shared-editgridmodel',
    data: {
        masterrecord: null //This is what the form binds to on successful load of MemberMaster
    },
    stores: {
        letterslistdata: {
            model: 'Atlas.letter.model.LetterSettingModel',
            pageSize: 50,
            remoteSort: true
        }
    }
});
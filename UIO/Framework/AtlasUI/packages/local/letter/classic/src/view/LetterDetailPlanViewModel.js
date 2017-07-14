/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: View Model for LetterDeailPlan.js
 **/

Ext.define('Atlas.letter.view.LetterDetailPlanViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.letterdetailplanvm',
    type: 'common-shared-editgridmodel',
    data: {
        masterrecord: null //This is what the form binds to on successful load of MemberMaster
    },
    stores: {
        letterdetailplandata: {
            model: 'Atlas.letter.model.LetterDetailPlanModel',
            remoteSort: true,
            remoteFilter: true,
            pageSize: 50
        },
        ldpplangroupinfodata: {
            model: 'Atlas.letter.model.LDPPlanGroupInfoModel'
        },
        lettertypes: {
            model: 'Atlas.letter.model.LettersListModel',
            session: true
        },
        queryDB: {
            model: 'Atlas.letter.model.QueryDBModel',
            root: 'metadata',
            session: true
        }
    }
});
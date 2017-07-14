/**
 * Created by m4542 on 10/3/2016.
 */
Ext.define('Atlas.portals.prescriber.model.MyMembersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myMembersViewModel',

    stores: {
        membersstore: {
            model: 'Atlas.portals.prescriber.model.MyMembers'
        },
        priorAuthList: {
            model: 'Atlas.portals.model.SearchPriorAuth'
        },
        priorauthstore: {
            model: 'Atlas.portals.prescriber.model.PortalMemberDetailsP'
        },
        portalmembermasterext: {
            model: 'Atlas.common.model.PortalMemberExt'
        }
    },

    data:{
        myMemberDetailRecord: null,
        isMemberPassed: false
    }
});
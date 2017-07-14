/**
 * Created by agupta on 12/13/2016.
 */


Ext.define('Atlas.member.view.MemberBasicInfoWinViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.memberbasicinfowinviewmodel',

    stores: {

        storeMemberBasicInfo: {
            //model: 'Atlas.plan.model.PlanBenefitListItem',
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true
        }

    }
});


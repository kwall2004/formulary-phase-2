/**
 * Created by agupta on 12/12/2016.
 */

Ext.define('Atlas.member.view.MemAddEditEnrollWinViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.memaddeditenrollwinviewmodel',

    stores: {

        PlanBenefitStore: {
            //model: 'Atlas.plan.model.PlanBenefitListItem',
            model: 'Atlas.common.model.PlanBenefitExt',
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true
        },


        relationshipcodestore: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'MemberRelationShipCode'
                }
                ,
                url: 'shared/{0}/listitems'
            }
        },


        storeMCSProgGroupCode: {
            //model: 'Atlas.plan.model.PlanProgramCodeUnique',
            model :'Atlas.plan.model.PlanProgramCode',
            autoLoad: true
        }


    }
});

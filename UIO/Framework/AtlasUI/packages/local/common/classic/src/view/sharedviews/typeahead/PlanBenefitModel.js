/*
 Developer: Srujith Cheruku
 Description: A model for the plan benefit search
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.PlanBenefitModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.planbenefitmodel',
    data: {
        isPlanGroupSelected: false
    },
    stores:{
        planbenefitext: {
            model: 'Atlas.common.model.PlanBenefitExt',
            remoteSort: true,
            remoteFilter: true,
            pagination:true,
            pRowid: '0',
            pRowNum: '0',
            pBatchSize: '10'
        }
    }
});

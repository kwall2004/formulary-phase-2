/**
 * Created by d3973 on 11/16/2016.
 */
Ext.define('Atlas.plan.view.PlanGroupDocumentsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.planplangroupdocumentsviewmodel',

    stores: {
        planGroupHierarchy: {
            model: 'Atlas.plan.model.PlanGroupHierarchy',
            remoteSort: true,
            sorters: [
                'carrierName'
            ],
            autoLoad: true
        },

        documentXRefPlanGroup: {
            model: 'Atlas.plan.model.DocumentXRefPlanGroup',
            remoteSort: true,
            sorters: [{
                property: 'lastModified',
                direction: 'DESC'
            }],
            storeId: 'planDocXRef'
        },

        faxHistory: {
            model: 'Atlas.plan.model.FaxHistory'
        },

        setDocument: {
            model: 'Atlas.common.model.shared.Document'
        }
    }
});
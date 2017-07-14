Ext.define('Atlas.portals.prescriber.model.CreatePriorAuthModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',

    alias: 'viewmodel.portalsPrescriberCreatePriorAuthModel',

    stores: {
        memberAllergies: {
            model: 'Atlas.portals.prescriber.model.MemberDrugAllergies'
        },
        previousTherapies: {
            model: 'Atlas.portals.prescriber.model.PreviousTherapy'
        },
        fileAttachments: {
            model: 'Atlas.portals.prescriber.model.FileAttachment'
        }
    },

    data: {
        authStatus: '',
        viewOnly: false,
        submitDisabled: false
    }
});
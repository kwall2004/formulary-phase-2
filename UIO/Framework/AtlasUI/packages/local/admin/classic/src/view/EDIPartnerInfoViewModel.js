/**
 * Created by n6684 on 12/2/2016.
 */

Ext.define('Atlas.admin.view.EDIPartnerInfoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.edipartnerinfoviewmodel',

    stores: {
        edipartnerinfo: {
            model: 'Atlas.admin.model.adminpartnerEDIPartnerModel',
            autoLoad: false
        },

        edipartnercontactinfo: {
            model: 'Atlas.admin.model.adminpartnergetContactInfo',
            autoLoad: false
        },

        ediPartnerRelationMasterExt: {
            model: 'Atlas.admin.model.adminpartnergetEDIPartnerRelationMasterExt',
            autoLoad: false
        },
        editpartnerinfodetails:{
            model: 'Atlas.admin.model.setpartnerEDIPartnerDetails',
            autoLoad:false

        },
        edipartnerinfoqualifiers:{
            type:'admin-edipartnerinfoqualifiers'
        }
    }
});

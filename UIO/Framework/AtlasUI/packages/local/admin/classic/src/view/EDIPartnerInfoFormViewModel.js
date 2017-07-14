/**
 * Created by n6684 on 12/5/2016.
 */

Ext.define('Atlas.authorization.view.EDIPartnerInfoFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_edipartnerinfoformviewmodel',
    stores: {

        storeQualifier: {
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: false
        },

        storesetpartnerEDIPartnerDetails: {
            model: 'Atlas.admin.model.setpartnerEDIPartnerDetails',
            autoLoad: false
        }
    }
});
/**
 * Created by agupta on 11/30/2016.
 */

Ext.define('Atlas.admin.view.EDIPartnerWinViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.edipartnerwinviewmodel',
    stores: {
        storePartnerList: {
            model:'Atlas.admin.model.EDIPartnerInfoForm',
            autoLoad: true
        }
    }
});

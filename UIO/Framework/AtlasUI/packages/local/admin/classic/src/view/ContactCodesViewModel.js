/**
 * Created by S4505 on 10/20/2016.
 */
/*
 Last Developer: David Lorenz
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: This is used for Admin Contact Codes Model.
 */


Ext.define('Atlas.admin.view.ContactCodesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contactCodesViewModel',
    requires: ['Atlas.common.store.CloneStore'],
    stores: {
        //Contact Codes store
        contactCodesStore: {
            model:'Atlas.admin.model.ContactCodes',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: false
        },
        ccusergroups: {
            model: 'Atlas.common.model.UserGroupWithAll',
            remoteSort:true,
            autoLoad: false,
            remoteFilter:true
        },
        categoryCodesStore: {
            model: 'Atlas.admin.model.CategoryCodes',
            autoLoad: true

        }

    }
});

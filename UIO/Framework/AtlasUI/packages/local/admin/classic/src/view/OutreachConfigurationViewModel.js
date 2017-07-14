/**
 * Created by S4505 on 10/20/2016.
 * Updated by S4662
 */


/*
 Last Developer: David Lorenz
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: This is used for Admin Outreach Configuration View Model.
 */


Ext.define('Atlas.admin.view.OutreachConfigurationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminOutreachConfigurationViewModel',

    stores: {
        //Contact Codes store
        outreachConfigurationStore: {
            model:'Atlas.admin.model.OutreachConfiguration',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: false
        },
        //create new types extending thesee, tehn requiren them
        determinationTypes: {
            type:'admin-determinationTypes'
        },
        outreachConfigurationCategory:{
            type:'admin-outreachCategory'
        },
        outreachSubCategory:{
            type:'admin-outreachSubCategory'

        },
        outreachContactedEntity:{
            type:'admin-outreachContactedEntity'

        },
        outreachContactCodes:{
            model:'Atlas.admin.model.ContactCodesComplete',
            remoteSort:true,
            remoteFilter: true,
            loading:true,
            asynchronousLoad:false//,
           // autoLoad: true
        },
        outreachContactCodesPartial:{
            model:'Atlas.admin.model.ContactCodes',
            remoteSort:true,
            remoteFilter: true,
            loading:true
            // autoLoad: true
        },
        SubCategoryBlankStore: {
            fields: ['value', 'name']
        }
    }
});


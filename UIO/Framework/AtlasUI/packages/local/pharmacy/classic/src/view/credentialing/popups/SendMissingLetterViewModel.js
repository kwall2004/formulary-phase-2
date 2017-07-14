/**
 * Created by n6684 on 12/14/2016.
 */

Ext.define('Atlas.pharmacy.view.credentialing.popups.SendMissingLetterViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.credentialingdetail_sendmissingletterviewmodel',

    stores: {
            storeLetterDetails :{
                model: 'Atlas.pharmacy.model.SendMissingLetterLetterDetail',
                autoLoad: false
            },

            storeDocument :{
                model: 'Atlas.pharmacy.model.ReturnDocument',
                autoLoad: false
            },

            storeproxyLetterDetails :{

            }

    }
});
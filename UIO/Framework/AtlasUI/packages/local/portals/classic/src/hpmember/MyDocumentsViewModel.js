/**
 * Created by T3852 on 10/26/2016.
 */
Ext.define('Atlas.portals.hpmember.MyDocumentsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mydocuments',

    stores: {
        documentlist: {
            model: 'Atlas.portals.hpmember.model.DocumentList'
        },
        reportStore: {
            model: 'Atlas.portals.hpmember.model.RunReport64'
        }
    },

    data: {
        familyList: null
    }
});
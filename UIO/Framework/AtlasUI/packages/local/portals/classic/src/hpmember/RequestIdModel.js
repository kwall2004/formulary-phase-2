/**
 * Created by m4542 on 10/13/2016.
 */
Ext.define('Atlas.portals.hpmember.model.RequestIdModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.requestIdViewModel',

    stores: {
        requestidstore: {
            model: 'Atlas.portals.hpmember.model.MemberDataWeb'
        }
    },

    data: {
        familySelected: false
    }
});
/**
 * Created by d3973 on 10/24/2016.
 */
Ext.define('Atlas.member.view.MemberDMRViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.membermemberdmr',
    storeId: 'dmrViewModel',

    stores: {

        viewMemberDMR: {
            model: 'Atlas.admin.model.DMRSearch',
            remoteSort: true
        },

        getListItemByUser: {
            model: 'Atlas.member.model.ListItemByUser'
        },

        pharmacyServiceType: {
            model: 'Atlas.member.model.PharmacyServiceType',
            remoteSort: true,
            sorters: [
                'value'
            ]
        }
    }
});
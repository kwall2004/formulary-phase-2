/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.MedispanToFDBViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.medispantofdbviewmodel',
    stores: {
        storeMedispan: {
            model: 'Atlas.formulary.model.MedispanModel',
            autoLoad: true,
            success: function (record) {

            },
            callback: function (record) {

            }
        },
            storeNDCLN: {
                model: 'Atlas.formulary.model.NDCLNModel',
                autoLoad: true,
                success: function (record) {

                },
                callback: function (record) {

                }
            }
        }
})

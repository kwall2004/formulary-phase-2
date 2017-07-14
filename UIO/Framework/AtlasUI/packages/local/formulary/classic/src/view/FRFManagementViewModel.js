/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.FRFManagementViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.frfmanagementviewmodel',
    stores: {
        storeFRFView: {
            model : 'Atlas.formulary.model.FRFViewModel',
            autoLoad : false,
            success:function(record)
            {

            },
            callback:function(record)
            {


            }
        }
    }
})


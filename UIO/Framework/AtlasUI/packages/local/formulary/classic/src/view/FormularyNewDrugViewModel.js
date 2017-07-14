/**
 * Created by s6627 on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.FormularyNewDrugViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formularynewdrugviewmodel',
    stores: {
        storeFomularyNewDrugs: {
            model : 'Atlas.formulary.model.FormularyNewDrugModel',
            autoLoad : false,
            success:function(record)
            {

            },
            callback:function(record)
            {


            }
        },
        storeFormularyId: {
            model : 'Atlas.formulary.model.FormularyIdModel',
            autoLoad : true,
            success:function(record)
            {

            },
            callback:function(record)
            {


            }
        },
        storeFormularyVersion: {
            model : 'Atlas.formulary.model.FormularyVersionModel',
            autoLoad : true,
            success:function(record)
            {

            },
            callback:function(record)
            {


            }
        }
    }
})
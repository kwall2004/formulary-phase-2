/**
 * Created by s6627 on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.GenCMSFFFileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gencmsfffileviewmodel',
    stores: {
        storeCMSFFFile: {
            model : 'Atlas.formulary.model.CMSFFFileModel',
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

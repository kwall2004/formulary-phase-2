/**
 * Created by agupta on 9/20/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.FormularyStatusWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formularystatuswindowmodel',
    //data: {
    //    isPlanGroupSelected: false
    //},
    stores: {
        storeformularystatus: {
            model: 'Atlas.authorization.model.cdag.FormularyStatusModel',
            pageSize: 10,
            autoLoad: true
        }
    }
});

/**
 * Created by s6627 on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.FormularyNewDrugController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.formularynewdrugcontroller',

        init: function () {
            var vm = this.getViewModel();
            var view = this.getView();
            var storecd = vm.getStore('storeFomularyNewDrugs');
            storecd.load(
                {
                    scope: this,
                    failure: function (record, operation) {
                        //do something if the load failed
                    },
                    success: function (record, operation) {
                        //debugger;
                        //vm.set('cdmodel', record);
                        //vm.set('cdmodel.authId', authId);
                        //view.down('#cbxMember').setRawValue(record.data.Firstname);
                        //view.down('#cbxMember').setRawValue(record.data.RecipientID);
                        //alert(Ext.ComponentQuery.query('#cbxMember')[0].getValue());
                        //alert(Ext.ComponentQuery.query('#cbxMember')[0].getRawValue());
                    },
                    callback: function (record, operation, success) {
                       // debugger;
                    }
                })
        },
        btnFormularyDetail:function (ppgrid,pgrid,grid, rowIndex,a,b,c) {
            Ext.create({
                xtype: 'formulary-formularynewdrugdetail',
                autoShow: true
            });
        }
    }
)
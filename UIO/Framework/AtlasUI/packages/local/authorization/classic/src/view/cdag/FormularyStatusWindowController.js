/**
 * Created by agupta on 9/20/2016.
 */
Ext.define('Atlas.authorization.view.cdag.FormularyStatusWindowController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.formularystatuswindowcontroller',
        init : function(){
            var view = this.getView();
            var plangroupId = view.extraParams["pPlangroupId"];
            var formularyId = view.extraParams["pFormularyId"];
            var keyType = view.extraParams["pKeyType"];
            var keyValue = view.extraParams["pKeyValue"];
            var vm = this.getViewModel();
            var storeFormularyStatus = vm.getStore('storeformularystatus');
            storeFormularyStatus.getProxy().setExtraParam('pPlangroupId', plangroupId);
            storeFormularyStatus.getProxy().setExtraParam('pFormularyId', formularyId);
            storeFormularyStatus.getProxy().setExtraParam('pKeyType', keyType);
            storeFormularyStatus.getProxy().setExtraParam('pKeyValue', keyValue);
            storeFormularyStatus.load(
                {
                    scope: this,
                    failure: function (record, operation) {
                        //do something if the load failed
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        //var view = this.findParentByType('cdagmain'); facing issue in getting parent component
                        //var prnt = view.down('#hdnNDC').getValue();
                        //var temp = prnt.down('#hdnNDC').getValue();
                        for (var i = 0; i < record.length; i++)
                        {
                            if (Ext.ComponentQuery.query('cdagmain')[0].down('#hdnNDC').getValue() == record[0].data.NDC && record[0].data.CarveOut  == true)
                            {
                                Ext.ComponentQuery.query('cdagmain')[0].down('#CntCarveOut').show();
                                break;
                            }
                        }
                    }
                }
            );
        },
        initViewModel: function(){

        }
    }
);
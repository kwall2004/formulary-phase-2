/**
 * Created by T4317 on 10/24/2016.
 */
Ext.define('Atlas.prescriber.view.PrescriberPriorAuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prescriberpriorauthcontroller',

    onRender: function () {
        //debugger;
        var view = this.getView();
        var vm = view.up().getViewModel(),
            grid = view.up().lookup('priorauthgrid');
        //myMask.show();
        vm.set('openedTabs.priorAuth', true);
        if(vm){
            if(vm.get('masterrecord')) {
                var npi = vm.get('masterrecord').get('npi'),
                    priorauthstore = vm.getStore('priorauths');

                priorauthstore.getProxy().setExtraParam('pKeyValue', npi);
                priorauthstore.getProxy().setExtraParam('pKeyType', 'npi');
                priorauthstore.load({
                    callback: function(record) {
                        //debugger;
                        //myMask.hide();
                        //debugger;
                    }
                });
            }
        }
    },
    onItemdblclick: function() {
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('masterrecord'),
            atlasId = rec.get('npi'),
            topViewModel =  Ext.first('viewport').getViewModel(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');

        topViewModel.set('prescriberrecord',rec);

        me.fireEvent('openView','merlin','authorization','cdag_CDAGMain', {
            menuId: menuId,
            atlasId: atlasId
        });
    }
});

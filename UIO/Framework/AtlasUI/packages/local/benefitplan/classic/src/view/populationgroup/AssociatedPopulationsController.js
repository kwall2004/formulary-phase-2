/**
 * Created by s6393 on 10/28/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.AssociatedPopulationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.associatedPopulationsController',
    init:function () {
      //  debugger;
        var vm = this.getViewModel();
        if(vm.get('rootSk') > 0 )
        {
            var vm = this.getViewModel(),
                store = vm.getStore('popGrpTree'),
                proxy = store.getProxy();
            //proxy.setExtraParams('rootSk', this.getViewModel().get('rootSk'));
            proxy.setExtraParam('rootSk', vm.get('rootSk'));
            store.load();
         //   this.getView().down('[itemId="AssociatedPopulationsPBPid"]').update('PBP ID: ' + this.getViewModel().PBPid + '\t \t &nbsp; PBP Name: '+ this.getViewModel().PBPName);
        }
    }
});
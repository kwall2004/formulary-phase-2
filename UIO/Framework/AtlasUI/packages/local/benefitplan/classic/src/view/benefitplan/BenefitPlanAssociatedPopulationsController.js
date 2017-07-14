/**
 * Created by s6635 on 11/22/2016.
 */
Ext.define('Atlas.benefitplan.view.benefitplan.BenefitPlanAssociatedPopulationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplanassociatedPopulationsController',
    init:function () {
        var vm = this.getViewModel();
        if(vm.get('rootSk') > 0 )
        {
            var vm = this.getViewModel(),
                store = vm.getStore('popTree'),
                proxy = store.getProxy();
            proxy.setExtraParam('rootSk', vm.get('rootSk'));
            store.load();
        }
    }
});
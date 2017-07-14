Ext.define('Atlas.benefitplan.view.configuration.GroupConfigurationController', {
    extend: 'Atlas.benefitplan.view.configuration.ConfigurationController',
    alias: 'controller.benefitplan-groupconfigurationcontroller',
    init: function () {
        //debugger;
        this.basicDetailsKey = "GrpSK";
        this.parentDetailsKey = "AcctSK";
        this.basicDetailsParentTitle = "Account";
        this.entityType = 40;
        this.entityModel = 'Atlas.benefitplan.model.Group';
        this.XType = 'benefitplan-groupdetails';
        this.ChildXType = 'benefitplan-populationgroupdetails';
        this.ParentXType = 'benefitplan-accountdetails';
    },
    loadGroupData: function() {
        Ext.getBody().mask('Loading');
        var store = this.getViewModel().getStore('accountdetails');
        store.getProxy().setExtraParams({});
        store.getProxy().setExtraParam('tenantFamSK', this.getViewModel().get('rootsk'));
        store.load(function(){
            Ext.getBody().unmask();
        });
    },
    onCopyPopulationGroupsButtonClick: function () {
        this.getViewModel().getStore('copypopulationgroups').removeAll();
        var win = Ext.create('Atlas.benefitplan.view.Configuration.CopyPopulationGroupWin',{
            parentController : this,
            modal: true
        });
        this.getView().add(win);
        win.show();
        this.loadGroupData();
    },
    onSelectAccount: function (combo, record) {
        this.lookup('copyfromgrpcombo').setValue('');
        var groupStore = this.getViewModel().getStore('basicdetails');
        groupStore.getProxy().setExtraParams({'AcctSK': record.get('AcctSK')});
        groupStore.load();
    },
    onclickselect: function(combo, record){
        var copyPopStore = this.getViewModel().getStore('copypopulationgroups');
        copyPopStore.getProxy().setExtraParams({'GrpSK': record.get('GrpSK')});
        copyPopStore.load();
    },
    onSave: function() {
        var me = this,
            vm = me.getViewModel(),
            store,
            updatedRows;
        Ext.Msg.confirm('Confirm', 'Are you sure you want to save?',function(btn){
           if(btn == 'yes'){

               store = me.lookup('copypopgrid').getStore();
               updatedRows = store.getUpdatedRecords();
               for(var i in updatedRows) {
                   var copyObj = updatedRows[i];
                   copyObj.set('CurrentUser',Atlas.user.un);
                   copyObj.set('ToGrpSK', me.view.viewModel.data.tenantHierarchyEntityId);
               }
               if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                   Ext.getBody().mask('Saving');
               }
               store.sync({
                   success: function () {
                       Ext.Msg.show({
                           title:'Success'
                           ,msg:'Copy successful'
                           ,buttons:Ext.Msg.OK
                           ,callback:function(btn) {
                               if('ok' === btn) {
                                   vm.set('planPgmChange',false);
                                   me.lookup('copyPopulationGroupsWindow').hide();
                                   me.reloadTree(me.view.viewModel.data.tenantHierarchyEntityId, vm.get('tenantHierarchyEntityType'), vm.get('rootsk'));
                               }
                           }
                       })
                   },
                   failure: function (results) {
                       var responsemessage = "";
                       for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                           var responsedata = JSON.parse(results.operations[i].getResponse().responseText);
                           if (responsemessage != '') {
                               responsemessage += '<br />';
                           }
                           responsemessage += responsedata.messages.map(function (elem) {
                               return elem.message;
                           }).join(",");
                       }
                       Ext.Msg.show({
                           title: 'Failed',
                           msg: 'Failed to Copy:<br />' + responsemessage,
                           buttons: Ext.Msg.OK,
                           closable: false,
                           draggable: false,
                           resizable: false
                       });
                   },
                   callback:function(){
                       Ext.getBody().unmask();
                   }
               },me);
               me.reloadTree(vm.get('tenantHierarchyEntityId'), vm.get('tenantHierarchyEntityType'), mevm.get('rootsk'));
           }
        });
    },
    onClositClick: function(){
        this.getViewModel().set('planPgmChange',false);
        this.lookup('copyPopulationGroupsWindow').hide();
    }
});

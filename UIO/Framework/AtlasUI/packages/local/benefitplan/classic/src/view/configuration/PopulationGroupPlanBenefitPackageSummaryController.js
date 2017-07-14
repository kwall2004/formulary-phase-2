/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.view.configuration.PopulationGroupPlanBenefitPackageSummaryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.populationgroupplanbenefitpackagesummaryController',
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                pbpAssigned : 'pbpAssigned',
                onWorkFlowUpdate:'onWorkFlowUpdate',
                loadHierarchyGridData: 'loadData'
            }
        }
    },
    onWorkFlowUpdate:function(){
        var grid = this.getView().down('[itemId="populationGroupPlanBenefitPackageSummaryGrid"]'),
            sm = grid.getSelectionModel(),
            selected = null;
        if(sm.hasSelection()) {
            selected = sm.selected.items[0].get('PBPSK');
        }
        grid.getStore().reload({callback: function() {
            if (selected != null) {
                grid.getSelectionModel().select(grid.getStore().findRecord('PBPSK', selected, 0, false, true, true));
            }
        }});
    },
    pbpAssigned: function() {
        this.loadData();
    },
    init: function() {
        this.lookup('removeRow').disable(true);
        this.lookup('detailBtn').disable(true);
    },
    loadData: function() {
        Ext.getBody().mask('loading');
        var vm = this.getViewModel();
        vm.set('popGrpSK',  vm.get('tenantHierarchyEntityId'));
        var store = vm.getStore('packageSummary');
        store.getProxy().setExtraParam('popGrpSK', vm.get('popGrpSK'));
        store.load(function(){
            Ext.getBody().unmask();
        });
    },
    getPhantomData: function () {
        var newRows =[],
            rows = this.getView().store.data.items;
        for (var i = 0; i < rows.length; i++) {
            var isNew = rows[i].phantom;
            if (isNew) {
                newRows.push(rows[i]);
            }
        }
        return newRows;
    },
    onFilterPackages:function () {
        var store = this.getViewModel().getStore('packageSummary');
        if(this.lookup('isActiveFlag').checked) {
            store.filter('Active', 'true');
        } else {
            store.removeFilter('Active');
        }
    },
    onSelectionChange: function (row, selected) {
        var removeButton = this.lookup('removeRow');
        if (selected && selected.length && selected[0].data)
        {
            this.getViewModel().set('PBPSK', selected[0].data.PBPSK);
            if( selected[0].data.isLocked){
                removeButton.disable(true);
            }
            else{
                removeButton.enable(true);
            }
            this.lookup('detailBtn').enable(true);
            this.getView().down('[itemId="populationGroupPlanBenefitPackageSummaryGrid"]').getPlugin('rowEditing').disable();
        }
    },
    onRemoveClick: function () {
        var vm = this.getViewModel(),
            getGrid=  this.getView().down('[itemId="populationGroupPlanBenefitPackageSummaryGrid"]'),
            selected = getGrid.getSelectionModel();
        if (selected.hasSelection())
        {
            var packageName = selected.getSelection()[0].data.PBPName,
                popGrpPBPSK = selected.getSelection()[0].data.PopGrpPBPSK;
            vm.set('PopGrpPBPSK', popGrpPBPSK);
            Ext.Msg.show({
                title: 'Confirm Remove',
                msg: 'Are you sure you want to remove ' + packageName + ' from this Population Group?',
                buttons: Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function (btn) {
                    if (btn == 'yes') {
                        //ready for delete
                        var selection = selected.getSelection()[0];
                        if (selection) {
                            var store = getGrid.getStore();
                            store.remove(selection);
                            store.getProxy().setUrl("/PopulationGroupPlanBenefitPackage" + '?PopGrpPBPSK=' + popGrpPBPSK + '&CurrentUser=' + vm.get('user').un);
                            if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                                Ext.getBody().mask('Saving');
                            }
                            store.sync({
                                success: function (request) {
                                    var res = Ext.decode(request.operations[0].getResponse().responseText);
                                    Ext.Msg.show({
                                        title: 'Success',
                                        msg: res.messages[0].message,
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        draggable: false,
                                        resizable: false
                                    });
                                },
                                failure: function (request) {
                                    var res = Ext.decode(request.operations[0].getResponse().responseText);
                                    Ext.Msg.show({
                                        title: 'Failed to Save',
                                        msg: res.messages[0].message,
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        draggable: false,
                                        resizable: false
                                    });
                                },
                                callback:function(){
                                    Ext.getBody().unmask();
                                }
                            });
                        }
                    }
                }, scope: this
            });
        }
    },
    onDetailsClick: function(){
        var vm = this.getViewModel(),
            selected = this.getView().down('[itemId="populationGroupPlanBenefitPackageSummaryGrid"]').getSelectionModel();
        if (selected.hasSelection())
        {
            vm.set('PBPSK', selected.getSelection()[0].data.PBPSK);
            vm.set('PopGrpPBPSK', selected.getSelection()[0].data.PopGrpPBPSK);
            //Close configuration screen if there is one already opened
            this.fireEvent('onClosePopGroupBenefitConfiguration', vm.get('PBPSK'));
            this.fireEvent('openView', 'merlin', 'benefitplan', 'populationgroup.benefitconfiguration.Main',
                {
                    menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                    PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
                    atlasId: {
                        popGrpPBPSK: vm.get('PopGrpPBPSK'),
                        popGrpSK : vm.get('popGrpSK'),
                        pbpSK : vm.get('PBPSK')
                    }

                });
        }
    },
    onAddPlanBenefitPackageClick: function()
    {

        var me = this, vm = me.getViewModel();
        this.fireEvent('openView', 'merlin', 'benefitplan', 'planbenefitpackage.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: vm.get('popGrpSK')
        });

    },
    onAssignPlanBenefitPackageClick: function(){

        this.fireEvent('closePopulationGroupAssignBenefitPackageSearch');
        this.fireEvent('openView', 'merlin', 'benefitplan', 'populationgroup.benefitsconfiguration.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: this.getViewModel().get('tenantHierarchyEntityId')
        });
    }

});

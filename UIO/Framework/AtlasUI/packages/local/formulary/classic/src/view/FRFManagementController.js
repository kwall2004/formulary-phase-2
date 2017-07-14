/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.FRFManagementController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.frfmanagementcontroller',

        init : function(){

        },
        menuOnClick: function (selection) {

            var view = this.getView(),
                vm = this.getViewModel();
            var tabPanel = view.down('#tabMenu');

            var existingTab = tabPanel.down(selection.value),
                tab;
            if(selection.value!='formulary-frffileupload') {
                if (!existingTab) {
                    tab = tabPanel.add({
                        xtype: selection.value,
                        closable : true
                        /*viewModel:{
                         parent: vm
                         }
                         */

                    });

                    tabPanel.setActiveTab(tab);
                } else {
                    tabPanel.setActiveTab(existingTab);
                }
            }
            else {
                tabPanel.setActiveTab(0);
            }
        },

        initViewModel: function(){
           // var vm = this.getViewModel();
           // var storecustomndchistory = vm.getStore('storecustomndchistory');
           // //storeCustPrice.getProxy().setExtraParam('pGCNSEQ',);
           // storecustomndchistory.load();
        }
    })

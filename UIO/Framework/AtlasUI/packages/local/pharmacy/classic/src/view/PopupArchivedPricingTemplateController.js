/**
 * Created by n6684 on 11/24/2016.
 */
Ext.define('Atlas.authorization.view.PopupArchivedPricingTemplateController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.pricingtemplateinfo_popuparchivedpricingtemplatecontroller',
            custompage_init:{},
            init:function()
            {

                    var view = this.getView();
                this.custompage_init.paramlobDetails = view.extraParams["lobDetails"];
                this.custompage_init.paramitemDT = view.extraParams["itemDT"];

                    var vm=this.getViewModel();
                    var storepricingdetailtemplatearchivedate=vm.getStore('storepricingdetailtemplatearchivedate');
                storepricingdetailtemplatearchivedate.getProxy().setExtraParam('pFulfillmentType',this.custompage_init.paramitemDT.value);
                storepricingdetailtemplatearchivedate.getProxy().setExtraParam('pLobId',this.custompage_init.paramlobDetails.value);
                storepricingdetailtemplatearchivedate.load( {
                            scope: this,

                            failure: function (record, operation) {
                            },
                            success: function (record, operation) {

                            },
                            callback: function (record, operation, success) {

                            }
                    });
            },


        onSearch:function () {
            var vm=this.getViewModel();
            var archiveDate =  this.getView().down("#cbxArchiveDate").getValue();
            this.getView().down("#cbxArchiveDate").setValue(Ext.Date.format(archiveDate,'m/d/Y'));
            var storepricingdetailtemplatearchive=vm.getStore('storepricingdetailtemplatearchive');
            storepricingdetailtemplatearchive.getProxy().setExtraParam('pFulfillmentType',this.custompage_init.paramitemDT.value);
            storepricingdetailtemplatearchive.getProxy().setExtraParam('pLobId',this.custompage_init.paramlobDetails.value);
            storepricingdetailtemplatearchive.getProxy().setExtraParam('pDate', archiveDate);
            storepricingdetailtemplatearchive.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                }
            });
        }
    }
);

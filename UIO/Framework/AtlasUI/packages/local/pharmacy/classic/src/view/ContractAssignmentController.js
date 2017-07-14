/**
 * Created by n6684 on 11/15/2016.
 */
Ext.define('Atlas.authorization.view.ContractAssignmentController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.contractassignmentcontroller',

        listen: {
            controller: {
                '*': {
                    refreshgrid_contractassignment: 'onSearch'
                }
            }
        },

        controlinit:{},
        init:function()
        {
            var vm = this.getViewModel();
            var combo =  this.getView().down('#cbxPharmacyNetwork');
            var allNetworkSetupstore=vm.getStore('allNetworkSetup');
            allNetworkSetupstore.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    this.getView().down("#cbxPharmacyNetwork").setValue("0");

                }
            });


            var listdetailsLineOfBusinessstore=vm.getStore('listdetailsLineOfBusiness');
            listdetailsLineOfBusinessstore.getProxy().setExtraParam('pListName','LineOfBusiness');
            listdetailsLineOfBusinessstore.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    this.getView().down("#cbxLineofBusiness").setValue("999");
                }
            });
        },


        contractassignment_itemdblclick : function (dv, record, item, index, e){

            var win = Ext.create({
                xtype: 'contractassignment-popupchoosenetworks',
                extraParams: {
                    'pRecord': record
                }
            });
            win.show(this);

        },


        onbtnviewpharmacy:function () {


            this.routeTo(this.getView().down('#cbxprovidertype').getValue().split(' ')[0],'merlin/pharmacy/Pharmacy');
        },

        routeTo: function (atlasId, route) {
            var me = this,
                menuId = Atlas.common.Util.menuIdFromRoute(route),
                viewRoute = route.split('/'),
                atlasId = atlasId;

            me.fireEvent('openView',viewRoute[0],viewRoute[1],viewRoute[2], {
                menuId: menuId,
                atlasId: atlasId
            });
        },

        onSearchTypeToggle: function (seg, button,pressed) {
            var vm = this.getViewModel();
            var view = this.getView();

            view.down('#cbxrelationshiptype').setValue("");
            view.down('#cbxprovidertype').setValue("");

            if(button.action=="npi"){
                view.down('#cbxrelationshiptype').hide();
                view.down('#cbxprovidertype').show();
                view.down('#btnviewpharmacy').show();
                button.action="npi";
                this.controlinit.action = "npi";

            }else {
                view.down('#cbxrelationshiptype').show();
                view.down('#cbxprovidertype').hide();
                view.down('#btnviewpharmacy').hide();

                button.action="ncpdpId";
                this.controlinit.action = "ncpdpId";
            }
            view.down('#btnviewpharmacy').setDisabled(true);
        },
        cbxprovidertype_select :function(provider,b,c,d) {
            provider.setValue(provider.lastSelection[0].data.ncpdpId +' '+  provider.lastSelection[0].data.Name);
            this.getView().down('#btnviewpharmacy').setDisabled(false);
        },

        onSearch: function () {

            var view = this.getView();

            if(view)
            {
                var relationshipid = view.down('#cbxrelationshiptype');
                var providertypeid = view.down('#cbxprovidertype');
                var networkid = view.down('#cbxPharmacyNetwork');
                var lobid = view.down('#cbxLineofBusiness');
                var searchtype= view.down('#searchtype').down('[pressed=true]').action;

                var vm = this.getViewModel();
                var store = vm.getStore('contractassignment');


                if(this.controlinit.action=="npi") {
                    store.getProxy().setExtraParam('pKeyType','pharmacy');
                    store.getProxy().setExtraParam('pKeyValue', providertypeid.value.split(' ')[0]);

                }
                else {
                    store.getProxy().setExtraParam('pKeyType','relation');
                    store.getProxy().setExtraParam('pKeyValue', relationshipid.value.split(' ')[0]);
                }

                var tempnetworkid ="0";
                if (networkid.value!=null)
                {
                    tempnetworkid =networkid.value;
                }

                var templobid ="999";
                if (lobid.value!=null)
                {
                    templobid =lobid.value;
                }

                store.getProxy().setExtraParam('ipcNetworkId', tempnetworkid);
                store.getProxy().setExtraParam('ipcLOB',templobid);
                store.getProxy().setExtraParam('ipcStartRow',0);
                store.load( {
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {

                        var objResp = Ext.decode(operation.getResponse().responseText);
                    }
                });
            }

        }
    }
);

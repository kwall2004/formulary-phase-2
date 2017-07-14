/**
 * Created by n6684 on 11/21/2016.
 */

Ext.define('Atlas.authorization.view.PopupAddRelationShipController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.createeditpharmacy_popupaddrelationshipcontroller',
        listen: {
            controller: {
                '*': {
                    createeditpharmacy_popupaddrelationshipcontroller_search: 'onSearch'
                }
            }
        },
        txtValidator: function(val,errortext,number,nmberval) {
            var valid =errortext;
            if(val.getValue())
            {
                valid = true;
            }


            return valid;
        },

        init:function()
        {

            var refdtfeffectivedate = this.lookupReference('refdtfeffectivedate');
            refdtfeffectivedate.validator = Ext.bind(this.txtValidator, this, [refdtfeffectivedate, "this field is required",""]);
            this.getView().down("#frmaddupdaterelationship").isValid();
            this.getView().down("#frmaddupdaterelationship").isValid();
            var view = this.getView();
            var vm = this.getViewModel();
            var relationshipid = view.extraParams["pNCPDID"];

            if(view.extraParams["pRecord"].data)
            {
                relationshipid = view.extraParams["pRecord"].data.RelationShipId;
            }
            this.onSearch(relationshipid);
        },


        btncancel :function () {
          var   winopen = Ext.WindowManager.getActive();
                    if (winopen) {
                        winopen.close();
                    }
        },


        relationshipselect :function (relation,b,c,d) {
            relation.setValue(relation.lastSelection[0].data.relationshipID +' '+  relation.lastSelection[0].data.name);
            //this.onSearch(relation.lastSelection[0].data.relationshipID);
        },

        onSearch: function (relationshipid) {
             var view = this.getView();
             var vm = this.getViewModel();

            var storerelationshipmasterdataModel=vm.getStore('storerelationshipmasterdataModel');
            storerelationshipmasterdataModel.getProxy().setExtraParam('pKeyValue',relationshipid);
            storerelationshipmasterdataModel.getProxy().setExtraParam('pKeyType', "rid");
            storerelationshipmasterdataModel.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);

                    var paramRecord = view.extraParams["pRecord"];
                    if(!paramRecord.data) {
                       return false;
                    }


                    view.down("#cbxPaymentCenter").setValue(paramRecord.data.PaycenterID);
                    view.down("#cbxPaymentCenter").setRawValue(paramRecord.data.PaycenterID +' '+ paramRecord.data.paycenterName);
                    view.down("#txtRelationship").setValue(paramRecord.data.RelationShipId);
                    view.down('#txtRelationship').setRawValue(paramRecord.data.RelationShipId +' '+paramRecord.data.RelationShipName);
                    view.down("#txtReconciliationID").setValue(paramRecord.data.remitAndReconId);
                    view.down("#dtfeffectivedate").setValue(paramRecord.data.PharEffDate);
                    view.down("#dtftermdate").setValue(paramRecord.data.PharTermdate);
                }
            });

        },

        btnSave : function () {
            var me =this;
            var view = this.getView();
            var vm = this.getViewModel();
            var  mode = "U";

            if(!this.getView().down("#dtfeffectivedate").getValue())
            {
                this.getView().down("#frmaddupdaterelationship").isValid();
                return;
            }

            var paramRecord = view.extraParams["pRecord"];
            if(!paramRecord.data) {
                mode = "A";
            }

            var setpharmacyrelationship =  Ext.create('Atlas.pharmacy.model.setpharmacyrelationship');
            setpharmacyrelationship.getProxy().setExtraParam('pNCPDPID',  view.extraParams["pNCPDID"]);
            if(mode == "U")
            {
                setpharmacyrelationship.getProxy().setExtraParam('pSystemId', paramRecord.data.SystemID);
                setpharmacyrelationship.getProxy().setExtraParam('pRelationshipID', paramRecord.data.RelationShipId);
            }
            else
                setpharmacyrelationship.getProxy().setExtraParam('pRelationshipID', this.getView().down("#txtRelationship").getValue());

            setpharmacyrelationship.getProxy().setExtraParam('pPayCenterID', this.getView().down("#cbxPaymentCenter").getValue());
            setpharmacyrelationship.getProxy().setExtraParam('pEffDate', this.getView().down("#dtfeffectivedate").getValue());
            setpharmacyrelationship.getProxy().setExtraParam('pTermDate', this.getView().down("#dtftermdate").getValue());
            setpharmacyrelationship.getProxy().setExtraParam('pRemitAndReconId', this.getView().down("#txtReconciliationID").getValue());
            setpharmacyrelationship.getProxy().setExtraParam('pMode',mode);
            setpharmacyrelationship.phantom = false;
            setpharmacyrelationship.save({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if(success)
                    {
                        var record = {
                                        data:
                                        {
                                            NCPDPID:view.extraParams["pNCPDID"]
                                        }
                                    };
                        var controller = Ext.create('Atlas.authorization.view.ContractAssignmentController');
                        controller.fireEvent('refreshgrid',"",record);

                        this.btncancel();

                        Ext.MessageBox.show({
                            title: 'PBM',
                            msg: 'Record has been saved',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        },this);

                    }
                }
            });
        }
    }
);
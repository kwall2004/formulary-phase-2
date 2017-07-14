Ext.define('Atlas.admin.view.EDIPartnerRelationshipFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.edipartnerrelationshipformcontroller',
    listen: {
        controller: {
            '*': {
                btnpartnerrelationshiptSave: 'btnSave'
            }
        }
    },

    txtValidator: function(val,errortext,number,nmberval) {
        var valid =errortext;
        if(val.getValue())
        {
            if(number=="NUM")
            {

                var v=  parseInt(val.getValue());
                if(!v)
                    val.setValue("");

                if(v.toString().length >= nmberval) {
                    val.setValue(val.getValue().substring(0, nmberval))
                    return true;
                }

                return v;
            }
            valid = true;
        }


        return valid;
    },

    init:function()
    {
        var refdateeffectivedate = this.lookupReference('refdateeffectivedate');
        refdateeffectivedate.validator = Ext.bind(this.txtValidator, this, [refdateeffectivedate, "effective date is required",""]);

        this.getView().down("#dateeffectivedate").isValid();
        this.loadinit();
    },

    initViewModel: function () {

    },

    loadinit: function () {

        var view = this.getView();
        var vm = this.getViewModel();

        var paramRecord = view.extraParams["editpartnerrelationship"];
        // view.down('#pnleditform').loadRecord(paramRecord);
        if(!paramRecord) {
            this.getView().down("#btnSave").setText("Add");
            this.getView().down("#txtprovidertype").hide();
            this.getView().down("#txtrelationshiptype").hide();
            vm.set('paramRecord',{});
            this.getView().setTitle("Add EDI Partner Relationship");
        }
        else {
            this.getView().setTitle("Update EDI Partner Relationship");
            this.getView().down("#btnSave").setText("Update");
            //this.getView().down("#cbxprovidertype").setValue(view.extraParams["editpartnerrelationship"].NCPDPID);
            this.getView().down("#cbxprovidertype").hide();
            this.getView().down("#cbxprovidertype").setRawValue(view.extraParams["editpartnerrelationship"].NCPDPID);
            //this.getView().down("#cbxrelationshiptype").setValue(view.extraParams["editpartnerrelationship"].RelationshipID);
            this.getView().down("#cbxrelationshiptype").setRawValue(view.extraParams["editpartnerrelationship"].RelationshipID);
            this.getView().down("#cbxrelationshiptype").hide();
            vm.set('paramRecord',paramRecord);
        }
    },


    cbxprovidertype_keyup:function(obj) {
        this.getView().down("#cbxprovidertype").show();
        this.getView().down("#cbxprovidertype").setRawValue(obj.getValue());
        obj.hide();
    },

    cbxrelationshiptype_keyup:function(obj) {
        this.getView().down("#cbxrelationshiptype").show();
        this.getView().down("#cbxrelationshiptype").setRawValue(obj.getValue());
        obj.hide();
    },


    btnCancel:function () {
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    },

    btnSave:function (pActionmode,paramselfSystemid,paramParentSystemid) {
        var me =this;
        var view = this.getView();

        var pfieldList='';
        var pFieldValues='';
        var pmode = "A";
        var pSystemid= '';
        var pParentSystemid= '';
        if(pActionmode=="Delete")
        {
            pmode = "D";
            pfieldList="test";
            pFieldValues ="test";
            pSystemid = paramselfSystemid;
            pParentSystemid = paramParentSystemid;
        }
        else{


            this.getView().down("#dateeffectivedate").isValid();
            var isShowMessage = false;
            if(!(this.getView().down("#cbxprovidertype").getValue() || this.getView().down("#cbxrelationshiptype").getValue()))
            {
                isShowMessage =true;
            }else if((this.getView().down("#cbxprovidertype").getValue() && this.getView().down("#cbxrelationshiptype").getValue()))
            {
                isShowMessage =true;
            }

            if(isShowMessage){
                Ext.MessageBox.show({
                    title: 'Validaion Error',
                    msg: 'Please Select either Pharmacy Name or Relationship Name',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });

                return;
            }

            if(!this.getView().down("#dateeffectivedate").getValue())
            {
                return;
            }


            var ncpdid='';
            if(this.getView().down("#cbxprovidertype").getValue())
             ncpdid = this.getView().down("#cbxprovidertype").getValue();

            var relationshiptype='';
            if(this.getView().down("#cbxrelationshiptype").getValue())
                relationshiptype = this.getView().down("#cbxrelationshiptype").getValue();


            pfieldList = "PartnerID,NCPDPID,RelationshipID,PaymentCenterId,EffectiveDate,TermDate";
            pFieldValues = this.getView().extraParams["singlepartner"].partnerId + "|" + ncpdid  +  "|" + relationshiptype  + "|" + this.getView().down("#textpmtCenterId").getValue()  + "|" + Ext.Date.format(new Date( this.getView().down("#dateeffectivedate").getValue()), 'm/d/y') + "|" +  Ext.Date.format(this.getView().down("#dateterminationdate").getValue(), 'm/d/y');
            if( this.getView().down("#btnSave").getText()=="Update") {
                pmode = "U";
                pSystemid=  this.getView().extraParams["editpartnerrelationship"].SystemID;
            }
            pParentSystemid = view.extraParams["singlepartner"].partnerId;
        }

        var setEDIPartnerDetails =  Ext.create('Atlas.admin.model.setadminPartnerEDIPatnerRelationMaster');
        setEDIPartnerDetails.getProxy().setExtraParam('pAction', pmode);
        setEDIPartnerDetails.getProxy().setExtraParam('pSystemID', pSystemid);
        setEDIPartnerDetails.getProxy().setExtraParam('pFieldList', pfieldList);
        setEDIPartnerDetails.getProxy().setExtraParam('pValueList', pFieldValues);
        setEDIPartnerDetails.phantom = false;
        setEDIPartnerDetails.save({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {




                   // var controller = Ext.create('Atlas.authorization.view.EDIPartnerInfoController');
                    me.fireEvent('refreshpartnerrelationshipgrid',pParentSystemid);


                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }

                    if(pActionmode=="Delete")
                        return;

                   /* Ext.MessageBox.show({
                        title: 'PBM',
                        msg: 'Record has been saved',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
*/
                }
                else if (objResp.message[0].code == 4) {

                    Ext.MessageBox.show({
                        title: 'PBM',
                        msg: objResp.message[0].message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            }
        });

    }


});
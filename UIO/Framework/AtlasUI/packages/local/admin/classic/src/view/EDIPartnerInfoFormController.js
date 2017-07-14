Ext.define('Atlas.admin.view.EDIPartnerInfoFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.edipartnerinfoformcontroller',

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
        var reftxtpartnerid = this.lookupReference('reftxtpartnerid');
        reftxtpartnerid.validator = Ext.bind(this.txtValidator, this, [reftxtpartnerid, "Partner Id is required",""]);

        //this.getView().down("#frmcreatededitpharmacy").isValid();

        var view = this.getView();
        var vm = this.getViewModel();

        var storeQualifier=this.getViewModel().getStore('storeQualifier');
        storeQualifier.getProxy().setExtraParam('pListName', "EDIPartnerInfoQualifiers");
        storeQualifier.load( {
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {

                var objResp = Ext.decode(operation.getResponse().responseText);

            }
        });

        var paramRecord = view.extraParams["singlepartner"];
        if(!paramRecord) {
            this.getView().down("#btnSave").setText("Save");
            vm.set('paramRecord',{});
        }
        else {
            this.getView().down("#btnSave").setText("Save");
            this.getView().down("#txtpartnerid").setDisabled(true);
            this.getView().setTitle("Update EDI Partner");


            var listfield ="partnerName,ediPath,ein,ipAddress,contactLastName,contactFirstName,idQualifier,planSubmitterId,planIdQualifier,zipFile,exportDir,inputDir,pgpkeyname,sendcmd,sendIndividualFile,sendSecureEmail,sendDownloadConf";

            var storesetpartnerEDIPartnerDetails=this.getViewModel().getStore('storesetpartnerEDIPartnerDetails');
            storesetpartnerEDIPartnerDetails.getProxy().setExtraParam('pPartnerId', view.extraParams["singlepartner"].partnerId);
            storesetpartnerEDIPartnerDetails.getProxy().setExtraParam('pFieldList', listfield);
            storesetpartnerEDIPartnerDetails.load( {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {


                    var objResp = Ext.decode(operation.getResponse().responseText);
                    objResp.data[0].partnerId = view.extraParams["singlepartner"].partnerId;
                    if(objResp.data[0].zipFile=="yes")
                        this.getView().down("#txtzipfile").setValue(true);
                    else
                        this.getView().down("#txtzipfile").setValue(false);

                    if(objResp.data[0].sendIndividualFile=="yes")
                        this.getView().down("#chksendIndividualFile").setValue(true);
                    else
                        this.getView().down("#chksendIndividualFile").setValue(false);

                    if(objResp.data[0].sendSecureEmail=="yes")
                        this.getView().down("#chksendSecureEmail").setValue(true);
                    else
                        this.getView().down("#chksendSecureEmail").setValue(false);

                    if(objResp.data[0].sendDownloadConf=="yes")
                        this.getView().down("#chksendDownloadConf").setValue(true);
                    else
                        this.getView().down("#chksendDownloadConf").setValue(false);

                    vm.set('paramRecord',objResp.data[0]);


                }
            });


        }



    },

    initViewModel: function () {

    },

    btnCancel:function () {
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    },

    btnSave:function () {
        var me =this;
        if(!this.getView().down("#txtpartnerid").getValue())
        {
            Ext.MessageBox.show({
                title: 'Failure',
                msg: 'Invalid Key Value - Can not Be Blank',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });

            return;
        }



        var pfieldList = "partnerName,ediPath,ein,ipAddress,contactLastName,contactFirstName,idQualifier,planSubmitterId,planIdQualifier,zipFile,exportDir,inputDir,pgpkeyname,sendcmd,sendIndividualFile,sendSecureEmail,sendDownloadConf";
        var pFieldValues = this.getView().down("#txtpartnername").getValue() + "|" + this.getView().down("#txtediPath").getValue()  +  "|" +this.getView().down("#txtedi").getValue()  + "|" + this.getView().down("#txtipAddress").getValue()
            + "|" + "" + "|"  + "" + "|" +  this.getView().down("#txtidQualifier").getValue()+ "|" +  " " + "|" +  this.getView().down("#txtplanIdQualifier").getValue()+ "|" +  this.getView().down("#txtzipfile").getValue()
            + "|" + this.getView().down("#txtexportDir").getValue() + "|"  + this.getView().down("#txtinputDir").getValue() + "|" +  this.getView().down("#txtgroupkey").getValue()+ "|" +   this.getView().down("#txtcommand").getValue() + "|"
            +  this.getView().down("#chksendIndividualFile").getValue()+ "|" +  this.getView().down("#chksendSecureEmail").getValue()+ "|" +  this.getView().down("#chksendDownloadConf").getValue();

        var pmode = "A";
        /*if( this.getView().down("#btnSave").getText()=="Update") {
            pmode = "C";
            this.getView().down("#txtpartnerid").setDisabled(true);
        }*/

        if(this.getView().extraParams["singlepartner"]) {
            pmode = "C";
        }
        var setEDIPartnerDetails =  Ext.create('Atlas.admin.model.setpartnerEDIPartnerDetails');
        setEDIPartnerDetails.getProxy().setExtraParam('pAction', pmode);
        setEDIPartnerDetails.getProxy().setExtraParam('pPartnerId',  this.getView().down("#txtpartnerid").getValue());
        setEDIPartnerDetails.getProxy().setExtraParam('pFieldList', pfieldList);
        setEDIPartnerDetails.getProxy().setExtraParam('pFields', pFieldValues);
        setEDIPartnerDetails.phantom = false;
        setEDIPartnerDetails.save({
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {

                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {

                    me.fireEvent('refreshgdeditpartnerinto');

                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }

                    Ext.MessageBox.show({
                        title: 'Admin',
                        msg: "Partner Info. successfully saved.",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    },this);
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
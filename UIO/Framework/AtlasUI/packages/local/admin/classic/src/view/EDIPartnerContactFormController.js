Ext.define('Atlas.admin.view.EDIPartnerContactFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.edipartnercontactformcontroller',
    listen: {
        controller: {
            '*': {
                btnContactSave: 'btnSave'
            }
        }
    },
    init:function()
    {
        var view = this.getView();
        var vm = this.getViewModel();

        var paramRecord = view.extraParams["contactinfo"];
        if(!paramRecord) {
            this.getView().down("#btnSave").setText("Add");
            this.getView().setTitle("Add EDI Partner Contact");
            vm.set('paramRecord',{});
        }
        else {
            this.getView().down("#btnSave").setText("Update");
            this.getView().setTitle("Update Contact Information");
            vm.set('paramRecord',paramRecord);
        }

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
            pfieldList = "LastName,FirstName,Phone,Email,ParentSystemID";
            pFieldValues = this.getView().down("#txtlastname").getValue() + "|" + this.getView().down("#txtfirstname").getValue()  +  "|" +this.getView().down("#txtphoneno").getValue()  + "|" + this.getView().down("#txtemail").getValue()  + "|" + this.getView().extraParams["singlepartner"].SystemID;
            if( this.getView().down("#btnSave").getText()=="Update") {
                pmode = "U";
                pSystemid=  this.getView().extraParams["contactinfo"].SystemID;
            }
            pParentSystemid = view.extraParams["singlepartner"].SystemID;
        }


        var setEDIPartnerDetails =  Ext.create('Atlas.admin.model.setpartnerContactInfo');
        setEDIPartnerDetails.getProxy().setExtraParam('pAction', pmode);
        setEDIPartnerDetails.getProxy().setExtraParam('pSystemID',  pSystemid);
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
                    me.fireEvent('refreshcontactgrid',pParentSystemid);
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
                    },this);*/

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
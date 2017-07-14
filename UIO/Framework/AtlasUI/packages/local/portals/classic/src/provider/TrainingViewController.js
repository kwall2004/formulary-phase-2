Ext.define('Atlas.portals.provider.TrainingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrainingViewController',


     init: function () {
         var me = this,
             view = this.getViewModel(),
             tempStore = view.getStore('TrainingStore');

         tempStore.getProxy().setExtraParam('pListName','TrainingProviderPortalWebEx');
         tempStore.load({
             callback: function(record, operation) {
                 var tempArray = [],
                     results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                     splitValues = [];
                 splitValues = results.split("^");
                 for (var i = 0; i < splitValues.length; i++)
                 {
                     tempArray.push({
                         key: splitValues[i],
                         value: splitValues[i]
                     });
                 }

                 var tempStore = new Ext.data.ArrayStore({});
                 tempStore.add(tempArray);
                 me.lookupReference('trainingDateRef').setStore(tempStore);
             }
         });
    },

    onSubmitChange: function () {
        if (Ext.getCmp("trainingdatefield").value != "" || Ext.getCmp("trainingdatefield").value != null) {
            this.lookupReference("trainingSubmit1").setDisabled(false);
            this.lookupReference("trainingClear1").setDisabled(false);
        }
    },

    onSubmitClick: function () {
        if (Ext.getCmp("trainingemailfield").value == "" || Ext.getCmp("trainingdatefield").value == "" || Ext.getCmp("trainingdatefield").value == null)
        {
            Ext.MessageBox.alert('Training Error', 'Training Date and Email cannot be empty. Please, provide date and email.');
        }
        else if (Ext.getCmp("trainingemailfield").value.indexOf('@') == -1 || Ext.getCmp("trainingemailfield").value.indexOf('.') == -1){
            Ext.MessageBox.alert('Training Error','Email needs to be in the correct format. Please provide correct email address.');
        }
        else
        {
            var d = new Date();
            var curr_date = d.getDate();
            var curr_month =(d.getMonth() + 1); //Months are zero based
            var curr_month = (d.getMonth()<10?'0':'') + (d.getMonth() + 1); //Months are zero based
            var curr_year = (d.getFullYear()<10?'0':'') + d.getFullYear();
            var curr_hr = (d.getHours()<10?'0':'') + d.getHours();
            var curr_min = (d.getMinutes()<10?'0':'') + d.getMinutes();
            var curr_sec = (d.getSeconds()<10?'0':'') + d.getSeconds();
            var timestamp = curr_month + "/" + curr_date + "/" + curr_year + " " + curr_hr + ":" + curr_min + ":" + curr_sec;

            var email = Ext.getCmp("trainingemailfield").value,
                name = Ext.getCmp("trainingnamefield").value,
                trainingdate = Ext.getCmp("trainingdatefield").value,
                MasterStore = this.getViewModel().getStore('TrainingRequestStore');
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}]

            var extraParameters = {
                'pFromName': name,
                'pFromEmail': email,
                'pTrainingDate': trainingdate,
                'userState':  Atlas.user.homeState,
                'pUserState' : Atlas.user.homeState,
                "pUserType": Atlas.user.start,
                "pTimeStamp": timestamp,
                'pUserName' : Atlas.user.un

            }
            var returnField = ['pJobNumber'];
            var submitUpdate = Atlas.common.utility.Utilities.saveData([{}], 'portal/hp/trainingscheduleemail/update', null, [true], extraParameters,
                saveAction, returnField);

            if (submitUpdate.code == 0) {
                Ext.MessageBox.alert('Scheduled Training', 'Thank You. Your request has been forwarded to the Training Team');
                this.lookupReference("emailRef").setValue("");
                this.lookupReference("nameRef").setValue("");
                this.lookupReference("trainingDateRef").setValue("");
                this.lookupReference("trainingSubmit1").setDisabled(true);
                this.lookupReference("trainingClear1").setDisabled(true);
            }





        }

    },

    onClearClick: function () {
        this.lookupReference("emailRef").setValue("");
        this.lookupReference("nameRef").setValue("");
        this.lookupReference("trainingDateRef").setValue("");
        this.lookupReference("trainingSubmit1").setDisabled(true);
        this.lookupReference("trainingClear1").setDisabled(true);
    }


});
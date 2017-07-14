Ext.define('Atlas.plan.view.carriers.EditFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plan-carrierseditform',

    init:function(){

    },

    onCreate: function () {
        this.doSave('A')
    },

    onUpdate: function () {
        this.doSave('U')
    },

    doSave: function(mode){
        //debugger;
        var me=this,
            form = this.getView().down('form'),
            values = form.getValues(),
            url = Atlas.apiURL + 'plan/rx/plancarrier/update',
            record = this.getViewModel().get('masterRecord'),
            pValues = '',
            modeParams,
            carrierId = this.getViewModel().get('masterRecord.carrierId') || values['carrierId'],
            pFields = 'carrierName,serviceLocation,address1,address2,city,state,zip',
            systemID = 0;
        if(record)
            systemID = record.data.SystemID;


        if(form.isValid() && values){

            pValues =  values['carrierName'] + '|' + values['serviceLocation'] + '|' + values['address1'] + '|' +  values['address2'] + '|' + values['city'] + '|' + values['state'] + '|' + values['zip'];
            modeParams =  {
                pSessionID: Atlas.user.sessionId,
                pCarrierId:  carrierId,
                pAction: mode,
                pFields: pFields,
                pValues: pValues,
                pRetSystemID: systemID

            };

            // Ext.Ajax.request({
            //     useDefaultXhrHeader: false,
            //     paramsAsJson: true,
            //     noCache: false,
            //     url: url,
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     params: Ext.JSON.encode(modeParams),
            //     success: function (response, opts) {
            //         //debugger;
            //         var obj = Ext.decode(response.responseText);
            //         if(obj.message[0].message == 'Successful'){
            //             Ext.Msg.alert("PBM ", 'Carrier Details Successfully Saved (Carrier Id:' + carrierId + ')' );
            //         }else{
            //              Ext.Msg.alert("PBM ", obj.message[0].message);
            //         }
            //         // console.dir(obj);
            //         if(record){
            //              form.updateRecord();
            //         }
            //         // debugger;
            //         me.fireEvent('carrierUpdated',carrierId);
            //         me.getView().close();
            //
            //
            //     },
            //     failure: function (response, opts) {
            //         //debugger;
            //         console.log('server-side failure with status code ' + response.status);
            //
            //     }
            // });

            var returnValue = Atlas.common.utility.Utilities.post(
                'plan/rx/plancarrier/update',
                modeParams,
                null
            );

            if(returnValue.code != 0)
            {
                Ext.MessageBox.alert('Failure', returnValue.message, this.showResult, this);
            }
            else
            {
                Ext.Msg.alert("PBM ", 'Carrier Details Successfully Saved (Carrier Id:' + carrierId + ')' );
                if(record){
                    form.updateRecord();
                }
                // debugger;
                me.fireEvent('carrierUpdated',carrierId);
                me.getView().close();

            }
        }
    }

});

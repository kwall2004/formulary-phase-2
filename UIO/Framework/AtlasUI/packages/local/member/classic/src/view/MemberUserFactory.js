/**
 * Created by T4317 on 7/27/2016.
 */
Ext.define('Atlas.member.view.MemberUserFactory', {
    //name: 'this.$className.toString()',
    className: 'MemberUserFactory',
    methodName: '',
    getFailedMessage: function (wMethodName) {
        return this.className + "." + wMethodName + " failure: ";
    },
    getMemberMasterByRecipientID: function (wRecipientId) {
        var results = [];
        this.methodName = "getMemberMasterByRecipientID";
        //console.log("-- getFailedMessage:" + this.getFailedMessage(this.methodName))
        //debugger;
        var memberMasterModel = Ext.create('Atlas.member.model.MemberMaster', {});
        memberMasterModel.getProxy().setExtraParam('pKeyValue', wRecipientId);
        memberMasterModel.load(
            {
                scope: this,
                failure: function (record, operation) {
                    results.push[99];
                    results.push[this.getFailedMessage(this.methodName) + operation.getError()];
                },
                success: function (record, operation) {
                    console.log(" operation.getError() - " +  operation.getError());
                    if (record.data.recipientID.length>0 && record.data.recipientID != 'undefined') {
                        results.push[0];
                    }
                    else {
                        results.push[1];
                    }
                    results.push[record];
                },
                callback: function (record, operation, success) {
                }
            });
        return results;
    },
    getMemberUserMasterByRecipientID: function (wRecipientId) {
        var results = [];
        this.methodName = "getMemberUserMasterByRecipientID";
        //console.log("-- getFailedMessage:" + this.getFailedMessage(this.methodName))
        //debugger;
        var memberUserMasterModel = Ext.create('Atlas.member.model.MemberUserMaster', {});
        memberUserMasterModel.getProxy().setExtraParam('ipiRecipientId', wRecipientId);

       // debugger;

        memberUserMasterModel.load(
            {
                scope: this,
                failure: function (record, operation) {
                    results.push[99];
                    results.push[this.getFailedMessage(this.methodName) + operation.getError()];
                },
                success: function (record, operation) {

                    //debugger;
                    console.log(" operation.getError() - " +  operation.getError());


                    console.log(" record - " +  record.data.RxReminderSentDate);


                    if (record.data.recipientID.length>0 && record.data.recipientID != 'undefined') {
                        results.push[0];
                    }
                    else {
                        results.push[1];
                    }
                    results.push[record];
                    return results;
                },
                callback: function (record, operation, success) {
                }
            });
    },
    updateMemberUser: function (wSessionID, wRecipientId, wFields, wValues) {
        this.methodName = "updateMemberUser";
        var results = [];
        var updateModel = Ext.create('Atlas.member.model.MemberUserMemberUpdate', {});

        updateModel.getProxy().setExtraParam('pRecipientId', wRecipientId);
        updateModel.getProxy().setExtraParam('pFields', wFields);
        updateModel.getProxy().setExtraParam('pValues', wValues);
        updateModel.load(
            {
                scope: this,
                failure: function (record, operation) {
                    results.push[99];
                    results.push[this.getFailedMessage(this.methodName)];
                },
                success: function (record, operation) {
                    if (record.data.pResult == 0 && record.data.pResult != 'undefined') {
                        results.push[0];
                    }
                    else {
                        results.push[1];
                    }
                    results.push[record.data.pMessage];
                },
                callback: function (record, operation, success) {
                    //do something whether the load succeeded or failed
                }
            });
        return results;
    }
});
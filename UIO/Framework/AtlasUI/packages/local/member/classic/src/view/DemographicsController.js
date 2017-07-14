/*
 Last Developer: Paul Glinski
 Previous Developers: []
 Origin: Merlin - Member
 Date: 7/14/2016
 Description: Controller for the Demographics view.
 */
Ext.define('Atlas.member.view.DemographicsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.demographics',
    init:function()
    {

        var parentViewModel = this.getView().up('panel').getViewModel();
       var  masterRecord = parentViewModel.get('masterrecord');

    },
    coverageHistory: function(cmp, e){
        var me = this,
            vm = this.getViewModel(),
            SystemId,
            win;
        SystemId = cmp.$widgetRecord.get('tsystemID');
        win = Ext.create({
            xtype: 'sharedviews-AuditTrail',
            auditConfig: {
                'tableName': 'MemberEnrollment',
                'parentSystemId': SystemId,
                'title': 'Member Enrollment Audit Trail'
            }
        });
        me.getView().add(win);
        win.show();
    },
    onPlanSelection:function (combo,record) {
        this.getViewModel().set('memberplan',record);
    },

    submitted: function(btn, text){
        var view = this.getView(),
            parentView = view.up(),
            viewModel = parentView.getViewModel(),
            masterRecord = viewModel.get('masterrecord');
            //memberplan = viewModel.get('memberplan');
        var recipientID = masterRecord.recipientID;
        //var planGroupID = memberplan.data.planGroupId;
        var letterType = this.lookupReference('docTypeCombo').getValue();
        var planGroupID = this.lookupReference('planGroupCombo').getValue();

        var generateOrderDocs = Ext.create('Atlas.member.model.GenerateOrderDocs', {});
        generateOrderDocs.getProxy().setExtraParam('ipiRecipientId', recipientID);
        generateOrderDocs.getProxy().setExtraParam('ipiPlanGroupID', planGroupID);
        generateOrderDocs.getProxy().setExtraParam('ipcLetterType', letterType);
        generateOrderDocs.load(
            {
                scope: this,
                callback: function (record, operation, success)
                {

                    var obj=  operation.getResponse().responseText;
                    var obj1 = Ext.decode(obj);
                    if(obj1.message[0].code == 0)
                    {
                        var win =  this.getView().up('#demographicsOrderDocsWindow');
                        Ext.MessageBox.show({
                            title: 'PBM',
                            msg: 'Documents are ordered successfully.',
                            buttons: Ext.Msg.OK,
                            scope: this,
                            callback: function (btn) {
                                if (btn == 'ok') {
                                    if(win)
                                        win.close();
                                    return;
                                }
                            }
                        });
                        //this.submittedResultTextBox('Documents are ordered successfully.');
                    }
                    else
                    {
                        var win =  this.getView().up('#demographicsOrderDocsWindow');
                        Ext.MessageBox.show({
                            title: 'PBM',
                            msg: obj1.message[0].message,
                            buttons: Ext.Msg.OK,
                            scope: this,
                            callback: function (btn) {
                                if (btn == 'ok') {
                                    if(win)
                                        win.close();
                                    return;
                                }
                            }
                        });
                    }
                }
            });
    },

    submittedResultTextBox: function(text){
        Ext.MessageBox.show({
            title: 'PBM',
            msg: text,
            buttons: Ext.MessageBox.YES,
            buttonText:{
                yes: "Ok"
            },
            scope: this,
            fn: this.showResult
        });
    }

});
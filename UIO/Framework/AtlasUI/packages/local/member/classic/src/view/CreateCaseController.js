/*
 Last Developer: Srujith Cheruku
 Previous Developers: [Srujith Cheruku]
 Origin: Merlin - Member
 Description: This is used for create case view controller.
 */
Ext.define('Atlas.member.view.CreateCaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.createCaseController',

    onSaveClick: function(component,e, eOpts) {
        var assignTo = this.lookupReference("assignTo").getRawValue();
        var followUpDate = this.lookupReference("followUpDate").getRawValue();
        var createCaseNotes = this.lookupReference("createCaseNotes").getRawValue();
        if (assignTo != "" && followUpDate !="" && createCaseNotes != "" ) {
            Ext.Msg.confirm("Acknowledge","Are you sure you would like to create a case and assign to: " + assignTo, function(e) {
                if(e == 'yes'){
                    Ext.Msg.alert("Alert", "You have selected to assign the case to " + assignTo);
                    var vm = this.getViewModel();
                    var createCaseStore = vm.getStore('createCaseModel');
                    createCaseStore.getProxy().setExtraParam( 'assignTo', assignTo);
                    createCaseStore.getProxy().setExtraParam( 'followUpDate', followUpDate);
                    createCaseStore.getProxy().setExtraParam( 'createCaseNotes', createCaseNotes);
                    createCaseStore.getProxy().setExtraParam( 'recipientID', '');
                    createCaseStore.getProxy().setExtraParam( 'claimDate', '');
                    createCaseStore.getProxy().setExtraParam( 'claimSystemtID', '');
                    createCaseStore.getProxy().setExtraParam( 'planGroupId', '');
                    createCaseStore.load();
                }
        });
        }else {
            Ext.Msg.alert("Validation Error", "Please enter the required information to save");
        }


    },

    onCancelClick: function(component,e, eOpts) {
        this.getView().up('window').close();

    }
});
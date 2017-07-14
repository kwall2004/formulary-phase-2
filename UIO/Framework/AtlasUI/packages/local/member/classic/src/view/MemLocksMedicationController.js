Ext.define('Atlas.member.view.MemLocksMedicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memlocksmedicationcontroller',

    onCancelClick: function () {
        var window = this.getView().up();
        this.editor = Ext.destroy(window);
    },
    init: function () {
        this.getView().down('#cbxDrugSubLevel').setValue(0);
    },
    cbxDrugLevel_Select: function () {
        var view = this.getView();
        this.HideAllDrugCombo();
        if (view.down('#cbxDrugLevel').getValue() == 'GCN') {
            view.down('#cbxGCN').setValue('');
            view.down('#cbxGCN').setHidden(false);
            view.down('#cbxGCN').setDisabled(false);
        }
        else if (view.down('#cbxDrugLevel').getValue() == 'GPI') {
            view.down('#cbxGPI').setValue('');
            view.down('#cbxGPI').setHidden(false);
            view.down('#cbxGPI').setDisabled(false);

        }
        else if (view.down('#cbxDrugLevel').getValue() == 'NDC') {
            view.down('#cbxNDC').setValue('');
            view.down('#cbxNDC').setHidden(false);
            view.down('#cbxNDC').setDisabled(false);
        }
        else if (view.down('#cbxDrugLevel').getValue() != 'GCN' && view.down('#cbxDrugLevel').getValue() != 'GPI' && view.down('#cbxDrugLevel').getValue() != 'NDC') {
            view.down('#txtOther').setValue('');
            view.down('#txtOther').setHidden(false);
            view.down('#txtOther').setDisabled(false);
        }
    },
    HideAllDrugCombo: function () {
        var view = this.getView();
        view.down('#cbxGPI').setHidden(true);
        view.down('#cbxGCN').setHidden(true);
        view.down('#cbxNDC').setHidden(true);
        view.down('#txtOther').setHidden(true);
    },
    onSaveClick: function () {
        try {
            var view = this.getView();
            var drugSubLevel = view.down('#cbxDrugSubLevel').getValue();
            var drugCodeValue = '';
            if (drugCodeValue == '') {
                drugCodeValue = view.down('#cbxGCN').getValue();
            }
            if (drugCodeValue == '' || drugCodeValue == null) {
                drugCodeValue = view.down('#cbxGPI').getValue();
            }
            if (drugCodeValue == '' || drugCodeValue == null) {
                drugCodeValue = view.down('#cbxNDC').getValue();
            }
            if (drugCodeValue == '' || drugCodeValue == null) {
                drugCodeValue = view.down('#txtOther').getValue();
            }
            if (drugCodeValue == '' || drugCodeValue == null) {
                Ext.Msg.show({icon: Ext.MessageBox.ERROR, msg: 'Please insert required values', buttons: Ext.Msg.OK});
                return false;
            }
            else {

                var drugLevel = view.down('#cbxDrugLevel').getValue();
                var drugCode = drugCodeValue;
                var ttMemberLocks = {};
                var ttMemberLockSingle = {};
                ttMemberLockSingle.mode = 'A';
                ttMemberLockSingle.id = drugCode;
                ttMemberLockSingle.dbRowID = "";
                ttMemberLockSingle.LockIdSubType = drugSubLevel;
                var tempData = [];
                tempData.push(ttMemberLockSingle);
                ttMemberLocks.ttMemberLocks = tempData;
                if (ttMemberLocks.ttMemberLocks.length > 0) {
                    var extraParameters = {
                        'pRecipientId': view.down('#hdnRecipientId').getValue(),
                        'pLockType': drugLevel,
                        'ttMemberLocks': ttMemberLocks
                    };
                    var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                    var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/memberlocks/update', null, [false], extraParameters,
                        saveAction, null);
                    if (testReturn.code == 0) {
                        Ext.Msg.alert("Member", "Medication Locks successfully saved.");
                    }
                    else if (testReturn.code == 2) {
                        Ext.Msg.alert("Member", testReturn.message);
                    }
                    else if (testReturn.code == 3) {
                        Ext.Msg.alert("Member", testReturn.message);
                    }
                    this.fireEvent('loadStoreData');
                    var window = this.getView().up();
                    this.editor = Ext.destroy(window);
                }
            }

        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    }
});
/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: Controller for LetterDetailPlan.js
 **/
Ext.define('Atlas.letter.controller.LetterQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.letterqueuectrl',
    xtype: 'letterqueuectrltype',

    init: function(){
        var me = this,
            myVM = me.getViewModel(),
            requiredlettersstore = me.getStore('requiredlettersdata'),
            pendinglettersstore = me.getStore('pendinglettersdata'),
            aimsbatchesstore = me.getStore('aimsbatchesdata'),
            approvedlettersstore = me.getStore('approvedlettersdata');

        try {
            requiredlettersstore.on({
                load: function(store, records, operation, success) {
                    myVM.set('vmRequiredLetters','Required Letters <span style="color: red;">('+store.totalCount+')</span>');
                },
                scope: me,
                single: true
            });
            requiredlettersstore.load();

            pendinglettersstore.on({
                load: function(store, records, operation, success) {
                    myVM.set('vmPendingLetters','Pending Letters <span style="color: purple;">('+store.totalCount+')</span>');
                },
                scope: me,
                single: true
            });
            pendinglettersstore.load();

            aimsbatchesstore.on({
                load: function(store, records, operation, success) {
                    myVM.set('vmAIMSBatches','AIMS Batches <span style="color: red;">('+store.totalCount+')</span>');
                },
                scope: me,
                single: true
            });
            aimsbatchesstore.load();

            approvedlettersstore.on({
                load: function(store, records, operation, success) {
                    myVM.set('vmApprovedTitle','Approved Letters <span style="color: black;">('+store.totalCount+')</span>');
                },
                scope: me,
                single: true
            });
            approvedlettersstore.load();
        }
        catch(err) {

        }
    },
    onRouteClick: function(grid, rowIndex, colIndex) {
        var me = this,
            vm = me.getViewModel(),
            myParent = vm.getParent(),
            rec = grid.getStore().getAt(rowIndex);
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/letter/CreateEditLetter');
           /* menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
            node =  menuItems.findNode('route', 'merlin/letter/CreateEditLetter'),
            client = me.getView().atlasClient,
            route = node.get('route') || node.get('routeId'),
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle'),
            routeParams = menuId + '/' + rec.data.LetterID + '/' + rec.data.LetterName;*/

        me.fireEvent('closeCreateEditView');
        me.fireEvent('openView','merlin','letter','CreateEditLetter', {
            ID: menuId,
            menuId: menuId,
            LetterID: rec.data.LetterID,
            LetterType: rec.data.LetterName,
            RID: rec.data.RID,
            MTMRID: rec.data.RID,
            keyValue: '0',
            openView: true
        });
    },
    onRouteRequiredLetterClick: function(grid, rowIndex, colIndex) {
        var me = this,
            vm = me.getViewModel(),
            myParent = vm.getParent(),
            rec = grid.getStore().getAt(rowIndex);
            var menuId = Atlas.common.Util.menuIdFromRoute('merlin/letter/CreateEditLetter');
            /*menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
            node =  menuItems.findNode('route', 'merlin/letter/CreateEditLetter'),
            client = me.getView().atlasClient,
            route = node.get('route') || node.get('routeId'),
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle'),
            LetterName=rec.data.LetterName;*/

        me.fireEvent('closeCreateEditView');
        me.fireEvent('openView','merlin','letter','CreateEditLetter', {
            ID: menuId,
            menuId: menuId,
            LetterID:'New',
            LetterType:rec.data.LetterName,
            LetterName: rec.data.LetterName,
            letterNameId:rec.data.LetterNameID,
            keyValue: 'UCF',
            UCFCLAIMID:rec.data.UCFClaimID,
            openView: true
        });
    },

    onExpandAIMSRow: function (rowNode, record, expandRow, eOpts) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            aimsjobsdocsdata = me.getStore('aimsjobsdocsdata');

        aimsjobsdocsdata.getProxy().setExtraParam('pAIMSJobNum',record.data.AIMSJobNum);
        aimsjobsdocsdata.on({
            load: function() {

            }
        });
        aimsjobsdocsdata.load();
    },

    onRecordSelectAIMSBatches: function(grid , record) {
        var me = this,
            myVM = me.getViewModel(),
            aimsjobsdocsdata = me.getStore('aimsjobsdocsdata'),
            AIMSBatchJobNumber = record.data.AIMSJobNum;

        // Empty table and reset AIMS#
        myVM.set('vmAIMSBatchesDetailTitle', 'Details for AIMS Batch#: <span style="display: none;">aimsbatch</span>');
        myVM.set('vmAIMSBatchesDetailTitle', myVM.get('vmAIMSBatchesDetailTitle').replace('<span style="display: none;">aimsbatch</span>',AIMSBatchJobNumber));

        aimsjobsdocsdata.getProxy().setExtraParam('pAIMSJobNum',AIMSBatchJobNumber);
        aimsjobsdocsdata.load();
    },

    onClickSave: function(button) {
        var me = this,
            myVM = me.getViewModel(),
            sentDateTime = Ext.Date.format(myVM.get('vmBatchDate'), 'm/d/Y') + ' ' + myVM.get('vmBatchTime') + myVM.get('vmBatchToD');

        if(myVM.get('vmBatchDate') !== '' && myVM.get('vmBatchTime') !== '' && myVM.get('vmBatchToD') !== '') {
            Ext.Msg.show({
                title: 'Save Changes?',
                message: 'Are you sure you want to stamp the following batches with the following date/time: ' + '<br /> ' +
                         'DATE/TIME: ' + sentDateTime + '<br /> ' +
                         'You can not undo this action.',
                buttons: Ext.Msg.YESNOCANCEL,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.saveAIMSSentDateTime(sentDateTime);
                    } else if (btn === 'no') {
                        //console.log('No pressed');
                    } else {
                        //console.log('Cancel pressed');
                    }
                }
            });
        }
        else {
            Ext.Msg.alert('Date / Time', 'You must enter a date and time before continuing.');
        }
    },

    saveAIMSSentDateTime: function(sentDateTime) {
        var me = this,
            myVM = me.getViewModel(),
            saveAction = [{
                "Create": {"key": 'action', "value": 'Add'},
                "Update": {"key": 'action', "value": 'Update'},
                "Delete": {"key": 'action', "value": 'Delete'}
            }],
            listStore = myVM.getStore('aimsbatchesdata'),
            records = listStore.getRange(),
            singleRec;

        for(var i =0; i < records.length; i++){
            singleRec = records[i];

            if(singleRec.dirty == true){
                singleRec.set('SentDate', sentDateTime);
            }
        }

        var testReturn = Atlas.common.utility.Utilities.saveData([listStore],'member/rx/aimssentdatetime/update','ttSentDateTimes' ,[true], '' ,
            saveAction, null );
    },
    assignToSelect:function(combobox,record,e) {
        var me = this,
            myVM = me.getViewModel(),
           view = this.getView();
          AssignTo =combobox.getValue();
        var requestParameter = {},
            returnValue,
            validationMessage;
if(view.down('#pendingLettersGrid').actionables[0].activeRecord) {
    requestParameter.pLetterID = view.down('#pendingLettersGrid').actionables[0].activeRecord.data.LetterID;
}
 else{
    requestParameter.pLetterID = view.down('#approvedLettersGrid').actionables[0].activeRecord.data.LetterID;
}
        requestParameter.pMode = "U";
        requestParameter.pFields = "AssignTo";
        requestParameter.pValues = AssignTo;

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var returnValue = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], requestParameter,
            saveAction, ['pretLetterID']);


    }
    ,

    timeChange: function (control, e) {
        var hour = "";
        var min = "";
        var sec = "";
        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            return;
        }

        var val = control.getValue();

        for (var iCnt = 0; iCnt < val.length; iCnt++) {

            if (val[iCnt] == ":") {
                continue;
            }

            if (iCnt <= 2) {
                hour = hour + val[iCnt];
                if (iCnt == 1) {
                    hour = hour + ":";
                }
            }

            if (iCnt > 2 && iCnt <= 5) {
                min = min + val[iCnt];

                if (iCnt == 4) {
                    min = min + ":";
                }
            }

            if (iCnt > 5) {
                sec = sec + val[iCnt];
            }
        }

        control.setValue(hour + min + sec);
    }


});
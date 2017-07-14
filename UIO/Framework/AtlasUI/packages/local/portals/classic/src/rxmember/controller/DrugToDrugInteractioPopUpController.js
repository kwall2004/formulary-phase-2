Ext.define('Atlas.portals.rxmember.controller.DrugToDrugInteractioPopUpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drugsearchdtdpopup',
    onDataChanged: function (store) {
        //console.log("onBeforeStoreLoad #1:" + Ext.decode(store.proxy));
        //var response = Ext.decode(operation.getResponse().responseText);
        //console.log("--  DrugToDrugInteractioPopUpController onDataChanged --");
        //console.log("store.getCount " + store.getCount());
        //console.log("-----------------------");
        //Ext.toast(store.getCount() + ' records were loaded.');
        //var response = Ext.decode(operation.getResponse().responseText);
        //this.getViewModel().getStore('auditDetail').loadRawData(records);
    },
    onStoreLoad: function (store, records) {
        //console.log(store.getCount() + " records were loaded.");
        //console.log("-----------------------");
        //Ext.toast(store.getCount() + ' records were loaded.');
        //debugger;
        //var response = Ext.decode(operation.getResponse().responseText);
        //console.log("-------------------");
        //this.getViewModel().getStore('auditDetail').loadRawData(records);
    },

    init: function () {

        var me = this,
            dataGrid = me.lookupReference('dtdGrid'),
            msgPanel = me.lookupReference('dtdPanel'),
            vm = this.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            simpsonsformulariesStore = vm.getStore('simpsonsformularies'),
            dtdinteractionsStore = vm.getStore('dtdinteractions');
/*
        simpsonsformulariesStore.load(
            {
                scope: this,
                failure: function (record, operation) {
                    // failed stuff
                    console.log("failure LOAD simpsonsformulariesStore");
                },
                success: function (record, operation) {
                    // success stuff
                    console.log("success LOAD simpsonsformulariesStore");
                },
                callback: function (record, operation, success) {
                    // callback stuff
                    console.log("callback LOAD simpsonsformulariesStore");
                }
            });

*/

        var curDate = Ext.Date.format(new Date(), 'm-d-Y'),
            today = new Date(),
            todayMinus1Yr = new Date(),
            todayMinus2Yr = new Date(),
            todayMinus1Year = new Date(todayMinus1Yr.setDate(today.getDate()-365)),
            todayMinus2Year = new Date(todayMinus2Yr.setDate(today.getDate()-730)),
            fmtToday = Ext.Date.format(today, 'm-d-Y'),
            fmtTodayMinus1Year = Ext.Date.format(todayMinus1Year, 'm-d-Y'),
            fmtTodayMinus2Year = Ext.Date.format(todayMinus2Year, 'm-d-Y'),
//          fmtWhere = "respStatus = 'P' AND recipientID = " + user.retRecipientID + " AND serviceDate >= '03/16/15' and serviceDate <='03/16/17'",
            fmtWhere = "respStatus = 'P' AND recipientID = " + user.retRecipientID + " AND serviceDate >= '" + fmtTodayMinus1Year + "' and serviceDate <='" +fmtToday + "'",
            fmtSearchNDC = vm.data.srchNDC;

/*
        console.log("------------------------------------------");
        console.log("           curDate: " + curDate);
        console.log("          fmtToday: " + fmtToday);
        console.log("fmtTodayMinus1Year: " + fmtTodayMinus1Year);
        console.log("fmtTodayMinus2Year: " + fmtTodayMinus2Year);
        console.log("          fmtWhere: " + fmtWhere);
        console.log("------------------------------------------");
*/
        dtdinteractionsStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        dtdinteractionsStore.getProxy().setExtraParam('pKeyValue', user.retRecipientID);
        dtdinteractionsStore.getProxy().setExtraParam('pWhere', fmtWhere);
        dtdinteractionsStore.getProxy().setExtraParam('pSrchNDC', fmtSearchNDC);
        dtdinteractionsStore.load(
            {
                scope: this,
                failure: function (record, operation) {
                   // failed stuff
                    console.log("failure LOAD dtdinteractionsStore");
                },
                success: function (record, operation) {
                    // success stuff
                    console.log("success LOAD dtdinteractionsStore");
                },
                callback: function (record, operation, success) {
                    // callback stuff
                    var objResp = Ext.decode(operation.getResponse().responseText),
                        pResult = objResp.message[0].code,
                        pMessage = objResp.message[0].message;

                    //debugger;
                    //pResult = 99;
                    //pMessage = "getDTDByClaimsHistory.p - Failed lookup during getClaimsHistory.p - 99:No Member found using recipientId - '098763243'."

                    if(pResult==0) {
                        this.toggleMsgPanel(false, false);
                        this.formatDlgTitle(pMessage);
                    }
                    else {
                        if (pResult==1) {
                            this.formatDlgTitle(pMessage);
                            vm.set('dtdNotFoundMsg', 'No Drug To Drug Interactions Found in your recent Medication(s) History.');
                            this.toggleMsgPanel(true, false);
                        }
                        else {
                            // Unexpected Error
                            this.formatDlgTitle('UNEXPECTED ERROR');
                            vm.set('dtdNotFoundMsg', "UNEXPECTED ERROR:\n" + pMessage);
                            this.toggleMsgPanel(true, true);
                        }
                    }

                }
            });

    },
    formatDlgTitle: function (pMessage) {
        var vm = this.getViewModel(),
            fmtTitle = "";
        fmtTitle = vm.data.srchMedName + " - " + pMessage;
        vm.set('dtdPopUpTitle', fmtTitle);
    },
    toggleMsgPanel: function (showPanel, showError) {

        var me = this,
            dtdGrid = me.lookupReference('dtdGrid'),
            dtdPanel = me.lookupReference('dtdPanel'),
            dtdPanelMsg = me.lookupReference('dtdPanelMsg');

        if (showPanel) {
            dtdPanel.setVisible(true);
            dtdGrid.setVisible(false);
            if (showError) {
                dtdPanelMsg.setFieldStyle('color:red;font-weight:bold;font-size:20px;text-align:left');
                // These only work when its a label not a displayfield or textarea
                //dtdPanelMsg.setStyle('color', 'red');
                //dtdPanelMsg.setStyle('font-weight', 'bold');
                //dtdPanelMsg.setStyle('font-size', '20px');
                //dtdPanelMsg.removeCls('x-lbl-dtd-none-found');
                //dtdPanelMsg.addCls('x-lbl-dtd-unexpected-err');
            }
            else {
                dtdPanelMsg.setFieldStyle('color:green;font-weight:bold;font-size:20px;text-align:center');
                // These only work when its a label not a displayfield or textarea
                //dtdPanelMsg.setStyle('color', 'green');
                //dtdPanelMsg.setStyle('font-weight', 'bold');
                //dtdPanelMsg.setStyle('font-size', '20px');
                //dtdPanelMsg.removeCls('x-lbl-dtd-unexpected-err');
                //dtdPanelMsg.addCls('x-lbl-dtd-none-found');
            }

        }
        else {
            dtdPanel.setVisible(false);
            dtdGrid.setVisible(true);
        }

    },
    onViewMoreDetail: function (grid, rowIndex, cellName) {

        var vm, rowRec, ackAction, myUser;
        var me = this;
        vm = this.getViewModel();
        rowRec = grid.getStore('dtdinteractions').getAt(rowIndex);

        var msgTitle = "",
            msgInfo = "",
            mbrMed = "";

        mbrMed = rowRec.data.mbrMedication;

        if (cellName=='pManagement') {
            msgTitle = 'Patient Management';
            msgInfo = rowRec.data.pManagement
        }
        else {
            if (cellName=='sLevelStatusDesc') {
                msgTitle = 'Patient Info';
                msgInfo = rowRec.data.sLevelStatusDesc
            }
            else {
                if (cellName=='moAction') {
                    msgTitle = 'Mechanism Of Action';
                    msgInfo = rowRec.data.moAction
                }
                else {
                    if (cellName=='cEffects') {
                        msgTitle = 'Clinical Effects';
                        msgInfo = rowRec.data.cEffects
                    }
                }

            }
        }
        Ext.MessageBox.show({
            title: msgTitle + " - " + mbrMed,
            msg: msgInfo,
            buttons: Ext.MessageBox.OK
        });

    }
});
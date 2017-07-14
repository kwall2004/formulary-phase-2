Ext.define('Atlas.plan.view.MacPharmacyPricingInqController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MacPharmacyPricingInqController',
    selectMacList: null,

    listen: {
        store: {
            '#ApproveMacAlert': {
                load: 'OnUserListLoad'
            },
            '#AlertStatus': {
                load: 'onAlertStatusLoad'
            }
        }
    },

    init: function () {
        var vm = this.getViewModel();

        vm.set('BckRecPointer', '');
        vm.set('FwdRecPointer', '');
        vm.set('JumpStart', '0');
        vm.set('Direction', 'Fwd');
        vm.set('LoadPagination', 'true');
    },

    getSelectedPageData: function (pagingtoolbar, page, eOpts) {

        var vm = this.getViewModel(),
            prevPage = pagingtoolbar.store.currentPage,
            direction = '',
            bckRecPointer = vm.get('BckRecPointer'),
            fwdRecPointer = vm.get('FwdRecPointer'),
            jumpStart = 0,
            pageDiff = page - prevPage,
            isJump = false;

        if (pageDiff != 1 && pageDiff != -1){
            isJump = true;
        }

        if (isJump) {
            direction = 'Fwd';
            jumpStart = (page - 1) * 25;
            bckRecPointer = '';
            fwdRecPointer = '';
        }
        else if (prevPage > page) {
            direction = 'Bck';
        }
        else {
            direction = 'Fwd';
        }

        this.onLoadInquiryData(jumpStart, direction, bckRecPointer, fwdRecPointer);

        return true;
    },

    OnUserListLoad: function (store, records, success) {
        var vm = this.getViewModel();
        var userName = Atlas.user.un;

        vm.set('ApproveMacAlert', false);

        store.filter('userName', userName);

        if (store.data.items.length > 0) {
            vm.set('ApproveMacAlert', true);
        }

        this.onLoadInquiryData('0', 'Fwd', '', '');
    },

    onAlertStatusLoad: function (store, records, success) {
        store.filter('charString', 'MacAlert');
    },

    onSearch: function () {
        var vm = this.getViewModel();

        vm.set('LoadPagination', 'true');
        this.onLoadInquiryData('0', 'Fwd', '', '');
    },

    onLoadInquiryData: function (jumpStart, direction, bckRecPointer, fwdRecPointer) {

        var vm = this.getViewModel(),
            view = this.getView(),
            gridPagingToolbar = view.down('#gridPagingToolbar'),
            AlertStatus = view.down('#AlertStatus').getValue(),
            DateFrom = view.down('#InquiryDateFrom').getValue(),
            DateTo = view.down('#InquiryDateTo').getValue(),
            LoadPagination = vm.get('LoadPagination');

        this.EnableDisableButton();

        if (!view.down('#InquiryDateFrom').isValid() || !view.down('#InquiryDateTo').isValid()) {
            Ext.Msg.alert('MAC Pharmacy', 'Please fix all the validation errors before searching.');
        }
        else if (DateFrom == null || DateFrom == '' || DateTo == null || DateTo == '') {
            Ext.Msg.alert('MAC Pharmacy', 'Please enter a valid date before searching');
        }
        else if (DateFrom > DateTo) {
            Ext.Msg.alert('MAC Pharmacy', 'End Date can not be less than Start Date.');
        }
        else {
            var MacPharmacyPricingInq = vm.getStore('MacPharmacyPricingInq'),
                PagingToolbarStore = vm.getStore('PagingToolbarStore');

            vm.set('BckRecPointer', '');
            vm.set('FwdRecPointer', '');
            vm.set('JumpStart', jumpStart);
            vm.set('Direction', direction);

            MacPharmacyPricingInq.getProxy().setExtraParam('pInquiryStatus', AlertStatus);
            MacPharmacyPricingInq.getProxy().setExtraParam('ipInquiryDtFrom', DateFrom);
            MacPharmacyPricingInq.getProxy().setExtraParam('ipInquiryDtTo', DateTo);
            MacPharmacyPricingInq.getProxy().setExtraParam('ipiBatchSize', '25');
            MacPharmacyPricingInq.getProxy().setExtraParam('ipiJumpStart', jumpStart);
            MacPharmacyPricingInq.getProxy().setExtraParam('ipcDirection', direction);
            MacPharmacyPricingInq.getProxy().setExtraParam('ipcBckRecPointer', bckRecPointer);
            MacPharmacyPricingInq.getProxy().setExtraParam('ipcFwdRecPointer', fwdRecPointer);

            MacPharmacyPricingInq.load({
                callback: function (records, opts, success) {

                    if (success) {

                        if (LoadPagination == 'true') {

                            PagingToolbarStore.removeAll(true);

                            for (var iCnt = 1; iCnt <= opts._resultSet.metadata.opiRecordCount; iCnt++) {
                                PagingToolbarStore.add({PageNumber: iCnt});
                            }

                            if (opts._resultSet.metadata.opiRecordCount > 0) {
                                view.down('#lblInqInfo').setText('Pharmacy Price Inquiry (' + opts._resultSet.metadata.opiRecordCount + ')');
                            }
                            else {
                                view.down('#lblInqInfo').setText('Pharmacy Price Inquiry');
                            }

                            PagingToolbarStore.totalCount = opts._resultSet.metadata.opiRecordCount;

                            gridPagingToolbar.bindStore(PagingToolbarStore);
                            gridPagingToolbar.doRefresh();

                            vm.set('LoadPagination', 'false');
                            vm.set('BckRecPointer', '');
                            vm.set('FwdRecPointer', '');
                        }

                        if (records.length != 0) {

                            if (direction == 'Fwd') {
                                vm.set('BckRecPointer', records[0].data.RecPointer);
                                vm.set('FwdRecPointer', records[records.length - 1].data.RecPointer);
                            }
                            else {
                                vm.set('BckRecPointer', records[records.length - 1].data.RecPointer);
                                vm.set('FwdRecPointer', records[0].data.RecPointer);
                            }
                        }
                    }
                }
            });
        }
    },

    onRefresh: function (btn, event) {
        this.onSearch();
    },

    EnableDisableButton: function () {
        var alertStatus = this.getView().down('#AlertStatus').getValue(),
            userAccess = this.getViewModel().get('ApproveMacAlert');

        if (alertStatus == "0" || alertStatus == "1") {
            this.getView().down('#btnAcknowledge').enable(true);
        }
        else {
            this.getView().down('#btnAcknowledge').disable(true);
        }

        if (userAccess == true && alertStatus == "1") {
            this.getView().down('#btnApprove').show();
            this.getView().down('#btnReject').show();
        }
        else {
            this.getView().down('#btnApprove').hide();
            this.getView().down('#btnReject').hide();
        }

        if (alertStatus == '0') {
            this.getView().down('#btnSubmitApproval').enable(true);
        }
        else {
            this.getView().down('#btnSubmitApproval').disable(true);
        }

    },

    EnableDisableWindowButton: function () {
        var alertStatus = this.getView().down('#AlertStatus').getValue(),
            userAccess = this.getViewModel().get('ApproveMacAlert'),
            win = this.getView().down('#winAlertDetail');

        if (alertStatus == "0" || alertStatus == "1") {
            win.down('#btnWinAcknowledge').enable(true);
            win.down('#btnWinSave').enable(true);
        }
        else {
            win.down('#btnWinAcknowledge').disable(true);
            win.down('#btnWinSave').disable(true);
        }

        if (userAccess == true && alertStatus == "1") {
            win.down('#btnWinApprove').show();
            win.down('#btnWinReject').show();
        }
        else {
            win.down('#btnWinApprove').hide();
            win.down('#btnWinReject').hide();
        }

        if (alertStatus == '0') {
            win.down('#btnWinSubmitApproval').enable(true);
        }
        else {
            win.down('#btnWinSubmitApproval').disable(true);
        }

    },

    onAction: function (btn, event) {

        var actionNotes = '',
            selectedRecord = [],
            isZero = false,
            win,
            me = this,
            vm = this.getViewModel(),
            selectionModel = this.getView('#MacPharmacyPricingInq').getSelectionModel().getSelection();

        Ext.each(selectionModel, function (item) {
            selectedRecord.push(item.data);
        });

        if (selectedRecord.length == 0) {
            Ext.Msg.alert('PBM', 'Please select Pharmacy Pricing Inquiry records to be updated.');
            return;
        }

        if (btn.itemId == 'btnAcknowledge') {
            actionNotes = 'Pharmacy Inquiry records are acknowledged. No Change request is submitted.';
            vm.set('PharmacyInquiryAction', 'Ack');
        }
        else if (btn.itemId == 'btnSubmitApproval') {
            actionNotes = 'Pharmacy Inquiry records are submitted for approval.';
            vm.set('PharmacyInquiryAction', 'Sub');
        }
        else if (btn.itemId == 'btnApprove') {

            for (var iCnt in selectedRecord) {
                if (selectedRecord[iCnt].suggestedMAC == '0') {
                    isZero = true;
                    break;
                }
            }

            if (isZero == true) {
                Ext.Msg.alert('PBM', 'Record with Sugg. MAC value <b>0</b> cannot be approved.');
                return;
            }

            actionNotes = 'Pharmacy Inquiry records are being approved.';
            vm.set('PharmacyInquiryAction', 'App');
        }
        else if (btn.itemId == 'btnReject') {
            actionNotes = 'Pharmacy Inquiry records are rejected.';
            vm.set('PharmacyInquiryAction', 'Rej');
        }
        else {
            return;
        }

        win = Ext.create('Ext.window.Window', {
            itemId: 'winActionNotes',
            height: 200,
            width: 400,
            modal: true,
            title: 'Notes',
            layout: 'border',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            itemId: 'btnNotesSave',
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'x-fa fa-save',
                            handler: 'onActionNotesSave',
                            scope: me
                        },
                        {
                            itemId: 'btnNotesCancel',
                            xtype: 'button',
                            text: 'Cancel',
                            iconCls: 'x-fa fa-close',
                            handler: 'onActionNotesCancel',
                            scope: me
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    itemId: 'notesForm',
                    region: 'center',
                    flex: 1,
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            itemId: 'actionNotes',
                            allowBlank: false,
                            flex: 1,
                            grow: true,
                            value: actionNotes
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },

    onActionNotesSave: function () {
        var winActionNotes = this.getView().down('#winActionNotes'),
            notesForm = winActionNotes.down('#notesForm'),
            actionNotes = notesForm.down('#actionNotes').getValue(),
            vm = this.getViewModel(),
            action = vm.get('PharmacyInquiryAction'),
            MACListId,
            confMessage,
            pFieldList,
            pFieldValues,
            saveData,
            pAction,
            keyValue,
            pSystemId,
            selectionModel = this.getView('#MacPharmacyPricingInq').getSelectionModel().getSelection(),
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
            pNotesFieldList = 'Subject,Note,createUser',
            pNotesFieldValues = 'Pharmacy Price Inquiry' + '|' + 'Data Saved on ' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + '|' + Atlas.user.un;

        if (!notesForm.isValid()) {
            Ext.Msg.alert('PBM', 'Please enter notes before proceed.');
            return;
        }

        winActionNotes.destroy();

        this.getView().mask('Loading......');

        Ext.each(selectionModel, function (item) {
            switch (action) {
                case 'Sub':
                    confMessage = 'MAC Pharmacy Price Inquiry Details Successfully Submitted for Approval.';
                    pFieldList = 'suggestedMAC,proposedby,proposedDate,inquiryStatus,reviewedBy,reviewDate';
                    pFieldValues = item.data.suggestedMAC + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + '|' + '1' + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y');
                    pAction = 'SUB';
                    MACListId = item.data.MACLists;
                    break;

                case 'App':
                    confMessage = 'MAC Pharmacy Price Inquiry Details Successfully Approved.';
                    pFieldList = 'suggestedMAC,proposedby,proposedDate,inquiryStatus,reviewedBy,reviewDate';
                    pFieldValues = item.data.suggestedMAC + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + '|' + '2' + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y');
                    pAction = 'A';
                    MACListId = item.data.MACLists;
                    break;

                case 'Rej':
                    confMessage = 'MAC Pharmacy Price Inquiry Details Successfully Rejected.';
                    pFieldList = 'reviewedBy,reviewDate,inquiryStatus';
                    pFieldValues = item.data.suggestedMAC + '|' + Atlas.user.un + '|' + '3';
                    pAction = 'DNY';
                    MACListId = item.data.MACLists;
                    break;

                case 'Ack':
                    confMessage = 'MAC Pharmacy Price Inquiry Details Successfully Acknowledged.';
                    pFieldList = 'reviewedBy,reviewDate,inquiryStatus';
                    pFieldValues = item.data.suggestedMAC + '|' + Atlas.user.un + '|' + '4';
                    pAction = 'ACK';
                    MACListId = item.data.MACLists;
                    break;
            }

            keyValue = item.data.NDC;
            pSystemId = item.data.systemID;

            saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/pharmacypricinginquiryapproval/update', null, [true], {
                    pSystemId: pSystemId,
                    pMACLists: MACListId,
                    pKeyType: 'NDC',
                    pKeyValue: keyValue,
                    pAction: pAction,
                    pFieldList: pFieldList,
                    pValueList: pFieldValues,
                    pNotesFieldList: pNotesFieldList,
                    pNotesValueList: pNotesFieldValues
                },
                saveAction, null);
        });

        this.getView().unmask();

        vm.set('LoadPagination', 'true');
        this.onLoadInquiryData('0', 'Fwd', '', '');
    },

    onActionNotesCancel: function () {
        var winActionNotes = this.getView().down('#winActionNotes');
        winActionNotes.destroy();
    },

    onAlertWinAction: function (btn, event) {

        var actionNotes = '',
            win,
            me = this,
            vm = this.getViewModel(),
            winAlertDetail = this.getView().down('#winAlertDetail'),
            drugCode = winAlertDetail.down('#lblNDC').getValue(),
            sugMacValue = winAlertDetail.down('#txtSuggestedMac').getValue(),
            alertTypeDesc = winAlertDetail.down('#alertTypeDesc').getValue();

        if (btn.itemId == 'btnWinSave') {
            actionNotes = 'MAC Pharmacy Price Inquiry change request is submitted(' + alertTypeDesc + ' change). ' + 'NDC' + ':' + drugCode + ' is a new drug. New Mac Price:$' + sugMacValue + '.';
            vm.set('PharmacyInquiryWindowAction', 'Save');
        }
        else if (btn.itemId == 'btnWinAcknowledge') {
            actionNotes = 'MAC Pharmacy Price Inquiry ' + alertTypeDesc + ' change alert is acknowledged. No Change request is submitted.';
            vm.set('PharmacyInquiryWindowAction', 'Ack');
        }
        else if (btn.itemId == 'btnWinSubmitApproval') {
            actionNotes = 'MAC Pharmacy Price Inquiry record is submitted for approval. ' + 'NDC' + ':' + drugCode + ' price is updated. New Mac Price:$' + sugMacValue + '.';
            vm.set('PharmacyInquiryWindowAction', 'Sub');
        }
        else if (btn.itemId == 'btnWinApprove') {

            if (sugMacValue == '0') {
                Ext.Msg.alert('PBM', 'New User MAC cannot be approved with <b>0</b> value.');
                return;
            }

            actionNotes = 'MAC Pharmacy Price Inquiry change request is approved(' + alertTypeDesc + ' change). ' + 'NDC' + ':' + drugCode + ' price is updated. New Mac Price:$' + sugMacValue;
            vm.set('PharmacyInquiryWindowAction', 'App');
        }
        else if (btn.itemId == 'btnWinReject') {
            actionNotes = 'MAC Pharmacy Price Inquiry change request is rejected(' + alertTypeDesc + ' change). There is no change to ' + 'NDC' + ':' + drugCode;
            vm.set('PharmacyInquiryWindowAction', 'Rej');
        }
        else {
            return;
        }

        win = Ext.create('Ext.window.Window', {
            itemId: 'winDetailActionNotes',
            height: 200,
            width: 400,
            modal: true,
            title: 'Notes',
            layout: 'border',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            itemId: 'btnDetailNotesSave',
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'onAlertWinNotesSave',
                            scope: me
                        },
                        {
                            itemId: 'btnDetailNotesCancel',
                            xtype: 'button',
                            text: 'Cancel',
                            iconCls: 'x-fa fa-close',
                            handler: 'onAlertWinNotesCancel',
                            scope: me
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    itemId: 'detailNotesForm',
                    region: 'center',
                    flex: 1,
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            itemId: 'detailActionNotes',
                            allowBlank: false,
                            flex: 1,
                            grow: true,
                            value: actionNotes
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },

    onAlertWinNotesSave: function () {

        var winActionNotes = this.getView().down('#winDetailActionNotes'),
            notesForm = winActionNotes.down('#detailNotesForm'),
            actionNotes = notesForm.down('#detailActionNotes').getValue(),
            winAlertDetail = this.getView().down('#winAlertDetail'),
            keyValue = winAlertDetail.down('#lblNDC').getValue(),
            pSystemId = winAlertDetail.down('#systemID').getValue(),
            sugMacValue = winAlertDetail.down('#txtSuggestedMac').getValue(),
            MACListId = winAlertDetail.down('#cbxMacList').getValue(),
            inquiryStatus = winAlertDetail.down('#inquiryStatus').getValue(),
            selectecMacList = '',
            vm = this.getViewModel(),
            action = vm.get('PharmacyInquiryWindowAction'),
            pFieldList,
            pFieldValues,
            saveData,
            pAction,
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
            pNotesFieldList = 'Subject,Note,createUser',
            pNotesFieldValues = 'Pharmacy Price Inquiry' + '|' + actionNotes + '|' + Atlas.user.un;

        if (!notesForm.isValid()) {
            Ext.Msg.alert('PBM', 'Please enter notes before proceed.');
            return;
        }

        winActionNotes.destroy();
        winAlertDetail.destroy();

        for (var iCnt in MACListId)
        {
            selectecMacList = selectecMacList + (selectecMacList == '' ? '' : ',') + MACListId[iCnt];
        }

        this.getView().mask('Loading......');

        switch (action) {
            case 'Save':
                pFieldList = 'suggestedMAC,proposedby,proposedDate,inquiryStatus';
                pFieldValues = sugMacValue + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + '|' + inquiryStatus;
                break;

            case 'Sub':
                pFieldList = 'suggestedMAC,proposedby,proposedDate,inquiryStatus,reviewedBy,reviewDate';
                pFieldValues = sugMacValue + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + '|' + '1' + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y');
                break;

            case 'App':
                pAction = 'A';
                pFieldList = 'suggestedMAC,proposedby,proposedDate,inquiryStatus,reviewedBy,reviewDate';
                pFieldValues = sugMacValue + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + '|' + '2' + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y');
                break;

            case 'Rej':
                pFieldList = 'reviewedBy,reviewDate,inquiryStatus';
                pFieldValues = sugMacValue + '|' + Atlas.user.un + '|' + '3';
                break;

            case 'Ack':
                pFieldList = 'reviewedBy,reviewDate,inquiryStatus';
                pFieldValues = sugMacValue + '|' + Atlas.user.un + '|' + '4';
                break;
        }

        saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/pharmacypricinginquiryapproval/update', null, [true], {
                pSystemId: pSystemId,
                pMACLists: selectecMacList,
                pKeyType: 'NDC',
                pKeyValue: keyValue,
                pAction: pAction,
                pFieldList: pFieldList,
                pValueList: pFieldValues,
                pNotesFieldList: pNotesFieldList,
                pNotesValueList: pNotesFieldValues
            },
            saveAction, null);

        this.getView().unmask();

        vm.set('LoadPagination', 'true');
        this.onLoadInquiryData('0', 'Fwd', '', '');
    },

    onAlertWinNotesCancel: function () {
        var winActionNotes = this.getView().down('#winDetailActionNotes');
        winActionNotes.destroy();
    },

    onExport: function (btn, event) {
        var vm = this.getViewModel(),
            view = this.getView(),
            excludeColumns = 'inquiryStatus,RecPointer,ProductName,MACLists,MACListId,drugLevel,alertType,alertTypeDesc,alertStatus,included,MACEffDate,userMac,sysMac,suggMAc,prevAWP,' +
                             'prevWAC,AWPChgPct,WACChgPct,prevAWPDt,prevWACDt,proposedDt,reviewedDt,priceChangeDt,lastUpdateDate,covFormularies,exclFormularyIds,systemID,' +
                             'confirmationNum,ResponseDate,AlertDate,CurrentMac,mcsProgramCode',
            AlertStatus = view.down('#AlertStatus').getValue(),
            DateFrom = view.down('#InquiryDateFrom').getRawValue(),
            DateTo = view.down('#InquiryDateTo').getRawValue(),
            MacPharmacyPricingInqExport = vm.getStore('MacPharmacyPricingInqExport');

        MacPharmacyPricingInqExport.getProxy().setExtraParam('pInquiryStatus', AlertStatus);
        MacPharmacyPricingInqExport.getProxy().setExtraParam('ipInquiryDtFrom', DateFrom);
        MacPharmacyPricingInqExport.getProxy().setExtraParam('ipInquiryDtTo', DateTo);
        MacPharmacyPricingInqExport.getProxy().setExtraParam('ipiBatchSize', '0');
        MacPharmacyPricingInqExport.getProxy().setExtraParam('ipiJumpStart', '');
        MacPharmacyPricingInqExport.getProxy().setExtraParam('ipcDirection', 'FWD');
        MacPharmacyPricingInqExport.getProxy().setExtraParam('ipcBckRecPointer', '');
        MacPharmacyPricingInqExport.getProxy().setExtraParam('ipcFwdRecPointer', '');

        MacPharmacyPricingInqExport.load({
            callback: function (records, opts, success) {
                if (success) {
                    Atlas.common.utility.Utilities.exportToExcel(MacPharmacyPricingInqExport, excludeColumns);
                }
                else {
                    Ext.Msg.alert('Request Failure', 'Error occurred while processing your request. Please contact your admin.');
                }
            }
        });
    },

    onClickChange: function (grid, rowIndex, colIndex) {

        var me = this,
            vm = this.getViewModel(),
            rec = grid.getStore().getAt(rowIndex),
            SelMACList = rec.get('MACLists');

        vm.set('priceInqRec', grid.getStore().getAt(rowIndex));

        win = Ext.create('Ext.window.Window', {
            title: 'Mac Alert',
            width: 1000,
            height: '90%',
            modal: true,
            itemId: 'winAlertDetail',

            layout: {
                type: 'fit'
            },
            listeners: {
                scope: me,
                'show': 'setControlsValue'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btnWinSave',
                            text: 'Save',
                            handler: 'onAlertWinAction',
                            scope: me,
                            iconCls: 'x-fa fa-floppy-o'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinAcknowledge',
                            text: 'Acknowledge',
                            handler: 'onAlertWinAction',
                            scope: me,
                            iconCls: 'x-fa fa-check'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinSubmitApproval',
                            text: 'Submit For Approval',
                            handler: 'onAlertWinAction',
                            scope: me,
                            iconCls: 'x-fa fa-tasks'
                        }, '->',
                        {
                            xtype: 'button',
                            itemId: 'btnWinApprove',
                            text: 'Approve',
                            scope: me,
                            iconCls: 'x-fa fa-check-circle',
                            handler: 'onAlertWinAction'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinReject',
                            text: 'Reject',
                            scope: me,
                            iconCls: 'x-fa fa-times',
                            handler: 'onAlertWinAction'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinCancel',
                            text: 'Cancel',
                            handler: 'onCancelAction',
                            scope: me,
                            iconCls: 'x-fa fa-times'
                        }
                    ]
                }
            ],

            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    overflowX: 'scroll',
                    overflowY: 'scroll',
                    controller: {
                        parent: me
                    },
                    viewModel: {
                        parent: vm
                    },
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'drugInfo',
                            minHeight: 70,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'

                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 5',
                                    flex: 6,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hidden',
                                            name: 'systemID',
                                            itemId: 'systemID'
                                        },
                                        {
                                            xtype: 'hidden',
                                            name: 'alertTypeDesc',
                                            itemId: 'alertTypeDesc'
                                        },
                                        {
                                            xtype: 'hidden',
                                            name: 'MACLists',
                                            itemId: 'MACLists'
                                        },
                                        {
                                            xtype: 'hidden',
                                            name: 'inquiryStatus',
                                            itemId: 'inquiryStatus'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'New User MAC $',
                                            itemId: 'txtSuggestedMac',
                                            flex: 2,
                                            hideTrigger: true,
                                            name: 'suggestedMAC'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Mac List',
                                            labelWidth: 50,
                                            flex: 5,
                                            itemId: 'cbxMacList',
                                            bind: {
                                                store: '{Maclist}'
                                            },
                                            multiSelect: true,
                                            tpl: new Ext.XTemplate('<tpl for=".">'
                                                + '<div class="x-boundlist-item" >'
                                                + '<tpl if="this.checkStatus(values) == true">'
                                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked="true" >&nbsp;{MACListName}'
                                                + '</tpl>'
                                                + '<tpl if="this.checkStatus(values) == false">'
                                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" >&nbsp;{MACListName}'
                                                + '</tpl>'
                                                + '</div></tpl>',
                                                {
                                                    checkStatus: function(values){
                                                        return (SelMACList.indexOf(values.MACListID) != -1 ? true : false);
                                                    }
                                                }
                                            ),
                                            valueField: 'MACListID',
                                            displayField: 'MACListName',
                                            listeners: {
                                                select: function (combo, records) {
                                                    var node;
                                                    Ext.each(records, function (rec) {
                                                        node = combo.getPicker().getNode(rec);
                                                        if (node != null) {
                                                            Ext.get(node).down('input').dom.checked = true;
                                                        }
                                                    });
                                                },
                                                beforedeselect: function (combo, rec) {
                                                    var node = combo.getPicker().getNode(rec);
                                                    if (node != null) {
                                                        Ext.get(node).down('input').dom.checked = false;
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 5',
                                    flex: 4,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'proposedBy',
                                                    fieldLabel: 'Proposed By',
                                                    renderer: function (record) {
                                                        return Atlas.user.un;
                                                    }
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: 'Reviewed By',
                                                    name: 'reviewedBy'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    listeners : {
                                                        render: function(control) {
                                                            return Ext.Date.format(record, 'm/d/Y');
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    name: 'reviewDate',
                                                    renderer: function (record) {
                                                        return Ext.Date.format(record, 'm/d/Y');
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'form',
                            itemId: 'pricingInfo',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'

                            },
                            flex: 4.5,
                            items: [
                                {
                                    xtype: 'panel',
                                    title: 'Drug Info',
                                    margin: '5 0 0 5',
                                    layout: 'vbox',
                                    flex: 5,
                                    autoScroll: true,
                                    defaults: {
                                        labelWidth: 120
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                labelWidth: 120
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'lblNDC',
                                                    fieldLabel: 'NDC',
                                                    name: 'NDC'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-medkit',
                                                    itemId: 'ndcRedirect',
                                                    scope: me,
                                                    tooltip: 'Goto MDB Drug Search',
                                                    handler: 'onMedispanRedirect'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblDrugName',
                                            fieldLabel: 'Drug Name',
                                            name: 'LN'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                labelWidth: 120
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'lblGPICode',
                                                    fieldLabel: 'GPI Code',
                                                    name: 'GPICode'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-medkit',
                                                    itemId: 'gpiRedirect',
                                                    scope: me,
                                                    tooltip: 'Goto MDB Drug Search',
                                                    handler: 'onMedispanRedirect'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblGPIName',
                                            fieldLabel: 'Name',
                                            name: 'GPIName'
                                        },
                                        {xtype: 'displayfield', itemId: 'lblGCN', fieldLabel: 'GCN', name: 'GCNSeqNo'},
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblGCNName',
                                            fieldLabel: 'GNN60',
                                            name: 'GNN60'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lbldrugTypeFDB',
                                            fieldLabel: 'FDB Drug Type',
                                            name: 'drugTypeFDB'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lbldrugTypeMDB',
                                            fieldLabel: 'MDB Drug Type',
                                            name: 'drugTypeMDB'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    title: 'Pricing Info',
                                    margin: '5 0 0 5',
                                    layout: 'vbox',
                                    flex: 2,
                                    autoScroll: true,
                                    default: {
                                        labelWidth: 100
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblPaidamt',
                                            fieldLabel: 'Paid Amt',
                                            name: 'paidAmt',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblPharmacyCst',
                                            fieldLabel: 'Pharmacy Cost',
                                            name: 'pharmacyCost',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblCurrWAC',
                                            fieldLabel: 'WAC',
                                            name: 'currWAC',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblCurrAWP',
                                            fieldLabel: 'AWP',
                                            name: 'currAWP',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lbl85OfAWP',
                                            fieldLabel: '<span style="color: red">85% Of AWP</span>',
                                            name: 'PctOfAWP85',
                                            fieldStyle: {
                                                color: 'red'
                                            },
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {xtype: 'displayfield', itemId: 'lblRxno', fieldLabel: 'Rx No.', name: 'RxNum'},
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblclaimId',
                                            fieldLabel: 'Claim ID',
                                            name: 'claimID'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblClaimDate',
                                            fieldLabel: 'Claim Date',
                                            name: 'claimDate',
                                            renderer: function (record) {
                                                return Ext.Date.format(record, 'm/d/Y');
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblInquiryDate',
                                            fieldLabel: 'Inquiry Date',
                                            name: 'InquiryDate',
                                            renderer: function (record) {
                                                return Ext.Date.format(record, 'm/d/Y');
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblStateMAC',
                                            fieldLabel: '<span style="color: red">MI MAC</span>',
                                            name: 'MIMAC',
                                            fieldStyle: {
                                                color: 'red'
                                            },
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    title: 'Contact Info',
                                    margin: '5 5 0 5',
                                    layout: 'vbox',
                                    flex: 3,
                                    autoScroll: true,
                                    default: {
                                        labelWidth: 100
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblName',
                                            fieldLabel: 'Contact Name',
                                            name: 'contactName'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblPhone',
                                            fieldLabel: 'Phone',
                                            name: 'contactPhone'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblFax',
                                            fieldLabel: 'Fax',
                                            name: 'contactFax'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblEmail',
                                            fieldLabel: 'Email',
                                            name: 'contactEmail'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblComments',
                                            fieldLabel: 'Comments',
                                            name: 'comments'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            itemId: 'utilizationInfo',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            flex: 4.5,
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    flex: 2,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    margin: '5 0 0 5',
                                    items: [
                                        {
                                            title: 'NDC Utilization',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    flex: 1,
                                                    bind: {
                                                        store: '{NDCUtilization}'
                                                    },
                                                    columns: {
                                                        defaults: {
                                                            flex: 1
                                                        },
                                                        items: [
                                                            {text: 'Period', dataIndex: 'Period', flex: 1.5},
                                                            {
                                                                text: 'Total Rx',
                                                                dataIndex: 'TotRx',
                                                                xtype: 'numbercolumn',
                                                                format: '0,000'
                                                            },
                                                            {
                                                                text: 'Total Qty.',
                                                                dataIndex: 'TotQty',
                                                                xtype: 'numbercolumn',
                                                                format: '0,000.00'
                                                            },
                                                            {
                                                                text: 'Total Ing. Cost',
                                                                dataIndex: 'TotIng',
                                                                xtype: 'numbercolumn',
                                                                format: '$0,0.00',
                                                                flex: 1.5
                                                            },
                                                            {
                                                                text: 'Avg. Ing. Cost',
                                                                dataIndex: 'AvgIng',
                                                                xtype: 'numbercolumn',
                                                                format: '$0,0.00'
                                                            },
                                                            {
                                                                text: 'Mkt. Share Rx',
                                                                dataIndex: 'MktRx',
                                                                xtype: 'numbercolumn',
                                                                renderer: function (record) {
                                                                    return record + '%';
                                                                }
                                                            },
                                                            {
                                                                text: 'Mkt. Share Qty',
                                                                dataIndex: 'MktQty',
                                                                xtype: 'numbercolumn',
                                                                renderer: function (record) {
                                                                    return record + '%';
                                                                }
                                                            },
                                                            {
                                                                text: 'Mkt. Share Ing. Cost',
                                                                dataIndex: 'MktIng',
                                                                xtype: 'numbercolumn',
                                                                renderer: function (record) {
                                                                    return record + '%';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'GCN Utilization',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    itemId: 'PeriodGCN',
                                                    margin: '8 0 0 0',
                                                    fieldLabel: 'Period',
                                                    labelWidth: 50,
                                                    width: 50,
                                                    bind: {
                                                        store: '{PeriodGCN}'
                                                    },
                                                    valueField: 'value',
                                                    displayField: 'text',
                                                    value: 'CurrentYTD',
                                                    listeners: {
                                                        select: 'loadGCNUtilization',
                                                        scope: me
                                                    }
                                                },
                                                {
                                                    xtype: 'grid',
                                                    itemId: 'gridGcn',
                                                    flex: 1,
                                                    margin: '5 0 0 0',
                                                    bind: {
                                                        store: '{GCNUtilization}'
                                                    },
                                                    columns: {
                                                        defaults: {
                                                            flex: 1
                                                        },
                                                        items: [
                                                            {text: 'NDC', dataIndex: 'NDC', flex: 2},
                                                            {
                                                                text: 'Drug Detail',
                                                                xtype: 'actioncolumn',
                                                                iconCls: 'x-fa fa-arrow-circle-right',
                                                                align: 'center',
                                                                hideable: false,
                                                                handler: 'onShowDrugDetail',
                                                                scope: me
                                                            },
                                                            {text: 'Label Name', dataIndex: 'LabelName', flex: 2},
                                                            {
                                                                text: 'Rx Count',
                                                                dataIndex: 'RxCount',
                                                                xtype: 'numbercolumn',
                                                                format: '0,000'
                                                            },
                                                            {
                                                                text: 'Qty Count',
                                                                dataIndex: 'QtyCount',
                                                                xtype: 'numbercolumn',
                                                                format: '0,000.00'
                                                            },
                                                            {
                                                                text: 'Ing. Cost',
                                                                dataIndex: 'IngCost',
                                                                xtype: 'numbercolumn',
                                                                format: '$0,0.00'
                                                            },
                                                            {
                                                                text: 'Avg. Ing. Cost',
                                                                dataIndex: 'AvgIngCost',
                                                                xtype: 'numbercolumn',
                                                                format: '$0,0.00'
                                                            },
                                                            {text: 'Mkt. Share Rx', dataIndex: 'MktShareRx'},
                                                            {text: 'Mkt. Share Qty', dataIndex: 'MktShareQty'},
                                                            {text: 'Mkt. Ing Cost', dataIndex: 'MktIngCost'}
                                                        ]
                                                    },
                                                    dockedItems: [
                                                        {
                                                            xtype: 'pagingtoolbar',
                                                            bind: '{GCNUtilization}',
                                                            displayInfo: true,
                                                            pageSize: 10,
                                                            dock: 'bottom'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    margin: '5 0 0 5',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            flex: 4,
                                            itemId: 'reviewNotes',
                                            readOnly: true,
                                            emptyText: ' [Review History Notes]',
                                            overflowY: 'scroll'
                                        },
                                        {
                                            xtype: 'grid',
                                            flex: 6,
                                            margin: '5 0 0 0',
                                            bind: {
                                                store: '{AlertAttachments}'
                                            },
                                            tbar: [
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-file',
                                                    text: 'Add Attachment',
                                                    align: 'left',
                                                    scope: me,
                                                    handler: 'onAttachDoc'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    flex: 1
                                                },
                                                items: [
                                                    {
                                                        text: 'File Name', dataIndex: 'fileName',
                                                        renderer: function (record) {
                                                            var rec = record.split('/');
                                                            return (rec.length == 0 ? rec : rec[rec.length - 1]);
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'Subject'},
                                                    {text: 'DocID', dataIndex: 'DocumentID', hidden: true},
                                                    {
                                                        xtype: 'actioncolumn',
                                                        hideable: false,
                                                        align: 'center',
                                                        handler: 'onViewDoc',
                                                        iconCls: 'x-fa fa-file-pdf-o',
                                                        tooltip: 'View Attachment',
                                                        scope: me
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        hideable: false,
                                                        align: 'center',
                                                        iconCls: 'x-fa fa-minus-circle',
                                                        tooltip: 'Delete Attachment',
                                                        handler: 'onDeleteDoc',
                                                        scope: me
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                }
            ]

        });

        this.getView().add(win);
        win.show();

    },

    onMedispanRedirect: function (btn) {
        var me = this,
            view = this.getView(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/formulary/MedispanDrugSearch'),
            selectedField = (btn.itemId == 'ndcRedirect' ? 'NDC' : 'GPI'),
            selectedValue = (btn.itemId == 'ndcRedirect' ? view.down('#lblNDC').getValue() : view.down('#lblGPICode').getValue());

        me.fireEvent('openView', 'merlin', 'formulary', 'MedispanDrugSearch', {
            selectedField: selectedField,
            selectedValue: selectedValue,
            menuId: menuId,
            title: 'Medispan Drug Search',
            openView:true
        }, null);
    },

    onViewDoc: function (grid, rowIndex, colIndex) {
        var DocumentID = grid.getStore().getAt(rowIndex).get('DocumentID');

        if (DocumentID != '' && DocumentID != 'undefined') {
            Atlas.common.utility.Utilities.viewDocument(DocumentID);
        }
    },

    onDeleteDoc: function (grid, rowIndex, colIndex) {
        var me = this,
            vm = this.getViewModel(),
            DocumentID = grid.getStore().getAt(rowIndex).get('DocumentID'),
            priceInqRec = vm.get('priceInqRec'),
            systemID = priceInqRec.get('systemID');

        Ext.Msg.confirm('Delete Attachment', 'Are you sure you would like to remove this attachment?', function (btn) {
            if (btn == 'yes') {
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
                    saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                            pcPlanID: '',
                            pcKeyType: 'PharPriceInqSystemId',
                            pcKeyValue: systemID,
                            pcKeyAction: 'D',
                            pcDocIDList: DocumentID,
                            pcDescrData: ''
                        },
                        saveAction, null);

                if (saveData.code != 0) {
                    Ext.Msg.alert('Delete Attachment', saveData.message);
                }
                else {
                    me.getAttachments();
                }
            }
        });
    },

    row_dblClick: function (dv, record, item, index, e) {
        var grid = this.getView('#MacPharmacyPricingInq');

        this.onClickChange(grid, index, '0');

    },

    setControlsValue: function () {

        var vm = this.getViewModel(),
            NDCUtilization = vm.getStore('NDCUtilization'),
            GCNUtilization = vm.getStore('GCNUtilization'),
            win = this.getView().down('#winAlertDetail'),
            cbxMacList = win.down('#cbxMacList'),
            drugInfo = win.down('#drugInfo'),
            pricingInfo = win.down('#pricingInfo'),
            priceInqRec = vm.get('priceInqRec'),
            NDC = priceInqRec.get('NDC');

        this.getView().mask('Loading...');

        win.setTitle('MAC Alert (For NDC:' + NDC + ')');

        this.EnableDisableWindowButton();

        drugInfo.loadRecord(priceInqRec);
        pricingInfo.loadRecord(priceInqRec);

        drugInfo.down('#proposedBy').setValue(Atlas.user.un);
        cbxMacList.setValue(priceInqRec.data.MACLists.split(','));

        NDCUtilization.removeAll(true);
        GCNUtilization.removeAll(true);

        NDCUtilization.add(
            {
                Period: 'Current YTD',
                TotRx: priceInqRec.get('totRxYTD'),
                TotQty: priceInqRec.get('totQtyYTD'),
                TotIng: priceInqRec.get('totIngYTD'),
                AvgIng: priceInqRec.get('avgIngYTD'),
                MktRx: priceInqRec.get('mktRxYTD'),
                MktQty: priceInqRec.get('mktQtyYTD'),
                MktIng: priceInqRec.get('mktIngYTD')
            },
            {
                Period: 'Current Month',
                TotRx: priceInqRec.get('totRxCurrMonth'),
                TotQty: priceInqRec.get('totQtyCurrMonth'),
                TotIng: priceInqRec.get('totIngCurrMonth'),
                AvgIng: priceInqRec.get('avgIngCurrMonth'),
                MktRx: priceInqRec.get('mktRxCurrMonth'),
                MktQty: priceInqRec.get('mktQtyCurrMonth'),
                MktIng: priceInqRec.get('mktIngCurrMonth')
            },
            {
                Period: 'Last Month',
                TotRx: priceInqRec.get('totRxLastMonth'),
                TotQty: priceInqRec.get('totQtyLastMonth'),
                TotIng: priceInqRec.get('totIngLastMonth'),
                AvgIng: priceInqRec.get('avgIngLastMonth'),
                MktRx: priceInqRec.get('mktRxLastMonth'),
                MktQty: priceInqRec.get('mktQtyLastMonth'),
                MktIng: priceInqRec.get('mktIngLastMonth')
            },
            {
                Period: 'Last 3 Months',
                TotRx: priceInqRec.get('totRxLast3Mths'),
                TotQty: priceInqRec.get('totQtyLast3Mths'),
                TotIng: priceInqRec.get('totIngLast3Mths'),
                AvgIng: priceInqRec.get('avgIngLast3Mths'),
                MktRx: priceInqRec.get('mktRxLast3Mths'),
                MktQty: priceInqRec.get('mktQtyLast3Mths'),
                MktIng: priceInqRec.get('mktIngLast3Mths')
            },
            {
                Period: 'Last Quarter',
                TotRx: priceInqRec.get('totRxLastQtr'),
                TotQty: priceInqRec.get('totQtyLastQtr'),
                TotIng: priceInqRec.get('totIngLastQtr'),
                AvgIng: priceInqRec.get('avgIngLastQtr'),
                MktRx: priceInqRec.get('mktRxLastQtr'),
                MktQty: priceInqRec.get('mktQtyLastQtr'),
                MktIng: priceInqRec.get('mktIngLastQtr')
            },
            {
                Period: 'Last 6 Months',
                TotRx: priceInqRec.get('totRxLast6Mths'),
                TotQty: priceInqRec.get('totQtyLast6Mths'),
                TotIng: priceInqRec.get('totIngLast6Mths'),
                AvgIng: priceInqRec.get('avgIngLast6Mths'),
                MktRx: priceInqRec.get('mktRxLast6Mths'),
                MktQty: priceInqRec.get('mktQtyLast6Mths'),
                MktIng: priceInqRec.get('mktIngLast6Mths')
            },
            {
                Period: 'Last Year',
                TotRx: priceInqRec.get('totRxLastYear'),
                TotQty: priceInqRec.get('totQtyLastYear'),
                TotIng: priceInqRec.get('totIngLastYear'),
                AvgIng: priceInqRec.get('avgIngLastyear'),
                MktRx: priceInqRec.get('mktRxLastYear'),
                MktQty: priceInqRec.get('mktQtyLastYear'),
                MktIng: priceInqRec.get('mktIngLastYear')
            }
        );

        this.loadGCNUtilization();
        this.getNotes();
        this.getAttachments();

        this.getView().unmask();

    },

    getNotes: function () {
        var vm = this.getViewModel(),
            me = this,
            AlertNotes = vm.getStore('AlertNotes'),
            priceInqRec = vm.get('priceInqRec'),
            systemID = priceInqRec.get('systemID');

        AlertNotes.getProxy().setExtraParam('pParentSystemID', systemID);
        AlertNotes.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        AlertNotes.sort('SystemID', 'DESC');
                        me.populateNotes();
                    }
                }
            });
    },

    populateNotes: function () {
        var vm = this.getViewModel(),
            notes = '',
            AlertNotes = vm.getStore('AlertNotes'),
            win = this.getView().down('#winAlertDetail'),
            reviewNotes = win.down('#reviewNotes');

        AlertNotes.each(function (rec) {
            notes = notes + (notes == '' ? '' : '\r\n\n') + rec.get('CreateUser') + ' (' + Ext.Date.format(new Date(rec.get('CreateDate')), 'm/d/Y') + ' ' + rec.get('CreateTime') + ') -- ' + rec.get('Note');
        });

        reviewNotes.setValue(notes);
    },

    getAttachments: function () {
        var vm = this.getViewModel(),
            AlertAttachments = vm.getStore('AlertAttachments'),
            priceInqRec = vm.get('priceInqRec'),
            systemID = priceInqRec.get('systemID');

        AlertAttachments.getProxy().setExtraParam('pcKeyType', 'PharPriceInqSystemId');
        AlertAttachments.getProxy().setExtraParam('pcKeyValue', systemID);
        AlertAttachments.getProxy().setExtraParam('pcInOut', '');
        AlertAttachments.load();
    },

    onAttachDoc: function () {
        var win = Ext.create('Ext.window.Window', {
            title: 'File upload', modal: true,
            width: 400, height: 300,
            layout: {type: 'fit', align: 'stretch'},
            listeners: {
                'beforeclose': 'onAttachmentWindowClose'
            },
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    keyType: 'imagePharmInquiry',
                    fileType: 'pdf',
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });

        this.getView().add(win);
        win.show();
    },

    onAttachmentWindowClose: function(win){
        var vm = this.getViewModel(),
            priceInqRec = vm.get('priceInqRec'),
            systemID = priceInqRec.get('systemID'),
            documentIDList = win.down('panel').getViewModel().get('documentIDList');

        if (documentIDList.length != 0) {

            for (var item in documentIDList) {

                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                        pcPlanID: '',
                        pcKeyType: 'PharPriceInqSystemId',
                        pcKeyValue: systemID,
                        pcKeyAction: 'A',
                        pcDocIDList: documentIDList[item],
                        pcDescrData: 'Pricing Inquiry Attachment'
                    },
                    saveAction, null);

                if (saveData.code != "0") {
                    Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
                }
                else {
                    this.getAttachments();
                }
            }
        }
    },

    loadGCNUtilization: function () {

        var vm = this.getViewModel(),
            win = this.getView().down('#winAlertDetail'),
            NDC = win.down('#lblNDC').getValue(),
            UtilPeriod = win.down('#PeriodGCN').getValue(),
            GCNUtilization = vm.getStore('GCNUtilization');

        if (UtilPeriod == null) {
            return;
        }

        GCNUtilization.getProxy().setExtraParam('ipcNDC', NDC);
        GCNUtilization.getProxy().setExtraParam('ipcUtilPeriod', UtilPeriod);
        GCNUtilization.load();
    },

    onClickStateMAC: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            NDC = rec.get('NDC');

        var me = this,
            view = this.getView(),
            viewModel = this.getViewModel(),
            StateMac = viewModel.getStore('StateMac'),
            win;

        view.mask('Loading....');

        StateMac.getProxy().setExtraParam('ipcDrugCode', NDC);
        StateMac.getProxy().setExtraParam('ipcPriceType', '01');
        StateMac.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        win = Ext.create('Ext.window.Window', {
                            title: 'State MAC',
                            height: 270,
                            width: 450,
                            modal: true,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    flex: 1,
                                    viewModel: {
                                        parent: viewModel
                                    },
                                    bind: {
                                        store: '{StateMac}'
                                    },
                                    columns: {
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {text: 'State Code', dataIndex: 'StateCode'},
                                            {
                                                text: 'Price Date',
                                                dataIndex: 'PriceDate',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            },
                                            {
                                                text: 'Price',
                                                dataIndex: 'Price',
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000'
                                            }
                                        ]
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: '{StateMac}',
                                            pageSize: 5,
                                            displayInfo: true,
                                            dock: 'bottom'
                                        }
                                    ]
                                }
                            ]
                        });

                        win.show();
                    }

                    view.unmask();
                }

            });
    },

    onCancelAction: function () {
        var win = this.getView().down('#winAlertDetail');
        win.destroy();
    },

    onShowDrugDetail: function (grid, rowIndex, colIndex) {

        var me = this,
            vm = this.getViewModel(),
            parWin = this.getView().down('#winAlertDetail'),
            rec = grid.getStore().getAt(rowIndex),
            ndc = rec.get('NDC'),
            win;

        vm.set('gcnUtilizationDrug', ndc);

        win = Ext.create('Ext.window.Window', {
            title: 'Drug Details',
            height: 700,
            width: 1000,
            itemId: 'winDrugDetails',
            modal: true,
            layout: {
                type: 'fit'
            },
            listeners: {
                scope: me,
                'show': 'setDrugDetail'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'drugDetailInfo',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'

                            },
                            flex: 6,
                            items: [
                                {
                                    xtype: 'panel',
                                    collapsible: true,
                                    title: 'General Information',
                                    cls: 'card-panel',
                                    flex: 1,
                                    defaults: {
                                        xtype: 'displayfield',
                                        labelWidth: 130
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'NDC',
                                            name: 'NDC'
                                        },
                                        {
                                            fieldLabel: 'Labeler',
                                            name: '@mfg'
                                        },
                                        {
                                            fieldLabel: 'GCN',
                                            name: 'GCN_SEQNO'
                                        },
                                        {
                                            fieldLabel: 'Package Size',
                                            name: 'PS'
                                        },
                                        {
                                            fieldLabel: 'Label Name',
                                            name: 'LN'
                                        },
                                        {
                                            fieldLabel: 'Brand Name',
                                            name: 'BN'
                                        },
                                        {
                                            fieldLabel: 'Previous NDC',
                                            name: 'PNDC'
                                        },
                                        {
                                            fieldLabel: 'Repl. NDC',
                                            name: 'REPNDC'
                                        },
                                        {
                                            fieldLabel: 'Orange Book Code',
                                            name: 'OBC'
                                        },
                                        {
                                            fieldLabel: 'Repackaged Ind.',
                                            name: 'REPACKYesNo'
                                        },
                                        {
                                            fieldLabel: 'Unit Dose Ind.',
                                            name: 'UDYesNo'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    collapsible: true,
                                    cls: 'card-panel',

                                    defaults: {
                                        xtype: 'displayfield',
                                        labelWidth: 150
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Date of Add',
                                            name: 'DADDNC'
                                        },
                                        {
                                            fieldLabel: 'Obsolete Date',
                                            name: 'OBSDTEC'
                                        },
                                        {
                                            fieldLabel: 'Market Entry Date',
                                            name: 'HCFA_MRKC'
                                        },
                                        {
                                            fieldLabel: 'Term. Date',
                                            name: 'HCFA_TRMC'
                                        },
                                        {
                                            fieldLabel: 'CMS Unit Ind.',
                                            name: 'HCFA_UNITYesNo'
                                        },
                                        {
                                            fieldLabel: 'CMS Units Per Pkg.',
                                            name: 'HCFA_PS'
                                        },
                                        {
                                            fieldLabel: 'Drug Type',
                                            name: '@drugType'
                                        },
                                        {
                                            fieldLabel: 'DEA Code',
                                            name: 'DEA'
                                        },
                                        {
                                            fieldLabel: 'Generic Name Ind.',
                                            name: 'GNIYesNo'
                                        },
                                        {
                                            fieldLabel: 'Therapeutic Equiv. Ind.',
                                            name: 'GTI'
                                        },
                                        {
                                            fieldLabel: 'Drug Class',
                                            name: 'CL'
                                        }
                                    ]
                                }
                            ]

                        },
                        {
                            xtype: 'form',
                            flex: 4,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    cls: 'card-panel',
                                    title: 'AWP Change History',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            itemId: 'gridAWPChange',
                                            flex: 1,
                                            viewModel: {
                                                parent: vm
                                            },
                                            bind: {
                                                store: '{AWPPriceHistory}'
                                            },
                                            dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    bind: '{AWPPriceHistory}',
                                                    pageSize: 10,
                                                    displayInfo: true,
                                                    dock: 'bottom'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    flex: 1
                                                },
                                                items: [
                                                    {
                                                        text: 'Change Date',
                                                        dataIndex: 'priceDate',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    },
                                                    {
                                                        text: 'AWP',
                                                        dataIndex: 'price',
                                                        xtype: 'numbercolumn',
                                                        format: '$0,0.0000'
                                                    },
                                                    {text: 'Source', dataIndex: 'src'},
                                                    {
                                                        text: 'Last Modified',
                                                        dataIndex: 'lastModified',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    cls: 'card-panel',
                                    title: 'WAC Change History',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            itemId: 'gridWACChange',
                                            flex: 1,
                                            viewModel: {
                                                parent: vm
                                            },
                                            bind: {
                                                store: '{WACPriceHistory}'
                                            },
                                            dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    bind: '{WACPriceHistory}',
                                                    pageSize: 10,
                                                    displayInfo: true,
                                                    dock: 'bottom'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    flex: 1
                                                },
                                                items: [
                                                    {
                                                        text: 'Change Date',
                                                        dataIndex: 'priceDate',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    },
                                                    {
                                                        text: 'WAC',
                                                        dataIndex: 'price',
                                                        xtype: 'numbercolumn',
                                                        format: '$0,0.0000'
                                                    },
                                                    {text: 'Source', dataIndex: 'src'},
                                                    {
                                                        text: 'Last Modified',
                                                        dataIndex: 'lastModified',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]

                }

            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'btnPrint',
                            text: 'Print',
                            handler: 'printWindow',
                            scope: me,
                            iconCls: 'x-fa fa-print'
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();

    },

    printWindow: function () {
        window.print();
    },

    setDrugDetail: function () {

        var me = this,
            vm = this.getViewModel(),
            NDC = vm.get('gcnUtilizationDrug'),
            pFieldList = 'NDC,@mfg,GCN_SEQNO,PS,LN,BN,PNDC,REPNDC,DADDNC,OBSDTEC,HCFA_UNIT,HCFA_PS,HCFA_MRKC,HCFA_TRMC,OBC,DEA,GNI,GTI,REPACK,UD,CL,@drugType',
            winDrugDetails = this.getView().down('#winDrugDetails'),
            formDrugInfo = winDrugDetails.down('#drugDetailInfo'),
            FDBDrugDetail = vm.getStore('FDBDrugDetail'),
            AWPPriceHistory = vm.getStore('AWPPriceHistory'),
            WACPriceHistory = vm.getStore('WACPriceHistory');

        winDrugDetails.mask('Loading.....');

        FDBDrugDetail.getProxy().setExtraParam('pDrugCode', NDC);
        FDBDrugDetail.getProxy().setExtraParam('pFieldList', pFieldList);
        FDBDrugDetail.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        formDrugInfo.loadRecord(records[0]);
                    }
                }
            }
        );

        AWPPriceHistory.getProxy().setExtraParam('pcNDC', NDC);
        AWPPriceHistory.getProxy().setExtraParam('pcPrcType', 'AWPUnit');
        AWPPriceHistory.load();

        WACPriceHistory.getProxy().setExtraParam('pcNDC', NDC);
        WACPriceHistory.getProxy().setExtraParam('pcPrcType', 'WACUnit');
        WACPriceHistory.load();

        winDrugDetails.unmask();
    }

});
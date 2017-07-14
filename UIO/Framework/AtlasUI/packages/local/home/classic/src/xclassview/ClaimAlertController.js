Ext.define('Atlas.home.xclassview.ClaimAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclassclaimalert',

    init: function () {
        var vm = this.getViewModel();

        vm.set('BckRecPointer', '');
        vm.set('FwdRecPointer', '');
        vm.set('JumpStart', '0');
        vm.set('Direction', 'Fwd');
        vm.set('Filter', '');
        vm.set('LoadPagination', 'true');
        vm.set('isFirstExpand', true);
    },

    getSelectedPageData: function (pagingtoolbar, page, eOpts) {

        var vm = this.getViewModel(),
            prevPage = pagingtoolbar.store.currentPage,
            direction = '',
            bckRecPointer = vm.get('BckRecPointer'),
            fwdRecPointer = vm.get('FwdRecPointer'),
            Filter = vm.get('Filter'),
            jumpStart = 0,
            pageDiff = page - prevPage,
            isJump = false;

        if (pageDiff != 1 && pageDiff != -1){
            isJump = true;
        }

        if (isJump) {
            direction = 'Fwd';
            jumpStart = (page - 1) * 10;
            bckRecPointer = '';
            fwdRecPointer = '';
        }
        else if (prevPage > page) {
            direction = 'Bck';
        }
        else {
            direction = 'Fwd';
        }

        this.onLoadInquiryData(jumpStart, direction, bckRecPointer, fwdRecPointer, Filter);

        return true;
    },

    onLoadInquiryData: function (jumpStart, direction, bckRecPointer, fwdRecPointer, filter) {

        var vm = this.getViewModel(),
            view = this.getView(),
            claimStore = vm.getStore('claimalert'),
            gridPagingToolbar = view.down('#gridPagingToolbar'),
            PagingToolbarStore = vm.getStore('PagingToolbarStore'),
            LoadPagination = vm.get('LoadPagination');

        vm.set('BckRecPointer', '');
        vm.set('FwdRecPointer', '');
        vm.set('JumpStart', jumpStart);
        vm.set('Direction', direction);

        claimStore.getProxy().setExtraParam('piQueID', '4');
        claimStore.getProxy().setExtraParam('pcLOBID', '3');
        claimStore.getProxy().setExtraParam('ipiBatchSize', 10);
        claimStore.getProxy().setExtraParam('ipiJumpStart', jumpStart);
        claimStore.getProxy().setExtraParam('ipcFilter', filter);
        claimStore.getProxy().setExtraParam('ipcDirection', direction);
        claimStore.getProxy().setExtraParam('ipcBckRecPointer', bckRecPointer);
        claimStore.getProxy().setExtraParam('ipcFwdRecPointer', fwdRecPointer);

        claimStore.load({
            callback: function (records, opts, success) {
                if (success) {

                    if (LoadPagination == 'true') {
                        PagingToolbarStore.removeAll(true);

                        for (var iCnt = 1; iCnt <= opts._resultSet.metadata.opiRecordCount; iCnt++) {
                            PagingToolbarStore.add({PageNumber: iCnt});
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
    },

    onSearch: function (value) {
        var vm = this.getViewModel(),
            filter = this.lookup('ClaimAlertSearchField').getValue();

        vm.set('LoadPagination', 'true');
        vm.set('Filter', filter);
        this.onLoadInquiryData('0', 'Fwd', '', '', filter);
    },

    onFirstLoad: function () {
        var vm = this.getViewModel(),
            isFirstExpand = vm.get('isFirstExpand');

        if (isFirstExpand) {
            vm.set('isFirstExpand', false);
            this.onSearch('');
        }
    },

    claimAssignTo: function (selection) {
        var gridSelection = this.getView().getSelectionModel().getSelected();

        if (gridSelection == null || selection.value == '' || selection.value == null){
            return;
        }

        this.getView().editingPlugin.completeEdit();

        var SystemID = gridSelection.items[0].data.SystemID,
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [true], {
                pSystemID: SystemID,
                pFieldList: 'AssignTo',
                pFields: selection.value
            },
            saveAction, null);
    },

    onExportExcelClick: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            ClaimAlertExport = vm.getStore('ClaimAlertExport');

        ClaimAlertExport.getProxy().setExtraParam('piQueID', '4');
        ClaimAlertExport.getProxy().setExtraParam('pcLOBID', '3');
        ClaimAlertExport.getProxy().setExtraParam('ipiBatchSize', 0);
        ClaimAlertExport.getProxy().setExtraParam('ipiJumpStart', 0);
        ClaimAlertExport.getProxy().setExtraParam('ipcFilter', '');
        ClaimAlertExport.getProxy().setExtraParam('ipcDirection', 'Fwd');
        ClaimAlertExport.getProxy().setExtraParam('ipcBckRecPointer', '');
        ClaimAlertExport.getProxy().setExtraParam('ipcFwdRecPointer', '');

        Atlas.common.utility.Utilities.exportToExcel(ClaimAlertExport);
    },

    onClaimMenuClick: function (btn) {
        var me = this,
            rec = btn.up('menu').up('container').getWidgetRecord(),
            claimId = rec.get('ClaimID');

        this.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
            menuId: me.getViewMenuId('merlin/claims/ClaimsToolbar'),
            atlasId: claimId
        });
    },

    onMemberMenuClick: function (btn) {
        var me = this,
            rec = btn.up('menu').up('container').getWidgetRecord(),
            recipientId = rec.get('recipientID');

        me.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
            menuId: me.getViewMenuId('merlin/member/MemberToolbar'),
            atlasId: recipientId,
            RID: recipientId,
            keyValue: '0',
            openView: true,
            isMemberPassedIn: true,
            masterrecord: rec
        });
    },

    onPharmacyMenuClick: function (btn) {
        var me = this,
            rec = btn.up('menu').up('container').getWidgetRecord(),
            ncpdpId = rec.get('NCPDPID');

        this.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
            menuId: me.getViewMenuId('merlin/pharmacy/Pharmacy'),
            atlasId: ncpdpId,
            ncpdpId: ncpdpId
        });
    },

    onPrescriberMenuClick: function (btn) {
        var me = this,
            rec = btn.up('menu').up('container').getWidgetRecord(),
            npi = rec.get('NPI');

        this.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
            menuId: me.getViewMenuId('merlin/prescriber/PrescriberToolbar'),
            atlasId: npi
        });
    },

    getViewMenuId: function (route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route);
        return menuId;
    },

    onAckButtonClick: function (btn) {
        var me = this,
            view = me.getView(),
            rec = btn.up().getWidgetRecord(),
            systemID = rec.get('SystemID'),
            saveAction = [{"Save": {"key": "pMode", "value": "A"}}],
            pFieldList = "Acknowledge,AcknowledgedDate,AcknowledgedUserName",
            pFieldValues = "y" + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + "|" + Atlas.user.un;

        Ext.Msg.prompt({
            title: 'Acknowledge',
            message: 'Are you sure you would like to acknowledge this task?',
            icon: Ext.Msg.QUESTION,
            renderTo: view.getEl(),
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    me.setAck(systemID, pFieldList, pFieldValues, saveAction);
                }
            }
        });
    },

    setAck: function (systemID, pFieldList, pFieldValues, saveAction) {
        var extraParameters = {
            pSystemID: systemID,
            pFieldList: pFieldList,
            pFields: pFieldValues
        };

        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [true], extraParameters, saveAction, null);

        if (saveData.code != 0) {
            Ext.Msg.alert('Error', saveData.message);
        }
        else {
            this.onSearch('');
        }
    },

    onTransitionLetterBtnClick: function (btn) {
        var me = this,
            rec = btn.up().getWidgetRecord();

        this.fireEvent('openView', 'merlin', 'letter', 'CreateEditLetter', {
            menuId: me.getViewMenuId('merlin/letter/CreateEditLetter'),
            atlasId: rec.get('ClaimID'),
            openView: true,
            keyValue: rec.get('ClaimID'),
            vmClaimID: rec.get('ClaimID'),
            masterrecord: rec,
            ID :  me.getViewMenuId('merlin/letter/CreateEditLetter'),
            LetterID:'NEW',
            LetterType : 'Transition'
        });
    },

    onNotTransitionBtnClick: function (btn) {
        var me = this,
            view = me.getView(),
            rec = btn.up().getWidgetRecord(),
            claimId = rec.get('ClaimID'),
            systemID = rec.get('SystemID');

        var win = Ext.create('Ext.window.Window', {
            itemId: 'winNotes',
            height: 150,
            width: 300,
            modal: true,
            title: 'Not Transition Fill',
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
                            handler: function () {
                                me.onNotesSave(claimId, systemID);
                            },
                            scope: me
                        },
                        {
                            itemId: 'btnNotesCancel',
                            xtype: 'button',
                            text: 'Cancel',
                            iconCls: 'x-fa fa-close',
                            handler: 'onNotesCancel',
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
                            value: "This is not Transition Fill"
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();
    },

    onNotesSave: function (claimId, systemID) {
        var winNotes = this.getView().down('#winNotes'),
            notes = winNotes.down('#actionNotes').getValue(),
            pFieldList = "AdditionalInfo",
            pFieldValues = notes == null || notes == undefined ? '' : notes,
            saveAction = [{"Save": {"key": "pMode", "value": "A"}}];

        if (pFieldValues == '') {
            Ext.Msg.alert("Message", "Please enter description for Not Transition Fill.");
            return;
        }

        this.setNotTransition(systemID, pFieldList, 'Not Transition Fill', saveAction);
        this.setClaimMasterData(claimId, saveAction, pFieldValues);
        winNotes.destroy();
    },

    onNotesCancel: function () {
        var winNotes = this.getView().down('#winNotes');
        winNotes.destroy();
    },

    setNotTransition: function (systemID, pFieldList, pFieldValues, saveAction) {
        var extraParameters = {
            pSystemID: systemID,
            pFieldList: pFieldList,
            pFields: pFieldValues
        };

        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [true], extraParameters, saveAction, null);

        if (saveData.code != 0) {
            Ext.Msg.alert('Error', saveData.message);
        }
    },

    setClaimMasterData: function (claimId, saveAction, pFieldValues) {
        var extraParameters = {
            pTransID: claimId,
            pcFieldList: "TransitionFill,SpareField03",
            pcData: "No" + "|" + pFieldValues + "-" + Atlas.user.un
        };

        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/claimmasterdata/update', null, [true], extraParameters, saveAction, null);

        if (saveData.code != 0) {
            Ext.Msg.alert('Error', saveData.message);
        }

        var view = this.getView(),
            gridPagingToolbar = view.down('#gridPagingToolbar');

        this.getSelectedPageData(gridPagingToolbar, gridPagingToolbar.store.currentPage, '');
    }
});
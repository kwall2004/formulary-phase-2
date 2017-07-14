Ext.define('Atlas.plan.view.MacManagementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MacManagementController',
    isMacExecutive: null,
    vm: null,
    macListID: null,
    macListVersion: null,
    listSystemID: null,
    listEffDate: null,

    listen: {
        store: {
            '#MACExecutiveAccess': {
                load: 'OnMACExecutiveAccessLoad'
            }
        }
    },

    init: function()
    {
        this.vm = this.getViewModel();
        this.loadMacList();
    },

    loadMacList: function()
    {
        var macListStore = this.vm.getStore('MacList');
        macListStore.load();
    },

    OnMACExecutiveAccessLoad: function(store, records, success) {
        store.filter('userName', Atlas.user.un);

        this.isMacExecutive = (store.data.items.length > 0 ? true : false);
    },

    onAppRejClick: function(grid, rowIndex, colIndex)
    {
        var me = this,
            vm = this.vm,
            notesStore = vm.getStore('MacListNotes'),
            rec = grid.getStore().getAt(rowIndex),
            MacListName = rec.get('MACListName'),
            ListStatus = rec.get('Stat');

        this.macListID = rec.get('MACListID');
        this.macListVersion = rec.get('MACListVersion');
        this.listSystemID = rec.get('systemID');
        this.listEffDate = rec.get('EffectiveDate');

        var win,
            disableAction;

        if (ListStatus.toUpperCase() != 'SUBMIT FOR APPROVAL')
        {
            disableAction = true;
        }
        else if (this.isMacExecutive == null || this.isMacExecutive == false) {
            disableAction = true;
        }
        else {
            disableAction = false;
        }

        this.vm.set('disableAction', disableAction);

        notesStore.getProxy().setExtraParam('pParentSystemID', this.listSystemID);
        notesStore.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        notesStore.sort('SystemID', 'ASC');
                        win = Ext.create('Ext.window.Window', {
                            itemId: 'winMacNotes',
                            height: 280,
                            width: 900,
                            modal : true,
                            layout: 'hbox',
                            listeners: {
                                scope : me,
                                'show': 'populateNotes'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 100,
                                    height: 230,
                                    layout: 'vbox',
                                    controller: {
                                        parent: me
                                    },
                                    viewModel: {
                                        parent: vm
                                    },
                                    listeners: {
                                        'close': 'onMacChangesWinClose'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'btnApprove',
                                            text: 'Approve',
                                            iconCls: 'x-fa fa-check-circle',
                                            width: 80,
                                            margin: '10 10 10 10',
                                            handler: 'onbtnAction',
                                            scope: me
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'btnReject',
                                            text: 'Reject',
                                            iconCls: 'x-fa fa-times-circle-o',
                                            width: 80,
                                            margin: '0 10 10 10',
                                            handler: 'onbtnAction',
                                            scope: me
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'btnCancel',
                                            text: 'Cancel',
                                            width: 80,
                                            margin: '0 10 10 10',
                                            iconCls: 'x-fa fa-times',
                                            handler: 'onbtnCancel',
                                            scope: me
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textareafield',
                                    itemId: 'macNotes',
                                    readOnly: true,
                                    flex: 1,
                                    grow: true,
                                    height: '100%',
                                    anchor: '100%'
                                }
                            ]
                        });

                        me.getView().add(win);
                        win.setTitle('MAC Changes - ' + MacListName + ' - Version: ' + me.macListVersion);
                        win.show();

                    }
                }
            });
    },

    onbtnAction: function (btn, event) {
        var me = this,
            winTitle,
            winSubject;

        if (btn.itemId == 'btnApprove')
        {
            winTitle = 'Approval Notes';
            winSubject = 'Approve MAC List';
            this.vm.set('ListAction', 'approve');
        }
        else
        {
            winTitle = 'Rejection Notes';
            winSubject = 'Reject MAC List';
            this.vm.set('ListAction', 'reject');
        }

        var winAction = Ext.create('Ext.window.Window', {
            itemId: 'winAction',
            height: 280,
            width: 400,
            modal : true,
            layout: 'fit',
            listeners: {
                scope: me,
                'show': 'onNotesWindowShow'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        text: 'Save',
                        iconCls: 'fa fa-save',
                        handler: 'onSaveAction',
                        scope: me
                    },
                    {
                        text: 'Cancel',
                        iconCls: 'x-fa fa-times',
                        handler: 'onCancelAction',
                        scope: me
                    }
                ]
            }],
            items: [
                {
                    xtype: 'form',
                    itemId: 'listActionForm',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Eff. Date',
                            itemId: 'EffectiveDate',
                            name: 'EffectiveDate',
                            allowBlank: false,
                            format: 'm/d/Y',
                            value: me.listEffDate,
                            minValue: Ext.Date.add(new Date(), Ext.Date.DAY, 1)
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Subject',
                            itemId: 'Subject',
                            name: 'Subject',
                            readOnly: true,
                            allowBlank: false,
                            value: winSubject
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Notes',
                            itemId: 'actionNotes',
                            flex: 1,
                            grow: true,
                            allowBlank: false,
                            anchor: '100%'
                        }
                    ]
                }

            ]
        });

        me.getView().add(winAction);
        winAction.setTitle(winTitle);
        winAction.show();

    },

    onNotesWindowShow: function (win) {
        win.down('#listActionForm').isValid();
    },

    onSaveAction: function()
    {
        var view           = this.getView(),
            me             = this,
            winAction      = this.getView().down('#winAction'),
            winMacNotes    = this.getView().down('#winMacNotes'),
            listActionForm = this.getView().down('#winAction').down('#listActionForm'),
            effDate        = listActionForm.down('#EffectiveDate').getRawValue(),
            notesSub       = listActionForm.down('#Subject').getValue(),
            notes          = listActionForm.down('#actionNotes').getValue(),
            pFieldList = "ParentSystemID,Subject,Note,CreateUser",
            pFieldValues = this.listSystemID + "|" +
                notesSub + "|" +
                notes + "|" +
                Atlas.user.un,
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        if (listActionForm.isValid())
        {
            var listAction = this.vm.get('ListAction'),
                message = 'Are you sure you want to ' + listAction + ' the new MAC List ' + (listAction == 'approve' ? 'effective: ' + effDate : 'changes') + '?',
                newStatus = (listAction == 'approve' ? 'Approved' : 'Rejected');

            Ext.Msg.confirm('Confirmation', message, function (btn) {
                if (btn == 'yes') {
                    var saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/maclistapproval/update', null, [true], {
                            pListID: me.macListID,
                            pVersion: me.macListVersion,
                            pStatus: newStatus,
                            pEffDate: effDate
                        },
                        saveAction, null);

                    if (saveData.code == 0) {
                        saveAction = [{"Save": {"key": "mode", "value": "Add"}}];
                        var saveNotesData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], {
                                psystemId: 0,
                                pMode: 'A',
                                pFieldList: pFieldList,
                                pFields: pFieldValues
                            },
                            saveAction, null);

                        Ext.Msg.alert('MAC Management', 'MAC List has been successfully ' + newStatus, Ext.emptyFn);

                        winAction.destroy();
                        winMacNotes.destroy();
                        me.loadMacList();
                    }
                    else {
                        Ext.Msg.alert('MAC Management', saveData.message, Ext.emptyFn);
                    }
                }
            });
        }
        else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
        }

    },

    onCancelAction: function()
    {
        var win = this.getView().down('#winAction');
        win.destroy();
    },

    onbtnCancel: function (btn, event) {
        var win = this.getView().down('#winMacNotes');
        win.destroy();
    },

    populateNotes: function()
    {
        var notes = '',
            notesStore = this.vm.getStore('MacListNotes'),
            winMacNotes = this.getView().down('#winMacNotes'),
            notesTextArea = winMacNotes.down('#macNotes');

        if (this.vm.get('disableAction') == true)
        {
            winMacNotes.down('#btnApprove').disable(true);
            winMacNotes.down('#btnReject').disable(true);
        }
        else
        {
            winMacNotes.down('#btnApprove').enable(true);
            winMacNotes.down('#btnReject').enable(true);
        }

        notesStore.each(function (rec) {
            notes = notes + (notes == '' ? '' : '\r\n') + rec.get('CreateUser') + ' - ' + Ext.Date.format(new Date(rec.get('CreateDate')), 'm/d/Y') + ' ' + rec.get('CreateTime') + ': ' + rec.get('Subject') + ' - ' + rec.get('Note');
        });

        notesTextArea.setValue(notes);
    }

});
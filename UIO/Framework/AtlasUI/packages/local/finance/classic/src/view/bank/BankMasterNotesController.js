Ext.define('Atlas.finance.view.bank.bankmasterNotesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-bankmasternotes',
    id: 'finance-bankmasternotescontroller',

    init: function () {
        var me = this,
            vm = me.getViewModel(),
            view = this.getView();
        if (view) {
            this.getNotes();
        }

    },

    //---------------------------------------------- Notes section
    getNotes: function () {
        var view = this.getView();
        if (view) {
            var parentSystemId = view.parentSystemId;
            view.down('#btnUpdateNotes').setDisabled(true);
            view.down('#btnDeleteNotes').setDisabled(true);
            var storeBankMastersNotes = this.getViewModel().getStore('storeBankMastersNotes');
            storeBankMastersNotes.getProxy().setExtraParam('pParentSystemID', parentSystemId);
            storeBankMastersNotes.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            if (objResp.data.length > 0) {
                                Ext.defer(function () {
                                    view.down('#gpNotes').getSelectionModel().select(0);
                                }, 300);
                            }
                        }
                    }
                }
            });
        }
    },

    onAddNotes: function () {
        var view = this.getView(),
            user = Atlas.user.un,
            today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');

        this.openNotesWindow();
        view.down('#noteUser').setValue(user);
        view.down('#noteDate').setValue(today);
        view.down('#btnSave').setText('Add');
        view.down('#winNotes').setTitle('Add');
    },

    onUpdateNotes: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            user = Atlas.user.un,
            today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');

        this.openNotesWindow();
        view.down('#noteDate').setValue(today);
        view.down('#noteUser').setValue(user);
        view.down('#btnSave').setText('Update');
        view.down('#winNotes').setTitle('Update');
        view.down('#txtDesc').setValue(vm.get('selectedNoteRecord').get('Note'));
        view.down('#txtSbj').setValue(vm.get('selectedNoteRecord').get('Subject'));
    },

    onDeleteNotes: function () {
        Ext.Msg.confirm('Delete', 'Are you sure you would like to delete selected note?', function (btn) {
            if (btn == 'yes') {
                var saveAction = [{"Save": {"key": "pMode", "value": "D"}}];
                var systemID = parseFloat(this.getViewModel().get('selectedNoteRecord').get('SystemID'));
                this.setNotes(systemID, '', '', saveAction);
            }
        }, this);
    },

    winNotesSave: function () {
        var saveAction = '',
            seconds = 0,
            systemID = 0,
            now = Atlas.common.utility.Utilities.getLocalDateTime(),
            view = this.getView(),
            vm = this.getViewModel(),
            parentSystemId = parseFloat(view.parentSystemId),
            then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0),
            pFieldList = 'ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime';
        if (view.down('#winNotes').getTitle() == 'Add') {
            saveAction = [{"Save": {"key": "pMode", "value": "A"}}];
        }
        else if (view.down('#winNotes').getTitle() == 'Update') {
            saveAction = [{"Save": {"key": "pMode", "value": "U"}}];
            systemID = vm.get('selectedNoteRecord').get('SystemID');
        }
        seconds = now.getTime() - then.getTime();
        var pFieldValues = parseFloat(parentSystemId) + "|" + view.down('#txtSbj').getValue() + "|" + view.down('#txtDesc').getValue() + "|" + view.down('#noteUser').getValue() + "|" + view.down('#noteDate').getValue() + "|" + seconds.toString();
        this.setNotes(systemID, pFieldList, pFieldValues, saveAction);
        if (view.down('#winNotes')) {
            view.down('#winNotes').close();
        }
    },

    setNotes: function (systemID, pFieldList, pFieldValues, saveAction) {
        var extraParameters = {
            psystemId: systemID,
            pFieldList: pFieldList,
            pFields: pFieldValues
        };
        var saveNotesData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], extraParameters,
            saveAction, null);
        if (saveNotesData.code != 0) {
            Ext.Msg.alert('Error', saveNotesData.message);
        }
        this.getNotes();
    },

    onGridRowSelect: function (me, record, tr, rowIndex, e, eOpts) {
        this.getView().down('#btnUpdateNotes').setDisabled(false);
        this.getView().down('#btnDeleteNotes').setDisabled(false);
        this.getViewModel().set('selectedNoteRecord', record);
    },

    winNotesClose: function () {
        this.getView().down('#winNotes').close();
    },

    reloadNotes: function (parentSystemId) {
        var view = this.getView();
        if (view) {
            view.parentSystemId = parentSystemId;
            view.down('#btnAddNotes').setDisabled(!view.parentSystemId);
            if (view.parentSystemId) {
                this.getNotes();
            }
        }
    },

    openNotesWindow:function () {
        var that = this,
            vm = that.getViewModel(),
            view = that.getView(),
         winNotes = Ext.create('Ext.window.Window', {
            itemId: 'winNotes',
            height: 230,
            width: 300,
            layout: 'vbox',
            modal: true,
            items: [
                {xtype: 'textfield', itemId: 'txtSbj', fieldLabel: 'Subject'},
                {xtype: 'textarea', itemId: 'txtDesc', fieldLabel: 'Description'}
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {xtype: 'button', itemId: 'btnSave', handler: 'winNotesSave'},
                        {xtype: 'button', text: 'Cancel', handler: 'winNotesClose'}
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {xtype: 'displayfield', itemId: 'noteDate'}, '-',
                        {xtype: 'displayfield', itemId: 'noteUser'}
                    ]
                }
            ]
        },this);

        view.add(winNotes).show();
    }

});




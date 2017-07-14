Ext.define('Atlas.finance.view.bank.BankMasterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-bankmaster',
    listen:
    {
        controller: {
            '#finance-bankmasterformcontroller': {
                bankMasterLoadStore: 'reloadStoreBankAcctMaster'
            }
        }
    },

    init: function () {
        var me = this,
            store = me.getViewModel().getStore('bankacctmaster');

        store.load();
        store.group('bank', 'ASC');
    },

    onSelect: function () {
        var me = this,
            view = me.getView(),
            toolbar = view.down('toolbar').items;

        toolbar.items[1].setDisabled(false); // enable edit button
        toolbar.items[2].setDisabled(false); // enable delete button
    },

    /*renderSungardMemo: function(value, metadata, record, rowIndex, colIndex, store, view){
        debugger;
    },*/

    onItemDblClick: function (record) {
        var me = this;

        me.onEditClick(record);
    },

    onAddClick: function () {
        var me = this;

        me.editor = Ext.create({
            xtype: 'window',
            bind: {
                title: '{title}'
            },
            iconCls: 'icon-finance,6',
            layout: 'fit',
            ghost: false,
            modal: true,
            closable: true,
            resizable: false,
            width: 600,

            items: [{
                xtype: 'finance-bankmasterform',
                addOrEdit: 'Add'
            }],

            session: {
                schema: 'atlas'
            },

            viewModel: {
                data: {
                    //title: 'Add Bank Information'
                    title: 'Add'
                }
            }
        });

        me.editor.show();
    },

    onEditClick: function (record) {

        var me = this,
            grid = me.getView().down('gridpanel') ,
            storeBankAcctMaster = me.getViewModel().getStore('bankacctmaster');

        if (grid.getSelection()[0] != undefined)
        {
            var recToEdit = grid.getSelection()[0];

            me.editor = Ext.create({
                xtype: 'window',
                bind: {
                    title: '{title}'
                },
                iconCls: 'icon-finance,6',
                layout: 'fit',
                ghost: false,
                modal: true,
                closable: true,
                resizable: false,
                width: 600,

                items: [{
                    xtype: 'finance-bankmasterform',
                    recBankAcctMaster: recToEdit,
                    addOrEdit: 'Edit'
                }],

                session: {
                    schema: 'atlas'
                },

                viewModel: {
                    data: {
                        //title: 'Edit Bank Information'
                        title: 'Update'
                    }
                }
            });

            me.editor.show();
        }
    },

    onDeleteClick: function (btnDelete) {
        var me = this,
            grid = me.getView().down('gridpanel') ,
            storeBankAcctMaster = me.getViewModel().getStore('bankacctmaster');

        if (grid.getSelection()[0] != undefined) {

            Ext.Msg.confirm('Confirm', 'Are you sure you would like to delete this record?', function (btn) {
                if (btn == 'yes') {
                    var record = grid.getSelection()[0],
                        idx = record.get('RowNum') - 1;

                    storeBankAcctMaster.removeAt(idx);

                    var saveAction = [{
                        "Save": {"key": '', "value": ''}
                    }];

                    var setBankAccountMaster = Atlas.common.utility.Utilities.saveData([], 'finance/rx/bankacctmaster/update', null, [true], {
                            pMode: 'D',
                            pSystemId: record.get('systemID'),
                            pFieldList: '',
                            pFields: ''
                        },
                        saveAction, null);

                    if (setBankAccountMaster.code === 0) {
                        var setNotes = Atlas.common.utility.Utilities.saveData([], 'shared/rx/notes/update', null, [true], {
                                psystemId: record.get('systemID'),
                                pMode: 'D',
                                pFieldList: '',
                                pFields: ''
                            },
                            saveAction, null);
                    }

                    storeBankAcctMaster.reload();
                }
                else {
                    return false;
                }

            }, this);
        }
    },

    reloadStoreBankAcctMaster: function(){
        var me = this,
            storeBankAcctMaster = me.getViewModel().getStore('bankacctmaster');

        storeBankAcctMaster.reload();

        me.editor.close();
    }
});
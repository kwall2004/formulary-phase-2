Ext.define('Atlas.plan.view.carriers.AccountsController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.plan-carriers-accounts',

    onRemoveButtonClick: function () {
        //debugger;
        var me= this,
            grid = me.getView(),
            url = Atlas.apiURL + 'plan/rx/carrieraccount/update',
            record = grid.getSelectionModel().getSelection()[0];

        if(record) {
            Ext.Msg.show({
                title: 'Confirm Delete',
                message: 'Are you sure you want to delete selected Account Details?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,

                fn: function (btn) {
                    //debugger;
                    if (btn === 'yes') {


                        var params = {
                            pSessionID: Atlas.user.sessionId,
                            pCarrierId: record.get('carrierId'),
                            pCarrierAcctNumber: record.get('carrierAcctNumber'),
                            pAction: 'D'
                        };

                        var returnValue = Atlas.common.utility.Utilities.post(
                            'plan/rx/carrieraccount/update',
                            params,
                            null
                        );

                        if (returnValue.code != 0) {
                            Ext.MessageBox.alert('Failure', returnValue.message, this.showResult, this);
                        }
                        else {
                            Ext.Msg.alert("PBM", "Account Details Successfully Deleted");
                            grid.getStore().load({

                                callback: function (records, operation, success) {
                                    if(!records || records.count ==0) {
                                        me.lookupReference('btnRemoveAccount').setDisabled(true);
                                    }

                                }
                            });
                        }


                    } else {
                        console.log('No pressed');
                    }
                }
            });
        }



    },
    createEditor: function (record) {
        var me = this,
            view = this.getView(),
            store = this.getView().store,
            modelName = store.getModel().$className,
            height = view['dialogheight'] ? 'height:' + view['dialogheight'] : null,
            pxtype = view.xtype.toLowerCase() + 'window';

        if (!Ext.ClassManager.getByAlias('widget.' + pxtype)) {
            pxtype = 'editorwindowerror';
        }

       var win = Ext.create({
            xtype: 'common-editgrid-window',
           autoShow: false,
           // callingView: view, //used to for closing methods cleanup as we open to viewport
            title: record ? 'Update Account Details: ' : 'Add Account Details',
            viewModel: {
                type: this.getView().dialogviewmodel || 'common-editgrid-window',
                parent: this.getViewModel(),
                data: {
                    isEditing: record ? true : false,
                    record: record || Ext.create(modelName)
                }
            },
            controller: view.dialogxtypecontroller || 'common-editgrid-window',
            width: view['dialogwidth'] || 500,
            height: view['dialogheight'] || 200,
            items: [{
                reference: 'editorForm',
                xtype: view.dialogxtype || pxtype
            }]
        });

        me.getView().up().add(win).show();


       /* if (record) {
            me.editor.down('form').loadRecord(record);
        }*/

    },
    onAddButtonClick:function()
    {
        this.createEditor(null);
    },

    onAccountGrdDoubleClick:function()
    {
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        this.createEditor(record);

    },
    onAccountSelect:function()
    {
        this.lookupReference('btnRemoveAccount').setDisabled(false);

    }
});
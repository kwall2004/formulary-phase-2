Ext.define('Atlas.plan.view.carriers.LOBsController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.plan-carriers-lobs',

    onRemoveButtonClick: function () {
        //debugger;

        var me= this,
            grid = me.getView(),
            url = Atlas.apiURL + 'plan/rx/carrierlob/update',
            record = grid.getSelectionModel().getSelection()[0];

        if(record) {
            Ext.Msg.show({
                title: 'Confirm Delete',
                message: 'Are you sure you want to delete selected LOB Details?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,

                fn: function (btn) {
                    //debugger;
                    if (btn === 'yes') {

                        var params = {
                            pSessionID: Atlas.user.sessionId,
                            pCarrierId: record.get('carrierId'),
                            pCarrierLOBId: record.get('carrierLOBId'),
                            pAction: 'D'
                        };

                        var returnValue = Atlas.common.utility.Utilities.post(
                            'plan/rx/carrierlob/update',
                            params,
                            null
                        );

                        if(returnValue.code != 0)
                        {
                            Ext.MessageBox.alert('Failure', returnValue.message, this.showResult, this);
                        }
                        else
                        {
                            Ext.Msg.alert("PBM", "LOB Details Successfully Deleted");
                            grid.getStore().load({
                                callback: function (records, operation, success) {
                                    if(!records || records.count ==0) {
                                        me.lookupReference('btnRemoveLOB').setDisabled(true);
                                    }
                                }
                            });
                        }

                    }
                    else {
                        console.log('No pressed');
                    }
                }
            });
        }


    },

    onAddButtonClick:function()
    {
        this.createEditor(null);
    },

    onLOBGrdDoubleClick:function()
    {
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        this.createEditor(record);

    },
    onLOBSelect:function()
    {
        this.lookupReference('btnRemoveLOB').setDisabled(false);

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

       var modwin = Ext.create({
            xtype: 'common-editgrid-window',
           autoShow: false,
            //callingView: view, //used to for closing methods cleanup as we open to viewport
            title: record ? 'Update LOB Details: ' : 'Add LOB Details',
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

        me.getView().up().add(modwin).show();

        /*if (record) {
            me.editor.down('form').loadRecord(record);
        }*/

    }

});
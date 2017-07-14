/*
 Developer: Tremaine Grant
 Last Developer: Tremaine Grant, Juris, Brad
 Description: A base controller for EditableGridBaseComponent with the cancel, newrecord, and rejectedit, functionalities built in.
 Origin: Merlin
 7/21/2016
 */
Ext.define('Atlas.common.view.sharedviews.editablegrid.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-shared-editablegrid',

    init: function () {
        //debugger;
        this.getViewModel().set('dirty', false);

        var curViewModel = this.getViewModel();
         console.log("-----------");
         console.log("GridController.curViewModel.data: " + curViewModel.data);
         console.log("-------------");

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

        me.editor = Ext.create({
            xtype: 'common-editgrid-window',
            callingView: view, //used to for closing methods cleanup as we open to viewport
            title: record ? 'Edit: ' : 'Add New',
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

        if (record) {
            me.editor.down('form').loadRecord(record);
        }

    },

    onAdd: function () {
        this.createEditor(null);
        console.log('in add screen in plan program code');
    },

    onEdit: function () {
        console.log('in edit screen in plan program code');
        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        this.createEditor(record);

    },

    onRemoveButtonClick: function () {

        var grid = this.getView(),
            record = grid.getSelectionModel().getSelection()[0];
        record.drop();
        grid.getStore().sync({
            callback: function(record) {
            }
        });
    },

    flushToServer: function () {
        this.getView().getSession().getSaveBatch().start();
    }


});